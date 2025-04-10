import Head from 'next/head';
import Layout from '../components/Layout';

export default function FAQ() {
    return (
        <Layout>
            <Head>
                <title>FAQ | DiamondStore</title>
                <meta
                    name="description"
                    content="Frequently Asked Questions - Find answers to common questions about DiamondStore, our services, diamond quality, shipping, and more."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="faq-page">
                <h1>Frequently Asked Questions</h1>

                <div className="faq-item">
                    <h2>1. What is DiamondStore?</h2>
                    <p>
                        DiamondStore is a premium diamond inventory and trading platform that connects trusted sellers and discerning buyers.
                        Our platform provides verified diamond listings, advanced search and filtering options, and secure transaction processes.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>2. How do I buy a diamond on DiamondStore?</h2>
                    <p>
                        You can browse our extensive inventory by using our search and filtering tools, then click on a diamond for detailed information.
                        When you’re ready to purchase, add your chosen diamond to your cart and proceed to our secure checkout process.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>3. How can I sell my diamond?</h2>
                    <p>
                        To sell your diamond, sign up as a seller on our platform. Once your account is approved, you can create listings
                        by providing detailed information and high-quality images of your diamond. Our team will assist in verifying your listing.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>4. Are all diamonds on DiamondStore certified?</h2>
                    <p>
                        Yes. We work with reputable grading laboratories such as GIA, IGI, HRD, and EGL to ensure all diamonds listed on our platform are certified for quality and authenticity.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>5. What payment methods do you accept?</h2>
                    <p>
                        We accept a variety of payment options including major credit cards, debit cards, and certain buy-now-pay-later services.
                        All transactions are processed securely.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>6. How does shipping and delivery work?</h2>
                    <p>
                        Once your order is confirmed, we process and ship your diamond using trusted courier services.
                        You will receive a tracking number to monitor your package as it makes its way to you.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>7. What is your return policy?</h2>
                    <p>
                        We offer a 30-day return policy on most diamond purchases. If you are not satisfied with your purchase,
                        please contact our customer support for guidance on the return process.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>8. How can I track my order?</h2>
                    <p>
                        Once your diamond is shipped, a tracking number will be sent to your registered email address.
                        You can also check your order status by logging in to your account on our website.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>9. Do you offer insurance for diamond shipments?</h2>
                    <p>
                        Yes, all shipments from DiamondStore are insured for their full value, ensuring that your diamond is protected during transit.
                    </p>
                </div>

                <div className="faq-item">
                    <h2>10. How can I contact customer support?</h2>
                    <p>
                        You can reach our customer support team via the “Customer Support” link in our footer, or email us directly at <a href="mailto:support@diamondstore.com">support@diamondstore.com</a>.
                        We are here to assist you with any questions or concerns.
                    </p>
                </div>
            </div>

            <style jsx>{`
        .faq-page {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Open Sans', sans-serif;
          color: #444;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
          font-family: 'EB Garamond', serif;
          font-size: 42px;
          color: #333;
        }
        .faq-item {
          margin-bottom: 30px;
          padding: 15px;
          border-bottom: 1px solid #eee;
        }
        .faq-item h2 {
          font-family: 'EB Garamond', serif;
          font-size: 24px;
          color: #a67c52;
          margin-bottom: 10px;
        }
        .faq-item p {
          font-size: 18px;
          line-height: 1.8;
          margin: 0;
        }
        .faq-item a {
          color: #a67c52;
          text-decoration: none;
          transition: text-decoration 0.3s;
        }
        .faq-item a:hover {
          text-decoration: underline;
        }
      `}</style>
        </Layout>
    );
}
