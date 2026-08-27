import React from 'react';

const ResumeMatchPreview = ({ matchData }) => {
    if (!matchData) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="card" id="results">
            <div className="print-actions">
                <button className="btn btn-primary" onClick={handlePrint}>
                    Print / Save as PDF
                </button>
            </div>
            
            <div className="resume-match-preview">
                <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-color)' }}>
                    Resume Match Score: {matchData.match_score}%
                </h1>

                {/* Progress bar visual indicator */}
                <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '8px', height: '24px', marginBottom: '2rem', overflow: 'hidden' }}>
                    <div style={{
                        width: `${matchData.match_score}%`,
                        backgroundColor: matchData.match_score >= 80 ? '#10b981' : matchData.match_score >= 60 ? '#f59e0b' : '#ef4444',
                        height: '100%',
                        transition: 'width 0.5s ease-in-out'
                    }}></div>
                </div>

                <div className="resume-section">
                    <div className="resume-section-title">Analysis Summary</div>
                    <p style={{ lineHeight: '1.6' }}>{matchData.summary}</p>
                </div>

                <div className="resume-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="resume-section-title" style={{ marginBottom: '0' }}>Skills Analysis</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>Matching Skills</h4>
                            <div className="resume-skills-list">
                                {matchData.matching_skills?.map((skill, idx) => (
                                    <span key={idx} className="resume-skill-item" style={{ backgroundColor: '#d1fae5', color: '#065f46', borderColor: '#a7f3d0' }}>{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Missing Skills</h4>
                            <div className="resume-skills-list">
                                {matchData.missing_skills?.map((skill, idx) => (
                                    <span key={idx} className="resume-skill-item" style={{ backgroundColor: '#fee2e2', color: '#b91c1c', borderColor: '#fecaca' }}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="resume-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="resume-section-title" style={{ marginBottom: '0' }}>Keywords Analysis</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>Matching Keywords</h4>
                            <div className="resume-skills-list">
                                {matchData.matching_keywords?.map((kw, idx) => (
                                    <span key={idx} className="resume-skill-item" style={{ backgroundColor: '#d1fae5', color: '#065f46', borderColor: '#a7f3d0' }}>{kw}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Missing Keywords</h4>
                            <div className="resume-skills-list">
                                {matchData.missing_keywords?.map((kw, idx) => (
                                    <span key={idx} className="resume-skill-item" style={{ backgroundColor: '#fee2e2', color: '#b91c1c', borderColor: '#fecaca' }}>{kw}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="resume-section">
                    <div className="resume-section-title">Experience & Education</div>
                    <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>Experience Match</h4>
                        <p style={{ lineHeight: '1.6' }}>{matchData.experience_match}</p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '0.5rem' }}>Education Match</h4>
                        <p style={{ lineHeight: '1.6' }}>{matchData.education_match}</p>
                    </div>
                </div>

                <div className="resume-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="resume-section-title" style={{ marginBottom: '0' }}>Strengths & Gaps</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>Strengths</h4>
                            <ul className="resume-list">
                                {matchData.strengths?.map((str, idx) => (
                                    <li key={idx}>{str}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>Gaps</h4>
                            <ul className="resume-list">
                                {matchData.gaps?.map((gap, idx) => (
                                    <li key={idx}>{gap}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {matchData.recommendations && matchData.recommendations.length > 0 && (
                    <div className="resume-section">
                        <div className="resume-section-title">Recommendations to Improve</div>
                        <ul className="resume-list" style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                            {matchData.recommendations.map((rec, idx) => (
                                <li key={idx} style={{ color: '#0369a1', marginBottom: '0.5rem', fontWeight: '500' }}>{rec}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeMatchPreview;
