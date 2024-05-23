import React, {useState} from 'react';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import ErrorBanner from '../../Layout/ErrorBanner/ErrorBanner';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();  // Hook to programmatically navigate between routes.
    const [email, setEmail] = useState('');  // State to store the user's email.
    const [password, setPassword] = useState('');  // State to store the user's password.
    
    const [isError , setIsError] = useState(false)
    const [messageError, setMessageError] = useState(null)

    const onLogin = (e) => {
        e.preventDefault();  // Prevents the default form submission behavior.
        // Firebase function to sign in users with email and password.
        setIsError(false)
        setMessageError(null)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;  // User object for the signed-in user.
            navigate("/products");  // Navigate to the products page after successful login.
            console.log(user);  // Log user data for debugging purposes.
        })
        .catch((error) => {
            setIsError(true)
            const errorCode = error.code;  // Firebase error code.
            const errorMessage = error.message;  // Firebase error message.
            setMessageError(errorMessage)
            console.log(errorCode, errorMessage);  // Log errors for debugging purposes.
        });
    }

    return (
        <div className="login-container">
            <form onSubmit={onLogin} className="login-form">
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder="Email address"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>

                {isError && <ErrorBanner error={messageError} />}
                
                <NavLink to="/signup">Don't have an account? Sign up</NavLink>
            </form>
        </div>
    )
}

export default Login;  // Export the component for use in other parts of the application.
