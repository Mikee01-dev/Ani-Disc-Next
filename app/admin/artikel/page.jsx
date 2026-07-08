'use client';

import { useEffect } from 'react';

export default function AdminArtikelPage() {
  useEffect(() => {
    // Redirect ke WordPress admin panel
    window.location.href = 'https://anidisc-cms.test:8443/wp-admin/edit.php?post_type=post';
  }, []);

  return (
    <div className="text-center py-5">
      <div className="spinner-border text-orange" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3">Mengarahkan ke WordPress CMS...</p>
    </div>
  );
}