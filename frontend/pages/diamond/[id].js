// pages/diamond/[id].js
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';

export default function DiamondDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [diamond, setDiamond] = useState(null);

    useEffect(() => {
        if (!id) return; // Wait until the id is available

        const fetchDiamond = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch(`http://localhost:5000/diamonds/${id}`, {
                    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                });
                if (res.ok) {
                    const data = await res.json();
                    setDiamond(data);
                } else {
                    console.error('Failed to fetch diamond details, status:', res.status);
                }
            } catch (error) {
                console.error('Error fetching diamond details:', error);
            }
        };

        fetchDiamond();
    }, [id]);

    const handleInquirySubmit = (e) => {
        e.preventDefault();
        // Process the inquiry form submission
        alert('Inquiry submitted!');
    };

    if (!diamond) return <Layout><p>Loading...</p></Layout>;

    return (
        <Layout>
            <div className="diamond-details">
                <div className="image-section">
                    <img src={diamond.image || '/images/diamond-placeholder.jpg'} alt={diamond.title} className="main-image" />
                </div>
                <div className="info-section">
                    <div className="breadcrumb">Home / Diamonds / {diamond.title}</div>
                    <h1 className="diamond-title">{diamond.title}</h1>
                    <p className="diamond-specs">
                        {diamond.carat} ct &bull; £{diamond.price} &bull; {diamond.cut}
                    </p>
                    <p className="diamond-description">{diamond.description}</p>
                    <p className="diamond-certification">
                        <strong>Certifications:</strong> {diamond.certification || 'None'}<br />
                    </p>
                    <p className="diamond-status">
                    <strong>Status:</strong> {diamond.status || 'N/A'}<br />
                    </p>
                    <div className="inquiry-form">
                        <h3>Inquire about this Diamond</h3>
                        <form onSubmit={handleInquirySubmit}>
                            <input type="text" placeholder="Your Name" required />
                            <input type="email" placeholder="Your Email" required />
                            <textarea placeholder="Your Message" required></textarea>
                            <button type="submit" className="btn">Send Inquiry</button>
                        </form>
                    </div>
                </div>
            </div>

            <section className="similar-diamonds">
                <h2>Similar Diamonds</h2>
                <div className="diamond-grid">
                    {[1, 2, 3, 4].map(num => (
                        <div key={num} className="similar-card">
                            <img src="/images/diamond-placeholder.jpg" alt={`Similar Diamond ${num}`} />
                            <h4>Diamond {num}</h4>
                        </div>
                    ))}
                </div>
            </section>

            <style jsx>{`
                .diamond-details {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 40px;
                    padding: 40px 20px;
                    align-items: flex-start;
                }
                .image-section {
                    flex: 1 1 500px;
                    position: relative;
                }
                .main-image {
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                    transition: transform 0.3s ease;
                }
                .main-image:hover {
                    transform: scale(1.05);
                }
                .info-section {
                    flex: 1 1 400px;
                    padding: 20px;
                }
                .breadcrumb {
                    font-size: 14px;
                    color: #777;
                    margin-bottom: 10px;
                }
                .diamond-title {
                    font-family: 'EB Garamond', serif;
                    font-size: 36px;
                    margin-bottom: 10px;
                    color: #333;
                }
                .diamond-specs {
                    font-size: 18px;
                    color: #555;
                    margin-bottom: 20px;
                }
                .diamond-description {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #444;
                    margin-bottom: 20px;
                }
                .diamond-extra {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 30px;
                }
                .inquiry-form h3 {
                    font-size: 20px;
                    margin-bottom: 15px;
                    font-family: 'EB Garamond', serif;
                    color: #333;
                }
                .inquiry-form form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .inquiry-form input,
                .inquiry-form textarea {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                }
                .btn {
                    padding: 12px;
                    background: #a67c52;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                    font-size: 16px;
                }
                .btn:hover {
                    background: #8c6234;
                }
                .similar-diamonds {
                    padding: 40px 20px;
                    text-align: center;
                    background: #fafafa;
                    margin-top: 50px;
                }
                .similar-diamonds h2 {
                    font-family: 'EB Garamond', serif;
                    font-size: 32px;
                    margin-bottom: 30px;
                    color: #333;
                }
                .diamond-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 20px;
                }
                .similar-card {
                    background: #fff;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    padding: 10px;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .similar-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .similar-card img {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 4px;
                    margin-bottom: 10px;
                }
                .similar-card h4 {
                    font-family: 'EB Garamond', serif;
                    font-size: 18px;
                    color: #333;
                    margin: 0;
                }
            `}</style>
        </Layout>
    );
}
