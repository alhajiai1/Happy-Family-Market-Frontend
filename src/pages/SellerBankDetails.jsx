import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitBankDetails } from '../api/sellers';

export default function SellerBankDetails() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ businessName: '', bankCode: '', accountNumber: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await submitBankDetails(form);
      navigate('/seller/dashboard');
    } catch (err) {
      setError(err.message || 'Could not save bank details.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page">
      <h1>Payout Details</h1>
      <p>Add your bank details so you can receive payment when your items sell.</p>

      <form className="listing-form" onSubmit={handleSubmit}>
        {error && <div className="error-banner">{error}</div>}

        <label>
          Business Name
          <input
            required
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          />
        </label>

        <label>
          Bank Code
          <input
            required
            value={form.bankCode}
            onChange={(e) => setForm({ ...form, bankCode: e.target.value })}
            placeholder="e.g. from Paystack's list of supported banks"
          />
        </label>

        <label>
          Account Number
          <input
            required
            value={form.accountNumber}
            onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
          />
        </label>

        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Payout Details'}
        </button>
      </form>
    </main>
  );
}