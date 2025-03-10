// pages/contact.js
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In production, send data to backend API
        setSuccessMsg('Thank you for contacting us. We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <Layout>
            <h1>Contact Us</h1>
            <div className="contact-container">
                <form onSubmit={handleSubmit}>
                    <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input name="subject" type="text" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                    <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
                    <button type="submit" className="btn">Send Message</button>
                </form>
                {successMsg && <p className="success">{successMsg}</p>}
            </div>
            <style jsx>{`
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
        .contact-container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        input, textarea {
          padding: 10px;
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
        .success {
          color: green;
          text-align: center;
          margin-top: 10px;
        }
      `}</style>
        </Layout>
    );
}
