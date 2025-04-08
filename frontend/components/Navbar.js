// components/Navbar.js
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MdSearch, MdFavoriteBorder, MdShoppingCart, MdAccountCircle } from 'react-icons/md';
import AccountDropdown from './AccountDropdown';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Read user from localStorage and listen for storage events
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

    // Toggle search input visibility
    const toggleSearch = () => setShowSearch(prev => !prev);

    // When the search form is submitted, redirect to the search page with the query
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    // Redirect to wishlist page
    const handleWishlist = () => {
        router.push('/wishlist');
    };

    // Toggle account dropdown visibility
    const toggleDropdown = () => setShowDropdown((prev) => !prev);

    return (
        <header className="navbar">
            <div className="nav-left">
                <Link href="/" className="logo">
                    DiamondStore
                </Link>
                <nav className="menu">
                    <Link href="/listings">Shop Diamonds</Link>
                    <Link href="/DiamondInfo">Diamond Information</Link>
                    {user && user.role === 'seller' ? (
                        <>
                            <Link href="/inquiries">Buyer Inquiries</Link>
                            <Link href="/seller-dashboard">Diamond Dashboard</Link>
                            <Link href="/admin-dashboard">Roles</Link>
                        </>
                    ) : (
                        <>
                            <Link href="/sell">Sell Your Diamonds</Link>
                        </>
                    )}
                    <Link href="/about">About Us</Link>
                </nav>
            </div>

            <div className="nav-right">
                <div className="icon search-icon" onClick={toggleSearch} title="Search">
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
                <div className="icon wishlist-icon" onClick={handleWishlist} title="Wishlist">
                    <MdFavoriteBorder />
                </div>
                <div className="icon cart-icon" title="Cart">
                    <MdShoppingCart />
                </div>
                <div className="account-button" onClick={toggleDropdown} title="Account">
                    <MdAccountCircle />
                    {showDropdown && (
                        <AccountDropdown user={user} handleLogout={handleLogout} />
                    )}
                </div>
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
                    font-size: 24px;
                    cursor: pointer;
                    color: #333;
                    transition: color 0.3s;
                }
                .icon:hover {
                    color: #a67c52;
                }
                .account-button {
                    position: relative;
                    font-size: 24px;
                    cursor: pointer;
                    color: #333;
                    transition: color 0.3s;
                }
                .account-button:hover {
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
                    margin-left: 10px;
                }
                .search-form input {
                    padding: 5px 10px;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
            `}</style>
        </header>
    );
}
