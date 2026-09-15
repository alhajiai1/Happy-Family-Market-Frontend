import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchProductReviews, submitReview } from '../api/reviews';
import { uploadReviewImage } from '../utils/uploadReviewImage';

export default function ProductReviews({ productId }) {
  const { user } = useAuth();
  const [summary, setSummary] = useState({ reviewCount: 0, averageRating: null });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    loadReviews();
  }, [productId]);

  function loadReviews() {
    setLoading(true);
    fetchProductReviews(productId)
      .then((data) => {
        setSummary(data.summary);
        setReviews(data.reviews);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  const alreadyReviewed = user && reviews.some((r) => r.userId === user.id);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      let imageUrl = null;
      if (file) {
        imageUrl = await uploadReviewImage(file);
      }
      await submitReview(productId, { rating, comment, imageUrl });
      setComment('');
      setFile(null);
      setRating(5);
      loadReviews();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="reviews-section">
      <h2>Reviews</h2>

      <div className="reviews-summary">
        {summary.averageRating ? (
          <>
            <span className="reviews-average">{summary.averageRating.toFixed(1)} ★</span>
            <span className="reviews-count">({summary.reviewCount} review{summary.reviewCount === 1 ? '' : 's'})</span>
          </>
        ) : (
          <span className="reviews-count">No reviews yet</span>
        )}
      </div>

      {loading && <p>Loading reviews...</p>}
      {error && <p className="error-text">{error}</p>}

      <ul className="reviews-list">
        {reviews.map((r) => (
          <li key={r.id} className="review-item">
            <div className="review-header">
              <strong>{r.reviewerName}</strong>
              <span className="review-rating">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
            </div>
            {r.comment && <p className="review-comment">{r.comment}</p>}
            {r.imageUrl && (
              <img src={r.imageUrl} alt="Review" className="review-image" />
            )}
            <span className="review-date">{new Date(r.createdAt).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>

      {user && !alreadyReviewed && (
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Leave a review</h3>

          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} star{n === 1 ? '' : 's'}</option>
            ))}
          </select>

          <label>Comment (optional)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={1000}
            rows={3}
          />

          <label>Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          {formError && <p className="error-text">{formError}</p>}

          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      {user && alreadyReviewed && (
        <p className="review-note">You've already reviewed this product.</p>
      )}

      {!user && (
        <p className="review-note">Log in to leave a review.</p>
      )}
    </section>
  );
}