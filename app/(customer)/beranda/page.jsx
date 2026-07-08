'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CustomerDashboard() {
  const [userName, setUserName] = useState('Member');

  useEffect(() => {
    const user = localStorage.getItem('user_name');
    if (user) setUserName(user);
  }, []);

  const stats = [
    { label: 'Total Pesanan', value: '3', icon: 'fa-box', color: '#ff5500' },
    { label: 'Menunggu Pembayaran', value: '1', icon: 'fa-clock', color: '#f59e0b' },
    { label: 'Dalam Pengiriman', value: '1', icon: 'fa-truck', color: '#3b82f6' },
    { label: 'Selesai', value: '1', icon: 'fa-check-circle', color: '#10b981' },
  ];

  const recentOrders = [
    { id: '#INV-001', date: '20 Mei 2026', total: 'Rp 850.000', status: 'Selesai' },
    { id: '#INV-002', date: '15 Mei 2026', total: 'Rp 1.200.000', status: 'Dikirim' },
    { id: '#INV-003', date: '10 Mei 2026', total: 'Rp 450.000', status: 'Diproses' },
  ];

  const getStatusClass = (status) => {
    const map = {
      'Selesai': 'badge bg-success',
      'Dikirim': 'badge bg-primary',
      'Diproses': 'badge bg-warning text-dark',
    };
    return map[status] || 'badge bg-secondary';
  };

  return (
    <div className="customer-dashboard">
      {/* Welcome Section */}
      <div className="mb-4">
        <h1 className="fw-bold text-dark mb-1">Halo, {userName}!</h1>
        <p className="text-muted small">Selamat datang di dashboard AniDisc. Kelola pesanan dan koleksi Anda di sini.</p>
      </div>

      {/* Stats Cards - Pakai class dari admin */}
      <div className="row g-4 mb-4">
        {stats.map((stat, idx) => (
          <div className="col-6 col-md-3" key={idx}>
            <div className="admin-stat-card">
              <div>
                <span className="admin-stat-label">{stat.label}</span>
                <h3 className="admin-stat-value">{stat.value}</h3>
              </div>
              <div className="admin-stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders - Pakai admin-table */}
      <div className="admin-table-wrapper mb-4">
        <div className="admin-table-header">
          <div>
            <h5 className="admin-table-title">Pesanan Terbaru</h5>
            <p className="admin-table-subtitle">3 pesanan terakhir Anda</p>
          </div>
          <Link href="/history" className="link-see-all">
            Lihat Semua <i className="fa-solid fa-arrow-right ms-1"></i>
          </Link>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>No Invoice</th>
                <th>Tanggal</th>
                <th>Total</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx}>
                  <td className="admin-log-id">{order.id}</td>
                  <td>{order.date}</td>
                  <td className="fw-bold">{order.total}</td>
                  <td><span className={getStatusClass(order.status)}>{order.status}</span></td>
                  <td><Link href={`/history/${order.id}`} className="link-see-all">Detail</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-table-wrapper mt-4">
        <div className="admin-table-header">
          <h5 className="admin-table-title">Aksi Cepat</h5>
        </div>
        <div className="row g-3 p-4">
          <div className="col-md-4">
            <Link href="/katalog" className="action-card">
              <i className="fa-solid fa-compact-disc"></i>
              <span>Belanja Lagi</span>
            </Link>
          </div>
          <div className="col-md-4">
            <Link href="/history" className="action-card">
              <i className="fa-solid fa-clock-rotate-left"></i>
              <span>Riwayat Pesanan</span>
            </Link>
          </div>
          <div className="col-md-4">
            <Link href="/profile" className="action-card">
              <i className="fa-solid fa-user"></i>
              <span>Profil Saya</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
