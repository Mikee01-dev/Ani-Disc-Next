'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProduk: 0,
    totalPendapatan: 0,
    stokKritis: 0,
    totalUser: 0,
  });

  useEffect(() => {
    // Ambil data dari localStorage
    const produk = JSON.parse(localStorage.getItem('admin_produk') || '[]');
    const user = JSON.parse(localStorage.getItem('admin_user') || '[]');
    const transaksi = JSON.parse(localStorage.getItem('admin_transaksi') || '[]');
    
    const totalPendapatan = transaksi.reduce((sum, t) => sum + (t.total || 0), 0);
    const stokKritis = produk.filter(p => (p.stok || 0) < 10).length;
    
    setStats({
      totalProduk: produk.length || 1240,
      totalPendapatan: totalPendapatan || 45200000,
      stokKritis: stokKritis || 4,
      totalUser: user.length || 852,
    });
  }, []);

  const formatRupiah = (angka) => {
    if (angka >= 1000000) {
      return 'Rp ' + (angka / 1000000).toFixed(1) + 'M';
    }
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  const logData = [
    { id: '#LOG-DML-09', query: 'INSERT INTO master_produk (id_produk, judul, harga) VALUES (...)', operator: 'Ahmad Administrator', waktu: 'Hari ini, 11:24:02', status: 'SUCCESS' },
    { id: '#LOG-DML-08', query: 'UPDATE stok SET jumlah = jumlah - 1 WHERE sku = "#BR-001"', operator: 'Budi Kasir', waktu: 'Hari ini, 10:15:33', status: 'SUCCESS' },
    { id: '#LOG-DML-07', query: 'DELETE FROM user WHERE id = "USR-099"', operator: 'Mike Admin', waktu: 'Kemarin, 14:22:10', status: 'SUCCESS' },
    { id: '#LOG-DML-06', query: 'SELECT * FROM transaksi WHERE tanggal > "2026-05-01"', operator: 'Siti Kasir', waktu: 'Kemarin, 09:45:22', status: 'SUCCESS' },
  ];

  return (
    <div>
      {/* Header Halaman */}
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Dashboard Ringkasan</h4>
        <p className="text-muted small mb-0">Selamat datang kembali di sistem kontrol inventori toko kaset.</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {/* Card 1 - Total Produk */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="admin-stat-card">
            <div>
              <span className="admin-stat-label">TOTAL DATA PRODUK</span>
              <h3 className="admin-stat-value">{stats.totalProduk.toLocaleString()}</h3>
              <span className="admin-stat-trend text-success">
                <i className="fa-solid fa-arrow-up"></i> +24 Baru
              </span>
            </div>
            <div className="admin-stat-icon" style={{ background: '#fff0e6', color: '#ff5500' }}>
              <i className="fa-solid fa-compact-disc"></i>
            </div>
          </div>
        </div>

        {/* Card 2 - Total Pendapatan */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="admin-stat-card">
            <div>
              <span className="admin-stat-label">TOTAL PENDAPATAN</span>
              <h3 className="admin-stat-value">{formatRupiah(stats.totalPendapatan)}</h3>
              <span className="admin-stat-trend text-success">
                <i className="fa-solid fa-arrow-trend-up"></i> Target 12.5%
              </span>
            </div>
            <div className="admin-stat-icon" style={{ background: '#e6f7ed', color: '#2e7d32' }}>
              <i className="fa-solid fa-wallet"></i>
            </div>
          </div>
        </div>

        {/* Card 3 - Kontrol Inventori */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="admin-stat-card">
            <div>
              <span className="admin-stat-label">KONTROL INVENTORI</span>
              <h3 className="admin-stat-value text-danger">{stats.stokKritis} Item</h3>
              <span className="admin-stat-trend">
                <span className="admin-badge-danger">Restock Kritis</span>
              </span>
            </div>
            <div className="admin-stat-icon" style={{ background: '#ffebee', color: '#c62828' }}>
              <i className="fa-solid fa-boxes-stacked"></i>
            </div>
          </div>
        </div>

        {/* Card 4 - Manajemen Pengguna */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="admin-stat-card">
            <div>
              <span className="admin-stat-label">MANAJEMEN PENGGUNA</span>
              <h3 className="admin-stat-value">{stats.totalUser.toLocaleString()}</h3>
              <span className="admin-stat-trend">
                Rasio Pelanggan <span className="text-info fw-bold">94%</span>
              </span>
            </div>
            <div className="admin-stat-icon" style={{ background: '#e0f7fa', color: '#00838f' }}>
              <i className="fa-solid fa-users"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Log Operasional */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <div>
            <h5 className="admin-table-title">Antrean Log Operasional Basis Data</h5>
            <p className="admin-table-subtitle">Simulasi pencatatan aktivitas transaksi DDL/DML terpusat sistem AniDisc</p>
          </div>
          <button className="admin-btn-primary" onClick={() => alert('Sinkronisasi UI Berhasil!')}>
            <i className="fa-solid fa-arrows-rotate me-1"></i> Segarkan Sistem
          </button>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID Log</th>
                <th>Query / Operasi Operasional</th>
                <th>Operator Akun</th>
                <th>Waktu Eksekusi</th>
                <th className="text-center">Validasi SQL</th>
              </tr>
            </thead>
            <tbody>
              {logData.map((log, idx) => (
                <tr key={idx}>
                  <td className="admin-log-id">{log.id}</td>
                  <td className="admin-log-query">{log.query}</td>
                  <td>{log.operator}</td>
                  <td className="text-muted small">{log.waktu}</td>
                  <td className="text-center">
                    <span className="admin-badge-success">{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}