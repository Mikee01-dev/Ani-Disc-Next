'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="forgot-container">
      {/* Sisi Visual - Kiri */}
      <div className="forgot-visual-side">
        <span className="badge-forgot">Keamanan Akun</span>
        <h2 className="forgot-title">Perlindungan <span style={{ color: '#FF5500' }}>Data Akun</span></h2>
        <p className="forgot-text">
          Kami berkomitmen menjaga keamanan data transaksi dan privasi akunmu 
          menggunakan enkripsi standar industri terpercaya.
        </p>
      </div>

      {/* Sisi Form - Kanan */}
      <div className="forgot-form-side">
        <div className="forgot-box">
          <div className="back-link">
            <Link href="/login">
              ← Kembali ke Login
            </Link>
          </div>

          {!submitted ? (
            <>
              <div className="forgot-header">
                <h5 className="forgot-welcome">Lupa Password?</h5>
                <p className="forgot-subtitle">
                  Masukkan alamat email yang terdaftar pada akunmu. Kami akan mengirimkan 
                  tautan untuk mengatur ulang password.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    className="forgot-input"
                    placeholder="Email Terdaftar"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="forgot-button">
                  Kirim Link Pemulihan
                </button>
              </form>
            </>
          ) : (
            <div className="success-box">
              <div className="success-icon">
                <i className="fa-solid fa-envelope-circle-check"></i>
              </div>
              <h5 className="success-title">Cek Email Kamu</h5>
              <p className="success-text">
                Kami telah mengirimkan link pemulihan ke <strong>{email}</strong>
              </p>
              <Link href="/login" className="success-button">
                Kembali ke Login
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .success-box {
          text-align: center;
        }
        .success-icon {
          font-size: 48px;
          color: #FF5500;
          margin-bottom: 20px;
        }
        .success-title {
          font-weight: bold;
          font-size: 20px;
          margin-bottom: 12px;
          color: #121212;
        }
        .success-text {
          color: #666;
          font-size: 14px;
          margin-bottom: 24px;
        }
        .success-button {
          display: block;
          width: 100%;
          padding: 12px;
          background-color: #FF5500;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          text-decoration: none;
          text-align: center;
          transition: all 0.3s ease;
        }
        .success-button:hover {
          background-color: #D14400;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}