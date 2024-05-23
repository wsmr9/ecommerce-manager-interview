import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';

// A higher-order component to wrap around any route that should be accessible only by unauthenticated users.
const PublicRoute = ({ children }) => {
    const { currentUser } = useAuth(); // Use the custom hook to access the current user from context.

    // Conditionally render children or navigate based on the authentication status.
    // If currentUser exists (i.e., the user is already authenticated), redirect to a specific route, typically a user dashboard or home.
    // If no currentUser is found (i.e., the user is not authenticated), render the children (the component intended to be public).
    return currentUser ? <Navigate to="/products" /> : children;
};

export default PublicRoute; // Export the component for use in routing setups within the application.
