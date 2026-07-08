// TODO: Isi placeholder setelah resource Google/GitHub dibuat.
const SPREADSHEET_ID = "__SPREADSHEET_ID__";
const DRIVE_FOLDER_ID = "__DRIVE_FOLDER_ID__";
const GITHUB_OWNER = "__OWNER__";
const GITHUB_REPO = "__REPOSITORY__";
const GITHUB_BRANCH = "main";
const GITHUB_TOKEN = "__TOKEN__";

const SHEET_NAMES = {
  UMKM: "umkm",
  SETTINGS: "settings",
  CATEGORIES: "categories"
};

const DEFAULT_ADMIN = {
  username: "admin",
  password: "admin123"
};

const UMKM_FIELDS = [
  "id", "slug", "nama", "kategori", "deskripsi", "alamat", "whatsapp",
  "instagram", "mapsUrl", "template", "warnaUtama", "featured", "status",
  "logo", "banner", "fotoToko", "shopee", "tokopedia", "gofood", "grabfood",
  "tiktokshop", "facebook", "sectionSettings", "produk", "galeri",
  "jamOperasional", "createdAt", "updatedAt", "publishedAt"
];

const SETTINGS_FIELDS = [
  "namaPortal", "deskripsiPortal", "alamat", "whatsapp", "email",
  "instagram", "logoUrl", "warnaUtama", "updatedAt"
];

const CATEGORY_FIELDS = ["id", "nama", "ikon", "urutan"];

const JSON_FIELDS = ["sectionSettings", "produk", "galeri", "jamOperasional"];
