# Smart UMKM Builder Panjunan

Platform digital untuk mengelola dan mempublikasikan profil UMKM di Desa Panjunan, Kudus.
Dibangun sebagai program KKN untuk mendukung digitalisasi ekonomi lokal.

## Cara Membuka

Tidak perlu instalasi apapun. Cukup buka file HTML di browser:

- **Panel Admin** → buka `admin/index.html`
- **Portal Publik** → buka `public/index.html`

Login admin: `admin` / `admin123`

## Fitur

### Panel Admin
- Login sederhana
- Dashboard dengan statistik dan grafik distribusi kategori
- Kelola UMKM: tambah, edit, hapus, publish, unggulan
- Form UMKM lengkap dengan 6 tab (Info, Jam, Foto, Produk, Tampilan, Publish)
- Upload foto: logo, banner, foto toko, galeri, foto produk
- Preview template langsung di browser
- 4 pilihan template: Minimal, Modern, Gallery, Premium
- Warna aksen kustom per UMKM
- Simulasi proses publish
- Pengaturan portal (nama, kontak, deskripsi)
- Kelola kategori UMKM
- Export/Import data JSON
- Reset ke data default

### Portal Publik
- Beranda dengan pencarian dan filter kategori
- Grid UMKM unggulan dan semua UMKM
- Halaman detail UMKM (produk, galeri, jam, kontak, maps)
- Halaman daftar dengan sort dan filter
- Halaman tentang portal dan tim KKN
- Lightbox foto galeri
- Tombol WhatsApp, Instagram, Google Maps langsung

## Struktur Folder

```
smart-umkm-gas/
├── admin/
│   ├── index.html       ← Login admin
│   ├── dashboard.html   ← Dashboard & statistik
│   ├── umkm-list.html   ← Daftar semua UMKM
│   ├── umkm-form.html   ← Form tambah/edit UMKM
│   ├── preview.html     ← Preview template live
│   └── settings.html    ← Pengaturan & kategori
├── public/
│   ├── index.html       ← Beranda portal
│   ├── umkm-list.html   ← Semua UMKM
│   ├── detail.html      ← Detail UMKM
│   └── tentang.html     ← Tentang portal
├── assets/
│   ├── css/
│   │   ├── admin.css    ← Gaya admin panel
│   │   └── public.css   ← Gaya portal publik
│   └── js/
│       ├── storage.js   ← Lapisan data (localStorage)
│       ├── utils.js     ← Fungsi utilitas
│       └── templates.js ← 4 template halaman UMKM
├── data/
│   ├── umkm.json        ← Referensi struktur data (→ Google Sheets)
│   ├── settings.json    ← Referensi pengaturan
│   └── categories.json  ← Referensi kategori
└── uploads/             ← Placeholder (→ Google Drive)
```

## Struktur Data JSON

Format ini dirancang agar mudah dipindahkan ke Google Sheets.
Setiap field menjadi satu kolom di spreadsheet.

```json
{
  "id": "umkm-001",
  "slug": "warung-bu-ani",
  "nama": "Warung Bu Ani",
  "kategori": "kuliner",
  "deskripsi": "...",
  "alamat": "...",
  "whatsapp": "6281234...",
  "instagram": "namaakun",
  "mapsUrl": "https://...",
  "template": "minimal",
  "warnaUtama": "#16a34a",
  "featured": true,
  "status": "published",
  "logo": null,
  "banner": null,
  "produk": [],
  "galeri": [],
  "jamOperasional": { "senin": "08.00-17.00", ... },
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z",
  "publishedAt": "2026-01-01T00:00:00.000Z"
}
```

---

## Roadmap Implementasi Selanjutnya

### Tahap 1 — Google Apps Script (Backend)

Buat Web App di Google Apps Script yang menggantikan `storage.js`:
- `doGet(e)` → baca data dari Sheets
- `doPost(e)` → tulis data ke Sheets
- HMAC token untuk autentikasi admin
- CacheService untuk performa

File: `gas/Code.gs`, `gas/Storage.gs`, `gas/Auth.gs`, `gas/Router.gs`

### Tahap 2 — Google Sheets (Database)

Buat spreadsheet dengan 3 tab:
- Tab `umkm` → data semua UMKM
- Tab `settings` → pengaturan portal
- Tab `categories` → kategori UMKM

Kolom = field JSON di atas. Field array (produk, galeri) disimpan sebagai JSON string.

### Tahap 3 — Google Drive (Penyimpanan Foto)

Buat folder di Drive: `UMKM Panjunan - Uploads/`

Struktur subfolder:
```
uploads/
└── warung-bu-ani/
    ├── logo/
    ├── banner/
    ├── fototoko/
    └── galeri/
```

Upload: frontend konversi file ke base64 → kirim ke GAS → GAS simpan ke Drive → return URL publik.

### Tahap 4 — Publish ke GitHub Pages

Alur publish:
1. Admin klik "Publish" di dashboard
2. GAS generate file `umkm.json` berisi semua UMKM published
3. GAS commit file ke GitHub repository via GitHub API
4. GitHub Actions build ulang halaman statis
5. Website live di `namaanda.github.io/umkm-panjunan`

Konfigurasi yang dibutuhkan:
- GitHub Personal Access Token (disimpan di GAS Script Properties)
- GitHub Repository: `username/umkm-panjunan` (Public)
- GitHub Actions workflow: `.github/workflows/deploy.yml`

### Tahap 5 — Domain Kustom (Opsional)

Hubungkan domain desa (misalnya `umkm.panjunan.desa.id`) ke GitHub Pages melalui:
1. Settings repository → Pages → Custom domain
2. DNS CNAME record ke `namaanda.github.io`

---

## Teknologi

Semua berjalan di browser tanpa server:
- HTML + CSS + JavaScript murni
- localStorage untuk penyimpanan data prototype
- FileReader API untuk upload foto (disimpan sebagai base64)
- Tidak ada npm, tidak ada build step, tidak ada backend

---

## Kontak

Dibuat oleh Tim KKN · Desa Panjunan, Kota Kudus, Jawa Tengah · 2026
