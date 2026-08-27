from typing import Optional, List, Dict, Any, Union
import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.gemini_service import generate_text
from backend.prompts.resume_prompts import build_cover_letter_prompt

router = APIRouter(prefix="/api/cover-letter", tags=["cover_letter"])

class CandidateInfo(BaseModel):
    full_name: str
    professional_title: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    summary: Optional[str] = None
    skills: Optional[List[str]] = None
    experience: Optional[Union[List[str], str]] = None
    education: Optional[Union[List[str], str]] = None
    projects: Optional[Union[List[str], str]] = None
    certifications: Optional[Union[List[str], str]] = None

class CoverLetterRequest(BaseModel):
    candidate: CandidateInfo
    job_description: str
    resume: Optional[Dict[str, Any]] = None
    tone: Optional[str] = "Professional"

@router.post("/generate")
async def generate_cover_letter(request: CoverLetterRequest):
    """
    Generates a professional cover letter based on candidate info and a job description.
    """
    if not request.job_description.strip():
        raise HTTPException(status_code=400, detail="Job description cannot be empty.")
        
    try:
        # Build candidate data, removing empty fields
        candidate_data = request.candidate.model_dump(exclude_none=True)
        
        # Build prompt
        prompt = build_cover_letter_prompt(candidate_data, request.job_description, request.resume, tone=request.tone)
        
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
        
        cover_letter_data = json.loads(cleaned_text)
        return cover_letter_data
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="Failed to parse structured JSON from Gemini response.")
    except HTTPException:
        raise
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred during cover letter generation.")

@router.get("/placeholder")
async def get_placeholder():
    """
    Placeholder endpoint.
    """
    return {"message": "Placeholder cover letter route is working."}
