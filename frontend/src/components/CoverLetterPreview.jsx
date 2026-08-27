import React from 'react';

const CoverLetterPreview = ({ coverLetterData, candidateInfo, jobInfo }) => {
    if (!coverLetterData) return null;

    const handlePrint = () => {
        window.print();
    };

    // Format the current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const recipient = jobInfo.company ? jobInfo.company : 'Hiring Manager';

    return (
        <div className="card" id="results">
            <div className="print-actions">
                <button className="btn btn-primary" onClick={handlePrint} style={{ marginRight: '0.5rem' }}>
                    Download PDF
                </button>
                <button className="btn btn-outline" onClick={handlePrint}>
                    Print
                </button>
            </div>
            
            <div className="cover-letter-preview">
                {/* Header: Candidate Info */}
                <div className="cl-header">
                    <h1 className="cl-name">{candidateInfo.full_name || 'Candidate Name'}</h1>
                    {candidateInfo.professional_title && (
                        <div className="cl-title">{candidateInfo.professional_title}</div>
                    )}
                    <div className="cl-contact">
                        {candidateInfo.email && <span>{candidateInfo.email}</span>}
                        {candidateInfo.email && candidateInfo.phone && <span>|</span>}
                        {candidateInfo.phone && <span>{candidateInfo.phone}</span>}
                        {((candidateInfo.email || candidateInfo.phone) && candidateInfo.location) && <span>|</span>}
                        {candidateInfo.location && <span>{candidateInfo.location}</span>}
                    </div>
                </div>

                <div className="cl-content">
                    {/* Date */}
                    <div className="cl-date">{currentDate}</div>
                    
                    {/* Recipient */}
                    <div className="cl-recipient">{recipient}</div>
                    
                    {/* Subject */}
                    {coverLetterData.subject && (
                        <div className="cl-subject">
                            <strong>Subject:</strong> {coverLetterData.subject}
                        </div>
                    )}
                    
                    {/* Greeting */}
                    <div className="cl-greeting">
                        {coverLetterData.greeting || 'Dear Hiring Manager,'}
                    </div>
                    
                    {/* Body Paragraphs */}
                    <div className="cl-body">
                        {coverLetterData.body && coverLetterData.body.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                    
                    {/* Closing & Signature */}
                    <div className="cl-closing">
                        <p>{coverLetterData.closing || 'Sincerely,'}</p>
                        <p className="cl-signature">{candidateInfo.full_name || 'Candidate Name'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverLetterPreview;
