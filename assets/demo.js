/* JoMain: mod demo percuma. Aktif hanya jika alamat mengandungi ?demo=1 */
(function(){
  if(!/[?&]demo=1\b/.test(location.search)) return;
  var STORE=window.JM_STORE||"x", ARK=STORE==="ark-key", LIMIT=ARK?2:8;
  var KEY="jm-demo-"+STORE;
  var IDS={"skc-key":"suku-kata","mtc-key":"matematik","snc-key":"sains","eng-key":"english","ark-key":"arked","pra-key":"prasekolah","jwi-key":"jawi"};
  var NAMES={"skc-key":"JoMain Suku Kata","mtc-key":"JoMain Matematik","snc-key":"JoMain Sains","eng-key":"JoMain English","ark-key":"JoMain Arked","pra-key":"JoMain Prasekolah","jwi-key":"JoMain Jawi"};
  var id=IDS[STORE]||"", name=NAMES[STORE]||"JoMain";
  var get=Storage.prototype.getItem;
  // Buka permainan tanpa kod untuk demo sahaja (tiada apa disimpan)
  Storage.prototype.getItem=function(k){ return k===STORE?"pass:demo":get.call(this,k); };
  if(window.jmPass){ var v=window.jmPass.valid; window.jmPass.valid=function(s){ return s==="pass:demo"||v(s); }; }
  else window.jmPass={check:function(){return Promise.resolve(null);},valid:function(s){return s==="pass:demo";}};
  function used(){ return +(get.call(localStorage,KEY)||0); }
  function setUsed(n){ try{ localStorage.setItem(KEY,String(n)); }catch(e){} }
  var css=document.createElement("style");
  css.textContent='.jm-demo-bar{position:sticky;top:0;z-index:30;background:#1F3A93;color:#fff;font:600 14px Fredoka,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;gap:10px;padding:8px 12px;padding-top:calc(8px + env(safe-area-inset-top,0px))}'+
   '.jm-demo-bar a{background:#FFD23F;color:#1F3A93;border-radius:999px;padding:4px 12px;text-decoration:none;font-weight:700}'+
   '.jm-demo-end{position:fixed;inset:0;z-index:50;background:rgba(15,25,60,.6);display:grid;place-items:center;padding:20px}'+
   '.jm-demo-end .box{background:#fff;color:#1F3A93;border:3px solid #1F3A93;box-shadow:0 8px 0 #1F3A93;border-radius:24px;padding:24px;max-width:380px;width:100%;text-align:center;font-family:Fredoka,system-ui,sans-serif}'+
   '.jm-demo-end h2{margin:0 0 6px;font-size:26px}.jm-demo-end p{margin:0 0 16px;font-family:Andika,sans-serif;color:#3E5291;font-size:16px}'+
   '.jm-demo-end a{display:block;margin-top:10px;border-radius:999px;padding:12px;font-weight:600;font-size:17px;text-decoration:none}'+
   '.jm-demo-end .wa{background:#178A48;color:#fff}.jm-demo-end .ink{background:#1F3A93;color:#fff}.jm-demo-end .gh{border:2px solid #1F3A93;color:#1F3A93}';
  document.head.appendChild(css);
  var bar=document.createElement("div"); bar.className="jm-demo-bar";
  function label(){ var left=Math.max(0,LIMIT-used()); return "Mod demo percuma: "+left+(ARK?" pusingan":" soalan")+" lagi"; }
  bar.innerHTML='<span id="jm-demo-left"></span><a href="../produk.html?id='+id+'">Beli</a>';
  function refresh(){ var el=document.getElementById("jm-demo-left"); if(el) el.textContent=label(); }
  function addBar(){ document.body.insertBefore(bar,document.body.firstChild); refresh(); }
  if(document.body) addBar(); else document.addEventListener("DOMContentLoaded",addBar);
  function showEnd(){
    if(document.querySelector(".jm-demo-end")) return;
    var wa="https://wa.me/601163927569?text="+encodeURIComponent("Salam, saya dah cuba demo "+name+" dan berminat untuk beli.");
    var d=document.createElement("div"); d.className="jm-demo-end";
    d.innerHTML='<div class="box"><div style="font-size:44px">🌟</div><h2>Demo tamat!</h2><p>Anak suka '+name+'? Dapatkan permainan penuh dengan soalan tanpa had.</p>'+
      '<a class="wa" href="'+wa+'" target="_blank" rel="noopener">WhatsApp untuk beli</a>'+
      '<a class="ink" href="../produk.html?id='+id+'">Lihat harga dan maklumat</a>'+
      '<a class="gh" href="../demo.html">Cuba permainan lain</a></div>';
    document.body.appendChild(d);
  }
  document.addEventListener("click",function(e){
    var b=e.target.closest&&e.target.closest("[data-act]"); if(!b) return;
    var a=b.dataset.act, counted=ARK?(a==="mole"||a==="bal"||a==="again"):(a==="next"||a==="again");
    if(!counted) return;
    if(used()>=LIMIT){ e.stopPropagation(); e.preventDefault(); showEnd(); return; }
    setUsed(used()+1); refresh();
  },true);
  // Jika demo sudah habis, tunjuk mesej selepas halaman dibuka
  window.addEventListener("load",function(){ if(used()>=LIMIT) setTimeout(showEnd,600); });
})();
