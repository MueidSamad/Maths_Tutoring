
import React from 'react';
import { FormTypeKey } from './ContactBookingSection'; // Import FormTypeKey

interface ThesisSectionProps {
  navigateToContact: (serviceKey: Extract<FormTypeKey, 'Thesis'>) => void;
}

export const ThesisSection: React.FC<ThesisSectionProps> = ({ navigateToContact }) => (
    <section id="thesis" aria-labelledby="thesis-heading">
        <h2 id="thesis-heading">Thesis & Research Support</h2>
        <p>Expert guidance for your mathematics thesis, from topic selection to final review. We assist with structuring arguments, literature reviews, mathematical typesetting (e.g., LaTeX), and data analysis.</p>
        <button className="cta-button" onClick={() => navigateToContact('Thesis')}>
            Inquire About Thesis Support
        </button>
    </section>
);
