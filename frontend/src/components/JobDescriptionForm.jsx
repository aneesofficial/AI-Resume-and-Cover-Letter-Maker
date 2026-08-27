import React from 'react';

const JobDescriptionForm = ({ jobInfo, setJobInfo }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="card" id="job-info">
            <h2>Job Information</h2>
            <p>Provide the job details to tailor your cover letter or analyze the job requirements.</p>
            
            <div className="form-grid">
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Job Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        className="form-input" 
                        value={jobInfo.title} 
                        onChange={handleChange} 
                        placeholder="e.g. Software Engineer"
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label" htmlFor="company">Company Name</label>
                    <input 
                        type="text" 
                        id="company" 
                        name="company" 
                        className="form-input" 
                        value={jobInfo.company} 
                        onChange={handleChange} 
                        placeholder="e.g. Google"
                    />
                </div>
            </div>
            
            <div className="form-group">
                <label className="form-label" htmlFor="description">Job Description</label>
                <textarea 
                    id="description" 
                    name="description" 
                    className="form-textarea" 
                    value={jobInfo.description} 
                    onChange={handleChange} 
                    placeholder="Paste the job advertisement or job description here..."
                    style={{ minHeight: '200px' }}
                />
            </div>
        </div>
    );
};

export default JobDescriptionForm;
