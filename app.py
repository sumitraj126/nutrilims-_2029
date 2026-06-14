import os
import sqlite3
from flask import Flask, request, jsonify, send_file, render_template
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import traceback

from gemini_service import (
    extract_patient_data, 
    generate_diet_plan, 
    chat_with_assistant, 
    generate_fridge_recipe
)
from diet_engine import analyze_patient
from doc_generator import create_diet_plan_doc
from database import get_db_connection

load_dotenv()

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# ----------------- PAGE ROUTES -----------------

@app.route('/')
def home():
    # Fetch 3 recent blog posts for home page
    conn = get_db_connection()
    blogs = conn.execute('SELECT * FROM blogs ORDER BY id DESC LIMIT 3').fetchall()
    conn.close()
    return render_template('home.html', blogs=blogs)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/book')
def book():
    # Pre-select service if passed as query param
    selected_service = request.args.get('service', '')
    return render_template('book.html', selected_service=selected_service)

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/blog')
def blog():
    category = request.args.get('category', 'All')
    search = request.args.get('search', '')
    page = int(request.args.get('page', 1))
    per_page = 6
    offset = (page - 1) * per_page
    
    conn = get_db_connection()
    
    # Base query
    query = 'SELECT * FROM blogs WHERE 1=1'
    params = []
    
    if category != 'All':
        query += ' AND category = ?'
        params.append(category)
        
    if search:
        query += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)'
        search_param = f'%{search}%'
        params.extend([search_param, search_param, search_param])
        
    # Get total count
    count_query = query.replace('SELECT *', 'SELECT COUNT(*)')
    total_count = conn.execute(count_query, params).fetchone()[0]
    total_pages = (total_count + per_page - 1) // per_page
    
    # Get paginated results
    query += ' ORDER BY id DESC LIMIT ? OFFSET ?'
    params.extend([per_page, offset])
    blogs = conn.execute(query, params).fetchall()
    
    # Get all categories for filter sidebar
    categories = ['All', 'Weight Loss', 'PCOS Diet', 'Recipes', 'Diabetes', 'Lifestyle']
    
    conn.close()
    return render_template(
        'blog.html', 
        blogs=blogs, 
        categories=categories, 
        selected_category=category, 
        search_query=search,
        current_page=page, 
        total_pages=max(total_pages, 1)
    )

@app.route('/blog/<int:blog_id>')
def blog_detail(blog_id):
    conn = get_db_connection()
    blog = conn.execute('SELECT * FROM blogs WHERE id = ?', (blog_id,)).fetchone()
    if not blog:
        conn.close()
        return "Blog post not found", 404
    
    # Fetch recent blog posts for sidebar (excluding current)
    recent = conn.execute('SELECT * FROM blogs WHERE id != ? ORDER BY id DESC LIMIT 3', (blog_id,)).fetchall()
    conn.close()
    return render_template('blog_detail.html', blog=blog, recent=recent)

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/generator')
def generator_tool():
    return render_template('generator.html')

