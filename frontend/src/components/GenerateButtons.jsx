import React from 'react';

const GenerateButtons = ({ 
    isLoading, 
    onGenerateResume, 
    onGenerateCoverLetter, 
    onAnalyzeJob,
    onAnalyzeMatch,
    selectedTone,
    setSelectedTone,
    hasGeneratedResume,
    hasGeneratedCoverLetter,
    hasJobDescription,
    onReset
}) => {
    return (
        <div className="card">
            <h2>Generate Documents</h2>
            <p>Select your preferred tone and process your information using Gemini AI.</p>
            
            <div className="form-group" style={{ maxWidth: '300px', marginBottom: '1.5rem' }}>
                <label className="form-label" htmlFor="tone-selector">Select Professional Tone</label>
                <select 
                    id="tone-selector" 
                    className="form-input" 
                    value={selectedTone} 
                    onChange={(e) => setSelectedTone(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="Professional">Professional</option>
                    <option value="Confident">Confident</option>
                    <option value="Concise">Concise</option>
                    <option value="Friendly">Friendly</option>
                </select>
            </div>

            <div className="button-group">
                <button 
                    className="btn btn-primary" 
                    onClick={onGenerateResume} 
                    disabled={isLoading}
                >
                    {hasGeneratedResume ? "Regenerate Resume" : "Generate Resume"}
                </button>
                <button 
                    className="btn btn-primary" 
                    onClick={onGenerateCoverLetter} 
                    disabled={isLoading}
                >
                    {hasGeneratedCoverLetter ? "Regenerate Cover Letter" : "Generate Cover Letter"}
                </button>
                <button 
                    className="btn btn-outline" 
                    onClick={onAnalyzeJob} 
                    disabled={isLoading}
                >
                    Analyze Job
                </button>
                
                {hasGeneratedResume && hasJobDescription && (
                    <button 
                        className="btn btn-outline" 
                        onClick={onAnalyzeMatch} 
                        disabled={isLoading}
                        style={{ marginLeft: 'auto' }}
                    >
                        Analyze Resume Match
                    </button>
                )}
                
                <button 
                    className="btn btn-outline" 
                    onClick={onReset} 
                    disabled={isLoading}
                    style={{ marginLeft: hasGeneratedResume && hasJobDescription ? '1rem' : 'auto', color: 'var(--error-color)', borderColor: 'var(--error-color)' }}
                >
                    Clear / Start Again
                </button>
            </div>
        </div>
    );
};

export default GenerateButtons;
