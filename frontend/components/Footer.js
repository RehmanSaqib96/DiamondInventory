// components/Footer.js
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Link Section */}
                <div className="footer-links">
                    <Link href="/customer-support" className="link">Customer Support</Link>
                    <span className="separator">|</span>
                    <Link href="/terms" className="link">Terms &amp; Conditions</Link>
                    <span className="separator">|</span>
                    <Link href="/privacy" className="link">Privacy Policy</Link>
                </div>

                {/* Contact Info */}
                <div className="contact-info">
                    Customer Support: <a href="mailto:support@diamondstore.com" className="link">support@diamondstore.com</a>
                    <span className="separator">|</span> +447404434787
                </div>
            </div>

            <style jsx>{`
                .footer {
                    background: #e9e9e9;
                    padding: 30px;
                    text-align: center;
                    font-size: 16px;
                    color: #333;
                    margin-top: 40px;
                }
                .footer-content {
                    max-width: 800px;
                    margin: 0 auto;
                }
                .footer-links {
                    margin-bottom: 10px;
                }
                .contact-info {
                    font-weight: 500;
                }
                .link {
                    margin: 0 8px;
                    color: #333;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s;
                }
                .link:hover {
                    color: #a67c52;
                }
                .separator {
                    margin: 0 5px;
                    color: #999;
                }
            `}</style>
        </footer>
    );
}
