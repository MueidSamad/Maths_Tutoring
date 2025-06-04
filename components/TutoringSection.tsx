
import React from 'react';
import { FormTypeKey } from './ContactBookingSection'; // Import FormTypeKey

interface TutoringSectionProps {
  navigateToContact: (serviceKey: Extract<FormTypeKey, 'HighSchool' | 'University'>) => void;
}

export const TutoringSection: React.FC<TutoringSectionProps> = ({ navigateToContact }) => {
    return (
        <section id="tutoring" aria-labelledby="tutoring-heading">
            <h2 id="tutoring-heading">Expert Math Tutoring</h2>
            <p>Personalized tutoring sessions for High School and University students. We cover a wide range of topics from Algebra to Advanced Calculus.</p>
            <div className="service-options">
                <div className="service-card">
                    <h3>High School Math</h3>
                    <p>Algebra, Geometry, Trigonometry, Pre-Calculus, AP Calculus, Statistics.</p>
                    <button className="cta-button" onClick={() => navigateToContact('HighSchool')}>
                        Book High School Tutor
                    </button>
                </div>
                <div className="service-card">
                    <h3>University Math</h3>
                    <p>Calculus I, II, III, Linear Algebra, Differential Equations, Abstract Algebra, Real Analysis.</p>
                    <button className="cta-button" onClick={() => navigateToContact('University')}>
                        Book University Tutor
                    </button>
                </div>
            </div>
        </section>
    );
};
