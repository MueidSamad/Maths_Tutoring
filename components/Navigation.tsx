import React from 'react';

export interface NavigationProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
    const navItems = [
        { id: 'tutoring', label: 'Tutoring' },
        { id: 'homework', label: 'Homework Help' },
        { id: 'thesis', label: 'Thesis Assistance' },
        { id: 'pricing', label: 'Pricing & Payment' },
        { id: 'contact', label: 'Contact & Booking' }, // New Item
        { id: 'about', label: 'About Us' },
    ];

    return (
        <nav className="app-nav" aria-label="Main navigation">
            <ul>
                {navItems.map(item => (
                    <li key={item.id} className={activeSection === item.id ? 'active' : ''}>
                        <button
                            onClick={() => setActiveSection(item.id)}
                            aria-current={activeSection === item.id ? 'page' : undefined}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};