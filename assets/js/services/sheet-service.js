window.SheetService = {
  getAllUmkm() {
    return GASService.request("getAllUmkm");
  },

  getPublishedUmkm() {
    return GASService.request("getPublishedUmkm");
  },

  getUmkmById(id) {
    return GASService.request("getUmkmById", { id });
  },

  getUmkmBySlug(slug) {
    return GASService.request("getUmkmBySlug", { slug });
  },

  saveUmkm(data) {
    return GASService.request("saveUmkm", { data });
  },

  createUmkm(umkm) {
    return GASService.request("createUmkm", { umkm });
  },

  updateUmkm(id, updates) {
    return GASService.request("updateUmkm", { id, updates });
  },

  deleteUmkm(id) {
    return GASService.request("deleteUmkm", { id });
  },

  publishUmkm(id) {
    return GASService.request("publishUmkm", { id });
  },

  unpublishUmkm(id) {
    return GASService.request("unpublishUmkm", { id });
  },

  getSettings() {
    return GASService.request("getSettings");
  },

  saveSettings(data) {
    return GASService.request("saveSettings", { data });
  },

  getCategories() {
    return GASService.request("getCategories");
  },

  saveCategories(data) {
    return GASService.request("saveCategories", { data });
  },

  addCategory(category) {
    return GASService.request("addCategory", { category });
  },

  deleteCategory(id) {
    return GASService.request("deleteCategory", { id });
  }
};
