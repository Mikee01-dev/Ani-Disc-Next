'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPesananPage() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem('customer_transactions') || '[]');
    setOrders(transactions);
    setLoading(false);
  }, []);

  const formatRupiah = (angka) => {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(angka);
  };

  const getStatusClass = (status) => {
    const map = {
      'Menunggu Pembayaran': 'status-warning',
      'Diproses': 'status-info',
      'Dikirim': 'status-primary',
      'Selesai': 'status-success',
      'Dibatalkan': 'status-danger'
    };
    return map[status] || 'status-secondary';
  };

  const updateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem('customer_transactions', JSON.stringify(updatedOrders));
    alert(`Status pesanan ${orderId} diubah menjadi ${newStatus}`);
  };

  const deleteOrder = (orderId) => {
    if (confirm('Yakin ingin menghapus pesanan ini?')) {
      const filteredOrders = orders.filter(order => order.id !== orderId);
      setOrders(filteredOrders);
      localStorage.setItem('customer_transactions', JSON.stringify(filteredOrders));
      alert(`Pesanan ${orderId} berhasil dihapus`);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchStatus = filterStatus === '' || order.status === filterStatus;
    const matchSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.kota?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const statusOptions = ['Semua', 'Menunggu Pembayaran', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-orange" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Kelola Pesanan</h4>
          <p className="text-muted small mb-0">Kelola semua pesanan dari customer AniDisc.</p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="position-relative">
            <i className="fa-solid fa-search position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
            <input
              type="text"
              className="form-control"
              placeholder="Cari invoice atau kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>
        </div>
        <div className="col-12 col-md-3">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt === 'Semua' ? '' : opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabel Pesanan */}
      {filteredOrders.length === 0 ? (
        <div className="admin-table-wrapper">
          <div className="text-center py-5">
            <i className="fa-solid fa-inbox fa-3x text-muted mb-3 d-block"></i>
            <p className="text-muted">Tidak ada pesanan</p>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Tanggal</th>
                  <th>Pembeli</th>
                  <th>Kota</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, idx) => (
                  <tr key={idx}>
                    <td className="fw-bold text-orange">{order.id}</td>
                    <td className="text-muted small">{order.tanggal}</td>
                    <td>{order.nama || '-'}</td>
                    <td>{order.kota || '-'}</td>
                    <td className="fw-bold">{formatRupiah(order.total)}</td>
                    <td>
                      <select
                        className={`status-select ${getStatusClass(order.status)}`}
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                      >
                        <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                    </td>
                    <td className="text-center">
                      <Link href={`/admin/pesanan/${order.id}`} className="admin-btn-outline me-1">
                        <i className="fa-solid fa-eye"></i>
                      </Link>
                      <button className="admin-btn-danger" onClick={() => deleteOrder(order.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style jsx>{`
        .text-orange {
          color: #ff5500;
        }
        .status-select {
          padding: 4px 8px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }
        .status-select.status-warning {
          background: #fef3c7;
          color: #d97706;
        }
        .status-select.status-info {
          background: #dbeafe;
          color: #2563eb;
        }
        .status-select.status-primary {
          background: #e0f2fe;
          color: #0284c7;
        }
        .status-select.status-success {
          background: #dcfce7;
          color: #16a34a;
        }
        .status-select.status-danger {
          background: #fee2e2;
          color: #dc2626;
        }
      `}</style>
    </div>
  );
}