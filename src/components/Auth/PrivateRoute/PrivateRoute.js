import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';

// A higher-order component to wrap around any route that should be private (accessible only to authenticated users).
const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth(); // Use the custom hook to access the current user from context.

    // Conditionally render children or navigate to the home route based on the authentication status.
    // If currentUser exists (i.e., the user is authenticated), the children (protected component) are rendered.
    // If no currentUser is found (i.e., the user is not authenticated), redirect to the homepage.
    return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute; // Export the component for use in routing setups within the application.
