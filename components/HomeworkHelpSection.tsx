import React, { useState } from 'react';

export interface HomeworkHelpSectionProps {
    isLoggedIn: boolean;
}

export const HomeworkHelpSection: React.FC<HomeworkHelpSectionProps> = ({ isLoggedIn }) => {
    const [homeworkQuery, setHomeworkQuery] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleHomeworkSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!homeworkQuery.trim()) {
            setError('Please enter your math problem.');
            setAiResponse('');
            return;
        }
        setIsLoading(true);
        setError('');
        setAiResponse('');

        // Placeholder for Gemini API call
        // In a real app, you would import GoogleGenAI and make the call here.
        // Example:
        // try {
        //   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        //   const response = await ai.models.generateContent({
        //     model: 'gemini-2.5-flash-preview-04-17',
        //     contents: `Help with this math problem: ${homeworkQuery}`,
        //   });
        //   setAiResponse(response.text);
        // } catch (e) {
        //   console.error("Error calling AI model:", e);
        //   setError('Failed to get help from AI. Please try again.');
        // } finally {
        //   setIsLoading(false);
        // }

        // Simulate API call for now
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setAiResponse(`Help for "${homeworkQuery}": This is a placeholder response. AI assistance is being integrated! For complex queries, our tutors are available.`);
        } catch (e) {
            setError('Failed to get help. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <section id="homework" aria-labelledby="homework-heading">
                <h2 id="homework-heading">Homework Assistance</h2>
                <p>You must be logged in to access the AI assistant.</p>
            </section>
        );
    }

    return (
        <section id="homework" aria-labelledby="homework-heading">
            <h2 id="homework-heading">Homework Assistance</h2>
            <p>Stuck on a problem? Type your question below to get started. (AI-powered assistance coming soon!)</p>
            <form onSubmit={handleHomeworkSubmit} className="homework-form">
                <label htmlFor="homework-problem">Describe your math problem:</label>
                <textarea
                    id="homework-problem"
                    value={homeworkQuery}
                    onChange={(e) => setHomeworkQuery(e.target.value)}
                    placeholder="e.g., How to factor the polynomial x² - 7x + 12?"
                    rows={5}
                    aria-required="true"
                    aria-describedby={error ? "homework-error" : undefined}
                />
                {error && <p id="homework-error" className="error-message" role="alert">{error}</p>}
                <button type="submit" className="cta-button" disabled={isLoading}>
                    {isLoading ? 'Getting Help...' : 'Get Help Now'}
                </button>
            </form>
            {aiResponse && (
                <div className="ai-response" aria-live="polite">
                    <h3>AI Assistance:</h3>
                    <p>{aiResponse}</p>
                </div>
            )}
        </section>
    );
};
