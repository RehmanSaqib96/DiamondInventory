// pages/seller-analytics.js
import Head from 'next/head';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

export default function SellerAnalytics() {
    const [analytics, setAnalytics] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:5000/admin/sales', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error('Failed to fetch analytics');
            setAnalytics(await res.json());
        } catch (e) {
            console.error(e);
            setErrorMsg(e.message);
        }
    };

    useEffect(() => {
        fetchAnalytics();
        const iv = setInterval(fetchAnalytics, 10000);
        return () => clearInterval(iv);
    }, []);

    // 1) If we have an error, show it and bail out
    if (errorMsg) {
        return (
            <Layout>
                <Head>
                    <title>Seller Analytics | DiamondStore</title>
                </Head>
                <p style={{ textAlign: 'center', margin: '2rem', color: 'red' }}>
                    {errorMsg}
                </p>
            </Layout>
        );
    }

    // 2) If we're still waiting on analytics, show a loading state
    if (!analytics) {
        return (
            <Layout>
                <Head>
                    <title>Seller Analytics | DiamondStore</title>
                </Head>
                <p style={{ textAlign: 'center', margin: '2rem' }}>Loading analytics…</p>
            </Layout>
        );
    }

    // Now analytics is guaranteed non-null, safe to destructure
    const {
        totalSales,
        soldDiamonds,
        availableDiamonds,
        reservedDiamonds,
        categoryDistribution = {},
        salesOverTime = [],
    } = analytics;

    // Prepare chart data
    const categoryData = {
        labels: Object.keys(categoryDistribution),
        datasets: [
            {
                label: 'Diamonds by Cut',
                data: Object.values(categoryDistribution),
                backgroundColor: [
                    '#A67C52',
                    '#8C6234',
                    '#B08E5A',
                    '#C19641',
                    '#D5AE69',
                    '#EACAA0',
                ],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    const timeData = {
        labels: salesOverTime.map((x) => x.month),
        datasets: [
            {
                label: 'Monthly Sales',
                data: salesOverTime.map((x) => x.sales),
                fill: false,
                borderColor: 'rgba(106,90,205,1)',
                tension: 0.3,
            },
        ],
    };

    const baseOptions = {
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
    };

    return (
        <Layout>
            <Head>
                <title>Seller Analytics | DiamondStore</title>
                <meta
                    name="description"
                    content="Live analytics dashboard for tracking your diamond sales and inventory."
                />
            </Head>

            <div className="analytics-container">
                <h1>Live Analytics</h1>

                <div className="metrics">
                    {[
                        ['Total Sales', totalSales],
                        ['Sold Diamonds', soldDiamonds],
                        ['Available Diamonds', availableDiamonds],
                        ['Reserved Diamonds', reservedDiamonds],
                    ].map(([label, value]) => (
                        <div key={label} className="metric-card">
                            <h2>{label}</h2>
                            <p>{value}</p>
                        </div>
                    ))}
                </div>

                <div className="charts">
                    <div className="chart-section">
                        <h3>Diamonds by Cut (Bar)</h3>
                        <div className="chart-wrapper">
                            <Bar
                                data={categoryData}
                                options={{
                                    ...baseOptions,
                                    plugins: {
                                        ...baseOptions.plugins,
                                        title: { display: true, text: 'By Cut (Bar)' },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    <div className="chart-section">
                        <h3>Diamonds by Cut (Pie)</h3>
                        <div className="chart-wrapper">
                            <Pie
                                data={categoryData}
                                options={{
                                    ...baseOptions,
                                    plugins: {
                                        ...baseOptions.plugins,
                                        title: { display: true, text: 'By Cut (Pie)' },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    <div className="chart-section">
                        <h3>Monthly Sales Trends</h3>
                        <div className="chart-wrapper">
                            <Line
                                data={timeData}
                                options={{
                                    ...baseOptions,
                                    plugins: {
                                        ...baseOptions.plugins,
                                        title: { display: true, text: 'Sales Over Time' },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .analytics-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 20px;
          text-align: center;
        }
        h1 {
          font-family: 'EB Garamond', serif;
          color: #333;
          margin-bottom: 30px;
        }
        .metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .metric-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }
        .metric-card h2 {
          font-family: 'EB Garamond', serif;
          color: #a67c52;
          margin-bottom: 10px;
        }
        .metric-card p {
          font-size: 1.5rem;
          color: #333;
        }
        .charts {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        .chart-section {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 20px;
        }
        .chart-wrapper {
          position: relative;
          height: 300px;
        }
        .chart-section h3 {
          margin-bottom: 10px;
          font-family: 'EB Garamond', serif;
          color: #333;
        }
      `}</style>
        </Layout>
    );
}
