'use client';

import { useState, useEffect } from 'react';

export default function UserPage() {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    username: '',
    role: 'Pelanggan',
    password: ''
  });

  // Data default
  const defaultUser = [
    { id: 1, nama: 'Mike Admin', email: 'mike@anidisc.com', username: 'mike_admin', role: 'Admin', password: 'admin123' },
    { id: 2, nama: 'Budi Santoso', email: 'budi@mail.com', username: 'budi_s', role: 'Pelanggan', password: 'user123' },
    { id: 3, nama: 'Siti Kasir', email: 'siti@anidisc.com', username: 'siti_k', role: 'Kasir', password: 'kasir123' }
  ];

  // Load data
  useEffect(() => {
    const saved = localStorage.getItem('admin_user');
    if (saved) {
      setUserList(JSON.parse(saved));
    } else {
      setUserList(defaultUser);
      localStorage.setItem('admin_user', JSON.stringify(defaultUser));
    }
  }, []);

  // Filter data
  const filteredUser = userList.filter(u => {
    const matchSearch = searchQuery === '' || 
      u.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = filterRole === '' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const openTambah = () => {
    setEditIndex(null);
    setFormData({ nama: '', email: '', username: '', role: 'Pelanggan', password: '' });
    setShowModal(true);
  };

  const openEdit = (index) => {
    setEditIndex(index);
    const { password, ...userWithoutPass } = userList[index];
    setFormData({ ...userWithoutPass, password: '' });
    setShowModal(true);
  };

  const simpan = () => {
    if (!formData.nama) {
      alert('Nama wajib diisi!');
      return;
    }
    if (!formData.email) {
      alert('Email wajib diisi!');
      return;
    }
    if (!formData.username) {
      alert('Username wajib diisi!');
      return;
    }
    if (editIndex === null && !formData.password) {
      alert('Password wajib diisi untuk user baru!');
      return;
    }

    const newList = [...userList];
    const newId = editIndex !== null ? userList[editIndex].id : Date.now();
    
    let newData;
    if (editIndex !== null) {
      const existingUser = userList[editIndex];
      newData = {
        ...formData,
        id: newId,
        password: formData.password || existingUser.password
      };
      newList[editIndex] = newData;
    } else {
      newData = { ...formData, id: newId };
      newList.push(newData);
    }
    
    setUserList(newList);
    localStorage.setItem('admin_user', JSON.stringify(newList));
    setShowModal(false);
  };

  const hapus = (index) => {
    if (confirm('Yakin hapus user ini?')) {
      const newList = userList.filter((_, i) => i !== index);
      setUserList(newList);
      localStorage.setItem('admin_user', JSON.stringify(newList));
    }
  };

  const roleList = ['Admin', 'Kasir', 'Pelanggan'];
  const roleColor = {
    'Admin': 'bg-danger',
    'Kasir': 'bg-warning text-dark',
    'Pelanggan': 'bg-success'
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Manajemen User</h4>
          <p className="text-muted small mb-0">Kelola data akun pengguna sistem AniDisc.</p>
        </div>
        <button className="admin-btn-primary" onClick={openTambah}>
          <i className="fa-solid fa-plus me-1"></i> Tambah User
        </button>
      </div>

      {/* Filter */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-7 col-lg-8">
          <input
            type="text"
            className="form-control"
            placeholder="Cari nama, email, atau username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-5 col-lg-4">
          <select
            className="form-select"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">Semua Role</option>
            {roleList.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Tabel User */}
      <div className="admin-table-wrapper">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUser.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    <i className="fa-solid fa-inbox fa-2x mb-2 d-block"></i>
                    Tidak ada data user
                  </td>
                </tr>
              ) : (
                filteredUser.map((u, idx) => (
                  <tr key={u.id}>
                    <td className="user-cell">
                      <span className="fw-semibold">{u.nama}</span>
                    </td>
                    <td>{u.email}</td>
                    <td><code className="admin-username">@{u.username}</code></td>
                    <td>
                      <span className={`badge ${roleColor[u.role]} px-3 py-2`}>
                        {u.role}
                      </span>
                    </td>
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

      {/* MODAL - PAKAI CLASS CUSTOM (SAMA SEPERTI STOK & TRANSAKSI) */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h5 className="admin-modal-title">{editIndex !== null ? 'Edit User' : 'Tambah User Baru'}</h5>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="admin-modal-body">
              <div className="mb-3">
                <label className="admin-form-label">Nama Lengkap <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={formData.nama} 
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })} 
                  placeholder="Contoh: Budi Santoso"
                />
              </div>

              <div className="mb-3">
                <label className="admin-form-label">Email <span className="text-danger">*</span></label>
                <input 
                  type="email" 
                  className="admin-form-control" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  placeholder="budi@mail.com"
                />
              </div>

              <div className="mb-3">
                <label className="admin-form-label">Username <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={formData.username} 
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
                  placeholder="budi_s"
                />
              </div>

              <div className="mb-3">
                <label className="admin-form-label">Role</label>
                <select 
                  className="admin-form-control" 
                  value={formData.role} 
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  {roleList.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="admin-form-label">
                  Password {editIndex === null ? <span className="text-danger">*</span> : <span className="text-muted">(kosongkan jika tidak diubah)</span>}
                </label>
                <input 
                  type="password" 
                  className="admin-form-control" 
                  value={formData.password} 
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                  placeholder={editIndex === null ? 'Wajib diisi' : 'Kosongkan jika tidak diubah'}
                />
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