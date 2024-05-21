import React , { useState, useEffect} from "react";
import { useLocation, NavLink, useNavigate  } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext/AuthContext'; 
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import './Header.css'

const Header = () => {

    const location = useLocation()
    const navigate = useNavigate();

    const { currentUser } = useAuth();
    const [title , setTitle ] = useState('Welcome to Ecommerce Manager')

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

    },[location.pathname])

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return ( 
        <header className="main-header">
            <h1>{title}</h1>
            { currentUser && (
                <nav>
                <NavLink to="/products" className={({ isActive }) => isActive ? 'header-link active' : 'header-link'}>Products</NavLink>
                <NavLink to="/orders" className={({ isActive }) => isActive ? 'header-link active' : 'header-link'}>Orders</NavLink>
                {currentUser && (
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                )}
            </nav>
            )}
            
        </header>
    )
}

export default Header