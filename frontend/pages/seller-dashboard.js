// pages/seller-dashboard.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function SellerDashboard() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        carat: '',
        cut: 'Brilliant',
        color: '',
        clarity: 'IF',
        price: '',
        imageUrl: '',
        status: 'Available',
        certification: 'GIA', // Default certification
    });
    const [imageFile, setImageFile] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    // Preset options for cut, clarity, and certification
    const cutOptions = ['Brilliant', 'Princess', 'Emerald', 'Oval', 'Radiant', 'Asscher'];
    const clarityOptions = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1'];

    // Each object has a short form (value) and a label (short + full form)
    const certificationOptions = [
        { value: 'GIA', label: 'GIA (Gemological Institute of America)' },
        { value: 'IGI', label: 'IGI (International Gemological Institute)' },
        { value: 'HRD', label: 'HRD (Hoge Raad voor Diamant)' },
        { value: 'EGL', label: 'EGL (European Gemological Laboratory)' },
    ];

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

// Updated handleChange to log state changes
    const handleChange = (e) => {
        console.log(`Field ${e.target.name} changed to:`, e.target.value);
        setFormData({...formData, [e.target.name]: e.target.value});
    };

// Handler for file input remains unchanged
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    // Updated handleAddDiamond with explicit diamondData construction and debug logs
    const handleAddDiamond = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        let imageUrl = formData.imageUrl; // fallback if no file is uploaded

        // If an image file is selected, upload it
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
                    const uploadDataRes = await uploadRes.json();
                    imageUrl = uploadDataRes.url;
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

        // Explicitly construct the diamondData object
        const diamondData = {
            title: formData.title,
            description: formData.description,
            carat: parseFloat(formData.carat),
            cut: formData.cut, // This should now reflect the updated value from the dropdown
            color: formData.color,
            clarity: formData.clarity,
            price: parseFloat(formData.price),
            imageUrl,
            status: formData.status,
            certification: formData.certification // This comes from your certification dropdown
            // You can add sellerId if needed: sellerId: loggedInUser.id
        };

        // Log the diamondData to verify the field values
        console.log('Diamond Data to be sent:', diamondData);

        try {
            const res = await fetch('http://localhost:5000/diamonds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(diamondData)
            });
            if (res.ok) {
                fetchInventory();
                // Reset form fields
                setFormData({
                    title: '',
                    description: '',
                    carat: '',
                    cut: 'Brilliant',
                    color: '',
                    clarity: 'IF',
                    price: '',
                    imageUrl: '',
                    status: 'Available',
                    certification: 'GIA'  // default value
                });
                setImageFile(null);
            } else {
                const data = await res.json();
                setErrorMsg(data.message || 'Error adding diamond.');
            }
        } catch (error) {
            console.error('Add diamond error:', error);
            setErrorMsg('Error connecting to the server.');
        }
    };


    const handleEdit = async (id) => {
        const newTitle = prompt("Enter new title:");
        if (!newTitle) return;
        const token = localStorage.getItem('accessToken');
        try {
            const res = await fetch(`http://localhost:5000/diamonds/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title: newTitle })
            });
            if (res.ok) {
                fetchInventory();
            } else {
                const data = await res.json();
                setErrorMsg(data.message || 'Error updating diamond.');
            }
        } catch (error) {
            console.error('Edit diamond error:', error);
            setErrorMsg('Error connecting to the server.');
        }
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
            <h1>Diamond Dashboard</h1>
            {errorMsg && <p className="error">{errorMsg}</p>}

            {/* Add Diamond Form */}
            <section className="add-diamond">
                <h2>Add New Diamond</h2>
                <form onSubmit={handleAddDiamond}>
                    <div className="form-row">
                        <input
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="carat"
                            placeholder="Carat"
                            value={formData.carat}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <select name="cut" value={formData.cut} onChange={handleChange} required>
                            {cutOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <input
                            name="color"
                            placeholder="Color"
                            value={formData.color}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                style={{ flex: '1 1 100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
                    </div>
                    <div className="form-row">
                        <select name="clarity" value={formData.clarity} onChange={handleChange} required>
                            {clarityOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <input
                            name="price"
                            type="number"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
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
                    {/* Single dropdown for certification */}
                    <div className="form-row">
                        <select
                            name="certification"
                            value={formData.certification}
                            onChange={handleChange}
                            style={{ flex: '1 1 100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            {certificationOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="image-preview">
                        {(formData.imageUrl || imageFile) && (
                            <img
                                src={imageFile ? URL.createObjectURL(imageFile) : formData.imageUrl}
                                alt="Image Preview"
                            />
                        )}
                    </div>
                    <button type="submit" className="btn">Add Diamond</button>
                </form>
            </section>

            {/* Inventory List */}
            <section className="inventory">
                <h2>Your Inventory</h2>
                <ul>
                    {inventory.map((item) => (
                        <li key={item.id}>
                            <div className="diamond-info">
                                <img src={item.imageUrl || '/images/diamond-placeholder.jpg'} alt={item.title}/>
                                <div className="info">
                                    <p>
                                        <strong>{item.title}</strong> — {item.carat} ct — {item.cut || 'No cut specified'}
                                    </p>
                                    <p>
                                        Price: £{item.price}
                                        {item.status ? ` (${item.status})` : ''}
                                        {/* Only show parentheses if status is not empty */}
                                    </p>
                                    <p>
                                        Clarity: {item.clarity} | Color: {item.color}
                                    </p>
                                    <p>
                                        Certification: {item.certification || 'None'}
                                    </p>
                                    <p>
                                        {item.description ? item.description : 'No description provided'}
                                    </p>
                                </div>
                            </div>
                            <div className="actions">
                                <button className="edit-btn" onClick={() => handleEdit(item.id)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                                <select
                                    value={item.status}
                                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                >
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
                input, select, textarea {
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
