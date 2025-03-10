// components/FeaturedDiamonds.js
import DiamondCard from './DiamondCard';
import Link from 'next/link';

export default function FeaturedDiamonds({ diamonds }) {
    return (
        <section className="featured-diamonds">
            <h2>Featured Diamonds</h2>
            <div className="diamond-grid">
                {diamonds.map((diamond) => (
                    <DiamondCard key={diamond.id} diamond={diamond} />
                ))}
            </div>
            <div className="view-more">
                <Link href="/listings" className="btn">View More</Link>
            </div>
            <style jsx>{`
        .featured-diamonds {
          padding: 50px 20px;
          text-align: center;
        }
        h2 {
          margin-bottom: 30px;
          font-size: 32px;
          color: #333;
        }
        .diamond-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .view-more {
          margin-top: 30px;
        }
        .btn {
          padding: 10px 20px;
          background: #a67c52;
          color: #fff;
          text-decoration: none;
          transition: background 0.3s;
        }
        .btn:hover {
          background: #8c6234;
        }
      `}</style>
        </section>
    );
}
