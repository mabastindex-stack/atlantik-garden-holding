(function(){'use strict';
/* ================= FLAGS ================= */
const starPts=(cx,cy,R,r,n=5)=>Array.from({length:n*2},(_,i)=>{const a=-Math.PI/2+i*Math.PI/n,d=i%2?r:R;return (cx+Math.cos(a)*d).toFixed(2)+','+(cy+Math.sin(a)*d).toFixed(2)}).join(' ');
const bands=(a,b,c,dir)=>dir==='v'
  ?`<rect width="20.1" height="40" fill="${a}"/><rect x="20" width="20.1" height="40" fill="${b}"/><rect x="40" width="20" height="40" fill="${c}"/>`
  :`<rect width="60" height="13.4" fill="${a}"/><rect y="13.3" width="60" height="13.4" fill="${b}"/><rect y="26.6" width="60" height="13.4" fill="${c}"/>`;
const COUNTRIES={ES:'Spain',IT:'Italy',FR:'France',DE:'Germany',NL:'Netherlands',PT:'Portugal',GR:'Greece',TR:'Türkiye',IQ:'Iraq',KU:'Kurdistan Region',EG:'Egypt',MA:'Morocco',AE:'United Arab Emirates',SA:'Saudi Arabia',IN:'India',BR:'Brazil'};
const FLAGS={
  ES:`<rect width="60" height="40" fill="#C60B1E"/><rect y="10" width="60" height="20" fill="#FFC400"/>`,
  IT:bands('#009246','#fff','#CE2B37','v'),
  FR:bands('#0055A4','#fff','#EF4135','v'),
  DE:bands('#111','#DD0000','#FFCE00'),
  NL:bands('#AE1C28','#fff','#21468B'),
  PT:`<rect width="24" height="40" fill="#006600"/><rect x="24" width="36" height="40" fill="#FF0000"/><circle cx="24" cy="20" r="7.5" fill="#FFCC00"/><circle cx="24" cy="20" r="4" fill="#fff"/>`,
  GR:Array.from({length:9},(_,i)=>`<rect y="${(i*4.444).toFixed(2)}" width="60" height="4.5" fill="${i%2?'#fff':'#0D5EAF'}"/>`).join('')+`<rect width="22.3" height="22.3" fill="#0D5EAF"/><rect x="8.9" width="4.5" height="22.3" fill="#fff"/><rect y="8.9" width="22.3" height="4.5" fill="#fff"/>`,
  TR:`<rect width="60" height="40" fill="#E30A17"/><circle cx="23" cy="20" r="10" fill="#fff"/><circle cx="26" cy="20" r="8" fill="#E30A17"/><polygon points="${starPts(35,20,4.8,2)}" fill="#fff"/>`,
  IQ:bands('#CE1126','#fff','#111')+`<path d="M19 20h7m3 0h4m3 0h7" stroke="#007A3D" stroke-width="2.4" stroke-linecap="round"/>`,
  KU:bands('#ED2024','#fff','#278E43')+Array.from({length:21},(_,i)=>{const a=i*2*Math.PI/21,p=(k,r)=>`${(30+Math.cos(a+k)*r).toFixed(2)} ${(20+Math.sin(a+k)*r).toFixed(2)}`;return `<path d="M${p(0,6.5)}L${p(.15,11)}L${p(.3,6.5)}z" fill="#FBD116"/>`}).join('')+`<circle cx="30" cy="20" r="6.4" fill="#FBD116"/>`,
  EG:bands('#CE1126','#fff','#111')+`<circle cx="30" cy="20" r="4.2" fill="#C09300"/>`,
  MA:`<rect width="60" height="40" fill="#C1272D"/><polygon points="${starPts(30,21,11,4.4)}" fill="none" stroke="#006233" stroke-width="1.6"/>`,
  AE:bands('#00732F','#fff','#111')+`<rect width="15" height="40" fill="#FF0000"/>`,
  SA:`<rect width="60" height="40" fill="#006C35"/><rect x="14" y="13" width="32" height="2.8" rx="1.4" fill="#fff"/><rect x="14" y="27" width="30" height="2" rx="1" fill="#fff"/>`,
  IN:bands('#FF9933','#fff','#138808')+`<circle cx="30" cy="20" r="4.6" fill="none" stroke="#000080" stroke-width="1"/>`,
  BR:`<rect width="60" height="40" fill="#009C3B"/><path d="M30 4L56 20L30 36L4 20z" fill="#FFDF00"/><circle cx="30" cy="20" r="8" fill="#002776"/>`
};
function flag(code){
  const c=(state.countries||[]).find(x=>x.code===code);
  const label=esc((c&&c.name)||COUNTRIES[code]||'Flag');
  if(!FLAGS[code]&&c&&c.flagImage)return `<span class="flag"><img src="${esc(c.flagImage)}" alt="${label}"></span>`;
  return `<span class="flag"><svg viewBox="0 0 60 40" role="img" aria-label="${label}">${FLAGS[code]||'<rect width="60" height="40" fill="#8FAFA8"/><circle cx="30" cy="20" r="12" fill="none" stroke="#fff" stroke-width="2"/><path d="M18 20h24M30 8c-6 8-6 16 0 24M30 8c6 8 6 16 0 24" stroke="#fff" stroke-width="1.6" fill="none"/>'}</svg></span>`;
}
function countryName(code){
  const c=(state.countries||[]).find(x=>x.code===code);
  return (c&&c.name)||COUNTRIES[code]||code;
}

/* ================= REMOTE FALLBACK PHOTOS ================= */
const UNS=(id,w=1400)=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const PEX=(id,w=1200)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const REMOTE={
  hero1:UNS('1758573728869-d25eb4bafb67',1920),hero2:UNS('1635176490410-5116fc497d45',1920),hero3:UNS('1689954517393-a60459f43f77',1920),
  story:UNS('1635176490410-5116fc497d45',1920),intro1:UNS('1758573728869-d25eb4bafb67',1000),intro2:PEX(6231898,1000),about:UNS('1635176490410-5116fc497d45',1000),intro3:UNS('1689954517393-a60459f43f77',900)
};
const PFB={'p-oil':UNS('1474979266404-7eaacbcd87c5',1000),'p-olives':PEX(6231898,1000),'p-wheat':UNS('1635176490410-5116fc497d45',1000),'p-pom':UNS('1689954517393-a60459f43f77',1000)};

/* ================= HELPERS ================= */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rnd=(a,b)=>a+Math.random()*(b-a);
const hashStr=s=>{let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h};
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}}};
const REDUCED=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
const digits=s=>String(s||'').replace(/[^\d]/g,'');
const paras=t=>String(t||'').split(/\n{2,}/).filter(Boolean).map(p=>`<p>${esc(p)}</p>`).join('');
const tel=s=>'tel:'+String(s||'').replace(/[^\d+]/g,'');
const HUES=[158,198,38,14,262,98];

/* ================= ICONS ================= */
const I={
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',left:'<path d="M15 6l-6 6 6 6"/>',right:'<path d="M9 6l6 6-6 6"/>',
  close:'<path d="M6 6l12 12M18 6L6 18"/>',menu:'<path d="M4 8h16M4 16h16"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/>',
  pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:'<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',plus:'<path d="M12 5v14M5 12h14"/>',
  bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 21h4"/>',
  note:'<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h5"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  leaf:'<path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14z"/><path d="M5 19c3-5 6-8 10-10"/>',
  box:'<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  route:'<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H14a3.5 3.5 0 0 0 0-7h-4a3.5 3.5 0 0 1 0-7h5.5"/>',
  truck:'<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8C9.5 8 8 7 8 5.5S9.8 3 12 8zM12 8c2.5 0 4-1 4-2.5S14.2 3 12 8z"/>',
  list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  wa:'<path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z"/><path d="M9.3 8.9c.3 2.6 2.4 4.6 5 5l1-1.2-1.7-.9-.8.6a4.3 4.3 0 0 1-1.9-1.9l.6-.8-.9-1.7z"/>',
  facebook:'<path d="M14 8h2V5h-2.5C11.3 5 10 6.5 10 8.7V11H8v3h2v6h3v-6h2.2l.5-3H13V8.9c0-.6.3-.9 1-.9z"/>',
  instagram:'<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.7"/><circle cx="16.8" cy="7.2" r=".6"/>',
  whatsapp:'<path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z"/><path d="M9.3 8.9c.3 2.6 2.4 4.6 5 5l1-1.2-1.7-.9-.8.6a4.3 4.3 0 0 1-1.9-1.9l.6-.8-.9-1.7z"/>',
  telegram:'<path d="M20.5 4.5L3.5 11l5 2 2 5.5 3-3.5 4.5 3.3z"/><path d="M8.5 13l8-5.5"/>',
  linkedin:'<path d="M5 9.5h3V19H5zM6.5 4.8a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM11 9.5h2.8v1.3c.6-1 1.6-1.5 3-1.5 2.7 0 3.2 1.8 3.2 4V19h-3v-4.8c0-1.1 0-2.2-1.5-2.2S14 13 14 14.1V19h-3z"/>',
  tiktok:'<path d="M14 4v10.2a3.7 3.7 0 1 1-3.7-3.7"/><path d="M14 4c.4 2.5 2 4 4.6 4.3"/>',
  youtube:'<rect x="3" y="6" width="18" height="12" rx="4"/><path d="M10.5 9.5v5l4.2-2.5z"/>'
};
const ico=(k,cls='')=>`<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]||''}</svg>`;
const SOCIAL_LABELS={facebook:'Facebook',instagram:'Instagram',whatsapp:'WhatsApp',telegram:'Telegram',linkedin:'LinkedIn',tiktok:'TikTok',youtube:'YouTube'};
const LOGO='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="var(--btn)"/><path d="M24 33c0-9 2-14 10-18-1 9-4 15-10 18z" fill="var(--on-btn)"/><path d="M24 33c0-6-1-10-8-13 0 7 3 11 8 13z" fill="var(--on-btn)" opacity=".65"/><path d="M9 38c4-3 7-3 10 0s6 3 10 0 7-3 10 0" stroke="var(--on-btn)" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';

/* ================= STATE ================= */
let state={settings:{company:{},socials:{},agent:{}},factories:[],products:[],agents:[],announcements:[],faqs:[],slides:[],categories:[],countries:[]};
const S=()=>state.settings;
const fById=id=>state.factories.find(f=>f.id===id);
const productsOf=id=>state.products.filter(p=>p.factoryId===id);
const daysLeft=a=>a.until?Math.ceil((new Date(a.until+'T23:59:59')-new Date())/864e5):null;
const isLive=a=>a.until?daysLeft(a)>=0:true;
const activeOffers=()=>state.announcements.filter(a=>a.type==='offer'&&isLive(a));
const UNIT={kg:'kg',ton:'tonne',L:'litre',box:'box'};
const money=n=>{const v=Number(n)||0;return (S().company.currency||'$')+v.toLocaleString('en-US',{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2})};
const finalPrice=p=>p.discount?p.price*(1-p.discount/100):p.price;
const priceHtml=p=>`${p.discount?`<s>${money(p.price)}</s>`:''}${money(finalPrice(p))}<small> / ${esc(UNIT[p.unit]||p.unit)}</small>`;
const ui={cat:'All',q:'',otype:'all',origin:'All',season:false,offer:false,sort:'featured',view:'grid'};
let current={page:null,arg:null},cleanup=null;

