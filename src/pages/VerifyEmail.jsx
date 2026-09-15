import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resendVerification } from '../api/auth';

export default function VerifyEmail() {
  const { verifyEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || '');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await verifyEmail({ email, code });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    setError('');
    try {
      await resendVerification({ email });
      setResent(true);
      setTimeout(() => setResent(false), 4000);
    } catch (err) {
      setError(err.message || 'Could not resend code');
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Verify your email</h1>
        <p className="auth-subtitle">Enter the 6-digit code we sent to your email.</p>

        {error && <div className="error-banner">{error}</div>}
        {resent && (
          <div className="error-banner" style={{ background: '#eff7f2', color: '#1b4332' }}>
            A new code has been sent.
          </div>
        )}

        <label>
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Verification Code
          <input
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            style={{ letterSpacing: '4px', fontSize: '18px', textAlign: 'center' }}
          />
        </label>

        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Verifying...' : 'Verify & Continue'}
        </button>

        <button type="button" className="link-btn" onClick={handleResend} style={{ margin: '0 auto' }}>
          Resend code
        </button>

        <p className="auth-switch">
          Wrong email? <Link to="/register">Go back</Link>
        </p>
      </form>
    </main>
  );
}