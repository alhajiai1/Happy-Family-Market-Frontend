import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalGHS } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleCheckout() {
    navigate(user ? '/checkout' : '/login');
  }

  if (items.length === 0) {
    return (
      <main className="page">
        <h1>Your Cart</h1>
        <p>Your cart is empty. <Link to="/">Start shopping</Link>.</p>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {items.map(({ product, quantity }) => (
          <div className="cart-row" key={product.id}>
            <div className="thumb small">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.title} />
              ) : (
                <span className="thumb-fallback">🛍️</span>
              )}
            </div>
            <div className="cart-row-info">
              <div className="name">{product.title}</div>
              <div className="price-now">GH₵{product.price.toFixed(2)}</div>
            </div>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
              className="qty-input"
            />
            <button className="link-btn" onClick={() => removeFromCart(product.id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <span>Total</span>
        <span className="price-now large">GH₵{totalGHS.toFixed(2)}</span>
      </div>

      <button className="primary-btn" onClick={handleCheckout}>Proceed to Checkout</button>
    </main>
  );
}