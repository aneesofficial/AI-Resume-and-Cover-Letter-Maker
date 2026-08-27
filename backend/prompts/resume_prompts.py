import json

TONE_INSTRUCTIONS = {
    "Professional": "- Formal\n- Clear\n- ATS-friendly\n- Business appropriate",
    "Confident": "- Strong\n- Achievement-focused\n- Assertive but truthful\n- Never exaggerate",
    "Concise": "- Short\n- Direct\n- Avoid unnecessary wording\n- ATS-friendly",
    "Friendly": "- Warm\n- Professional\n- Natural\n- Still suitable for a job application"
}

def get_tone_instruction(tone: str) -> str:
    tone_key = tone.capitalize() if tone else "Professional"
    return TONE_INSTRUCTIONS.get(tone_key, TONE_INSTRUCTIONS["Professional"])

def build_resume_prompt(candidate_data: dict, tone: str = "Professional") -> str:
    """
    Builds a professional resume generation prompt for Gemini.
    """
    tone_instruction = get_tone_instruction(tone)
    
    prompt = f"""You are an expert, professional resume writer.
Your task is to take the provided candidate information and rewrite it into a highly professional, ATS-friendly resume.
You must adopt a {tone} tone. Specifically:
{tone_instruction}

IMPORTANT ANTI-HALLUCINATION RULE:
- Do NOT invent companies, job titles, degrees, certifications, years of experience, achievements, numbers, technologies, skills, or projects.
- Only use information provided by the candidate. Do not invent facts.
- Maintain factual accuracy.
- Use professional English.
- Avoid unnecessary personal information.

Format the output EXACTLY as a valid JSON object. Do NOT wrap the JSON in Markdown formatting (no ```json ... ```).
The JSON MUST have the following structure (omit empty lists/strings if no information is provided):
{{
    "professional_summary": "...",
    "skills": ["...", "..."],
    "experience": [
        {{
            "title": "...",
            "company": "...",
            "date": "...",
            "description": ["bullet 1", "bullet 2"]
        }}
    ],
    "projects": [
        {{
            "name": "...",
            "description": ["bullet 1", "bullet 2"]
        }}
    ],
    "education": [
        {{
            "degree": "...",
            "institution": "...",
            "date": "..."
        }}
    ],
    "certifications": ["...", "..."]
}}

Candidate Information:
{json.dumps(candidate_data, indent=2)}
"""
    return prompt

def build_cover_letter_prompt(candidate_data: dict, job_description: str, resume_data: dict = None, tone: str = "Professional") -> str:
    """
    Builds a professional cover letter generation prompt for Gemini.
    """
    resume_context = f"\nResume Information:\n{json.dumps(resume_data, indent=2)}" if resume_data else ""
    tone_instruction = get_tone_instruction(tone)
    
    prompt = f"""You are a professional recruitment-focused cover letter writer.
Your task is to take the provided candidate information, job description, and optional resume data, and write a tailored, professional cover letter.

You must adopt a {tone} tone. Specifically:
{tone_instruction}

You must:
- Tailor the cover letter to the provided job advertisement.
- Connect the candidate's actual skills and experience to the role.
- Mention the target position when available in the job description.
- Highlight the most relevant candidate strengths.
- Be professional and natural, using clear English.
- Avoid generic filler, unnecessary repetition, and keep it concise.
- Have a professional opening, 2-4 focused body paragraphs, and a professional closing.

IMPORTANT ANTI-HALLUCINATION RULE:
- Do NOT invent companies, job titles, degrees, certifications, years of experience, achievements, metrics, technologies, responsibilities, or projects.
- Only use facts supplied by the candidate or clearly present in the job description.
- If the job description does not contain a company name, do not invent one (use a generic professional greeting).
- If candidate information is missing, simply avoid making unsupported claims.

Format the output EXACTLY as a valid JSON object. Do NOT wrap the JSON in Markdown formatting (no ```json ... ```).
The JSON MUST have the following structure:
{{
    "job_title": "...",
    "company_name": "...",
    "subject": "...",
    "greeting": "...",
    "body": [
        "...",
        "...",
        "..."
    ],
    "closing": "...",
    "signature": "..."
}}

Candidate Information:
{json.dumps(candidate_data, indent=2)}

Job Description:
{job_description}{resume_context}
"""
    return prompt

def build_job_analysis_prompt(job_description: str) -> str:
    """
    Builds a prompt for Gemini to analyze a job advertisement.
    """
    prompt = f"""You are an expert recruitment analyst. 
Your task is to carefully analyze the provided job advertisement and extract structured information.

You must:
- Analyze ONLY the supplied job advertisement.
- Never invent company names.
- Never invent salary, education requirements, years of experience, or technologies.
- Extract information only when clearly supported by the advertisement.
- Separate required skills from preferred skills.
- Extract ATS-relevant keywords.
- If some information is not present in the job advertisement, return an empty string or empty list instead of inventing information.
- Return ONLY valid JSON.
- Do not return Markdown.
- Do not return explanations outside JSON.

Format the output EXACTLY as a valid JSON object. Do NOT wrap the JSON in Markdown formatting (no ```json ... ```).
The JSON MUST have the following structure:
{{
    "job_title": "...",
    "company_name": "...",
    "required_skills": ["...", "..."],
    "preferred_skills": ["...", "..."],
    "education_requirements": ["...", "..."],
    "experience_requirements": ["...", "..."],
    "responsibilities": ["...", "..."],
    "keywords": ["...", "..."],
    "technologies": ["...", "..."],
    "soft_skills": ["...", "..."],
    "ats_keywords": ["...", "..."],
    "summary": "..."
}}

Job Advertisement:
{job_description}
"""
    return prompt

def build_resume_match_prompt(resume_data: dict, job_description: str) -> str:
    """
    Builds a prompt for Gemini to compare a resume against a job advertisement.
    """
    prompt = f"""You are an expert ATS (Applicant Tracking System) and recruitment analyst.
Your task is to compare the provided candidate resume against the provided job advertisement and generate a structured match report.

You must:
- Analyze ONLY the provided resume and job description.
- Do NOT invent candidate experience, skills, qualifications, or job requirements.
- Calculate a match_score from 0 to 100 based on how well the resume matches the job description.
- Extract matching and missing skills and keywords.
- Compare experience and education.
- Provide professional, actionable recommendations to improve the resume for this specific job.

Format the output EXACTLY as a valid JSON object. Do NOT wrap the JSON in Markdown formatting (no ```json ... ```).
The JSON MUST have the following structure:
{{
  "match_score": 0,
  "matching_skills": ["...", "..."],
  "missing_skills": ["...", "..."],
  "matching_keywords": ["...", "..."],
  "missing_keywords": ["...", "..."],
  "experience_match": "...",
  "education_match": "...",
  "strengths": ["...", "..."],
  "gaps": ["...", "..."],
  "recommendations": ["...", "..."],
  "summary": "..."
}}

Candidate Resume:
{json.dumps(resume_data, indent=2)}

Job Advertisement:
{job_description}
"""
    return prompt
