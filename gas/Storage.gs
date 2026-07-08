function initStorage() {
  getOrCreateSheet(SHEET_NAMES.UMKM, UMKM_FIELDS);
  getOrCreateSheet(SHEET_NAMES.SETTINGS, SETTINGS_FIELDS);
  getOrCreateSheet(SHEET_NAMES.CATEGORIES, CATEGORY_FIELDS);
  return { initialized: true };
}

function getAllUmkm() {
  var sheet = getOrCreateSheet(SHEET_NAMES.UMKM, UMKM_FIELDS);
  return sheetToObjects(sheet, UMKM_FIELDS);
}

function getPublishedUmkm() {
  return getAllUmkm().filter(function(item) {
    return item.status === "published";
  });
}

function getUmkmById(id) {
  return getAllUmkm().filter(function(item) {
    return item.id === id;
  })[0] || null;
}

function getUmkmBySlug(slug) {
  return getAllUmkm().filter(function(item) {
    return item.slug === slug;
  })[0] || null;
}

function saveUmkm(data) {
  var sheet = getOrCreateSheet(SHEET_NAMES.UMKM, UMKM_FIELDS);
  sheet.clearContents();
  sheet.getRange(1, 1, 1, UMKM_FIELDS.length).setValues([UMKM_FIELDS]);
  if (data && data.length) {
    sheet.getRange(2, 1, data.length, UMKM_FIELDS.length).setValues(data.map(function(item) {
      return objectToRow(item, UMKM_FIELDS);
    }));
  }
  return data || [];
}

function createUmkm(umkm) {
  var all = getAllUmkm();
  all.unshift(umkm);
  saveUmkm(all);
  return umkm;
}

function updateUmkm(id, updates) {
  var sheet = getOrCreateSheet(SHEET_NAMES.UMKM, UMKM_FIELDS);
  var row = findRowById(sheet, UMKM_FIELDS, id);
  if (row === -1) return false;
  var current = rowToObject(sheet.getRange(row, 1, 1, UMKM_FIELDS.length).getValues()[0], UMKM_FIELDS);
  var next = Object.assign({}, current, updates || {}, { updatedAt: nowIso() });
  sheet.getRange(row, 1, 1, UMKM_FIELDS.length).setValues([objectToRow(next, UMKM_FIELDS)]);
  return next;
}

function deleteUmkm(id) {
  var sheet = getOrCreateSheet(SHEET_NAMES.UMKM, UMKM_FIELDS);
  var row = findRowById(sheet, UMKM_FIELDS, id);
  if (row !== -1) sheet.deleteRow(row);
  return true;
}

function publishUmkm(id) {
  return updateUmkm(id, { status: "published", publishedAt: nowIso() });
}

function unpublishUmkm(id) {
  return updateUmkm(id, { status: "draft", publishedAt: null });
}

function getSettings() {
  var sheet = getOrCreateSheet(SHEET_NAMES.SETTINGS, SETTINGS_FIELDS);
  var data = sheetToObjects(sheet, SETTINGS_FIELDS);
  return data[0] || {};
}

function saveSettings(data) {
  var next = Object.assign({}, data || {}, { updatedAt: nowIso() });
  var sheet = getOrCreateSheet(SHEET_NAMES.SETTINGS, SETTINGS_FIELDS);
  sheet.clearContents();
  sheet.getRange(1, 1, 1, SETTINGS_FIELDS.length).setValues([SETTINGS_FIELDS]);
  sheet.getRange(2, 1, 1, SETTINGS_FIELDS.length).setValues([objectToRow(next, SETTINGS_FIELDS)]);
  return next;
}

function getCategories() {
  var sheet = getOrCreateSheet(SHEET_NAMES.CATEGORIES, CATEGORY_FIELDS);
  return sheetToObjects(sheet, CATEGORY_FIELDS);
}

function saveCategories(data) {
  var sheet = getOrCreateSheet(SHEET_NAMES.CATEGORIES, CATEGORY_FIELDS);
  sheet.clearContents();
  sheet.getRange(1, 1, 1, CATEGORY_FIELDS.length).setValues([CATEGORY_FIELDS]);
  if (data && data.length) {
    sheet.getRange(2, 1, data.length, CATEGORY_FIELDS.length).setValues(data.map(function(item) {
      return objectToRow(item, CATEGORY_FIELDS);
    }));
  }
  return data || [];
}

function addCategory(category) {
  var all = getCategories();
  all.push(category);
  saveCategories(all);
  return category;
}

function deleteCategory(id) {
  saveCategories(getCategories().filter(function(category) {
    return category.id !== id;
  }));
  return true;
}

function login(username, password) {
  return username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password;
}

function logout() {
  return true;
}

function isLoggedIn() {
  return true;
}
