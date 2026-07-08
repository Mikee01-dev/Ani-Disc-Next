'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DetailProdukPage() {
  const { id } = useParams();
  const router = useRouter();
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('deskripsi');

  // Data produk default
  const defaultProduk = [
    { id: 1, nama: 'Demon Slayer: Mugen Train', kategori: 'Blu-ray', genre: 'Action', harga: 850000, stok: 12, gambar: 'https://wallpaperaccess.com/full/6425112.png', deskripsi: 'Film anime terbaru dari serial Demon Slayer. Mengisahkan perjalanan Tanjiro dan Rengoku melawan demon di kereta Mugen.', spesifikasi: 'Durasi: 117 menit, Bahasa: Jepang, Subtitle: Indonesia, Inggris', rilis: '2020', studio: 'Ufotable' },
    { id: 2, nama: 'Jujutsu Kaisen 0', kategori: 'Blu-ray', genre: 'Action', harga: 650000, stok: 8, gambar: 'https://thfvnext.bing.com/th/id/OIP.GfIYfIJLM2pjEr07KL7_kAHaEK?w=316&h=180&c=7&r=0&o=7&cb=thfvnextfalcon&dpr=1.3&pid=1.7&rm=3', deskripsi: 'Movie prekuel dari serial Jujutsu Kaisen. Mengisahkan Yuta Okkotsu dan kutukan yang melekat padanya.', spesifikasi: 'Durasi: 105 menit, Bahasa: Jepang, Subtitle: Indonesia', rilis: '2021', studio: 'MAPPA' },
    { id: 3, nama: 'Weathering With You', kategori: 'Blu-ray', genre: 'Romance', harga: 450000, stok: 5, gambar: 'https://image.tmdb.org/t/p/original/jFK8BOPL6ZeWyjMVWX8ajsTTinp.jpg', deskripsi: 'Film anime dari Makoto Shinkai. Kisah tentang seorang bocah yang kabur ke Tokyo dan bertemu dengan seorang gadis yang bisa mengubah cuaca.', spesifikasi: 'Durasi: 112 menit, Bahasa: Jepang, Subtitle: Indonesia', rilis: '2019', studio: 'CoMix Wave' },
    { id: 4, nama: 'Evangelion 3.0+1.0', kategori: 'Box Set', genre: 'Sci-Fi', harga: 1200000, stok: 3, gambar: 'https://th.bing.com/th/id/R.5080573f4667a4824514638f0a63acfb?rik=GeVz4R27JXTqwQ&riu=http%3a%2f%2fwww.nipponsensor.net%2fwp-content%2fuploads%2f2023%2f12%2f20231207-eva-02_11zon-1529x860.jpg&ehk=ybDYW9bCcm85e1kESZ0e5Q%2bC2WhgI9XEYDBMfT6fJcY%3d&risl=&pid=ImgRaw&r=0', deskripsi: 'Film terakhir seri Evangelion. Penutupan epik dari kisah Shinji dan para pilot Eva.', spesifikasi: 'Durasi: 155 menit, Bahasa: Jepang, Subtitle: Indonesia, Inggris', rilis: '2021', studio: 'Khara' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('customer_produk');
    let produkData;
    
    if (saved) {
      produkData = JSON.parse(saved);
    } else {
      produkData = defaultProduk;
    }
    
    const found = produkData.find(p => p.id === parseInt(id));
    setProduk(found);
    setLoading(false);
  }, [id]);

  const formatRupiah = (angka) => {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(angka);
  };

  const handleQuantityChange = (type) => {
    if (type === 'plus' && quantity < (produk?.stok || 0)) {
      setQuantity(quantity + 1);
    } else if (type === 'minus' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    if (produk) {
      const cart = JSON.parse(localStorage.getItem('customer_cart') || '[]');
      const existing = cart.find(item => item.id === produk.id);
      
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ ...produk, quantity });
      }
      
      localStorage.setItem('customer_cart', JSON.stringify(cart));
      alert(`${produk.nama} ditambahkan ke keranjang!`);
    }
  };

  const buyNow = () => {
    addToCart();
    router.push('/keranjang');
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-orange" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!produk) {
    return (
      <div className="text-center py-5">
        <i className="fa-solid fa-circle-exclamation fa-3x text-muted mb-3 d-block"></i>
        <h5>Produk tidak ditemukan</h5>
        <Link href="/katalog" className="btn-primary-orange mt-3 d-inline-block">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/beranda" className="text-decoration-none">Beranda</Link></li>
          <li className="breadcrumb-item"><Link href="/katalog" className="text-decoration-none">Katalog</Link></li>
          <li className="breadcrumb-item active text-muted">{produk.nama}</li>
        </ol>
      </nav>

      {/* Product Detail */}
      <div className="row g-5">
        {/* Gambar Produk */}
        <div className="col-md-5">
          <div className="detail-image-wrapper">
            <img src={produk.gambar} alt={produk.nama} className="detail-image" />
          </div>
        </div>

        {/* Info Produk */}
        <div className="col-md-7">
          <div className="mb-3">
            <span className="badge bg-secondary me-2">{produk.kategori}</span>
            <span className="badge bg-info">{produk.genre}</span>
          </div>
          
          <h1 className="fw-bold text-dark mb-3">{produk.nama}</h1>
          
          <div className="mb-3">
            <span className="text-muted text-decoration-line-through me-2"></span>
            <span className="detail-price">{formatRupiah(produk.harga)}</span>
          </div>
          
          <div className="mb-3">
            <span className={`badge ${produk.stok > 0 ? 'bg-success' : 'bg-danger'} px-3 py-2`}>
              {produk.stok > 0 ? `Stok Tersedia (${produk.stok})` : 'Stok Habis'}
            </span>
          </div>

          {/* Quantity */}
          {produk.stok > 0 && (
            <div className="mb-4">
              <label className="form-label fw-semibold">Jumlah</label>
              <div className="d-flex align-items-center gap-3">
                <div className="quantity-wrapper">
                  <button className="quantity-btn" onClick={() => handleQuantityChange('minus')} disabled={quantity <= 1}>
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button className="quantity-btn" onClick={() => handleQuantityChange('plus')} disabled={quantity >= produk.stok}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <span className="text-muted small">Maksimal {produk.stok} item</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-flex gap-3 mb-4">
            <button className="btn-cart" onClick={addToCart} disabled={produk.stok === 0}>
              <i className="fa-solid fa-cart-plus me-2"></i> Tambah ke Keranjang
            </button>
            <button className="btn-buy" onClick={buyNow} disabled={produk.stok === 0}>
              Beli Sekarang
            </button>
          </div>

          {/* Info Tambahan */}
          <div className="detail-info">
            <div className="row g-3">
              <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                  <i className="fa-solid fa-truck fa-fw text-orange"></i>
                  <span className="small">Pengiriman seluruh Indonesia</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                  <i className="fa-solid fa-shield-alt fa-fw text-orange"></i>
                  <span className="small">Garansi 100% Original</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                  <i className="fa-solid fa-credit-card fa-fw text-orange"></i>
                  <span className="small">Bayar di tempat (COD)</span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center gap-2">
                  <i className="fa-solid fa-undo-alt fa-fw text-orange"></i>
                  <span className="small">Retur 7 hari</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="detail-tabs mt-5">
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'deskripsi' ? 'active' : ''}`}
            onClick={() => setActiveTab('deskripsi')}
          >
            Deskripsi
          </button>
          <button 
            className={`tab-btn ${activeTab === 'spesifikasi' ? 'active' : ''}`}
            onClick={() => setActiveTab('spesifikasi')}
          >
            Spesifikasi
          </button>
          <button 
            className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Info Tambahan
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'deskripsi' && (
            <p className="text-muted">{produk.deskripsi || 'Deskripsi produk belum tersedia.'}</p>
          )}
          {activeTab === 'spesifikasi' && (
            <div className="specs-list">
              <p><strong>Studio:</strong> {produk.studio || '-'}</p>
              <p><strong>Tahun Rilis:</strong> {produk.rilis || '-'}</p>
              <p><strong>Genre:</strong> {produk.genre}</p>
              <p><strong>Format:</strong> {produk.kategori}</p>
              <p><strong>Durasi:</strong> {produk.spesifikasi || '-'}</p>
            </div>
          )}
          {activeTab === 'info' && (
            <div className="info-list">
              <p><strong>Berat:</strong> 200 gram</p>
              <p><strong>Dimensi:</strong> 13.5 x 17 x 1.5 cm</p>
              <p><strong>SKU:</strong> {produk.sku || `ANIDISC-${produk.id}`}</p>
              <p><strong>Kategori:</strong> {produk.kategori}</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .detail-image-wrapper {
          background-color: #f8fafc;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          border: 1px solid #e2e8f0;
        }
        .detail-image {
          max-width: 100%;
          max-height: 400px;
          object-fit: contain;
        }
        .detail-price {
          font-size: 28px;
          font-weight: 700;
          color: #ff5500;
        }
        .quantity-wrapper {
          display: flex;
          align-items: center;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        .quantity-btn {
          width: 36px;
          height: 36px;
          background: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .quantity-btn:hover:not(:disabled) {
          background-color: #ff5500;
          color: white;
        }
        .quantity-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .quantity-value {
          width: 50px;
          text-align: center;
          font-weight: 600;
        }
        .btn-cart, .btn-buy {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }
        .btn-cart {
          background-color: transparent;
          border: 2px solid #ff5500;
          color: #ff5500;
          flex: 1;
        }
        .btn-cart:hover:not(:disabled) {
          background-color: #ff5500;
          color: white;
          transform: translateY(-1px);
        }
        .btn-buy {
          background-color: #ff5500;
          color: white;
          flex: 1;
        }
        .btn-buy:hover:not(:disabled) {
          background-color: #d14400;
          transform: translateY(-1px);
        }
        .btn-cart:disabled, .btn-buy:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .detail-info {
          background-color: #f8fafc;
          padding: 16px;
          border-radius: 12px;
          margin-top: 16px;
        }
        .text-orange {
          color: #ff5500;
        }
        .detail-tabs {
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        .tab-buttons {
          display: flex;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }
        .tab-btn {
          padding: 12px 24px;
          background: transparent;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          color: #64748b;
        }
        .tab-btn.active {
          color: #ff5500;
          border-bottom: 2px solid #ff5500;
        }
        .tab-content {
          padding: 24px;
        }
        .specs-list p, .info-list p {
          margin-bottom: 12px;
        }
        @media (max-width: 768px) {
          .detail-price {
            font-size: 24px;
          }
          .btn-cart, .btn-buy {
            padding: 10px 16px;
            font-size: 13px;
          }
          .tab-btn {
            padding: 10px 16px;
            font-size: 13px;
          }
          .tab-content {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}