// components/Navbar.js
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Read from localStorage initially and listen to storage events
    useEffect(() => {
        const readUser = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    console.error('Error parsing user from localStorage:', error);
                    localStorage.removeItem('user');
                }
            } else {
                setUser(null);
            }
        };
        readUser();
        window.addEventListener('storage', readUser);
        return () => window.removeEventListener('storage', readUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <header className="navbar">
            <div className="nav-left">
                {/* Brand/Logo in a serif font */}
                <Link href="/" className="logo">
                    DiamondStore
                </Link>
                {/* Main menu */}
                <nav className="menu">
                    <Link href="/listings">Shop Diamonds</Link>
                    <Link href="/sell">Sell Your Diamonds</Link>
                    <Link href="/wishlist">Wishlist</Link>
                    {/* Show Seller Dashboard if user.role === 'seller' */}
                    {user && user.role === 'seller' && (
                        <Link href="/seller-dashboard">Seller Dashboard</Link>
                    )}
                </nav>
            </div>

            <div className="nav-right">
                {/* Icons: Search, Currency, Cart */}
                <div className="icon search-icon">🔍</div>
                <select className="currency-dropdown">
                    <option value="GBP">GBP £</option>
                    <option value="USD">USD $</option>
                    <option value="EUR">EUR €</option>
                </select>
                <div className="icon cart-icon">🛍️</div>

                {/* Account / Login */}
                <div className="account-container">
                    {user ? (
                        <div className="account-dropdown">
                            <div className="icon account-icon">👤</div>
                            <div className="dropdown-content">
                                <Link href="/profile">Profile</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <div className="account-dropdown">
                            <div className="icon account-icon">👤</div>
                            <div className="dropdown-content">
                                <Link href="/login">Login</Link>
                                <Link href="/register">Sign Up</Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Book an Appointment Button in soft pink */}
                <button className="appointment-btn">Book an Appointment</button>
            </div>

            <style jsx>{`
        /* Container */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 40px;
          border-bottom: 1px solid #eee;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 999;
        }
        /* Left Side: Logo + Menu */
        .nav-left {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .logo {
          font-family: 'EB Garamond', serif; /* Example serif font */
          font-size: 28px;
          font-weight: 500;
          text-decoration: none;
          color: #000;
        }
        .menu {
          display: flex;
          gap: 20px;
        }
        .menu a {
          text-decoration: none;
          color: #333;
          font-size: 16px;
          transition: color 0.3s;
        }
        .menu a:hover {
          color: #a67c52; /* Soft gold/brown accent */
        }
        /* Right Side: Icons + Appointment Button */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .icon {
          cursor: pointer;
          font-size: 18px;
        }
        .currency-dropdown {
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
        .appointment-btn {
          padding: 8px 16px;
          background: #f8d3d3; /* Soft pink color */
          color: #333;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .appointment-btn:hover {
          background: #f4c0c0;
        }
        /* Account Dropdown */
        .account-container {
          position: relative;
        }
        .account-dropdown {
          position: relative;
        }
        .account-icon {
          font-size: 18px;
        }
        .dropdown-content {
          display: none;
          position: absolute;
          right: 0;
          top: 30px;
          background: #fff;
          box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
          padding: 10px;
          border-radius: 4px;
          min-width: 120px;
          text-align: left;
        }
        .account-dropdown:hover .dropdown-content {
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
          width: 100%;
          text-align: left;
          font-size: 14px;
        }
        .dropdown-content a:hover,
        .dropdown-content button:hover {
          color: #a67c52;
        }
      `}</style>
        </header>
    );
}
