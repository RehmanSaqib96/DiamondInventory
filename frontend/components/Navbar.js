// components/Navbar.js
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Dummy: In production, replace with your authentication context or API call.
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/');
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link href="/" className="logo-link">DiamondStore</Link>
            </div>
            <ul className="nav-links">
                <li><Link href="/listings">Shop Diamonds</Link></li>
                <li><Link href="/sell">Sell Your Diamonds</Link></li>
                <li><Link href="/wishlist">Wishlist</Link></li>
                {user && user.role === 'admin' && (
                    <li><Link href="/dashboard">Dashboard</Link></li>
                )}
            </ul>
            <div className="nav-actions">
                {!user ? (
                    <>
                        <Link href="/login" className="nav-btn">Login</Link>
                        <Link href="/register" className="nav-btn signup">Sign Up</Link>
                    </>
                ) : (
                    <div className="dropdown">
                        <span className="account-label">My Account</span>
                        <div className="dropdown-content">
                            <Link href="/account">Profile</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          background: #fff;
          border-bottom: 1px solid #eee;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .logo-link {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          text-decoration: none;
        }
        .nav-links {
          list-style: none;
          display: flex;
          gap: 20px;
        }
        .nav-links li a {
          color: #333;
          text-decoration: none;
          transition: color 0.3s;
        }
        .nav-links li a:hover {
          color: #a67c52;
        }
        .nav-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .nav-btn {
          padding: 8px 16px;
          background: #a67c52;
          color: #fff;
          border: none;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.3s;
          cursor: pointer;
        }
        .nav-btn:hover {
          background: #8c6234;
        }
        .nav-btn.signup {
          background: #fff;
          color: #a67c52;
          border: 1px solid #a67c52;
        }
        .dropdown {
          position: relative;
          cursor: pointer;
        }
        .account-label {
          font-weight: bold;
          color: #333;
        }
        .dropdown-content {
          display: none;
          position: absolute;
          right: 0;
          background: #fff;
          box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
          padding: 10px;
          border-radius: 4px;
        }
        .dropdown:hover .dropdown-content {
          display: block;
        }
        .dropdown-content a,
        .dropdown-content button {
          display: block;
          margin: 5px 0;
          color: #333;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
        }
        .dropdown-content a:hover,
        .dropdown-content button:hover {
          color: #a67c52;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
        </nav>
    );
}
