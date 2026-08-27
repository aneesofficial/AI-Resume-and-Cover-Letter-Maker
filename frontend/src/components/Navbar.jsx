import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <a href="#" className="navbar-brand">Resume & Cover Letter Maker</a>
                <div className="navbar-links">
                    <a href="#home">Home</a>
                    <a href="#resume">Resume</a>
                    <a href="#cover-letter">Cover Letter</a>
                    <a href="#job-analyzer">Job Analyzer</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
