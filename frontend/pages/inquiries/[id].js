// pages/inquiries/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function InquiryDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [inquiry, setInquiry] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If there's no ID yet, wait until Next.js provides it
        if (!id) return;

        // Check user role & fetch data
        const checkAndFetch = async () => {
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

            // If we reach here, user is 'seller' => fetch inquiry
            try {
                const token = localStorage.getItem('accessToken');
                console.log('Fetching inquiry with ID:', id);
                const res = await fetch(`http://localhost:5000/inquiries/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setInquiry(data);
                } else {
                    setErrorMsg('Failed to fetch inquiry details.');
                }
            } catch (error) {
                console.error('Error fetching inquiry:', error);
                setErrorMsg('Error fetching inquiry details.');
            } finally {
                setLoading(false);
            }
        };

        checkAndFetch();
    }, [id, router]);

    if (loading) {
        return (
            <Layout>
                <p className="loading">Loading inquiry details...</p>
            </Layout>
        );
    }

    if (!inquiry) {
        return (
            <Layout>
                <p className="loading">No inquiry found.</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="inquiry-details">
                <h1>Buyer Inquiry Details</h1>
                {errorMsg && <p className="error">{errorMsg}</p>}

                <div className="inquiry-card">
                    <img
                        src={inquiry.imageUrl || '/images/diamond-placeholder.jpg'}
                        alt={inquiry.diamondTitle}
                    />
                    <h2>{inquiry.diamondTitle}</h2>
                    <p>
                        <strong>Description:</strong> {inquiry.diamondDescription}
                    </p>
                    <p>
                        <strong>Message:</strong> {inquiry.contactMessage || 'No message provided'}
                    </p>
                    <p>
                        <strong>Buyer Email:</strong> {inquiry.buyerEmail}
                    </p>
                </div>
            </div>

            <style jsx>{`
        .loading {
          text-align: center;
          margin-top: 50px;
          font-family: 'Open Sans', sans-serif;
        }
        .inquiry-details {
          max-width: 800px;
          margin: 40px auto;
          padding: 0 20px;
          font-family: 'Open Sans', sans-serif;
        }
        h1 {
          text-align: center;
          font-family: 'EB Garamond', serif;
          margin-bottom: 20px;
        }
        .error {
          color: red;
          text-align: center;
        }
        .inquiry-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
        }
        .inquiry-card img {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .inquiry-card h2 {
          font-family: 'EB Garamond', serif;
          font-size: 24px;
          margin: 10px 0;
        }
        .inquiry-card p {
          margin: 5px 0;
          color: #555;
        }
      `}</style>
        </Layout>
    );
}