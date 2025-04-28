// components/AccountDropdown.js
import Link from 'next/link';

export default function AccountDropdown({ user, handleLogout }) {
    return (
        <div className="dropdown-menu">
            {user ? (
                // If user is logged in
                <>
                    <p className="dropdown-text">Logged in as {user.name || user.email}</p>
                    <Link href="/profile">Profile</Link>
                    <button className="dropdown-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                // If user is not logged in
                <>
                    <Link href="/login" className="dropdown-link">
                        Login
                    </Link>
                    <Link href="/register" className="dropdown-link">
                        Sign Up
                    </Link>
                </>
            )}

            <style jsx>{`
                .dropdown-menu {
                    position: absolute;
                    top: 35px;
                    right: 0;
                    background: #fff;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    padding: 10px;
                    min-width: 120px;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                .dropdown-text {
                    margin: 0 0 8px;
                    font-size: 14px;
                    color: #333;
                    line-height: 1.4;
                }

                .dropdown-link,
                .dropdown-btn {
                    display: block;
                    width: 100%;
                    text-align: left;
                    background: none;
                    border: none;
                    font-size: 14px;
                    color: #333;
                    text-decoration: none;
                    margin-bottom: 8px;
                    cursor: pointer;
                    line-height: 1.4;
                }

                .dropdown-link:last-of-type,
                .dropdown-btn:last-of-type {
                    margin-bottom: 0;
                }

                .dropdown-link:hover,
                .dropdown-btn:hover {
                    color: #a67c52;
                }
            `}</style>
        </div>
    );
}
