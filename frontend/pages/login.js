import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMsg('Please fill in all fields.');
            return;
        }
        // Call the backend API for login
        const res = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            // Optionally store user details
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/dashboard');
        } else {
            setErrorMsg(data.message || 'Invalid credentials, please try again.');
        }
    };

    return (
        <>
            <Head>
                <title>Login | DiamondStore</title>
                <meta name="description" content="Login to your DiamondStore account" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="login-container">
                <h2>Login</h2>
                {errorMsg && <p className="error">{errorMsg}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <div className="link-group">
                        <Link href="/forgot-password" className="link">
                            Forgot Password?
                        </Link>
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
                <p className="signup-text">
                    New to DiamondStore?{' '}
                    <Link href="/register" className="link">
                        Sign Up
                    </Link>
                </p>
            </div>
            <style jsx>{`
                .login-container {
                    max-width: 400px;
                    margin: 50px auto;
                    padding: 40px;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    text-align: center;
                    background: #fff;
                }
                h2 {
                    margin-bottom: 20px;
                    font-size: 28px;
                    color: #333;
                }
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                input {
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                }
                .btn {
                    padding: 12px;
                    background: #a67c52;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .btn:hover {
                    background: #8c6234;
                }
                .link-group {
                    text-align: right;
                }
                .link {
                    color: #a67c52;
                    text-decoration: none;
                    font-size: 14px;
                }
                .link:hover {
                    text-decoration: underline;
                }
                .signup-text {
                    margin-top: 20px;
                    font-size: 14px;
                }
                .error {
                    color: red;
                    margin-bottom: 10px;
                }
                @media (max-width: 768px) {
                    .login-container {
                        margin: 20px;
                        padding: 20px;
                    }
                }
            `}</style>
        </>
    );
}