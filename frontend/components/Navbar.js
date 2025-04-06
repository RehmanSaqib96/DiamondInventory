// components/Navbar.js
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AccountDropdown from './AccountDropdown';

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

                    {user && user.role === 'seller' ? (
                        <>
                            {/* Links only for seller (admin) */}
                            <Link href="/inquiries">Buyer Inquiries</Link>
                            <Link href="/seller-dashboard">Diamond Dashboard</Link>
                            <Link href="/admin-dashboard">Roles</Link>
                        </>
                    ) : (
                        <>
                            {/* Links only for buyers or not logged in */}
                            <Link href="/sell">Sell Your Diamonds</Link>
                            <Link href="/wishlist">Wishlist</Link>
                        </>
                    )}
                    <Link href="/about">About Us</Link>
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

                {/* Use the click-based AccountDropdown */}
                <AccountDropdown user={user} handleLogout={handleLogout} />

                {/* Book an Appointment Button */}
                <button className="appointment-btn">Book an Appointment</button>
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
                .nav-left {
                    display: flex;
                    align-items: center;
                    gap: 40px;
                }
                .logo {
                    font-family: 'EB Garamond', serif;
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
                    color: #a67c52;
                }
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
                    background: #f8d3d3;
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
            `}</style>
        </header>
    );
}

