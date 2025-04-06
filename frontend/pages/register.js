import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsChecked, setTermsChecked] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!termsChecked) {
            setErrorMsg('You must agree to the Terms & Conditions.');
            return;
        }
        // Call the backend API for registration (role defaults to "customer")
        const res = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role: 'customer' }),
        });
        if (res.status === 201) {
            setSuccessMsg('Registration successful! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } else {
            const data = await res.json();
            setErrorMsg(data.message || 'Registration failed');
        }
    };

    return (
        <Layout>
            <Head>
                <title>Register | DiamondStore</title>
                <meta name="description" content="Register for a DiamondStore account"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <div className="register-container">
                <h2>Register</h2>
                {errorMsg && <p className="error">{errorMsg}</p>}
                {successMsg && <p className="success">{successMsg}</p>}
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
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
                    <div className="terms">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={termsChecked}
                            onChange={e => setTermsChecked(e.target.checked)}
                        />
                        <label htmlFor="terms">
                            I agree to the <a href="/terms" target="_blank">Terms & Conditions</a>
                        </label>
                    </div>
                    <button type="submit" className="btn">Register</button>
                </form>
                <p className="login-text">
                    Already have an account?{' '}
                    <Link href="/login" className="link">
                        Login
                    </Link>
                </p>
            </div>
            <style jsx>{`
                .register-container {
                    max-width: 400px;
                    margin: 50px auto;
                    padding: 40px;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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

                input[type="text"],
                input[type="email"],
                input[type="password"] {
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                }

                .terms {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color: #666;
                }

                .terms input {
                    margin-right: 8px;
                }

                .terms a {
                    color: #a67c52;
                    text-decoration: none;
                }

                .terms a:hover {
                    text-decoration: underline;
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

                .error {
                    color: red;
                    margin-bottom: 10px;
                }

                .success {
                    color: green;
                    margin-bottom: 10px;
                }

                .login-text {
                    margin-top: 20px;
                    font-size: 14px;
                }

                .login-text a {
                    color: #a67c52;
                    text-decoration: none;
                }

                .login-text a:hover {
                    text-decoration: underline;
                }

                @media (max-width: 768px) {
                    .register-container {
                        margin: 20px;
                        padding: 20px;
                    }
                }
            `}</style>
        </Layout>
    );
}
