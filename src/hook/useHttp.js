import { useState } from "react";

function useHttp() {
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (url, method = 'GET', body = null, headers = {}) => {
        
        setIsLoading(true);
        setError(null);
        
        try {
            const fetchConfig = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: body ? JSON.stringify(body) : null
            };

            console.log(fetchConfig)

            const response = await fetch(url, fetchConfig);
            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            setIsLoading(false);
            return data;
        } catch (err) {
            setError(err.message || 'Something went wrong!');
            setIsLoading(false);
            throw err;
        }
    };

    return {
        isLoading,
        error,
        sendRequest
    };
}

export default useHttp;