import sqlite3
import os
from datetime import datetime, timedelta

DB_PATH = os.path.join(os.path.dirname(__file__), 'nutrislims.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create bookings table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            service TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            health_goal TEXT,
            status TEXT DEFAULT 'Confirmed',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create slots table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS slots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            is_booked INTEGER DEFAULT 0,
            UNIQUE(date, time)
        )
    ''')
    
    # Create leads table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            phone TEXT,
            quiz_result TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create contacts table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            message TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create blogs table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS blogs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            excerpt TEXT NOT NULL,
            content TEXT NOT NULL,
            image TEXT NOT NULL,
            date TEXT NOT NULL,
            read_time TEXT NOT NULL
        )
    ''')
    
    conn.commit()
    
    # Seed slots for the next 14 days if table is empty
    cursor.execute('SELECT COUNT(*) FROM slots')
    if cursor.fetchone()[0] == 0:
        start_date = datetime.now()
        time_slots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
        
        for i in range(14):
            current_date = (start_date + timedelta(days=i)).strftime('%Y-%m-%d')
            # Skip Sundays for clinic bookings
            if (start_date + timedelta(days=i)).weekday() == 6:
                continue
            for slot_time in time_slots:
                cursor.execute('INSERT OR IGNORE INTO slots (date, time, is_booked) VALUES (?, ?, 0)', (current_date, slot_time))
        conn.commit()
        print("Pre-seeded booking slots for the next 14 days.")
        
    # Seed blog articles if table is empty
    cursor.execute('SELECT COUNT(*) FROM blogs')
    if cursor.fetchone()[0] == 0:
        blogs_data = [
            (
                "Sustainable Weight Loss: 5 Science-Backed Strategies",
                "Weight Loss",
                "Ditch the crash diets and learn how to build sustainable, lifelong healthy eating habits based on clinical science.",
                """<h2>Introduction</h2>
                <p>Weight loss doesn't have to mean starvation. The most successful and sustainable transformations focus on nourishing the body, not depriving it. Here are 5 science-backed strategies to help you reach your goals without losing your energy or peace of mind.</p>
                
                <h3>1. Prioritize Protein and Fiber</h3>
                <p>Protein and fiber are the ultimate satiety boosters. Protein increases the release of fullness hormones like peptide YY and GLP-1, while reducing the hunger hormone ghrelin. Fiber expands in your stomach, slowing down digestion and keeping blood sugar levels stable.</p>
                
                <h3>2. Master Portion Control, Not Calorie Restricting</h3>
                <p>Instead of meticulously weighing every gram of food, focus on plate composition. Fill half your plate with non-starchy vegetables, a quarter with lean protein, and a quarter with complex carbohydrates. Add a dash of healthy fats (like ghee, olive oil, or seeds).</p>
                
                <h3>3. Stay Hydrated Throughout the Day</h3>
                <p>Sometimes, our brains confuse thirst with hunger. Drinking a glass of warm water before meals can aid digestion and prevent overeating. Avoid drinking calories in the form of packed juices or sodas; opt for infused water, buttermilk, or herbal teas.</p>
                
                <h3>4. Optimize Your Sleep Quality</h3>
                <p>Sleep is a critical pillar of weight management. Poor sleep disrupts cortisol (stress hormone) levels and raises ghrelin, leading to intense cravings for sugary, high-calorie foods. Aim for 7 to 8 hours of quality rest every night.</p>
                
                <h3>5. Practice Mindful Eating</h3>
                <p>In our busy lives, we often eat in front of screens or on the go. This leads to distracted eating, where we don't realize when we are full. Sit down, chew your food thoroughly, savor the flavors, and listen to your body's satiety signals.</p>""",
                "/static/images/blog_weight_loss.webp",
                "June 10, 2026",
                "5 min read"
            ),
            (
                "Managing PCOS Naturally: The Power of Anti-Inflammatory Foods",
                "PCOS Diet",
                "Discover how dietary shifts can reduce insulin resistance, balance hormones, and manage PCOS symptoms naturally.",
                """<h2>Understanding PCOS and Diet</h2>
                <p>Polycystic Ovary Syndrome (PCOS) is a hormonal imbalance that affects millions of women. While medication can help, nutrition is the foundation of long-term management. Since chronic low-grade inflammation and insulin resistance are primary drivers of PCOS, an anti-inflammatory diet can work wonders.</p>
                
                <h3>1. Focus on Low Glycemic Index (GI) Foods</h3>
                <p>Low GI foods release sugar slowly into the bloodstream, preventing insulin spikes. Replace white rice and maida with whole grains like oats, quinoa, brown rice, and ragi. This helps regulate ovulation and reduce androgen (male hormone) production.</p>
                
                <h3>2. Load Up on Anti-Inflammatory Antioxidants</h3>
                <p>Include colorful fruits, green leafy vegetables, tomatoes, and berries in your diet. Spices like turmeric (curcumin) and ginger have strong anti-inflammatory properties that soothe the ovaries and improve insulin sensitivity.</p>
                
                <h3>3. Don't Fear Healthy Fats</h3>
                <p>Healthy fats are crucial for hormone synthesis. Incorporate avocados, walnuts, almonds, chia seeds, and cold-pressed oils. Omega-3 fatty acids found in seeds and fatty fish help reduce testosterone levels and regulate menstrual cycles.</p>
                
                <h3>4. Incorporate Spearmint Tea</h3>
                <p>Spearmint tea has been clinically shown to have mild anti-androgenic effects. Drinking two cups a day can help reduce hirsutism (excess body hair growth) and improve skin clarity by lowering free testosterone levels.</p>
                
                <h3>5. Limit Dairy and Refined Sugar</h3>
                <p>For many women with PCOS, dairy and refined sugars can trigger inflammation and worsen acne. Try reducing dairy intake for a few weeks to see if your symptoms improve, and satisfy your sweet tooth with natural sweeteners like dates or moderate amounts of raw honey.</p>""",
                "/static/images/blog_pcos.webp",
                "June 8, 2026",
                "7 min read"
            ),
            (
                "5 High-Protein Indian Breakfast Ideas for Fat Loss",
                "Recipes",
                "Start your morning with these simple, nutrient-dense, and delicious high-protein vegetarian Indian breakfast options.",
                """<h2>Why Breakfast Matters for Fat Loss</h2>
                <p>A high-protein breakfast stabilizes your blood sugar levels, reduces cravings later in the day, and keeps your metabolic furnace burning. Traditional Indian breakfasts can sometimes be carb-heavy. Here are 5 delicious ways to add a powerful protein punch to your morning routine.</p>
                
                <h3>1. Paneer and Veggie Besan Chilla</h3>
                <p>Chickpea flour (besan) is naturally high in protein and gluten-free. Mix besan with grated vegetables (carrots, bell peppers, spinach) and make thin crepes. Stuff them with 50g of crumbled low-fat paneer for a breakfast containing over 18g of clean protein.</p>
                
                <h3>2. Sprouted Moong Dal Chaat</h3>
                <p>Sprouted green moong dal is alive with enzymes, fiber, and protein. Toss sprouts with chopped cucumber, tomato, green chilies, coriander, lemon juice, and a pinch of chaat masala. It requires no cooking and is extremely refreshing.</p>
                
                <h3>3. Savory Oats Rava Idli with Curd</h3>
                <p>Blend rolled oats into a powder and mix with semolina (rava), curd, and grated carrots. Steam them like traditional idlis. Oats are rich in beta-glucan (soluble fiber) and when paired with curd, they provide a rich protein and prebiotic profile.</p>
                
                <h3>4. Tofu Scramble (Bhurji) with Multigrain Toast</h3>
                <p>For a vegan alternative to egg bhurji, crumble fresh tofu and sauté it with onions, tomatoes, turmeric, and coriander. Serve it alongside a slice of toasted multigrain bread for a balanced, protein-packed start.</p>
                
                <h3>5. Sattu Buttermilk (Sattu Ghol)</h3>
                <p>Sattu (roasted gram flour) is known as the poor man's protein powder in India, but it's a nutritional powerhouse. Whisk 3 tablespoons of sattu in low-fat curd or water, add roasted cumin powder, black salt, and coriander. This high-fiber, high-protein drink is incredibly filling and keeps you hydrated.</p>""",
                "/static/images/blog_recipes.webp",
                "June 5, 2026",
                "4 min read"
            )
        ]
        cursor.executemany('''
            INSERT INTO blogs (title, category, excerpt, content, image, date, read_time)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', blogs_data)
        conn.commit()
        print("Pre-seeded default blog articles.")
        
    conn.close()

if __name__ == '__main__':
    # Create the static images folder if it doesn't exist
    os.makedirs(os.path.join(os.path.dirname(__file__), 'static', 'images'), exist_ok=True)
    init_db()
