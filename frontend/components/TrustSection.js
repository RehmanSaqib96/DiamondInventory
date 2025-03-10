// components/TrustSection.js
export default function TrustSection() {
    return (
        <section className="trust-section">
            <h2>Why Choose Us?</h2>
            <div className="trust-features">
                <div className="feature">
                    <img src="/images/secure.png" alt="Secure Checkout" />
                    <h4>Secure Checkout</h4>
                    <p>Your transactions are protected with top-level security.</p>
                </div>
                <div className="feature">
                    <img src="/images/certified.png" alt="Certified Diamonds" />
                    <h4>Certified Diamonds</h4>
                    <p>We only list diamonds with full certification.</p>
                </div>
                <div className="feature">
                    <img src="/images/shipping.png" alt="Fast Shipping" />
                    <h4>Fast Shipping</h4>
                    <p>Receive your purchase quickly and securely.</p>
                </div>
            </div>
            <style jsx>{`
        .trust-section {
          padding: 50px 20px;
          background: #f5f5f5;
          text-align: center;
        }
        h2 {
          margin-bottom: 30px;
          font-size: 32px;
          color: #333;
        }
        .trust-features {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .feature {
          flex: 1 1 250px;
          padding: 20px;
          transition: transform 0.3s;
        }
        .feature:hover {
          transform: scale(1.05);
        }
        img {
          width: 60px;
          height: 60px;
          margin-bottom: 10px;
        }
        h4 {
          margin: 10px 0;
          font-size: 20px;
          color: #333;
        }
        p {
          font-size: 14px;
          color: #666;
        }
      `}</style>
        </section>
    );
}
