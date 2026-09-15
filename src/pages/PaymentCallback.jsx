import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { verifyPayment } from '../api/payments';
import { useCart } from '../context/CartContext';

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference') || searchParams.get('trxref');
  const { clearCart } = useCart();
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!reference) {
      setStatus('failed');
      setError('No payment reference found in the URL.');
      return;
    }
    verifyPayment(reference)
      .then((res) => {
        if (res.status === 'success') {
          clearCart();
          setStatus('success');
        } else {
          setStatus('failed');
        }
      })
      .catch((err) => {
        setStatus('failed');
        setError(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  return (
    <main className="page">
      {status === 'checking' && <p>Confirming your payment...</p>}
      {status === 'success' && (
        <div className="result-card success">
          <h1>Payment successful 🎉</h1>
          <p>Your order has been placed. Thank you for shopping with us!</p>
          <Link to="/" className="primary-btn">Continue Shopping</Link>
        </div>
      )}
      {status === 'failed' && (
        <div className="result-card failed">
          <h1>Payment not confirmed</h1>
          <p>{error || "We couldn't verify this payment. If you were charged, contact support."}</p>
          <Link to="/cart" className="primary-btn">Back to Cart</Link>
        </div>
      )}
    </main>
  );
}