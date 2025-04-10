import Head from 'next/head';
import Layout from '../components/Layout';

export default function QuickDelivery() {
    return (
        <Layout>
            <Head>
                <title>Quick Delivery | DiamondStore</title>
                <meta
                    name="description"
                    content="Learn about our expedited shipping and fast delivery services for diamond jewelry."
                />
            </Head>

            <div className="quick-delivery-page">
                <h1>Fast & Reliable Delivery</h1>

                <section className="delivery-hero">
                    <img
                        src="/images/deliveryhero.png"
                        alt="Quick Delivery Hero"
                        className="hero-image"
                    />
                    <div className="hero-overlay">
                        <h2>Get Your Sparkle Sooner</h2>
                        <p>
                            We understand you can’t wait to wear or gift your new diamond jewelry.
                            That’s why we offer expedited shipping options to get your order to you fast.
                        </p>
                    </div>
                </section>

                <section className="delivery-options">
                    <h2>Delivery Options</h2>
                    <ul>
                        <li><strong>Standard Shipping:</strong> 3–5 business days</li>
                        <li><strong>Express Shipping:</strong> 1–2 business days</li>
                        <li><strong>Overnight Shipping:</strong> Next-business-day delivery</li>
                    </ul>
                    <p>
                        For overnight shipping, orders must be placed by 2pm local time.
                        Availability may vary based on product customization.
                    </p>
                </section>

                <section className="tracking">
                    <h2>Order Tracking</h2>
                    <p>
                        Once your order ships, you’ll receive a tracking link via email to monitor
                        your package’s journey. We partner with reputable carriers to ensure secure,
                        on-time delivery.
                    </p>
                </section>

                <section className="care-tips">
                    <h2>Packaging & Care Tips</h2>
                    <p>
                        Each diamond piece is carefully packaged in a protective box to keep it
                        safe during transit. Once it arrives, store your jewelry in a soft-lined
                        box to maintain its brilliance.
                    </p>
                </section>
            </div>

            <style jsx>{`
        .quick-delivery-page {
          max-width: 1200px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Open Sans', sans-serif;
          color: #444;
        }
        h1 {
          text-align: center;
          font-family: 'EB Garamond', serif;
          font-size: 36px;
          margin-bottom: 30px;
          color: #333;
        }
        .delivery-hero {
          position: relative;
          margin-bottom: 40px;
        }
        .hero-section {
            position: relative;
            margin-bottom: 40px;
            overflow: hidden; /* ensures overlay doesn't go outside the container */
        }
        .hero-image {
            width: 100%;
            height: auto; /* let the image keep its aspect ratio */
            display: block;
            border-radius: 8px; /* optional rounding if you like that style */
            object-fit: cover;
        }
        .hero-overlay {
            position: absolute;
            top: 50%;  /* center vertically */
            left: 50%; /* center horizontally */
            transform: translate(-50%, -50%); /* actually center the overlay */
            text-align: center;
            color: #fff;
            text-shadow: 0 2px 5px rgba(0,0,0,0.4);
            animation: fadeInDown 1s ease forwards;
            max-width: 80%;
        }
        .hero-overlay h2 {
            font-family: 'EB Garamond', serif;
            font-size: 32px;
            margin-bottom: 15px;
        }
        .hero-overlay p {
            font-size: 18px;
            line-height: 1.6;
        }

        /* Fade-in / Slide-down effect */
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        .delivery-options,
        .tracking,
        .care-tips{
          margin-bottom: 30px;
        }
        .delivery-options ul {
          list-style: disc;
          margin-left: 20px;
          margin-top: 20px;
          line-height: 1.8;
        }
        .delivery-options li {
          margin-bottom: 10px;
        }
        .faq p {
          margin: 5px 0;
        }
      `}</style>
        </Layout>
    );
}
