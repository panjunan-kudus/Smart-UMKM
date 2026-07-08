/**
 * utils.js — Fungsi-fungsi pembantu
 */

const Utils = {
  generateId() {
    return 'umkm-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  },

  generateSlug(nama) {
    return nama
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },

  formatHarga(angka) {
    if (!angka && angka !== 0) return '-';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  },

  formatTanggal(isoString) {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  },

  formatWA(nomor) {
    if (!nomor) return null;
    const bersih = nomor.replace(/\D/g, '');
    return bersih.startsWith('0') ? '62' + bersih.slice(1) : bersih;
  },

  waLink(nomor, pesan) {
    const n = this.formatWA(nomor);
    if (!n) return '#';
    const p = encodeURIComponent(pesan || 'Halo, saya ingin bertanya tentang produk Anda.');
    return `https://wa.me/${n}?text=${p}`;
  },

  igLink(akun) {
    if (!akun) return '#';
    const bersih = akun.replace('@', '');
    return `https://instagram.com/${bersih}`;
  },

  readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  showToast(pesan, tipe = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const t = document.createElement('div');
    t.className = `toast toast-${tipe}`;
    t.innerHTML = `<span>${tipe === 'success' ? '✓' : tipe === 'error' ? '✕' : 'ℹ'}</span> ${pesan}`;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
  },

  confirm(pesan) {
    return window.confirm(pesan);
  },

  getParam(nama) {
    return new URLSearchParams(window.location.search).get(nama);
  },

  getLabelKategori(id, categories) {
    const cat = (categories || Storage.getCategories()).find(c => c.id === id);
    return cat ? `${cat.ikon} ${cat.nama}` : id;
  },

  placeholder(teks, warna = '#16a34a') {
    const bg = warna.replace('#', '');
    return `https://placehold.co/800x400/${bg}/ffffff?text=${encodeURIComponent(teks)}&font=inter`;
  },

  avatarPlaceholder(inisial, warna = '#16a34a') {
    const bg = warna.replace('#', '');
    return `https://placehold.co/200x200/${bg}/ffffff?text=${encodeURIComponent(inisial)}&font=inter`;
  },

  hariLabel: {
    senin: 'Senin', selasa: 'Selasa', rabu: 'Rabu', kamis: 'Kamis',
    jumat: 'Jumat', sabtu: 'Sabtu', minggu: 'Minggu',
  },

  /* ---- Sidebar mobile management ---- */
  initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    if (!sidebar || !hamburger) return;

    // Create backdrop
    let backdrop = document.getElementById('sidebarBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'sidebarBackdrop';
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    function openSidebar() {
      sidebar.classList.add('open');
      backdrop.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
      document.body.style.overflow = '';
    }

    hamburger.onclick = () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    };
    backdrop.onclick = closeSidebar;

    // Close on nav link click (mobile)
    sidebar.querySelectorAll('.nav-item').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeSidebar();
      });
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeSidebar();
    });
  },
};
