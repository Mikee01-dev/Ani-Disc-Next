'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PembayaranPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    phone: '',
    alamat: '',
    kota: '',
    kodepos: '',
    kecamatan: '',
    metodeBayar: 'transfer',
    catatan: ''
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('customer_cart') || '[]');
    if (cart.length === 0) {
      router.push('/katalog');
    }
    setCartItems(cart);
    setLoading(false);
  }, [router]);

  const formatRupiah = (angka) => {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(angka);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.harga * (item.quantity || 1)), 0);
  const shipping = 20000;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.email || !formData.phone || !formData.alamat || !formData.kota) {
      alert('Lengkapi semua data wajib!');
      return;
    }

    const newTransaction = {
      id: '#INV-' + Date.now(),
      tanggal: new Date().toLocaleDateString('id-ID'),
      waktu: new Date().toLocaleTimeString('id-ID'),
      items: cartItems,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      metode: formData.metodeBayar === 'transfer' ? 'Transfer Bank' : 
              formData.metodeBayar === 'qris' ? 'QRIS' : 'COD',
      status: 'Menunggu Pembayaran',
      alamat: formData.alamat,
      kota: formData.kota
    };

    const transactions = JSON.parse(localStorage.getItem('customer_transactions') || '[]');
    transactions.push(newTransaction);
    localStorage.setItem('customer_transactions', JSON.stringify(transactions));
    localStorage.removeItem('customer_cart');
    
    alert('Pesanan berhasil dibuat!');
    router.push('/history');
  };

  const metodeList = [
    { value: 'transfer', label: 'Transfer Bank (BCA/Mandiri/BNI)', icon: 'fa-building-columns' },
    { value: 'qris', label: 'QRIS (Gopay/OVO/Dana)', icon: 'fa-qrcode' },
    { value: 'cod', label: 'Bayar di Tempat (COD)', icon: 'fa-money-bill-wave' },
  ];

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-orange"></div></div>;
  if (cartItems.length === 0) return null;

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Checkout</h4>
        <p className="text-muted small">Lengkapi data untuk menyelesaikan pesanan</p>
      </div>

      <div className="row g-4">
        {/* FORM - KIRI */}
        <div className="col-lg-7">
          <form onSubmit={handleSubmit}>
            {/* Data Diri */}
            <div className="checkout-card">
              <div className="checkout-card-header">
                <i className="fa-solid fa-user-circle"></i>
                <h5>Data Diri</h5>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Nama Lengkap <span className="text-danger">*</span></label>
                  <input type="text" name="nama" className="form-control" value={formData.nama} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Email <span className="text-danger">*</span></label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">No. WhatsApp <span className="text-danger">*</span></label>
                  <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Kode Pos</label>
                  <input type="text" name="kodepos" className="form-control" value={formData.kodepos} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            {/* Alamat */}
            <div className="checkout-card">
              <div className="checkout-card-header">
                <i className="fa-solid fa-location-dot"></i>
                <h5>Alamat Pengiriman</h5>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-bold">Alamat Lengkap <span className="text-danger">*</span></label>
                  <textarea name="alamat" rows="2" className="form-control" value={formData.alamat} onChange={handleInputChange} required></textarea>
                </div>
                <div className="col-md-8">
                  <label className="form-label small fw-bold">Kota <span className="text-danger">*</span></label>
                  <input type="text" name="kota" className="form-control" value={formData.kota} onChange={handleInputChange} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold">Kecamatan</label>
                  <input type="text" name="kecamatan" className="form-control" value={formData.kecamatan} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            {/* Metode Bayar */}
            <div className="checkout-card">
              <div className="checkout-card-header">
                <i className="fa-solid fa-credit-card"></i>
                <h5>Metode Pembayaran</h5>
              </div>
              <div className="metode-list">
                {metodeList.map((metode) => (
                  <label className="metode-item" key={metode.value}>
                    <input type="radio" name="metodeBayar" value={metode.value} checked={formData.metodeBayar === metode.value} onChange={handleInputChange} />
                    <div className="metode-content">
                      <i className={`fa-solid ${metode.icon}`}></i>
                      <span>{metode.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Catatan */}
            <div className="checkout-card">
              <div className="checkout-card-header">
                <i className="fa-solid fa-pen"></i>
                <h5>Catatan (Opsional)</h5>
              </div>
              <textarea name="catatan" rows="2" className="form-control" value={formData.catatan} onChange={handleInputChange} placeholder="Contoh: Tolong dibungkus bubble wrap"></textarea>
            </div>

            <button type="submit" className="checkout-btn-submit">
              <i className="fa-solid fa-check-circle me-2"></i> Buat Pesanan
            </button>
          </form>
        </div>

        {/* RINGKASAN - KANAN */}
        <div className="col-lg-5">
          <div className="order-summary">
            <h5 className="fw-bold mb-3">Ringkasan Pesanan</h5>
            <div className="order-items">
              {cartItems.map((item, idx) => (
                <div className="order-item" key={idx}>
                  <img src={item.gambar} alt={item.nama} className="order-item-img" />
                  <div className="order-item-info">
                    <div className="order-item-title">{item.nama}</div>
                    <div className="order-item-price">{formatRupiah(item.harga)} x {item.quantity || 1}</div>
                  </div>
                  <div className="order-item-subtotal">{formatRupiah((item.harga * (item.quantity || 1)))}</div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <div className="total-row"><span>Subtotal</span><span>{formatRupiah(subtotal)}</span></div>
              <div className="total-row"><span>Ongkos Kirim</span><span>{formatRupiah(shipping)}</span></div>
              <div className="total-divider"></div>
              <div className="total-row grand-total"><span>Total</span><span className="grand-total-price">{formatRupiah(total)}</span></div>
            </div>
            <Link href="/keranjang" className="back-to-cart"><i className="fa-solid fa-arrow-left me-1"></i> Kembali ke Keranjang</Link>
          </div>
        </div>
      </div>
    </div>
  );
}