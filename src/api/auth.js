import { apiRequest } from './client';

export function registerUser({ name, email, password, role = 'buyer' }) {
  return apiRequest('/api/auth/register', {
    method: 'POST',
    auth: false,
    body: { name, email, password, role },
  });
  // Response: { message, email } — no token yet, must verify first
}

export function verifyEmail({ email, code }) {
  return apiRequest('/api/auth/verify-email', {
    method: 'POST',
    auth: false,
    body: { email, code },
  });
}

export function resendVerification({ email }) {
  return apiRequest('/api/auth/resend-verification', {
    method: 'POST',
    auth: false,
    body: { email },
  });
}

export function loginUser({ email, password }) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    auth: false,
    body: { email, password },
  });
}

export function googleLogin({ credential, role }) {
  return apiRequest('/api/auth/google', {
    method: 'POST',
    auth: false,
    body: { credential, role },
  });
}

export function fetchCurrentUser() {
  return apiRequest('/api/auth/me', { method: 'GET' });
}