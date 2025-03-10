// pages/index.js
import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import FeaturedDiamonds from '../components/FeaturedDiamonds';
import TrustSection from '../components/TrustSection';

export default function Home() {
    // Dummy data for featured diamonds
    const featured = [
        { id: 1, title: 'Brilliant Cut', carat: 1.2, price: 5000, image: '/images/diamond1.jpg' },
        { id: 2, title: 'Princess Cut', carat: 1.0, price: 4500, image: '/images/diamond2.jpg' },
        { id: 3, title: 'Emerald Cut', carat: 1.5, price: 6000, image: '/images/diamond3.jpg' },
        { id: 4, title: 'Oval Cut', carat: 1.3, price: 5200, image: '/images/diamond4.jpg' },
    ];

    return (
        <Layout>
            <Head>
                <title>DiamondStore | Discover the Finest Diamonds</title>
                <meta name="description" content="Shop exquisite diamonds or sell your own with ease. Discover quality, trust, and elegance at DiamondStore." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* Add structured data and additional meta tags as needed */}
            </Head>
            <Hero />
            <FeaturedDiamonds diamonds={featured} />
            <TrustSection />
        </Layout>
    );
}
