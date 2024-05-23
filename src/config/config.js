// Configuration object containing environment-specific variables.
const config = {
  // Endpoints for accessing products and orders APIs.
  productsEndpoint: process.env.REACT_APP_PRODUCTS_ENDPOINT,
  ordersEndpoint: process.env.REACT_APP_ORDERS_ENDPOINT,

  // Firebase configuration for initializing Firebase services.
  firebaseConfig: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // API key for accessing Firebase services.
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, // Domain for Firebase authentication.
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, // Firebase project identifier.
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, // Cloud storage bucket for Firebase.
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, // Sender ID for Firebase Cloud Messaging.
    appId: process.env.REACT_APP_FIREBASE_APP_ID, // App ID for Firebase project.
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID // Measurement ID for Google Analytics for Firebase.
  }
};

export default config; // Export the configuration object for use throughout the application.
