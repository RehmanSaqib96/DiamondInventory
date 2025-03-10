// frontend/pages/checkout.js
import { useState } from 'react';

export default function Checkout() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleCheckout = (e) => {
        e.preventDefault();
        // Basic validation
        if (cardNumber.length !== 16 || !expiry || cvv.length !== 3) {
            setErrorMsg('Please provide valid card details.');
            return;
        }
        // Simulate a successful checkout
        setSuccessMsg('Payment processed successfully!');
        setErrorMsg('');
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            {errorMsg && <p className="error">{errorMsg}</p>}
            {successMsg && <p className="success">{successMsg}</p>}
            <form onSubmit={handleCheckout}>
                <input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    maxLength="16"
                    required
                />
                <input
                    type="text"
                    placeholder="Expiry (MM/YY)"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="CVV"
                    value={cvv}
                    onChange={e => setCvv(e.target.value)}
                    maxLength="3"
                    required
                />
                <button type="submit">Pay Now</button>
            </form>
            <style jsx>{`
        .checkout-container { max-width: 400px; margin: auto; }
        .error { color: red; }
        .success { color: green; }
        input { margin: 0.5rem 0; padding: 0.5rem; display: block; width: 100%; }
      `}</style>
        </div>
    );
}
