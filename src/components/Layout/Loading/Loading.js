import React from 'react';
import './Loading.css';  // Import the CSS for styling the loading animation.

// Functional component for displaying a loading indicator.
const Loading = () => {
    return (
        // Container for the loading component.
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    );
}

export default Loading;  // Export the Loading component for use in other parts of the application.
