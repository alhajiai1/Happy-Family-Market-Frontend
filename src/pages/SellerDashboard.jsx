import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMyListings, deleteProduct } from '../api/products';

export default function SellerDashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    fetchMyListings().then(setListings).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(id) {
    if (!confirm('Delete this listing?')) return;
    try {
      await deleteProduct(id);
      setListings((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <main className="page">
      <div className="section-head">
        <h1>My Shop</h1>
        <div>
          <Link to="/seller/bank-details" className="link-btn">Payout Details</Link>
          <Link to="/seller/new" className="primary-btn small">+ New Listing</Link>
        </div>
      </div>

      {loading && <p>Loading your listings...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && listings.length === 0 && (
        <p>You haven't listed anything yet. <Link to="/seller/new">Create your first listing</Link>.</p>
      )}

      <div className="seller-table">
        {listings.map((p) => (
          <div className="seller-row" key={p.id}>
            <div className="thumb small">
              {p.imageUrl ? <img src={p.imageUrl} alt={p.title} /> : <span className="thumb-fallback">🛍️</span>}
            </div>
            <div className="seller-row-info">
              <div className="name">{p.title}</div>
              <div className="price-now">GH₵{p.price.toFixed(2)} · Stock: {p.stock}</div>
            </div>
            <Link to={`/seller/edit/${p.id}`} className="link-btn">Edit</Link>
            <button className="link-btn danger" onClick={() => handleDelete(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
}