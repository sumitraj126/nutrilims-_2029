import re

def parse_weight_kg(weight_str):
    if not weight_str:
        return 0.0
    weight_str = str(weight_str).lower()
    match = re.search(r'([\d.]+)', weight_str)
    if match:
        val = float(match.group(1))
        if 'lbs' in weight_str or 'pound' in weight_str:
            return val * 0.453592
        return val
    return 0.0

def parse_height_m(height_str):
    if not height_str:
        return 0.0
    height_str = str(height_str).lower()
    
    if 'cm' in height_str:
        match = re.search(r'([\d.]+)', height_str)
        if match:
            return float(match.group(1)) / 100.0
            
    ft_match = re.search(r'(\d+)\s*(?:ft|\'|feet)', height_str)
    in_match = re.search(r'(\d+)\s*(?:in|\"|inches)', height_str)
    
    if ft_match:
        ft = float(ft_match.group(1))
        inches = float(in_match.group(1)) if in_match else 0.0
        return (ft * 30.48 + inches * 2.54) / 100.0
        
    match = re.search(r'([\d.]+)', height_str)
    if match:
        val = float(match.group(1))
        return val / 100.0 if val > 3.0 else val
        
    return 0.0

def calculate_bmi(weight_kg, height_m):
    if weight_kg > 0 and height_m > 0:
        return round(weight_kg / (height_m * height_m), 1)
    return 0.0

def get_bmi_category(bmi):
    if bmi == 0: return "Unknown"
    if bmi < 18.5: return "Underweight"
    if bmi < 24.9: return "Normal"
    if bmi < 29.9: return "Overweight"
    return "Obese"

def detect_conditions(medical_cond_str, symptoms_str):
    combined = f"{medical_cond_str} {symptoms_str}".lower()
    conditions = set()
    
    if 'diabet' in combined or 'sugar' in combined:
        conditions.add('Diabetes')
    if 'pcos' in combined or 'pcod' in combined:
        conditions.add('PCOS')
    if 'thyroid' in combined or 'hypothyroid' in combined or 'hyperthyroid' in combined:
        conditions.add('Thyroid')
    
    return list(conditions)

def classify_foods(conditions, bmi_category):
    therapeutic = set()
    restricted = set()
    
    if 'Diabetes' in conditions:
        therapeutic.update(['Fenugreek seeds', 'Bitter gourd', 'Oats', 'Cinnamon', 'Leafy greens'])
        restricted.update(['Sugar', 'Refined flour (Maida)', 'Fruit juices', 'Sweets', 'Processed foods'])
        
    if 'PCOS' in conditions:
        therapeutic.update(['Spearmint tea', 'Flaxseeds', 'Walnuts', 'Berries'])
        restricted.update(['Dairy products', 'Refined carbs', 'Sugary drinks'])
        
    if 'Thyroid' in conditions:
        therapeutic.update(['Brazil nuts', 'Roasted makhana', 'Pumpkin seeds'])
        restricted.update(['Raw cabbage', 'Soy products', 'Gluten (if sensitive)'])
        
    if bmi_category in ['Overweight', 'Obese']:
        therapeutic.update(['Chia seeds', 'Warm lemon water', 'High-fiber vegetables', 'Lean protein'])
        restricted.update(['Deep fried foods', 'Excessive oil', 'Processed snacks', 'High-sugar fruits'])
        
    if bmi_category == 'Underweight':
        therapeutic.update(['Nuts', 'Dates', 'Bananas', 'Ghee', 'Sweet potato'])
        restricted.update(['Appetite suppressants like excess caffeine'])
        
    return list(therapeutic), list(restricted)

def analyze_patient(data):
    weight_kg = parse_weight_kg(data.get('weight', ''))
    height_m = parse_height_m(data.get('height', ''))
    
    bmi = calculate_bmi(weight_kg, height_m)
    bmi_category = get_bmi_category(bmi)
    
    conditions = detect_conditions(data.get('medicalConditions', ''), data.get('symptoms', ''))
    if bmi_category == 'Obese':
        conditions.append('Obesity')
        
    therapeutic, restricted = classify_foods(conditions, bmi_category)
    
    return {
        "name": data.get('name', 'Unknown Patient'),
        "age": data.get('age', ''),
        "gender": data.get('gender', ''),
        "weight": data.get('weight', ''),
        "height": data.get('height', ''),
        "dietType": data.get('dietType', 'Any'),
        "bmi": bmi,
        "bmi_category": bmi_category,
        "conditions": list(set(conditions)),
        "therapeutic_foods": therapeutic,
        "restricted_foods": restricted
    }
