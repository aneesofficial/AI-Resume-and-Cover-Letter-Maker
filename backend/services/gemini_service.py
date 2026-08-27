from google import genai
from google.genai.errors import APIError
from backend.utils.config import GEMINI_API_KEY, GEMINI_MODEL

# Create one reusable Gemini client
try:
    client = genai.Client(api_key=GEMINI_API_KEY)
except Exception as e:
    raise RuntimeError(f"Failed to initialize Gemini client: {e}")

def generate_text(prompt: str) -> str:
    """
    Generate text using the configured Gemini model.
    """
    if not prompt or not prompt.strip():
        raise ValueError("Prompt cannot be empty.")
        
    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
        )
        return response.text
    except APIError as e:
        # Handle specific API errors
        raise RuntimeError(f"Gemini API Error: {e.message}")
    except Exception as e:
        # Handle other unexpected errors without leaking stack traces or keys
        raise RuntimeError("An unexpected error occurred while connecting to the AI service. Please try again later.")