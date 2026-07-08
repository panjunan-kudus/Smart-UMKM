/**
 * storage.js — Lapisan data untuk Smart UMKM Gas
 *
 * Default tetap memakai localStorage browser.
 * Jika APP_CONFIG.mode diubah menjadi "gas", fungsi Storage akan memakai
 * Google Apps Script tanpa mengubah nama fungsi yang dipakai UI.
 */

const KEYS = {
  UMKM: 'sgp_umkm',
  SETTINGS: 'sgp_settings',
  CATEGORIES: 'sgp_categories',
  SESSION: 'sgp_session',
};

const DEFAULT_CATEGORIES = [
  { id: 'kuliner', nama: 'Kuliner', ikon: '🍽️', urutan: 1 },
  { id: 'fashion', nama: 'Fashion & Busana', ikon: '👗', urutan: 2 },
  { id: 'kerajinan', nama: 'Souvenir & Kerajinan', ikon: '🎁', urutan: 3 },
  { id: 'jasa', nama: 'Jasa', ikon: '🔧', urutan: 4 },
  { id: 'cafe', nama: 'Cafe', ikon: '☕', urutan: 5 },
  { id: 'retail', nama: 'Retail', ikon: '🏪', urutan: 6 },
  { id: 'lainnya', nama: 'Lainnya', ikon: '📦', urutan: 7 },
];

const DEFAULT_SETTINGS = {
  namaPortal: 'Portal UMKM Panjunan',
  deskripsiPortal: 'Platform digital untuk UMKM unggulan wilayah Panjunan, Kota Kudus — dikelola oleh tim KKN untuk mendukung ekonomi lokal.',
  alamat: 'Desa Panjunan, Kota Kudus, Jawa Tengah',
  whatsapp: '6281234567890',
  email: 'umkm.panjunan@gmail.com',
  instagram: 'umkmpanjunan',
  logoUrl: null,
  warnaUtama: '#16a34a',
  updatedAt: new Date().toISOString(),
};

