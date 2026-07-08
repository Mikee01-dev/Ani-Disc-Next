'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DetailArtikelCMSPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    
    fetch(`https://anidisc-cms.test:8443/index.php?rest_route=/wp/v2/posts&slug=${slug}&_embed`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setArticle(data[0]);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-orange" role="status"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center py-5">
        <i className="fa-solid fa-circle-exclamation fa-3x text-muted mb-3 d-block"></i>
        <p>Artikel tidak ditemukan</p>
        <Link href="/artikel-cms" className="btn-primary-orange d-inline-block mt-3">Kembali</Link>
      </div>
    );
  }

  return (
    <article className="artikel-detail">
      <Link href="/artikel-cms" className="artikel-detail-back">
        ← Kembali
      </Link>

      {article._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
        <img 
          src={article._embedded['wp:featuredmedia'][0].source_url} 
          alt={article.title.rendered}
          className="artikel-detail-image"
        />
      )}

      <h1 className="artikel-detail-title" dangerouslySetInnerHTML={{ __html: article.title.rendered }} />

      <div className="artikel-detail-info">
        <span>{formatDate(article.date)}</span>
        <span>•</span>
        <span>{article._embedded?.author?.[0]?.name || 'Admin'}</span>
      </div>

      <div className="artikel-detail-text" dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
    </article>
  );
}