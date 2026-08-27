import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CandidateForm from '../components/CandidateForm';
import JobDescriptionForm from '../components/JobDescriptionForm';
import GenerateButtons from '../components/GenerateButtons';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import ResumePreview from '../components/ResumePreview';
import CoverLetterPreview from '../components/CoverLetterPreview';
import JobAnalysisPreview from '../components/JobAnalysisPreview';
import ResumeMatchPreview from '../components/ResumeMatchPreview';
import { checkHealth, generateResume, generateCoverLetter, analyzeJob, matchResumeToJob } from '../services/api';

const Home = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        location: '',
        professional_title: '',
        summary: '',
        skills: [],
        experience: '',
        education: '',
        projects: '',
        certifications: ''
    });

    const [jobInfo, setJobInfo] = useState({
        title: '',
        company: '',
        description: ''
    });
    
    const [selectedTone, setSelectedTone] = useState("Professional");
    const [hasGeneratedResume, setHasGeneratedResume] = useState(false);
    const [hasGeneratedCoverLetter, setHasGeneratedCoverLetter] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [currentResume, setCurrentResume] = useState(null);
    const [backendStatus, setBackendStatus] = useState('Checking backend connection...');

    useEffect(() => {
        checkHealth()
            .then(res => setBackendStatus('Backend is connected and healthy.'))
            .catch(err => setBackendStatus(`Backend connection issue: ${err.message}`));
    }, []);

    const prepareCandidateData = () => {
        return { ...formData };
    };

    const prepareJobDescriptionString = () => {
        const parts = [];
        if (jobInfo.title) parts.push(`Job Title: ${jobInfo.title}`);
        if (jobInfo.company) parts.push(`Company: ${jobInfo.company}`);
        if (jobInfo.description) parts.push(`Description: ${jobInfo.description}`);
        return parts.join('\n\n');
    };

    const handleGenerateResume = async () => {
        if (!formData.full_name) {
            setError("Full Name is required to generate a resume.");
            return;
        }
        setIsLoading(true);
        setLoadingMessage(hasGeneratedResume ? 'Regenerating Resume...' : 'Generating Resume...');
        setError(null);
        setResult(null);

        try {
            const payload = {
                ...prepareCandidateData(),
                tone: selectedTone
            };
            const data = await generateResume(payload);
            setResult({ title: 'Generated Resume', type: 'resume', data });
            setCurrentResume(data);
            setHasGeneratedResume(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateCoverLetter = async () => {
        const fullDescription = prepareJobDescriptionString();
        
        if (!formData.full_name || !fullDescription.trim()) {
            setError("Full Name and Job Description are required to generate a cover letter.");
            return;
        }
        setIsLoading(true);
        setLoadingMessage(hasGeneratedCoverLetter ? 'Regenerating Cover Letter...' : 'Generating Cover Letter...');
        setError(null);
        setResult(null);

        try {
            const payload = {
                candidate: prepareCandidateData(),
                job_description: fullDescription,
                tone: selectedTone
            };
            const data = await generateCoverLetter(payload);
            setResult({ title: 'Generated Cover Letter', type: 'cover_letter', data });
            setHasGeneratedCoverLetter(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnalyzeJob = async () => {
        const fullDescription = prepareJobDescriptionString();
        
        if (!fullDescription.trim()) {
            setError("Job Description details are required to analyze a job.");
            return;
        }
        setIsLoading(true);
        setLoadingMessage('Analyzing Job Advertisement...');
        setError(null);
        setResult(null);

        try {
            const data = await analyzeJob(fullDescription);
            setResult({ title: 'Job Analysis', type: 'job_analysis', data });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    const handleAnalyzeMatch = async () => {
        const fullDescription = prepareJobDescriptionString();
        
        if (!fullDescription.trim()) {
            setError("Job Description details are required to analyze a match.");
            return;
        }
        if (!currentResume) {
            setError("A generated resume is required to analyze a match.");
            return;
        }
        setIsLoading(true);
        setLoadingMessage('Analyzing Resume Match...');
        setError(null);
        setResult(null);

        try {
            const data = await matchResumeToJob(currentResume, fullDescription);
            setResult({ title: 'Resume Match Analysis', type: 'resume_match', data });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            full_name: '', email: '', phone: '', location: '', professional_title: '',
            summary: '', skills: [], experience: '', education: '', projects: '', certifications: ''
        });
        setJobInfo({ title: '', company: '', description: '' });
        setResult(null);
        setCurrentResume(null);
        setHasGeneratedResume(false);
        setHasGeneratedCoverLetter(false);
        setError(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="app-layout">
            <Navbar />
            
            {/* Hero Section */}
            <section className="hero" id="home">
                <div className="container">
                    <h1>Build Your Professional Resume & Cover Letter with AI</h1>
                    <p>Create ATS-friendly resumes, tailored cover letters, and analyze job advertisements using Gemini AI.</p>
                    <a href="#candidate-info" className="btn btn-primary">Get Started</a>
                    <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        {backendStatus}
                    </div>
                </div>
            </section>

            <main className="container">
                <ErrorMessage error={error} />

                <CandidateForm 
                    formData={formData} 
                    setFormData={setFormData} 
                />
                
                <hr className="section-divider" />

                <JobDescriptionForm 
                    jobInfo={jobInfo} 
                    setJobInfo={setJobInfo} 
                />
                
                <hr className="section-divider" />

                <GenerateButtons 
                    isLoading={isLoading}
                    onGenerateResume={handleGenerateResume}
                    onGenerateCoverLetter={handleGenerateCoverLetter}
                    onAnalyzeJob={handleAnalyzeJob}
                    onAnalyzeMatch={handleAnalyzeMatch}
                    selectedTone={selectedTone}
                    setSelectedTone={setSelectedTone}
                    hasGeneratedResume={hasGeneratedResume}
                    hasGeneratedCoverLetter={hasGeneratedCoverLetter}
                    hasJobDescription={!!prepareJobDescriptionString().trim()}
                    onReset={handleReset}
                />

                {isLoading && (
                    <LoadingState message={loadingMessage} />
                )}

                {!isLoading && result && (
                    <div className="results-container">
                        {result.type === 'resume' ? (
                            <ResumePreview 
                                resumeData={result.data} 
                                candidateInfo={formData} 
                                onUpdate={(newData) => setCurrentResume(newData)} 
                            />
                        ) : result.type === 'cover_letter' ? (
                            <CoverLetterPreview coverLetterData={result.data} candidateInfo={formData} jobInfo={jobInfo} />
                        ) : result.type === 'job_analysis' ? (
                            <JobAnalysisPreview analysisData={result.data} />
                        ) : result.type === 'resume_match' ? (
                            <ResumeMatchPreview matchData={result.data} />
                        ) : (
                            <div className="card" id="results">
                                <h2>{result.title}</h2>
                                <pre className="result-pre">
                                    {JSON.stringify(result.data, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