const DEFAULT_UMKM = [
  {
    id: 'umkm-001', slug: 'warung-bu-ani', nama: 'Warung Bu Ani',
    kategori: 'kuliner',
    deskripsi: 'Warung makan rumahan dengan cita rasa otentik masakan Jawa. Menyajikan berbagai lauk pauk segar setiap hari dengan harga terjangkau dan porsi mengenyangkan.',
    alamat: 'Jl. Panjunan No. 12, Kudus', whatsapp: '6281234000001',
    instagram: 'warungbuani_kudus', mapsUrl: 'https://maps.google.com',
    template: 'minimal', warnaUtama: '#16a34a', featured: true, status: 'published',
    logo: null, banner: null, fotoToko: null,
    shopee: '', tokopedia: '', gofood: '', grabfood: '', tiktokshop: '', facebook: '',
    sectionSettings: { tentang: true, produk: true, galeri: true, jam: true, kontak: true },
    produk: [
      { id: 'p1', nama: 'Nasi Pecel', harga: 8000, deskripsi: 'Nasi pecel dengan bumbu kacang khas Kudus', foto: null },
      { id: 'p2', nama: 'Soto Ayam', harga: 12000, deskripsi: 'Soto ayam bening dengan kuah gurih', foto: null },
    ],
    galeri: [],
    jamOperasional: { senin:'06.00–20.00', selasa:'06.00–20.00', rabu:'06.00–20.00', kamis:'06.00–20.00', jumat:'06.00–20.00', sabtu:'06.00–21.00', minggu:'07.00–18.00' },
    createdAt: '2026-06-01T00:00:00.000Z', updatedAt: '2026-06-15T00:00:00.000Z', publishedAt: '2026-06-15T00:00:00.000Z',
  },
  {
    id: 'umkm-002', slug: 'batik-mbak-dewi', nama: 'Batik Mbak Dewi',
    kategori: 'fashion',
    deskripsi: 'Produsen batik tulis dan cap khas Kudus dengan motif kontemporer. Menggunakan bahan berkualitas dan pewarna alami ramah lingkungan.',
    alamat: 'Jl. Panjunan No. 45, Kudus', whatsapp: '6281234000002',
    instagram: 'batikmbakdewi', mapsUrl: 'https://maps.google.com',
    template: 'modern', warnaUtama: '#7c3aed', featured: true, status: 'published',
    logo: null, banner: null, fotoToko: null,
    shopee: 'https://shopee.co.id/batikmbakdewi', tokopedia: '', gofood: '', grabfood: '', tiktokshop: '', facebook: '',
    produk: [
      { id: 'p1', nama: 'Batik Tulis Motif Kudus', harga: 250000, deskripsi: 'Batik tulis premium motif khas Kudus', foto: null },
      { id: 'p2', nama: 'Batik Cap Modern', harga: 120000, deskripsi: 'Batik cap dengan desain modern', foto: null },
    ],
    galeri: [],
    jamOperasional: { senin:'08.00–17.00', selasa:'08.00–17.00', rabu:'08.00–17.00', kamis:'08.00–17.00', jumat:'08.00–17.00', sabtu:'08.00–15.00', minggu:'Tutup' },
    createdAt: '2026-06-05T00:00:00.000Z', updatedAt: '2026-06-20T00:00:00.000Z', publishedAt: '2026-06-20T00:00:00.000Z',
  },
  {
    id: 'umkm-003', slug: 'cafe-ndeso-panjunan', nama: 'Cafe Ndeso Panjunan',
    kategori: 'cafe',
    deskripsi: 'Cafe dengan nuansa pedesaan yang nyaman. Menyajikan kopi lokal, minuman segar, dan camilan tradisional dalam suasana yang santai dan instagramable.',
    alamat: 'Jl. Panjunan No. 78, Kudus', whatsapp: '6281234000003',
    instagram: 'cafendesopanjunan', mapsUrl: 'https://maps.google.com',
    template: 'premium', warnaUtama: '#b45309', featured: false, status: 'published',
    logo: null, banner: null, fotoToko: null,
    shopee: '', tokopedia: '', gofood: 'https://gofood.co.id/cafe-ndeso', grabfood: '', tiktokshop: '', facebook: '',
    produk: [
      { id: 'p1', nama: 'Kopi Arabika Lokal', harga: 15000, deskripsi: 'Kopi arabika pilihan dari petani lokal', foto: null },
      { id: 'p2', nama: 'Es Dawet', harga: 8000, deskripsi: 'Minuman tradisional Jawa yang menyegarkan', foto: null },
    ],
    galeri: [],
    jamOperasional: { senin:'Tutup', selasa:'09.00–22.00', rabu:'09.00–22.00', kamis:'09.00–22.00', jumat:'09.00–23.00', sabtu:'09.00–23.00', minggu:'09.00–22.00' },
    createdAt: '2026-06-10T00:00:00.000Z', updatedAt: '2026-06-25T00:00:00.000Z', publishedAt: '2026-06-25T00:00:00.000Z',
  },
];

function isLocalMode() {
  return !window.APP_CONFIG || window.APP_CONFIG.mode === 'local';
}

function isPublicSubmissionPage() {
  return typeof window !== 'undefined' &&
    window.location &&
    window.location.pathname.indexOf('/public/daftar-umkm.html') !== -1;
}

function normalizePublicSubmission(umkm) {
  if (!isPublicSubmissionPage()) return umkm;
  const now = new Date().toISOString();
  return {
    ...umkm,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
  };
}

