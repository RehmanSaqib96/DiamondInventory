// pages/inquiries/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function InquiriesPage() {
    const router = useRouter();
    const [inquiries, setInquiries] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for user and role
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            // No user => redirect to homepage
            router.push('/');
            return;
        }

        const user = JSON.parse(storedUser);
        if (user.role !== 'seller') {
            // Not a seller => no access
            router.push('/');
            return;
        }

        // If we reach here, user is seller => fetch inquiries
        fetchInquiries();
    }, [router]);

    const fetchInquiries = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:5000/inquiries', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setInquiries(data);
            } else {
                setErrorMsg('Failed to fetch inquiries.');
            }
        } catch (error) {
            console.error('Error fetching inquiries:', error);
            setErrorMsg('Error fetching inquiries.');
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (id) => {
        console.log('Clicked inquiry ID:', id);
        // Navigate to dynamic route => /inquiries/[id]
        router.push(`/inquiries/${id}`);
    };

    if (loading) {
        return (
            <Layout>
                <p className="loading">Loading inquiries...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="inquiries-page">
                <h1>Buyer Inquiries</h1>
                {errorMsg && <p className="error">{errorMsg}</p>}

                {inquiries.length === 0 && !errorMsg ? (
                    <p className="no-inquiries">No inquiries found.</p>
                ) : (
                    <div className="inquiry-grid">
                        {inquiries.map((inq) => (
                            <div
                                key={inq.id}
                                className="inquiry-card"
                                onClick={() => handleCardClick(inq.id)}
                            >
                                <img
                                    src={inq.imageUrl || '/images/diamond-placeholder.jpg'}
                                    alt={inq.diamondTitle}
                                />
                                <h3>{inq.diamondTitle}</h3>
                                <p className="truncate">{inq.diamondDescription}</p>
                                <p className="buyer-email">Buyer: {inq.buyerEmail}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                .loading {
                    text-align: center;
                    margin-top: 50px;
                    font-family: 'Open Sans', sans-serif;
                }
                .inquiries-page {
                    max-width: 1200px;
                    margin: 40px auto;
                    padding: 0 20px;
                    font-family: 'Open Sans', sans-serif;
                }
                h1 {
                    text-align: center;
                    margin-bottom: 20px;
                    font-family: 'EB Garamond', serif;
                }
                .error {
                    color: red;
                    text-align: center;
                    margin-bottom: 10px;
                }
                .no-inquiries {
                    text-align: center;
                    font-size: 16px;
                    color: #666;
                }
                .inquiry-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                }
                .inquiry-card {
                    background: #fff;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    padding: 10px;
                    cursor: pointer;
                    transition: box-shadow 0.3s;
                    text-align: center;
                }
                .inquiry-card:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .inquiry-card img {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 4px;
                    margin-bottom: 10px;
                }
                .inquiry-card h3 {
                    font-size: 18px;
                    margin: 5px 0;
                    font-family: 'EB Garamond', serif;
                }
                .truncate {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 100%;
                    display: block;
                    color: #555;
                }
                .buyer-email {
                    font-size: 14px;
                    color: #666;
                }
            `}</style>
        </Layout>
    );
}
