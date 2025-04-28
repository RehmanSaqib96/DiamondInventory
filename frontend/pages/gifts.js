import Head from 'next/head';
import Layout from '../components/Layout';
import GiftQuiz from "@/components/GiftQuiz";

export default function Gifts() {
    return (
        <Layout>
            <Head>
                <title>Gifts | DiamondStore</title>
                <meta
                    name="description"
                    content="Explore our curated selection of diamond gifts for every occasion—birthdays, anniversaries, or just because."
                />
            </Head>

            <div className="gifts-page">
                <h1>Gifts for Every Occasion</h1>

                <section className="hero-section">
                    <img
                        src="/images/giftshero.png"
                        alt="Gifts Hero"
                        className="hero-image"
                    />
                    <div className="hero-overlay">
                        <h2>Make Every Moment Sparkle</h2>
                        <p>
                            Discover the perfect diamond piece to show your appreciation—
                            from delicate pendants to dazzling rings, our collection has something
                            for everyone.
                        </p>
                    </div>
                </section>

                <section className="gift-ideas">
                    <h2>Popular Gift Ideas</h2>
                    <p>
                        Whether it's a milestone anniversary or a spontaneous gesture,
                        our selection of timeless diamond jewelry is sure to impress.
                    </p>
                    <ul>
                        <li><strong>Diamond Stud Earrings:</strong> Classic elegance for daily wear.</li>
                        <li><strong>Solitaire Pendants:</strong> A versatile piece for any outfit.</li>
                        <li><strong>Anniversary Bands:</strong> Celebrate your years together with added sparkle.</li>
                        <li><strong>Men’s Diamond Accessories:</strong> Tie pins, cufflinks, and more.</li>
                    </ul>
                </section>

                <section className="personalize">
                    <h2>Make It Personal</h2>
                    <p>
                        Add an engraved message or select a custom setting to make your gift
                        truly unique. Our in-house experts can guide you through every step
                        to ensure a seamless experience.
                    </p>
                </section>

                <section className="gift-guide">
                    <h2>Your Personalized Gift Guide</h2>
                    <p>
                        Need help finding the perfect gift? Answer a few questions about
                        style, occasion, and budget, and our Gift Guide will suggest the best matches.
                    </p>
                    <GiftQuiz />

                    <section className="gift-grid"></section>
                </section>
            </div>

            <style jsx>{`
        .gifts-page {
          max-width: 1200px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Open Sans', sans-serif;
          color: #444;
        }
        .gift-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }
        h1 {
          text-align: center;
          font-family: 'EB Garamond', serif;
          font-size: 36px;
          margin-bottom: 30px;
          color: #333;
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
        .gift-ideas,
        .personalize,
        .gift-guide {
          margin-bottom: 30px;
        }
        .gift-ideas ul {
          list-style: disc;
          margin-left: 20px;
          margin-top: 20px;
          line-height: 1.8;
        }
        .gift-ideas li {
          margin-bottom: 10px;
        }
        .gift-guide-btn {
          padding: 10px 20px;
          background: #a67c52;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .gift-guide-btn:hover {
          background: #8c6234;
        }
      `}</style>
        </Layout>
    );
}
