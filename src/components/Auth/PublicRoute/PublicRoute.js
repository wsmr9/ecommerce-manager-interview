import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';

const PublicRoute = ({ children }) => {
    const { currentUser } = useAuth();

    return currentUser ? <Navigate to="/products" /> : children;
};

export default PublicRoute;

