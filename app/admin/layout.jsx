'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuGroups = [
    {
      category: 'UTAMA',
      items: [
        { href: '/admin/dashboard', icon: 'fa-chart-pie', label: 'Ringkasan Panel' },
      ]
    },
    {
      category: 'MASTER DATA (CRUD)',
      items: [
        { href: '/admin/user', icon: 'fa-users', label: 'Manajemen User' },
        { href: '/admin/produk', icon: 'fa-compact-disc', label: 'Master Produk' },
      ]
    },
    {
      category: 'STOK & ARUS DATA',
      items: [
        { href: '/admin/stok', icon: 'fa-boxes-stacked', label: 'Kontrol Stok' },
      ]
    },
    {
      category: 'TRANSAKSI & PESANAN',
      items: [
        { href: '/admin/transaksi', icon: 'fa-receipt', label: 'Kelola Transaksi' },
        { href: '/admin/pesanan', icon: 'fa-truck', label: 'Kelola Pesanan' },
      ]
    },
    {
      category: 'KONTEN',
      items: [
        { href: '/admin/artikel', icon: 'fa-newspaper', label: 'Kelola Artikel' },
      ]
    },
  ];

  const isActive = (href) => pathname === href;

  const handleLinkClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-inner">
          <div className="admin-logo-wrapper">
            <Link href="/admin/dashboard" className="admin-logo">
              <span className="logo-ani">Ani</span><span className="logo-disc">Disc</span>
              <span className="admin-logo-badge">ADMIN</span>
            </Link>
          </div>

          <nav className="admin-nav-wrapper">
            {menuGroups.map((group, idx) => (
              <div key={idx} className="admin-nav-group">
                <div className="admin-nav-category">{group.category}</div>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`admin-nav-item ${isActive(item.href) ? 'active' : ''}`}
                    onClick={handleLinkClick}
                  >
                    <i className={`fa-solid ${item.icon}`}></i>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          <div className="admin-nav-bottom">
            <Link href="/" className="admin-nav-item">
              <i className="fa-solid fa-arrow-left"></i>
              <span>Kembali ke Website</span>
            </Link>
            <Link href="/login" className="admin-nav-item">
              <i className="fa-solid fa-sign-out-alt"></i>
              <span>Keluar Panel</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* OVERLAY mobile */}
      {isMobile && sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MAIN CONTENT */}
      <div className="admin-main-area">
        <header className="admin-top-bar">
          <div className="admin-top-bar-left">
            <button className="admin-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <i className="fa-solid fa-bars"></i>
            </button>
            <div className="admin-mobile-logo">
              <Link href="/admin/dashboard">
                <span className="logo-ani">Ani</span><span className="logo-disc">Disc</span>
              </Link>
            </div>
          </div>

          <div className="admin-top-bar-right">
            <div className="admin-user-profile">
              <div className="admin-user-text">
                <div className="admin-user-name">Mike Admin</div>
                <div className="admin-user-status">Administrator</div>
              </div>
              <div className="admin-user-avatar">MA</div>
            </div>
          </div>
        </header>

        <main className="admin-page-content">{children}</main>

        <footer className="admin-footer-bar">
          <p>&copy; 2026 AniDisc Admin Panel. UAS Workshop Desain Antarmuka Pengguna.</p>
        </footer>
      </div>
    </div>
  );
}