import React from 'react';

const ErrorMessage = ({ error }) => {
    if (!error) return null;
    
    return (
        <div className="alert alert-error">
            <strong>Error: </strong> {error}
        </div>
    );
};

export default ErrorMessage;
