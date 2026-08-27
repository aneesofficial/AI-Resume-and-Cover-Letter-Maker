import React, { useState } from 'react';

const CandidateForm = ({ formData, setFormData }) => {
    const [skillInput, setSkillInput] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newSkill = skillInput.trim();
            if (newSkill && !formData.skills.includes(newSkill)) {
                setFormData(prev => ({
                    ...prev,
                    skills: [...(prev.skills || []), newSkill]
                }));
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: (prev.skills || []).filter(skill => skill !== skillToRemove)
        }));
    };

    return (
        <div className="card" id="candidate-info">
            <h2>Candidate Information</h2>
            <p>Enter your professional details to generate AI-tailored documents.</p>
            
            <div className="form-grid">
                <div className="form-group">
                    <label className="form-label" htmlFor="full_name">Full Name *</label>
                    <input 
                        type="text" 
                        id="full_name" 
                        name="full_name" 
                        className="form-input" 
                        value={formData.full_name} 
                        onChange={handleChange} 
                        placeholder="e.g. Anees Ur Rehman"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label" htmlFor="professional_title">Professional Title</label>
                    <input 
                        type="text" 
                        id="professional_title" 
                        name="professional_title" 
                        className="form-input" 
                        value={formData.professional_title} 
                        onChange={handleChange} 
                        placeholder="e.g. AI Engineering Intern"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="form-input" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="e.g. anees@example.com"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <input 
                        type="text" 
                        id="phone" 
                        name="phone" 
                        className="form-input" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="e.g. +1 234 567 8900"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="location">Location</label>
                    <input 
                        type="text" 
                        id="location" 
                        name="location" 
                        className="form-input" 
                        value={formData.location} 
                        onChange={handleChange} 
                        placeholder="e.g. San Francisco, CA"
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label" htmlFor="skills">Skills (press Enter or Comma to add)</label>
                    <div className="skills-input-container">
                        {(formData.skills || []).map((skill, index) => (
                            <span key={index} className="skill-tag">
                                {skill}
                                <button 
                                    type="button" 
                                    className="skill-remove" 
                                    onClick={() => removeSkill(skill)}
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                        <input 
                            type="text" 
                            id="skills" 
                            className="skill-input" 
                            value={skillInput} 
                            onChange={(e) => setSkillInput(e.target.value)} 
                            onKeyDown={handleSkillKeyDown}
                            placeholder="e.g. Python"
                        />
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="summary">Professional Summary</label>
                <textarea 
                    id="summary" 
                    name="summary" 
                    className="form-textarea" 
                    value={formData.summary} 
                    onChange={handleChange} 
                    placeholder="Brief overview of your professional background..."
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="experience">Experience</label>
                <textarea 
                    id="experience" 
                    name="experience" 
                    className="form-textarea" 
                    value={formData.experience} 
                    onChange={handleChange} 
                    placeholder="List your work experience..."
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="education">Education</label>
                <textarea 
                    id="education" 
                    name="education" 
                    className="form-textarea" 
                    value={formData.education} 
                    onChange={handleChange} 
                    placeholder="List your educational background..."
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="projects">Projects</label>
                <textarea 
                    id="projects" 
                    name="projects" 
                    className="form-textarea" 
                    value={formData.projects} 
                    onChange={handleChange} 
                    placeholder="Describe relevant projects..."
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="certifications">Certifications</label>
                <textarea 
                    id="certifications" 
                    name="certifications" 
                    className="form-textarea" 
                    value={formData.certifications} 
                    onChange={handleChange} 
                    placeholder="List any relevant certifications..."
                />
            </div>
        </div>
    );
};

export default CandidateForm;
