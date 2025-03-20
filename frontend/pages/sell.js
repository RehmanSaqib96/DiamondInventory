// pages/sell.js
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Sell() {
    return (
        <Layout>
            <section className="sell-guide">
                <h1>Sell Your Diamonds</h1>
                <p>Follow our easy step-by-step guide to sell your diamonds.</p>
                <ol>
                    <li>Create an account or log in.</li>
                    <li>Submit your diamond details with images.</li>
                    <li>Wait for verification and pricing.</li>
                    <li>Receive offers and finalize the sale.</li>
                </ol>
                <Link href="/frontend/pages/seller-dashboard">
                    <a className="btn">Start Selling</a>
                </Link>
            </section>
            <section className="trust-security">
                <h2>Secure and Trusted</h2>
                <p>We ensure all transactions are safe and secure.</p>
            </section>
            <style jsx>{`
        .sell-guide {
          text-align: center;
          padding: 40px 20px;
        }
        .sell-guide ol {
          text-align: left;
          display: inline-block;
          margin-top: 20px;
        }
        .btn {
          padding: 10px 20px;
          background: #a67c52;
          color: #fff;
          text-decoration: none;
          display: inline-block;
          margin-top: 20px;
          transition: background 0.3s;
        }
        .btn:hover {
          background: #8c6234;
        }
        .trust-security {
          text-align: center;
          background: #f5f5f5;
          padding: 30px;
          margin-top: 40px;
        }
      `}</style>
        </Layout>
    );
}
