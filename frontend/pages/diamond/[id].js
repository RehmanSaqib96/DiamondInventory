import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function DiamondDetails() {
    const router = useRouter();
    const { id } = router.query;

    const [diamond, setDiamond] = useState(null);
    const [user, setUser] = useState(null);
    const [similarDiamonds, setSimilarDiamonds] = useState([]);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // 1. Fetch the main diamond details
    useEffect(() => {
        if (!id) return;

        const fetchDiamond = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch(`http://localhost:5000/diamonds/${id}`, {
                    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                });
                if (res.ok) {
                    const data = await res.json();
                    setDiamond(data);
                } else {
                    console.error('Failed to fetch diamond details, status:', res.status);
                    toast.error('Failed to fetch diamond details.');
                }
            } catch (error) {
                console.error('Error fetching diamond details:', error);
                toast.error('Error fetching diamond details.');
            }
        };

        fetchDiamond();
    }, [id]);

    // 2. Fetch 4 “similar diamonds”
    useEffect(() => {
        if (!id) return;

        const fetchSimilar = async () => {
            try {
                // Example: GET /diamonds/public?limit=4
                const res = await fetch('http://localhost:5000/diamonds/public?limit=4');
                if (res.ok) {
                    const data = await res.json();
                    setSimilarDiamonds(data.slice(0, 4));
                } else {
                    console.error('Failed to fetch similar diamonds. Status:', res.status);
                    toast.error('Failed to fetch similar diamonds.');
                }
            } catch (error) {
                console.error('Error fetching similar diamonds:', error);
                toast.error('Error fetching similar diamonds.');
            }
        };

        fetchSimilar();
    }, [id]);

    const handleAddToWishlist = async () => {
        console.log("handleAddToWishlist called");
        if (!diamond) return;

        const token = localStorage.getItem('accessToken');
        if (!token) {
            // User is logged out => store full diamond object locally
            let localWishlist = JSON.parse(localStorage.getItem('localWishlist') || '[]');
            if (!localWishlist.some((item) => item.id === diamond.id)) {
                localWishlist.push(diamond);
                localStorage.setItem('localWishlist', JSON.stringify(localWishlist));
                toast.success('Diamond added to your wishlist!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                toast.info('This diamond is already in your wishlist.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
            return;
        }

        // If user is logged in, perform the server-based wishlist call
        try {
            const res = await fetch(`http://localhost:5000/wishlist/${diamond.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                toast.success('Diamond added to your wishlist!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                toast.error('Failed to add diamond to wishlist.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            toast.error('Error adding to wishlist.', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const handleBuy = async () => {
        if (!diamond) return;
        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast.info('Please sign up or login to buy this diamond.');
            return router.push('/login');
        }

        try {
            const res = await fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    diamondId: diamond.id,
                    amount: diamond.price
                }),
            });
            if (!res.ok) throw new Error('Purchase failed');
            const order = await res.json();
            toast.success('Purchase successful!');
            router.push(`/order/${order.id}`);  // ← redirect to thank‑you page
        } catch (err) {
            console.error(err);
            toast.error('Failed to complete purchase.');
        }
    };

    const handleInquirySubmit = (e) => {
        e.preventDefault();
        toast.info('Inquiry submitted!', {
            position: 'top-right',
            autoClose: 3000,
        });
    };

    if (!diamond) {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="diamond-details">
                <div className="image-section">
                    <img
                        src={diamond.imageUrl || '/images/diamond-placeholder.jpg'}
                        alt={diamond.title}
                        className="main-image"
                    />
                </div>
                <div className="info-section">
                    <div className="breadcrumb">Home / Diamonds / {diamond.title}</div>
                    <h1 className="diamond-title">{diamond.title}</h1>
                    <p className="diamond-specs">
                        {diamond.carat} ct &bull; £{diamond.price} &bull; {diamond.cut}
                    </p>
                    <p className="diamond-description">{diamond.description}</p>
                    <p className="diamond-certification">
                        <strong>Certifications:</strong> {diamond.certification || 'None'}
                    </p>
                    <p className="diamond-status">
                        <strong>Status:</strong> {diamond.status || 'N/A'}
                    </p>

                    <div className="action-buttons">
                        <button onClick={handleAddToWishlist} className="btn wishlist-btn">
                            Add to Wishlist
                        </button>
                        {diamond.status !== 'Sold' && diamond.status !== 'Reserved' && (
                            <button onClick={handleBuy} className="btn buy-btn">
                                Buy Now
                            </button>
                        )}
                    </div>

                    <div className="inquiry-form">
                        <h3>Inquire about this Diamond</h3>
                        <form onSubmit={handleInquirySubmit}>
                            <input type="text" placeholder="Your Name" required />
                            <input type="email" placeholder="Your Email" required />
                            <textarea placeholder="Your Message" required></textarea>
                            <button type="submit" className="btn">
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Similar Diamonds Section */}
            <section className="similar-diamonds">
                <h2>Similar Diamonds</h2>
                <div className="diamond-grid">
                    {similarDiamonds.map((simDiamond) => (
                        <div key={simDiamond.id} className="similar-card">
                            <img
                                src={simDiamond.imageUrl || '/images/diamond-placeholder.jpg'}
                                alt={simDiamond.title}
                            />
                            <h4>{simDiamond.title}</h4>
                            <p>{simDiamond.carat} ct - £{simDiamond.price}</p>
                            <p>Cut: {simDiamond.cut} | Clarity: {simDiamond.clarity}</p>
                            <p>Status: {simDiamond.status || 'N/A'}</p>
                            <button
                                onClick={() => router.push(`/diamond/${simDiamond.id}`)}
                                className="view-btn"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <style jsx>{`
        .diamond-details {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          padding: 40px 20px;
          align-items: flex-start;
        }
        .image-section {
          flex: 1 1 500px;
          position: relative;
        }
        .main-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          transition: transform 0.3s ease;
        }
        .main-image:hover {
          transform: scale(1.05);
        }
        .info-section {
          flex: 1 1 400px;
          padding: 20px;
        }
        .breadcrumb {
          font-size: 14px;
          color: #777;
          margin-bottom: 10px;
        }
        .diamond-title {
          font-family: 'EB Garamond', serif;
          font-size: 36px;
          margin-bottom: 10px;
          color: #333;
        }
        .diamond-specs {
          font-size: 18px;
          color: #555;
          margin-bottom: 20px;
        }
        .diamond-description {
          font-size: 16px;
          line-height: 1.6;
          color: #444;
          margin-bottom: 20px;
        }
        .diamond-certification,
        .diamond-status {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }
        .action-buttons {
          margin-bottom: 20px;
        }
        .btn {
          padding: 12px;
          background: #a67c52;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-right: 10px;
        }
        .btn:hover {
          background: #8c6234;
        }
        .inquiry-form {
          margin-top: 20px;
        }
        .inquiry-form h3 {
          font-size: 20px;
          margin-bottom: 15px;
          font-family: 'EB Garamond', serif;
          color: #333;
        }
        .inquiry-form form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .inquiry-form input,
        .inquiry-form textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }
        .similar-diamonds {
          padding: 40px 20px;
          text-align: center;
          background: #fafafa;
          margin-top: 50px;
        }
        .similar-diamonds h2 {
          font-family: 'EB Garamond', serif;
          font-size: 32px;
          margin-bottom: 30px;
          color: #333;
        }
        .diamond-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .similar-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 10px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: center;
        }
        .similar-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .similar-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .similar-card h4 {
          font-family: 'EB Garamond', serif;
          font-size: 18px;
          color: #333;
          margin: 0;
        }
        .similar-card p {
          font-size: 14px;
          color: #555;
          margin: 5px 0;
        }
        .view-btn {
          padding: 8px 16px;
          background: #a67c52;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.3s;
          margin-top: 10px;
        }
        .view-btn:hover {
          background: #8c6234;
        }
      `}</style>
        </Layout>
    );
}