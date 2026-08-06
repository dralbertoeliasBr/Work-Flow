// SOUNAVY - Bolinha Guiada - Fora da Meta - bolinha.js
// Arquivo único que aparece em cima de qualquer site (gov.br)
// Salva em https://dralbertoeliasbr.github.io/Work-Flow/bolinha.js
(function(){
  if(document.getElementById('sounavy-bolinha-root')){document.getElementById('sounavy-bolinha-root').remove();return}
  const root = document.createElement('div');
  root.id='sounavy-bolinha-root';
  root.innerHTML=`
  <style>
  #sou-bolinha{position:fixed;right:18px;bottom:95px;width:56px;height:56px;z-index:2147483647;cursor:pointer}
  #sou-band{width:56px;height:56px;background:#fff;border-radius:50%;border:3px solid #2E4EBA;box-shadow:0 4px 16px rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center}
  #sou-cent{width:32px;height:32px;background:#2E4EBA;border-radius:50%;position:relative;overflow:hidden}
  #sou-bol{width:12px;height:12px;background:#d8c8b8;border-radius:50%;position:absolute;left:4px;top:10px;animation:souAnda 1.2s ease-in-out infinite alternate}
  @keyframes souAnda{from{transform:translateX(0)}to{transform:translateX(12px)}}
  #sou-panel{position:fixed;left:10px;right:10px;bottom:10px;z-index:2147483646;background:#0a0a0a;border:1px solid #333;border-radius:12px;padding:12px;font-family:-apple-system,sans-serif;display:none;max-height:60vh;overflow:auto}
  #sou-panel input{width:100%;background:#222;border:1px solid #444;color:#fff;padding:12px;border-radius:8px;font-size:16px}
  #sou-panel button{width:100%;background:#00ffaa;color:#000;border:none;padding:10px;border-radius:8px;font-weight:bold;margin-top:8px}
  #sou-label{position:fixed;top:10px;left:50%;transform:translateX(-50%);background:#000;border:1px solid #00ffaa;color:#00ffaa;padding:6px 12px;border-radius:20px;font-size:12px;z-index:2147483647;display:none;font-family:sans-serif}
  .sou-found{outline:3px solid #00ffaa !important;outline-offset:2px !important;background:rgba(0,255,170,0.2) !important}
  </style>
  <div id="sou-bolinha"><div id="sou-band"><div id="sou-cent"><div id="sou-bol"></div></div></div></div>
  <div id="sou-label"></div>
  <div id="sou-panel">
    <div style="color:#00ffaa;font-weight:bold;margin-bottom:8px">SOUNAVY • Bolinha Guiada - Para onde ir?</div>
    <input id="sou-input" placeholder="Ex: Solicitar Benefício, Entrar, Cadastrar">
    <button id="sou-go">📍 GUIAR</button>
    <button id="sou-close" style="background:#222;color:#888;border:1px solid #444">Fechar</button>
    <div id="sou-status" style="color:#888;font-size:11px;margin-top:8px">Digite nome do botão. Ela lê nome, id, aria-label. Mapeia micro quadrante.</div>
  </div>`;
  document.body.appendChild(root);
  const panel=document.getElementById('sou-panel'), input=document.getElementById('sou-input'), label=document.getElementById('sou-label'), status=document.getElementById('sou-status');
  const bolinha=document.getElementById('sou-bolinha');
  function quad(rect){
    const x=rect.left+rect.width/2, y=rect.top+rect.height/2, vw=innerWidth, vh=innerHeight;
    let c=x<vw*0.33?'Esq':x<vw*0.66?'Centro':'Dir', r=y<vh*0.33?'Topo':y<vh*0.66?'Meio':'Base';
    return `${r} ${c} X:${Math.round(x)} Y:${Math.round(y)}`;
  }
  function guiar(){
    const termo=input.value.trim().toLowerCase();
    if(!termo){status.textContent='Digite onde quer ir';return}
    let achados=[];
    document.querySelectorAll('button,a,[role="button"],input[type="submit"],.target').forEach(el=>{
      if(el.closest('#sounavy-bolinha-root')) return;
      const txt=(el.textContent+' '+(el.getAttribute('aria-label')||'')+' '+(el.id||'')+' '+(el.getAttribute('name')||'')).toLowerCase();
      if(txt.includes(termo)){achados.push(el)}
      el.classList.remove('sou-found');
    });
    if(!achados.length){status.textContent=`Nenhum botão "${termo}"`;return}
    const alvo=achados[0];
    alvo.classList.add('sou-found');
    alvo.scrollIntoView({behavior:'smooth',block:'center'});
    setTimeout(()=>{
      const q=quad(alvo.getBoundingClientRect());
      status.textContent=`✅ ${alvo.textContent.trim().substring(0,30)} em ${q}`;
      label.textContent=`📍 ${q}`;
      label.style.display='block';
      setTimeout(()=>label.style.display='none',4000);
    },600);
  }
  document.getElementById('sou-go').onclick=guiar;
  document.getElementById('sou-close').onclick=()=>panel.style.display='none';
  bolinha.onclick=()=>{panel.style.display=panel.style.display==='none'?'block':'none'; if(panel.style.display==='block') input.focus()};
  input.addEventListener('keydown',e=>{if(e.key==='Enter') guiar()});
  panel.style.display='block';
})();
