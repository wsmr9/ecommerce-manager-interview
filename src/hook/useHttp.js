import { useState } from "react";

// Custom hook to handle HTTP requests with built-in loading and error state management.
function useHttp() {
    
    // State hooks for managing loading status and error information.
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Asynchronous function to send HTTP requests.
    const sendRequest = async (url, method = 'GET', body = null, headers = {}) => {
        
        setIsLoading(true); // Set loading to true at the start of the request.
        setError(null); // Clear any previous errors before starting a new request.
        
        try {
            // Configuration for the fetch request.
            const fetchConfig = {
                method: method, // HTTP method (default is GET).
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON.
                    ...headers // Spread additional headers provided by the user.
                },
                body: body ? JSON.stringify(body) : null // Convert body to JSON string if it exists.
            };

            console.log(fetchConfig); // Logging the fetch configuration for debugging purposes.

            // Execute the fetch call using the configured parameters.
            const response = await fetch(url, fetchConfig);
            if (!response.ok) { // Check if the response status code indicates a failure.
                throw new Error('Request failed!'); // Throw an error if the response is not ok.
            }

            const data = await response.json(); // Parse the JSON response body.
            setIsLoading(false); // Reset loading state to false after the request is complete.
            return data; // Return the parsed data.
        } catch (err) {
            setError(err.message || 'Something went wrong!'); // Set error state to the error message.
            setIsLoading(false); // Ensure loading state is false after an error.
            throw err; // Re-throw the error for handling by the caller.
        }
    };

    // Return the state and function from the hook for use in components.
    return {
        isLoading, // Whether the request is currently loading.
        error, // Any error that occurred during the request.
        sendRequest // Function to initiate a request.
    };
}

export default useHttp; // Export the custom hook for use in other parts of the application.
