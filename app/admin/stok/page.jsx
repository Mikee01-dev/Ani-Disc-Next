'use client';

import { useState, useEffect } from 'react';

export default function StokPage() {
  const [stokList, setStokList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [tambahStok, setTambahStok] = useState('');

  // Data default - ambil dari produk
  const defaultProduk = [
    { id: 1, nama: 'Weathering With You', sku: 'WWY-BR-01', kategori: 'Blu-ray', genre: 'Romance', stok: 5, gambar: 'https://thfvnext.bing.com/th/id/OIP.OQiepGbFN2de_wzCu1i26gHaK3?w=115&h=180&c=7&r=0&o=7&cb=thfvnextfalcon&dpr=1.3&pid=1.7&rm=3' },
    { id: 2, nama: 'Demon Slayer: Mugen Train', sku: 'DST-BR-01', kategori: 'Blu-ray', genre: 'Action', stok: 12, gambar: 'https://wallpaperaccess.com/full/6425112.png' },
    { id: 3, nama: 'Jujutsu Kaisen 0', sku: 'JK0-BR-01', kategori: 'Blu-ray', genre: 'Action', stok: 8, gambar: 'https://thfvnext.bing.com/th/id/OIP.GfIYfIJLM2pjEr07KL7_kAHaEK?w=316&h=180&c=7&r=0&o=7&cb=thfvnextfalcon&dpr=1.3&pid=1.7&rm=3' },
    { id: 4, nama: 'Evangelion 3.0+1.0', sku: 'EVA-BR-01', kategori: 'Box Set', genre: 'Sci-Fi', stok: 3, gambar: 'https://th.bing.com/th/id/R.5080573f4667a4824514638f0a63acfb?rik=GeVz4R27JXTqwQ&riu=http%3a%2f%2fwww.nipponsensor.net%2fwp-content%2fuploads%2f2023%2f12%2f20231207-eva-02_11zon-1529x860.jpg&ehk=ybDYW9bCcm85e1kESZ0e5Q%2bC2WhgI9XEYDBMfT6fJcY%3d&risl=&pid=ImgRaw&r=0' }
  ];

  // Load data dari localStorage atau produk
  useEffect(() => {
    const savedProduk = localStorage.getItem('admin_produk');
    if (savedProduk) {
      const produk = JSON.parse(savedProduk);
      const stokData = produk.map(p => ({
        id: p.id,
        nama: p.nama,
        sku: p.sku || `SKU-${p.id}`,
        kategori: p.kategori,
        genre: p.genre,
        stok: p.stok || 0,
        gambar: p.gambar
      }));
      setStokList(stokData);
    } else {
      setStokList(defaultProduk);
    }
  }, []);

  // Filter data
  const filteredStok = stokList.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === '' || 
      (filterStatus === 'menipis' ? item.stok < 10 : item.stok >= 10);
    return matchSearch && matchStatus;
  });

  const openRestock = (index) => {
    setSelectedIndex(index);
    setTambahStok('');
    setShowModal(true);
  };

  const prosesRestock = () => {
    const jumlah = parseInt(tambahStok);
    if (jumlah > 0 && selectedIndex !== null) {
      const newList = [...stokList];
      newList[selectedIndex].stok += jumlah;
      setStokList(newList);
      
      // Update juga ke produk
      const savedProduk = localStorage.getItem('admin_produk');
      if (savedProduk) {
        const produk = JSON.parse(savedProduk);
        const produkIndex = produk.findIndex(p => p.id === newList[selectedIndex].id);
        if (produkIndex !== -1) {
          produk[produkIndex].stok = newList[selectedIndex].stok;
          localStorage.setItem('admin_produk', JSON.stringify(produk));
        }
      }
      setShowModal(false);
    } else {
      alert('Masukkan jumlah yang valid!');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Kontrol Stok</h4>
          <p className="text-muted small mb-0">Monitor sisa unit Blu-ray/DVD di gudang AniDisc.</p>
        </div>
      </div>

      {/* Filter */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-8">
          <input
            type="text"
            className="form-control"
            placeholder="Cari nama anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Semua Status Stok</option>
            <option value="menipis">Stok Menipis (&lt; 10)</option>
            <option value="aman">Aman / Stabil (≥ 10)</option>
          </select>
        </div>
      </div>

      {/* Tabel Stok */}
      <div className="admin-table-wrapper">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>SKU</th>
                <th>Kategori</th>
                <th>Jumlah Stok</th>
                <th>Status</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredStok.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    <i className="fa-solid fa-box-open fa-2x mb-2 d-block"></i>
                    Tidak ada data stok
                  </td>
                </tr>
              ) : (
                filteredStok.map((item, idx) => {
                  const isLow = item.stok < 10;
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img 
                            src={item.gambar || 'https://via.placeholder.com/40'} 
                            alt={item.nama} 
                            style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} 
                          />
                          <span className="fw-semibold">{item.nama}</span>
                        </div>
                      </td>
                      <td className="font-monospace text-muted">{item.sku}</td>
                      <td><span className="badge bg-secondary px-3 py-2">{item.kategori}</span></td>
                      <td className={`fw-bold ${isLow ? 'text-danger' : 'text-success'}`}>{item.stok} pcs</td>
                      <td>
                        <span className={`badge ${isLow ? 'bg-danger' : 'bg-success'} px-3 py-2`}>
                          {isLow ? 'Stok Menipis' : 'Aman'}
                        </span>
                      </td>
                      <td className="text-center">
                        <button className="admin-btn-primary" onClick={() => openRestock(idx)}>
                          <i className="fa-solid fa-boxes-stacking me-1"></i> Restock
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Restock */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h5 className="admin-modal-title">Tambah Stok</h5>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="admin-modal-body">
              <div className="mb-3">
                <label className="admin-form-label">Jumlah Tambahan</label>
                <input 
                  type="number" 
                  className="admin-form-control" 
                  value={tambahStok} 
                  onChange={(e) => setTambahStok(e.target.value)} 
                  placeholder="Contoh: 10"
                />
                <small className="text-muted">Masukkan jumlah stok yang akan ditambahkan</small>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn-outline" onClick={() => setShowModal(false)}>Batal</button>
              <button className="admin-btn-primary" onClick={prosesRestock}>Konfirmasi Tambah</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}