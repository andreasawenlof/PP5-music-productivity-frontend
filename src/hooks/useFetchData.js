import { useState, useEffect } from 'react';
import { axiosReq } from '../api/axiosDefaults'; // Adjust if needed

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // Prevents state updates on unmounted components
        const fetchData = async () => {
            try {
                const response = await axiosReq.get(url);
                if (isMounted) {
                    setData(response.data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.response?.data || 'Failed to load data.');
                    setLoading(false);
                }
            }
        };

        fetchData();
        return () => (isMounted = false); // Cleanup to prevent memory leaks
    }, [url]);

    return { data, loading, error };
};

export default useFetchData;
