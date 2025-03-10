// frontend/pages/browse.js
import { useState, useEffect } from 'react';

export default function Browse() {
    const [diamonds, setDiamonds] = useState([]);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('price'); // or 'carat', 'clarity', etc.
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

    const fetchDiamonds = async () => {
        const res = await fetch(`http://localhost:5000/diamonds?page=${page}&sort=${sort}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setDiamonds(data);
    };

    useEffect(() => {
        fetchDiamonds();
    }, [page, sort]);

    return (
        <div className="container">
            <h2>Browse Diamonds</h2>
            <div className="sorting">
                <label>Sort by:</label>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="price">Price</option>
                    <option value="carat">Carat</option>
                    <option value="clarity">Clarity</option>
                </select>
            </div>
            <ul>
                {diamonds.map(d => (
                    <li key={d.id}>{d.title} - ${d.price}</li>
                ))}
            </ul>
            <div className="pagination">
                <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Prev</button>
                <span>Page {page}</span>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
            <style jsx>{`
        .container { max-width: 800px; margin: auto; }
        .sorting, .pagination { margin: 1rem 0; }
      `}</style>
        </div>
    );
}
