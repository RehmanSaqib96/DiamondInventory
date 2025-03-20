// pages/index.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import DiamondCard from '../components/DiamondCard';

export default function Home() {
    const [diamonds, setDiamonds] = useState([]);

    const fetchDiamonds = async () => {
        try {
            const res = await fetch('http://localhost:5000/diamonds');
            if (res.ok) {
                const data = await res.json();
                setDiamonds(data);
            } else {
                console.error('Failed to fetch diamonds');
            }
        } catch (error) {
            console.error('Error fetching diamonds:', error);
        }
    };

    useEffect(() => {
        fetchDiamonds();
    }, []);

    return (
        <Layout>
            <Head>
                <title>DiamondStore | Home</title>
                <meta name="description" content="Browse our exquisite diamond collection" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <section className="diamond-grid">
                {diamonds.map(diamond => (
                    <DiamondCard key={diamond.id} diamond={diamond} />
                ))}
            </section>
            <style jsx>{`
                .diamond-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    padding: 20px;
                }
            `}</style>
        </Layout>
    );
}