/* ================= THEME / TOAST ================= */
function setTheme(t,anim){
  const r=document.documentElement;
  if(anim){r.classList.add('theming');setTimeout(()=>r.classList.remove('theming'),800)}
  r.dataset.theme=t;store.set('agh.theme',t);
  const m=$('meta[name=theme-color]');if(m)m.setAttribute('content',t==='dark'?'#050F0D':'#FAFBF6');
  syncThemeUi();
}
function syncThemeUi(){const d=document.documentElement.dataset.theme==='dark';$$('.theme-switch').forEach(b=>b.setAttribute('aria-checked',String(d)))}
function toggleTheme(btn){
  const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
  if(document.startViewTransition&&!REDUCED&&btn){
    const r=btn.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,end=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
    const t=document.startViewTransition(()=>setTheme(next,false));
    t.ready.then(()=>document.documentElement.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${end}px at ${x}px ${y}px)`]},{duration:900,easing:'cubic-bezier(.22,.7,.2,1)',pseudoElement:'::view-transition-new(root)'})).catch(()=>{});
  }else setTheme(next,true);
}
function initTheme(){
  let t=store.get('agh.theme');
  if(t!=='light'&&t!=='dark')t=(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';
  setTheme(t,false);
}
let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2600)}
function copyText(txt){
  if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(txt).then(()=>true).catch(()=>fallbackCopy(txt));
  return Promise.resolve(fallbackCopy(txt));
}
function fallbackCopy(txt){
  const ta=document.createElement('textarea');ta.value=txt;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();
  let ok=false;try{ok=document.execCommand('copy')}catch(e){}ta.remove();return ok;
}

/* ================= API (read only) ================= */
const API_BASE=/^(atlantikgh\.com|www\.atlantikgh\.com)$/.test(location.hostname)?'https://api.atlantikgh.com/api':'http://127.0.0.1:8000/api';
async function apiFetch(path){
  let res;
  try{res=await fetch(API_BASE+path,{headers:{Accept:'application/json'}})}
  catch(e){throw Object.assign(new Error('Could not reach the server'),{network:true})}
  const data=await res.json().catch(()=>({}));
  if(!res.ok)throw Object.assign(new Error(data.message||'Request failed'),{status:res.status,data});
  return data;
}

/* ================= CHROME ================= */
const NAV=[['home','Home'],['products','Products'],['factories','Factories'],['agents','Agents'],['about','About'],['contact','Contact']];
const href=p=>p==='home'?'#/':'#/'+p;
function brandHtml(c){
  const m=/^(.*?)\s+Holding$/i.exec(c.name||'');
  const main=m?m[1]:c.name,sub=m?'Holding':'';
  return `<span class="brand-mark">${c.logo?`<img src="${esc(c.logo)}" alt="">`:LOGO}</span><span class="brand-t"><b>${esc(main)}</b>${sub?`<small>${sub}</small>`:''}</span>`;
}
function socialsHtml(){
  const s=S().socials;
  return Object.keys(SOCIAL_LABELS).filter(k=>s[k]).map(k=>`<a class="social" href="${esc(s[k])}" target="_blank" rel="noopener" aria-label="${SOCIAL_LABELS[k]}">${ico(k)}</a>`).join('');
}
function renderChrome(){
  const c=S().company,tb=$('#topbar');if(tb){tb.hidden=true;tb.innerHTML=''}
  $('#nav').innerHTML=`<div class="wrap nav-in"><a class="brand" href="#/" aria-label="${esc(c.name)}, home">${brandHtml(c)}</a>
    <nav class="links" aria-label="Main">${NAV.map(([p,l])=>`<a href="${href(p)}" data-page="${p}">${l}</a>`).join('')}</nav>
    <div class="ctl"><button class="theme-switch" data-act="theme" role="switch" aria-checked="false" aria-label="Dark mode"><span class="ts-knob"></span>${ico('sun','i-sun')}${ico('moon','i-moon')}</button>
    <button class="icon-btn burger" data-act="menu" aria-label="Open menu" aria-expanded="false">${ico('menu','i-m')}${ico('close','i-x')}</button></div></div>`;
  $('#mmenu').innerHTML=`<button class="theme-switch" data-act="theme" role="switch" aria-checked="false" aria-label="Dark mode" style="--i:0"><span class="ts-knob"></span>${ico('sun','i-sun')}${ico('moon','i-moon')}</button>`
    +NAV.map(([p,l],i)=>`<a href="${href(p)}" data-page="${p}" style="--i:${i+1}">${l}</a>`).join('');
  const cmn=new Date().getMonth(),inS=state.products.filter(p=>{const m=seasonMask(p.season);return m&&m[cmn]}).map(p=>esc(p.name));
  let seas='';
  if(inS.length){let g=inS.slice();while(g.length<6)g=g.concat(inS);const one=g.map(n=>`<span>${n}</span><i class="fs-sep"></i>`).join('');seas=`<div class="ft-strip"><div class="wrap"><a class="ft-season" href="#/products"><span class="fs-l"><i class="fs-dot"></i>In season now</span><span class="fs-m"><span class="fs-t">${one}${one}</span></span></a></div></div>`}
  const letters=[...String(c.name)].map((ch,i)=>ch===' '?'<span class="wl sp"></span>':`<span class="wl" style="--i:${i}">${esc(ch)}</span>`).join('');
  const F=state.factories;
  $('#footer').innerHTML=`<i class="ftl" aria-hidden="true"></i><i class="fglow" aria-hidden="true"></i>${seas}
  <div class="wrap ft"><div class="ft-a"><a class="ft-lock" href="#/" aria-label="${esc(c.name)}, home"><span class="brand-mark">${c.logo?`<img src="${esc(c.logo)}" alt="">`:LOGO}</span><span class="ft-name" aria-hidden="true">${letters}</span></a><p class="ft-tag">${esc(c.tagline)}</p><div class="socials ft-soc">${socialsHtml()}</div></div>
  <div class="ft-b"><div class="ft-facs">${F.map(f=>`<a class="fchip" href="#/factories/${esc(f.id)}">${flag(f.code)}${esc(String(f.country).split(',')[0])}</a>`).join('')}</div>
  <div class="ft-credit"><a href="https://wa.me/964${digits('07525229868').replace(/^0+/,'')}" target="_blank" rel="noopener"><i class="fc-br">&lt;/&gt;</i><span class="fc-txt">Crafted by <b class="fc-idx">Mabast<i>index</i></b></span><i class="fc-spark"></i></a></div>
  <div class="ft-ct"><a href="mailto:${esc(c.email)}">${ico('mail')}${esc(c.email)}</a><a href="${tel(c.phone)}">${ico('phone')}${esc(c.phone)}</a></div></div></div>`;
  const ft=$('#footer');
  if(ft&&'IntersectionObserver' in window){if(!ft.dataset.obs){ft.dataset.obs='1';new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){ft.classList.add('in');o.disconnect()}}),{threshold:.15}).observe(ft)}}else if(ft)ft.classList.add('in');
  setNav(current.page);syncThemeUi();
}
function setNav(page){$$('#nav [data-page],#mmenu [data-page],#footer [data-page]').forEach(a=>{if(a.dataset.page===page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}

/* ================= SHARED COMPONENTS ================= */
function pcard(p){
  const f=fById(p.factoryId);
  const code=p.country||(f&&f.code);
  const originName=p.country?countryName(p.country):(f?f.country.split(',')[0]:'');
  return `<a class="pcard" href="#/products/${esc(p.id)}" data-act="product" data-id="${esc(p.id)}" style="--tint:${esc(p.tint||'#CFE3B5')}">
    <div class="parch">${photo(p.image,p.name,p.imageFb)}${p.discount?`<span class="badge">${+p.discount}% off</span>`:''}</div>
    <div class="pmeta"><h3>${esc(p.name)}</h3><p class="pshort">${esc(p.short)}</p>
    <div class="prow">${code?`<span class="origin">${flag(code)}<span>${esc(originName)}</span></span>`:'<span></span>'}<span class="price">${priceHtml(p)}</span></div></div></a>`;
}
const initials=n=>{const w=String(n).replace(/^Atlantik\s+/i,'Atlantik ').split(/\s+/).filter(Boolean);return ((w[0]||'?')[0]+((w[1]||'')[0]||'')).toUpperCase()};
const agentLogo=a=>`<span class="alogo" style="--h:${hashStr(a.name)%360}">${a.logo?`<img src="${esc(a.logo)}" alt="">`:esc(initials(a.name))}</span>`;
function offerCard(a){
  const left=daysLeft(a),expired=left!==null&&left<0;
  const label={offer:'Offer',notice:'Notice',note:'Note'}[a.type]||'Note';
  return `<article class="ocard t-${esc(a.type)}${expired?' expired':''}"><div>${a.discount?`<span class="o-disc"><b>${+a.discount}%</b><small>off</small></span>`:`<span class="o-ico">${ico(a.type==='notice'?'bell':'note')}</span>`}</div>
    <div><span class="o-type">${label}</span><h3>${esc(a.title)}</h3><p>${esc(a.body)}</p>
    <div class="o-foot">${a.until?`<span>${expired?'Ended':left===0?'Ends today':`Ends in ${left} day${left===1?'':'s'}`}</span>`:''}</div></div></article>`;
}
function agentCard(a,i){
  const h=hashStr(a.name)%360,wa=a.whatsapp||a.phone,now=new Date(),hh=now.getHours(),open=/\d/.test(a.hours||'')?true:true;
  return `<article class="ag2" style="--h:${h};--i:${i}"><div class="ag2-spine"><span class="ag2-code">${esc(a.code)}</span><span class="ag2-flagw">${flag(a.code)}</span><i class="ag2-dot" title="Usually available now"></i></div>
  <div class="ag2-body"><div class="ag2-head">${agentLogo(a)}<div><h3>${esc(a.name)}</h3><div class="ag2-loc">${ico('pin')}${esc(a.city)}${COUNTRIES[a.code]?', '+esc(COUNTRIES[a.code]):''}</div></div></div>
  <div class="ag2-mid"><span class="ag2-person"><b>${esc(a.contact)}</b><small>${esc(a.role)}</small></span><span class="ag2-terr"><i>${ico('route')}</i>${esc(a.territory)}</span></div>
  <ul class="ag2-list"><li><a href="${tel(a.phone)}"><span class="ci">${ico('phone')}</span>${esc(a.phone)}</a></li><li><a href="mailto:${esc(a.email)}"><span class="ci">${ico('mail')}</span>${esc(a.email)}</a></li><li><span class="ci">${ico('clock')}</span>${esc(a.hours)}</li></ul>
  <div class="ag2-btns"><a class="btn btn-primary btn-sm" href="${tel(a.phone)}">${ico('phone')}Call</a><a class="btn btn-ghost btn-sm" href="https://wa.me/${digits(wa)}" target="_blank" rel="noopener">${ico('whatsapp')}WhatsApp</a><a class="btn btn-ghost btn-sm" href="mailto:${esc(a.email)}">${ico('mail')}Email</a></div></div></article>`;
}
function fcard(f,i){
  const ps=productsOf(f.id),h=HUES[i%HUES.length],ag=state.agents.find(x=>x.code===f.code);
  return `<a class="fx2" href="#/factories/${esc(f.id)}" style="--h:${h};--i:${i}"><div class="fx2-media">${fphoto(f)}<span class="fx2-shade"></span>
  <span class="fx2-flag">${flag(f.code)}</span>
  <span class="fx2-stamp"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="fxc${i}" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs><text><textPath href="#fxc${i}" startOffset="0">${esc(f.agency)} • EST ${esc(f.since)} • </textPath></text></svg><b>${esc(f.code)}</b></span>
  <span class="fx2-go">${ico('arrow')}</span></div>
  <div class="fx2-body"><h3>${esc(String(f.country).split(',')[0])}</h3><p>${esc(f.city)}</p>
  <dl class="fx2-facts"><div><dt>Since</dt><dd>${esc(f.since)}</dd></div><div><dt>Team</dt><dd>${esc(f.employees)}</dd></div><div><dt>Capacity</dt><dd>${esc(f.capacity)}</dd></div></dl>
  <div class="fx2-foot"><div class="fx2-prods">${ps.slice(0,4).map(p=>`<span class="mini" style="--tint:${esc(p.tint)}">${photo(p.image,p.name,p.imageFb)}</span>`).join('')}${ps.length?`<em>${ps.length}</em>`:''}</div>${ag?`<span class="fx2-ag">${agentLogo(ag)}</span>`:''}</div></div></a>`;
}

const words=t=>String(t).split(/\s+/).filter(Boolean).map((w,i)=>`<span class="w" style="--i:${i}">${esc(w)}</span>`).join(' ');
const photo=(src,alt,fb)=>{const u=src||fb;return `<span class="ph" aria-hidden="true"><b>${esc(((alt||'').trim()[0])||'')}</b></span>${u?`<img class="photo" src="${esc(u)}" alt="${esc(alt)}" loading="lazy" decoding="async" data-photo${fb&&src&&src!==fb?` data-fb="${esc(fb)}"`:''}>`:''}`};
const fphoto=f=>`<span class="fph grain" aria-hidden="true"><b>${esc(String(f.country||'').split(',')[0])}</b></span>${f.image?`<img class="photo" src="${esc(f.image)}" alt="" loading="lazy" decoding="async" data-photo>`:''}`;
const notFound=()=>`<section class="wrap page-head"><h1>Page not found</h1><p class="lead">That page doesn’t exist.</p><p style="margin-top:24px"><a class="btn btn-primary" href="#/">Back to home</a></p></section>`;

/* ================= HERO ================= */
const heroSlides=()=>(state.slides||[]).map(s=>[s.image,undefined,s.caption]);
function initHero(){
  const hero=$('#hero');if(!hero)return null;
  $('.pollen',hero).innerHTML=Array.from({length:REDUCED?0:18},()=>`<i style="left:${rnd(2,98).toFixed(1)}%;--s:${rnd(2,4.5).toFixed(1)}px;--t:${rnd(12,22).toFixed(1)}s;--dl:-${rnd(0,18).toFixed(1)}s;--dx:${rnd(-60,60).toFixed(0)}px"></i>`).join('');
  const dots=$('.hero-dots',hero),cap=$('.hero-cap',hero);
  const paint=()=>{const l=$$('.hero-slide',hero);if(dots)dots.innerHTML=l.length>1?l.map(x=>`<i class="${x.classList.contains('on')?'on':''}"></i>`).join(''):'';const on=l.find(x=>x.classList.contains('on'));const t=on?on.dataset.cap:'';if(cap)cap.innerHTML=t?ico('pin')+esc(t):''};
  const ensure=()=>{const l=$$('.hero-slide',hero);if(l.length&&!l.some(x=>x.classList.contains('on')))l[0].classList.add('on');hero.classList.toggle('has-photo',l.length>0);paint()};
  const ts=[500,1800,4000].map(ms=>setTimeout(ensure,ms));
  const timer=setInterval(()=>{
    const l=$$('.hero-slide',hero);ensure();
    if(l.length<2)return;
    const cur=l.findIndex(x=>x.classList.contains('on'));
    if(cur>-1)l[cur].classList.remove('on');
    l[(cur+1)%l.length].classList.add('on');paint();
  },7000);
  return()=>{ts.forEach(clearTimeout);clearInterval(timer)};
}
function initParallax(){
  const bands=$$('.band'),arts=$$('.intro-art');if(!(bands.length+arts.length)||REDUCED)return null;
  const upd=()=>{const h=window.innerHeight;
    bands.forEach(b=>{const r=b.getBoundingClientRect(),p=1-(r.top+r.height)/(h+r.height);b.style.setProperty('--p',Math.max(0,Math.min(1,p)).toFixed(3))});
    arts.forEach(a=>{const r=a.getBoundingClientRect(),p=((r.top+r.height/2)-h/2)/h;a.style.setProperty('--py',Math.max(-1,Math.min(1,p)).toFixed(3))})};
  window.addEventListener('scroll',upd,{passive:true});upd();
  return()=>window.removeEventListener('scroll',upd);
}

/* ================= PAGES ================= */
const MONTHS=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
function seasonMask(str){
  str=String(str||'').toLowerCase();
  if(/year.?round|all year/.test(str))return Array(12).fill(1);
  const f=[...str.matchAll(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*/g)].map(m=>MONTHS.indexOf(m[1]));
  if(!f.length)return null;
  const m=Array(12).fill(0);
  if(f.length===1){m[f[0]]=1;return m}
  for(let i=f[0],n=0;n<12;i=(i+1)%12,n++){m[i]=1;if(i===f[1])break}
  return m;
}
const MON3=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONF=['January','February','March','April','May','June','July','August','September','October','November','December'];
function seasonRuns(m){
  if(m.every(x=>x))return [[0,12]];
  const out=[],z=m.findIndex(x=>!x);let st=null;
  for(let k=1;k<=12;k++){const i=(z+k)%12;if(m[i]){if(st===null)st=k}else if(st!==null){out.push([(z+st)%12,k-st]);st=null}}
  return out;
}
const runLabel=m=>m.every(x=>x)?'All year':seasonRuns(m).map(([s,l])=>l===1?MON3[s]:`${MON3[s]} to ${MON3[(s+l-1)%12]}`).join(', ');
function deepColor(hex){
  let h=140;const m=/^#?([0-9a-f]{6})$/i.exec(hex||'');
  if(m){const n=parseInt(m[1],16),r=(n>>16&255)/255,g=(n>>8&255)/255,b=(n&255)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;if(d){h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h=Math.round(h*60);if(h<0)h+=360}}
  return [`hsl(${h} 54% 42%)`,`hsl(${h} 60% 62%)`];
}
function storyHtml(){
  const c=S().company;
  return `<section class="story grain" id="story"><div class="story-photo"><img class="photo" src="assets/img/story.jpg" data-fb="${esc(REMOTE.story)}" alt="" loading="lazy" data-photo></div>
  <div class="waves t"><svg viewBox="0 0 1200 40" preserveAspectRatio="none"><path class="wf" d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20 V0H0Z"/><path class="wl" d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20"/></svg></div>
  <div class="wrap story-in"><div class="story-copy"><span class="st-line"></span><h2 class="st-h">${words(c.intro)}</h2><p class="st-p">${esc(c.tagline)}</p></div>
  <div class="lot"><div class="lot-card"><div class="lot-top"><span class="lot-h">Traceability</span><span class="lot-holo"></span></div>
  <div class="lot-code"><span>LOT-2024-ES</span></div>
  <dl><div><dt>Origin</dt><dd>Almería, Spain</dd></div><div><dt>Harvest</dt><dd>Oct 2024</dd></div><div><dt>Agent</dt><dd>Verified</dd></div></dl>
  <div class="lot-tear"></div><div class="lot-bw"><div class="lot-bars"></div><div class="lot-scan"></div></div>
  <div class="lot-trace"><span>Farm</span><span>Factory</span><span>Buyer</span><i class="lot-scan"></i></div>
  <div class="lot-stamp">${ico('check')}<b>OK</b></div></div></div></div>
  <div class="waves b"><svg viewBox="0 0 1200 40" preserveAspectRatio="none"><path class="wf" d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20 V0H0Z"/><path class="wl" d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20"/></svg></div></section>`;
}
function initLot(){
  const story=$('.story');if(!story)return null;
  const lot=$('.lot-card',story);if(!lot)return null;
  const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){story.classList.add('in');io2.disconnect()}}),{threshold:.3});
  io2.observe(story);
  if(REDUCED)return()=>io2.disconnect();
  const onMove=e=>{
    const r=lot.getBoundingClientRect(),mx=(e.clientX-r.left)/r.width,my=(e.clientY-r.top)/r.height;
    lot.style.setProperty('--rx',((.5-my)*10).toFixed(2)+'deg');lot.style.setProperty('--ry',((mx-.5)*10).toFixed(2)+'deg');
    lot.style.setProperty('--gx',(mx*100).toFixed(1)+'%');lot.style.setProperty('--gy',(my*100).toFixed(1)+'%');
  };
  const onLeave=()=>{lot.style.setProperty('--rx','0deg');lot.style.setProperty('--ry','0deg')};
  lot.parentElement.addEventListener('mousemove',onMove);lot.parentElement.addEventListener('mouseleave',onLeave);
  return()=>{io2.disconnect();lot.parentElement.removeEventListener('mousemove',onMove);lot.parentElement.removeEventListener('mouseleave',onLeave)};
}


let stageApi=null;

/* ===== shared: waves ===== */
const wavePath=(base,amp,per=720,n=4)=>{let d=`M0 ${base}`;for(let i=0;i<n;i++){const x=i*per;d+=`C${x+per/6} ${base-amp} ${x+per/3} ${base+amp} ${x+per/2} ${base}S${x+per*5/6} ${base+amp} ${x+per} ${base}`}return d+'V60H0Z'};
const wavesHtml=cls=>`<div class="waves ${cls}" aria-hidden="true"><svg viewBox="0 0 1200 60" preserveAspectRatio="none"><path class="wf" d="${wavePath(30,16)}"/><path class="wl" d="${wavePath(30,16).replace(/V60H0Z$/,'')}"/></svg></div>`;

/* ===== stage: harvest showcase ===== */
function stageHtml(){
  const real=p=>(p.imageFb||/^data:/.test(p.image||''))?1:0,list=state.products.slice().sort((a,b)=>real(b)-real(a)).slice(0,10);
  if(!list.length)return '';
  const cards=list.map((p,k)=>`<a class="sc" href="#/products/${esc(p.id)}" data-act="product" data-id="${esc(p.id)}" data-k="${k}" style="--tint:${esc(p.tint||'#CFE3B5')}"><span class="sc-in">${photo(p.image,p.name,p.imageFb)}${p.discount?`<span class="badge">${+p.discount}% off</span>`:''}<span class="sc-cap"><b>${esc(p.name)}</b><span>${priceHtml(p)}</span></span></span></a>`).join('');
  const dots=list.map((p,k)=>`<button class="sd" type="button" data-k="${k}" aria-label="${esc(p.name)}">${photo(p.image,p.name,p.imageFb)}</button>`).join('');
  return `<section class="stage" id="stage"><div class="stage-bg" aria-hidden="true"></div><div class="stage-word" id="stWord" aria-hidden="true"></div>
  <div class="wrap"><div class="sec-head" data-reveal><h2>This season\u2019s harvest</h2></div></div>
  <div class="wrap stage-grid"><div class="stage-head" data-reveal></div>
  <div class="stage-deck" id="stTrack" tabindex="0" aria-label="Featured products">${cards}</div>
  <div class="stage-infow"><div class="stage-info" id="stInfo" aria-live="polite"></div>
  <div class="stage-ctl"><button class="icon-btn" data-act="stage" data-dir="-1" aria-label="Previous product">${ico('left')}</button><button class="ring-btn" data-act="stage" data-dir="1" aria-label="Next product"><svg class="rb" viewBox="0 0 48 48" aria-hidden="true"><circle class="rb-track" cx="24" cy="24" r="22"/><circle class="rb-prog" cx="24" cy="24" r="22"/></svg>${ico('right')}</button><a class="link" href="#/products">See the full range</a></div>
  <div class="stage-dots">${dots}</div></div></div></section>`;
}
function initStage(){
  const st=$('#stage');if(!st)return null;
  const cards=$$('.sc',st),dots=$$('.sd',st),info=$('#stInfo',st),word=$('#stWord',st),track=$('#stTrack',st),ring=$('.rb-prog',st),n=cards.length;
  if(!n)return null;
  const prods=cards.map(c=>state.products.find(p=>p.id===c.dataset.id)),half=n/2,prevO=cards.map(()=>0);
  let idx=0,timer=null,down=null,dragged=false;
  const render=first=>{
    cards.forEach((c,k)=>{
      let o=((k-idx)%n+n)%n;if(o>half)o-=n;
      const a=Math.abs(o);
      if(!first&&Math.abs(o-prevO[k])>half){c.classList.add('jump');requestAnimationFrame(()=>requestAnimationFrame(()=>c.classList.remove('jump')))}
      prevO[k]=o;c.style.setProperty('--p',o);c.style.zIndex=String(20-Math.round(a));
      c.classList.toggle('on',o===0);c.classList.toggle('far',a>2);c.tabIndex=o===0?0:-1;
    });
    dots.forEach((d,k)=>d.classList.toggle('on',k===idx));
    const p=prods[idx];if(!p)return;const f=fById(p.factoryId);
    info.classList.remove('swap');void info.offsetWidth;
    info.innerHTML=`<h3>${esc(p.name)}</h3><p>${esc(p.short)}</p><div class="si-meta">${f?`<span>${flag(f.code)}${esc(String(f.country).split(',')[0])}</span>`:''}<span>${priceHtml(p)}</span>${p.season?`<span>${ico('clock')}${esc(p.season)}</span>`:''}</div><a class="btn btn-primary" href="#/products/${esc(p.id)}" data-act="product" data-id="${esc(p.id)}">View product</a>`;
    info.classList.add('swap');
    st.style.setProperty('--stint',p.tint||'#CFE3B5');
    word.classList.remove('pop');void word.offsetWidth;word.textContent=p.category||'';word.classList.add('pop');
  };
  const restart=()=>{
    if(timer)clearInterval(timer);
    if(ring){ring.classList.remove('run');void ring.getBoundingClientRect();ring.classList.add('run')}
    if(!REDUCED)timer=setInterval(()=>{idx=(idx+1)%n;render();if(ring){ring.classList.remove('run');void ring.getBoundingClientRect();ring.classList.add('run')}},5600);
  };
  const go=d=>{idx=(idx+d+n)%n;render();restart()};
  const to=k=>{idx=k;render();restart()};
  cards.forEach((c,k)=>c.addEventListener('click',e=>{if(dragged){e.preventDefault();e.stopPropagation();return}if(!c.classList.contains('on')){e.preventDefault();e.stopPropagation();to(k)}}));
  dots.forEach((d,k)=>d.addEventListener('click',()=>to(k)));
  track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}});
  track.addEventListener('pointerdown',e=>{down=e.clientX;dragged=false});
  track.addEventListener('pointermove',e=>{if(down!=null&&Math.abs(e.clientX-down)>12)dragged=true});
  const up=e=>{if(down==null)return;const dx=e.clientX-down;down=null;if(Math.abs(dx)>50){go(dx<0?1:-1)}setTimeout(()=>{dragged=false},60)};
  track.addEventListener('pointerup',up);track.addEventListener('pointercancel',()=>{down=null});
  render(true);restart();stageApi={go};
  return()=>{if(timer)clearInterval(timer);stageApi=null};
}

/* ===== offers: voucher tickets + notices ===== */
function matchProduct(a){
  const txt=(' '+(a.title||'')+' '+(a.body||'')+' ').toLowerCase();
  let best=null,bs=0;
  state.products.forEach(p=>{const sc=String(p.name).toLowerCase().split(/[^a-z]+/).filter(w=>w.length>=4).reduce((n,w)=>n+(new RegExp('\\b'+w.replace(/s$/,'')+'s?\\b').test(txt)?1:0),0);if(sc>bs){bs=sc;best=p}});
  return best;
}
function ticketHtml(a,i){
  const p=matchProduct(a),tint=(p&&p.tint)||'#E9C46A',real=p&&(p.imageFb||/^data:/.test(p.image||''));
  const cd=a.until?`<div class="tk-cdw"><span class="tk-lbl">Ends in</span><div class="tk-cd" aria-label="Time left"><span><b data-u="d">0</b><i>days</i></span><span><b data-u="h">00</b><i>hrs</i></span><span><b data-u="m">00</b><i>min</i></span><span><b data-u="s">00</b><i>sec</i></span></div></div>`:`<span class="tk-open">No end date</span>`;
  const stub=real?photo(p.image,p.name,p.imageFb):`<span class="tk-tone"></span>`;
  return `<article class="tk" data-until="${esc(a.until||'')}" style="--tint:${esc(tint)};--i:${i}"><div class="tk-in">
  <div class="tk-stub grain">${stub}<span class="tk-shade"></span><i class="tk-frame"></i><div class="tk-disc">${a.discount?`<b>${+a.discount}<sup>%</sup></b><small>off</small>`:`<b>${ico('bell')}</b>`}</div>${p?`<span class="tk-prod">${esc(p.name)}</span>`:''}</div>
  <div class="tk-main"><span class="o-type">Offer</span><h3>${esc(a.title)}</h3><p>${esc(a.body)}</p><div class="tk-foot">${cd}<a class="tk-cta" href="#/agents">Ask your agent</a></div></div></div></article>`;
}
const noticeIcon=a=>{const t=(a.title+' '+a.body).toLowerCase();return /ship|dispatch|deliver/.test(t)?'truck':/sample/.test(t)?'gift':(a.type==='notice'?'bell':'note')};
function noticeHtml(a,i){
  const link=/sample/i.test(a.title+' '+a.body)?['#/agents','Ask your agent']:['#/contact','Contact us'];
  return `<article class="nc t-${esc(a.type)}" style="--i:${i}"><span class="nc-med"><i class="nc-ring"></i>${ico(noticeIcon(a))}</span><div class="nc-b"><span class="o-type">${a.type==='notice'?'Notice':'Note'}</span><h3>${esc(a.title)}</h3><p>${esc(a.body)}</p><a class="nc-link" href="${link[0]}">${link[1]}${ico('arrow')}</a></div></article>`;
}
function homeOffersHtml(){
  const live=activeOffers(),others=state.announcements.filter(a=>a.type!=='offer'&&isLive(a)).slice(0,4);
  if(!live.length&&!others.length)return '';
  return `<section class="sec wrap off-sec"><div class="sec-head" data-reveal><div>${live.length?`<span class="live-badge"><i></i>${live.length} active offer${live.length===1?'':'s'}</span>`:''}<h2>Offers and notices</h2></div><a class="link" href="#/contact/offers">All offers${ico('arrow')}</a></div>
  ${live.length?`<div class="tk-grid ol-tk" data-stagger>${live.slice(0,4).map(ticketHtml).join('')}</div>`:''}
  ${others.length?`<div class="nc-grid" data-stagger>${others.map(noticeHtml).join('')}</div>`:''}</section>`;
}
let offersInt=null;
function initOffers(){
  if(offersInt){clearInterval(offersInt);offersInt=null}
  const tks=$$('.tk[data-until]').filter(e=>e.dataset.until);if(!tks.length)return null;
  const upd=()=>tks.forEach(el=>{
    const cd=$('.tk-cd',el);if(!cd)return;
    const diff=new Date(el.dataset.until+'T23:59:59')-new Date();
    if(diff<=0){cd.outerHTML='<span class="tk-open">Ended</span>';return}
    const sec=Math.floor(diff/1000),v={d:String(Math.floor(sec/86400)),h:String(Math.floor(sec%86400/3600)).padStart(2,'0'),m:String(Math.floor(sec%3600/60)).padStart(2,'0'),s:String(sec%60).padStart(2,'0')};
    Object.keys(v).forEach(k=>{const b=$(`[data-u="${k}"]`,cd);if(b&&b.textContent!==v[k])b.textContent=v[k]});
  });
  upd();offersInt=setInterval(upd,1000);return()=>{if(offersInt){clearInterval(offersInt);offersInt=null}};
}

/* ===== factories: immersive showcase ===== */
function fxHtml(){
  const F=state.factories;if(!F.length)return '';
  const hue=i=>HUES[i%HUES.length];
  const bgs=F.map((f,i)=>`<div class="fz-bg${i===0?' on':''}" style="--h:${hue(i)}"><svg class="fz-flag" viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${FLAGS[f.code]||''}</svg>${f.image?`<img class="photo" src="${esc(f.image)}" alt="" loading="lazy" data-photo>`:''}<i class="fz-aur"></i></div>`).join('');
  const conts=F.map((f,i)=>{const ps=productsOf(f.id);return `<article class="fz-c${i===0?' on':''}"><span class="fz-fl">${flag(f.code)}</span><h3 class="fz-country">${esc(String(f.country).split(',')[0])}</h3><p class="fz-sub">${esc(f.agency)}, ${esc(f.city)}</p>
    <div class="fz-facts">${f.director?`<span>Director <b>${esc(f.director)}</b></span>`:''}${f.since?`<span>Since <b>${esc(f.since)}</b></span>`:''}${f.employees?`<span>Team <b>${esc(f.employees)}</b></span>`:''}${f.capacity?`<span>Capacity <b>${esc(f.capacity)}</b></span>`:''}</div>
    ${(f.certs||[]).length?`<div class="fz-certs">${f.certs.map(x=>`<span>${ico('check')}${esc(x)}</span>`).join('')}</div>`:''}
    <div class="fz-row2"><div class="fz-prods">${ps.slice(0,4).map(p=>`<span class="mini" style="--tint:${esc(p.tint)}">${photo(p.image,p.name,p.imageFb)}</span>`).join('')}${ps.length?`<em>${ps.length} product${ps.length===1?'':'s'}</em>`:''}</div><a class="btn btn-primary" href="#/factories/${esc(f.id)}">Open factory</a></div></article>`}).join('');
  const tabs=F.map((f,i)=>{const n=productsOf(f.id).length;return `<li><a class="fz-tab${i===0?' on':''}" data-i="${i}" href="#/factories/${esc(f.id)}">${flag(f.code)}<span><b>${esc(String(f.country).split(',')[0])}</b><small>${esc(f.city)}</small></span><em>${n}</em><i class="fz-prog"></i></a></li>`}).join('');
  return `<section class="fz grain" id="fx" data-reveal><div class="fz-bgs" aria-hidden="true">${bgs}</div><div class="fz-scrim" aria-hidden="true"></div>
  <div class="wrap fz-in"><div class="fz-title"><h2>Where it is grown and packed</h2><a class="link" href="#/factories">Meet the factories</a></div><div class="fz-cont">${conts}</div><ul class="fz-tabs">${tabs}</ul></div></section>`;
}
function initFx(){
  const el=$('#fx');if(!el)return null;
  const bg=$$('.fz-bg',el),cs=$$('.fz-c',el),ts=$$('.fz-tab',el),n=cs.length;if(!n)return null;
  let i=0,t=null;
  const set=k=>{i=k;bg.forEach((p,j)=>p.classList.toggle('on',j===k));cs.forEach((p,j)=>p.classList.toggle('on',j===k));ts.forEach((r,j)=>{r.classList.remove('on');if(j===k){void r.offsetWidth;r.classList.add('on')}})};
  const start=()=>{if(t)clearInterval(t);if(!REDUCED)t=setInterval(()=>set((i+1)%n),6500)};
  ts.forEach((r,k)=>{r.addEventListener('mouseenter',()=>{set(k);start()});r.addEventListener('focus',()=>{set(k);start()})});
  set(0);start();
  return()=>{if(t)clearInterval(t)};
}

/* ===== values ===== */
function valuesHtml(){
  const pillars=[['leaf','Grown near the source','Growers work within a short drive of each factory, so fruit and grain reach the packing line hours after harvest.','#/factories','Meet the factories'],
    ['box','Packed where it is picked','Sorting, packing and quality checks happen on site, with lot numbers that follow the product all the way to you.','#/products','Browse products'],
    ['route','Delivered by people you can call','Every order goes through an authorised agent who knows your market, your paperwork and your delivery window.','#/agents','Find an agent']];
  return `<section class="sec wrap vals"><div class="sec-head" data-reveal><h2>What you can count on</h2><p class="lead" style="max-width:38ch">Three promises that stand behind every order.</p></div>
  <div class="vgrid" data-stagger>${pillars.map(([i,t,d,h,l])=>`<article class="vc"><div class="vc-img"><span class="ph" aria-hidden="true"><b></b></span></div>
  <div class="vc-body"><span class="vc-med"><i class="vc-ring"></i>${ico(i)}</span><h3>${t}</h3><p>${d}</p><a class="vc-link" href="${h}">${l}${ico('arrow')}</a></div></article>`).join('')}</div></section>`;
}

/* ===== route: holding network ===== */
function routeHtml(){
  const F=state.factories,A=state.agents;if(!F.length||!A.length)return '';
  const fc=F.map((f,i)=>{const ps=productsOf(f.id);return `<a class="rn rn-f" href="#/factories/${esc(f.id)}" data-k="f${i}" style="--h:${HUES[i%HUES.length]};--n2:${i}"><span class="rn-tag">Factory</span><span class="rn-go">${ico('arrow')}</span><span class="rn-flag">${flag(f.code)}</span><b class="rn-t">${esc(String(f.country).split(',')[0])}</b><small class="rn-s">${esc(f.city)}</small><span class="rn-a">${esc(f.agency)}</span><span class="rn-p">${ps.slice(0,4).map(p=>`<span class="mini" style="--tint:${esc(p.tint)}">${photo(p.image,p.name,p.imageFb)}</span>`).join('')}<em>${ps.length} product${ps.length===1?'':'s'}</em></span></a>`}).join('');
  const ac=A.map((a,j)=>`<a class="rn rn-g" href="#/agents" data-k="g${j}" style="--h:${hashStr(a.name)%360};--n2:${j+F.length}"><span class="rn-tag">Agent</span><span class="rn-go">${ico('arrow')}</span>${agentLogo(a)}<b class="rn-t">${esc(a.city)}</b><small class="rn-s">${esc(a.territory)}</small><span class="rn-a">${esc(a.contact)}, ${esc(a.role)}</span><span class="rn-ph">${ico('phone')}${esc(a.phone)}</span></a>`).join('');
  return `<section class="sec wrap"><div class="sec-head" data-reveal><h2>From ${F.length} origins to every market</h2><p class="lead" style="max-width:40ch">Each factory supplies the holding, and our authorised agents deliver to buyers in their own region.</p></div>
  <div class="rt" id="rt" data-reveal><div class="rt-row" style="--n:${F.length}">${fc}</div>
  <div class="rt-hubrow"><div class="hub" aria-hidden="true"><i class="hub-p"></i><i class="hub-p b"></i><span class="hub-core">${LOGO}</span></div></div>
  <div class="rt-row" style="--n:${A.length}">${ac}</div><svg class="rt-svg" aria-hidden="true"></svg></div></section>`;
}
function initRoute(){
  const box=$('#rt');if(!box)return null;
  const svg=$('.rt-svg',box),core=$('.hub-core',box),tops=$$('.rn-f',box),bots=$$('.rn-g',box);
  const mq=window.matchMedia?matchMedia('(max-width:900px)'):{matches:false};
  const draw=()=>{
    if(mq.matches){svg.innerHTML='';return}
    const b=box.getBoundingClientRect(),hr=core.getBoundingClientRect();
    if(!b.width)return;
    svg.setAttribute('viewBox',`0 0 ${b.width.toFixed(1)} ${b.height.toFixed(1)}`);
    const hx=hr.left-b.left+hr.width/2,hy=hr.top-b.top+hr.height/2,R=hr.width/2+2,step=.46,f1=v=>v.toFixed(1);
    let out='',pins='',t=0;
    const add=(el,i,n,dir,key)=>{
      const r=el.getBoundingClientRect(),x=r.left-b.left+r.width/2,y=(dir<0?r.bottom:r.top)-b.top,mid=(n-1)/2;
      const ang=dir<0?-Math.PI/2+(i-mid)*step:Math.PI/2-(i-mid)*step,px=hx+R*Math.cos(ang),py=hy+R*Math.sin(ang),dy=Math.abs(py-y)*.55;
      const d=dir<0?`M${f1(x)} ${f1(y)}C${f1(x)} ${f1(y+dy)} ${f1(px)} ${f1(py-dy)} ${f1(px)} ${f1(py)}`:`M${f1(px)} ${f1(py)}C${f1(px)} ${f1(py+dy)} ${f1(x)} ${f1(y-dy)} ${f1(x)} ${f1(y)}`;
      const dots=[0,1].map(k=>{const du=(5.2+k*.9).toFixed(1),bg='-'+(k*2.6+i*.7).toFixed(1)+'s';return `<g><circle class="halo" r="7"/><circle class="dot" r="3.2"/><animateMotion dur="${du}s" begin="${bg}" repeatCount="indefinite" path="${d}"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.88;1" dur="${du}s" begin="${bg}" repeatCount="indefinite"/></g>`}).join('');
      out+=`<g class="pg" data-k="${key}" data-t="${dir<0?'f':'g'}"><path class="rl base" pathLength="1" d="${d}" style="--dl:${(.2+t*.14).toFixed(2)}s"/><path class="rl flow" d="${d}"/>${dots}</g>`;t++;
      pins+=`<circle class="pin" cx="${f1(x)}" cy="${f1(y)}" r="4.5"/><circle class="pin" cx="${f1(px)}" cy="${f1(py)}" r="3.5"/>`;
    };
    tops.forEach((el,i)=>add(el,i,tops.length,-1,'f'+i));bots.forEach((el,i)=>add(el,i,bots.length,1,'g'+i));
    svg.innerHTML=out+pins;
  };
  const focus=(key,type)=>{svg.classList.add('has-focus');box.classList.add('focus');$$('.pg',svg).forEach(g=>{const same=g.dataset.k===key;g.classList.toggle('on',same);g.classList.toggle('soft',!same&&g.dataset.t!==type)})};
  const blur=()=>{svg.classList.remove('has-focus');box.classList.remove('focus');$$('.pg',svg).forEach(g=>g.classList.remove('on','soft'))};
  [...tops,...bots].forEach(el=>{const k=el.dataset.k,ty=k[0],a=()=>focus(k,ty);el.addEventListener('mouseenter',a);el.addEventListener('focus',a);el.addEventListener('mouseleave',blur);el.addEventListener('blur',blur)});
  let raf=0;const sched=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(draw)};
  let ro=null;if('ResizeObserver' in window){ro=new ResizeObserver(sched);ro.observe(box)}else window.addEventListener('resize',sched);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sched);
  sched();
  return()=>{cancelAnimationFrame(raf);if(ro)ro.disconnect();else window.removeEventListener('resize',sched)};
}

