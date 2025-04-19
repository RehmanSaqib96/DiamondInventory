// components/Navbar.js
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    MdSearch,
    MdFavoriteBorder,
    MdAccountCircle,
    MdDateRange,
    MdStar,
    MdLocalShipping
} from 'react-icons/md';
import AccountDropdown from './AccountDropdown';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Load user from localStorage
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

    // Toggle search input
    const toggleSearch = () => setShowSearch((prev) => !prev);

    // Search submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    // Wishlist redirect
    const handleWishlist = () => {
        router.push('/wishlist');
    };

    // Toggle account dropdown
    const toggleDropdown = () => setShowDropdown((prev) => !prev);

    return (
        <header className="navbar-container">
            {/* Main bar with left icons, center logo, right icons */}
            <div className="main-bar">
                {/* Left icons (like calendar, rating, shipping) */}
                <div className="left-icons">
                    <div className="icon" title="Calendar">
                        <MdDateRange />
                    </div>
                    <div className="icon" title="Rating">
                        <MdStar />
                    </div>
                    <div className="icon" title="Shipping">
                        <MdLocalShipping />
                    </div>
                </div>

                {/* Center Logo */}
                <div className="center-logo">
                    <Link href="/">
                        <img
                            src="/images/logo.png"
                            alt="DiamondStore Logo"
                            className="brand-image"
                        />
                    </Link>
                </div>

                {/* Right icons */}
                <div className="right-icons">
                    <div className="icon" onClick={toggleSearch} title="Search">
                        <MdSearch />
                    </div>
                    {showSearch && (
                        <form className="search-form" onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                placeholder="Search diamonds..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    )}

                    <div className="icon" onClick={handleWishlist} title="Wishlist">
                        <MdFavoriteBorder />
                    </div>
                    <div className="icon account-button" onClick={toggleDropdown} title="Account">
                        <MdAccountCircle />
                        {showDropdown && (
                            <AccountDropdown user={user} handleLogout={handleLogout} />
                        )}
                    </div>
                    <button className="appointment-btn">Book an Appointment</button>
                </div>
            </div>

            {/* Sub-menu with links spread out across the width */}
            <div className="sub-menu-bar">
                <ul className="sub-menu-list">
                    <li><Link href="/listings">Shop Diamonds</Link></li>
                    <li><Link href="/DiamondInfo">Diamond Info</Link></li>
                    {user && user.role === 'seller' ? (
                        <>
                            <li><Link href="/inquiries">Buyer Inquiries</Link></li>
                            <li><Link href="/seller-dashboard">Dashboard</Link></li>
                            <li><Link href="/admin-dashboard">Roles</Link></li>
                            <li><Link href="/seller-analytics">Charts</Link></li>
                        </>
                    ) : (
                        <li><Link href="/sell">Sell Your Diamonds</Link></li>
                    )}
                    <li><Link href="/gifts">Gifts</Link></li>
                    <li><Link href="/quick-delivery">Quick Delivery</Link></li>
                    <li><Link href="/about">About Us</Link></li>
                    <li><Link href="/faq">FAQ</Link></li>
                </ul>
            </div>

            <style jsx>{`
        .navbar-container {
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 999;
          background: #fff;
          font-family: 'Open Sans', sans-serif;
        }
        /* Main bar */
        .main-bar {
          display: grid;
          grid-template-columns: min-content auto min-content;
          justify-content: space-between;
          align-items: center;
          margin: 0 auto;
          padding: 10px 1px;
          border-bottom: 1px solid #eee;
        }
        /* Left icons */
        .left-icons,
        .right-icons {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        /* Center logo */
        .center-logo {
          display: flex;
          justify-content: center;
        }
        .brand-image {
          height: 50px; /* adjust as needed */
          width: auto;
            margin-left: 125px;
        }
        .icon {
          font-size: 24px;
          cursor: pointer;
          color: #333;
          transition: color 0.3s;
        }
        .icon:hover {
          color: #a67c52;
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
        .search-form {
          display: inline-block;
          margin-left: 5px;
        }
        .search-form input {
          padding: 5px 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        /* Sub-menu bar */
        .sub-menu-bar {
          background: #f9f9f9;
          border-bottom: 1px solid #eee;
        }
        .sub-menu-list {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 20px;
          list-style: none;
          display: flex;
          justify-content: space-between; /* spreads items across full width */
          align-items: center;
          flex-wrap: wrap;
        }
        .sub-menu-list li {
          font-size: 14px;
        }
        .sub-menu-list li a {
          text-decoration: none;
          color: #333;
          transition: color 0.3s;
        }
        .sub-menu-list li a:hover {
          color: #a67c52;
        }
      `}</style>
        </header>
    );
}
