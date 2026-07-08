'use client';

import { useState, useEffect } from 'react';

export default function TransaksiPage() {
  const [transaksiList, setTransaksiList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    pembeli: '',
    total: '',
    metode: 'QRIS'
  });

  // Data default
  const defaultTransaksi = [
    { id: '#INV-001', pembeli: 'Rian Wijaya', total: 1300000, metode: 'QRIS', tanggal: '21 Mei 2026, 10:14' },
    { id: '#INV-002', pembeli: 'Dewi Putri', total: 850000, metode: 'Transfer Bank', tanggal: '20 Mei 2026, 14:30' },
    { id: '#INV-003', pembeli: 'Andi Saputra', total: 450000, metode: 'Tunai', tanggal: '19 Mei 2026, 09:45' }
  ];

  // Load data
  useEffect(() => {
    const saved = localStorage.getItem('admin_transaksi');
    if (saved) {
      setTransaksiList(JSON.parse(saved));
    } else {
      setTransaksiList(defaultTransaksi);
      localStorage.setItem('admin_transaksi', JSON.stringify(defaultTransaksi));
    }
  }, []);

  // Filter data
  const filteredTransaksi = transaksiList.filter(t => 
    t.pembeli.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatRupiah = (angka) => {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(angka);
  };

  const openTambah = () => {
    setFormData({ pembeli: '', total: '', metode: 'QRIS' });
    setShowModal(true);
  };

  const simpanTransaksi = () => {
    if (!formData.pembeli || !formData.total) {
      alert('Nama pembeli dan total wajib diisi!');
      return;
    }

    const newId = '#INV-' + Math.floor(Math.random() * 900 + 100);
    const newTransaksi = {
      id: newId,
      pembeli: formData.pembeli,
      total: parseInt(formData.total),
      metode: formData.metode,
      tanggal: new Date().toLocaleDateString('id-ID') + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    const newList = [...transaksiList, newTransaksi];
    setTransaksiList(newList);
    localStorage.setItem('admin_transaksi', JSON.stringify(newList));
    setShowModal(false);
  };

  const hapusTransaksi = (index) => {
    if (confirm('Hapus transaksi ini?')) {
      const newList = transaksiList.filter((_, i) => i !== index);
      setTransaksiList(newList);
      localStorage.setItem('admin_transaksi', JSON.stringify(newList));
    }
  };

  const metodeList = ['QRIS', 'Transfer Bank', 'Tunai', 'Kartu Kredit'];

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Kelola Transaksi</h4>
          <p className="text-muted small mb-0">Manajemen riwayat penjualan dan nota konsumen.</p>
        </div>
        <button className="admin-btn-primary" onClick={openTambah}>
          <i className="fa-solid fa-plus me-1"></i> Buat Transaksi
        </button>
      </div>

      {/* Search */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Cari nama pembeli / no invoice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabel Transaksi */}
      <div className="admin-table-wrapper">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>No Invoice</th>
                <th>Nama Pembeli</th>
                <th>Total Belanja</th>
                <th>Metode Bayar</th>
                <th>Tanggal</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransaksi.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    <i className="fa-solid fa-receipt fa-2x mb-2 d-block"></i>
                    Tidak ada data transaksi
                  </td>
                </tr>
              ) : (
                filteredTransaksi.map((t, idx) => (
                  <tr key={t.id}>
                    <td className="fw-bold" style={{ color: '#ff5500' }}>{t.id}</td>
                    <td className="fw-semibold">{t.pembeli}</td>
                    <td className="fw-bold">{formatRupiah(t.total)}</td>
                    <td><span className="badge bg-light text-dark border px-3 py-2">{t.metode}</span></td>
                    <td className="text-muted small">{t.tanggal}</td>
                    <td className="text-center">
                      <button className="admin-btn-danger" onClick={() => hapusTransaksi(idx)}>
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

      {/* Modal Tambah Transaksi */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h5 className="admin-modal-title">Buat Transaksi Baru</h5>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="admin-modal-body">
              <div className="mb-3">
                <label className="admin-form-label">Nama Pembeli <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={formData.pembeli} 
                  onChange={(e) => setFormData({ ...formData, pembeli: e.target.value })} 
                  placeholder="Nama konsumen"
                />
              </div>

              <div className="mb-3">
                <label className="admin-form-label">Total Belanja (Rp) <span className="text-danger">*</span></label>
                <input 
                  type="number" 
                  className="admin-form-control" 
                  value={formData.total} 
                  onChange={(e) => setFormData({ ...formData, total: e.target.value })} 
                  placeholder="0"
                />
              </div>

              <div className="mb-3">
                <label className="admin-form-label">Metode Pembayaran</label>
                <select 
                  className="admin-form-control" 
                  value={formData.metode} 
                  onChange={(e) => setFormData({ ...formData, metode: e.target.value })}
                >
                  {metodeList.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn-outline" onClick={() => setShowModal(false)}>Batal</button>
              <button className="admin-btn-primary" onClick={simpanTransaksi}>Simpan Transaksi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}