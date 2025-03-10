// components/Hero.js
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero">
            <div className="overlay"></div>
            <div className="hero-content">
                <h1>Experience Luxury, Discover Excellence</h1>
                <p>Find the perfect diamond for every occasion.</p>
                <div className="hero-buttons">
                    <Link href="/listings" className="hero-btn">Shop Diamonds</Link>
                    <Link href="/sell" className="hero-btn secondary">Sell Your Diamonds</Link>
                </div>
            </div>
            <style jsx>{`
        .hero {
          position: relative;
          background: url('/images/luxury-diamond.jpg') center/cover no-repeat;
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          animation: fadeIn 1.5s ease-in-out;
        }
        h1 {
          font-size: 48px;
          margin-bottom: 20px;
        }
        p {
          font-size: 20px;
          margin-bottom: 30px;
        }
        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }
        .hero-btn {
          padding: 12px 24px;
          background: #a67c52;
          color: #fff;
          border: none;
          border-radius: 4px;
          text-decoration: none;
          font-size: 16px;
          transition: background 0.3s, transform 0.3s;
        }
        .hero-btn:hover {
          background: #8c6234;
          transform: translateY(-3px);
        }
        .hero-btn.secondary {
          background: transparent;
          border: 2px solid #a67c52;
        }
        .hero-btn.secondary:hover {
          background: #a67c52;
          color: #fff;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          h1 { font-size: 32px; }
          p { font-size: 16px; }
          .hero-btn { font-size: 14px; }
        }
      `}</style>
        </section>
    );
}
