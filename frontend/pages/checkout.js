// frontend/pages/checkout.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';


export default function Checkout() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateCardNumber = (number) => {
        // Simple Luhn check or length check
        return number.length === 16;
    };

    const validateExpiry = (exp) => {
        // Expect MM/YY format, e.g., 12/25
        const regex = /^(\d{2})\/(\d{2})$/;
        const match = exp.match(regex);
        if (!match) return false;

        const month = parseInt(match[1], 10);
        const year = parseInt(match[2], 10);
        if (month < 1 || month > 12) return false;

        // Basic year check (assuming 20xx)
        // In real apps, you might parse full year or handle century
        return year >= 23; // e.g. 23 => 2023
    };

    const validateCVV = (c) => c.length === 3;

    const handleCheckout = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (!validateCardNumber(cardNumber)) {
            setErrorMsg('Invalid card number (16 digits required).');
            return;
        }
        if (!validateExpiry(expiry)) {
            setErrorMsg('Invalid expiry format (MM/YY).');
            return;
        }
        if (!validateCVV(cvv)) {
            setErrorMsg('Invalid CVV (3 digits required).');
            return;
        }

        // Simulate a checkout flow (fake API call)
        setIsLoading(true);
        try {
            // Placeholder for your real payment logic
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccessMsg('Payment processed successfully!');
        } catch (error) {
            setErrorMsg('Failed to process the payment. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="checkout-container">
                <h2>Checkout</h2>
                {errorMsg && <p className="error">{errorMsg}</p>}
                {successMsg && <p className="success">{successMsg}</p>}

                <form onSubmit={handleCheckout}>
                    <label>Card Number</label>
                    <input
                        type="text"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                        maxLength="16"
                        required
                    />

                    <label>Expiry (MM/YY)</label>
                    <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        required
                    />

                    <label>CVV</label>
                    <input
                        type="password"
                        placeholder="XXX"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                        maxLength="3"
                        required
                    />

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>

                <style jsx>{`
                    .checkout-container {
                        max-width: 400px;
                        margin: 50px auto;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        padding: 20px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                        font-family: 'Open Sans', sans-serif;
                    }

                    h2 {
                        text-align: center;
                        margin-bottom: 20px;
                        font-family: 'EB Garamond', serif;
                        color: #333;
                    }

                    .error {
                        color: red;
                        text-align: center;
                        margin-bottom: 10px;
                    }

                    .success {
                        color: green;
                        text-align: center;
                        margin-bottom: 10px;
                    }

                    label {
                        display: block;
                        margin: 10px 0 5px;
                        font-weight: bold;
                        color: #333;
                    }

                    input {
                        margin-bottom: 15px;
                        padding: 10px;
                        width: 100%;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        font-size: 16px;
                        box-sizing: border-box;
                    }

                    button {
                        width: 100%;
                        padding: 12px;
                        background: #a67c52;
                        color: #fff;
                        border: none;
                        border-radius: 4px;
                        font-size: 16px;
                        cursor: pointer;
                        transition: background 0.3s;
                    }

                    button:disabled {
                        background: #ccc;
                        cursor: not-allowed;
                    }

                    button:hover:not(:disabled) {
                        background: #8c6234;
                    }
                `}</style>
            </div>
        </Layout>
    );
}

