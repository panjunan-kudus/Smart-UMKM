# Migration Guide Smart UMKM Gas

Project saat ini tetap berjalan memakai `localStorage` karena `APP_CONFIG.mode` masih bernilai `"local"`. Jangan ubah mode sebelum Google Sheets, Google Drive, GitHub, dan Google Apps Script siap.

## Status Awal

- Prototype tetap aktif dengan `localStorage`.
- UI, HTML, CSS, struktur data, nama file lama, dan nama function `Storage` tidak diubah.
- Folder `gas/` sudah siap dipindahkan ke Google Apps Script.
- File service di `assets/js/services/` sudah siap memakai Deployment URL GAS.
- Semua konfigurasi masih memakai placeholder.

## Langkah 1 - Buat Google Sheet

1. Buat Google Sheet baru.
2. Salin Spreadsheet ID dari URL Google Sheet.
3. Buka `gas/Config.gs`.
4. Ganti:

```js
const SPREADSHEET_ID = "__SPREADSHEET_ID__";
```

menjadi ID Google Sheet Anda.

GAS akan membuat atau memakai tab berikut:

- `umkm`
- `settings`
- `categories`

Header kolom dibuat otomatis sesuai struktur data project.

## Langkah 2 - Buat Google Drive Folder

1. Buat folder Google Drive untuk upload foto.
2. Salin Folder ID dari URL folder Drive.
3. Buka `gas/Config.gs`.
4. Ganti:

```js
const DRIVE_FOLDER_ID = "__DRIVE_FOLDER_ID__";
```

menjadi Folder ID Anda.

Folder upload akan dibuat otomatis per slug UMKM dan field foto, misalnya:

```text
uploads/
warung-bu-ani/
logo/
banner/
images/
```

## Langkah 3 - Buat Repository GitHub

1. Buat repository GitHub baru.
2. Tentukan owner, nama repository, dan branch.
3. Buat GitHub token yang memiliki izin update repository.
4. Buka `gas/Config.gs`.
5. Ganti:

```js
const GITHUB_OWNER = "__OWNER__";
const GITHUB_REPO = "__REPOSITORY__";
const GITHUB_BRANCH = "main";
const GITHUB_TOKEN = "__TOKEN__";
```

menjadi data repository Anda.

## Langkah 4 - Buat Google Apps Script

1. Buka Google Apps Script.
2. Buat project baru.
3. Copy seluruh isi folder `gas/` ke Apps Script:

```text
gas/Code.gs
gas/Storage.gs
gas/Drive.gs
gas/Github.gs
gas/Publish.gs
gas/Config.gs
gas/Utils.gs
gas/appsscript.json
```

4. Pastikan semua placeholder di `Config.gs` sudah diisi.
5. Deploy sebagai Web App.
6. Pilih execute as user deploying.
7. Pilih access sesuai kebutuhan deploy Anda.
8. Copy Deployment URL.

## Langkah 5 - Isi URL GAS di Frontend

Buka `config.js`, lalu ganti:

```js
gasUrl: "__GAS_URL__"
```

menjadi Deployment URL Google Apps Script.

Jika Anda memakai `assets/js/gas.js` atau service secara langsung, pastikan placeholder URL di file terkait juga sama:

```js
const GAS_URL = "__GAS_URL__";
```

## Langkah 6 - Aktifkan Mode GAS

Setelah Sheet, Drive, GitHub, dan GAS sudah siap, ubah:

```js
mode: "local"
```

menjadi:

```js
mode: "gas"
```

Selesai. Setelah itu fungsi `Storage` akan memakai GAS dan Google Sheets tanpa mengubah nama function di UI.

## Konfigurasi Yang Wajib Diisi

| File | Placeholder | Isi Dengan |
| --- | --- | --- |
| `gas/Config.gs` | `__SPREADSHEET_ID__` | Spreadsheet ID |
| `gas/Config.gs` | `__DRIVE_FOLDER_ID__` | Google Drive Folder ID |
| `gas/Config.gs` | `__OWNER__` | Username atau organisasi GitHub |
| `gas/Config.gs` | `__REPOSITORY__` | Nama repository GitHub |
| `gas/Config.gs` | `__TOKEN__` | GitHub Personal Access Token |
| `config.js` | `__GAS_URL__` | Deployment URL Apps Script |
| `config.js` | `__REPOSITORY__` | Nama repository GitHub |

## Urutan Final

1. Buat Google Sheet.
2. Isi Spreadsheet ID.
3. Buat Drive Folder.
4. Isi Folder ID.
5. Buat Repository GitHub.
6. Isi owner, repository, branch, dan token.
7. Buat Apps Script.
8. Copy seluruh folder `gas`.
9. Deploy Apps Script.
10. Copy Deployment URL.
11. Isi `APP_CONFIG.gasUrl`.
12. Ubah `mode: "gas"`.
13. Selesai.
