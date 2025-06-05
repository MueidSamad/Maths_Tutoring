
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { TutoringSection } from './components/TutoringSection';
import { HomeworkHelpSection } from './components/HomeworkHelpSection';
import { ThesisSection } from './components/ThesisSection';
import { PricingSection } from './components/PricingSection';
import { AboutUsSection } from './components/AboutUsSection';
import { Footer } from './components/Footer';
import { ContactBookingSection, FormTypeKey } from './components/ContactBookingSection';
import { LoginSection } from './components/LoginSection';

const App = () => {
    const [activeSection, setActiveSectionState] = useState<string>('tutoring');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => localStorage.getItem('loggedIn') === 'true');
    // initialServiceForContact will now hold 'HighSchool', 'University', 'Thesis', or null
    const [initialServiceForContact, setInitialServiceForContact] = useState<FormTypeKey | null>(null);

    // For main navigation clicks
    const handleNavChange = (section: string) => {
        setActiveSectionState(section);
        // Clear pre-fill if navigating via main nav to contact, or away from contact
        if (section === 'contact' && initialServiceForContact !== null) {
            // If navigating to contact directly, or if initialService was set but user chose general nav
            // Allow ContactBookingSection to show its own selectors by clearing initialService
            setInitialServiceForContact(null);
        } else if (section !== 'contact') {
            setInitialServiceForContact(null); // Clear if navigating away from contact entirely
        }
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
        setActiveSectionState('homework');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('loggedIn');
        setActiveSectionState('login');
    };

    // For specific CTAs (e.g., "Book Tutor", "Inquire Thesis")
    // The serviceKey now directly matches the FormTypeKey used in ContactBookingSection
    const navigateToContactWithService = (serviceKey: FormTypeKey) => {
        setInitialServiceForContact(serviceKey);
        setActiveSectionState('contact'); // Navigate to the contact section
    };
    
    // Called by ContactBookingSection after it has used the initialService
    const handleServiceConsumed = () => {
        setInitialServiceForContact(null);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'tutoring':
                return <TutoringSection navigateToContact={navigateToContactWithService} />;
            case 'homework':
                return <HomeworkHelpSection isLoggedIn={isLoggedIn} />;
            case 'thesis':
                return <ThesisSection navigateToContact={navigateToContactWithService} />;
            case 'pricing':
                return <PricingSection />;
            case 'about':
                return <AboutUsSection />;
            case 'login':
                return <LoginSection onLogin={handleLogin} />;
            case 'contact':
                return <ContactBookingSection initialService={initialServiceForContact} onServiceConsumed={handleServiceConsumed} />;
            default:
                return <TutoringSection navigateToContact={navigateToContactWithService} />;
        }
    };

    useEffect(() => {
        const sectionElement = document.getElementById(activeSection);
        if (sectionElement) {
            setTimeout(() => {
                 sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 0);
        }
        
        const pageTitles: { [key: string]: string } = {
            tutoring: 'Math Tutoring Services',
            homework: 'Homework Help',
            thesis: 'Thesis Assistance',
            pricing: 'Pricing and Payment',
            about: 'About Us',
            contact: 'Contact & Booking',
            login: 'Login'
        };
        document.title = `Math Genius Hub | ${pageTitles[activeSection] || 'Welcome'}`;

    }, [activeSection]);


    return (
        <div className="app-container">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <Header />
            <Navigation activeSection={activeSection} setActiveSection={handleNavChange} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <main id="main-content" role="main" tabIndex={-1}>
                {renderSection()}
            </main>
            <Footer />
        </div>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Failed to find the root element. The 'root' div is missing in your HTML.");
}
