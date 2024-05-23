// Import modules for routing and components for the application.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/Products/ProductList/ProductList';
import OrderList from './components/Orders/OrderList/OrderList';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import PrivateRoute from './components/Auth/PrivateRoute/PrivateRoute';
import PublicRoute from './components/Auth/PublicRoute/PublicRoute';
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import './App.css'

function App() {
  return (
    <AuthProvider> {/* Provides a context for authentication state throughout the application. */}
      <Router> {/* Setup the router to manage the routes defined within. */}
        <Header /> {/* Static header across all routes. */}
        <div className="main-content">
          <Routes> {/* Define the application's routing paths. */}
            {/* Routes for unauthenticated users, redirects authenticated users. */}
            <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/signup' element={<PublicRoute><Register /></PublicRoute>} />
            {/* Routes for authenticated users only, redirects unauthenticated users. */}
            <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><OrderList /></PrivateRoute>} />
          </Routes>
        </div>
        <Footer /> {/* Static footer across all routes. */}
      </Router>
    </AuthProvider>
  );
}

export default App;  // Export App for use in index.js.