/* ===== harvest calendar wheel ===== */
function calendarHtml(){
  const now=new Date(),cm=now.getMonth();
  const rows=state.products.map(p=>({p,m:seasonMask(p.season)})).filter(r=>r.m);
  if(!rows.length)return '';
  const n=rows.length,cx=320,cy=320,step=Math.min(16,140/n),th=step*.72,r0=236,f=v=>v.toFixed(2);
  const P=(r,a)=>{const t=(a-90)*Math.PI/180;return [cx+r*Math.cos(t),cy+r*Math.sin(t)]};
  const nowCount=rows.filter(r=>r.m[cm]).length,rl=r0-(n-1)*step,hole=rl-th/2-10,rOut=r0+th/2+8;
  const dim=new Date(now.getFullYear(),cm+1,0).getDate(),ang=(cm+(now.getDate()-1)/dim)*30;
  const seps=Array.from({length:12},(_,i)=>{const [x1,y1]=P(hole+4,i*30),[x2,y2]=P(rOut,i*30);return `<line class="hws" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/>`}).join('');
  const labs=MON3.map((t,i)=>{const [x,y]=P(rOut+17,i*30+15);return `<text class="hwm${i===cm?' now':''}" x="${f(x)}" y="${f(y)}" text-anchor="middle" dominant-baseline="middle">${t}</text>`}).join('');
  const [w1x,w1y]=P(rOut,cm*30),[w2x,w2y]=P(rOut,cm*30+30),[w3x,w3y]=P(hole+4,cm*30+30),[w4x,w4y]=P(hole+4,cm*30);
  const wedge=`<path class="hwn" d="M${f(w1x)} ${f(w1y)}A${f(rOut)} ${f(rOut)} 0 0 1 ${f(w2x)} ${f(w2y)}L${f(w3x)} ${f(w3y)}A${f(hole+4)} ${f(hole+4)} 0 0 0 ${f(w4x)} ${f(w4y)}Z"/>`;
  const rings=rows.map(({p,m},i)=>{
    const r=r0-i*step,[c1,c2]=deepColor(p.tint);let arcs='';
    if(m.every(x=>x))arcs=`<circle class="hwr" cx="${cx}" cy="${cy}" r="${f(r)}" pathLength="1" transform="rotate(-90 ${cx} ${cy})"/>`;
    else seasonRuns(m).forEach(([s,l])=>{const ins=(th/2)/r*180/Math.PI+.5,a1=s*30+ins,a2=(s+l)*30-ins;if(a2<=a1)return;const [x1,y1]=P(r,a1),[x2,y2]=P(r,a2);arcs+=`<path class="hwr" pathLength="1" d="M${f(x1)} ${f(y1)}A${f(r)} ${f(r)} 0 ${a2-a1>180?1:0} 1 ${f(x2)} ${f(y2)}"/>`});
    return `<g class="hwg" data-i="${i}" style="--c:${c1};--cd:${c2};--d:${(i*.09).toFixed(2)}s"><circle class="hwt" cx="${cx}" cy="${cy}" r="${f(r)}"/>${arcs}</g>`;
  }).join('');
  const [nx1,ny1]=P(hole+2,0),[nx2,ny2]=P(rOut+2,0);
  const needle=`<g class="needle" style="--a:${ang.toFixed(1)}deg"><line x1="${f(nx1)}" y1="${f(ny1)}" x2="${f(nx2)}" y2="${f(ny2)}"/><circle class="nh" cx="${f(nx2)}" cy="${f(ny2)}" r="9"/><circle class="nd" cx="${f(nx2)}" cy="${f(ny2)}" r="4.5"/></g>`;
  const info=rows.map(({p,m})=>({n:p.name,r:runLabel(m),now:!!m[cm]}));
  const legend=rows.map(({p,m},i)=>{const [c1,c2]=deepColor(p.tint);return `<li><a class="hl-row" href="#/products/${esc(p.id)}" data-act="product" data-id="${esc(p.id)}" data-i="${i}" style="--c:${c1};--cd:${c2}"><i class="hl-dot"></i><span class="hl-n">${esc(p.name)}</span><span class="hl-m">${esc(runLabel(m))}</span><i class="hl-now${m[cm]?' on':''}" title="${m[cm]?'In season now':''}"></i></a></li>`}).join('');
  return `<section class="sec wrap" id="calendar"><div class="sec-head" data-reveal><h2>Harvest calendar</h2><p class="lead" style="max-width:38ch">See when each product is at its best. The current month is highlighted.</p></div>
  <div class="hcal"><div class="hl-wrap" data-reveal><div class="hl-head"><b data-count="${nowCount}">${nowCount}</b><span>products in season<br><em>${MONF[cm]}</em></span></div><ul class="hl" id="hl">${legend}</ul></div>
  <div class="hw" id="hw" data-reveal data-info="${esc(JSON.stringify(info))}" data-def="${esc(JSON.stringify({m:MONF[cm],c:nowCount}))}"><svg viewBox="0 0 640 640" style="--th:${f(th)}" role="img" aria-label="Harvest calendar wheel"><circle class="hwo" cx="${cx}" cy="${cy}" r="${f(rOut+2)}"/>${wedge}${seps}${labs}${rings}${needle}</svg>
  <div class="hw-c" id="hwC" style="--hw:${((hole*2*.86)/640*100).toFixed(1)}%"><small>Now</small><b>${MONF[cm]}</b><span>${nowCount} in season</span></div></div></div></section>`;
}
function initWheel(){
  const hw=$('#hw');if(!hw)return null;
  const gs=$$('.hwg',hw),rows=$$('.hl-row'),c=$('#hwC',hw);
  let info=[],def={};try{info=JSON.parse(hw.dataset.info);def=JSON.parse(hw.dataset.def)}catch(e){return null}
  const focus=i=>{hw.classList.add('has-focus');gs.forEach(g=>g.classList.toggle('on',+g.dataset.i===i));rows.forEach(r=>r.classList.toggle('on',+r.dataset.i===i));const x=info[i];if(x)c.innerHTML=`<small>${x.now?'In season now':'Out of season'}</small><b>${esc(x.n)}</b><span>${esc(x.r)}</span>`};
  const reset=()=>{hw.classList.remove('has-focus');gs.forEach(g=>g.classList.remove('on'));rows.forEach(r=>r.classList.remove('on'));c.innerHTML=`<small>Now</small><b>${esc(def.m)}</b><span>${def.c} in season</span>`};
  gs.forEach(g=>{g.addEventListener('mouseenter',()=>focus(+g.dataset.i));g.addEventListener('mouseleave',reset)});
  rows.forEach(r=>{r.addEventListener('mouseenter',()=>focus(+r.dataset.i));r.addEventListener('focus',()=>focus(+r.dataset.i));r.addEventListener('mouseleave',reset);r.addEventListener('blur',reset)});
  return null;
}

