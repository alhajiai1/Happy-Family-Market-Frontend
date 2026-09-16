import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentCallback from './pages/PaymentCallback';
import SellerDashboard from './pages/SellerDashboard';
import CreateListing from './pages/CreateListing';
import SellerBankDetails from './pages/SellerBankDetails';
import Account from './pages/Account';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />

            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seller/dashboard"
              element={
                <ProtectedRoute requireRole="seller">
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seller/new"
              element={
                <ProtectedRoute requireRole="seller">
                  <CreateListing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seller/edit/:id"
              element={
                <ProtectedRoute requireRole="seller">
                  <CreateListing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seller/bank-details"
              element={
                <ProtectedRoute requireRole="seller">
                  <SellerBankDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}