# ----------------- API ENDPOINTS -----------------

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json or {}
        message = data.get('message', '')
        history = data.get('history', [])
        
        if not message:
            return jsonify({'error': 'Message is required'}), 400
            
        reply = chat_with_assistant(message, history)
        return jsonify({'reply': reply})
    except Exception as e:
        print(f"Error in chat API: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/recipe-builder', methods=['POST'])
def recipe_builder():
    try:
        data = request.json or {}
        ingredients = data.get('ingredients', '')
        goal = data.get('goal', 'General Wellness')
        
        if not ingredients:
            return jsonify({'error': 'Ingredients are required'}), 400
            
        recipe = generate_fridge_recipe(ingredients, goal)
        if not recipe:
            return jsonify({'error': 'Failed to generate recipe. Please try again.'}), 500
            
        return jsonify(recipe)
    except Exception as e:
        print(f"Error in recipe builder API: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/slots', methods=['GET'])
def get_slots():
    date_str = request.args.get('date', '')
    if not date_str:
        return jsonify({'error': 'Date parameter is required (YYYY-MM-DD)'}), 400
        
    conn = get_db_connection()
    slots = conn.execute('SELECT id, time, is_booked FROM slots WHERE date = ?', (date_str,)).fetchall()
    conn.close()
    
    return jsonify([dict(slot) for slot in slots])

@app.route('/api/book', methods=['POST'])
def save_booking():
    try:
        data = request.json or {}
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        service = data.get('service', '')
        date = data.get('date', '')
        time = data.get('time', '')
        health_goal = data.get('health_goal', '')
        
        if not all([name, email, phone, service, date, time]):
            return jsonify({'error': 'All fields are required'}), 400
            
        conn = get_db_connection()
        
        # Check if slot is already booked
        slot = conn.execute('SELECT * FROM slots WHERE date = ? AND time = ? AND is_booked = 0', (date, time)).fetchone()
        if not slot:
            conn.close()
            return jsonify({'error': 'Selected slot is no longer available'}), 409
            
        # Update slot to booked and insert booking record
        conn.execute('UPDATE slots SET is_booked = 1 WHERE date = ? AND time = ?', (date, time))
        conn.execute(
            'INSERT INTO bookings (client_name, email, phone, service, date, time, health_goal) VALUES (?, ?, ?, ?, ?, ?, ?)',
            (name, email, phone, service, date, time, health_goal)
        )
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Booking confirmed successfully!'})
    except Exception as e:
        print(f"Error in booking API: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/quiz', methods=['POST'])
def save_quiz_lead():
    try:
        data = request.json or {}
        email = data.get('email', '')
        phone = data.get('phone', '')
        answers = data.get('answers', {})
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
            
        # Determine Diet Personality based on answers
        goal = answers.get('1', '')
        diet_type = answers.get('2', '')
        activity = answers.get('3', '')
        conditions = answers.get('5', 'None')
        
        # Mapping rules
        if any(cond in conditions for cond in ['Diabetes', 'PCOS', 'Thyroid', 'Hypertension']):
            personality = "Gut Healer"
            icon = "🛡️"
            headline = "The Gut Healer Archetype"
            description = "Your answers indicate that your endocrine and digestive systems require gentle, anti-inflammatory support. You thrive on prebiotics, fermented foods, and fiber that stabilize hormone spikes, soothe PCOS symptoms, and regulate insulin levels."
            tip = "Add 1 tbsp of soaked chia seeds to your morning routine and switch to Spearmint tea to soothe systemic inflammation."
            foods = ["Ginger & Turmeric", "Spearmint/Green Tea", "Soaked Almonds & Walnuts", "Prebiotic Fiber (Oats, Ragi)", "Buttermilk & Curd"]
        elif 'Weight Loss' in goal:
            personality = "Metabolic Booster"
            icon = "⚡"
            headline = "The Metabolic Booster Archetype"
            description = "Your profile is geared towards optimized fat oxidation and lean muscle retention. You benefit from a thermogenic, high-protein structure that increases caloric expenditure naturally and controls daily satiety levels."
            tip = "Ensure every meal contains a palm-sized portion of protein (like paneer, tofu, sprouts, or lean meat) to boost your resting metabolic rate."
            foods = ["Low-fat Paneer/Tofu", "Sprouted Moong", "Cinnamon Infused Water", "High-Fiber Vegetables", "Green Gram Crepes"]
        elif 'Muscle Gain' in goal or 'Very Active' in activity:
            personality = "Energy Seeker"
            icon = "☀️"
            headline = "The Energy Seeker Archetype"
            description = "Your active lifestyle requires efficient glycogen restoration and complex carbohydrate fueling. Your body burns through standard macros quickly, meaning you need nutrient-dense, slow-releasing energy sources to avoid energy crashes."
            tip = "Incorporate complex starch like sweet potatoes or brown rice before workouts to maximize muscle glycogen storage."
            foods = ["Roasted Makhana", "Bananas & Dates", "Sweet Potatoes", "Brown Rice/Oats", "Mixed Seeds (Pumpkin, Sunflower)"]
        else:
            personality = "Clean Eater"
            icon = "🌿"
            headline = "The Clean Eater Archetype"
            description = "You focus on clean longevity and functional wellness. Your digestive system is balanced, meaning you respond exceptionally well to whole, single-ingredient foods, color-rich antioxidants, and light grains."
            tip = "Follow the 'Rainbow Plate' concept — ensure your lunch and dinner contain at least 3 different colors of fresh vegetables."
            foods = ["Seasonal Fresh Fruits", "Leafy Greens (Palak, Methi)", "Amla Juice", "Warm Lemon Water", "Millets (Jowar, Bajra)"]
            
        # Write lead to database
        conn = get_db_connection()
        conn.execute('INSERT INTO leads (email, phone, quiz_result) VALUES (?, ?, ?)', (email, phone, personality))
        conn.commit()
        conn.close()
        
        return jsonify({
            'personality': personality,
            'icon': icon,
            'headline': headline,
            'description': description,
            'tip': tip,
            'foods': foods
        })
    except Exception as e:
        print(f"Error in quiz API: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/contact', methods=['POST'])
def save_contact():
    try:
        data = request.json or {}
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        message = data.get('message', '')
        
        if not all([name, email, message]):
            return jsonify({'error': 'Name, email and message are required'}), 400
            
        conn = get_db_connection()
        conn.execute(
            'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
            (name, email, phone, message)
        )
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Message sent successfully!'})
    except Exception as e:
        print(f"Error in contact API: {e}")
        return jsonify({'error': str(e)}), 500


# ----------------- ORIGINAL CLINICAL GENERATOR ROUTE -----------------

@app.route('/api/generate', methods=['POST'])
def generate_diet():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        print("Extracting data...")
        patient_data = extract_patient_data(filepath, file.mimetype)

        if not patient_data:
            os.remove(filepath)
            return jsonify({'error': 'Failed to extract patient data from file'}), 500

        print("Analyzing patient...")
        patient_analysis = analyze_patient(patient_data)

        print("Generating diet plan...")
        diet_plan = generate_diet_plan(patient_analysis)

        if not diet_plan:
            os.remove(filepath)
            return jsonify({'error': 'Failed to generate diet plan'}), 500

        print("Creating Word document...")
        output_filename = f"Diet_Plan_{patient_data.get('name', 'Patient').replace(' ', '_')}.docx"
        output_filepath = os.path.join(app.config['UPLOAD_FOLDER'], output_filename)
        
        create_diet_plan_doc(patient_analysis, diet_plan, output_filepath)

        os.remove(filepath)

        return send_file(
            output_filepath,
            as_attachment=True,
            download_name=output_filename,
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )

    except Exception as e:
        print(f"Error: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