/* ===== cta: full-bleed agent deck ===== */
function ctaHtml(){
  const A=state.agents;
  const cards=A.map(a=>`<div class="ac2"><div class="ac2-h">${agentLogo(a)}<div><b>${esc(a.name)}</b><small>${flag(a.code)}${esc(a.city)}${COUNTRIES[a.code]?', '+esc(COUNTRIES[a.code]):''}</small></div></div><p>${esc(a.territory)}</p><div class="ac2-ph"><span class="ac2-ic">${ico('phone')}<i></i></span><span>${esc(a.phone)}</span></div><div class="ac2-b"><a class="btn btn-primary btn-sm" href="${tel(a.phone)}">Call</a><a class="btn btn-ghost btn-sm" href="https://wa.me/${digits(a.whatsapp||a.phone)}" target="_blank" rel="noopener">WhatsApp</a></div></div>`).join('');
  return `<section class="cta2 grain"><div class="wrap cta2-in"><div class="cta2-l"><h2>Buy through an authorised agent</h2><p>Our agents handle pricing, samples, paperwork and delivery in your region. Pick the one closest to you.</p>
  <div class="cta2-btns"><a class="btn btn-primary" href="#/agents">See all agents</a><a class="btn btn-ghost" href="#/contact">Become an agent</a></div>
  ${A.length?`<div class="cta2-avs"><span class="avs">${A.slice(0,5).map(agentLogo).join('')}</span><span>${A.length} authorised agent${A.length===1?'':'s'} ready to help</span></div>`:''}</div>
  <div class="cta2-r"><i class="cta2-ring"></i><i class="cta2-ring r2"></i><i class="cta2-ring r3"></i><div class="cta2-deck" id="ctaDeck">${cards}</div></div></div></section>`;
}
function initCtaDeck(){
  const deck=$('#ctaDeck');if(!deck)return null;
  const cs=$$('.ac2',deck),n=cs.length;if(!n)return null;
  let idx=0;const prev=cs.map(()=>0);
  const render=first=>cs.forEach((c,k)=>{
    const o=((k-idx)%n+n)%n,q=(n>2&&o===n-1)?-1:Math.min(o,3);
    if(!first&&Math.abs(q-prev[k])>2){c.classList.add('jump');requestAnimationFrame(()=>requestAnimationFrame(()=>c.classList.remove('jump')))}
    prev[k]=q;c.style.setProperty('--q',q);c.style.zIndex=String(q<0?12:10-q);c.classList.toggle('out',q<0);c.classList.toggle('back',q>2);
  });
  render(true);
  const t=(REDUCED||n<2)?null:setInterval(()=>{idx=(idx+1)%n;render()},3800);
  return()=>{if(t)clearInterval(t)};
}

