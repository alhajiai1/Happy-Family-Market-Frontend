import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(query)}`);
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <span className="mark">🌿</span> Happy Family Market
        </Link>

        <form className="search-wrap" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <nav className="navbar-actions">
          {user ? (
            <>
              {user.role === 'seller' && (
                <Link to="/seller/dashboard" className="nav-link">My Shop</Link>
              )}
              <Link to="/cart" className="nav-link cart-link">
                🛒 Cart
                {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
              </Link>
              <Link to="/account" className="nav-link">Hi, {user.name?.split(' ')[0]}</Link>
              <button className="nav-link" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/cart" className="nav-link cart-link">
                🛒 Cart
                {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
              </Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link nav-cta">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}