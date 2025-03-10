// pages/dashboard.js
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Dashboard() {
    const [formData, setFormData] = useState({
        title: '',
        carat: '',
        cut: '',
        color: '',
        clarity: '',
        price: '',
        image: ''
    });

    const [inventory, setInventory] = useState([
        { id: 1, title: 'Brilliant Cut', carat: 1.2, price: 5000 },
        { id: 2, title: 'Princess Cut', carat: 1.0, price: 4500 }
    ]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleAddDiamond = (e) => {
        e.preventDefault();
        const newDiamond = { id: Date.now(), ...formData };
        setInventory([...inventory, newDiamond]);
        setFormData({ title: '', carat: '', cut: '', color: '', clarity: '', price: '', image: '' });
    };

    return (
        <Layout>
            <h1>Seller Dashboard</h1>
            <section className="add-diamond">
                <h2>Add New Diamond</h2>
                <form onSubmit={handleAddDiamond}>
                    <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                    <input name="carat" placeholder="Carat" value={formData.carat} onChange={handleChange} required />
                    <input name="cut" placeholder="Cut" value={formData.cut} onChange={handleChange} required />
                    <input name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />
                    <input name="clarity" placeholder="Clarity" value={formData.clarity} onChange={handleChange} required />
                    <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
                    <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
                    <button type="submit" className="btn">Add Diamond</button>
                </form>
            </section>
            <section className="inventory">
                <h2>Your Inventory</h2>
                <ul>
                    {inventory.map(item => (
                        <li key={item.id}>{item.title} - {item.carat} ct - ${item.price}</li>
                    ))}
                </ul>
            </section>
            <style jsx>{`
        h1, h2 {
          text-align: center;
        }
        form {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          flex: 1 1 150px;
        }
        .btn {
          padding: 10px 20px;
          background: #a67c52;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: background 0.3s;
        }
        .btn:hover {
          background: #8c6234;
        }
        ul {
          list-style: none;
          text-align: center;
        }
      `}</style>
        </Layout>
    );
}