/* ===== faq ===== */
function faqHtml(){
  const c=S().company,FAQ=state.faqs||[];
  if(!FAQ.length)return '';
  const wa=S().socials.whatsapp;
  return `<section class="sec wrap faq-sec"><div class="faq-grid"><aside class="faq-aside" data-reveal><div class="faq-card grain"><span class="faq-mark" aria-hidden="true">?</span><h2>Questions buyers ask</h2><p>Can\u2019t find your answer? Write to us or call, and we will reply within one working day.</p>
  <div class="faq-ctas"><a class="btn btn-primary" href="mailto:${esc(c.email)}">${ico('mail')}Email us</a><a class="btn btn-ghost" href="${tel(c.phone)}">${ico('phone')}Call</a>${wa?`<a class="btn btn-ghost" href="${esc(wa)}" target="_blank" rel="noopener">${ico('wa')}WhatsApp</a>`:''}</div></div></aside>
  <div class="faq-main" data-reveal><div class="fqs" id="fqs">${FAQ.map((f,i)=>`<div class="fq${i===0?' open':''}"><button class="fq-h" data-act="fq" aria-expanded="${i===0}"><span>${esc(f.question)}</span><i class="pm" aria-hidden="true"></i></button><div class="fq-a"><div><p>${esc(f.answer)}</p></div></div></div>`).join('')}</div></div></div></section>`;
}

