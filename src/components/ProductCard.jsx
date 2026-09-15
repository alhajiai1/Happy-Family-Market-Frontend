import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="thumb">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.title} />
          ) : (
            <span className="thumb-fallback">🛍️</span>
          )}
        </div>
      </Link>
      <div className="name">
        <Link to={`/product/${product.id}`}>{product.title}</Link>
      </div>
      <div className="price-row">
        <span className="price-now">GH₵{product.price.toFixed(2)}</span>
      </div>
      <button className="add-btn" onClick={() => addToCart(product, 1)}>Add to Cart</button>
    </div>
  );
}