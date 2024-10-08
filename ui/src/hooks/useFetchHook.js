import { useEffect, useState } from "react";

export const useFetch = (url, page, limit) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const apiCall = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${url}?page=${page}&limit=${limit}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result.data);
            setTotalCount(result.totalCount);
            setTotalPages(result.total);
            setError(null);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        apiCall();
    }, [url, page, limit]);

    return { error, data, loading, totalCount, totalPages };
};
