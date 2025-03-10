// components/DiamondCard.js
import Link from 'next/link';

export default function DiamondCard({ diamond }) {
    return (
        <div className="diamond-card">
            <div className="image-container">
                <img src={diamond.image || '/images/diamond-placeholder.jpg'} alt={diamond.title} />
                <button className="wishlist-btn">♡</button>
            </div>
            <h3>{diamond.title}</h3>
            <p>{diamond.carat} ct - ${diamond.price}</p>
            <Link href={`/diamond/${diamond.id}`} className="view-details-btn">View Details</Link>
            <style jsx>{`
        .diamond-card {
          background: #fff;
          border: 1px solid #eee;
          padding: 15px;
          border-radius: 8px;
          transition: transform 0.3s, box-shadow 0.3s;
          text-align: center;
        }
        .diamond-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .diamond-card:hover img {
          transform: scale(1.05);
        }
        .wishlist-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.8);
          border: none;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          font-size: 18px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .wishlist-btn:hover {
          background: #a67c52;
          color: #fff;
        }
        h3 {
          margin: 10px 0;
          font-size: 20px;
          color: #333;
        }
        p {
          margin: 5px 0 10px;
          color: #666;
        }
        .view-details-btn {
          display: inline-block;
          padding: 8px 16px;
          background: #a67c52;
          color: #fff;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.3s;
        }
        .view-details-btn:hover {
          background: #8c6234;
        }
      `}</style>
        </div>
    );
}
