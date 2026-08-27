import React, { useState } from 'react';

const JobAnalysisPreview = ({ analysisData }) => {
    const [copied, setCopied] = useState(false);

    if (!analysisData) return null;

    const handlePrint = () => {
        window.print();
    };

    const handleCopyAtsKeywords = () => {
        if (analysisData.ats_keywords && analysisData.ats_keywords.length > 0) {
            const keywordsText = analysisData.ats_keywords.join(', ');
            navigator.clipboard.writeText(keywordsText)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        }
    };

    const renderTags = (items, className = "ja-tag") => {
        if (!items || items.length === 0) return <p className="ja-empty">None specified</p>;
        return (
            <div className="ja-tags-list">
                {items.map((item, idx) => (
                    <span key={idx} className={className}>{item}</span>
                ))}
            </div>
        );
    };

    const renderList = (items) => {
        if (!items || items.length === 0) return <p className="ja-empty">None specified</p>;
        return (
            <ul className="ja-list">
                {items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>
        );
    };

    return (
        <div className="card" id="results">
            <div className="print-actions">
                <button className="btn btn-outline" onClick={handlePrint}>
                    Print / Save as PDF
                </button>
            </div>
            
            <div className="ja-preview">
                {/* Job Overview */}
                <div className="ja-section ja-overview">
                    <h1 className="ja-title">{analysisData.job_title || 'Untitled Job'}</h1>
                    {analysisData.company_name && (
                        <h2 className="ja-company">{analysisData.company_name}</h2>
                    )}
                    {analysisData.summary && (
                        <p className="ja-summary">{analysisData.summary}</p>
                    )}
                </div>

                <div className="ja-grid">
                    {/* Skills */}
                    <div className="ja-column">
                        <div className="ja-section">
                            <h3 className="ja-section-title">Required Skills</h3>
                            {renderTags(analysisData.required_skills, "ja-tag ja-tag-primary")}
                        </div>
                        <div className="ja-section">
                            <h3 className="ja-section-title">Preferred Skills</h3>
                            {renderTags(analysisData.preferred_skills, "ja-tag ja-tag-secondary")}
                        </div>
                        <div className="ja-section">
                            <h3 className="ja-section-title">Technologies</h3>
                            {renderTags(analysisData.technologies, "ja-tag")}
                        </div>
                        <div className="ja-section">
                            <h3 className="ja-section-title">Soft Skills</h3>
                            {renderTags(analysisData.soft_skills, "ja-tag ja-tag-soft")}
                        </div>
                    </div>

                    {/* Requirements & Responsibilities */}
                    <div className="ja-column">
                        <div className="ja-section">
                            <h3 className="ja-section-title">Responsibilities</h3>
                            {renderList(analysisData.responsibilities)}
                        </div>
                        <div className="ja-section">
                            <h3 className="ja-section-title">Experience Requirements</h3>
                            {renderList(analysisData.experience_requirements)}
                        </div>
                        <div className="ja-section">
                            <h3 className="ja-section-title">Education Requirements</h3>
                            {renderList(analysisData.education_requirements)}
                        </div>
                        <div className="ja-section">
                            <h3 className="ja-section-title">Keywords</h3>
                            {renderTags(analysisData.keywords, "ja-tag")}
                        </div>
                    </div>
                </div>

                {/* ATS Keywords Section */}
                <div className="ja-section ja-ats-section">
                    <div className="ja-ats-header">
                        <h3 className="ja-section-title" style={{ marginBottom: 0 }}>ATS Keywords</h3>
                        <button 
                            className="btn btn-outline btn-small" 
                            onClick={handleCopyAtsKeywords}
                            disabled={!analysisData.ats_keywords || analysisData.ats_keywords.length === 0}
                        >
                            {copied ? 'ATS keywords copied!' : 'Copy ATS Keywords'}
                        </button>
                    </div>
                    {renderTags(analysisData.ats_keywords, "ja-tag ja-tag-ats")}
                </div>
            </div>
        </div>
    );
};

export default JobAnalysisPreview;
