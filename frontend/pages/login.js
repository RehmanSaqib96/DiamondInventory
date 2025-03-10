// frontend/pages/login.js
import { useState } from 'react';
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
        const res = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            router.push('/dashboard');
        } else {
            setErrorMsg(data.message || 'Login failed');
        }
    };

    return (
        <div className="container">
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
                <button type="submit">Login</button>
            </form>
            <style jsx>{`
        .container { max-width: 400px; margin: auto; }
        .error { color: red; }
      `}</style>
        </div>
    );
}
