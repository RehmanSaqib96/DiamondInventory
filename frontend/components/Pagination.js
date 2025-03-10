// components/Pagination.js
export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="pagination">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
                Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
                Next
            </button>
            <style jsx>{`
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin: 20px 0;
        }
        button {
          padding: 5px 10px;
          background: #a67c52;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: background 0.3s;
        }
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
        </div>
    );
}
