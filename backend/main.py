from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.health import router as health_router
from backend.routes.resume import router as resume_router
from backend.routes.cover_letter import router as cover_letter_router
from backend.routes.job_analysis import router as job_analysis_router

app = FastAPI(
    title="Resume & Cover Letter Maker API",
    description="Backend API for generating resumes and cover letters using Gemini"
)

# Keep CORS configuration simple and development-friendly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health_router)
app.include_router(resume_router)
app.include_router(cover_letter_router)
app.include_router(job_analysis_router)

@app.get("/")
async def root():
    """
    Root endpoint
    """
    return {
        "message": "Resume and Cover Letter Maker API is running"
    }
