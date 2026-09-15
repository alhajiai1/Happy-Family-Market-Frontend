import { apiRequest } from './client';

export function submitBankDetails({ businessName, bankCode, accountNumber }) {
  return apiRequest('/api/sellers/bank-details', {
    method: 'POST',
    body: { businessName, bankCode, accountNumber },
  });
}