'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CustomerLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('customer_cart') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };
    
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  const navLinks = [
    { href: '/beranda', label: 'Beranda' },
    { href: '/katalog', label: 'Katalog' },
    { href: '/artikel-cms', label: 'Blog' },
    { href: '/keranjang', label: 'Keranjang', icon: 'fa-cart-shopping', badge: cartCount },
    { href: '/profile', label: 'Profile', icon: 'fa-user' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      <nav className={`navbar navbar-expand-lg sticky-top navbar-custom ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <Link href="/beranda" className="logo-brand">
            <span className="logo-ani">Ani</span><span className="logo-disc">Disc</span>
          </Link>

          <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCustomer">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCustomer">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {navLinks.map((link) => (
                <li className="nav-item position-relative" key={link.href}>
                  <Link className={`nav-link ${isActive(link.href) ? 'active' : ''}`} href={link.href}>
                    {link.icon && <i className={`fa-solid ${link.icon} me-1`}></i>}
                    {link.label}
                    {link.badge > 0 && (
                      <span className="cart-badge-nav">{link.badge > 9 ? '9+' : link.badge}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className="admin-page-content">{children}</main>

      <footer className="admin-footer-bar">
        <div className="container text-center">
          <p className="mb-0">&copy; 2026 <strong>AniDisc</strong>. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}