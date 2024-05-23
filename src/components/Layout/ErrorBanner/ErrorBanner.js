import React from 'react';
import './ErrorBanner.css';  // Make sure to link the CSS file correctly.

const ErrorBanner = ({ error }) => {
    if (!error) return null;  // If there's no error, don't display the banner.

    return (
        <div className="error-banner">
            <p>{error}</p>
        </div>
    );
};

export default ErrorBanner;