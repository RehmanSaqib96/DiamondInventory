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
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">YouTube</a>
            </div>
            <style jsx>{`
        .footer {
          background: #f8f8f8;
          padding: 20px;
          text-align: center;
          font-size: 14px;
        }
        .footer-links, .social-icons {
          margin-bottom: 10px;
        }
        a {
          margin: 0 10px;
          color: #333;
          text-decoration: none;
        }
        a:hover {
          color: #a67c52;
        }
      `}</style>
        </footer>
    );
}
