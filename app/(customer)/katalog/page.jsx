'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function KatalogPage() {
  const [produkList, setProdukList] = useState([]);
  const [filteredProduk, setFilteredProduk] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterFormat, setFilterFormat] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Data produk default
  const defaultProduk = [
    { id: 1, nama: 'Demon Slayer: Mugen Train', kategori: 'Blu-ray', genre: 'Action', harga: 850000, stok: 12, gambar: 'https://wallpaperaccess.com/full/6425112.png' },
    { id: 2, nama: 'Jujutsu Kaisen 0', kategori: 'Blu-ray', genre: 'Action', harga: 650000, stok: 8, gambar: 'https://thfvnext.bing.com/th/id/OIP.GfIYfIJLM2pjEr07KL7_kAHaEK?w=316&h=180&c=7&r=0&o=7&cb=thfvnextfalcon&dpr=1.3&pid=1.7&rm=3' },
    { id: 3, nama: 'Weathering With You', kategori: 'Blu-ray', genre: 'Romance', harga: 450000, stok: 5, gambar: 'https://image.tmdb.org/t/p/original/jFK8BOPL6ZeWyjMVWX8ajsTTinp.jpg' },
    { id: 4, nama: 'Evangelion 3.0+1.0', kategori: 'Box Set', genre: 'Sci-Fi', harga: 1200000, stok: 3, gambar: 'https://th.bing.com/th/id/R.5080573f4667a4824514638f0a63acfb?rik=GeVz4R27JXTqwQ&riu=http%3a%2f%2fwww.nipponsensor.net%2fwp-content%2fuploads%2f2023%2f12%2f20231207-eva-02_11zon-1529x860.jpg&ehk=ybDYW9bCcm85e1kESZ0e5Q%2bC2WhgI9XEYDBMfT6fJcY%3d&risl=&pid=ImgRaw&r=0' },
    { id: 5, nama: 'Spy x Family Season 1', kategori: 'DVD', genre: 'Comedy', harga: 350000, stok: 15, gambar: 'https://i.pinimg.com/736x/ad/c7/bc/adc7bc7c35cd5b7f40b1216da338d90b.jpg' },
    { id: 6, nama: 'Attack on Titan Final Season', kategori: 'Blu-ray', genre: 'Action', harga: 950000, stok: 7, gambar: 'https://wallpapercat.com/w/full/1/7/0/25940-3840x2160-desktop-4k-attack-on-titan-the-final-season-wallpaper-image.jpg' },
    { id: 7, nama: 'Your Name', kategori: 'Blu-ray', genre: 'Romance', harga: 500000, stok: 10, gambar: 'https://wallpapercave.com/wp/wp1892093.png' },
    { id: 8, nama: 'One Piece Film Red', kategori: 'DVD', genre: 'Action', harga: 400000, stok: 20, gambar: 'https://assets-prd.ignimgs.com/2022/11/02/one-piece-film-red-2-1663018832453-1667427907753.jpg' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('customer_produk');
    if (saved) {
      setProdukList(JSON.parse(saved));
    } else {
      setProdukList(defaultProduk);
    }
  }, []);

  useEffect(() => {
    let filtered = [...produkList];
    
    if (searchQuery) {
      filtered = filtered.filter(p => p.nama.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (filterGenre) {
      filtered = filtered.filter(p => p.genre === filterGenre);
    }
    if (filterFormat) {
      filtered = filtered.filter(p => p.kategori === filterFormat);
    }
    if (sortBy === 'termurah') {
      filtered.sort((a, b) => a.harga - b.harga);
    } else if (sortBy === 'termahal') {
      filtered.sort((a, b) => b.harga - a.harga);
    } else if (sortBy === 'terbaru') {
      filtered.sort((a, b) => b.id - a.id);
    }
    
    setFilteredProduk(filtered);
  }, [searchQuery, filterGenre, filterFormat, sortBy, produkList]);

  const formatRupiah = (angka) => {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(angka);
  };

  const genreList = ['Action', 'Romance', 'Comedy', 'Sci-Fi', 'Fantasy'];
  const formatList = ['Blu-ray', 'DVD', 'Box Set'];

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Katalog Produk</h4>
        <p className="text-muted small">Temukan koleksi Blu-ray dan DVD anime favoritmu</p>
      </div>

      {/* Filter Bar */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
          >
            <option value="">Semua Genre</option>
            {genreList.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={filterFormat}
            onChange={(e) => setFilterFormat(e.target.value)}
          >
            <option value="">Semua Format</option>
            {formatList.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div className="col-12 col-md-2">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Urutkan</option>
            <option value="termurah">Termurah</option>
            <option value="termahal">Termahal</option>
            <option value="terbaru">Terbaru</option>
          </select>
        </div>
      </div>

      {/* Result Info */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <p className="text-muted small mb-0">Menampilkan {filteredProduk.length} produk</p>
        {(searchQuery || filterGenre || filterFormat || sortBy) && (
          <button 
            className="admin-btn-outline"
            onClick={() => {
              setSearchQuery('');
              setFilterGenre('');
              setFilterFormat('');
              setSortBy('');
            }}
          >
            <i className="fa-solid fa-times me-1"></i> Reset Filter
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProduk.length === 0 ? (
        <div className="text-center py-5">
          <i className="fa-solid fa-box-open fa-3x text-muted mb-3 d-block"></i>
          <p className="text-muted">Tidak ada produk yang ditemukan</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProduk.map((produk) => (
            <div className="col-6 col-md-4 col-lg-3" key={produk.id}>
              <div className="product-card-premium">
                <div className="product-img-wrapper">
                  <img src={produk.gambar} alt={produk.nama} loading="lazy" />
                </div>
                <div className="product-info-premium">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-secondary px-2 py-1">{produk.kategori}</span>
                    <span className={`small ${produk.stok < 5 ? 'text-danger' : 'text-success'}`}>
                      {produk.stok < 5 ? 'Stok Terbatas' : 'Tersedia'}
                    </span>
                  </div>
                  <h5 className="product-title-premium">{produk.nama}</h5>
                  <p className="product-price-premium">{formatRupiah(produk.harga)}</p>
                  <Link href={`/produk/${produk.id}`} className="btn-detail-premium">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}