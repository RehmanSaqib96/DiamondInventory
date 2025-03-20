// components/Footer.js
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <Link href="/customer-support" className="link">Customer Support</Link>
                    <Link href="/terms" className="link">Terms &amp; Conditions</Link>
                    <Link href="/privacy" className="link">Privacy Policy</Link>
                </div>
                <div className="contact-info">
                    Customer Support: support@diamondstore.com | +1 800-123-456
                </div>
            </div>
            <style jsx>{`
        .footer {
          background: #e9e9e9;
          padding: 30px;
          text-align: center;
          font-size: 16px;
          color: #333;
        }
        .footer-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .footer-links {
          margin-bottom: 10px;
        }
        .link {
          margin: 0 10px;
          color: #333;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }
        .link:hover {
          color: #a67c52;
        }
        .contact-info {
          font-weight: bold;
        }
      `}</style>
        </footer>
    );
}
