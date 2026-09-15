import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, fetchProductById } from '../api/products';

const emptyForm = { title: '', description: '', price: '', category: '', stock: '', imageUrl: '' };

export default function CreateListing() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchProductById(id).then((p) =>
        setForm({
          title: p.title,
          description: p.description,
          price: p.price,
          category: p.category,
          stock: p.stock,
          imageUrl: p.imageUrl || '',
        })
      );
    }
  }, [id, isEditing]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (isEditing) await updateProduct(id, payload);
      else await createProduct(payload);
      navigate('/seller/dashboard');
    } catch (err) {
      setError(err.message || 'Could not save listing');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page">
      <h1>{isEditing ? 'Edit Listing' : 'New Listing'}</h1>
      <form className="listing-form" onSubmit={handleSubmit}>
        {error && <div className="error-banner">{error}</div>}

        <label>
          Title
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </label>

        <label>
          Description
          <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </label>

        <div className="form-row">
          <label>
            Price (GH₵)
            <input type="number" step="0.01" min="0" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </label>
          <label>
            Stock
            <input type="number" min="0" required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          </label>
        </div>

        <label>
          Category
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        </label>

        <label>
          Image URL
          <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
        </label>

        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Listing'}
        </button>
      </form>
    </main>
  );
}