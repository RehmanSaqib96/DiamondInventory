import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function SellerDashboard() {
    const [formData, setFormData] = useState({
        title: '',
        carat: '',
        cut: 'Brilliant',
        color: '',
        clarity: 'IF',
        price: '',
        imageUrl: '',
        status: 'Available'
    });
    const [imageFile, setImageFile] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [editingDiamond, setEditingDiamond] = useState(null);

    // Preset options
    const cutOptions = ['Brilliant', 'Princess', 'Emerald', 'Oval', 'Radiant', 'Asscher'];
    const clarityOptions = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1'];

    // Fetch inventory from backend
    const fetchInventory = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:5000/diamonds', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setInventory(data);
            } else {
                setErrorMsg('Failed to fetch inventory.');
            }
        } catch (error) {
            console.error('Fetch inventory error:', error);
            setErrorMsg('Error fetching inventory.');
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    // Add or update diamond (if editingDiamond is not null, update; otherwise, add new)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        let imageUrl = formData.imageUrl;

        // If file is selected, upload image first
        if (imageFile) {
            const uploadData = new FormData();
            uploadData.append('file', imageFile);
            try {
                const uploadRes = await fetch('http://localhost:5000/upload', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: uploadData
                });
                if (uploadRes.ok) {
                    const uploadResult = await uploadRes.json();
                    imageUrl = uploadResult.url; // backend returns { url: "..." }
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

        const diamondData = { ...formData, imageUrl };

        try {
            let res;
            if (editingDiamond) {
                // Update diamond via PUT
                res = await fetch(`http://localhost:5000/diamonds/${editingDiamond.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(diamondData)
                });
            } else {
                // Add new diamond via POST
                res = await fetch('http://localhost:5000/diamonds', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(diamondData)
                });
            }
            if (res.ok) {
                fetchInventory();
                setFormData({
                    title: '',
                    carat: '',
                    cut: 'Brilliant',
                    color: '',
                    clarity: 'IF',
                    price: '',
                    imageUrl: '',
                    status: 'Available'
                });
                setImageFile(null);
                setEditingDiamond(null);
            } else {
                const data = await res.json();
                setErrorMsg(data.message || 'Error submitting diamond data.');
            }
        } catch (error) {
            console.error('Submit diamond error:', error);
            setErrorMsg('Error connecting to the server.');
        }
    };

    const handleEditClick = (diamond) => {
        setEditingDiamond(diamond);
        setFormData({
            title: diamond.title,
            carat: diamond.carat,
            cut: diamond.cut,
            color: diamond.color,
            clarity: diamond.clarity,
            price: diamond.price,
            imageUrl: diamond.imageUrl,
            status: diamond.status
        });
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('accessToken');
        try {
            const res = await fetch(`http://localhost:5000/diamonds/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchInventory();
            } else {
                const data = await res.json();
                setErrorMsg(data.message || 'Error deleting diamond.');
            }
        } catch (error) {
            console.error('Delete diamond error:', error);
            setErrorMsg('Error connecting to the server.');
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        const token = localStorage.getItem('accessToken');
        try {
            const res = await fetch(`http://localhost:5000/diamonds/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                fetchInventory();
            } else {
                const data = await res.json();
                setErrorMsg(data.message || 'Error updating status.');
            }
        } catch (error) {
            console.error('Status change error:', error);
            setErrorMsg('Error connecting to the server.');
        }
    };

    return (
        <Layout>
            <h1>Seller Dashboard</h1>
            {errorMsg && <p className="error">{errorMsg}</p>}
            <section className="add-diamond">
                <h2>{editingDiamond ? 'Edit Diamond' : 'Add New Diamond'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                        <input name="carat" placeholder="Carat" value={formData.carat} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <select name="cut" value={formData.cut} onChange={handleChange} required>
                            {cutOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <input name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <select name="clarity" value={formData.clarity} onChange={handleChange} required>
                            {clarityOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <input
                            name="imageUrl"
                            placeholder="Or enter Image URL"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                        <input type="file" onChange={handleFileChange} />
                        <select name="status" value={formData.status} onChange={handleChange} required>
                            <option value="Available">Available</option>
                            <option value="Sold">Sold</option>
                            <option value="Reserved">Reserved</option>
                        </select>
                    </div>
                    <div className="image-preview">
                        {(formData.imageUrl || imageFile) && (
                            <img src={imageFile ? URL.createObjectURL(imageFile) : formData.imageUrl} alt="Image Preview" />
                        )}
                    </div>
                    <button type="submit" className="btn">{editingDiamond ? 'Update Diamond' : 'Add Diamond'}</button>
                    {editingDiamond && (
                        <button type="button" className="btn cancel" onClick={() => { setEditingDiamond(null); setFormData({ title: '', carat: '', cut: 'Brilliant', color: '', clarity: 'IF', price: '', imageUrl: '', status: 'Available' }); }}>
                            Cancel
                        </button>
                    )}
                </form>
            </section>
            <section className="inventory">
                <h2>Your Inventory</h2>
                <ul>
                    {inventory.map((item) => (
                        <li key={item.id}>
                            <div className="diamond-info">
                                <img src={item.imageUrl || '/images/diamond-placeholder.jpg'} alt={item.title} />
                                <div className="info">
                                    <span>{item.title} - {item.carat} ct - ${item.price}</span>
                                    <span>Cut: {item.cut} | Clarity: {item.clarity} | Status: {item.status}</span>
                                </div>
                            </div>
                            <div className="actions">
                                <button className="edit-btn" onClick={() => handleEditClick(item)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                                <select value={item.status} onChange={(e) => handleStatusChange(item.id, e.target.value)}>
                                    <option value="Available">Available</option>
                                    <option value="Sold">Sold</option>
                                    <option value="Reserved">Reserved</option>
                                </select>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <style jsx>{`
        h1, h2 {
          text-align: center;
          color: #333;
        }
        .error {
          color: red;
          text-align: center;
          margin-bottom: 10px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }
        .form-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        input, select {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          flex: 1 1 150px;
          font-size: 16px;
        }
        .image-preview {
          text-align: center;
          margin-top: 10px;
        }
        .image-preview img {
          max-width: 200px;
          max-height: 200px;
          border: 1px solid #ccc;
          border-radius: 4px;
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
          margin: 5px;
        }
        .btn:hover {
          background: #8c6234;
        }
        .btn.cancel {
          background: #aaa;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        .diamond-info {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }
        .diamond-info img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .info {
          flex: 1;
        }
        .actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .edit-btn, .delete-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .edit-btn {
          background: #4CAF50;
          color: #fff;
        }
        .edit-btn:hover {
          background: #45a049;
        }
        .delete-btn {
          background: #f44336;
          color: #fff;
        }
        .delete-btn:hover {
          background: #da190b;
        }
      `}</style>
        </Layout>
    );
}
