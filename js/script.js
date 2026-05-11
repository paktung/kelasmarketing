// ============================================
// MARKETING CLASS — Bu Diyah Wulandari, SE
// script.js
// ============================================

/* ---- PAGE LOADER ---- */
window.addEventListener('load', () => {
  setTimeout(() => document.querySelector('.page-loader')?.classList.add('done'), 1800);
});

/* ---- NAVBAR ---- */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => navbar?.classList.toggle('scrolled', window.scrollY > 20));

/* ---- HAMBURGER ---- */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
  hamburger.classList.toggle('active');
  const [s1, , s3] = hamburger.querySelectorAll('span');
  const on = hamburger.classList.contains('active');
  hamburger.querySelectorAll('span')[0].style.transform = on ? 'rotate(45deg) translate(5px,5px)' : '';
  hamburger.querySelectorAll('span')[1].style.opacity = on ? '0' : '';
  hamburger.querySelectorAll('span')[2].style.transform = on ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

/* ---- FLOATING MARKETING ICONS ---- */
function spawnFloatIcons() {
  const icons = ['🛒','💰','📊','📢','🎯','💡','📈','🤝','🏷️','💳','📣','🌟','💼','📱','🔑','✅'];
  const container = document.querySelector('.hero-bg');
  if (!container) return;
  icons.forEach(icon => {
    const el = document.createElement('div');
    el.className = 'mkt-float';
    el.textContent = icon;
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDuration = (9 + Math.random() * 10) + 's';
    el.style.animationDelay = (Math.random() * 12) + 's';
    el.style.fontSize = (1.2 + Math.random() * 1.2) + 'rem';
    container.appendChild(el);
  });
}

/* ---- SCROLL REVEAL ---- */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ---- COUNTER ANIMATION ---- */
function animCounter(el, target, dur = 1400) {
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animCounter(e.target, +e.target.dataset.count); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

/* ---- PROGRESS BARS ---- */
function initProgressBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.width = e.target.dataset.width + '%'; obs.unobserve(e.target); } });
  }, { threshold: 0.3 });
  document.querySelectorAll('.prog-fill[data-width]').forEach(b => obs.observe(b));
}

/* ---- TABS ---- */
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab)?.classList.add('active');
    });
  });
}

/* ---- PAGE NAVIGATION ---- */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId)?.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });
  mobileMenu?.classList.remove('open');
  hamburger?.classList.remove('active');
  hamburger?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  setTimeout(() => { initReveal(); initCounters(); initProgressBars(); }, 100);
}

/* ---- VIDEO PLAY ---- */
function playVideo() {
  const id = window._currentVideoId;
  if (id) window.open('https://www.youtube.com/watch?v=' + id, '_blank', 'noopener');
}

