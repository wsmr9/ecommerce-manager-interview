import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

// Create a context for authentication.
const AuthContext = createContext();

// Custom hook to access the authentication context.
export const useAuth = () => useContext(AuthContext);

// Provider component to manage and provide the auth context to its children.
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // State to hold the current user object.
    const [loading, setLoading] = useState(true); // State to manage the loading status.

    useEffect(() => {
        // Subscribe to the user authentication state change.
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user); // Update the current user based on auth state change.
            setLoading(false); // Set loading to false once the user is fetched or confirmed as null.
        });

        // Clean up the subscription on component unmount.
        return unsubscribe;
    }, []);

    // Render children only when not loading, otherwise wait.
    return (
        <AuthContext.Provider value={{ currentUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
