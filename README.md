# Nutrislims AI Clinical Diet Generator

An AI-powered clinical diet generation tool for dietitians. 

Upload patient forms and generate fully personalized diet plans with professional formatting and medical-grade structure.

## Features:
- Gemini-powered extraction
- Personalized diet generation
- Word document output
- No login / No storage

## How to Run:
1. Ensure you have Python 3.8+ installed.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Add your Gemini API key to `.env` file:
   ```
   GEMINI_API_KEY=your_key_here
   ```
4. Run the application:
   ```bash
   python app.py
   ```
5. Open your browser and navigate to `http://localhost:5000`

## Developer Rules Followed
- No patient data is stored. Uploaded files are deleted immediately after processing.
- Uses only Gemini API for intelligence and extraction.
- Stateless, API-driven design.
- Clean, premium UI.
