// TODO: Ganti "__GAS_URL__" dengan Deployment URL Google Apps Script.
const GAS_URL = "__GAS_URL__";

window.GASService = {
  getUrl() {
    return (window.APP_CONFIG && window.APP_CONFIG.gasUrl) || GAS_URL;
  },

  isLocalMode() {
    return !window.APP_CONFIG || window.APP_CONFIG.mode === "local";
  },

  async request(action, payload) {
    if (this.isLocalMode()) {
      return { ok: true, local: true, action, data: payload || null };
    }

    const url = this.getUrl();
    if (!url || url === "__GAS_URL__") {
      throw new Error("TODO: APP_CONFIG.gasUrl belum diisi.");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, payload: payload || {} })
    });

    const result = await response.json();
    if (!result.ok) throw new Error(result.error || "Request GAS gagal.");
    return result.data;
  },

  requestSync(action, payload) {
    const url = this.getUrl();
    if (!url || url === "__GAS_URL__") {
      throw new Error("TODO: APP_CONFIG.gasUrl belum diisi.");
    }

    // TODO: XMLHttpRequest sinkron ini hanya bridge sementara agar API Storage
    // tetap kompatibel. Ganti ke request async saat integrasi GAS benar-benar aktif.
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=utf-8");
    xhr.send(JSON.stringify({ action, payload: payload || {} }));

    if (xhr.status < 200 || xhr.status >= 300) {
      throw new Error("Request GAS gagal: HTTP " + xhr.status);
    }

    const result = JSON.parse(xhr.responseText || "{}");
    if (!result.ok) throw new Error(result.error || "Request GAS gagal.");
    return result.data;
  }
};
