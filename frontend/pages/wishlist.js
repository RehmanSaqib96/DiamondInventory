// pages/wishlist.js
import Layout from '../components/Layout';
import DiamondCard from '../components/DiamondCard';
import { useState } from 'react';

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([
        { id: 1, title: 'Brilliant Cut', carat: 1.2, price: 5000, image: '/images/diamond1.jpg' },
        { id: 3, title: 'Emerald Cut', carat: 1.5, price: 6000, image: '/images/diamond3.jpg' },
    ]);

    const handleRemove = (id) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    return (
        <Layout>
            <h1>Your Wishlist</h1>
            <div className="wishlist-grid">
                {wishlist.map(diamond => (
                    <div key={diamond.id} className="wishlist-item">
                        <DiamondCard diamond={diamond} />
                        <button className="btn" onClick={() => handleRemove(diamond.id)}>Remove</button>
                    </div>
                ))}
            </div>
            <style jsx>{`
        h1 {
          text-align: center;
          margin: 20px 0;
        }
        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .wishlist-item {
          position: relative;
        }
        .btn {
          margin-top: 10px;
          padding: 5px 10px;
          background: #a67c52;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: background 0.3s;
          width: 100%;
        }
        .btn:hover {
          background: #8c6234;
        }
      `}</style>
        </Layout>
    );
}
