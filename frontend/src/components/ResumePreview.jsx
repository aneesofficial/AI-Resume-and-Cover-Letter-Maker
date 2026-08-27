import React, { useState, useEffect } from 'react';

const ResumePreview = ({ resumeData, candidateInfo, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState(resumeData);

    useEffect(() => {
        if (resumeData) {
            setData(resumeData);
            setIsEditing(false); // Reset to preview mode when regenerated
        }
    }, [resumeData]);

    useEffect(() => {
        if (onUpdate && data) {
            onUpdate(data);
        }
    }, [data, onUpdate]);

    if (!data) return null;

    const handlePrint = () => {
        if (isEditing) {
            setIsEditing(false);
            setTimeout(() => {
                window.print();
            }, 100);
        } else {
            window.print();
        }
    };

    // Helper to handle simple field changes
    const handleChange = (e, field) => {
        setData({ ...data, [field]: e.target.value });
    };

    // Helper for arrays of objects (experience, projects, education)
    const handleArrayChange = (e, arrayName, index, field) => {
        const newArray = [...(data[arrayName] || [])];
        newArray[index] = { ...newArray[index], [field]: e.target.value };
        setData({ ...data, [arrayName]: newArray });
    };

    // Helper for bullet lists (experience description, project description)
    const handleBulletChange = (e, arrayName, index, field) => {
        const newArray = [...(data[arrayName] || [])];
        newArray[index] = { ...newArray[index], [field]: e.target.value.split('\n') };
        setData({ ...data, [arrayName]: newArray });
    };

    // Helper for simple lists (skills, certifications)
    const handleListChange = (e, field, separator = '\n') => {
        setData({ ...data, [field]: e.target.value.split(separator).map(s => s.trim()).filter(s => s) });
    };

    return (
        <div className="card" id="results">
            <div className="print-actions">
                <button 
                    className="btn btn-outline" 
                    onClick={() => setIsEditing(!isEditing)} 
                    style={{ marginRight: '0.5rem' }}
                >
                    {isEditing ? 'Preview Resume' : 'Edit Resume'}
                </button>
                <button className="btn btn-primary" onClick={handlePrint}>
                    Print / Save as PDF
                </button>
            </div>
            
            {isEditing ? (
                <div className="resume-editor">
                    <h2 style={{marginBottom: '1.5rem', color: 'var(--primary-color)'}}>Edit Resume Content</h2>
                    
                    <div className="form-group">
                        <label className="form-label">Professional Summary</label>
                        <textarea 
                            className="form-textarea"
                            value={data.professional_summary || ''}
                            onChange={(e) => handleChange(e, 'professional_summary')}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Skills (comma-separated)</label>
                        <textarea 
                            className="form-textarea"
                            style={{minHeight: '80px'}}
                            value={(data.skills || []).join(', ')}
                            onChange={(e) => handleListChange(e, 'skills', ',')}
                        />
                    </div>

                    {data.experience && data.experience.length > 0 && (
                        <div className="edit-section">
                            <h3 className="edit-section-title">Experience</h3>
                            {data.experience.map((exp, idx) => (
                                <div key={idx} className="edit-item-box">
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label className="form-label">Job Title</label>
                                            <input className="form-input" value={exp.title || ''} onChange={(e) => handleArrayChange(e, 'experience', idx, 'title')} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Company</label>
                                            <input className="form-input" value={exp.company || ''} onChange={(e) => handleArrayChange(e, 'experience', idx, 'company')} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Date</label>
                                            <input className="form-input" value={exp.date || ''} onChange={(e) => handleArrayChange(e, 'experience', idx, 'date')} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Description (one bullet per line)</label>
                                        <textarea 
                                            className="form-textarea"
                                            value={(exp.description || []).join('\n')}
                                            onChange={(e) => handleBulletChange(e, 'experience', idx, 'description')}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.projects && data.projects.length > 0 && (
                        <div className="edit-section">
                            <h3 className="edit-section-title">Projects</h3>
                            {data.projects.map((proj, idx) => (
                                <div key={idx} className="edit-item-box">
                                    <div className="form-group">
                                        <label className="form-label">Project Name</label>
                                        <input className="form-input" value={proj.name || ''} onChange={(e) => handleArrayChange(e, 'projects', idx, 'name')} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Description (one bullet per line)</label>
                                        <textarea 
                                            className="form-textarea"
                                            value={(proj.description || []).join('\n')}
                                            onChange={(e) => handleBulletChange(e, 'projects', idx, 'description')}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.education && data.education.length > 0 && (
                        <div className="edit-section">
                            <h3 className="edit-section-title">Education</h3>
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="edit-item-box">
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label className="form-label">Degree</label>
                                            <input className="form-input" value={edu.degree || ''} onChange={(e) => handleArrayChange(e, 'education', idx, 'degree')} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Institution</label>
                                            <input className="form-input" value={edu.institution || ''} onChange={(e) => handleArrayChange(e, 'education', idx, 'institution')} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Date</label>
                                            <input className="form-input" value={edu.date || ''} onChange={(e) => handleArrayChange(e, 'education', idx, 'date')} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.certifications && data.certifications.length > 0 && (
                        <div className="form-group">
                            <label className="form-label">Certifications (one per line)</label>
                            <textarea 
                                className="form-textarea"
                                value={(data.certifications || []).join('\n')}
                                onChange={(e) => handleListChange(e, 'certifications', '\n')}
                            />
                        </div>
                    )}

                </div>
            ) : (
                <div className="resume-preview">
                    {/* Header */}
                    <div className="resume-header">
                        <h1 className="resume-name">{candidateInfo.full_name || 'Candidate Name'}</h1>
                        {candidateInfo.professional_title && (
                            <div className="resume-title">{candidateInfo.professional_title}</div>
                        )}
                        <div className="resume-contact">
                            {candidateInfo.email && <span>{candidateInfo.email}</span>}
                            {candidateInfo.email && candidateInfo.phone && <span>|</span>}
                            {candidateInfo.phone && <span>{candidateInfo.phone}</span>}
                            {((candidateInfo.email || candidateInfo.phone) && candidateInfo.location) && <span>|</span>}
                            {candidateInfo.location && <span>{candidateInfo.location}</span>}
                        </div>
                    </div>

                    {/* Professional Summary */}
                    {data.professional_summary && (
                        <div className="resume-section">
                            <div className="resume-section-title">Professional Summary</div>
                            <p className="resume-summary-text">{data.professional_summary}</p>
                        </div>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <div className="resume-section">
                            <div className="resume-section-title">Skills</div>
                            <div className="resume-skills-list">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx} className="resume-skill-item">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <div className="resume-section">
                            <div className="resume-section-title">Experience</div>
                            {data.experience.map((exp, idx) => (
                                <div key={idx} className="resume-item">
                                    <div className="resume-item-header">
                                        <div className="resume-item-title">{exp.title}</div>
                                        <div className="resume-item-date">{exp.date}</div>
                                    </div>
                                    {exp.company && <div className="resume-item-subtitle">{exp.company}</div>}
                                    {exp.description && exp.description.length > 0 && (
                                        <ul className="resume-list">
                                            {exp.description.map((bullet, bIdx) => (
                                                <li key={bIdx}>{bullet}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <div className="resume-section">
                            <div className="resume-section-title">Projects</div>
                            {data.projects.map((proj, idx) => (
                                <div key={idx} className="resume-item">
                                    <div className="resume-item-header">
                                        <div className="resume-item-title">{proj.name}</div>
                                    </div>
                                    {proj.description && proj.description.length > 0 && (
                                        <ul className="resume-list">
                                            {proj.description.map((bullet, bIdx) => (
                                                <li key={bIdx}>{bullet}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <div className="resume-section">
                            <div className="resume-section-title">Education</div>
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="resume-item">
                                    <div className="resume-item-header">
                                        <div className="resume-item-title">{edu.degree}</div>
                                        <div className="resume-item-date">{edu.date}</div>
                                    </div>
                                    {edu.institution && <div className="resume-item-subtitle">{edu.institution}</div>}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Certifications */}
                    {data.certifications && data.certifications.length > 0 && (
                        <div className="resume-section">
                            <div className="resume-section-title">Certifications</div>
                            <ul className="resume-list" style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                {data.certifications.map((cert, idx) => (
                                    <li key={idx}>{cert}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResumePreview;
