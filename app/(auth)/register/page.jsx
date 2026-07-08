'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && password && terms) {
      router.push('/login');
    }
  };

  return (
    <div className="register-container">
      {/* Sisi Visual - Kiri */}
      <div className="register-visual-side">
        <span className="badge-register">Daftar Member</span>
        <h2 className="register-title">Mulai <span style={{ color: '#FF5500' }}>Koleksi</span> Pertamamu</h2>
        <p className="register-text">
          Dapatkan akses penuh ke katalog Blu-ray original, kumpulkan poin belanja, 
          dan nikmati diskon member eksklusif di setiap rilis pre-order Jepang.
        </p>
      </div>

      {/* Sisi Form - Kanan */}
      <div className="register-form-side">
        <div className="register-box">
          <div className="register-header">
            <Link href="/" className="logo-brand">
              <span className="logo-ani">Ani</span><span className="logo-disc">Disc</span>
            </Link>
            <h5 className="register-welcome">Registrasi Akun Baru</h5>
            <p className="register-subtitle">Lengkapi data di bawah ini untuk bergabung.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="register-input"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                className="register-input"
                placeholder="Email Aktif"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="tel"
                className="register-input"
                placeholder="Nomor WhatsApp"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                className="register-input"
                placeholder="Buat Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="checkbox-custom"
                required
              />
              Saya menyetujui{' '}
              <Link href="#" className="terms-link">
                Syarat & Ketentuan
              </Link>{' '}
              yang berlaku.
            </label>

            <button
              type="submit"
              className="register-button"
              style={{
                opacity: terms ? 1 : 0.6,
                cursor: terms ? 'pointer' : 'not-allowed',
              }}
              disabled={!terms}
            >
              Daftar Sekarang
            </button>

            <div className="register-footer">
              <span style={{ color: '#666' }}>Sudah punya akun?</span>
              <Link href="/login" className="login-link">
                Sign In di sini
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}