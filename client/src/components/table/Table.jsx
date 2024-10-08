import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetchHook';
import './table.style.scss'

const Table = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const { data, error, loading, totalPages } = useFetch(process.env.REACT_APP_BASE_URL, page, limit);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
        }
    };
    
    if (error) return <div className="error">An error occurred: {error}</div>;

    return (
        <div className="table-container">
            <div className='loader-container'>
            {loading&& <span className="loader"></span>}
            </div>

            {data.length > 0 ? 
            <table className="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.name || '-'}</td>
                        <td>{item.email || '-'}</td>
                    </tr>
                ))}
            </tbody>
        </table>: <>No data found</>
            }
            
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;