/* ===== journey: field to pallet ===== */
function journeyHtml(){
  const steps=[['leaf','Harvest','Picked at peak ripeness by the growers we work with, close to each factory.'],['search','Sort and grade','Optical and hand sorting by size, colour and quality, with samples tested in our lab.'],['box','Pack and label','Packed on site in the format you need, with a lot number that stays with the product.'],['route','Ship and deliver','Sent by sea or road, in refrigerated containers where needed, and handed to your agent.']];
  return `<section class="jn grain" data-reveal><div class="jn-bg" aria-hidden="true"><img src="assets/img/story.jpg" data-fb="${esc(REMOTE.story)}" alt="" loading="lazy" data-photo></div>
  <div class="wrap jn-in"><div class="jn-head"><h2>From field to pallet</h2><p class="lead">Four steps, the same care at every one.</p></div>
  <div class="jn-track"><i class="jn-line" aria-hidden="true"></i><i class="jn-dot" aria-hidden="true"></i><ol class="jn-row">${steps.map(([i,t,d],k)=>`<li class="jn-col" style="--k:${k}"><span class="jn-node">${ico(i)}</span><span class="jn-stem" aria-hidden="true"></span><div class="jn-card"><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol></div></div></section>`;
}



function initAcc(){
  const arts=$$('.acc-art');if(!arts.length)return null;
  const cleanups=[];
  arts.forEach(art=>{
    const cards=$$('.acc',art);if(!cards.length)return;
    cards[0].classList.add('on');
    const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){art.classList.add('in');io2.disconnect()}}),{threshold:.2});
    io2.observe(art);cleanups.push(()=>io2.disconnect());
    cards.forEach(c=>{
      const enter=()=>{cards.forEach(x=>x.classList.toggle('on',x===c))};
      c.addEventListener('mouseenter',enter);c.addEventListener('focus',enter);
      cleanups.push(()=>{c.removeEventListener('mouseenter',enter);c.removeEventListener('focus',enter)});
    });
  });
  return()=>cleanups.forEach(c=>c());
}
function pageHome(){
  const c=S().company,slides=heroSlides();
  return `<section class="hero on-hero" id="hero"><div class="hero-bg"></div>
  <div class="hero-slides">${slides.map(([src,fb,cap],i)=>`<div class="hero-slide${i===0?' on':''}" data-cap="${esc(cap||'')}"><img class="photo" src="${esc(src)}" data-fb="${esc(fb)}" data-slide alt="" loading="${i===0?'eager':'lazy'}"></div>`).join('')}</div>
  <div class="hero-scrim"></div><div class="pollen"></div>
  <div class="wrap hero-copy"><h1 class="grow">${words(c.tagline)}</h1><p class="lead hero-in" style="--i:6">${esc(c.intro)}</p>
  <div class="hero-cta hero-in" style="--i:7"><a class="btn btn-primary" href="#/products">Explore products</a><a class="btn btn-ghost" href="#/agents">Find an agent</a></div></div>
  <div class="hero-strip"><div class="wrap hs-in"><ul class="hero-facts"><li><b>${state.factories.length}</b><span>Factories</span></li><li><b>${new Set(state.factories.map(f=>f.code)).size}</b><span>Countries</span></li><li><b>${state.products.length}</b><span>Products</span></li><li><b>${state.agents.length}</b><span>Agents</span></li></ul><div class="hero-dots"></div></div></div>
  <div class="hero-fade"></div></section>
  <div class="marquee"><div class="mq-track">${Array.from({length:2},()=>state.products.slice(0,6).map(p=>`<span>${esc(p.name)}</span><i class="mq-dot"></i>`).join('')).join('')}</div></div>
  ${storyHtml()}
  ${stageHtml()}
  ${homeOffersHtml()}
  ${fxHtml()}
  ${journeyHtml()}
  ${valuesHtml()}
  ${routeHtml()}
  ${calendarHtml()}
  ${ctaHtml()}
  ${faqHtml()}`;
}

function filteredP(){
  let P=state.products.slice();
  if(ui.cat!=='All')P=P.filter(p=>p.category===ui.cat);
  if(ui.origin!=='All'){const f=state.factories.find(x=>x.country===ui.origin||x.id===ui.origin);if(f)P=P.filter(p=>p.factoryId===f.id)}
  if(ui.season){const cm=new Date().getMonth();P=P.filter(p=>{const m=seasonMask(p.season);return m&&m[cm]})}
  if(ui.offer)P=P.filter(p=>p.discount>0);
  if(ui.q.trim()){const q=ui.q.trim().toLowerCase();P=P.filter(p=>p.name.toLowerCase().includes(q)||p.short.toLowerCase().includes(q)||p.category.toLowerCase().includes(q))}
  if(ui.sort==='price-asc')P.sort((a,b)=>finalPrice(a)-finalPrice(b));
  else if(ui.sort==='price-desc')P.sort((a,b)=>finalPrice(b)-finalPrice(a));
  else if(ui.sort==='name')P.sort((a,b)=>a.name.localeCompare(b.name));
  return P;
}
function pcardX(p,i){return pcard(p)}
function activeHtml(){
  const chips=[];
  if(ui.cat!=='All')chips.push(['cat',`Category: ${ui.cat}`]);
  if(ui.origin!=='All')chips.push(['origin',`Origin: ${ui.origin}`]);
  if(ui.season)chips.push(['season','In season']);
  if(ui.offer)chips.push(['offer','On offer']);
  if(ui.q.trim())chips.push(['q',`"${ui.q.trim()}"`]);
  if(!chips.length)return '';
  return `<div class="active-chips">${chips.map(([k,l])=>`<button class="chip on" data-act="unf" data-k="${k}">${esc(l)}${ico('close')}</button>`).join('')}<button class="chip ghost" data-act="clear">Clear all</button></div>`;
}
function panelHtml(){
  const cats=['All',...new Set(state.products.map(p=>p.category))];
  const origins=['All',...new Set(state.factories.map(f=>f.country))];
  return `<aside class="pfilters"><div class="pf-block"><h4>Category</h4><div class="chips">${cats.map(c=>`<button class="chip${ui.cat===c?' on':''}" data-act="cat" data-v="${esc(c)}">${esc(c)}</button>`).join('')}</div></div>
  <div class="pf-block"><h4>Origin</h4><div class="chips">${origins.map(o=>`<button class="chip${ui.origin===o?' on':''}" data-act="origin" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div></div>
  <div class="pf-block"><label class="check"><input type="checkbox" data-act="tog" data-k="season"${ui.season?' checked':''}><span>In season now</span></label></div>
  <div class="pf-block"><label class="check"><input type="checkbox" data-act="tog" data-k="offer"${ui.offer?' checked':''}><span>On offer</span></label></div></aside>`;
}
function pageProducts(){
  const c=S().company;
  return `<section class="wrap page-head" data-reveal><h1>${esc(c.productsTitle||'Our harvest')}</h1><p class="lead">${esc(c.productsLead||'Everything we grow, pack and ship. Explore by category, origin or season, and open any product for prices and specifications.')}</p>
  <div class="stat-chips"><span class="chip stat"><b>${state.products.length}</b>products</span><span class="chip stat"><b>${new Set(state.factories.map(f=>f.country)).size}</b>origins</span><span class="chip stat"><b>${state.products.filter(p=>{const m=seasonMask(p.season),cm=new Date().getMonth();return m&&m[cm]}).length}</b>in season now</span></div></section>
  <section class="wrap psearch" data-reveal><div class="pfield"><input id="q" type="search" placeholder="Search products" value="${esc(ui.q)}">${ico('search')}</div>
  <select id="psort"><option value="featured"${ui.sort==='featured'?' selected':''}>Featured</option><option value="name"${ui.sort==='name'?' selected':''}>Name</option><option value="price-asc"${ui.sort==='price-asc'?' selected':''}>Price: low to high</option><option value="price-desc"${ui.sort==='price-desc'?' selected':''}>Price: high to low</option></select></section>
  <section class="wrap pbody"><div class="pcount" id="pcount">Showing <b>${filteredP().length}</b> of ${state.products.length} products</div>
  <div class="pgrid-wrap">${panelHtml()}<div id="pgrid" class="pgrid">${filteredP().map(pcardX).join('')}</div></div>${activeHtml()}</section>`;
}
function syncPanel(){
  $$('.pf-block .chips .chip',document).forEach(b=>{});
}
function movePill(){}
function renderGrid(){
  const g=$('#pgrid');if(!g)return;
  const P=filteredP();
  g.innerHTML=P.length?P.map(pcardX).join(''):`<p class="empty-msg">No products match these filters.</p>`;
  const c=$('#pcount');if(c)c.innerHTML=`Showing <b>${P.length}</b> of ${state.products.length} products`;
  $$('.pf-block .chips .chip',document).forEach(b=>{
    if(b.dataset.act==='cat')b.classList.toggle('on',b.dataset.v===ui.cat);
    if(b.dataset.act==='origin')b.classList.toggle('on',b.dataset.v===ui.origin);
  });
  const act=$('.active-chips');if(act)act.outerHTML=activeHtml();else{const sec=$('.pbody .pcount');if(sec)sec.insertAdjacentHTML('afterend',activeHtml())}
  reveal(g);
}
function initProducts(){return null}

function productSheet(p){
  const f=fById(p.factoryId);
  return `<div class="fd-wrap"><button type="button" class="x" data-act="close" aria-label="Close">${ico('close')}</button>
  <div class="fd-media">${photo(p.image,p.name,p.imageFb)}${p.discount?`<span class="badge">${+p.discount}% off</span>`:''}</div>
  <div class="fd-body"><h2>${esc(p.name)}</h2><p class="lead">${esc(p.short)}</p>
  <div class="fd-price">${priceHtml(p)}</div>
  <p>${esc(p.description)}</p>
  <ul class="fd-feat">${(p.features||[]).map(x=>`<li>${ico('check')}${esc(x)}</li>`).join('')}</ul>
  <dl class="fd-specs"><div><dt>Packaging</dt><dd>${esc(p.packaging)}</dd></div><div><dt>Shelf life</dt><dd>${esc(p.shelfLife)}</dd></div><div><dt>Minimum order</dt><dd>${esc(p.moq)}</dd></div><div><dt>Season</dt><dd>${esc(p.season)}</dd></div></dl>
  ${f?`<div class="fd-pass">${flag(f.code)}<div><small>Made at</small><b>${esc(f.agency)}, ${esc(String(f.country).split(',')[0])}</b></div></div>`:''}
  <a class="btn btn-primary" href="#/agents">Enquire through an agent</a></div></div>`;
}

function pageFactories(){
  const F=state.factories,c=S().company;
  const lead=(c.factoriesLead||'{n} factories across {m} countries, each packing what its own growers bring in.').replace('{n}',F.length).replace('{m}',new Set(F.map(f=>f.code)).size);
  return `<section class="wrap page-head" data-reveal><h1>${esc(c.factoriesTitle||'Our factories')}</h1><p class="lead">${esc(lead)}</p></section>
  <section class="wrap"><div class="fx-grid" data-stagger>${F.map((f,i)=>fcard(f,i)).join('')}</div></section>`;
}
function pageFactory(id){
  const f=fById(id);if(!f)return notFound();
  const ps=productsOf(f.id);
  return `<section class="wrap page-head" data-reveal>${flag(f.code)}<h1>${esc(f.agency)}</h1><p class="lead">${esc(f.city)}, ${esc(String(f.country).split(',')[0])} — established ${esc(f.since)}</p></section>
  <section class="wrap"><p>${paras(f.description)}</p>
  <dl class="fd-specs"><div><dt>Director</dt><dd>${esc(f.director)}</dd></div><div><dt>Team</dt><dd>${esc(f.employees)}</dd></div><div><dt>Capacity</dt><dd>${esc(f.capacity)}</dd></div></dl>
  ${(f.certs||[]).length?`<div class="certs"><span>Certifications</span>${(f.certs||[]).map(c=>`<span class="chip tag">${ico('check')}${esc(c)}</span>`).join('')}</div>`:''}
  ${ps.length?`<div class="sec-head" style="margin-top:40px"><h2>Products from this factory</h2></div><div class="pgrid">${ps.map(pcardX).join('')}</div>`:''}</section>`;
}

function agentsMatch(a,q){return !q||[a.name,a.contact,a.city,a.territory,COUNTRIES[a.code]||''].join(' ').toLowerCase().includes(q)}
function agentsGridHtml(){
  const q=(ui.aq||'').trim().toLowerCase();
  return state.agents.filter(a=>agentsMatch(a,q)).map((a,i)=>agentCard(a,i)).join('');
}
function renderAgentsGrid(){const g=$('#agrid');if(!g)return;g.innerHTML=agentsGridHtml();const c=$('#acount');if(c)c.textContent=state.agents.filter(a=>agentsMatch(a,(ui.aq||'').trim().toLowerCase())).length+' of '+state.agents.length;reveal(g)}
function pageAgents(){
  const c=S().company;
  return `<section class="wrap page-head" data-reveal><h1>${esc(c.agentsTitle||'Authorised agents')}</h1><p class="lead">${esc(c.agentsLead||'Our agents are the sales centres for their regions: pricing, samples, paperwork and delivery, handled by someone you can actually call.')}</p></section>
  <section class="wrap"><div class="asearch"><input id="aq" type="search" placeholder="Search by city, country or territory">${ico('search')}<span id="acount" class="acount">${state.agents.length} of ${state.agents.length}</span></div>
  <div id="agrid" class="ag2-grid" data-stagger>${agentsGridHtml()}</div></section>`;
}
function initAgentsPage(){
  const inp=$('#aq');if(!inp)return null;
  const on=e=>{ui.aq=e.target.value;renderAgentsGrid()};
  inp.addEventListener('input',on);
  return()=>inp.removeEventListener('input',on);
}

function pageAbout(){
  const c=S().company,a=S().agent;
  return `<section class="wrap page-head" data-reveal><h1>${esc(c.name)}</h1><p class="lead">${esc(c.aboutLead||c.tagline)}</p></section>
  ${c.aboutImage?`<section class="wrap"><div class="ab-photo" data-reveal><img src="${esc(c.aboutImage)}" alt=""></div></section>`:''}
  <section class="wrap"><p>${paras(c.story)}</p>
  ${(c.milestones||[]).length?`<div class="sec-head" style="margin-top:40px"><h2>Milestones</h2></div><ul class="steps" data-stagger>${c.milestones.map(m=>`<li data-reveal><h3>${esc(m.y)}</h3><p>${esc(m.t)}</p></li>`).join('')}</ul>`:''}</section>
  ${a&&a.name?`<section class="wrap ab-ag"><div class="ab-ag-top">${agentLogo({name:a.name,logo:a.logo})}<div><span class="ab-ag-kick">Authorised agent for our home market</span><h2>${esc(a.name)}</h2><p>${esc(a.tagline)}</p></div>
  <div class="ab-ag-badge"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="abSeal" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs><text><textPath href="#abSeal" startOffset="0">Authorised • Since ${esc(a.since)} • </textPath></text></svg><b>${esc(a.license||'')}</b></div></div>
  <div class="ab-ag-side"><dl class="ab-ag-kv"><div><dt>${ico('clock')}Authorised since</dt><dd>${esc(a.since)}</dd></div><div><dt>${ico('route')}Territory</dt><dd>${esc(a.territory)}</dd></div><div><dt>${ico('note')}Licence</dt><dd>${esc(a.license)}</dd></div></dl>
  <p>${paras(a.story)}</p>
  ${(a.services||[]).length?`<ul class="ab-ag-services">${a.services.map(s=>`<li>${ico('check')}${esc(s)}</li>`).join('')}</ul>`:''}</div></section>`:''}`;
}
function initAbout(){return null}

function offersHtml(){
  const A=state.announcements.filter(a=>ui.otype==='all'||a.type===ui.otype);
  if(!A.length)return `<div class="ol-empty"><p class="lead">No offers or notices right now.</p></div>`;
  return `<div class="ol-wrap">${A.map(offerCard).join('')}</div>`;
}
function pageContact(){
  const c=S().company;
  return `<section class="wrap page-head" data-reveal><h1>${esc(c.contactTitle||'Talk to us')}</h1><p class="lead">${esc(c.contactLead||'Have a question about products, pricing or an order? Write to us or find your regional agent.')}</p></section>
  <section class="wrap ct-body"><div class="contact-grid">
  <div class="ct-info"><a class="ct-tile" href="mailto:${esc(c.email)}" data-reveal><span class="ct-tile-ic">${ico('mail')}</span><div><small>Email</small><b>${esc(c.email)}</b></div></a>
  <a class="ct-tile" href="${tel(c.phone)}" data-reveal><span class="ct-tile-ic">${ico('phone')}</span><div><small>Phone</small><b>${esc(c.phone)}</b></div></a>
  <div class="ct-tile ct-soc-tile" data-reveal><span class="ct-tile-ic">${ico('pin')}</span><div><small>Follow</small><div class="socials ct-soc">${socialsHtml()}</div></div></div></div>
  <div class="formcard dpanel" id="formwrap" data-reveal><div class="ct-form-ic">${ico('note')}</div><h2 style="margin-bottom:18px">Send a message</h2>
  <form id="contactForm" novalidate><div class="fgrid2">
  <label class="field"><span>Name</span><input name="name" required></label>
  <label class="field"><span>Email</span><input type="email" name="email" required></label>
  <label class="field wide"><span>Topic</span><select name="topic"><option>General enquiry</option><option>Pricing</option><option>Become an agent</option><option>Samples</option></select></label>
  <label class="field wide"><span>Message</span><textarea name="message" rows="5" required></textarea></label></div>
  <button class="btn btn-primary" type="submit" style="margin-top:18px">Send message${ico('arrow')}</button></form></div></div>
  <div class="ct-loc-wrap"><div class="ct-loc"><div class="ct-loc-l"><span class="ct-loc-kick">${ico('pin')}Head office</span><h3>${esc(c.address)}</h3><p>Visitors are welcome by appointment. Write to us first so the right person can meet you.</p></div>
  <div class="ct-loc-r"><i class="ct-loc-ring r1"></i><i class="ct-loc-ring r2"></i><i class="ct-loc-ring r3"></i><div class="ct-loc-halo"></div><div class="ct-loc-pin">${ico('pin')}</div></div></div></div>
  <div id="offers" style="padding-top:40px"><div class="sec-head" data-reveal><h2>Offers and notices</h2><div class="chips" id="offerTabs">${[['all','All'],['offer','Offers'],['notice','Notices'],['note','Notes']].map(([v,l])=>`<button class="chip${ui.otype===v?' on':''}" data-act="otype" data-v="${v}" aria-pressed="${ui.otype===v}">${l}</button>`).join('')}</div></div>
  <div id="olist">${offersHtml()}</div></div></section>`;
}

/* ================= REVEAL / COUNTERS ================= */
let io=null;
function reveal(root){
  $$('[data-stagger]',root).forEach(p=>[...p.children].forEach((c,i)=>{if(!c.hasAttribute('data-reveal')){c.setAttribute('data-reveal','');c.style.setProperty('--d',Math.min(i,9)*70+'ms')}}));
  const els=$$('[data-reveal]:not(.in)',root);
  if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
  if(!io)io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -5% 0px'});
  els.forEach(e=>io.observe(e));
}
function initCounters(root){
  const els=$$('[data-count]',root);if(!els.length)return;
  const fmt=(el,v)=>Math.round(v).toLocaleString('en-US');
  const run=el=>{const to=parseFloat(el.dataset.count)||0,t0=performance.now();const step=t=>{const k=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-k,3);el.textContent=fmt(el,to*e);if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)};
  if(REDUCED||!('IntersectionObserver' in window))return;
  const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){run(e.target);o.unobserve(e.target)}}),{threshold:.5});
  els.forEach(el=>{el.textContent='0';o.observe(el)});
}

