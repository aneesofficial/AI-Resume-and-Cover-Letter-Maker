from fastapi import APIRouter

router = APIRouter(prefix="/api/health", tags=["health"])

@router.get("")
async def health_check():
    """
    Health check endpoint to verify the API is running.
    """
    return {
        "status": "ok",
        "service": "resume-and-cover-letter-maker"
    }
