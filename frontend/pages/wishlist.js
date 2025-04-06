import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import DiamondCard from '../components/DiamondCard';
import { toast } from 'react-toastify';

export default function Wishlist() {
    const router = useRouter();
    const [wishlist, setWishlist] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Load user from localStorage if available
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Fetch wishlist: if logged in (token exists), fetch from server; otherwise, fetch from localStorage
    useEffect(() => {
        if (user && localStorage.getItem('accessToken')) {
            fetchWishlistFromServer();
        } else {
            fetchWishlistFromLocal();
        }
    }, [user]);

    // Fetch wishlist from server
    const fetchWishlistFromServer = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:5000/wishlist', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                // Expect an array of Wishlist records that include the associated diamond object
                const data = await res.json();
                setWishlist(data);
            } else {
                setErrorMsg('Failed to fetch wishlist from server.');
                toast.error('Failed to fetch wishlist from server.');
            }
        } catch (error) {
            console.error('Error fetching wishlist from server:', error);
            setErrorMsg('Error fetching wishlist from server.');
            toast.error('Error fetching wishlist from server.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch wishlist from localStorage for logged-out users
    const fetchWishlistFromLocal = () => {
        setLoading(true);
        try {
            const localData = JSON.parse(localStorage.getItem('localWishlist') || '[]');
            setWishlist(localData);
        } catch (error) {
            console.error('Error fetching local wishlist:', error);
            setErrorMsg('Error fetching local wishlist.');
            toast.error('Error fetching local wishlist.');
        } finally {
            setLoading(false);
        }
    };

    // Remove diamond from wishlist
    const handleRemove = async (diamondId) => {
        if (user && localStorage.getItem('accessToken')) {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch(`http://localhost:5000/wishlist/${diamondId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (res.ok) {
                    toast.success('Diamond removed from wishlist!', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    // Re-fetch the wishlist from server
                    fetchWishlistFromServer();
                } else {
                    toast.error('Failed to remove from wishlist.', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                console.error('Error removing wishlist item:', error);
                toast.error('Error removing wishlist item.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } else {
            let localList = JSON.parse(localStorage.getItem('localWishlist') || '[]');
            localList = localList.filter((diamond) => diamond.id !== diamondId);
            localStorage.setItem('localWishlist', JSON.stringify(localList));
            setWishlist(localList);
            toast.success('Diamond removed from wishlist!', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    // Redirect to checkout page for buying
    const handleBuy = (diamondId) => {
        router.push(`/checkout?diamondId=${diamondId}`);
    };

    if (loading) {
        return (
            <Layout>
                <p className="loading">Loading wishlist...</p>
            </Layout>
        );
    }

    if (wishlist.length === 0) {
        return (
            <Layout>
                <div className="empty-wishlist">
                    <h1>Your wishlist is empty, let's fix that</h1>
                    <button className="btn" onClick={() => router.push('/listings')}>
                        Shop Diamonds
                    </button>
                </div>
                <style jsx>{`
                    .empty-wishlist {
                        text-align: center;
                        margin-top: 50px;
                        font-family: 'Open Sans', sans-serif;
                    }
                    h1 {
                        font-family: 'EB Garamond', serif;
                        font-size: 28px;
                        color: #333;
                        margin-bottom: 20px;
                    }
                    .btn {
                        padding: 12px 24px;
                        background: #a67c52;
                        color: #fff;
                        border: none;
                        border-radius: 4px;
                        font-size: 16px;
                        cursor: pointer;
                        transition: background 0.3s;
                    }
                    .btn:hover {
                        background: #8c6234;
                    }
                `}</style>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1>Your Wishlist</h1>
            <div className="wishlist-grid">
                {wishlist.map((item) => {
                    // For server data, each item is a wishlist record that includes a "diamond" object.
                    // For local data, item is the diamond object itself.
                    const diamond = item.diamond ? item.diamond : item;
                    return (
                        <div key={item.id || diamond.id} className="wishlist-item">
                            <DiamondCard diamond={diamond} />
                            <div className="wishlist-actions">
                                <button className="btn remove-btn" onClick={() => handleRemove(diamond.id)}>
                                    Remove
                                </button>
                                {diamond.status !== 'Sold' && diamond.status !== 'Reserved' && (
                                    <button className="btn buy-btn" onClick={() => handleBuy(diamond.id)}>
                                        Buy Now
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
                h1 {
                    text-align: center;
                    margin: 20px 0;
                    font-family: 'EB Garamond', serif;
                }
                .wishlist-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                    padding: 0 20px;
                }
                .wishlist-item {
                    background: #fff;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    padding: 10px;
                    text-align: center;
                    position: relative;
                }
                .wishlist-actions {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 10px;
                }
                .btn {
                    padding: 8px 16px;
                    background: #a67c52;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .btn:hover {
                    background: #8c6234;
                }
                .remove-btn {
                    background: #f44336;
                }
                .remove-btn:hover {
                    background: #da190b;
                }
            `}</style>
        </Layout>
    );
}