import React from 'react';

export const Footer = () => (
    <footer className="app-footer" role="contentinfo">
        <p>&copy; {new Date().getFullYear()} Math Genius Hub. All rights reserved.</p>
        <div className="footer-links">
            <a href="#privacy" aria-label="Privacy Policy">Privacy Policy</a> |
            <a href="#terms" aria-label="Terms of Service">Terms of Service</a> |
            <a href="#contact" aria-label="Contact Us">Contact Us</a>
        </div>
        {/* Placeholder social media links */}
        {/* <p>
            <a href="#facebook" aria-label="Facebook">FB</a> |
            <a href="#twitter" aria-label="Twitter">TW</a> |
            <a href="#linkedin" aria-label="LinkedIn">LN</a>
        </p> */}
    </footer>
);
