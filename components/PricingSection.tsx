import React, { useEffect } from 'react';

declare global {
    interface Window { paypal?: any; }
}

export const PricingSection = () => {
    useEffect(() => {
        if (window.paypal) {
            window.paypal.Buttons({
                createOrder: (data: any, actions: any) => actions.order.create({
                    purchase_units: [{ amount: { value: '99.00' } }]
                }),
                onApprove: (data: any, actions: any) => actions.order.capture()
            }).render('#paypal-button-container');
        } else {
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID`;
            script.onload = () => {
                if (window.paypal) {
                    window.paypal.Buttons({
                        createOrder: (data: any, actions: any) => actions.order.create({
                            purchase_units: [{ amount: { value: '99.00' } }]
                        }),
                        onApprove: (data: any, actions: any) => actions.order.capture()
                    }).render('#paypal-button-container');
                }
            };
            document.body.appendChild(script);
        }
    }, []);

    return (
        <section id="pricing" aria-labelledby="pricing-heading">
            <h2 id="pricing-heading">Pricing & Payment</h2>
            <p>Affordable rates for top-quality math support. Choose a plan that suits your needs or opt for hourly services.</p>
            <div className="pricing-options">
                <div className="pricing-card">
                    <h3>Hourly Tutoring</h3>
                    <p>$50 - $70 / hour (depending on level)</p>
                    <p>Flexible scheduling for targeted help.</p>
                </div>
                <div className="pricing-card">
                    <h3>Homework Help Subscription</h3>
                    <p>$99 / month</p>
                    <p>Access to AI helper and 5 problem reviews by a human tutor.</p>
                </div>
                <div className="pricing-card">
                    <h3>Thesis Consultation Package</h3>
                    <p>Custom Quote</p>
                    <p>Tailored support packages for your research project.</p>
                </div>
            </div>
            <div className="payment-buttons">
                <div id="paypal-button-container"></div>
                <button className="cta-button other-payment-button" onClick={() => alert('Stripe and other payment gateway integrations are planned!')} aria-label="Other payment options">Other Payment Options</button>
            </div>
        </section>
    );
};
