// pages/diamond/[id].js
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';

export default function DiamondDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [diamond, setDiamond] = useState(null);

    // In production, fetch the diamond details from your API using the id.
    useEffect(() => {
        const dummyDiamond = {
            id,
            title: 'Brilliant Cut',
            carat: 1.2,
            price: 5000,
            image: '/images/diamond1.jpg',
            description: 'A stunning brilliant cut diamond with excellent clarity and sparkle.',
            certifications: 'GIA Certified',
            seller: 'Diamond Seller Inc.'
        };
        setDiamond(dummyDiamond);
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
                    <img src={diamond.image} alt={diamond.title} className="main-image" />
                </div>
                <div className="info-section">
                    <h1>{diamond.title}</h1>
                    <p>{diamond.carat} ct - £{diamond.price} - {diamond.cut}</p>
                    <p>{diamond.description}</p>
                    <p><strong>Certifications:</strong> {diamond.certifications}</p>
                    <p><strong>Seller:</strong> {diamond.seller}</p>
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
                    {[1,2,3,4].map(num => (
                        <div key={num} className="similar-card">
                            <img src="/images/diamond-placeholder.jpg" alt="Similar Diamond" />
                            <h4>Diamond {num}</h4>
                        </div>
                    ))}
                </div>
            </section>
            <style jsx>{`
        .diamond-details {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .image-section {
          flex: 1 1 300px;
        }
        .info-section {
          flex: 1 1 300px;
        }
        .main-image {
          width: 100%;
          height: auto;
          transition: transform 0.3s;
        }
        .main-image:hover {
          transform: scale(1.1);
        }
        .inquiry-form form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }
        .inquiry-form input, .inquiry-form textarea {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .btn {
          padding: 10px;
          background: #a67c52;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: background 0.3s;
        }
        .btn:hover {
          background: #8c6234;
        }
        .similar-diamonds {
          margin-top: 50px;
        }
        .diamond-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        .similar-card {
          text-align: center;
        }
        .similar-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }
      `}</style>
        </Layout>
    );
}
