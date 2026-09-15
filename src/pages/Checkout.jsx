import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { initiateCheckout } from '../api/payments';

export default function Checkout() {
  const { items, totalGHS } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handlePay() {
    setError('');
    setSubmitting(true);
    try {
      const cartItems = items.map((i) => ({ productId: i.product.id, quantity: i.quantity }));
      const { authorizationUrl } = await initiateCheckout({ cartItems, totalAmountGHS: totalGHS });
      window.location.href = authorizationUrl;
    } catch (err) {
      setError(err.message || 'Could not start checkout');
      setSubmitting(false);
    }
  }

  return (
    <main className="page">
      <h1>Checkout</h1>
      <div className="cart-summary-box">
        {items.map(({ product, quantity }) => (
          <div className="checkout-line" key={product.id}>
            <span>{product.title} × {quantity}</span>
            <span>GH₵{(product.price * quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="checkout-line total">
          <span>Total</span>
          <span>GH₵{totalGHS.toFixed(2)}</span>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <button className="primary-btn paystack-btn" onClick={handlePay} disabled={submitting}>
        {submitting ? 'Redirecting to Paystack...' : `Pay GH₵${totalGHS.toFixed(2)} with Paystack`}
      </button>

      <p className="checkout-note">
        You'll be redirected to Paystack's secure page to pay by card, mobile money, or bank transfer.
      </p>
    </main>
  );
}