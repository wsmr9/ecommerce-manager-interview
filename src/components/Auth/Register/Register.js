import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import ErrorBanner from '../../Layout/ErrorBanner/ErrorBanner';
import './Register.css';

const Register = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate between routes.
    const [email, setEmail] = useState(''); // State to store the user's email.
    const [password, setPassword] = useState(''); // State to store the user's password.

    const [isError , setIsError] = useState(false)
    const [messageError, setMessageError] = useState(null)

    const onSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior.
        setIsError(false)
        setMessageError(null)
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // On successful registration
                const user = userCredential.user; // User object for the newly created user.
                console.log(user); // Log user data for debugging purposes.
                navigate("/products"); // Navigate to the products page after successful registration.
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
        <div className="register-container">
            <form onSubmit={onSubmit} className="register-form">
                <h1>Sign Up</h1>
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
                <button type="submit">Sign up</button>
                {isError && <ErrorBanner error={messageError} />}
                <NavLink to="/login">Already have an account? Sign in</NavLink>
            </form>
        </div>
    )
}

export default Register; // Export the component for use in other parts of the application.
