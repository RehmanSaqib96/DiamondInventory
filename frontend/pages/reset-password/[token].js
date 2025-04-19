// frontend/pages/reset-password/[token].js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function ResetPassword() {
    const router = useRouter();
    const { token } = router.query;

    const [pw, setPw]         = useState('');
    const [confirm, setConfirm]= useState('');
    const [error, setError]    = useState('');
    const [message, setMessage]= useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setMessage('');
        if (pw !== confirm) {
            setError('Passwords do not match.');
            return;
        }
        try {
            const res = await fetch('http://localhost:5000/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: pw }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
                setTimeout(() => router.push('/login'), 3000);
            } else {
                setError(data.message || 'Failed to reset');
            }
        } catch {
            setError('Network error');
        }
    };

    return (
        <Layout>
            <Head><title>Reset Password | DiamondStore</title></Head>
            <div className="form-container">
                <h2>Reset Your Password</h2>
                {message && <p className="success">{message}</p>}
                {error   && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="New password"
                        value={pw}
                        onChange={e => setPw(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        required
                    />
                    <button type="submit">Reset Password</button>
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
