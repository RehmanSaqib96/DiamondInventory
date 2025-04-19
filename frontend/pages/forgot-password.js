// frontend/pages/forgot-password.js
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function ForgotPassword() {
    const [email, setEmail]       = useState('');
    const [message, setMessage]   = useState('');
    const [error, setError]       = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        try {
            const res = await fetch('http://localhost:5000/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <Layout>
            <Head><title>Forgot Password | DiamondStore</title></Head>
            <div className="form-container">
                <h2>Forgot Password</h2>
                {message && <p className="success">{message}</p>}
                {error   && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Send Reset Link</button>
                </form>
            </div>
            <style jsx>{`
        .form-container {
          max-width:400px; margin:50px auto; padding:20px;
          border:1px solid #eee; border-radius:8px;
          box-shadow:0 4px 12px rgba(0,0,0,0.05);
          background:#fff; text-align:center;
        }
        input {
          width:100%; padding:12px; margin-bottom:10px;
          border:1px solid #ccc; border-radius:4px;
        }
        button {
          width:100%; padding:12px; background:#a67c52;
          color:#fff; border:none; border-radius:4px;
          cursor:pointer;
        }
        .success { color:green; }
        .error   { color:red;   }
      `}</style>
        </Layout>
    );
}
