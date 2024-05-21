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
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <div className="main-content">
            <Routes>
              <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
              <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
              <Route path='/signup' element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute><OrderList /></PrivateRoute>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

