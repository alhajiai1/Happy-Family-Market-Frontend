import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, fetchProductById } from '../api/products';
import { uploadProductImages } from '../utils/uploadProductImages';

const emptyForm = { title: '', description: '', price: '', category: '', stock: '' };

export default function CreateListing() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchProductById(id).then((p) => {
        setForm({
          title: p.title,
          description: p.description,
          price: p.price,
          category: p.category,
          stock: p.stock,
        });
        setExistingImages(p.images || []);
      });
    }
  }, [id, isEditing]);

  function handleFileChange(e) {
    const selected = Array.from(e.target.files || []);
    const totalCount = existingImages.length + selected.length;
    if (totalCount > 8) {
      setError('You can add up to 8 images total.');
      return;
    }
    setError('');
    setFiles(selected);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      let imageUrls = [];
      if (files.length > 0) {
        setUploading(true);
        imageUrls = await uploadProductImages(files);
        setUploading(false);
      }

      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        images: imageUrls,
      };

      if (isEditing) await updateProduct(id, payload);
      else await createProduct(payload);

      navigate('/seller/dashboard');
    } catch (err) {
      setError(err.message || 'Could not save listing');
    } finally {
      setSubmitting(false);
      setUploading(false);
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
          Photos (up to 8)
          <input type="file" accept="image/*" multiple onChange={handleFileChange} />
        </label>

        {existingImages.length > 0 && (
          <div className="image-preview-row">
            {existingImages.map((img) => (
              <img key={img.id} src={img.imageUrl} alt="Existing" className="image-preview-thumb" />
            ))}
          </div>
        )}

        {files.length > 0 && (
          <p className="upload-note">{files.length} new photo{files.length === 1 ? '' : 's'} selected</p>
        )}

        <button type="submit" className="primary-btn" disabled={submitting || uploading}>
          {uploading ? 'Uploading photos...' : submitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Listing'}
        </button>
      </form>
    </main>
  );
}