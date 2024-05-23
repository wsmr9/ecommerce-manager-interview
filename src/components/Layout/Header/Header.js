import React, { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import ErrorBanner from '../../Layout/ErrorBanner/ErrorBanner';

import './Header.css';

const Header = () => {
    const location = useLocation(); // Hook to get the current route location.
    const navigate = useNavigate(); // Hook for programmatically navigating.

    const { currentUser } = useAuth(); // Custom hook to access the current user.
    const [title, setTitle] = useState('Welcome to Ecommerce Manager'); // State for the dynamic title.

    const [isError , setIsError] = useState(false)
    const [messageError, setMessageError] = useState(null)

    // Effect to update the title based on the current route.
    useEffect(() => {
        const welcomeRoutes = ['/', '/login', '/signup'];

        if (welcomeRoutes.includes(location.pathname)) {
            setTitle('Welcome to Ecommerce Manager');
        } else if (location.pathname === '/products') {
            setTitle('Products Management');
        } else if (location.pathname === '/orders') {
            setTitle('Order Management');
        } else {
            setTitle('404 Page Not Found');
        }

    }, [location.pathname]); // Dependency on the path to re-run the effect.

    // Function to handle user logout.
    const handleLogout = async () => {
        setIsError(false)
        setMessageError(null)
        try {
            await signOut(auth); // Firebase method to sign out the user.
            navigate('/'); // Navigate to home page after logout.
        } catch (error) {
            setIsError(true)
            setMessageError(error?.message || 'Error signing out')
            console.error('Error signing out:', error); // Error handling.
        }
    };

    return (
        <header className="main-header">
            <h1>{title}</h1>
            {isError && <ErrorBanner error={messageError} />}
            {currentUser && (
                <nav>
                    <NavLink to="/products" className={({ isActive }) => isActive ? 'header-link active' : 'header-link'}>Products</NavLink>
                    <NavLink to="/orders" className={({ isActive }) => isActive ? 'header-link active' : 'header-link'}>Orders</NavLink>
                    {currentUser && (
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    )}
                </nav>
            )}
        </header>
    );
}

export default Header; // Export the Header component.
