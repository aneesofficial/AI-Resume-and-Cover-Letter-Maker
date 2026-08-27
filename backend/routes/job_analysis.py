import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.gemini_service import generate_text
from backend.prompts.resume_prompts import build_job_analysis_prompt, build_resume_match_prompt
from typing import Dict, Any

router = APIRouter(prefix="/api/job-analysis", tags=["job_analysis"])

class JobAnalysisRequest(BaseModel):
    job_description: str

class JobMatchRequest(BaseModel):
    resume: Dict[str, Any]
    job_description: str

@router.post("/analyze")
async def analyze_job(request: JobAnalysisRequest):
    """
    Analyzes a job advertisement and returns structured JSON information.
    """
    if not request.job_description.strip():
        raise HTTPException(status_code=400, detail="Job description cannot be empty.")
        
    try:
        # Build prompt
        prompt = build_job_analysis_prompt(request.job_description)
        
        # Call Gemini service
        response_text = generate_text(prompt)
        
        if not response_text:
            raise HTTPException(status_code=502, detail="Received empty response from Gemini.")
            
        # Safely parse JSON from Gemini (handling potential markdown blocks)
        cleaned_text = response_text.strip()
        if cleaned_text.startswith("```json"):
            cleaned_text = cleaned_text[7:]
        elif cleaned_text.startswith("```"):
            cleaned_text = cleaned_text[3:]
        if cleaned_text.endswith("```"):
            cleaned_text = cleaned_text[:-3]
            
        cleaned_text = cleaned_text.strip()
        
        job_data = json.loads(cleaned_text)
        return job_data
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="Failed to parse structured JSON from Gemini response.")
    except HTTPException:
        raise
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred during job analysis.")

@router.post("/match")
async def match_resume_to_job(request: JobMatchRequest):
    """
    Compares a resume against a job advertisement and returns a structured match report.
    """
    if not request.job_description.strip():
        raise HTTPException(status_code=400, detail="Job description cannot be empty.")
    if not request.resume:
        raise HTTPException(status_code=400, detail="Resume data cannot be empty.")
        
    try:
        # Build prompt
        prompt = build_resume_match_prompt(request.resume, request.job_description)
        
        # Call Gemini service
        response_text = generate_text(prompt)
        
        if not response_text:
            raise HTTPException(status_code=502, detail="Received empty response from Gemini.")
            
        # Safely parse JSON from Gemini
        cleaned_text = response_text.strip()
        if cleaned_text.startswith("```json"):
            cleaned_text = cleaned_text[7:]
        elif cleaned_text.startswith("```"):
            cleaned_text = cleaned_text[3:]
        if cleaned_text.endswith("```"):
            cleaned_text = cleaned_text[:-3]
            
        cleaned_text = cleaned_text.strip()
        
        match_data = json.loads(cleaned_text)
        return match_data
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="Failed to parse structured JSON from Gemini response.")
    except HTTPException:
        raise
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred during resume match analysis.")

@router.get("/placeholder")
async def get_placeholder():
    """
    Placeholder endpoint.
    """
    return {"message": "Placeholder job analysis route is working."}
