'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      if (email === 'admin@anidisc.com') {
        router.push('/admin/dashboard');
      } else {
        router.push('/beranda');
      }
    }
  };

  return (
    <div className="login-container">
      {/* Sisi Visual - Kiri */}
      <div className="login-visual-side">
        <span className="badge-login">Edisi Kolektor</span>
        <h2 className="login-title">Rasakan Sensasi <span style={{ color: '#FF5500' }}>Audio Visual</span> Murni</h2>
        <p className="login-text">
          Masuk ke akunmu untuk melanjutkan pelacakan transaksi, mengelola data inventori, 
          atau berdiskusi di artikel komunitas terbaru kami.
        </p>
      </div>

      {/* Sisi Form - Kanan */}
      <div className="login-form-side">
        <div className="login-box">
          <div className="login-header">
            <Link href="/" className="logo-brand">
              <span className="logo-ani">Ani</span><span className="logo-disc">Disc</span>
            </Link>
            <h5 className="login-welcome">Selamat Datang Kembali</h5>
            <p className="login-subtitle">Silakan masukkan detail akun terdaftar kamu.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                className="login-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="checkbox-custom"
                />
                Ingat saya
              </label>
              <Link href="/forgot-password" className="forgot-link">
                Lupa Password?
              </Link>
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>

            {/* Quick Demo Box */}
            <div className="demo-box">
              <span className="demo-title">⚡ Quick Demo Access</span>
              <div className="demo-buttons">
                <button
                  type="button"
                  className="demo-btn-outline"
                  onClick={() => {
                    setEmail('user@anidisc.com');
                    setPassword('user123');
                  }}
                >
                  Sebagai Member
                </button>
                <button
                  type="button"
                  className="demo-btn-dark"
                  onClick={() => {
                    setEmail('admin@anidisc.com');
                    setPassword('admin123');
                  }}
                >
                  Sebagai Admin
                </button>
              </div>
              <p className="demo-note">Klik untuk auto-fill</p>
            </div>

            <div className="login-footer">
              <span style={{ color: '#666' }}>Belum terdaftar?</span>
              <Link href="/register" className="register-link">
                Buat Akun Baru
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}