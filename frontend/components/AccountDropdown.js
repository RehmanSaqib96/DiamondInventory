// components/AccountDropdown.js
import {useState} from 'react';
import Link from 'next/link';

export default function AccountDropdown({user, handleLogout}) {
    const [open, setOpen] = useState(false);

    const toggleDropdown = (e) => {
        // Prevent the click event from propagating (so that clicking inside the dropdown doesn't close it immediately)
        e.stopPropagation();
        setOpen((prev) => !prev);
    };

    const closeDropdown = () => setOpen(false);

    return (
        <div className="account-dropdown" onClick={toggleDropdown}>
            <div className="icon account-icon">👤</div>
            {open && (
                <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>
                    {user ? (
                        <>
                            <Link href="/profile">Profile</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/register">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
            <style jsx>{`
                .account-dropdown {
                    position: relative;
                    display: inline-block;
                }

                .account-icon {
                    font-size: 18px;
                    cursor: pointer;
                }

                .dropdown-content {
                    position: absolute;
                    right: 0;
                    top: 30px;
                    background: #fff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    padding: 10px;
                    border-radius: 4px;
                    min-width: 120px;
                    z-index: 999;
                }

                .dropdown-content a,
                .dropdown-content button {
                    display: block; /* each link on its own line */
                    margin: 8px 0; /* vertical spacing */
                    color: #333; /* same color for all */
                    text-decoration: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    width: 100%;
                    text-align: left;
                    font-size: 14px;
                    font-family: 'Open Sans', sans-serif; /* or your chosen font */
                }

                .dropdown-content a:hover,
                .dropdown-content button:hover {
                    color: #a67c52; /* hover color */
                    text-decoration: none;
                }
            `}</style>
        </div>
    );
}