/* ================= SHEETS ================= */
const ov=()=>$('#overlay');
let sheetOpen=false,lastFocus=null,sheetOnClose=null;
function openSheet(html,{cls='',onClose}={}){
  lastFocus=document.activeElement;
  ov().innerHTML=`<div class="scrim" data-act="close"></div><div class="sheet ${cls}" role="dialog" aria-modal="true" tabindex="-1">${html}</div>`;
  ov().setAttribute('aria-hidden','false');document.documentElement.classList.add('lock');sheetOpen=true;sheetOnClose=onClose||null;
  requestAnimationFrame(()=>{ov().classList.add('open');const s=$('.sheet',ov());if(s)s.focus({preventScroll:true})});
}
function closeSheet(){
  if(!sheetOpen)return;
  sheetOpen=false;ov().classList.remove('open');ov().setAttribute('aria-hidden','true');document.documentElement.classList.remove('lock');
  const cb=sheetOnClose;sheetOnClose=null;
  setTimeout(()=>{if(!sheetOpen)ov().innerHTML=''},450);
  if(lastFocus&&lastFocus.focus)try{lastFocus.focus({preventScroll:true})}catch(e){}
  if(cb)cb();
}
function openProduct(id){
  const p=state.products.find(x=>x.id===id);if(!p)return;
  openSheet(productSheet(p),{cls:'wide',onClose(){if(/^#\/products\/./.test(location.hash)){try{history.replaceState(null,'','#/products')}catch(e){}}}});
  if(current.page==='products'){try{history.replaceState(null,'','#/products/'+id)}catch(e){}}
}

/* ================= ROUTER ================= */
const PAGES={home:pageHome,products:pageProducts,factories:a=>a?pageFactory(a):pageFactories(),agents:pageAgents,about:pageAbout,contact:pageContact};
const TITLES={home:'',products:'Products',factories:'Factories',agents:'Agents',about:'About',contact:'Contact'};
const parseRoute=()=>location.hash.replace(/^#\/?/,'').split('?')[0].split('/').filter(Boolean).map(decodeURIComponent);
function route(first){
  const parts=parseRoute(),page=PAGES[parts[0]]?parts[0]:'home',arg=parts[1];
  if(!first&&page==='products'&&current.page==='products'){if(arg)openProduct(arg);else closeSheet();return}
  const main=$('#main'),render=()=>{
    if(cleanup){cleanup();cleanup=null}
    closeSheet();document.body.classList.remove('menu-open');
    current={page,arg};main.innerHTML=PAGES[page](arg);
    document.body.classList.toggle('on-hero',page==='home');
    document.title=(TITLES[page]?TITLES[page]+' | ':'')+S().company.name;
    setNav(page);window.scrollTo(0,0);
    reveal(main);initCounters(main);
    if(page==='products')cleanup=initProducts();
    if(page==='home'){const h=initHero(),p=initParallax(),q=initAcc(),u=initStage(),v=initLot(),w=initRoute(),x=initFx(),y=initOffers(),z=initCtaDeck();initWheel();cleanup=()=>{h&&h();p&&p();q&&q();u&&u();v&&v();w&&w();x&&x();y&&y();z&&z()}}
    if(page==='agents')cleanup=initAgentsPage();
    if(page==='contact')cleanup=initOffers();
    if(page==='about')cleanup=initAbout();
    if(page==='products'&&arg)openProduct(arg);
    if(page==='contact'&&arg==='offers')setTimeout(()=>{const o=$('#offers');if(o)o.scrollIntoView({behavior:REDUCED?'auto':'smooth'})},350);
  };
  if(first||REDUCED)render();else{main.classList.add('is-out');setTimeout(()=>{render();main.classList.remove('is-out')},260)}
}

/* ================= EVENTS ================= */
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-act]');
  if(!t){const a=e.target.closest('a[href^="#/"]');if(a){if(sheetOpen&&ov().contains(a))closeSheet();document.body.classList.remove('menu-open')}return}
  const act=t.dataset.act,d=t.dataset;
  switch(act){
    case'product':e.preventDefault();openProduct(d.id);break;
    case'close':closeSheet();break;
    case'theme':toggleTheme(t);document.body.classList.remove('menu-open');{const b=$('.burger');if(b)b.setAttribute('aria-expanded','false')}break;
    case'top':window.scrollTo({top:0,behavior:REDUCED?'auto':'smooth'});break;
    case'menu':{const o=document.body.classList.toggle('menu-open');t.setAttribute('aria-expanded',String(o));break}
    case'fq':{const it=t.closest('.fq'),o=!it.classList.contains('open');$$('.fq.open').forEach(x=>{x.classList.remove('open');const h=$('.fq-h',x);if(h)h.setAttribute('aria-expanded','false')});if(o){it.classList.add('open');t.setAttribute('aria-expanded','true')}break}
    case'stage':if(stageApi)stageApi.go(+d.dir);break;
    case'rail':{const r=$('#rail');if(r)r.scrollBy({left:(+d.dir)*r.clientWidth*.8,behavior:'smooth'});break}
    case'cat':ui.cat=d.v;renderGrid();break;
    case'origin':ui.origin=d.v;renderGrid();break;
    case'tog':ui[d.k]=!ui[d.k];renderGrid();break;
    case'view':ui.view=d.v;renderGrid();break;
    case'unf':{const k=d.k;if(k==='cat')ui.cat='All';else if(k==='origin')ui.origin='All';else if(k==='season')ui.season=false;else if(k==='offer')ui.offer=false;else if(k==='q'){ui.q='';const q=$('#q');if(q)q.value=''}renderGrid();break}
    case'clear':ui.cat='All';ui.q='';ui.origin='All';ui.season=false;ui.offer=false;{const q=$('#q');if(q)q.value=''}renderGrid();break;
    case'otype':ui.otype=d.v;$$('[data-act=otype]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===ui.otype)));{const l=$('#olist');if(l){l.innerHTML=offersHtml();$$('.tk,.nc',l).forEach((c,i)=>{c.setAttribute('data-reveal','');c.style.setProperty('--d',i*60+'ms')});reveal(l);initOffers()}}break;
    case'copy':copyText(d.code).then(ok=>toast(ok?'Code copied: '+d.code:'Copy failed. Select the code and copy it manually.'));break;
    case'retry':location.reload();break;
  }
});
document.addEventListener('input',e=>{if(e.target.id==='q'){ui.q=e.target.value;renderGrid()}});
document.addEventListener('change',e=>{if(e.target.id==='psort'){ui.sort=e.target.value;renderGrid()}});
document.addEventListener('submit',e=>{
  const form=e.target;e.preventDefault();
  if(form.id==='contactForm'){
    const d=Object.fromEntries(new FormData(form));
    if(!d.name.trim()||!/^\S+@\S+\.\S+$/.test(d.email||'')||!d.message.trim()){toast('Please fill in your name, a valid email and a message');return}
    const c=S().company,url=`mailto:${c.email}?subject=${encodeURIComponent(d.topic+': '+d.name)}&body=${encodeURIComponent(d.message+'\n\n'+d.name+'\n'+d.email)}`;
    $('#formwrap').innerHTML=`<div class="thanks"><span class="o-ico">${ico('check')}</span><h2 style="margin-bottom:10px">Thank you, ${esc(d.name.split(' ')[0])}</h2><p class="muted">Your email app should open with the message ready to send. If it doesn’t, write to <a class="link" href="mailto:${esc(c.email)}">${esc(c.email)}</a>.</p></div>`;
    window.location.href=url;return;
  }
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(sheetOpen)closeSheet();document.body.classList.remove('menu-open')}});
document.body.insertAdjacentHTML('beforeend',`<div class="progress" id="progress" aria-hidden="true"></div><button class="totop" id="totop" data-act="top" aria-label="Back to top">${ico('arrow')}</button>`);
window.addEventListener('scroll',()=>{
  const y=window.scrollY,n=$('#nav');if(n)n.classList.toggle('scrolled',y>8);
  const h=document.documentElement.scrollHeight-window.innerHeight,p=$('#progress'),b=$('#totop');
  if(p)p.style.transform=`scaleX(${h>0?Math.min(1,y/h):0})`;
  if(b)b.classList.toggle('show',y>700);
},{passive:true});
window.addEventListener('hashchange',()=>route(false));

document.addEventListener('error',e=>{
  const i=e.target;if(!i||i.tagName!=='IMG')return;
  const fb=i.getAttribute('data-fb');
  if(fb){i.removeAttribute('data-fb');i.src=fb;return}
  if(i.hasAttribute('data-slide')){const s=i.closest('.hero-slide');if(s)s.remove()}
  else if(i.hasAttribute('data-photo'))i.remove();
},true);

/* ================= BOOT ================= */
const CACHEKEY='agh.cache.v1';
function loadCache(){try{const raw=localStorage.getItem(CACHEKEY);return raw?JSON.parse(raw):null}catch(e){return null}}
function saveCache(s){try{localStorage.setItem(CACHEKEY,JSON.stringify(s))}catch(e){}}
function bootError(){
  $('#main').innerHTML=`<div class="wrap" style="min-height:60vh;display:grid;place-items:center;text-align:center;gap:18px"><div><h2 style="margin-bottom:10px">Can’t reach the server</h2><p class="lead">Make sure the Laravel backend is running, then try again.</p></div><button class="btn btn-primary" data-act="retry">Try again</button></div>`;
}
async function boot(){
  const cached=loadCache();
  if(cached){
    state={faqs:[],slides:[],categories:[],countries:[],...cached};
    initTheme();renderChrome();route(true);
  }else{
    $('#main').innerHTML=`<div class="wrap" style="min-height:60vh;display:grid;place-items:center;text-align:center"><p class="lead">Loading…</p></div>`;
  }
  try{
    const [settings,factories,products,agents,announcements,faqs,slides,countries]=await Promise.all([
      apiFetch('/settings'),apiFetch('/factories'),apiFetch('/products'),apiFetch('/agents'),apiFetch('/announcements'),apiFetch('/faqs'),apiFetch('/hero-slides'),apiFetch('/countries'),
    ]);
    products.data.forEach(p=>{if(PFB[p.id])p.imageFb=PFB[p.id]});
    const fresh={settings,factories:factories.data,products:products.data,agents:agents.data,announcements:announcements.data,faqs:faqs.data,slides:slides.data,countries:countries.data};
    const changed=!cached||JSON.stringify(cached)!==JSON.stringify(fresh);
    state=fresh;saveCache(fresh);
    if(changed){initTheme();renderChrome();route(true)}
  }catch(e){if(!cached)bootError()}
}

/* ================= INIT ================= */
document.documentElement.classList.add('js');
boot();
})();
