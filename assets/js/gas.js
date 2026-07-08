function gasRequest(action, payload) {
  if (!window.APP_CONFIG || window.APP_CONFIG.mode === "local") {
    return Promise.resolve({ ok: true, local: true, action, data: payload || null });
  }

  // TODO: Pastikan APP_CONFIG.gasUrl berisi Deployment URL Google Apps Script.
  if (!window.APP_CONFIG.gasUrl || window.APP_CONFIG.gasUrl === "__GAS_URL__") {
    return Promise.reject(new Error("APP_CONFIG.gasUrl belum diisi."));
  }

  return fetch(window.APP_CONFIG.gasUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, payload: payload || {} })
  })
    .then(response => response.json())
    .then(result => {
      if (!result.ok) throw new Error(result.error || "Request GAS gagal.");
      return result.data;
    });
}

window.GAS = {
  getAllUmkm() { return gasRequest("getAllUmkm"); },
  getPublishedUmkm() { return gasRequest("getPublishedUmkm"); },
  getUmkmById(id) { return gasRequest("getUmkmById", { id }); },
  getUmkmBySlug(slug) { return gasRequest("getUmkmBySlug", { slug }); },
  saveUmkm(data) { return gasRequest("saveUmkm", { data }); },
  createUmkm(umkm) { return gasRequest("createUmkm", { umkm }); },
  updateUmkm(id, updates) { return gasRequest("updateUmkm", { id, updates }); },
  deleteUmkm(id) { return gasRequest("deleteUmkm", { id }); },
  publishUmkm(id) { return gasRequest("publishUmkm", { id }); },
  unpublishUmkm(id) { return gasRequest("unpublishUmkm", { id }); },
  getSettings() { return gasRequest("getSettings"); },
  saveSettings(data) { return gasRequest("saveSettings", { data }); },
  getCategories() { return gasRequest("getCategories"); },
  saveCategories(data) { return gasRequest("saveCategories", { data }); },
  addCategory(category) { return gasRequest("addCategory", { category }); },
  deleteCategory(id) { return gasRequest("deleteCategory", { id }); },
  uploadImage(fileData, meta) { return gasRequest("uploadImage", { fileData, meta: meta || {} }); },
  login(username, password) { return gasRequest("login", { username, password }); },
  logout() { return gasRequest("logout"); },
  publishAll() { return gasRequest("publishAll"); }
};
