from typing import Optional, List
import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.gemini_service import generate_text
from backend.prompts.resume_prompts import build_resume_prompt

router = APIRouter(prefix="/api", tags=["resume"])

class GeminiTestResponse(BaseModel):
    success: bool
    message: str

class ResumeGenerationRequest(BaseModel):
    full_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    professional_title: Optional[str] = None
    summary: Optional[str] = None
    skills: Optional[List[str]] = None
    education: Optional[str] = None
    experience: Optional[str] = None
    projects: Optional[str] = None
    certifications: Optional[str] = None
    tone: Optional[str] = "Professional"

@router.post("/gemini/test", response_model=GeminiTestResponse)
async def test_gemini():
    """
    Temporary endpoint to test Gemini API connection.
    Placed in resume.py because it's a core generation route and we locked the structure.
    """
    try:
        prompt = "Reply with exactly: Gemini API connection successful."
        generated_text = generate_text(prompt)
        
        # Verify the exact response if we want, or just return success
        return GeminiTestResponse(success=True, message=generated_text.strip())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        # Avoid exposing raw stack traces, but give a useful message
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An internal server error occurred")

@router.post("/resume/generate")
async def generate_resume(request: ResumeGenerationRequest):
    """
    Generates a professional resume using candidate input.
    """
    try:
        # Build candidate data, removing empty fields
        candidate_data = request.model_dump(exclude_none=True)
        
        # Build prompt
        prompt = build_resume_prompt(candidate_data, tone=request.tone)
        
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
        
        resume_data = json.loads(cleaned_text)
        return resume_data
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="Failed to parse structured JSON from Gemini response.")
    except HTTPException:
        raise
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred during resume generation.")

@router.get("/resume/placeholder")
async def get_placeholder():
    """
    Placeholder endpoint.
    """
    return {"message": "Placeholder resume route is working."}
