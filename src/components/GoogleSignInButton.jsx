import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function GoogleSignInButton({ role = 'buyer' }) {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!window.google || !buttonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          await googleLogin(response.credential, role);
          navigate('/');
        } catch (err) {
          alert(err.message || 'Google sign-in failed');
        }
      },
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: 'outline',
      size: 'large',
      width: 320,
      text: 'continue_with',
    });
  }, [role]);

  return <div ref={buttonRef} style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }} />;
}