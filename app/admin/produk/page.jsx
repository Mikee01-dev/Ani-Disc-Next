'use client';

import { useState, useEffect } from 'react';

export default function ProdukPage() {
  const [produkList, setProdukList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    kategori: 'Blu-ray',
    genre: 'Action',
    harga: '',
    stok: '',
    gambar: ''
  });
  const [previewImage, setPreviewImage] = useState('');

  // Data default
  const defaultProduk = [
    { 
      id: 1, 
      nama: 'Weathering With You (Blu-ray)', 
      kategori: 'Blu-ray', 
      genre: 'Romance', 
      harga: 450000, 
      stok: 5, 
      gambar: 'https://thfvnext.bing.com/th/id/OIP.OQiepGbFN2de_wzCu1i26gHaK3?w=115&h=180&c=7&r=0&o=7&cb=thfvnextfalcon&dpr=1.3&pid=1.7&rm=3' 
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('admin_produk');
    if (saved) {
      setProdukList(JSON.parse(saved));
    } else {
      setProdukList(defaultProduk);
      localStorage.setItem('admin_produk', JSON.stringify(defaultProduk));
    }
  }, []);

  const filteredProduk = produkList.filter(p => {
    const matchSearch = p.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGenre = filterGenre === '' || p.genre === filterGenre;
    return matchSearch && matchGenre;
  });

  const formatRupiah = (angka) => {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(angka);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, gambar: reader.result });
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openTambah = () => {
    setEditIndex(null);
    setFormData({ nama: '', kategori: 'Blu-ray', genre: 'Action', harga: '', stok: '', gambar: '' });
    setPreviewImage('');
    setShowModal(true);
  };

  const openEdit = (index) => {
    setEditIndex(index);
    setFormData(produkList[index]);
    setPreviewImage(produkList[index].gambar);
    setShowModal(true);
  };

  const simpan = () => {
    if (!formData.nama) {
      alert('Nama produk wajib diisi!');
      return;
    }
    if (!formData.harga) {
      alert('Harga wajib diisi!');
      return;
    }
    if (!formData.gambar) {
      alert('Gambar wajib diisi!');
      return;
    }

    const newList = [...produkList];
    const newId = editIndex !== null ? produkList[editIndex].id : Date.now();
    const newData = { 
      ...formData, 
      id: newId, 
      harga: parseInt(formData.harga), 
      stok: parseInt(formData.stok) || 0 
    };
    
    if (editIndex !== null) {
      newList[editIndex] = newData;
    } else {
      newList.push(newData);
    }
    
    setProdukList(newList);
    localStorage.setItem('admin_produk', JSON.stringify(newList));
    setShowModal(false);
  };

  const hapus = (index) => {
    if (confirm('Yakin hapus produk ini?')) {
      const newList = produkList.filter((_, i) => i !== index);
      setProdukList(newList);
      localStorage.setItem('admin_produk', JSON.stringify(newList));
    }
  };

  const genreList = ['Action', 'Romance', 'Comedy', 'Fantasy', 'Sci-Fi', 'Drama'];

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Master Produk</h4>
          <p className="text-muted small mb-0">Kelola katalog produk Blu-ray & DVD anime.</p>
        </div>
        <button className="admin-btn-primary" onClick={openTambah}>
          <i className="fa-solid fa-plus me-1"></i> Tambah Produk
        </button>
      </div>

      {/* Filter */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <select
            className="form-select"
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
          >
            <option value="">Semua Genre</option>
            {genreList.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {/* Tabel Produk */}
      <div className="admin-table-wrapper">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Genre</th>
                <th>Format</th>
                <th>Harga</th>
                <th>Stok</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProduk.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    <i className="fa-solid fa-inbox fa-2x mb-2 d-block"></i>
                    Tidak ada data produk
                  </td>
                </tr>
              ) : (
                filteredProduk.map((p, idx) => (
                  <tr key={p.id}>
                    <td className="product-cell">
                      <img 
                        src={p.gambar} 
                        alt={p.nama} 
                        className="admin-product-img"
                      />
                      <span className="fw-semibold">{p.nama}</span>
                    </td>
                    <td><span className="badge bg-secondary px-3 py-2">{p.genre}</span></td>
                    <td>{p.kategori}</td>
                    <td className="fw-bold text-orange">{formatRupiah(p.harga)}</td>
                    <td className={p.stok < 5 ? 'text-danger fw-bold' : ''}>{p.stok} pcs</td>
                    <td className="text-center">
                      <button className="admin-btn-outline me-1" onClick={() => openEdit(idx)}>
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button className="admin-btn-danger" onClick={() => hapus(idx)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL - PAKAI CLASS CUSTOM (SAMA SEPERTI STOK, TRANSAKSI, USER) */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h5 className="admin-modal-title">{editIndex !== null ? 'Edit Produk' : 'Tambah Produk Baru'}</h5>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="admin-modal-body">
              {/* Upload Gambar */}
              <div className="text-center mb-3">
                <div className="mb-2">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="admin-modal-preview"
                    />
                  ) : (
                    <div className="admin-modal-preview-placeholder">
                      <i className="fa-solid fa-image text-muted fs-1"></i>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  className="admin-form-control" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
                <small className="text-muted">Klik untuk upload gambar</small>
              </div>

              {/* Form fields */}
              <div className="mb-3">
                <label className="admin-form-label">Nama Produk <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={formData.nama} 
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })} 
                  placeholder="Contoh: Weathering With You"
                />
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label className="admin-form-label">Format</label>
                  <select 
                    className="admin-form-control" 
                    value={formData.kategori} 
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  >
                    <option>Blu-ray</option>
                    <option>DVD</option>
                    <option>Box Set</option>
                  </select>
                </div>
                <div className="col-6 mb-3">
                  <label className="admin-form-label">Genre</label>
                  <select 
                    className="admin-form-control" 
                    value={formData.genre} 
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  >
                    {genreList.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label className="admin-form-label">Harga (Rp) <span className="text-danger">*</span></label>
                  <input 
                    type="number" 
                    className="admin-form-control" 
                    value={formData.harga} 
                    onChange={(e) => setFormData({ ...formData, harga: e.target.value })} 
                    placeholder="450000"
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="admin-form-label">Stok</label>
                  <input 
                    type="number" 
                    className="admin-form-control" 
                    value={formData.stok} 
                    onChange={(e) => setFormData({ ...formData, stok: e.target.value })} 
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn-outline" onClick={() => setShowModal(false)}>Batal</button>
              <button className="admin-btn-primary" onClick={simpan}>
                {editIndex !== null ? 'Update' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}