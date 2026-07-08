'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KeranjangPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('customer_cart') || '[]');
    setCartItems(cart);
    setLoading(false);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const cart = JSON.parse(localStorage.getItem('customer_cart') || '[]');
    const item = cart.find(item => item.id === id);
    if (item) {
      item.quantity = newQuantity;
      localStorage.setItem('customer_cart', JSON.stringify(cart));
      loadCart();
    }
  };

  const removeItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('customer_cart') || '[]');
    const newCart = cart.filter(item => item.id !== id);
    localStorage.setItem('customer_cart', JSON.stringify(newCart));
    loadCart();
  };

  const formatRupiah = (angka) => {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(angka);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.harga * item.quantity), 0);
  const shipping = subtotal > 0 ? 20000 : 0;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-orange" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="fa-solid fa-cart-shopping fa-3x text-muted mb-3 d-block"></i>
        <h5>Keranjang Belanja Kosong</h5>
        <p className="text-muted mb-4">Yuk, mulai belanja koleksi Blu-ray anime favoritmu!</p>
        <Link href="/katalog" className="admin-btn-primary">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Keranjang Belanja</h4>
        <p className="text-muted small">Review pesanan kamu sebelum checkout</p>
      </div>

      <div className="row g-4">
        {/* Daftar Produk */}
        <div className="col-lg-8">
          <div className="admin-table-wrapper">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="product-cell-cart">
                        <img src={item.gambar} alt={item.nama} className="cart-product-img" />
                        <div>
                          <h6 className="fw-semibold mb-1">{item.nama}</h6>
                          <span className="badge bg-secondary">{item.kategori}</span>
                        </div>
                       </td>
                      <td>{formatRupiah(item.harga)}</td>
                      <td>
                        <div className="quantity-cart">
                          <button 
                            className="quantity-btn-cart" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <span className="quantity-value-cart">{item.quantity}</span>
                          <button 
                            className="quantity-btn-cart" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="fw-bold text-orange">{formatRupiah(item.harga * item.quantity)}</td>
                      <td className="text-center">
                        <button className="cart-remove" onClick={() => removeItem(item.id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Ringkasan Belanja */}
        <div className="col-lg-4">
          <div className="cart-summary">
            <h5 className="fw-bold mb-3">Ringkasan Belanja</h5>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            
            <div className="summary-row">
              <span>Ongkos Kirim</span>
              <span>{formatRupiah(shipping)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-total">
              <span className="fw-bold">Total</span>
              <span className="fw-bold text-orange">{formatRupiah(total)}</span>
            </div>
            
            <Link href="/pembayaran" className="checkout-btn">
              Lanjut ke Pembayaran
            </Link>
            
            <Link href="/katalog" className="continue-shopping">
              <i className="fa-solid fa-arrow-left me-1"></i> Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}