// components/DiamondCard.js
import Link from 'next/link';

export default function DiamondCard({ diamond }) {
    return (
        <div className="diamond-card">
            <img src={diamond.imageUrl || '/images/diamond-placeholder.jpg'} alt={diamond.title} />
            <h3>{diamond.title}</h3>
            <p>{diamond.carat} ct - £{diamond.price}</p>
            <p>Cut: {diamond.cut} | Clarity: {diamond.clarity}</p>
            <p>Status: {diamond.status}</p>
            <Link href={`/diamond/${diamond.id}`} className="view-btn">View Details</Link>
            <style jsx>{`
        .diamond-card {
          background: #fff;
          border: 1px solid #eee;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .diamond-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          margin-bottom: 10px;
          border-radius: 4px;
        }
        .view-btn {
          display: inline-block;
          padding: 8px 16px;
          background: #a67c52;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          transition: background 0.3s;
        }
        .view-btn:hover {
          background: #8c6234;
        }
      `}</style>
        </div>
    );
}
