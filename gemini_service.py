import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = "gemini-1.5-flash"
model = genai.GenerativeModel(MODEL_NAME)

# Specialized chat model with system instruction
chat_model = genai.GenerativeModel(
    model_name=MODEL_NAME,
    system_instruction="""You are the friendly, professional AI Assistant for Nutrislims Health & Wellness Clinic, representing Nutritionist Oshin Ambekar. 
Your goal is to answer client questions about nutrition, clinic services, bookings, diet tips, and general wellness.

CLINIC INFORMATION:
- Nutritionist: Oshin Ambekar (B.Sc. Nutrition, M.Sc. Clinical Nutrition, Certified Clinical Dietitian).
- Core Services: 
  1. Weight Loss Management: Personalized calorie-controlled plans for sustainable fat loss.
  2. Clinical Nutrition: Medical diet planning for diabetes, PCOS, thyroid, and heart conditions.
  3. Online Consultations: Expert nutrition guidance via video consults from the comfort of home.
  4. Meal Planning & Recipes: Custom Indian meal plans with easy-to-cook recipes.
- Consultations: Clients can book a Free 15-minute Discovery call, or full-length clinical consultations.
- Interactive Tools: Point them to the "Free Diet Quiz" to find their Diet Personality, or the "AI Fridge Recipe Builder" on the homepage.
- Clinic Address: Indore, Madhya Pradesh, India.
- Contacts: Phone: +91 98765 43210, WhatsApp: +91 98765 43210, Email: contact@nutrislims.com.

GUIDELINES:
- Be warm, encouraging, science-backed, and professional.
- Use healthy emojis like 🌿, 🍎, 🥗, 💧.
- For severe medical conditions, advise booking a structured consultation with Oshin Ambekar.
- Keep responses clear, bulleted, and under 150 words for optimal mobile reading.
- Do not make up facts. If you do not know, politely guide the user to contact the clinic.
"""
)

def extract_patient_data(filepath, mime_type):
    with open(filepath, "rb") as f:
        file_bytes = f.read()
    
    prompt = """
    Extract the following patient data from this document and output ONLY valid JSON.
    Do not use markdown blocks, just return raw JSON string.
    
    Structure:
    {
      "name": "string (empty if not found)",
      "age": "number or string (empty if not found)",
      "gender": "string (empty if not found)",
      "height": "number in cm or string (e.g., '170 cm' or '5 ft 6 in')",
      "weight": "number in kg or string",
      "medicalConditions": "comma-separated string",
      "symptoms": "comma-separated string",
      "dietType": "e.g., veg, non-veg, vegan, etc."
    }
    """
    
    try:
        response = model.generate_content([
            {'mime_type': mime_type, 'data': file_bytes},
            prompt
        ])
        
        text = response.text.strip()
        if text.startswith('```json'):
            text = text[7:]
        if text.startswith('```'):
            text = text[3:]
        if text.endswith('```'):
            text = text[:-3]
            
        data = json.loads(text.strip())
        return data
    except Exception as e:
        print(f"Error in extraction: {e}")
        return None

def generate_diet_plan(patient_analysis):
    prompt = f"""
    You are an expert Clinical Dietitian from India. 
    Create a highly personalized Indian diet plan based on the following patient analysis:
    
    PATIENT PROFILE:
    Name: {patient_analysis['name']}
    Age: {patient_analysis['age']}, Gender: {patient_analysis['gender']}
    BMI: {patient_analysis['bmi']} ({patient_analysis['bmi_category']})
    Medical Conditions: {', '.join(patient_analysis['conditions']) if patient_analysis['conditions'] else 'None'}
    Diet Type: {patient_analysis['dietType']}
    Therapeutic Foods (Allowed): {', '.join(patient_analysis['therapeutic_foods'])}
    Restricted Foods (Avoid): {', '.join(patient_analysis['restricted_foods'])}
    
    STRICT RULES:
    1. Create exactly 6 meals (e.g., Early Morning, Breakfast, Mid-Morning, Lunch, Evening Snack, Dinner).
    2. Each meal MUST have exactly 7 different options.
    3. No repeated foods across options in a single meal.
    4. Must be fully patient-specific based on conditions and BMI.
    5. Return ONLY a valid JSON structure (no markdown wrapper, raw JSON).
    
    JSON Structure:
    {{
      "meals": [
        {{
          "mealName": "Early Morning (6:30 AM - 7:00 AM)",
          "options": [
            "Option 1 description",
            "Option 2 description",
            "Option 3 description",
            "Option 4 description",
            "Option 5 description",
            "Option 6 description",
            "Option 7 description"
          ]
        }}
      ],
      "dietitianNotes": [
        "Note 1",
        "Note 2"
      ],
      "foodsToAvoid": [
        "Food 1",
        "Food 2",
        "Food 3",
        "Food 4",
        "Food 5"
      ]
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith('```json'):
            text = text[7:]
        if text.startswith('```'):
            text = text[3:]
        if text.endswith('```'):
            text = text[:-3]
            
        data = json.loads(text.strip())
        return data
    except Exception as e:
        print(f"Error in diet generation: {e}")
        return None

def chat_with_assistant(message, history):
    formatted_history = []
    for h in history:
        role = 'user' if h['role'] == 'user' else 'model'
        # Ensure correct key structure for Gemini SDK chat history
        formatted_history.append({
            'role': role,
            'parts': [h['content']]
        })
        
    try:
        chat = chat_model.start_chat(history=formatted_history)
        response = chat.send_message(message)
        return response.text
    except Exception as e:
        print(f"Error in chat assistant: {e}")
        return "I am sorry, I am having trouble connecting right now. Please try again in a few moments, or feel free to message Oshin directly via WhatsApp! 🌿"

def generate_fridge_recipe(ingredients, goal):
    prompt = f"""
    You are an expert Clinical Dietitian from India.
    Create a healthy, calorie-controlled Indian recipe based on these ingredients: {ingredients}
    Target Health Goal/Diet: {goal}
    
    Return ONLY a valid JSON structure (no markdown wrapper, raw JSON).
    
    JSON Structure:
    {{
      "recipeName": "Recipe Name",
      "prepTime": "Prep & Cook time (e.g. 20 mins)",
      "calories": "Calories (e.g. 250 kcal)",
      "macros": {{
        "protein": "Protein in grams (e.g. 12g)",
        "carbs": "Carbohydrates in grams (e.g. 25g)",
        "fat": "Fats in grams (e.g. 8g)",
        "fiber": "Fiber in grams (e.g. 6g)"
      }},
      "ingredientsList": [
        "Ingredient 1 with quantity",
        "Ingredient 2 with quantity"
      ],
      "instructions": [
        "Step 1 instruction",
        "Step 2 instruction"
      ],
      "healthBenefit": "A short sentence explaining why this recipe is beneficial for the selected goal."
    }}
    """
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith('```json'):
            text = text[7:]
        if text.startswith('```'):
            text = text[3:]
        if text.endswith('```'):
            text = text[:-3]
        return json.loads(text.strip())
    except Exception as e:
        print(f"Error in recipe generation: {e}")
        return None
