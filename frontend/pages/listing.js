// pages/listings.js
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import DiamondCard from '../components/DiamondCard';
import Pagination from '../components/Pagination';

export default function Listings() {
    // Dummy data; replace with API call to your backend (http://localhost:5000/diamonds)
    const allDiamonds = [
        { id: 1, title: 'Brilliant Cut', carat: 1.2, price: 5000, image: '/images/diamond1.jpg' },
        { id: 2, title: 'Princess Cut', carat: 1.0, price: 4500, image: '/images/diamond2.jpg' },
        { id: 3, title: 'Emerald Cut', carat: 1.5, price: 6000, image: '/images/diamond3.jpg' },
        { id: 4, title: 'Oval Cut', carat: 1.3, price: 5200, image: '/images/diamond4.jpg' },
        { id: 5, title: 'Cushion Cut', carat: 1.1, price: 4800, image: '/images/diamond5.jpg' },
        { id: 6, title: 'Marquise Cut', carat: 1.4, price: 5500, image: '/images/diamond6.jpg' },
        { id: 7, title: 'Radiant Cut', carat: 1.6, price: 6300, image: '/images/diamond7.jpg' },
        { id: 8, title: 'Asscher Cut', carat: 1.2, price: 5100, image: '/images/diamond8.jpg' },
    ];

    const [diamonds, setDiamonds] = useState(allDiamonds);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(diamonds.length / itemsPerPage);

    // Dummy filtering & sorting
    const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', sort: '' });

    const filteredDiamonds = diamonds.filter(diamond => {
        const meetsMin = filters.minPrice ? diamond.price >= parseFloat(filters.minPrice) : true;
        const meetsMax = filters.maxPrice ? diamond.price <= parseFloat(filters.maxPrice) : true;
        return meetsMin && meetsMax;
    });

    const sortedDiamonds = filters.sort
        ? [...filteredDiamonds].sort((a, b) => filters.sort === 'lowToHigh' ? a.price - b.price : b.price - a.price)
        : filteredDiamonds;

    const displayedDiamonds = sortedDiamonds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    };

    const handleSortChange = (e) => {
        setFilters({...filters, sort: e.target.value});
    };

    return (
        <Layout>
            <Head>
                <title>Diamond Listings | DiamondStore</title>
                <meta name="description" content="Browse our diamond inventory with advanced filtering and sorting options." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <h1>Diamond Listings</h1>
            <div className="filter-section">
                <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} />
                <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange} />
                <select name="sort" value={filters.sort} onChange={handleSortChange}>
                    <option value="">Sort By</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </select>
            </div>
            <div className="diamond-grid">
                {displayedDiamonds.map(diamond => (
                    <DiamondCard key={diamond.id} diamond={diamond} />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            <style jsx>{`
        h1 {
          text-align: center;
          margin: 20px 0;
        }
        .filter-section {
          text-align: center;
          margin-bottom: 20px;
        }
        .filter-section input, .filter-section select {
          margin: 0 10px;
          padding: 8px;
        }
        .diamond-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
      `}</style>
        </Layout>
    );
}
