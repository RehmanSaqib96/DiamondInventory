// frontend/pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('buyer');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setErrorMsg('All fields are required.');
            return;
        }
        const res = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }),
        });
        if (res.status === 201) {
            router.push('/login');
        } else {
            const data = await res.json();
            setErrorMsg(data.message || 'Registration failed');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {errorMsg && <p className="error">{errorMsg}</p>}
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
                <select value={role} onChange={e => setRole(e.target.value)}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <style jsx>{`
        .container { max-width: 400px; margin: auto; }
        .error { color: red; }
      `}</style>
        </div>
    );
}