const LocalStorageService = {
  init() {
    if (!localStorage.getItem(KEYS.UMKM)) localStorage.setItem(KEYS.UMKM, JSON.stringify(DEFAULT_UMKM));
    if (!localStorage.getItem(KEYS.SETTINGS)) localStorage.setItem(KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    if (!localStorage.getItem(KEYS.CATEGORIES)) localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  },

  getAllUmkm() { return JSON.parse(localStorage.getItem(KEYS.UMKM) || '[]'); },
  getPublishedUmkm() { return this.getAllUmkm().filter(u => u.status === 'published'); },
  getUmkmById(id) { return this.getAllUmkm().find(u => u.id === id) || null; },
  getUmkmBySlug(slug) { return this.getAllUmkm().find(u => u.slug === slug) || null; },
  saveUmkm(data) { localStorage.setItem(KEYS.UMKM, JSON.stringify(data)); },
  createUmkm(umkm) {
    const all = this.getAllUmkm();
    all.unshift(umkm);
    this.saveUmkm(all);
  },
  updateUmkm(id, updates) {
    const all = this.getAllUmkm();
    const idx = all.findIndex(u => u.id === id);
    if (idx === -1) return false;
    all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
    this.saveUmkm(all);
    return all[idx];
  },
  deleteUmkm(id) {
    const all = this.getAllUmkm().filter(u => u.id !== id);
    this.saveUmkm(all);
  },
  publishUmkm(id) {
    return this.updateUmkm(id, { status: 'published', publishedAt: new Date().toISOString() });
  },
  unpublishUmkm(id) {
    return this.updateUmkm(id, { status: 'draft', publishedAt: null });
  },
  getSettings() { return JSON.parse(localStorage.getItem(KEYS.SETTINGS) || 'null') || DEFAULT_SETTINGS; },
  saveSettings(data) {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify({ ...data, updatedAt: new Date().toISOString() }));
  },
  getCategories() { return JSON.parse(localStorage.getItem(KEYS.CATEGORIES) || '[]'); },
  saveCategories(data) { localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(data)); },
  addCategory(cat) {
    const all = this.getCategories();
    all.push(cat);
    this.saveCategories(all);
  },
  deleteCategory(id) {
    this.saveCategories(this.getCategories().filter(c => c.id !== id));
  },
  login(username, password) {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem(KEYS.SESSION, JSON.stringify({ loggedIn: true, at: Date.now() }));
      return true;
    }
    return false;
  },
  logout() { localStorage.removeItem(KEYS.SESSION); },
  isLoggedIn() {
    const s = JSON.parse(localStorage.getItem(KEYS.SESSION) || 'null');
    if (!s || !s.loggedIn) return false;
    if (Date.now() - s.at > 24 * 60 * 60 * 1000) { this.logout(); return false; }
    return true;
  }
};

const GasStorageService = {
  request(action, payload) {
    // TODO: Isi APP_CONFIG.gasUrl dengan Deployment URL Google Apps Script.
    if (!window.APP_CONFIG.gasUrl || window.APP_CONFIG.gasUrl === '__GAS_URL__') {
      throw new Error('APP_CONFIG.gasUrl belum diisi.');
    }

    // TODO: XMLHttpRequest sinkron ini hanya bridge sementara agar API Storage
    // tetap kompatibel. Ganti ke request async saat integrasi GAS benar-benar aktif.
    const xhr = new XMLHttpRequest();
    xhr.open('POST', window.APP_CONFIG.gasUrl, false);
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=utf-8');
    xhr.send(JSON.stringify({ action, payload: payload || {} }));

    if (xhr.status < 200 || xhr.status >= 300) {
      throw new Error('Request GAS gagal: HTTP ' + xhr.status);
    }

    const result = JSON.parse(xhr.responseText || '{}');
    if (!result.ok) throw new Error(result.error || 'Request GAS gagal.');
    return result.data;
  },

  init() { return this.request('initStorage'); },
  getAllUmkm() { return this.request('getAllUmkm'); },
  getPublishedUmkm() { return this.request('getPublishedUmkm'); },
  getUmkmById(id) { return this.request('getUmkmById', { id }); },
  getUmkmBySlug(slug) { return this.request('getUmkmBySlug', { slug }); },
  saveUmkm(data) { return this.request('saveUmkm', { data }); },
  createUmkm(umkm) { return this.request('createUmkm', { umkm }); },
  updateUmkm(id, updates) { return this.request('updateUmkm', { id, updates }); },
  deleteUmkm(id) { return this.request('deleteUmkm', { id }); },
  publishUmkm(id) { return this.request('publishUmkm', { id }); },
  unpublishUmkm(id) { return this.request('unpublishUmkm', { id }); },
  getSettings() { return this.request('getSettings'); },
  saveSettings(data) { return this.request('saveSettings', { data }); },
  getCategories() { return this.request('getCategories'); },
  saveCategories(data) { return this.request('saveCategories', { data }); },
  addCategory(cat) { return this.request('addCategory', { category: cat }); },
  deleteCategory(id) { return this.request('deleteCategory', { id }); },
  login(username, password) { return this.request('login', { username, password }); },
  logout() { return this.request('logout'); },
  isLoggedIn() { return this.request('isLoggedIn'); }
};

