'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg sticky-top navbar-custom">
        <div className="container">
          <Link href="/" className="logo-brand">
            <span className="logo-ani">Ani</span><span className="logo-disc">Disc</span>
          </Link>

          <button 
            className="navbar-toggler custom-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarAniDisc"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarAniDisc">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <Link className="nav-link active" href="/">Home</Link>
              </li>
              <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                <Link className="btn btn-login-nav" href="/login">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero-section-premium">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6 hero-text-area text-center text-lg-start">
              <span className="badge-tag mb-3 px-3 py-2">Eksklusif Impor Jepang</span>
              <h1 className="hero-title mb-3">
                Nikmati Anime Favoritmu dengan Kualitas <span>Visual Terbaik</span>
              </h1>
              <p className="text-muted-custom mb-4">
                Hadirkan piringan resmi Blu-ray original dengan resolusi ultra jernih, kualitas audio premium, 
                serta bonus boxset eksklusif, artbook, dan merchandise resmi langsung di kamarmu.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Link href="/katalog" className="btn-primary-orange">Jelajahi Katalog</Link>
                <a href="#kategori" className="btn-outline-premium">Lihat Genre</a>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div 
                className="hero-banner-box-premium p-4 rounded-4 text-white d-flex flex-column justify-content-end align-items-start" 
                style={{ 
                  background: "linear-gradient(rgba(0,0,0,0.2), #121212), url('https://motionbgs.com/media/2362/suzume-no-tojimari.jpg') center/cover", 
                  height: "380px",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <span className="badge bg-warning text-dark mb-2 fw-semibold px-2 py-1">Pre-Order Terbuka</span>
                <h3 className="fw-bold mb-1">Suzume no Tojimari</h3>
                <p className="mb-0 text-white-50 small">Collector's Edition — Termasuk 120-Halaman Premium Artbook</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* KATEGORI SECTION */}
      <section id="kategori" className="container my-5 py-4">
        <h2 className="section-title-premium text-center text-lg-start">Cari Berdasarkan Kategori</h2>
        <div className="row g-3 text-center mt-3">
          <div className="col-6 col-md-3">
            <div className="category-card-premium p-3">
              <div className="icon-box-cat text-danger">
                <i className="fa-solid fa-fire fs-3"></i>
              </div>
              <h6 className="fw-semibold mb-0 mt-2">Action / Shounen</h6>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="category-card-premium p-3">
              <div className="icon-box-cat text-danger">
                <i className="fa-solid fa-heart fs-3"></i>
              </div>
              <h6 className="fw-semibold mb-0 mt-2">Romance / Drama</h6>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="category-card-premium p-3">
              <div className="icon-box-cat text-info">
                <i className="fa-solid fa-wand-sparkles fs-3"></i>
              </div>
              <h6 className="fw-semibold mb-0 mt-2">Fantasy / Isekai</h6>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="category-card-premium p-3">
              <div className="icon-box-cat text-secondary">
                <i className="fa-solid fa-robot fs-3"></i>
              </div>
              <h6 className="fw-semibold mb-0 mt-2">Sci-Fi / Mecha</h6>
            </div>
          </div>
        </div>
      </section>

      {/* REKOMENDASI MINGGU INI */}
      <section className="container my-5 py-2">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="section-title-premium mb-0">Rekomendasi Minggu Ini</h2>
          <Link href="/katalog" className="link-see-all">
            Lihat Semua Koleksi <i className="fa-solid fa-arrow-right ms-1"></i>
          </Link>
        </div>
        <div className="row g-4">
          {/* Produk 1 */}
          <div className="col-6 col-md-4 col-lg-3">
            <div className="product-card-premium">
              <span className="badge-edition-premium bg-dark text-white">Standard</span>
              <div className="product-img-wrapper">
                <img 
                  src="https://hoganreviews.co.uk/wp-content/uploads/2021/10/demon-slayer-mugen-train-3.jpg" 
                  alt="Demon Slayer: Mugen Train" 
                  loading="lazy"
                />
              </div>
              <div className="product-info-premium">
                <h5 className="product-title-premium">Demon Slayer: Mugen Train</h5>
                <p className="product-price-premium">Rp 850.000</p>
                <Link href="/produk/demon-slayer" className="btn-detail-premium">Lihat Detail</Link>
              </div>
            </div>
          </div>

          {/* Produk 2 */}
          <div className="col-6 col-md-4 col-lg-3">
            <div className="product-card-premium">
              <span className="badge-edition-premium bg-dark text-white">Standard</span>
              <div className="product-img-wrapper">
                <img 
                  src="https://ramenparados.com/wp-content/uploads/2022/01/jujutsu-kaisen-0-movie-finally-gets-western-release-date_zube-1.jpg" 
                  alt="Jujutsu Kaisen 0: The Movie" 
                  loading="lazy"
                />
              </div>
              <div className="product-info-premium">
                <h5 className="product-title-premium">Jujutsu Kaisen 0: The Movie</h5>
                <p className="product-price-premium">Rp 650.000</p>
                <Link href="/produk/jujutsu-kaisen-0" className="btn-detail-premium">Lihat Detail</Link>
              </div>
            </div>
          </div>

          {/* Produk 3 */}
          <div className="col-6 col-md-4 col-lg-3">
            <div className="product-card-premium">
              <span className="badge-edition-premium bg-warning text-dark">Collector Ed.</span>
              <div className="product-img-wrapper">
                <img 
                  src="https://th.bing.com/th/id/R.5080573f4667a4824514638f0a63acfb?rik=GeVz4R27JXTqwQ&riu=http%3a%2f%2fwww.nipponsensor.net%2fwp-content%2fuploads%2f2023%2f12%2f20231207-eva-02_11zon-1529x860.jpg&ehk=ybDYW9bCcm85e1kESZ0e5Q%2bC2WhgI9XEYDBMfT6fJcY%3d&risl=&pid=ImgRaw&r=0" 
                  alt="Evangelion 3.0+1.0 Boxset" 
                  loading="lazy"
                />
              </div>
              <div className="product-info-premium">
                <h5 className="product-title-premium">Evangelion 3.0+1.0 + Boxset</h5>
                <p className="product-price-premium">Rp 1.200.000</p>
                <Link href="/produk/evangelion-boxset" className="btn-detail-premium">Lihat Detail</Link>
              </div>
            </div>
          </div>

          {/* Produk 4 */}
          <div className="col-6 col-md-4 col-lg-3">
            <div className="product-card-premium">
              <span className="badge-edition-premium bg-dark text-white">Standard</span>
              <div className="product-img-wrapper">
                <img 
                  src="https://www.justwatch.com/images/backdrop/245292721/s1440/cobra-the-animation" 
                  alt="Cobra the Animation" 
                  loading="lazy"
                />
              </div>
              <div className="product-info-premium">
                <h5 className="product-title-premium">Cobra the Animation</h5>
                <p className="product-price-premium">Rp 600.000</p>
                <Link href="/produk/cobra-animation" className="btn-detail-premium">Lihat Detail</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KENAPA BELANJA DI ANIDISC */}
      <section className="bg-light py-5 border-top border-bottom border-light">
        <div className="container">
          <h2 className="section-title-premium text-center mx-auto mb-5" style={{ width: "fit-content" }}>
            Kenapa Belanja di AniDisc?
          </h2>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-3">
                <div className="icon-circle text-success mb-3 mx-auto">
                  <i className="fa-solid fa-shield-halved fs-3"></i>
                </div>
                <h5 className="fw-bold fs-6 text-uppercase tracking-wider">100% Original</h5>
                <p className="text-secondary small mb-0">
                  Semua piringan Blu-ray diimpor langsung dari supplier resmi rilisan pasar Jepang.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3">
                <div className="icon-circle text-warning mb-3 mx-auto">
                  <i className="fa-solid fa-box-open fs-3"></i>
                </div>
                <h5 className="fw-bold fs-6 text-uppercase tracking-wider">Proteksi Maksimal</h5>
                <p className="text-secondary small mb-0">
                  Dilapisi bubble wrap tebal ekstra boks kardus kokoh secara gratis tanpa biaya tambahan.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3">
                <div className="icon-circle text-info mb-3 mx-auto">
                  <i className="fa-solid fa-truck-fast fs-3"></i>
                </div>
                <h5 className="fw-bold fs-6 text-uppercase tracking-wider">Pengiriman Kilat</h5>
                <p className="text-secondary small mb-0">
                  Sistem manajemen stok terintegrasi, pesanan dipacking langsung di hari yang sama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-4 text-secondary" style={{ backgroundColor: "#111111" }}>
        <div className="container text-center">
          <p className="mb-1 text-white-50">
            &copy; 2026 <strong><span className="text-white">Ani</span><span style={{ color: "#FF5500" }}>Disc</span></strong>. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}