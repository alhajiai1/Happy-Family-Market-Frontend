import { apiRequest } from './client';

export function initiateCheckout({ cartItems, totalAmountGHS }) {
  return apiRequest('/api/payments/initiate', {
    method: 'POST',
    body: {
      items: cartItems,
      amount: totalAmountGHS,
      currency: 'GHS',
    },
  });
}

export function verifyPayment(reference) {
  return apiRequest(`/api/payments/verify/${reference}`, { method: 'GET' });
}