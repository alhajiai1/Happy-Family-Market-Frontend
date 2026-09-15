import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchProducts({ search })
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <main className="page">
      <section className="hero-simple">
        <h1>Everything your household needs, delivered with a smile</h1>
        <p>Groceries, gadgets and everyday essentials from local sellers.</p>
      </section>

      <div className="section-head">
        <h2>{search ? `Results for "${search}"` : 'All Products'}</h2>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="error-text">Couldn't load products: {error}</p>}
      {!loading && !error && products.length === 0 && <p>No products found.</p>}

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}