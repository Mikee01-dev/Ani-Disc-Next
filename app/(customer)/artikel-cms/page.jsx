'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ArtikelCMSPage() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['Semua']);

  useEffect(() => {
    fetch('https://anidisc-cms.test:8443/index.php?rest_route=/wp/v2/posts&_embed')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setFilteredArticles(data);
        
        // Ambil daftar kategori unik dari artikel
        const cats = ['Semua'];
        data.forEach(article => {
          if (article._embedded?.['wp:term']?.[0]?.[0]?.name) {
            const catName = article._embedded['wp:term'][0][0].name;
            if (!cats.includes(catName)) cats.push(catName);
          }
        });
        setCategories(cats);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  // Filter artikel berdasarkan kategori dan search
  useEffect(() => {
    let filtered = [...articles];
    
    // Filter kategori
    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(article => 
        article._embedded?.['wp:term']?.[0]?.[0]?.name === selectedCategory
      );
    }
    
    // Filter search
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.rendered.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredArticles(filtered);
  }, [selectedCategory, searchQuery, articles]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-orange" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3">Memuat artikel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <i className="fa-solid fa-circle-exclamation fa-3x text-danger mb-3 d-block"></i>
        <h5 className="fw-bold">Gagal Memuat Artikel</h5>
        <a href="https://anidisc-cms.test:8443/wp-admin" target="_blank" className="admin-btn-primary d-inline-block mt-3">
          Buka WordPress
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold text-dark mb-1">Artikel Anime</h4>
      </div>

      {/* Filter Section */}
      <div className="artikel-filter-section">
        <div className="artikel-filter-categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`artikel-filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="artikel-filter-search">
          <i className="fa-solid fa-search"></i>
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Result Info */}
      <div className="artikel-result-info">
        <span>Menampilkan {filteredArticles.length} artikel</span>
        {(selectedCategory !== 'Semua' || searchQuery) && (
          <button 
            className="artikel-reset-filter"
            onClick={() => {
              setSelectedCategory('Semua');
              setSearchQuery('');
            }}
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Artikel Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-5">
          <i className="fa-solid fa-newspaper fa-3x text-muted mb-3 d-block"></i>
          <h5 className="fw-bold">Tidak Ada Artikel</h5>
          <p className="text-muted">Tidak ada artikel dengan filter yang dipilih</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredArticles.map(article => (
            <div className="col-12" key={article.id}>
              <div className="artikel-cms-card">
                <div className="row g-0">
                  {article._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <div className="col-md-3">
                      <div className="artikel-cms-img-wrapper">
                        <img 
                          src={article._embedded['wp:featuredmedia'][0].source_url} 
                          alt={article.title.rendered}
                          className="artikel-cms-img"
                        />
                      </div>
                    </div>
                  )}
                  <div className={article._embedded?.['wp:featuredmedia'] ? 'col-md-9' : 'col-12'}>
                    <div className="artikel-cms-content">
                      <div className="artikel-cms-meta">
                        <span><i className="fa-regular fa-calendar me-1"></i> {formatDate(article.date)}</span>
                        <span><i className="fa-regular fa-user me-1"></i> {article._embedded?.author?.[0]?.name || 'Admin'}</span>
                      </div>
                      <h3 className="artikel-cms-title" dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
                      <p className="artikel-cms-excerpt" dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }} />
                      <Link href={`/artikel-cms/${article.slug}`} className="artikel-cms-link">
                        Baca Selengkapnya <i className="fa-solid fa-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}