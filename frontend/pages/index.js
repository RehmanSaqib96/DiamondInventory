// pages/index.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import DiamondCard from '../components/DiamondCard';
import Link from 'next/link';

export default function HomePage() {
    const [diamonds, setDiamonds] = useState([]);

    useEffect(() => {
        fetchDiamonds();
    }, []);

    useEffect(() => {
        // Add fade-in effect to hero text after component mounts
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            heroText.classList.add('fade-in');
        }
    }, []);

    const fetchDiamonds = async () => {
        try {
            // Using public endpoint – ensure your backend GET /diamonds (or /diamonds/public) does not require a token
            const res = await fetch('http://localhost:5000/diamonds/public');
            if (res.ok) {
                const data = await res.json();
                // Display only the first 4 diamonds
                setDiamonds(data.slice(0, 4));
            } else {
                console.error('Failed to fetch diamonds');
            }
        } catch (error) {
            console.error('Error fetching diamonds:', error);
        }
    };

    return (
        <Layout>
            <Head>
                <title>DiamondStore | Home</title>
                <meta name="description" content="Browse our exquisite diamond collection" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background"></div>
                <div className="hero-text fade-in">
                    <p className="breadcrumb">
                        <Link href="/">Home</Link> /{' '}
                        <Link href="/listings">Explore Diamonds</Link> /{' '}
                        <Link href="/DiamondInfo">Clarity & Brilliance</Link>
                    </p>
                    <h1 className="hero-title">Crafted to Perfection: Discover Diamond Clarity</h1>
                    <p className="hero-subtitle">
                        Uncover the brilliance behind every cut — because your story deserves a gem that reflects it perfectly.
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <main className="content-section">
                <h2>Welcome to Our Diamond Store</h2>
                <p>
                    We offer a curated selection of the finest diamonds. Whether you’re looking for a brilliant cut or something more unique, our collection has something for everyone.
                </p>
            </main>

            {/* Featured Diamonds Section */}
            <section className="featured-section">
                <h2>Our Featured Diamonds</h2>
                <div className="diamond-grid">
                    {diamonds.map((diamond) => (
                        <DiamondCard key={diamond.id} diamond={diamond} />
                    ))}
                </div>
                <Link href="/listings" className="more-btn">
                    Shop for More
                </Link>
            </section>

            <style jsx>{`
                /* Hero Section Styles */
                .hero {
                    position: relative;
                    height: 70vh;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hero-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                            rgba(0, 0, 0, 0.4),
                            rgba(0, 0, 0, 0.4)
                    ), url('/images/hero1.png') center/cover no-repeat;
                    z-index: 0;
                }

                .hero-text {
                    position: relative;
                    z-index: 1;
                    max-width: 800px;
                    text-align: center;
                    color: white;
                    opacity: 0;
                    transform: translateY(20px);
                }

                .fade-in {
                    animation: fadeInUp 1.5s forwards;
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .breadcrumb {
                    font-size: 14px;
                    color: #f5f5f5; /* Light text */
                    margin-bottom: 10px;
                }

                .breadcrumb a {
                    color: #f5f5f5;
                    text-decoration: none;
                }

                .breadcrumb a:hover {
                    text-decoration: underline;
                }

                .breadcrumb a, .breadcrumb span {
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); /* Adds clarity over image */
                }

                .hero-title {
                    font-size: 40px;
                    margin-bottom: 10px;
                    font-family: 'EB Garamond', serif;
                    color: #fff;
                }

                .hero-subtitle {
                    font-size: 18px;
                    color: #ddd;
                    line-height: 1.4;
                }

                /* Content Section */
                .content-section {
                    padding: 40px;
                    text-align: center;
                }

                .content-section h2 {
                    font-family: 'EB Garamond', serif;
                    font-size: 32px;
                    margin-bottom: 20px;
                }

                .content-section p {
                    font-size: 16px;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                /* Featured Section */
                .featured-section {
                    padding: 40px;
                    text-align: center;
                }

                .featured-section h2 {
                    font-family: 'EB Garamond', serif;
                    font-size: 32px;
                    margin-bottom: 30px;
                }

                .diamond-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .more-btn {
                    display: inline-block;
                    padding: 10px 20px;
                    background: #a67c52;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background 0.3s;
                }

                .more-btn:hover {
                    background: #8c6234;
                }
            `}</style>
        </Layout>
    );
}