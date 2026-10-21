/* JoMain: logik laman web. Biasanya anda tidak perlu mengubah fail ini.
   Kandungan produk diubah dalam data/products.js */
(function(){
const D = window.CK;
const BASE = document.body.dataset.base || "";
const PAGE = document.body.dataset.page || "";
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const WAICON = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>';
const wa = msg => `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(msg)}`;
const waBtn = (msg, label, cls="") => `<a class="btn wa ${cls}" href="${wa(msg)}" target="_blank" rel="noopener">${WAICON}<span>${esc(label)}</span></a>`;
const levelName = id => (D.levels.find(l => l.id === id) || {}).name || id;
const prod = id => D.products.find(p => p.id === id);
const link = p => `${BASE}produk.html?id=${encodeURIComponent(p.id)}`;
const tags = p => `<div class="tags">${p.isNew ? '<span class="tag new">Baharu</span>' : ""}<span class="tag s-${slug(p.subject)}">${esc(p.subject)}</span><span class="tag">${esc(levelName(p.level))}</span></div>`;

/* ---------- header & footer ---------- */
const NAV = [["index.html","Utama","home"],["kedai.html","Kedai","kedai"],["pakej.html","Pakej dan pas","pakej"],["pusat.html","Pusat tuisyen","pusat"],["sumber.html","Sumber percuma","sumber"],["cara-beli.html","Cara beli","carabeli"]];
const hdr = $("#hdr");
if (hdr) hdr.innerHTML = `<div class="site-head"><a class="brand" href="${BASE}index.html" aria-label="JoMain, laman utama"><i>Jo</i>Main</a>
  ${waBtn("Salam, saya ada pertanyaan tentang JoMain.","WhatsApp kami","small")}</div>
  <nav class="nav" aria-label="Menu utama">${NAV.map(([h,t,k]) => `<a href="${BASE}${h}" ${k===PAGE?'aria-current="page"':""}>${t}</a>`).join("")}</nav>`;
const ftr = $("#ftr");
if (ftr) ftr.innerHTML = `<div class="site-foot"><div class="row">
  <div><b>JoMain</b><br>Main sambil belajar. Permainan belajar untuk kanak-kanak Malaysia.<br>WhatsApp ${esc(D.whatsappDisplay)}</div>
  <nav aria-label="Pautan bawah">${NAV.slice(1).map(([h,t]) => `<a href="${BASE}${h}">${t}</a>`).join("")}</nav></div>
  <p>© ${new Date().getFullYear()} JoMain</p></div>`;

/* ---------- product card ---------- */
function card(p){
  return `<article class="pcard"><a class="shot" href="${link(p)}" tabindex="-1" aria-hidden="true"><img src="${BASE}${p.img[0]}" alt="" loading="lazy"></a>
    <div class="body">${tags(p)}<h3><a href="${link(p)}">${esc(p.name)}</a></h3><p>${esc(p.short)}</p>
    <div class="foot"><span class="price">RM${p.price}</span><a class="btn ghost small" href="${link(p)}">Lihat produk</a></div></div></article>`;
}

/* ---------- pages ---------- */
const R = {};

R.home = () => {
  const g = $("#featured"); if (g) g.innerHTML = D.products.map(card).join("");
  const pass = D.passes[0], ps = $("#passband");
  if (ps && pass) ps.innerHTML = passBlock(pass);
  const rs = $("#reslist"); if (rs) rs.innerHTML = resCards();
  demo();
};

R.kedai = () => {
  const q = new URLSearchParams(location.search);
  let lv = q.get("tahap") || "all", sj = q.get("subjek") || "all";
  const subjects = [...new Set(D.products.map(p => p.subject))];
  const lvBox = $("#f-level"), sjBox = $("#f-subject"), out = $("#shop");
  const chips = (box, items, cur, key) => box.innerHTML = items.map(([v,t]) => `<button class="chip" data-k="${key}" data-v="${esc(v)}" aria-pressed="${v===cur}">${esc(t)}</button>`).join("");
  function draw(){
    chips(lvBox, [["all","Semua tahap"], ...D.levels.map(l => [l.id,l.name])], lv, "lv");
    chips(sjBox, [["all","Semua subjek"], ...subjects.map(s => [s,s])], sj, "sj");
    const list = D.products.filter(p => (lv==="all"||p.level===lv) && (sj==="all"||p.subject===sj));
    out.innerHTML = list.length ? list.map(card).join("") : `<div class="empty">Belum ada produk untuk pilihan ini. Produk baharu akan ditambah dari semasa ke semasa.</div>`;
    const u = new URL(location.href); lv==="all"?u.searchParams.delete("tahap"):u.searchParams.set("tahap",lv); sj==="all"?u.searchParams.delete("subjek"):u.searchParams.set("subjek",sj);
    history.replaceState(null, "", u);
  }
  document.querySelector(".filters").addEventListener("click", e => { const b = e.target.closest(".chip"); if (!b) return;
    if (b.dataset.k==="lv") lv = b.dataset.v; else sj = b.dataset.v; draw(); });
  draw();
};

R.produk = () => {
  const p = prod(new URLSearchParams(location.search).get("id")), box = $("#product");
  if (!p){ box.innerHTML = `<div class="empty" style="margin:40px 0">Produk ini tidak dijumpai. <a href="${BASE}kedai.html">Lihat semua produk di kedai</a>.</div>`; return; }
  document.title = `${p.name}: JoMain`;
  const pass = D.passes.find(x => x.level === p.level);
  const related = D.products.filter(x => x.id !== p.id && x.level === p.level).slice(0,3);
  box.innerHTML = `<p class="crumb"><a href="${BASE}kedai.html">Kedai</a> / ${esc(p.name)}</p>
  <div class="pdetail">
    <div class="phones">${p.img.map(s => `<div class="phone"><img src="${BASE}${s}" alt="Paparan ${esc(p.name)}"></div>`).join("")}</div>
    <div>${tags(p)}<h1>${esc(p.name)}</h1><p class="short">${esc(p.short)}</p>
      <div class="buybox"><div class="row"><span class="price">RM${p.price}</span>${waBtn(p.wa, "Beli melalui WhatsApp")}</div>
      <p class="alt">Sudah ada kod? <a href="${BASE}${p.game}">Buka permainan</a>.</p>
      ${pass ? `<p class="alt">Atau dapatkan semua permainan ${esc(levelName(pass.level))} dengan <a href="${BASE}pakej.html">${esc(pass.name)}, dari RM${pass.founderPrice||pass.price}</a>.</p>` : ""}</div>
      <h3>Apa yang ada di dalamnya</h3><ul class="feat">${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
      <p>${esc(p.desc)}</p>
      <p class="crumb">${esc(p.type)}. Main terus di telefon, tablet atau komputer. Tiada aplikasi perlu dimuat turun.</p></div>
  </div>
  ${related.length ? `<section><h2>Produk lain untuk ${esc(levelName(p.level))}</h2><div class="grid" style="margin-top:18px">${related.map(card).join("")}</div></section>` : ""}`;
};

function passBlock(pass){
  const items = D.products.filter(p => p.level === pass.level), total = items.reduce((s,p) => s + p.price, 0);
  const now = pass.founderPrice || pass.price;
  return `<div class="pass"><div><h2>${esc(pass.name)}</h2>
    <p>Semua permainan ${esc(levelName(pass.level))} dalam satu kod, selama ${esc(pass.period)}. Permainan baharu yang ditambah dalam tempoh pas turut dimasukkan.</p>
    <ul>${items.map(p => `<li>${esc(p.name)}</li>`).join("")}</ul></div>
    <div><div class="value">Nilai jika dibeli satu persatu: RM${total}</div>
    <div class="price">RM${now}${pass.founderPrice ? `<s>RM${pass.price}</s>` : ""}</div>
    ${pass.founderNote ? `<div class="note">${esc(pass.founderNote)}</div>` : ""}
    ${waBtn(pass.wa, `Beli ${pass.name}`)}</div></div>`;
}
function bundleBlock(b){
  const items = b.items.map(prod).filter(Boolean), total = items.reduce((s,p) => s + p.price, 0);
  return `<div class="bundle"><div><h3>${esc(b.name)}</h3><p>${items.map(p => esc(p.name)).join(" dan ")}</p></div>
    <div class="row" style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><span class="price">RM${b.price}<s>RM${total}</s></span>${waBtn(b.wa,"Beli pakej")}</div></div>`;
}
R.pakej = () => {
  $("#passes").innerHTML = D.passes.map(passBlock).join("");
  $("#bundles").innerHTML = D.bundles.map(bundleBlock).join("");
};

function resCards(){
  return D.articles.map(a => `<a class="rcard" href="${BASE}${a.url}"><span class="kind">Artikel</span><h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p></a>`).join("")
    + D.freebies.map(f => `<a class="rcard" href="${BASE}${f.url}" download><span class="kind">PDF percuma untuk dicetak</span><h3>${esc(f.title)}</h3><p>${esc(f.summary)}</p></a>`).join("");
}
R.sumber = () => { $("#reslist").innerHTML = resCards(); };

/* ---------- mini game on the home page ---------- */
function demo(){
  const box = $("#demo"); if (!box) return;
  const WORDS = [[["ku","cing"],"🐱","Betul, kucing! Ada 124 perkataan lagi dalam JoMain Suku Kata."],[["bu","ku"],"📘","Betul, buku!"],[["se","ko","lah"],"🏫","Betul, sekolah! Perkataan panjang pun mudah."]];
  const EXTRA = ["ta","ma","ri","pa","nga","lu"];
  let w = 0, tiles = [], filled = [];
  const sh = a => { a = a.slice(); for (let i = a.length-1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; };
  const q = s => box.querySelector(s);
  function setup(){ const [syl,pic] = WORDS[w]; tiles = sh([...syl, ...sh(EXTRA.filter(x => !syl.includes(x))).slice(0,2)]).map((t,i) => ({t,i,used:false}));
    filled = syl.map(() => null); q(".pic").textContent = pic; q(".msg").textContent = ""; q(".msg").className = "msg"; q(".again").hidden = true; render(false); }
  function render(done){
    q(".slots").className = "slots" + (done ? " ok" : "");
    q(".slots").innerHTML = filled.map((id,k) => `<button class="slot ${id!==null?"full":""}" data-k="${k}" ${done?"disabled":""} aria-label="Petak ${k+1}">${id!==null?tiles[id].t:""}</button>`).join("");
    q(".tiles").innerHTML = tiles.map(x => `<button class="tile" data-i="${x.i}" ${x.used||done?"disabled":""}>${x.t}</button>`).join("");
  }
  box.addEventListener("click", e => {
    const t = e.target.closest(".tile"), s = e.target.closest(".slot"), a = e.target.closest(".again");
    if (a){ w = (w+1) % WORDS.length; return setup(); }
    if (s && !s.disabled){ const k = +s.dataset.k, id = filled[k]; if (id===null) return; tiles[id].used = false; filled[k] = null; return render(false); }
    if (!t) return; const x = tiles[+t.dataset.i], k = filled.indexOf(null); if (x.used || k < 0) return;
    x.used = true; filled[k] = x.i;
    if (!filled.includes(null)){
      if (filled.map(id => tiles[id].t).join("") === WORDS[w][0].join("")){ render(true); q(".msg").textContent = WORDS[w][2]; q(".msg").className = "msg ok"; q(".again").hidden = false; return; }
      render(false); q(".slots").classList.add("no"); q(".msg").textContent = "Belum tepat. Cuba lagi!";
      setTimeout(() => { filled.forEach(id => { if (id!==null) tiles[id].used = false; }); filled = filled.map(() => null); render(false); }, 600); return;
    }
    render(false);
  });
  setup();
}

/* Fill any [data-wa] buttons written directly in page HTML */
document.querySelectorAll("[data-wa]").forEach(el => { el.outerHTML = waBtn(el.dataset.wa, el.textContent.trim(), el.dataset.cls || ""); });

if (R[PAGE]) R[PAGE]();
})();
