import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const { user } = useAuth();

  if (!user) return null; // ProtectedRoute handles the redirect before this renders

  return (
    <main className="page">
      <h1>My Account</h1>

      <div className="auth-card" style={{ margin: '16px 0', maxWidth: '480px' }}>
        <label>
          Name
          <input value={user.name} disabled />
        </label>
        <label>
          Email
          <input value={user.email} disabled />
        </label>
        <label>
          Role
          <input value={user.role === 'seller' ? 'Seller' : 'Buyer'} disabled />
        </label>
        {'isVerified' in user && (
          <label>
            Email Status
            <input value={user.isVerified ? 'Verified ✓' : 'Not verified'} disabled />
          </label>
        )}
      </div>

      <div className="section-head">
        <h2>Quick Links</h2>
      </div>

      <div className="seller-table">
        {user.role === 'seller' && (
          <>
            <Link to="/seller/dashboard" className="seller-row">
              <div className="seller-row-info">
                <div className="name">My Shop</div>
                <div className="price-now" style={{ fontSize: '13px' }}>View and manage your listings</div>
              </div>
            </Link>
            <Link to="/seller/bank-details" className="seller-row">
              <div className="seller-row-info">
                <div className="name">Payout Details</div>
                <div className="price-now" style={{ fontSize: '13px' }}>Where we send your payouts</div>
              </div>
            </Link>
          </>
        )}
      </div>
    </main>
  );
}