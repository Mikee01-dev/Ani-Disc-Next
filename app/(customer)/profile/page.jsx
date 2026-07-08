'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    nama: 'Member AniDisc',
    email: 'member@anidisc.com',
    phone: '08123456789',
    joinDate: '2024',
  });

  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    const savedEmail = localStorage.getItem('user_email');
    if (savedName) setUser(prev => ({ ...prev, nama: savedName }));
    if (savedEmail) setUser(prev => ({ ...prev, email: savedEmail }));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('customer_cart');
    router.push('/login');
  };

  const menuItems = [
    { icon: 'fa-box', label: 'Pesanan Saya', href: '/history' },
    { icon: 'fa-headset', label: 'Bantuan', href: '/bantuan' },
    { icon: 'fa-gear', label: 'Pengaturan', href: '/pengaturan' },
  ];

  return (
    <div>

      <div className="row g-4">
        {/* Kartu Profil - Kiri */}
        <div className="col-md-4">
          <div className="profile-card">
            <div className="profile-avatar">{user.nama.charAt(0)}</div>
            <h5 className="fw-bold mt-3 mb-1">{user.nama}</h5>
            <p className="text-muted small mb-3">{user.email}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">12</span>
                <span className="stat-label">Pesanan</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-number">Member</span>
                <span className="stat-label">Status</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-number">{user.joinDate}</span>
                <span className="stat-label">Bergabung</span>
              </div>
            </div>
            <button className="profile-logout" onClick={handleLogout}>
              <i className="fa-solid fa-sign-out-alt me-2"></i> Keluar
            </button>
          </div>
        </div>

        {/* Menu - Kanan */}
        <div className="col-md-8">
          <div className="profile-menu">
            <h5 className="fw-bold mb-3">Menu Utama</h5>
            <div className="menu-grid">
              {menuItems.map((item, idx) => (
                <Link href={item.href} className="menu-item" key={idx}>
                  <div className="menu-icon">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="menu-content">
                    <span className="menu-label">{item.label}</span>
                  </div>
                  <i className="fa-solid fa-chevron-right menu-arrow"></i>
                </Link>
              ))}
            </div>
          </div>

          {/* Informasi Kontak */}
          <div className="profile-contact mt-4">
            <h5 className="fw-bold mb-3">Informasi Kontak</h5>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <span>{user.phone}</span>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}