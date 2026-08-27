import requests
import json
import time

BASE_URL = "http://127.0.0.1:8000"

def test_get(endpoint):
    try:
        response = requests.get(f"{BASE_URL}{endpoint}")
        print(f"GET {endpoint} - Status: {response.status_code}")
    except Exception as e:
        print(f"GET {endpoint} - Error: {e}")

def test_post(endpoint, payload):
    try:
        response = requests.post(f"{BASE_URL}{endpoint}", json=payload)
        if response.status_code == 200:
            print(f"POST {endpoint} - Status: 200")
        else:
            print(f"POST {endpoint} - Status: {response.status_code}, Response: {response.text}")
    except Exception as e:
        print(f"POST {endpoint} - Error: {e}")

print("--- REGRESSION TESTING ---")
test_get("/")
test_get("/api/health")

# Test Gemini Test Endpoint
test_post("/api/gemini/test", {})

# Test Resume Generate
resume_payload = {
    "full_name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "555-1234",
    "location": "New York, NY",
    "professional_title": "Software Engineer",
    "summary": "Experienced software engineer with a passion for building scalable web applications.",
    "skills": ["Python", "React", "Node.js", "Docker"],
    "education": "B.S. in Computer Science, University of Technology",
    "experience": "5 years experience at Tech Corp.",
    "projects": "Built an awesome API using FastAPI.",
    "certifications": "AWS Certified Solutions Architect",
    "tone": "Professional"
}
test_post("/api/resume/generate", resume_payload)
time.sleep(2)

# Test Cover Letter Generate
cl_payload = {
    "candidate": {
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "phone": "555-1234",
        "location": "New York, NY",
        "professional_title": "Software Engineer",
        "summary": "Experienced software engineer.",
        "skills": ["Python", "React", "Node.js", "Docker"],
        "education": "B.S. in Computer Science",
        "experience": "5 years experience at Tech Corp.",
        "projects": "Built an awesome API.",
        "certifications": "AWS Certified"
    },
    "job_description": "We are looking for a Python developer with 5 years experience in building web applications.",
    "resume": {},
    "tone": "Professional"
}
test_post("/api/cover-letter/generate", cl_payload)
time.sleep(2)

# Test Job Analysis
ja_payload = {
    "job_description": "We are looking for a Senior Developer with 5 years experience in React and Node.js."
}
test_post("/api/job-analysis/analyze", ja_payload)
print("--- END OF TESTING ---")
