// pages/order/[id].js
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';

export default function OrderConfirmation() {
    const { query: { id } } = useRouter();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch(`http://localhost:5000/orders/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Order not found');
                setOrder(await res.json());
            } catch (e) {
                console.error(e);
                setError(e.message);
            }
        })();
    }, [id]);

    if (error) return <Layout><p className="error">{error}</p></Layout>;
    if (!order) return <Layout><p>Loading order…</p></Layout>;

    return (
        <Layout>
            <div className="confirmation">
                <h1>Thank you for your purchase!</h1>
                <p>Your order <strong>#{order.id}</strong> is confirmed.</p>

                <div className="summary">
                    <p>
                        <strong>Diamond:</strong>{' '}
                        {order.Diamond?.title ?? '—'}
                    </p>
                    <p><strong>Amount Paid:</strong> £{order.amount}</p>
                    <p>
                        <strong>Date:</strong>{' '}
                        {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p>
                        <strong>Buyer:</strong>{' '}
                        {order.Buyer?.name ?? '—'} ({order.Buyer?.email ?? '—'})
                    </p>
                </div>
            </div>

            <style jsx>{`
                .confirmation {
                    max-width: 600px;
                    margin: 2rem auto;
                    font-family: 'Open Sans', sans-serif;
                    text-align: center;
                }
                .summary {
                    text-align: left;
                    margin-top: 1.5rem;
                    background: #f9f9f9;
                    padding: 1rem;
                    border-radius: 8px;
                }
                .summary p {
                    margin: 0.5rem 0;
                }
            `}</style>
        </Layout>
    );
}
