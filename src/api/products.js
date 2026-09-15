import { apiRequest } from './client';

export function fetchProducts({ search = '', category = '' } = {}) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  const qs = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/api/products${qs}`, { auth: false });
}

export function fetchProductById(id) {
  return apiRequest(`/api/products/${id}`, { auth: false });
}

export function createProduct(productData) {
  return apiRequest('/api/products', { method: 'POST', body: productData });
}

export function updateProduct(id, productData) {
  return apiRequest(`/api/products/${id}`, { method: 'PUT', body: productData });
}

export function deleteProduct(id) {
  return apiRequest(`/api/products/${id}`, { method: 'DELETE' });
}

export function fetchMyListings() {
  return apiRequest('/api/products/mine', { method: 'GET' });
}

export function addProductImages(id, images) {
  return apiRequest(`/api/products/${id}/images`, { method: 'POST', body: { images } });
}

export function deleteProductImage(id, imageId) {
  return apiRequest(`/api/products/${id}/images/${imageId}`, { method: 'DELETE' });
}