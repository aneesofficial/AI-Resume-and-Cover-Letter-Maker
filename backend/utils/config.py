import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL")

if not GEMINI_API_KEY:
    raise RuntimeError("Configuration Error: GEMINI_API_KEY is missing from the environment. Please set it in your .env file.")

if not GEMINI_MODEL:
    raise RuntimeError("Configuration Error: GEMINI_MODEL is missing from the environment. Please set it in your .env file (e.g., GEMINI_MODEL=gemini-2.5-flash).")
