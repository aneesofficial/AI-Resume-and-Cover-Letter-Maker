import React from 'react';

const LoadingState = ({ message = "Processing..." }) => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <span>{message}</span>
        </div>
    );
};

export default LoadingState;
