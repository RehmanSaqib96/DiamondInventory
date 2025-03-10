// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link href="/">DiamondStore</Link>
            </div>
            <ul className="nav-links">
                <li><Link href="/listings">Shop Diamonds</Link></li>
                <li><Link href="/sell">Sell Your Diamonds</Link></li>
                <li><Link href="/wishlist">Wishlist</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
            <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: #fff;
          border-bottom: 1px solid #eee;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .logo a {
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
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
        </nav>
    );
}
