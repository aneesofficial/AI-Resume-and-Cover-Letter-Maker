const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

/**
 * Utility function to handle fetch responses and throw standard errors.
 */
async function fetchWithHandler(url, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            let errorMessage = 'Something went wrong. Please try again.';
            try {
                const errorData = await response.json();
                if (errorData && errorData.detail) {
                    errorMessage = errorData.detail;
                }
            } catch (e) {
                // Ignore parsing errors for error payloads
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
            throw new Error('Unable to connect to the server. Please ensure the backend is running.');
        }
        throw error;
    }
}

export const checkHealth = () => fetchWithHandler('/api/health');

export const generateResume = (data) => 
    fetchWithHandler('/api/resume/generate', {
        method: 'POST',
        body: JSON.stringify(data)
    });

export const generateCoverLetter = (data) => 
    fetchWithHandler('/api/cover-letter/generate', {
        method: 'POST',
        body: JSON.stringify(data)
    });

export const analyzeJob = (jobDescription) => 
    fetchWithHandler('/api/job-analysis/analyze', {
        method: 'POST',
        body: JSON.stringify({ job_description: jobDescription })
    });

export const matchResumeToJob = (resume, jobDescription) => 
    fetchWithHandler('/api/job-analysis/match', {
        method: 'POST',
        body: JSON.stringify({ resume, job_description: jobDescription })
    });
