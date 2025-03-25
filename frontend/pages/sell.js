// pages/sell.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function SellYourDiamond() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({
        diamondTitle: '',
        diamondDescription: '',
        contactMessage: '',
        buyerEmail: '',
        imageUrl: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    // Check login status
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    // If user is admin (seller), redirect them to admin inquiries
    useEffect(() => {
        if (user && user.role === 'seller') {
            router.push('/inquiries');
        }
    }, [user, router]);

    // Pre-fill buyerEmail with user.email if available
    useEffect(() => {
        if (user && user.email) {
            setFormData((prev) => ({ ...prev, buyerEmail: user.email }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmitInquiry = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        let imageUrl = formData.imageUrl;

        // If an image file is selected, upload it
        if (imageFile) {
            const uploadData = new FormData();
            uploadData.append('file', imageFile);
            try {
                const uploadRes = await fetch('http://localhost:5000/upload', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: uploadData,
                });
                if (uploadRes.ok) {
                    const uploadJson = await uploadRes.json();
                    imageUrl = uploadJson.url;
                } else {
                    setErrorMsg('Failed to upload image.');
                    return;
                }
            } catch (error) {
                console.error('Image upload error:', error);
                setErrorMsg('Error uploading image.');
                return;
            }
        }

        // Construct inquiry data
        const inquiryData = {
            diamondTitle: formData.diamondTitle,
            diamondDescription: formData.diamondDescription,
            contactMessage: formData.contactMessage,
            buyerEmail: formData.buyerEmail,
            imageUrl,
            buyerId: user ? user.id : null,
        };

        try {
            const res = await fetch('http://localhost:5000/inquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '',
                },
                body: JSON.stringify(inquiryData),
            });
            if (res.ok) {
                setSuccessMsg('Inquiry sent successfully!');
                setTimeout(() => setSuccessMsg(''), 5000);
                setFormData({
                    diamondTitle: '',
                    diamondDescription: '',
                    contactMessage: '',
                    buyerEmail: '',
                    imageUrl: '',
                });
                setImageFile(null);
            } else {
                const data = await res.json();
                setErrorMsg(data.message || 'Error creating inquiry');
            }
        } catch (error) {
            console.error('Send inquiry error:', error);
            setErrorMsg('Error connecting to the server.');
        }
    };

    // If user is not logged in, show a "Login / Sign Up" landing
    if (!user) {
        return (
            <Layout>
                <section className="sell-landing">
                    <h1>Sell Your Diamond</h1>
                    <p>Create an account or log in to submit your diamond details and get an inquiry from our admin team.</p>
                    <div className="cta-buttons">
                        <Link href="/login" className="btn">Login</Link>
                        <Link href="/register" className="btn signup">Sign Up</Link>
                    </div>
                </section>
                <style jsx>{`
          .sell-landing {
            text-align: center;
            padding: 40px 20px;
            font-family: 'Open Sans', sans-serif;
          }
          h1 {
            font-family: 'EB Garamond', serif;
            font-size: 36px;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            color: #555;
            max-width: 600px;
            margin: 0 auto 30px;
          }
          .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
          }
          .btn {
            padding: 12px 24px;
            background: #a67c52;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            transition: background 0.3s;
            font-size: 16px;
          }
          .btn:hover {
            background: #8c6234;
          }
          .btn.signup {
            background: #fff;
            color: #a67c52;
            border: 1px solid #a67c52;
          }
        `}</style>
            </Layout>
        );
    }

    // If logged in as buyer, show the form
    return (
        <Layout>
            <section className="sell-form-section">
                <h1>Sell Your Diamond</h1>
                <p>Fill out the form below with details of the diamond you want to sell. Our admin team will review your inquiry.</p>
                {errorMsg && <p className="error">{errorMsg}</p>}
                <form onSubmit={handleSubmitInquiry}>
                    <div className="form-row">
                        <input
                            name="diamondTitle"
                            type="text"
                            placeholder="Diamond Title"
                            value={formData.diamondTitle}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
            <textarea
                name="diamondDescription"
                placeholder="Diamond Description"
                value={formData.diamondDescription}
                onChange={handleChange}
                required
            />
                    </div>
                    <div className="form-row">
                        <input
                            name="contactMessage"
                            type="text"
                            placeholder="Any Message (optional)"
                            value={formData.contactMessage}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Buyer Email Field (Pre-filled if user.email is available) */}
                    <div className="form-row">
                        <input
                            name="buyerEmail"
                            type="email"
                            placeholder="Your Email"
                            value={formData.buyerEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <input
                            name="imageUrl"
                            type="text"
                            placeholder="Or enter Image URL"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="btn">Send Inquiry</button>
                </form>
            </section>
            {successMsg && <p className="success">{successMsg}</p>}
            <style jsx>{`
                .sell-form-section {
                    max-width: 600px;
                    margin: 40px auto;
                    padding: 20px;
                    font-family: 'Open Sans', sans-serif;
                    text-align: center;
                }
                .sell-form-section h1 {
                    font-family: 'EB Garamond', serif;
                    font-size: 36px;
                    margin-bottom: 20px;
                    color: #333;
                }
                .sell-form-section p {
                    font-size: 16px;
                    color: #555;
                    margin-bottom: 20px;
                }
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .form-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    justify-content: center;
                }
                input, textarea {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    flex: 1 1 200px;
                    font-size: 16px;
                }
                textarea {
                    resize: vertical;
                    min-height: 80px;
                }
                .btn {
                    align-self: center;
                    padding: 12px 24px;
                    background: #a67c52;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .btn:hover {
                    background: #8c6234;
                }
                .error {
                    color: red;
                    text-align: center;
                }
                .success {
                    color: green;
                    font-weight: bold;
                    margin-top: 10px;
                    text-align: center;
                }
            `}</style>
        </Layout>
    );
}
