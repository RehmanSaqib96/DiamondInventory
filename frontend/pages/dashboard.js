// frontend/pages/dashboard.js
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [diamonds, setDiamonds] = useState([]);
    const [filter, setFilter] = useState({ title: '', minPrice: '', maxPrice: '' });
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        carat: '',
        color: '',
        clarity: ''
    });
    const [bulkFile, setBulkFile] = useState(null);
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

    const fetchDiamonds = async (filters = {}) => {
        // Append filtering query parameters if provided.
        let url = 'http://localhost:5000/diamonds';
        const query = new URLSearchParams(filters);
        if (query.toString()) url += `?${query.toString()}`;
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setDiamonds(data);
    };

    useEffect(() => {
        fetchDiamonds();
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const addDiamond = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/diamonds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        if (res.status === 201) {
            fetchDiamonds();
            setFormData({ title: '', description: '', price: '', carat: '', color: '', clarity: '' });
        }
    };

    const handleBulkUpload = async (e) => {
        e.preventDefault();
        if (!bulkFile) return;
        const formDataUpload = new FormData();
        formDataUpload.append('file', bulkFile);
        const res = await fetch('http://localhost:5000/diamonds/bulk-upload', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formDataUpload
        });
        if (res.status === 201) {
            fetchDiamonds();
            setBulkFile(null);
            alert('Bulk upload successful');
        }
    };

    return (
        <div className="container">
            <h2>Seller Dashboard</h2>
            <section className="filter-section">
                <h3>Filter Diamonds</h3>
                <input
                    name="title"
                    placeholder="Title"
                    value={filter.title}
                    onChange={(e) => setFilter({...filter, title: e.target.value})}
                />
                <input
                    name="minPrice"
                    type="number"
                    placeholder="Min Price"
                    value={filter.minPrice}
                    onChange={(e) => setFilter({...filter, minPrice: e.target.value})}
                />
                <input
                    name="maxPrice"
                    type="number"
                    placeholder="Max Price"
                    value={filter.maxPrice}
                    onChange={(e) => setFilter({...filter, maxPrice: e.target.value})}
                />
                <button onClick={() => fetchDiamonds(filter)}>Apply Filters</button>
            </section>
            <section className="add-diamond">
                <h3>Add Diamond</h3>
                <form onSubmit={addDiamond}>
                    <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required/>
                    <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required/>
                    <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required/>
                    <input name="carat" type="number" placeholder="Carat" value={formData.carat} onChange={handleChange} required/>
                    <input name="color" placeholder="Color" value={formData.color} onChange={handleChange} required/>
                    <input name="clarity" placeholder="Clarity" value={formData.clarity} onChange={handleChange} required/>
                    <button type="submit">Add Diamond</button>
                </form>
            </section>
            <section className="bulk-upload">
                <h3>Bulk Upload</h3>
                <form onSubmit={handleBulkUpload}>
                    <input type="file" accept=".csv" onChange={(e) => setBulkFile(e.target.files[0])} />
                    <button type="submit">Upload CSV</button>
                </form>
            </section>
            <section className="diamond-list">
                <h3>Your Diamonds</h3>
                <ul>
                    {diamonds.map(d => (
                        <li key={d.id}>{d.title} - ${d.price}</li>
                    ))}
                </ul>
            </section>
            <style jsx>{`
        .container { max-width: 800px; margin: auto; }
        section { margin-bottom: 2rem; }
        input { margin: 0.5rem; padding: 0.5rem; }
      `}</style>
        </div>
    );
}
