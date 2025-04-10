import Layout from '../components/Layout';

export default function About() {
    return (
        <Layout>
            <h1>About DiamondStore</h1>
            <section className="about-section">
                <h2>Our Story</h2>
                <p>
                    Founded on the principles of trust, quality, and innovation, DiamondStore is a premier diamond inventory platform connecting discerning buyers with reputable sellers. Our journey began with a vision to bring transparency and security to the diamond market, offering a seamless experience for everyone involved.
                </p>
                <h2>Our Mission</h2>
                <p>
                    Our mission is to empower you with a personalized, secure, and transparent diamond buying and selling experience. We ensure that every diamond listed on our platform is certified and that every transaction is handled with the utmost integrity.
                </p>
                <h2>What We Offer</h2>
                <ul>
                    <li>Curated Selection of Certified Diamonds</li>
                    <li>Advanced Filtering & Real-Time Inventory Updates</li>
                    <li>Secure & Transparent Transactions</li>
                    <li>Expert Guidance and Dedicated Customer Support</li>
                </ul>
                <h2>Our Values</h2>
                <p>
                    Integrity, excellence, and innovation drive us. We are committed to ensuring that our clients receive the highest level of service and transparency in every transaction.
                </p>
                <h2>Meet Our Team</h2>
                <p>
                    Our team comprises industry experts, seasoned professionals, and innovative technologists dedicated to bringing you the best in the diamond market.
                </p>
                <div className="team-grid">
                    <div className="team-card">
                        <img src="/images/team1.png" alt="Alice Johnson" />
                        <h3>Alice Johnson</h3>
                        <p>Chief Executive Officer</p>
                    </div>
                    <div className="team-card">
                        <img src="/images/team2.png" alt="Michael Smith" />
                        <h3>Michael Smith</h3>
                        <p>Chief Technology Officer</p>
                    </div>
                    <div className="team-card">
                        <img src="/images/team3.png" alt="Rachel Lee" />
                        <h3>Rachel Lee</h3>
                        <p>Sales Director</p>
                    </div>
                    <div className="team-card">
                        <img src="/images/team4.png" alt="John Doe" />
                        <h3>John Doe</h3>
                        <p>Operations Manager</p>
                    </div>
                </div>
                <h2>Contact Us</h2>
                <p>
                    For more information or inquiries, please reach out to our support team at{' '}
                    <a href="mailto:support@diamondstore.com">support@diamondstore.com</a>.
                </p>
            </section>
            <style jsx>{`
        h1 {
          text-align: center;
          margin: 40px 0 20px;
          font-family: 'EB Garamond', serif;
          font-size: 42px;
          color: #333;
        }
        .about-section {
          max-width: 900px;
          margin: auto;
          padding: 20px;
          line-height: 1.8;
          color: #555;
        }
        .about-section h2 {
          font-family: 'EB Garamond', serif;
          font-size: 28px;
          color: #a67c52;
          margin-top: 30px;
          margin-bottom: 10px;
        }
        .about-section p {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .about-section ul {
          list-style: disc;
          margin-left: 20px;
          margin-bottom: 20px;
          font-size: 18px;
        }
        .about-section a {
          color: #a67c52;
          text-decoration: none;
        }
        .about-section a:hover {
          text-decoration: underline;
        }
        /* Team Section */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 20px 0 40px;
        }
        .team-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          transition: box-shadow 0.3s;
        }
        .team-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .team-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 15px;
        }
        .team-card h3 {
          font-family: 'EB Garamond', serif;
          font-size: 22px;
          margin: 10px 0 5px;
          color: #333;
        }
        .team-card p {
          font-size: 16px;
          color: #666;
          margin: 0;
        }
      `}</style>
        </Layout>
    );
}
