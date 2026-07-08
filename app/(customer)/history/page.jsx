'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('customer_transactions');
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
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
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Riwayat Pesanan</h4>
        <p className="text-muted small">Lihat dan lacak semua pesanan Anda</p>
      </div>

      {/* Filter Chips */}
      <div className="history-filter">
        {statusOptions.map((status) => (
          <button
            key={status}
            className={`history-chip ${filterStatus === (status === 'Semua' ? '' : status) ? 'active' : ''}`}
            onClick={() => setFilterStatus(status === 'Semua' ? '' : status)}
          >
            {status}
          </button>
        ))}
      </div>

      {transactions.length === 0 ? (
        <div className="history-empty">
          <i className="fa-solid fa-receipt"></i>
          <h5>Belum Ada Pesanan</h5>
          <p>Yuk, mulai belanja koleksi Blu-ray anime favoritmu!</p>
          <Link href="/katalog" className="admin-btn-primary">Mulai Belanja</Link>
        </div>
      ) : (
        <div className="history-list">
          {transactions
            .filter(t => filterStatus === '' || t.status === filterStatus)
            .map((transaction, idx) => (
              <div className="history-card" key={idx}>
                <div className="history-card-header">
                  <div>
                    <span className="history-order-id">{transaction.id}</span>
                    <span className="history-order-date">
                      <i className="fa-regular fa-calendar me-1"></i> {transaction.tanggal}
                    </span>
                  </div>
                  <span className={`history-status ${getStatusClass(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>

                <div className="history-card-body">
                  <div className="history-products">
                    {transaction.items.slice(0, 3).map((item, itemIdx) => (
                      <div className="history-product" key={itemIdx}>
                        <img src={item.gambar} alt={item.nama} className="history-product-img" />
                        <div className="history-product-info">
                          <div className="history-product-title">{item.nama}</div>
                          <div className="history-product-qty">{item.quantity || 1}x</div>
                        </div>
                      </div>
                    ))}
                    {transaction.items.length > 3 && (
                      <div className="history-product-more">
                        +{transaction.items.length - 3} item lainnya
                      </div>
                    )}
                  </div>

                  <div className="history-card-footer">
                    <div className="history-total">
                      <span>Total</span>
                      <strong>{formatRupiah(transaction.total)}</strong>
                    </div>
                    <Link href={`/history/${transaction.id}`} className="history-detail-link">
                      Lihat Detail <i className="fa-solid fa-arrow-right ms-1"></i>
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