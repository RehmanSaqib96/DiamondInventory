// components/Footer.js
export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="#">Customer Support</a>
                <a href="#">Terms &amp; Conditions</a>
                <a href="#">Privacy Policy</a>
            </div>
            <div className="social-icons">
                <a href="#" aria-label="Facebook">Facebook</a>
                <a href="#" aria-label="Instagram">Instagram</a>
                <a href="#" aria-label="YouTube">YouTube</a>
            </div>
            <style jsx>{`
        .footer {
          background: #e9e9e9;
          padding: 30px;
          text-align: center;
          font-size: 16px;
          color: #333;
        }
        .footer-links, .social-icons {
          margin-bottom: 15px;
        }
        a {
          margin: 0 10px;
          color: #333;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }
        a:hover {
          color: #a67c52;
        }
      `}</style>
        </footer>
    );
}
