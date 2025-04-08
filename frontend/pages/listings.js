// pages/listings.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import DiamondCard from '../components/DiamondCard';
import Pagination from '../components/Pagination';

export default function Listings() {
    const [diamonds, setDiamonds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Display 12 diamonds per page
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        sort: '', // e.g. 'priceAsc', 'caratDesc', etc.
    });

    // Fetch diamonds on mount
    useEffect(() => {
        fetchDiamonds();
    }, []);

    const fetchDiamonds = async () => {
        try {
            // Replace with your actual endpoint (public or protected)
            const res = await fetch('http://localhost:5000/diamonds/public');
            if (res.ok) {
                const data = await res.json();
                setDiamonds(data);
            } else {
                console.error('Failed to fetch diamonds');
            }
        } catch (error) {
            console.error('Error fetching diamonds:', error);
        }
    };

    // Filtering
    const filteredDiamonds = diamonds.filter((diamond) => {
        const meetsMin = filters.minPrice ? diamond.price >= parseFloat(filters.minPrice) : true;
        const meetsMax = filters.maxPrice ? diamond.price <= parseFloat(filters.maxPrice) : true;
        return meetsMin && meetsMax;
    });

    // Sorting
    const sortDiamonds = (a, b) => {
        if (!filters.sort) {
            // Default sort: sort by creation time (assuming the API returns createdAt)
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
        switch (filters.sort) {
            case 'priceAsc':
                return a.price - b.price;
            case 'priceDesc':
                return b.price - a.price;
            case 'caratAsc':
                return a.carat - b.carat;
            case 'caratDesc':
                return b.carat - a.carat;
            case 'clarityAsc':
                return a.clarity.localeCompare(b.clarity); // alphabetical
            case 'clarityDesc':
                return b.clarity.localeCompare(a.clarity);
            case 'cutAsc':
                return a.cut.localeCompare(b.cut); // alphabetical
            case 'cutDesc':
                return b.cut.localeCompare(a.cut);
            default:
                return 0;
        }
    };

    const sortedDiamonds = [...filteredDiamonds].sort(sortDiamonds);

    // Pagination
    const totalPages = Math.ceil(sortedDiamonds.length / itemsPerPage);
    const displayedDiamonds = sortedDiamonds.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setCurrentPage(1); // reset to first page on filter change
    };

    return (
        <Layout>
            <Head>
                <title>Diamond Listings | DiamondStore</title>
                <meta
                    name="description"
                    content="Browse our diamond inventory with advanced filtering and sorting options."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <h1>Diamond Listings</h1>

            {/* Filter & Sort Section */}
            <div className="filter-section">
                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                />

                <select name="sort" value={filters.sort} onChange={handleFilterChange}>
                    <option value="">Sort By</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="caratAsc">Carat: Low to High</option>
                    <option value="caratDesc">Carat: High to Low</option>
                    <option value="clarityAsc">Clarity: A - Z</option>
                    <option value="clarityDesc">Clarity: Z - A</option>
                    <option value="cutAsc">Cut: A - Z</option>
                    <option value="cutDesc">Cut: Z - A</option>
                </select>
            </div>

            {/* Diamond Grid */}
            <div className="diamond-grid">
                {displayedDiamonds.map((diamond) => (
                    <DiamondCard key={diamond.id} diamond={diamond} />
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <style jsx>{`
        h1 {
          text-align: center;
          margin: 20px 0;
          font-family: 'EB Garamond', serif;
          font-size: 36px;
          color: #333;
        }
        .filter-section {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
          padding: 0 20px;
        }
        .filter-section input,
        .filter-section select {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }
        .diamond-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding: 0 20px;
          margin-bottom: 30px;
        }
      `}</style>
        </Layout>
    );
}
