/**
 * templates.js — 4 Template Halaman Publik UMKM
 *
 * Setiap fungsi menerima objek UMKM dan mengembalikan string HTML lengkap
 * yang bisa dirender di iframe.srcdoc atau halaman detail.html.
 */

const Templates = {
  render(umkm) {
    const fn = {
      minimal: this.minimal,
      modern: this.modern,
      gallery: this.gallery,
      premium: this.premium,
    }[umkm.template] || this.minimal;
    return fn.call(this, umkm);
  },

  _sharedHead(umkm, extraCss = '') {
    const c = umkm.warnaUtama || '#16a34a';
    return `
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',system-ui,sans-serif;color:#111827;background:#f8fafc;line-height:1.6}
a{color:inherit;text-decoration:none}img{max-width:100%;display:block}
:root{--c:${c};--cl:${c}22;--cd:${c};--bg:#f8fafc;--white:#fff;--border:#e5e7eb;--t2:#6b7280;--t3:#9ca3af}
${extraCss}
</style>`;
  },

  _sharedScripts() {
    return `
<script>
function openLightbox(src){
  const lb=document.createElement('div');
  lb.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:999;display:flex;align-items:center;justify-content:center;cursor:pointer';
  lb.innerHTML='<img src="'+src+'" style="max-width:90vw;max-height:90vh;object-fit:contain;border-radius:8px">';
  lb.onclick=()=>lb.remove();document.body.appendChild(lb);
}
<\/script>`;
  },

  _hariIni() {
    return ['minggu','senin','selasa','rabu','kamis','jumat','sabtu'][new Date().getDay()];
  },

  _jamRows(jam) {
    if (!jam) return '';
    const hari = ['senin','selasa','rabu','kamis','jumat','sabtu','minggu'];
    const label = {senin:'Senin',selasa:'Selasa',rabu:'Rabu',kamis:'Kamis',jumat:'Jumat',sabtu:'Sabtu',minggu:'Minggu'};
    const today = this._hariIni();
    return hari.map(h => {
      const val = jam[h] || '—';
      const isTutup = val.toLowerCase() === 'tutup';
      const isToday = h === today;
      return `<tr${isToday?' style="color:var(--c);font-weight:600"':''}>
        <td style="padding:5px 0;font-weight:600;width:80px">${label[h]}</td>
        <td style="padding:5px 0;color:${isTutup?'#ef4444':'var(--t2)'}">${val}</td>
      </tr>`;
    }).join('');
  },

  _produkCards(produk) {
    if (!produk || !produk.length) return '<p style="color:var(--t2);font-size:14px">Belum ada produk.</p>';
    return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px">` +
      produk.map(p => `
        <div style="background:#fff;border:1px solid var(--border);border-radius:10px;overflow:hidden">
          ${p.foto ? `<img src="${p.foto}" style="width:100%;height:130px;object-fit:cover">` :
            `<div style="height:130px;background:var(--cl);display:flex;align-items:center;justify-content:center;font-size:36px">🛍️</div>`}
          <div style="padding:12px">
            <div style="font-size:14px;font-weight:600;margin-bottom:4px">${p.nama}</div>
            <div style="font-size:15px;font-weight:700;color:var(--c)">Rp ${Number(p.harga||0).toLocaleString('id-ID')}</div>
            ${p.deskripsi ? `<div style="font-size:12px;color:var(--t2);margin-top:4px">${p.deskripsi}</div>` : ''}
          </div>
        </div>`).join('') + `</div>`;
  },

  _galeriGrid(galeri) {
    if (!galeri || !galeri.length) return '';
    return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">` +
      galeri.map(g => `<img src="${g.url||g}" onclick="openLightbox('${g.url||g}')" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;cursor:pointer">`).join('') +
      `</div>`;
  },

  /* ---- Marketplace & Sosial Links ---- */
  _marketplaceLinks(umkm) {
    const links = [];
    if (umkm.whatsapp) {
      const wa = (Utils && Utils.waLink) ? Utils.waLink(umkm.whatsapp) : `https://wa.me/${umkm.whatsapp}`;
      links.push({ href: wa, bg: '#25d366', icon: '💬', label: 'WhatsApp' });
    }
    if (umkm.gofood)    links.push({ href: umkm.gofood,    bg: '#e53e00', icon: '🛵', label: 'GoFood' });
    if (umkm.grabfood)  links.push({ href: umkm.grabfood,  bg: '#00b14f', icon: '🟢', label: 'GrabFood' });
    if (umkm.shopee)    links.push({ href: umkm.shopee,    bg: '#f05d2f', icon: '🛒', label: 'Shopee' });
    if (umkm.tokopedia) links.push({ href: umkm.tokopedia, bg: '#42b549', icon: '🛍️', label: 'Tokopedia' });
    if (umkm.tiktokshop)links.push({ href: umkm.tiktokshop,bg: '#010101', icon: '🎵', label: 'TikTok Shop' });
    if (umkm.instagram) {
      const ig = (Utils && Utils.igLink) ? Utils.igLink(umkm.instagram) : `https://instagram.com/${umkm.instagram.replace('@','')}`;
      links.push({ href: ig, bg: 'linear-gradient(45deg,#e1306c,#f77737)', icon: '📸', label: 'Instagram' });
    }
    if (umkm.facebook)  links.push({ href: umkm.facebook,  bg: '#1877f2', icon: '👍', label: 'Facebook' });
    if (umkm.mapsUrl)   links.push({ href: umkm.mapsUrl,   bg: '#4285f4', icon: '🗺️', label: 'Google Maps' });
    if (!links.length) return '<p style="color:var(--t2);font-size:14px">Belum ada kontak atau link tersedia.</p>';
    return `<div style="display:flex;flex-direction:column;gap:10px">` +
      links.map(l => `<a href="${l.href}" target="_blank"
        style="display:flex;align-items:center;gap:10px;padding:13px 16px;border-radius:12px;background:${l.bg};color:#fff;font-weight:700;font-size:14px;text-decoration:none">
        <span style="font-size:18px">${l.icon}</span> ${l.label}
      </a>`).join('') + `</div>`;
  },

  /* ---- Marketplace Chips (compact row) ---- */
  _marketplaceChips(umkm) {
    const chips = [];
    if (umkm.shopee)     chips.push({ href: umkm.shopee,     bg: '#f05d2f', icon: '🛒', label: 'Shopee' });
    if (umkm.tokopedia)  chips.push({ href: umkm.tokopedia,  bg: '#42b549', icon: '🛍️', label: 'Tokopedia' });
    if (umkm.gofood)     chips.push({ href: umkm.gofood,     bg: '#e53e00', icon: '🛵', label: 'GoFood' });
    if (umkm.grabfood)   chips.push({ href: umkm.grabfood,   bg: '#00b14f', icon: '🟢', label: 'GrabFood' });
    if (umkm.tiktokshop) chips.push({ href: umkm.tiktokshop, bg: '#010101', icon: '🎵', label: 'TikTok' });
    if (umkm.facebook)   chips.push({ href: umkm.facebook,   bg: '#1877f2', icon: '👍', label: 'Facebook' });
    if (!chips.length) return '';
    return `<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:8px">` +
      chips.map(c => `<a href="${c.href}" target="_blank"
        style="display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:20px;background:${c.bg};color:#fff;font-size:12px;font-weight:700;text-decoration:none">
        ${c.icon} ${c.label}
      </a>`).join('') + `</div>`;
  },

  /* ---- Section visibility helper ---- */
  _show(umkm, key) {
    const s = umkm.sectionSettings;
    return !s || s[key] !== false;
  },

  // ====================================================================
  // TEMPLATE 1: MINIMAL
  // ====================================================================
  minimal(umkm) {
    const c = umkm.warnaUtama || '#16a34a';
    return `<!DOCTYPE html><html lang="id"><head>
${this._sharedHead(umkm, `
  .hero{height:240px;background:linear-gradient(135deg,${c},${c}dd);position:relative;overflow:visible;display:flex;align-items:flex-end}
  .hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.3}
  .hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.2),transparent 60%)}
  .detail-header{display:flex;gap:20px;align-items:flex-start;margin-top:12px;margin-bottom:24px;padding:0 24px}
  .detail-logo{width:100px;height:100px;border-radius:20px;border:4px solid #fff;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.2);flex-shrink:0;display:flex;align-items:center;justify-content:center;overflow:hidden}
  .detail-logo img{width:100%;height:100%;object-fit:contain}
  .detail-meta{flex:1}
  .breadcrumb{font-size:12px;color:var(--t2);margin-bottom:4px}
  .kategori{display:inline-block;background:var(--cl);color:var(--c);padding:4px 12px;border-radius:16px;font-size:12px;font-weight:600;margin-bottom:6px}
  h1{font-size:28px;font-weight:800;margin:0;color:var(--text,#111)}
  .detail-layout{max-width:1000px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:1fr 320px;gap:24px}
  .detail-section{margin-bottom:24px}
  .detail-section h2{font-size:16px;font-weight:700;margin-bottom:16px;color:var(--text,#111)}
  .detail-section p{color:var(--t2);line-height:1.8;font-size:15px}
  .info-card{background:#f9fafb;border-radius:12px;padding:18px;margin-bottom:16px}
  .info-card h3{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--t2);margin-bottom:14px}
  .info-row{display:flex;gap:8px;font-size:14px;color:var(--t2);margin-bottom:10px}
  .info-icon{flex-shrink:0}
  @media(max-width:800px){.detail-layout{grid-template-columns:1fr}.detail-header{flex-wrap:wrap}}
`)}
<title>${umkm.nama}</title></head><body>

<div class="hero">
  ${umkm.banner ? `<img src="${umkm.banner}" class="hero-img" alt="banner">` : ''}
  <div class="hero-overlay"></div>
</div>

<div class="detail-header">
  <div class="detail-logo">
    ${umkm.logo
      ? `<img src="${umkm.logo}" alt="logo">`
      : `<div style="width:100%;height:100%;background:${c}22;color:${c};display:flex;align-items:center;justify-content:center;font-size:48px">${umkm.nama.charAt(0)}</div>`}
  </div>
  <div class="detail-meta">
    <div class="breadcrumb">Portal UMKM Panjunan / ${umkm.nama}</div>
    <div class="kategori">${umkm.kategori}</div>
    <h1>${umkm.nama}</h1>
  </div>
</div>

<div class="detail-layout">
  <div class="detail-main">
    ${this._show(umkm,'tentang') ? `
    <div class="detail-section">
      <h2>📖 Tentang Kami</h2>
      <p>${umkm.deskripsi || 'Tidak ada deskripsi.'}</p>
    </div>` : ''}

    ${this._show(umkm,'produk') && umkm.produk && umkm.produk.length ? `
    <div class="detail-section">
      <h2>🛍️ Produk Kami</h2>
      ${this._produkCards(umkm.produk)}
    </div>` : ''}

    ${this._show(umkm,'galeri') && umkm.galeri && umkm.galeri.length ? `
    <div class="detail-section">
      <h2>📸 Galeri Foto</h2>
      ${this._galeriGrid(umkm.galeri)}
    </div>` : ''}
  </div>

  <div class="detail-sidebar">
    ${this._show(umkm,'kontak') ? `
    <div class="info-card">
      <h3>Kontak & Sosial</h3>
      ${this._marketplaceLinks(umkm)}
    </div>` : ''}

    ${umkm.alamat ? `
    <div class="info-card">
      <h3>Lokasi</h3>
      <div class="info-row"><span class="info-icon">📍</span><span class="info-val">${umkm.alamat}</span></div>
    </div>` : ''}

    ${this._show(umkm,'jam') && umkm.jamOperasional && Object.keys(umkm.jamOperasional).length ? `
    <div class="info-card">
      <h3>Jam Operasional</h3>
      <table class="jam-table" style="width:100%;font-size:13px"><tbody>${this._jamRows(umkm.jamOperasional)}</tbody></table>
    </div>` : ''}
  </div>
</div>

${this._sharedScripts()}
</body></html>`;
  },

  // ====================================================================
  // TEMPLATE 2: MODERN
  // ====================================================================
  modern(umkm) {
    const c = umkm.warnaUtama || '#16a34a';
    return `<!DOCTYPE html><html lang="id"><head>
${this._sharedHead(umkm, `
  body{background:#f3f4f6}
  .topbar{background:var(--c);color:#fff;padding:14px 24px;display:flex;align-items:center;gap:14px}
  .topbar h1{font-size:20px;font-weight:800}
  .topbar .kat{font-size:12px;opacity:.8;background:rgba(255,255,255,.2);padding:3px 10px;border-radius:20px}
  .layout{max-width:900px;margin:0 auto;padding:24px;display:grid;grid-template-columns:1fr 280px;gap:20px}
  .card{background:#fff;border-radius:14px;border:1px solid var(--border);overflow:hidden;margin-bottom:16px}
  .card-h{padding:16px 20px;border-bottom:1px solid var(--border);font-weight:700;font-size:15px;color:var(--c);display:flex;align-items:center;gap:8px}
  .card-b{padding:20px}
  @media(max-width:700px){.layout{grid-template-columns:1fr}}
`)}
<title>${umkm.nama}</title></head><body>

<div class="topbar">
  ${umkm.logo
    ? `<img src="${umkm.logo}" style="width:52px;height:52px;border-radius:12px;border:2px solid rgba(255,255,255,.4);object-fit:contain;background:rgba(255,255,255,.2)">`
    : `<div style="width:52px;height:52px;border-radius:12px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:26px">${umkm.nama.charAt(0)}</div>`}
  <div>
    <h1>${umkm.nama}</h1>
    <span class="kat">${umkm.kategori}</span>
  </div>
</div>

${umkm.banner ? `<img src="${umkm.banner}" style="width:100%;height:240px;object-fit:cover">` : ''}

<div class="layout">
  <div class="main">
    ${this._show(umkm,'tentang') ? `
    <div class="card">
      <div class="card-h">📖 Tentang Kami</div>
      <div class="card-b"><p style="color:var(--t2);line-height:1.8;font-size:14px">${umkm.deskripsi || 'Tidak ada deskripsi.'}</p></div>
    </div>` : ''}

    ${this._show(umkm,'produk') && umkm.produk && umkm.produk.length ? `
    <div class="card">
      <div class="card-h">🛍️ Produk Kami</div>
      <div class="card-b">${this._produkCards(umkm.produk)}</div>
    </div>` : ''}

    ${this._show(umkm,'galeri') && umkm.galeri && umkm.galeri.length ? `
    <div class="card">
      <div class="card-h">📸 Galeri</div>
      <div class="card-b">${this._galeriGrid(umkm.galeri)}</div>
    </div>` : ''}
  </div>

  <div class="sidebar">
    ${this._show(umkm,'kontak') ? `
    <div class="card">
      <div style="padding:16px 20px;border-bottom:1px solid var(--border);font-weight:700;font-size:13px;color:var(--t2);text-transform:uppercase;letter-spacing:.5px">Kontak & Pesan</div>
      <div style="padding:16px">
        ${umkm.alamat ? `<div style="display:flex;gap:8px;margin-bottom:14px;font-size:13px;color:var(--t2)"><span>📍</span>${umkm.alamat}</div>` : ''}
        ${this._marketplaceLinks(umkm)}
      </div>
    </div>` : ''}

    ${this._show(umkm,'jam') && umkm.jamOperasional && Object.keys(umkm.jamOperasional).length ? `
    <div class="card">
      <div style="padding:16px 20px;border-bottom:1px solid var(--border);font-weight:700;font-size:13px;color:var(--t2);text-transform:uppercase;letter-spacing:.5px">Jam Buka</div>
      <div style="padding:16px">
        <table style="width:100%;font-size:13px"><tbody>${this._jamRows(umkm.jamOperasional)}</tbody></table>
      </div>
    </div>` : ''}
  </div>
</div>
${this._sharedScripts()}
</body></html>`;
  },

  // ====================================================================
  // TEMPLATE 3: GALLERY
  // ====================================================================
  gallery(umkm) {
    const c = umkm.warnaUtama || '#16a34a';
    return `<!DOCTYPE html><html lang="id"><head>
${this._sharedHead(umkm, `
  .cover{height:280px;position:relative;overflow:hidden;background:${c}}
  .cover img{width:100%;height:100%;object-fit:cover}
  .cover-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.6),transparent);display:flex;align-items:flex-end;padding:24px}
  .cover-info{color:#fff}
  .cover-info h1{font-size:28px;font-weight:800;margin-bottom:6px}
  .kat-badge{background:rgba(255,255,255,.25);backdrop-filter:blur(4px);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;display:inline-block}
  .container{max-width:800px;margin:0 auto;padding:0 20px}
  .tabs-nav{display:flex;background:#fff;border-bottom:2px solid var(--border);position:sticky;top:0;z-index:10}
  .tab{flex:1;padding:14px;text-align:center;font-size:13px;font-weight:600;color:var(--t2);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-2px}
  .tab.on{color:var(--c);border-bottom-color:var(--c)}
  .tab-pane{display:none;padding:24px 0}
  .tab-pane.on{display:block}
  .masonry{columns:2;gap:10px}
  .masonry img{width:100%;border-radius:8px;margin-bottom:10px;cursor:pointer;break-inside:avoid}
  @media(max-width:600px){.container{padding:0 16px}.masonry{columns:1}}
`)}
<title>${umkm.nama}</title></head><body>

<div class="cover">
  ${umkm.banner ? `<img src="${umkm.banner}">` : `<div style="width:100%;height:100%;background:${c}22;display:flex;align-items:center;justify-content:center;font-size:80px">🏪</div>`}
  <div class="cover-overlay">
    <div class="cover-info">
      ${umkm.logo ? `<img src="${umkm.logo}" style="width:60px;height:60px;border-radius:12px;border:2px solid rgba(255,255,255,.5);margin-bottom:10px;object-fit:contain;background:rgba(255,255,255,.2)">` : ''}
      <h1>${umkm.nama}</h1>
      <span class="kat-badge">${umkm.kategori}</span>
    </div>
  </div>
</div>

<div class="tabs-nav">
  <button class="tab on" onclick="switchTab('info',this)">Info</button>
  <button class="tab" onclick="switchTab('produk',this)">Produk</button>
  <button class="tab" onclick="switchTab('galeri',this)">Galeri</button>
  <button class="tab" onclick="switchTab('kontak',this)">Kontak</button>
</div>

<div class="container">
  <div id="tab-info" class="tab-pane on">
    ${this._show(umkm,'tentang') ? `<p style="color:var(--t2);line-height:1.8;font-size:15px;margin-bottom:20px">${umkm.deskripsi || 'Tidak ada deskripsi.'}</p>` : ''}
    ${this._show(umkm,'jam') && umkm.jamOperasional && Object.keys(umkm.jamOperasional).length ? `
    <h2 style="font-size:16px;font-weight:700;margin-bottom:12px;color:var(--c)">⏰ Jam Operasional</h2>
    <table style="width:100%;font-size:14px"><tbody>${this._jamRows(umkm.jamOperasional)}</tbody></table>` : ''}
  </div>

  <div id="tab-produk" class="tab-pane">
    ${this._show(umkm,'produk') ? this._produkCards(umkm.produk) : '<p style="color:var(--t2);text-align:center;padding:40px 0">Seksi produk tidak ditampilkan.</p>'}
  </div>

  <div id="tab-galeri" class="tab-pane">
    ${this._show(umkm,'galeri') && umkm.galeri && umkm.galeri.length
      ? `<div class="masonry">${umkm.galeri.map(g=>`<img src="${g.url||g}" onclick="openLightbox('${g.url||g}')">`).join('')}</div>`
      : `<p style="color:var(--t2);text-align:center;padding:40px 0">Belum ada foto di galeri.</p>`}
  </div>

  <div id="tab-kontak" class="tab-pane">
    ${this._show(umkm,'kontak') ? `
    ${umkm.alamat ? `<div style="display:flex;gap:10px;margin-bottom:20px;font-size:14px;color:var(--t2);background:#f3f4f6;padding:14px;border-radius:10px"><span>📍</span>${umkm.alamat}</div>` : ''}
    ${this._marketplaceLinks(umkm)}` : '<p style="color:var(--t2);text-align:center;padding:40px 0">Informasi kontak tidak ditampilkan.</p>'}
  </div>

  <div style="padding:16px 0;text-align:center;font-size:12px;color:var(--t3)">Portal UMKM Panjunan · Kudus</div>
</div>

<script>
function switchTab(id,el){
  document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));
  document.getElementById('tab-'+id).classList.add('on');
  el.classList.add('on');
}
<\/script>
${this._sharedScripts()}
</body></html>`;
  },

  // ====================================================================
  // TEMPLATE 4: PREMIUM
  // ====================================================================
  premium(umkm) {
    const c = umkm.warnaUtama || '#b45309';
    return `<!DOCTYPE html><html lang="id"><head>
${this._sharedHead(umkm, `
  body{background:#0f172a;color:#e2e8f0}
  .hero{min-height:320px;position:relative;overflow:hidden;display:flex;align-items:flex-end}
  .hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,#1e293b,#0f172a)}
  .hero-img{position:absolute;inset:0;object-fit:cover;width:100%;height:100%;opacity:.35}
  .hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(15,23,42,.9),rgba(15,23,42,.3))}
  .hero-content{position:relative;padding:48px 32px 40px;max-width:800px;margin:0 auto;width:100%}
  .accent{color:${c};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px}
  h1{font-size:clamp(28px,5vw,44px);font-weight:800;line-height:1.1;margin-bottom:12px;color:#fff}
  .kat{display:inline-flex;align-items:center;background:${c}33;border:1px solid ${c}66;color:${c};padding:4px 14px;border-radius:20px;font-size:12px;font-weight:600}
  .section{max-width:800px;margin:0 auto;padding:40px 32px;border-bottom:1px solid rgba(255,255,255,.08)}
  .section h2{font-size:18px;font-weight:700;color:#fff;margin-bottom:20px;display:flex;align-items:center;gap:8px}
  .section h2::after{content:'';flex:1;height:1px;background:${c}66;margin-left:12px}
  p{color:#94a3b8;line-height:1.8;font-size:15px}
  .produk-card{background:#1e293b;border:1px solid rgba(255,255,255,.1);border-radius:12px;overflow:hidden}
  .galeri-dark{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
  .galeri-dark img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;cursor:pointer;filter:brightness(.85);transition:filter .2s}
  .galeri-dark img:hover{filter:brightness(1)}
  .mkt-link{display:flex;align-items:center;gap:10px;padding:13px 16px;border-radius:12px;color:#fff;font-weight:700;font-size:14px;text-decoration:none;margin-bottom:8px}
  @media(max-width:600px){.hero-content,.section{padding-left:20px;padding-right:20px}.galeri-dark{grid-template-columns:repeat(2,1fr)}}
`)}
<title>${umkm.nama}</title></head><body>

<div class="hero">
  <div class="hero-bg"></div>
  ${umkm.banner ? `<img class="hero-img" src="${umkm.banner}">` : ''}
  <div class="hero-overlay"></div>
  <div class="hero-content">
    ${umkm.logo
      ? `<img src="${umkm.logo}" style="width:70px;height:70px;border-radius:14px;border:2px solid ${c}66;margin-bottom:16px;object-fit:contain;background:rgba(255,255,255,.1)">`
      : `<div style="width:70px;height:70px;border-radius:14px;background:${c}33;border:2px solid ${c}66;display:flex;align-items:center;justify-content:center;font-size:32px;margin-bottom:16px">${umkm.nama.charAt(0)}</div>`}
    <div class="accent">UMKM Panjunan</div>
    <h1>${umkm.nama}</h1>
    <span class="kat">${umkm.kategori}</span>
  </div>
</div>

${this._show(umkm,'tentang') ? `
<div class="section">
  <h2>Tentang Kami</h2>
  <p>${umkm.deskripsi || 'Tidak ada deskripsi.'}</p>
</div>` : ''}

${this._show(umkm,'produk') && umkm.produk && umkm.produk.length ? `
<div class="section">
  <h2>Produk</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px">
    ${umkm.produk.map(p => `
    <div class="produk-card">
      ${p.foto ? `<img src="${p.foto}" style="width:100%;height:130px;object-fit:cover">` :
        `<div style="height:130px;background:${c}22;display:flex;align-items:center;justify-content:center;font-size:36px">🛍️</div>`}
      <div style="padding:12px">
        <div style="font-size:14px;font-weight:600;color:#e2e8f0;margin-bottom:4px">${p.nama}</div>
        <div style="font-size:15px;font-weight:700;color:${c}">Rp ${Number(p.harga||0).toLocaleString('id-ID')}</div>
        ${p.deskripsi ? `<div style="font-size:12px;color:#64748b;margin-top:4px">${p.deskripsi}</div>` : ''}
      </div>
    </div>`).join('')}
  </div>
</div>` : ''}

${this._show(umkm,'galeri') && umkm.galeri && umkm.galeri.length ? `
<div class="section">
  <h2>Galeri</h2>
  <div class="galeri-dark">${umkm.galeri.map(g=>`<img src="${g.url||g}" onclick="openLightbox('${g.url||g}')">`).join('')}</div>
</div>` : ''}

${this._show(umkm,'kontak') ? `
<div class="section">
  <h2>Kontak & Pesan</h2>
  ${umkm.alamat ? `<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:14px;color:#94a3b8;margin-bottom:14px"><span>📍</span><span>${umkm.alamat}</span></div>` : ''}
  ${(() => {
    const links = [];
    if (umkm.whatsapp) { const n=(umkm.whatsapp||'').replace(/\D/g,''); links.push({href:`https://wa.me/${n.startsWith('0')?'62'+n.slice(1):n}`,bg:'#25d366',icon:'💬',label:'WhatsApp'}); }
    if (umkm.gofood)    links.push({href:umkm.gofood,   bg:'#e53e00',icon:'🛵',label:'GoFood'});
    if (umkm.grabfood)  links.push({href:umkm.grabfood, bg:'#00b14f',icon:'🟢',label:'GrabFood'});
    if (umkm.shopee)    links.push({href:umkm.shopee,   bg:'#f05d2f',icon:'🛒',label:'Shopee'});
    if (umkm.tokopedia) links.push({href:umkm.tokopedia,bg:'#42b549',icon:'🛍️',label:'Tokopedia'});
    if (umkm.tiktokshop)links.push({href:umkm.tiktokshop,bg:'#010101',icon:'🎵',label:'TikTok Shop'});
    const ig=(umkm.instagram||'').replace('@','');
    if (ig) links.push({href:`https://instagram.com/${ig}`,bg:'linear-gradient(45deg,#e1306c,#f77737)',icon:'📸',label:'Instagram'});
    if (umkm.facebook)  links.push({href:umkm.facebook, bg:'#1877f2',icon:'👍',label:'Facebook'});
    if (umkm.mapsUrl)   links.push({href:umkm.mapsUrl,  bg:'#4285f4',icon:'🗺️',label:'Google Maps'});
    return links.map(l=>`<a href="${l.href}" target="_blank" class="mkt-link" style="background:${l.bg}"><span style="font-size:18px">${l.icon}</span>${l.label}</a>`).join('');
  })()}
</div>` : ''}

${this._show(umkm,'jam') && umkm.jamOperasional && Object.keys(umkm.jamOperasional).length ? `
<div class="section">
  <h2>Jam Operasional</h2>
  <table style="width:100%"><tbody>${this._jamRows(umkm.jamOperasional)}</tbody></table>
</div>` : ''}

<div style="text-align:center;padding:24px;font-size:12px;color:#475569">Portal UMKM Panjunan · Kudus</div>
${this._sharedScripts()}
</body></html>`;
  },
};
