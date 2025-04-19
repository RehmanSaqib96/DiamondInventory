// frontend/pages/checkout.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Checkout() {
    const router = useRouter();
    const { diamondId } = router.query;

    const [diamond, setDiamond] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry]       = useState('');
    const [cvv, setCvv]             = useState('');
    const [errorMsg, setErrorMsg]   = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // 1) Fetch the diamond details so we know its price
    useEffect(() => {
        if (!diamondId) return;
        fetch(`http://localhost:5000/diamonds/${diamondId}`)
            .then(res => res.json())
            .then(data => setDiamond(data))
            .catch(err => setErrorMsg('Unable to load diamond details'));
    }, [diamondId]);

    const validateCardNumber = num => num.length === 16;
    const validateExpiry     = exp => /^\d{2}\/\d{2}$/.test(exp) && +exp.slice(0,2)>=1 && +exp.slice(0,2)<=12;
    const validateCVV        = c   => c.length === 3;

    const handleCheckout = async e => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (!diamond) {
            setErrorMsg('Diamond not loaded yet.');
            return;
        }
        if (!validateCardNumber(cardNumber)) {
            setErrorMsg('Card number must be 16 digits.');
            return;
        }
        if (!validateExpiry(expiry)) {
            setErrorMsg('Expiry must be MM/YY.');
            return;
        }
        if (!validateCVV(cvv)) {
            setErrorMsg('CVV must be 3 digits.');
            return;
        }

        setIsLoading(true);
        try {
            // simulate payment processing
            await new Promise(r => setTimeout(r, 1000));

            // 2) POST to your orders endpoint
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    diamondId: Number(diamondId),
                    buyerId: JSON.parse(localStorage.getItem('user')).id,
                    amount: diamond.price            // ← pull diamond.price from state
                })
            });
            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || 'Order creation failed');
            }
            const order = await res.json();

            setSuccessMsg(`🎉 Order #${order.id} confirmed!`);

            // 3) Redirect to thank‑you or order page
            router.push(`/order/${order.id}`);
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="checkout-container">
                <h2>Checkout</h2>

                {errorMsg   && <p className="error">{errorMsg}</p>}
                {successMsg && <p className="success">{successMsg}</p>}

                {!diamond ? (
                    <p>Loading diamond…</p>
                ) : (
                    <form onSubmit={handleCheckout}>
                        <p>
                            <strong>{diamond.title}</strong> — £{diamond.price}
                        </p>

                        <label>Card Number</label>
                        <input
                            type="text"
                            maxLength="16"
                            value={cardNumber}
                            onChange={e=>setCardNumber(e.target.value.replace(/\D/g,''))}
                            placeholder="XXXX XXXX XXXX XXXX"
                            required
                        />

                        <label>Expiry (MM/YY)</label>
                        <input
                            type="text"
                            value={expiry}
                            onChange={e=>setExpiry(e.target.value)}
                            placeholder="MM/YY"
                            required
                        />

                        <label>CVV</label>
                        <input
                            type="password"
                            maxLength="3"
                            value={cvv}
                            onChange={e=>setCvv(e.target.value.replace(/\D/g,''))}
                            placeholder="XXX"
                            required
                        />

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Processing…' : `Pay £${diamond.price}`}
                        </button>
                    </form>
                )}
            </div>

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
        </Layout>
    );
}

