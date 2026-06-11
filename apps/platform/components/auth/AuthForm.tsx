'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient, isAuthConfigured } from '../../lib/supabase/client';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: '#111114',
  border: '1px solid #1A1A1E',
  borderRadius: 6,
  color: '#E8E8EC',
  fontSize: 14,
  marginTop: 8,
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#8A8A8E',
  fontSize: 13,
  marginTop: 16,
};

export function AuthForm({ mode }: { mode: 'sign-in' | 'create-account' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAuthConfigured()) {
    return (
      <p style={{ color: '#8A8A8E', fontSize: 14 }}>
        Auth is not configured yet. Join the{' '}
        <Link href="/beta" style={{ color: '#6B9B6B' }}>beta waitlist</Link> while we finish setup.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const supabase = createClient();

    if (mode === 'create-account') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName || email.split('@')[0] } },
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Account created. Check your email to confirm, then sign in.');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message);
      } else {
        window.location.href = '/account';
      }
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {mode === 'create-account' && (
        <label style={labelStyle}>
          Display name
          <input style={inputStyle} value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="How we greet you" />
        </label>
      )}
      <label style={labelStyle}>
        Email
        <input style={inputStyle} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </label>
      <label style={labelStyle}>
        Password
        <input style={inputStyle} type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
      </label>
      {message && <p style={{ color: '#C8A96E', fontSize: 13, marginTop: 16 }}>{message}</p>}
      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 24,
          padding: '14px 24px',
          background: '#2A4A2A',
          border: 'none',
          borderRadius: 6,
          color: '#E8E8EC',
          fontSize: 14,
          cursor: loading ? 'wait' : 'pointer',
        }}
      >
        {loading ? 'Please wait…' : mode === 'create-account' ? 'Create account' : 'Sign in'}
      </button>
    </form>
  );
}
