import React from "react";
import './Footer.css'; // Importing CSS for styling the footer.

// Stateless functional component for the footer.
const Footer = () => {
    return (
        // Render a footer HTML element with a class for styling.
        <footer className="footer">
            {/* Display the current year dynamically along with the fixed text. */}
            <p>© {new Date().getFullYear()} Ecommerce Manager. All rights reserved.</p>
        </footer>
    );
}

export default Footer; // Export the Footer component for use in other parts of the application.