/* ---- LIGHTBOX ---- */
function initLightbox() {
  if (document.getElementById('lightbox-overlay')) return;
  const lb = document.createElement('div');
  lb.id = 'lightbox-overlay';
  lb.innerHTML = `<div id="lb-backdrop" onclick="closeLightbox()"></div>
    <div id="lb-content">
      <button id="lb-close" onclick="closeLightbox()" aria-label="Tutup">✕</button>
      <img id="lb-img" src="" alt="">
    </div>`;
  document.body.appendChild(lb);
}
function openLightbox(src, alt) {
  const ol = document.getElementById('lightbox-overlay');
  if (!ol) return;
  document.getElementById('lb-img').src = src;
  document.getElementById('lb-img').alt = alt || '';
  ol.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox-overlay')?.classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ============================================
// COURSES DATA — 6 Materi Kelas X
// ============================================
const courses = [
  {
    id: 'dasar-pemasaran',
    kelas: 'Kelas X',
    kode: 'A',
    icon: '🛒',
    title: 'Dasar-Dasar Pemasaran',
    shortDesc: 'Konsep, fungsi, dan ruang lingkup pemasaran dalam kegiatan usaha nyata.',
    objective: 'Peserta didik mampu menjelaskan, mengidentifikasi, dan menganalisis konsep dasar pemasaran, termasuk pengertian, fungsi, dan ruang lingkup pemasaran dalam kegiatan usaha, melalui pembelajaran berbasis diskusi, studi kasus, dan simulasi sederhana, dengan ketepatan konsep dan kelengkapan analisis sesuai kriteria yang ditentukan.',
    bloom: 'C2 · C3 · C4',
    tags: ['Kelas X', 'PM2'],
    materi: `<p>Pemasaran adalah jantung dari setiap kegiatan usaha. Tanpa pemasaran, produk terbaik pun bisa tenggelam tanpa dikenal. Di kelas ini, kita akan belajar bahwa <strong>pemasaran bukan sekadar berjualan</strong> — pemasaran adalah proses menyeluruh mulai dari mengenali kebutuhan konsumen, merancang produk, menetapkan harga, mendistribusikan, hingga mempromosikan.</p>
    <div class="key-concepts">
      <div class="concept-item"><div class="concept-icon">🎯</div><div class="concept-title">Pengertian Pemasaran</div><div class="concept-desc">Proses sosial dan manajerial di mana individu/kelompok mendapatkan apa yang mereka butuhkan melalui penciptaan dan pertukaran nilai.</div></div>
      <div class="concept-item"><div class="concept-icon">⚙️</div><div class="concept-title">Fungsi Pemasaran</div><div class="concept-desc">Meliputi fungsi pertukaran, fungsi fisik, dan fungsi fasilitas yang memperlancar alur produk dari produsen ke konsumen.</div></div>
      <div class="concept-item"><div class="concept-icon">🌐</div><div class="concept-title">Ruang Lingkup</div><div class="concept-desc">Mencakup analisis pasar, perencanaan produk, penetapan harga, distribusi, dan promosi (Marketing Mix 4P).</div></div>
      <div class="concept-item"><div class="concept-icon">📊</div><div class="concept-title">Marketing Mix 4P</div><div class="concept-desc">Product (Produk), Price (Harga), Place (Tempat/Distribusi), Promotion (Promosi) — empat pilar strategi pemasaran.</div></div>
    </div>
    <p>Dalam dunia usaha modern, pemasaran telah berkembang menjadi <strong>7P</strong> dengan tambahan People (Orang), Process (Proses), dan Physical Evidence (Bukti Fisik). Khusus untuk jurusan Pemasaran SMK, kalian akan belajar bagaimana menerapkan konsep ini dalam simulasi penjualan, praktik di unit produksi sekolah, maupun magang di dunia usaha.</p>
    <p>Contoh nyata: ketika kalian menjual produk di koperasi sekolah, kalian sudah menjalankan pemasaran — dari memilih produk yang diminati siswa, menetapkan harga yang terjangkau, meletakkan di lokasi strategis, hingga mempromosikannya lewat WhatsApp group. Itulah pemasaran dalam kehidupan nyata!</p>`,
    videoId: 'nqdn_KKYHOM',
    quiz: [
      { q: 'Apa yang dimaksud dengan pemasaran dalam konteks bisnis?', opts: ['Hanya kegiatan menjual produk','Proses sosial untuk memenuhi kebutuhan melalui pertukaran nilai','Kegiatan membuat produk','Hanya kegiatan promosi'], ans: 1, exp: 'Pemasaran adalah proses sosial dan manajerial menyeluruh, bukan sekadar penjualan.' },
      { q: 'Marketing Mix 4P terdiri dari...', opts: ['Product, Profit, Place, Promotion','Product, Price, Place, Promotion','Product, Price, People, Promotion','Product, Price, Place, People'], ans: 1, exp: 'Marketing Mix 4P: Product (Produk), Price (Harga), Place (Tempat), Promotion (Promosi).' },
      { q: 'Fungsi fisik dalam pemasaran meliputi...', opts: ['Promosi dan iklan','Penyimpanan, pengangkutan, dan pengolahan','Penetapan harga','Riset pasar'], ans: 1, exp: 'Fungsi fisik mencakup kegiatan penyimpanan, pengangkutan, dan pengolahan produk.' },
      { q: 'Apa perbedaan antara 4P dan 7P dalam pemasaran?', opts: ['7P menambahkan People, Process, Physical Evidence','7P menambahkan Profit, People, Place','Tidak ada perbedaan','7P hanya untuk pemasaran digital'], ans: 0, exp: '7P menambah 3 elemen: People (orang), Process (proses), dan Physical Evidence (bukti fisik).' },
      { q: 'Seorang siswa menjual kue di kantin sekolah dengan harga terjangkau dan promosi via WA. Ia menerapkan konsep...', opts: ['Manajemen saja','Marketing Mix','Akuntansi','Kewirausahaan saja'], ans: 1, exp: 'Ia menerapkan Marketing Mix: produk (kue), harga terjangkau, tempat (kantin), promosi (WA).' }
    ]
  },
  {
    id: 'ilmu-ekonomi',
    kelas: 'Kelas X',
    kode: 'B',
    icon: '📈',
    title: 'Dasar-Dasar Ilmu Ekonomi',
    shortDesc: 'Konsep ekonomi, masalah ekonomi, dan peran pelaku ekonomi dalam kegiatan usaha.',
    objective: 'Peserta didik mampu menjelaskan, mengklasifikasikan, dan menganalisis konsep dasar ilmu ekonomi, masalah ekonomi, model ekonomi, serta peran pelaku ekonomi dalam kegiatan usaha dan pemasaran, melalui kegiatan pembelajaran berbasis literasi, diskusi, dan analisis kasus kontekstual, dengan ketepatan pemahaman dan kedalaman analisis sesuai indikator yang ditetapkan.',
    bloom: 'C2 · C3 · C4',
    tags: ['Kelas X', 'PM2'],
    materi: `<p>Ilmu ekonomi adalah ilmu yang mempelajari bagaimana manusia membuat pilihan dalam kondisi sumber daya yang <strong>terbatas</strong> untuk memenuhi kebutuhan yang <strong>tidak terbatas</strong>. Inilah inti dari masalah ekonomi yang selalu relevan dalam kehidupan sehari-hari maupun dunia usaha.</p>
    <div class="key-concepts">
      <div class="concept-item"><div class="concept-icon">❓</div><div class="concept-title">Masalah Ekonomi Klasik</div><div class="concept-desc">What (Apa yang diproduksi?), How (Bagaimana cara produksi?), For Whom (Untuk siapa hasil produksi?) — tiga pertanyaan fundamental ekonomi.</div></div>
      <div class="concept-item"><div class="concept-icon">🔄</div><div class="concept-title">Pelaku Ekonomi</div><div class="concept-desc">Rumah Tangga Konsumen (RTK), Rumah Tangga Produsen (RTP), Pemerintah, dan Masyarakat Luar Negeri berperan dalam arus barang dan uang.</div></div>
      <div class="concept-item"><div class="concept-icon">⚖️</div><div class="concept-title">Kelangkaan (Scarcity)</div><div class="concept-desc">Ketidakseimbangan antara kebutuhan manusia yang tidak terbatas dengan sumber daya yang terbatas — penyebab utama masalah ekonomi.</div></div>
      <div class="concept-item"><div class="concept-icon">🏭</div><div class="concept-title">Sistem Ekonomi</div><div class="concept-desc">Tradisional, Komando, Pasar Bebas, dan Campuran — masing-masing memiliki cara berbeda dalam menjawab masalah ekonomi.</div></div>
    </div>
    <p>Dalam konteks pemasaran, pemahaman ekonomi sangat penting. Ketika harga barang naik (misalnya bahan baku), pelaku usaha harus memutuskan: apakah menaikkan harga jual, mengurangi kualitas, atau mencari bahan baku alternatif? Inilah <strong>pengambilan keputusan ekonomi</strong> yang wajib dikuasai oleh marketer profesional.</p>
    <p>Model ekonomi sederhana yang wajib dipahami adalah <strong>Circular Flow Diagram</strong> — diagram yang menggambarkan arus barang, jasa, dan uang antara rumah tangga dan perusahaan. Dengan memahami ini, kalian bisa melihat posisi bisnis kalian dalam ekosistem ekonomi yang lebih besar.</p>`,
    videoId: '3ez10ADR_gM',
    quiz: [
      { q: 'Apa yang dimaksud dengan kelangkaan (scarcity) dalam ekonomi?', opts: ['Barang yang langka di toko','Ketidakseimbangan kebutuhan tak terbatas dengan sumber daya terbatas','Harga yang terlalu tinggi','Produksi yang berlebihan'], ans: 1, exp: 'Kelangkaan adalah inti masalah ekonomi: kebutuhan manusia tidak terbatas namun sumber daya terbatas.' },
      { q: 'Tiga pertanyaan dasar masalah ekonomi adalah...', opts: ['Who, When, Where','What, How, For Whom','Why, What, When','How, Where, Who'], ans: 1, exp: 'Masalah ekonomi klasik: What (apa diproduksi), How (bagaimana), For Whom (untuk siapa).' },
      { q: 'Yang termasuk Rumah Tangga Produsen (RTP) adalah...', opts: ['Keluarga yang berbelanja','Pemerintah daerah','Perusahaan yang memproduksi barang/jasa','Masyarakat konsumen'], ans: 2, exp: 'RTP adalah pihak yang memproduksi barang/jasa, yaitu perusahaan atau unit usaha.' },
      { q: 'Sistem ekonomi Indonesia yang menggabungkan pasar dan peran pemerintah disebut...', opts: ['Sistem ekonomi komando','Sistem ekonomi tradisional','Sistem ekonomi campuran','Sistem ekonomi pasar bebas'], ans: 2, exp: 'Indonesia menganut sistem ekonomi campuran (Pancasila) yang memadukan mekanisme pasar dengan peran pemerintah.' },
      { q: 'Dalam Circular Flow Diagram, rumah tangga memberikan... kepada perusahaan', opts: ['Barang jadi','Faktor produksi (tenaga kerja, modal, dll)','Pajak','Subsidi'], ans: 1, exp: 'Rumah tangga menyediakan faktor produksi (tenaga kerja, lahan, modal) kepada perusahaan dan menerima imbalan berupa upah/sewa/bunga.' }
    ]
  },
  {
    id: 'administrasi-manajemen',
    kelas: 'Kelas X',
    kode: 'C',
    icon: '📋',
    title: 'Administrasi Umum & Fungsi Manajemen',
    shortDesc: 'Prinsip administrasi dan fungsi manajemen POAC dalam simulasi kerja nyata.',
    objective: 'Peserta didik mampu menjelaskan dan menerapkan prinsip administrasi umum serta fungsi manajemen (perencanaan, pengorganisasian, pelaksanaan, dan pengawasan) dalam kegiatan usaha atau simulasi kerja, melalui praktik langsung, simulasi, dan kerja kelompok, dengan ketepatan prosedur dan keterpaduan langkah kerja sesuai standar.',
    bloom: 'C2 · C3 · C4',
    tags: ['Kelas X', 'PM2'],
    materi: `<p>Administrasi adalah tulang punggung setiap organisasi. Tanpa administrasi yang baik, bisnis sebesar apapun bisa kacau. Fungsi manajemen POAC (<strong>Planning, Organizing, Actuating, Controlling</strong>) adalah kerangka kerja universal yang digunakan oleh semua jenis usaha.</p>
    <div class="key-concepts">
      <div class="concept-item"><div class="concept-icon">📝</div><div class="concept-title">Planning (Perencanaan)</div><div class="concept-desc">Menetapkan tujuan dan cara mencapainya. Dalam usaha: rencana penjualan bulanan, target omzet, anggaran promosi.</div></div>
      <div class="concept-item"><div class="concept-icon">🏗️</div><div class="concept-title">Organizing (Pengorganisasian)</div><div class="concept-desc">Menyusun struktur organisasi, membagi tugas, dan menentukan wewenang agar tim bekerja efektif dan efisien.</div></div>
      <div class="concept-item"><div class="concept-icon">🚀</div><div class="concept-title">Actuating (Pelaksanaan)</div><div class="concept-desc">Menggerakkan anggota tim untuk menjalankan rencana. Membutuhkan kepemimpinan, motivasi, dan komunikasi yang baik.</div></div>
      <div class="concept-item"><div class="concept-icon">🔍</div><div class="concept-title">Controlling (Pengawasan)</div><div class="concept-desc">Memantau pelaksanaan, membandingkan dengan rencana, dan melakukan koreksi jika ada penyimpangan.</div></div>
    </div>
    <p>Dalam praktik di kelas, kalian akan mensimulasikan manajemen sebuah usaha kecil — misalnya warung sekolah atau bazar kelas. Mulai dari <strong>merencanakan</strong> produk apa yang dijual, <strong>mengorganisir</strong> pembagian tugas antar anggota tim, <strong>melaksanakan</strong> kegiatan penjualan, hingga <strong>mengevaluasi</strong> hasil dan membuat laporan sederhana.</p>
    <p>Administrasi yang rapi mencakup: pencatatan transaksi harian, arsip dokumen, surat-menyurat bisnis, dan laporan keuangan sederhana. Keterampilan ini sangat dibutuhkan di dunia kerja — baik sebagai karyawan maupun sebagai wirausahawan mandiri.</p>`,
    videoId: '7gLRPGsHpqM',
    quiz: [
      { q: 'Singkatan POAC dalam fungsi manajemen adalah...', opts: ['Plan, Order, Act, Check','Planning, Organizing, Actuating, Controlling','Prepare, Organize, Apply, Control','Plan, Organize, Achieve, Control'], ans: 1, exp: 'POAC = Planning (Perencanaan), Organizing (Pengorganisasian), Actuating (Pelaksanaan), Controlling (Pengawasan).' },
      { q: 'Kegiatan menetapkan tujuan usaha dan cara mencapainya termasuk fungsi...', opts: ['Organizing','Actuating','Planning','Controlling'], ans: 2, exp: 'Planning adalah fungsi pertama manajemen: menetapkan tujuan dan strategi pencapaiannya.' },
      { q: 'Membuat struktur organisasi dan membagi tugas adalah fungsi...', opts: ['Planning','Organizing','Actuating','Controlling'], ans: 1, exp: 'Organizing adalah pengorganisasian: menyusun struktur dan membagi tugas/wewenang.' },
      { q: 'Seorang manajer toko memeriksa laporan penjualan harian dan membandingkan dengan target. Ia sedang melakukan fungsi...', opts: ['Planning','Organizing','Actuating','Controlling'], ans: 3, exp: 'Controlling adalah pengawasan: memantau dan membandingkan hasil nyata dengan rencana.' },
      { q: 'Apa manfaat administrasi yang rapi bagi sebuah usaha?', opts: ['Membuat usaha terlihat mewah','Memudahkan pengambilan keputusan dan pertanggungjawaban','Menambah karyawan','Mengurangi produksi'], ans: 1, exp: 'Administrasi yang rapi memudahkan pengambilan keputusan, audit, dan pertanggungjawaban kepada pihak terkait.' }
    ]
  },
  {
    id: 'perilaku-konsumen',
    kelas: 'Kelas X',
    kode: 'D',
    icon: '🤝',
    title: 'Perilaku Konsumen & Produsen',
    shortDesc: 'Analisis perilaku dan faktor keputusan pembelian barang dan jasa.',
    objective: 'Peserta didik mampu mengidentifikasi dan menganalisis perilaku konsumen dan produsen serta faktor-faktor yang memengaruhi keputusan pembelian barang dan jasa, melalui kegiatan observasi, diskusi, dan analisis studi kasus, dengan ketepatan identifikasi dan kedalaman analisis sesuai kriteria yang ditetapkan.',
    bloom: 'C2 · C3 · C4',
    tags: ['Kelas X', 'PM2'],
    materi: `<p>Mengapa seseorang memilih membeli Nike daripada produk lokal yang harganya lebih murah? Mengapa di supermarket kita sering membeli lebih banyak dari yang direncanakan? Jawabannya ada di <strong>ilmu perilaku konsumen</strong> — salah satu senjata paling ampuh dalam pemasaran.</p>
    <div class="key-concepts">
      <div class="concept-item"><div class="concept-icon">🧠</div><div class="concept-title">Faktor Psikologis</div><div class="concept-desc">Motivasi, persepsi, pembelajaran, keyakinan, dan sikap yang memengaruhi keputusan pembelian seseorang secara internal.</div></div>
      <div class="concept-item"><div class="concept-icon">👥</div><div class="concept-title">Faktor Sosial</div><div class="concept-desc">Pengaruh keluarga, kelompok referensi, teman sebaya, dan status sosial terhadap pilihan produk dan merek.</div></div>
      <div class="concept-item"><div class="concept-icon">🏛️</div><div class="concept-title">Faktor Budaya</div><div class="concept-desc">Nilai, norma, adat, dan sub-budaya yang membentuk pola konsumsi dan preferensi produk suatu masyarakat.</div></div>
      <div class="concept-item"><div class="concept-icon">💼</div><div class="concept-title">Faktor Pribadi</div><div class="concept-desc">Usia, pekerjaan, penghasilan, gaya hidup, dan kepribadian yang secara langsung memengaruhi keputusan beli.</div></div>
    </div>
    <p>Proses keputusan pembelian konsumen melalui 5 tahap: <strong>(1) Pengenalan Masalah</strong> → merasa butuh sesuatu. <strong>(2) Pencarian Informasi</strong> → browsing, tanya teman. <strong>(3) Evaluasi Alternatif</strong> → membandingkan pilihan. <strong>(4) Keputusan Pembelian</strong> → memilih dan membeli. <strong>(5) Perilaku Pasca-Pembelian</strong> → puas atau kecewa.</p>
    <p>Sebagai marketer, tugas kita adalah memahami dan <strong>memengaruhi</strong> setiap tahap ini dengan tepat. Misalnya, dengan iklan yang menarik perhatian (tahap 1-2), testimoni pelanggan (tahap 3), promosi diskon (tahap 4), dan layanan purna jual yang baik (tahap 5).</p>`,
    videoId: 'pBVMBRKr6U4',
    quiz: [
      { q: 'Faktor internal yang memengaruhi keputusan pembelian konsumen adalah...', opts: ['Pengaruh keluarga','Faktor psikologis seperti motivasi dan persepsi','Tradisi budaya','Teman sebaya'], ans: 1, exp: 'Faktor psikologis (motivasi, persepsi, sikap) adalah faktor internal yang mempengaruhi keputusan pembelian.' },
      { q: 'Seorang remaja membeli sepatu merek terkenal karena teman-temannya memakai merek itu. Ini dipengaruhi faktor...', opts: ['Budaya','Pribadi','Sosial (kelompok referensi)','Psikologis'], ans: 2, exp: 'Pengaruh teman sebaya/kelompok adalah faktor sosial dalam perilaku konsumen.' },
      { q: 'Tahap pertama dalam proses keputusan pembelian konsumen adalah...', opts: ['Keputusan pembelian','Pencarian informasi','Pengenalan masalah/kebutuhan','Evaluasi alternatif'], ans: 2, exp: 'Proses diawali dengan pengenalan masalah: konsumen menyadari ada kebutuhan yang belum terpenuhi.' },
      { q: 'Produsen yang memaksimalkan keuntungan dengan meminimalkan biaya disebut berperilaku...', opts: ['Rasional ekonomi','Irrasional','Sosial','Psikologis'], ans: 0, exp: 'Perilaku rasional ekonomi: produsen berusaha menghasilkan keuntungan maksimal dengan biaya minimal.' },
      { q: 'Apa yang dilakukan marketer untuk memengaruhi konsumen di tahap "Evaluasi Alternatif"?', opts: ['Membuat iklan TV','Memberikan testimoni dan perbandingan produk','Menetapkan harga murah','Membuka toko baru'], ans: 1, exp: 'Di tahap evaluasi, konsumen membandingkan pilihan. Marketer dapat memengaruhinya dengan testimoni, review, dan perbandingan keunggulan produk.' }
    ]
  },
  {
    id: 'identifikasi-pelanggan',
    kelas: 'Kelas X',
    kode: 'E',
    icon: '🎯',
    title: 'Identifikasi Pelanggan & Strategi Pemasaran',
    shortDesc: 'Sinyal calon pelanggan, bahasa pemasaran tepat, dan buyer persona.',
    objective: 'Peserta didik mampu mengidentifikasi sinyal calon pelanggan, menentukan bahasa pemasaran yang tepat, serta menyusun buyer persona sebagai dasar strategi pemasaran, melalui pembelajaran berbasis proyek, diskusi, dan analisis pasar sederhana, dengan ketepatan penyusunan dan relevansi strategi sesuai indikator yang ditentukan.',
    bloom: 'C3 · C4 · C5',
    tags: ['Kelas X', 'PM2'],
    materi: `<p>Sebelum bisa menjual, kita harus tahu <em>kepada siapa</em> kita menjual. Inilah esensi dari identifikasi pelanggan. Marketer profesional tidak asal "tembak" — mereka menggunakan data dan analisis untuk menemukan calon pelanggan yang paling potensial.</p>
    <div class="key-concepts">
      <div class="concept-item"><div class="concept-icon">🔎</div><div class="concept-title">Sinyal Calon Pelanggan</div><div class="concept-desc">Perilaku yang menunjukkan minat beli: mengunjungi toko berulang, bertanya soal harga, membandingkan produk, atau mengikuti akun media sosial brand.</div></div>
      <div class="concept-item"><div class="concept-icon">🗣️</div><div class="concept-title">Bahasa Pemasaran</div><div class="concept-desc">Pemilihan kata, nada, dan gaya komunikasi yang tepat sesuai target pasar: formal untuk B2B, kasual dan trendi untuk remaja Gen-Z.</div></div>
      <div class="concept-item"><div class="concept-icon">👤</div><div class="concept-title">Buyer Persona</div><div class="concept-desc">Profil fiktif namun detail dari pelanggan ideal: nama, usia, pekerjaan, hobi, masalah, dan kebiasaan belanja.</div></div>
      <div class="concept-item"><div class="concept-icon">🗺️</div><div class="concept-title">Segmentasi Pasar</div><div class="concept-desc">Membagi pasar menjadi kelompok-kelompok berdasarkan demografis, psikografis, geografis, dan perilaku pembelian.</div></div>
    </div>
    <p><strong>Contoh Buyer Persona:</strong> "Sari, 22 tahun, mahasiswa desain grafis, tinggal di kota, sering belanja online, peduli estetika, budget terbatas tapi mau bayar lebih untuk produk berkualitas dan aesthetic. Aktif di Instagram dan TikTok." — Dengan persona ini, kita tahu: iklan di Instagram Reels dengan visual menarik dan harga mid-range adalah strategi tepat.</p>
    <p>Segmentasi yang baik menggunakan metode <strong>STP</strong>: Segmentation (membagi pasar), Targeting (memilih segmen terbaik), Positioning (menempatkan merek di benak konsumen). Inilah fondasi dari semua strategi pemasaran modern.</p>`,
    videoId: '1y1HL1cPlac',
    quiz: [
      { q: 'Apa yang dimaksud dengan Buyer Persona?', opts: ['Foto pelanggan nyata','Profil detail pelanggan ideal berdasarkan riset dan data','Daftar nama pembeli','Kartu anggota pelanggan'], ans: 1, exp: 'Buyer persona adalah gambaran semi-fiktif dari pelanggan ideal berdasarkan riset pasar dan data nyata.' },
      { q: 'Sinyal calon pelanggan yang paling kuat adalah...', opts: ['Hanya melihat etalase dari jauh','Bertanya tentang harga dan stok produk','Hanya lewat depan toko','Membaca brosur lalu pergi'], ans: 1, exp: 'Bertanya soal harga dan ketersediaan adalah sinyal minat beli yang kuat dari calon pelanggan.' },
      { q: 'STP dalam pemasaran singkatan dari...', opts: ['Sales, Target, Profit','Segmentation, Targeting, Positioning','Strategy, Tactic, Plan','Selling, Trading, Promoting'], ans: 1, exp: 'STP: Segmentation (membagi pasar), Targeting (memilih segmen), Positioning (menempatkan merek).' },
      { q: 'Bahasa pemasaran yang tepat untuk target pasar remaja Gen-Z adalah...', opts: ['Formal dan kaku','Kasual, trendi, dan relevan dengan budaya mereka','Teknis dan ilmiah','Klasik dan konservatif'], ans: 1, exp: 'Gen-Z merespons komunikasi yang kasual, autentik, trendi, dan sesuai dengan nilai serta budaya mereka.' },
      { q: 'Segmentasi berdasarkan usia, jenis kelamin, dan pendapatan disebut segmentasi...', opts: ['Psikografis','Geografis','Demografis','Perilaku'], ans: 2, exp: 'Segmentasi demografis membagi pasar berdasarkan usia, jenis kelamin, pendapatan, pendidikan, dll.' }
    ]
  },
  {
    id: 'kepuasan-pelanggan',
    kelas: 'Kelas X',
    kode: 'F',
    icon: '⭐',
    title: 'Kepuasan Pelanggan & Pelayanan Prima',
    shortDesc: 'Konsep AIDA, pelayanan prima, dan kerja sama tim untuk kepuasan pelanggan.',
    objective: 'Peserta didik mampu mendemonstrasikan dan menerapkan pelayanan prima dalam kegiatan penjualan menggunakan konsep AIDA serta bekerja sama secara efektif dalam tim untuk mencapai kepuasan pelanggan, melalui simulasi layanan, role play, dan kerja kelompok, dengan ketepatan penerapan konsep dan kualitas interaksi layanan sesuai standar.',
    bloom: 'C3 · C4 · C5',
    tags: ['Kelas X', 'PM2'],
    materi: `<p>Pelanggan yang puas akan kembali. Pelanggan yang sangat puas akan merekomendasikan produk kepada orang lain. Inilah kekuatan <strong>pelayanan prima (service excellence)</strong> — investasi terbaik dalam bisnis jangka panjang.</p>
    <div class="key-concepts">
      <div class="concept-item"><div class="concept-icon">👁️</div><div class="concept-title">A — Attention (Perhatian)</div><div class="concept-desc">Menarik perhatian calon pelanggan melalui display produk menarik, sapaan hangat, iklan yang eye-catching, atau konten media sosial yang memukau.</div></div>
      <div class="concept-item"><div class="concept-icon">❤️</div><div class="concept-title">I — Interest (Minat)</div><div class="concept-desc">Membangun minat dengan menjelaskan manfaat produk, menunjukkan keunggulan, atau memberikan demo/sample gratis kepada calon pembeli.</div></div>
      <div class="concept-item"><div class="concept-icon">🔥</div><div class="concept-title">D — Desire (Keinginan)</div><div class="concept-desc">Menciptakan keinginan kuat untuk memiliki produk: testimoni pelanggan, limited edition, penawaran spesial, atau memperlihatkan manfaat emosional.</div></div>
      <div class="concept-item"><div class="concept-icon">✅</div><div class="concept-title">A — Action (Tindakan)</div><div class="concept-desc">Mendorong calon pembeli untuk segera bertindak: Call to Action (CTA) yang jelas, kemudahan pembayaran, atau penawaran "hari ini saja".</div></div>
    </div>
    <p>Konsep pelayanan prima menggunakan prinsip <strong>RATER</strong>: Reliability (keandalan), Assurance (jaminan), Tangibles (tampilan fisik), Empathy (empati), dan Responsiveness (ketanggapan). Pelayan yang baik tidak hanya menjual — mereka membangun <em>hubungan</em> dengan pelanggan.</p>
    <p>Dalam simulasi role play, kalian akan berlatih skenario nyata: menghadapi pelanggan yang rewel, menangani komplain dengan profesional, hingga melakukan <strong>upselling</strong> (menawarkan produk lebih mahal) dan <strong>cross-selling</strong> (menawarkan produk pelengkap). Keterampilan ini adalah bekal emas di dunia kerja!</p>`,
    videoId: 'fRBNkKmKovQ',
    quiz: [
      { q: 'AIDA dalam pemasaran singkatan dari...', opts: ['Advertise, Interest, Desire, Action','Attention, Interest, Desire, Action','Attract, Inform, Direct, Achieve','Awareness, Impact, Drive, Achieve'], ans: 1, exp: 'AIDA: Attention (Perhatian), Interest (Minat), Desire (Keinginan), Action (Tindakan).' },
      { q: 'Fase "Desire" dalam AIDA bertujuan untuk...', opts: ['Menarik perhatian pertama kali','Memberikan informasi produk','Menciptakan keinginan kuat untuk memiliki produk','Mendorong pembelian segera'], ans: 2, exp: 'Desire adalah tahap menciptakan hasrat/keinginan: melalui testimoni, limited offer, atau manfaat emosional.' },
      { q: 'Kepanjangan RATER dalam pelayanan prima adalah...', opts: ['Rate, Ability, Trust, Empathy, Result','Reliability, Assurance, Tangibles, Empathy, Responsiveness','Rapid, Accurate, Timely, Efficient, Responsive','Ready, Accurate, Trusted, Empathetic, Responsible'], ans: 1, exp: 'RATER: Reliability, Assurance, Tangibles, Empathy, Responsiveness — lima dimensi kualitas layanan.' },
      { q: 'Menawarkan produk pelengkap kepada pelanggan yang sudah membeli disebut...', opts: ['Upselling','Downselling','Cross-selling','Hard-selling'], ans: 2, exp: 'Cross-selling adalah menawarkan produk yang melengkapi/berhubungan dengan apa yang sudah dibeli pelanggan.' },
      { q: 'Pelanggan yang sangat puas kemungkinan besar akan...', opts: ['Tidak pernah kembali','Meminta diskon besar','Merekomendasikan produk kepada orang lain','Mengajukan komplain'], ans: 2, exp: 'Pelanggan yang sangat puas (delighted) cenderung menjadi brand ambassador alami — merekomendasikan kepada keluarga dan teman.' }
    ]
  }
];

// ============================================
// COURSE DETAIL
// ============================================
let currentCourse = null;
let quizState = { current: 0, score: 0, answered: false };

function openCourse(courseId) {
  currentCourse = courses.find(c => c.id === courseId);
  if (!currentCourse) return;

  // Populate
  document.getElementById('d-badge-text').textContent = `${currentCourse.kelas} • Materi ${currentCourse.kode}`;
  document.getElementById('d-title').textContent = currentCourse.title;
  document.getElementById('d-obj-text').textContent = currentCourse.objective;
  document.getElementById('d-bloom').textContent = `🧠 Taksonomi Bloom: ${currentCourse.bloom}`;
  document.getElementById('d-material').innerHTML = currentCourse.materi;
  const tagsEl = document.getElementById('d-tags');
  tagsEl.innerHTML = currentCourse.tags.map(t => `<span class="c-tag">${t}</span>`).join('');

  // Video
  window._currentVideoId = currentCourse.videoId;
  const ytThumb = document.getElementById('yt-thumb');
  if (ytThumb) ytThumb.style.backgroundImage = `url('https://img.youtube.com/vi/${currentCourse.videoId}/hqdefault.jpg')`;
  const iframe = document.getElementById('detail-video');
  if (iframe) { iframe.src = ''; iframe.style.display = 'none'; }
  const ph = document.getElementById('video-placeholder');
  if (ph) ph.style.display = 'flex';

  // Reset quiz
  resetQuiz();

  // Diskusi
  document.body.dataset.materi = currentCourse.id;

  showPage('page-detail');
  setTimeout(tampilkanKomentar, 100);
}

// ============================================
// QUIZ
// ============================================
function resetQuiz() {
  quizState = { current: 0, score: 0, answered: false };
  renderQuiz();
}

function renderQuiz() {
  if (!currentCourse) return;
  const q = currentCourse.quiz[quizState.current];
  const total = currentCourse.quiz.length;
  document.getElementById('q-progress').style.width = ((quizState.current / total) * 100) + '%';
  document.getElementById('q-num').textContent = `Soal ${quizState.current + 1} dari ${total}`;
  document.getElementById('q-text').textContent = q.q;
  document.getElementById('q-feedback').className = 'q-feedback';
  document.getElementById('q-result').className = 'q-result';
  document.getElementById('q-wrap').style.display = '';
  quizState.answered = false;
  const optsEl = document.getElementById('q-opts');
  optsEl.innerHTML = q.opts.map((o, i) => `<button class="q-opt" onclick="answerQuiz(${i})">${o}</button>`).join('');
}

function answerQuiz(idx) {
  if (quizState.answered) return;
  quizState.answered = true;
  const q = currentCourse.quiz[quizState.current];
  const opts = document.querySelectorAll('#q-opts .q-opt');
  const fb = document.getElementById('q-feedback');
  opts.forEach(o => o.disabled = true);
  if (idx === q.ans) {
    quizState.score++;
    opts[idx].classList.add('correct-ans');
    fb.textContent = `✅ Benar! ${q.exp}`;
    fb.className = 'q-feedback show correct-fb';
  } else {
    opts[idx].classList.add('wrong-ans');
    opts[q.ans].classList.add('correct-ans');
    fb.textContent = `❌ Kurang tepat. ${q.exp}`;
    fb.className = 'q-feedback show wrong-fb';
  }
  setTimeout(() => {
    quizState.current++;
    if (quizState.current >= currentCourse.quiz.length) showQuizResult();
    else renderQuiz();
  }, 1900);
}

function showQuizResult() {
  const pct = Math.round((quizState.score / currentCourse.quiz.length) * 100);
  document.getElementById('q-wrap').style.display = 'none';
  document.getElementById('q-score-val').textContent = pct + '%';
  const msg = pct >= 80 ? '🎉 Luar Biasa! Pemahaman kamu sangat baik!'
    : pct >= 60 ? '👍 Bagus! Terus tingkatkan ya.'
    : '💪 Yuk pelajari lagi materinya!';
  document.getElementById('q-result-msg').textContent = msg;
  document.getElementById('q-result-detail').textContent = `Jawaban benar: ${quizState.score} dari ${currentCourse.quiz.length} soal`;
  document.getElementById('q-result').className = 'q-result show';
  document.getElementById('q-progress').style.width = '100%';
}

// ============================================
// STANDALONE QUIZ (quiz page)
// ============================================
let sqState = { current: 0, score: 0, answered: false, courseId: null };

function openCourseQuiz(id) {
  const c = courses.find(x => x.id === id);
  if (!c) return;
  sqState = { current: 0, score: 0, answered: false, courseId: id };
  document.getElementById('sq-title').textContent = `Quiz — ${c.title}`;
  document.getElementById('standalone-quiz').style.display = 'block';
  document.getElementById('standalone-quiz').scrollIntoView({ behavior: 'smooth' });
  renderSQ();
}

function renderSQ() {
  const c = courses.find(x => x.id === sqState.courseId);
  if (!c) return;
  const q = c.quiz[sqState.current];
  const total = c.quiz.length;
  document.getElementById('sq-progress').style.width = ((sqState.current / total) * 100) + '%';
  document.getElementById('sq-num').textContent = `Soal ${sqState.current + 1} dari ${total}`;
  document.getElementById('sq-text').textContent = q.q;
  document.getElementById('sq-feedback').className = 'q-feedback';
  document.getElementById('sq-result').className = 'q-result';
  document.getElementById('sq-wrap').style.display = '';
  sqState.answered = false;
  document.getElementById('sq-opts').innerHTML = q.opts.map((o, i) => `<button class="q-opt" onclick="answerSQ(${i})">${o}</button>`).join('');
}

function answerSQ(idx) {
  if (sqState.answered) return;
  sqState.answered = true;
  const c = courses.find(x => x.id === sqState.courseId);
  const q = c.quiz[sqState.current];
  const opts = document.querySelectorAll('#sq-opts .q-opt');
  const fb = document.getElementById('sq-feedback');
  opts.forEach(o => o.disabled = true);
  if (idx === q.ans) {
    sqState.score++;
    opts[idx].classList.add('correct-ans');
    fb.textContent = `✅ Benar! ${q.exp}`;
    fb.className = 'q-feedback show correct-fb';
  } else {
    opts[idx].classList.add('wrong-ans');
    opts[q.ans].classList.add('correct-ans');
    fb.textContent = `❌ Kurang tepat. ${q.exp}`;
    fb.className = 'q-feedback show wrong-fb';
  }
  setTimeout(() => {
    sqState.current++;
    if (sqState.current >= c.quiz.length) {
      const pct = Math.round((sqState.score / c.quiz.length) * 100);
      document.getElementById('sq-wrap').style.display = 'none';
      document.getElementById('sq-score-val').textContent = pct + '%';
      const msg = pct >= 80 ? '🎉 Luar Biasa!' : pct >= 60 ? '👍 Bagus! Terus belajar.' : '💪 Pelajari lagi materinya ya.';
      document.getElementById('sq-result-msg').textContent = msg;
      document.getElementById('sq-result-detail').textContent = `Benar ${sqState.score} dari ${c.quiz.length} soal.`;
      document.getElementById('sq-result').className = 'q-result show';
      document.getElementById('sq-progress').style.width = '100%';
    } else renderSQ();
  }, 1900);
}

function resetSQ() {
  sqState.current = 0;
  sqState.score = 0;
  renderSQ();
}

// ============================================
// CERTIFICATE
// ============================================
function generateCertificate() {
  const name = document.getElementById('cert-name-input').value.trim();
  const course = document.getElementById('cert-course-select').value;
  if (!name) { alert('Masukkan nama kamu dulu ya! 😊'); return; }
  document.getElementById('cert-recipient-name').textContent = name;
  document.getElementById('cert-course-title').textContent = course;
  document.getElementById('cert-date').textContent = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const pw = document.getElementById('cert-preview-wrap');
  pw.style.display = 'block';
  pw.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function printCertificate() {
  window.print();
}

// ============================================
// DISKUSI — JSONBin
// ============================================
const API_KEY = '$2a$10$T3aHHNrH76XbjyW2F73igek/71frQYlY221CAg4Ie9lOo3XA0jaJS';
const BIN_MAP = {
  'dasar-pemasaran':          '69fb3681856a682189b28b1e',
  'ilmu-ekonomi':             '69fb36dcaaba8821977a7706',
  'administrasi-manajemen':   '69fb371baaba8821977a784d',
  'perilaku-konsumen':        '69fb373836566621a83072b2',
  'identifikasi-pelanggan':   '69fb3681856a682189b28b1e',
  'kepuasan-pelanggan':       '69fb36dcaaba8821977a7706'
};

function getActiveBin() {
  return BIN_MAP[document.body.dataset.materi] || null;
}

async function getData() {
  const id = getActiveBin();
  if (!id) return [];
  const res = await fetch(`https://api.jsonbin.io/v3/b/${id}/latest`, { headers: { 'X-Access-Key': API_KEY } });
  if (!res.ok) throw new Error('fetch failed');
  return (await res.json()).record.komentar || [];
}

async function saveData(komentar) {
  const id = getActiveBin();
  if (!id) return;
  await fetch(`https://api.jsonbin.io/v3/b/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Access-Key': API_KEY },
    body: JSON.stringify({ komentar })
  });
}

async function tampilkanKomentar() {
  const list = document.getElementById('listKomentar');
  if (!list) return;
  list.innerHTML = '<p style="text-align:center;color:#a06040;font-size:.85rem;padding:1rem">Memuat diskusi...</p>';
  try {
    const komentar = await getData();
    if (!komentar.length) { list.innerHTML = '<p style="text-align:center;color:#a06040;font-size:.85rem;padding:1rem">Belum ada diskusi. Jadilah yang pertama! 😊</p>'; return; }
    list.innerHTML = komentar.slice().reverse().map(item => `
      <div class="komentar-item">
        <b>👤 ${item.nama}</b><br>
        <small>🕐 ${item.waktu}</small>
        <p>${item.pesan}</p>
        <input id="rN-${item.id}" placeholder="Nama kamu..." class="disc-input" style="margin-top:.4rem">
        <textarea id="rP-${item.id}" placeholder="Tulis balasan..." class="disc-input"></textarea>
        <button onclick="kirimBalasan('${item.id}')">↩ Balas</button>
        <div class="balasan-box">
          ${(item.balasan||[]).map(r=>`<div class="balasan-item"><b>${r.nama}</b><small>${r.waktu}</small><p>${r.pesan}</p></div>`).join('')}
        </div>
      </div>`).join('');
  } catch { list.innerHTML = '<p style="text-align:center;color:#a06040;font-size:.85rem;padding:1rem">Gagal memuat diskusi 😢</p>'; }
}

async function kirimKomentar() {
  const nama = document.getElementById('nama')?.value.trim();
  const pesan = document.getElementById('pesan')?.value.trim();
  if (!nama || !pesan) { alert('Isi nama dan komentar dulu ya 😊'); return; }
  const btn = document.querySelector('.disc-submit');
  if (btn) { btn.textContent = 'Mengirim...'; btn.disabled = true; }
  try {
    const k = await getData();
    k.push({ id: 'c' + Date.now(), nama, pesan, waktu: new Date().toLocaleString('id-ID'), balasan: [] });
    await saveData(k);
    document.getElementById('nama').value = '';
    document.getElementById('pesan').value = '';
    await tampilkanKomentar();
  } catch { alert('Gagal kirim 😢'); }
  finally { if (btn) { btn.textContent = '✉ Kirim Komentar'; btn.disabled = false; } }
}

async function kirimBalasan(cid) {
  const nama = document.getElementById(`rN-${cid}`)?.value.trim();
  const pesan = document.getElementById(`rP-${cid}`)?.value.trim();
  if (!nama || !pesan) { alert('Isi nama dan balasan dulu 😊'); return; }
  try {
    const k = await getData();
    const t = k.find(x => x.id === cid);
    if (!t) return;
    if (!t.balasan) t.balasan = [];
    t.balasan.push({ id: 'r' + Date.now(), nama, pesan, waktu: new Date().toLocaleString('id-ID') });
    await saveData(k);
    await tampilkanKomentar();
  } catch { alert('Gagal kirim balasan 😢'); }
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  spawnFloatIcons();
  initReveal();
  initCounters();
  initProgressBars();
  initTabs();
  initLightbox();
  showPage('page-home');
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); showPage(el.dataset.page); });
  });
});

