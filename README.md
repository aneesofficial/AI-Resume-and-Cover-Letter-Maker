# Resume & Cover Letter Maker

## Overview

Welcome to the **Resume & Cover Letter Maker**—an AI-powered application designed to seamlessly generate tailored resumes, professional cover letters, and comprehensive job advertisement analyses. By leveraging the advanced capabilities of the Google Gemini API, this tool ensures you present your best professional self without the hassle of manual formatting or the risk of AI hallucination.

## Features

* **AI Resume Generator:** Automatically draft ATS-friendly, professional resumes based strictly on your candidate profile.
* **AI Cover Letter Generator:** Generate highly targeted cover letters that bridge your experience with specific job requirements.
* **Job Advertisement Analyzer:** Instantly extract required skills, preferred qualifications, and crucial ATS keywords from any job posting.
* **ATS Keyword Extraction:** Easily copy high-value ATS keywords directly to your clipboard for application optimization.
* **Professional Preview:** Preview all generated documents in a clean, professional, and print-ready format.
* **Print / Save as PDF:** Natively export your customized documents directly to PDF without any clunky UI elements in the way.
* **Responsive UI:** Fully functional and beautifully designed across Desktop, Tablet, and Mobile.
* **Tone Selection:** Choose the exact professional tone (Professional, Confident, Concise, or Friendly) that fits the role.
* **Gemini API Integration:** Powered natively by the `google-genai` Python SDK.

## Tech Stack

### Backend
* Python
* FastAPI
* Google Gemini API (`google-genai`)
* Pydantic
* python-dotenv

### Frontend
* React
* Vite
* JavaScript
* Vanilla CSS

## Project Structure

```
Resume-and-cover-letter-maker/
├── backend/
│   ├── main.py                 # FastAPI Application Entry Point
│   ├── routes/                 # API Endpoints (Resume, Cover Letter, Health)
│   ├── services/               # Core business logic (Gemini API interactions)
│   ├── prompts/                # AI Prompt Engineering
│   └── utils/                  # Configuration & Utilities
├── frontend/
│   ├── index.html              # Vite Entry Point
│   ├── package.json            # Node Dependencies
│   ├── vite.config.js          # Vite Configuration
│   └── src/
│       ├── components/         # Reusable React Components (Forms, Previews)
│       ├── pages/              # Primary Pages (Home)
│       ├── services/           # Frontend API Interface (api.js)
│       └── styles/             # Vanilla CSS Architecture (global.css)
├── requirements.txt            # Python Dependencies
├── .env.example                # Template for Environment Variables
└── README.md                   # Documentation
```

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/resume-and-cover-letter-maker.git
cd resume-and-cover-letter-maker
```

### 2. Backend Dependencies
Ensure you have Python 3.9+ installed.
```bash
pip install -r requirements.txt
```

### 3. Frontend Dependencies
Ensure you have Node.js 18+ installed.
```bash
cd frontend
npm install
cd ..
```

## Environment Variables

Create a `.env` file in the root directory based on the `.env.example` file. 

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.6-flash
```

> **Security Note:** Your Gemini API key remains strictly on the backend. It is securely loaded into the FastAPI server and is never exposed or transmitted to the React frontend client.

## Running the Backend

From the root directory, start the FastAPI development server:

```bash
python -m uvicorn backend.main:app --reload
```
The API will be available at `http://127.0.0.1:8000`.

## Running the Frontend

From the `frontend/` directory, start the Vite development server:

```bash
cd frontend
npm run dev
```
The Web App will be available at `http://localhost:5173`. 
*(Note: If you encounter PowerShell execution policy errors on Windows when running npm, try using `cmd /c npm run dev` or adjust your execution policies.)*

## API Endpoints

- `GET /api/health` - Verifies backend stability and connectivity.
- `POST /api/resume/generate` - Generates a resume using `ResumeGenerationRequest`.
- `POST /api/cover-letter/generate` - Generates a cover letter based on `CoverLetterRequest`.
- `POST /api/job-analysis/analyze` - Extracts data from a raw job description using `JobAnalysisRequest`.
- `POST /api/gemini/test` - Tests the Gemini API connectivity.

## Testing

To verify the integrity of the application, you can run the following built-in checks:

1. **Python Compilation Check:** `python -m compileall backend`
2. **Imports Check:** `python -c "import fastapi, uvicorn, dotenv; from google import genai; print('ALL IMPORTS OK')"`
3. **Frontend Build Verification:** From the `/frontend` directory, run `npm run build` to ensure 0 client-side compile errors.

## Future Improvements

- Custom PDF export themes and templates.
- Markdown to PDF conversion backend service.
- RAG (Retrieval-Augmented Generation) for deeper contextual resume tuning.
- Authenticated user accounts for saving historical resumes.
