import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import { useCart } from '../context/CartContext';
import ProductReviews from '../components/ProductReviews';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetchProductById(id).then(setProduct).catch((err) => setError(err.message));
  }, [id]);

  if (error) return <main className="page"><p className="error-text">{error}</p></main>;
  if (!product) return <main className="page"><p>Loading...</p></main>;

  return (
    <main className="page">
      <div className="detail-grid">
        <div className="thumb detail-thumb">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.title} />
          ) : (
            <span className="thumb-fallback">🛍️</span>
          )}
        </div>
        <div className="detail-info">
          <h1>{product.title}</h1>
          <p className="price-now large">GH₵{product.price.toFixed(2)}</p>
          <p className="detail-desc">{product.description}</p>
          <div className="qty-row">
            <label>Quantity</label>
            <input
              type="number"
              min={1}
              max={product.stock ?? 99}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <button
            className="primary-btn"
            onClick={() => {
              addToCart(product, quantity);
              setAdded(true);
              setTimeout(() => setAdded(false), 2000);
            }}
          >
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <ProductReviews productId={id} />
    </main>
  );
}