const Storage = {
  init() {
    if (isLocalMode()) {
      return LocalStorageService.init();
    }
    return GasStorageService.init();
  },

  // UMKM
  getAllUmkm() {
    if (isLocalMode()) return LocalStorageService.getAllUmkm();
    return GasStorageService.getAllUmkm();
  },
  getPublishedUmkm() {
    if (isLocalMode()) return LocalStorageService.getPublishedUmkm();
    return GasStorageService.getPublishedUmkm();
  },
  getUmkmById(id) {
    if (isLocalMode()) return LocalStorageService.getUmkmById(id);
    return GasStorageService.getUmkmById(id);
  },
  getUmkmBySlug(slug) {
    if (isLocalMode()) return LocalStorageService.getUmkmBySlug(slug);
    return GasStorageService.getUmkmBySlug(slug);
  },
  saveUmkm(data) {
    if (isLocalMode()) return LocalStorageService.saveUmkm(data);
    return GasStorageService.saveUmkm(data);
  },
  createUmkm(umkm) {
    umkm = normalizePublicSubmission(umkm);
    if (isLocalMode()) return LocalStorageService.createUmkm(umkm);
    return GasStorageService.createUmkm(umkm);
  },
  updateUmkm(id, updates) {
    if (isLocalMode()) return LocalStorageService.updateUmkm(id, updates);
    return GasStorageService.updateUmkm(id, updates);
  },
  deleteUmkm(id) {
    if (isLocalMode()) return LocalStorageService.deleteUmkm(id);
    return GasStorageService.deleteUmkm(id);
  },
  publishUmkm(id) {
    if (isLocalMode()) return LocalStorageService.publishUmkm(id);
    return GasStorageService.publishUmkm(id);
  },
  unpublishUmkm(id) {
    if (isLocalMode()) return LocalStorageService.unpublishUmkm(id);
    return GasStorageService.unpublishUmkm(id);
  },

  // Settings
  getSettings() {
    if (isLocalMode()) return LocalStorageService.getSettings();
    return GasStorageService.getSettings();
  },
  saveSettings(data) {
    if (isLocalMode()) return LocalStorageService.saveSettings(data);
    return GasStorageService.saveSettings(data);
  },

  // Categories
  getCategories() {
    if (isLocalMode()) return LocalStorageService.getCategories();
    return GasStorageService.getCategories();
  },
  saveCategories(data) {
    if (isLocalMode()) return LocalStorageService.saveCategories(data);
    return GasStorageService.saveCategories(data);
  },
  addCategory(cat) {
    if (isLocalMode()) return LocalStorageService.addCategory(cat);
    return GasStorageService.addCategory(cat);
  },
  deleteCategory(id) {
    if (isLocalMode()) return LocalStorageService.deleteCategory(id);
    return GasStorageService.deleteCategory(id);
  },

  // Session
  login(username, password) {
    if (isLocalMode()) return LocalStorageService.login(username, password);
    return GasStorageService.login(username, password);
  },
  logout() {
    if (isLocalMode()) return LocalStorageService.logout();
    return GasStorageService.logout();
  },
  isLoggedIn() {
    if (isLocalMode()) return LocalStorageService.isLoggedIn();
    return GasStorageService.isLoggedIn();
  },
  requireAuth() {
    if (!this.isLoggedIn()) { window.location.href = '../admin/index.html'; return false; }
    return true;
  },
};

Storage.init();
