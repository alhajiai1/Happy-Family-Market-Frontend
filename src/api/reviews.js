import { apiRequest } from './client';

export function fetchProductReviews(productId) {
  return apiRequest(`/api/products/${productId}/reviews`, {
    method: 'GET',
    auth: false,
  });
  // Response: { summary: { reviewCount, averageRating }, reviews: [...] }
}

export function submitReview(productId, { rating, comment, imageUrl }) {
  return apiRequest(`/api/products/${productId}/reviews`, {
    method: 'POST',
    body: { rating, comment, imageUrl },
  });
}

export function updateReview(reviewId, { rating, comment, imageUrl }) {
  return apiRequest(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    body: { rating, comment, imageUrl },
  });
}

export function deleteReview(reviewId) {
  return apiRequest(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });
}