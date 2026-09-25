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

/* ================= HELPERS ================= */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clone=o=>JSON.parse(JSON.stringify(o));
const uid=p=>p+Math.random().toString(36).slice(2,8);
const errMsg=(err,fallback)=>{const errs=err.data&&err.data.errors;if(errs){const first=Object.values(errs)[0];if(first&&first[0])return first[0]}return (err.data&&err.data.message)||fallback};
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}}};
const getPath=(o,p)=>p.split('.').reduce((a,k)=>a==null?a:a[k],o);
const setPath=(o,p,v)=>{const ks=p.split('.');const l=ks.pop();const t=ks.reduce((a,k)=>a[k]=a[k]||{},o);t[l]=v};

/* ================= ICONS ================= */
const I={
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',left:'<path d="M15 6l-6 6 6 6"/>',
  close:'<path d="M6 6l12 12M18 6L6 18"/>',menu:'<path d="M4 8h16M4 16h16"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:'<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 21h4"/>',
  note:'<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h5"/>',
  lock:'<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:'<path d="M3 3l18 18"/><path d="M10.6 10.6a3 3 0 0 0 4.2 4.2"/><path d="M9.9 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a15.6 15.6 0 0 1-3.2 4.1M6.2 6.2A15.7 15.7 0 0 0 2 12s3.5 7 10 7c1 0 2-.1 2.9-.4"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
  chev:'<path d="M6 9l6 6 6-6"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'
};
const ico=(k,cls='')=>`<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]||''}</svg>`;
const SOCIAL_LABELS={facebook:'Facebook',instagram:'Instagram',whatsapp:'WhatsApp',telegram:'Telegram',linkedin:'LinkedIn',tiktok:'TikTok',youtube:'YouTube'};
const LOGO='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="var(--btn)"/><path d="M24 33c0-9 2-14 10-18-1 9-4 15-10 18z" fill="var(--on-btn)"/><path d="M24 33c0-6-1-10-8-13 0 7 3 11 8 13z" fill="var(--on-btn)" opacity=".65"/><path d="M9 38c4-3 7-3 10 0s6 3 10 0 7-3 10 0" stroke="var(--on-btn)" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';

/* ================= STATE ================= */
let state={settings:{company:{},socials:{},agent:{}},factories:[],products:[],agents:[],announcements:[],faqs:[],categories:[],countries:[],me:null};
const S=()=>state.settings;
const productsOf=id=>state.products.filter(p=>p.factoryId===id);
const UNIT={kg:'kg',ton:'tonne',L:'litre',box:'box'};
const money=n=>{const v=Number(n)||0;return (S().company.currency||'$')+v.toLocaleString('en-US',{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2})};
let current={arg:'overview'},formCtx={img:{}},pendingYes=null;

/* ================= THEME / TOAST ================= */
function setTheme(t,anim){
  const r=document.documentElement;
  if(anim){r.classList.add('theming');setTimeout(()=>r.classList.remove('theming'),800)}
  r.dataset.theme=t;store.set('agh.theme',t);
  const m=$('meta[name=theme-color]');if(m)m.setAttribute('content',t==='dark'?'#050F0D':'#FAFBF6');
  syncThemeUi();
}
function syncThemeUi(){const d=document.documentElement.dataset.theme==='dark';$$('.theme-switch').forEach(b=>b.setAttribute('aria-checked',String(d)))}
function toggleTheme(btn){setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark',true)}
function initTheme(){
  let t=store.get('agh.theme');
  if(t!=='light'&&t!=='dark')t=(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';
  setTheme(t,false);
}
let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2600)}

/* ================= AUTH + API ================= */
const API_BASE=/^(atlantikgh\.com|www\.atlantikgh\.com)$/.test(location.hostname)?'https://api.atlantikgh.com/api':'http://127.0.0.1:8000/api';
const TOKENKEY='agh.token';
function getToken(){try{return sessionStorage.getItem(TOKENKEY)}catch(e){return null}}
function saveToken(token){try{sessionStorage.setItem(TOKENKEY,token)}catch(e){}}
function clearToken(){try{localStorage.removeItem(TOKENKEY);sessionStorage.removeItem(TOKENKEY)}catch(e){}}
function isAdmin(){return !!getToken()}
async function apiFetch(path,{method='GET',json}={}){
  const token=getToken();
  const headers={Accept:'application/json'};
  if(json)headers['Content-Type']='application/json';
  if(token)headers.Authorization='Bearer '+token;
  let res;
  try{res=await fetch(API_BASE+path,{method,headers,body:json?JSON.stringify(json):undefined})}
  catch(e){throw Object.assign(new Error('Could not reach the server'),{network:true})}
  const data=await res.json().catch(()=>({}));
  if(res.status===401)clearToken();
  if(!res.ok)throw Object.assign(new Error(data.message||'Request failed'),{status:res.status,data});
  return data;
}
async function logout(){
  try{await apiFetch('/logout',{method:'POST'})}catch(e){}
  clearToken();state.me=null;toast('Signed out');renderAdmin();
}
function brandHtml(c){
  const m=/^(.*?)\s+Holding$/i.exec(c.name||'');
  const main=m?m[1]:c.name,sub=m?'Holding':'';
  return `<span class="brand-mark">${c.logo?`<img src="${esc(c.logo)}" alt="">`:LOGO}</span><span class="brand-t"><b>${esc(main)}</b>${sub?`<small>${sub}</small>`:''}</span>`;
}
const photo=(src,alt)=>`<span class="ph" aria-hidden="true"><b>${esc(((alt||'').trim()[0])||'')}</b></span>${src?`<img class="photo" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" data-photo>`:''}`;

/* ================= SHEETS ================= */
const ov=()=>$('#overlay');
let sheetOpen=false,lastFocus=null;
function openSheet(html,{cls=''}={}){
  lastFocus=document.activeElement;
  ov().innerHTML=`<div class="scrim" data-act="close"></div><div class="sheet ${cls}" role="dialog" aria-modal="true" tabindex="-1">${html}</div>`;
  ov().setAttribute('aria-hidden','false');document.documentElement.classList.add('lock');sheetOpen=true;
  xselectInitAll(ov());
  requestAnimationFrame(()=>{ov().classList.add('open');const s=$('.sheet',ov());if(s)s.focus({preventScroll:true})});
}
function closeSheet(){
  if(!sheetOpen)return;
  sheetOpen=false;ov().classList.remove('open');ov().setAttribute('aria-hidden','true');document.documentElement.classList.remove('lock');
  setTimeout(()=>{if(!sheetOpen)ov().innerHTML=''},450);
  if(lastFocus&&lastFocus.focus)try{lastFocus.focus({preventScroll:true})}catch(e){}
}
function confirmSheet(title,body,yes){
  pendingYes=yes;
  openSheet(`<div class="confirm"><h2>${esc(title)}</h2><p>${esc(body)}</p><div class="row"><button class="btn btn-ghost" data-act="close">Cancel</button><button class="btn hot" data-act="yes">Delete</button></div></div>`,{cls:'small'});
}

/* ================= FORMS ================= */
function fieldHtml(f,val){
  const id='f_'+f.k.replace(/\./g,'_'),label=`<label for="${id}">${esc(f.l)}${f.req?' <i>*</i>':''}</label>`;let ctl='';
  switch(f.t){
    case'textarea':ctl=`<textarea id="${id}" name="${f.k}" rows="${f.rows||4}">${esc(val)}</textarea>`;break;
    case'lines':ctl=`<textarea id="${id}" name="${f.k}" rows="${f.rows||4}">${esc((val||[]).join('\n'))}</textarea>`;break;
    case'pairs':ctl=`<textarea id="${id}" name="${f.k}" rows="${f.rows||4}">${esc((val||[]).map(o=>o[f.keys[0]]+' | '+o[f.keys[1]]).join('\n'))}</textarea>`;break;
    case'select':{
      const optsHtml=f.opts.map(([v,l])=>`<option value="${esc(v)}"${String(v)===String(val)?' selected':''}>${esc(l)}</option>`).join('');
      const searchable=f.opts.length>5;
      ctl=`<div class="xselect">
        <button type="button" class="xselect-btn" aria-haspopup="listbox"><span class="xselect-label"></span>${ico('chev','xselect-car')}</button>
        <select id="${id}" name="${f.k}" tabindex="-1" aria-hidden="true">${optsHtml}</select>
        <div class="xselect-panel" role="listbox">${searchable?`<div class="xselect-search">${ico('search')}<input type="text" placeholder="Search…" autocomplete="off" spellcheck="false"></div>`:''}<ul class="xselect-list"></ul></div>
      </div>`;
      break;
    }
    case'color':ctl=`<input id="${id}" name="${f.k}" type="color" value="${esc(val||'#CFE3B5')}">`;break;
    case'image':ctl=`<div class="imgpick" data-k="${f.k}"><div class="imgprev">${val?`<img src="${esc(val)}" alt="">`:'<span>No image</span>'}</div><div class="imgbtns"><label class="btn btn-ghost btn-sm">Choose image<input type="file" accept="image/*" hidden></label><button type="button" class="btn btn-ghost btn-sm" data-act="img-clear">Remove</button><span class="img-status">Uploading…</span></div></div>`;break;
    default:ctl=`<input id="${id}" name="${f.k}" type="${f.t||'text'}" value="${esc(val)}"${f.step?` step="${f.step}"`:''}${f.min!=null?` min="${f.min}"`:''}${f.max!=null?` max="${f.max}"`:''}${f.ph?` placeholder="${esc(f.ph)}"`:''}${f.list?` list="dl_${id}"`:''}${f.req?' required':''}>${f.list?`<datalist id="dl_${id}">${f.list.map(o=>`<option value="${esc(o)}">`).join('')}</datalist>`:''}`;
  }
  return `<div class="field${f.wide?' wide':''}">${label}${ctl}${f.hint?`<small>${esc(f.hint)}</small>`:''}</div>`;
}
/* ================= CUSTOM SELECT ================= */
function xselectSync(select){
  const wrap=select.closest('.xselect');if(!wrap)return;
  const list=wrap.querySelector('.xselect-list'),labelEl=wrap.querySelector('.xselect-label'),search=wrap.querySelector('.xselect-search input');
  const opts=[...select.options];
  list.innerHTML=opts.map(o=>`<li role="option" data-v="${esc(o.value)}"${o.selected?' aria-selected="true" class="sel"':''}>${esc(o.textContent)}</li>`).join('');
  const cur=opts.find(o=>o.selected)||opts[0];
  labelEl.textContent=cur?cur.textContent:'';
  if(search)search.value='';
}
function xselectInitAll(root){$$('.xselect select',root).forEach(xselectSync)}
function xselectClose(wrap){wrap.classList.remove('open')}
function xselectOpen(wrap){
  $$('.xselect.open').forEach(xselectClose);
  wrap.classList.add('open');
  const search=wrap.querySelector('.xselect-search input');
  if(search){search.value='';$$('.xselect-list li',wrap).forEach(li=>li.style.display='');setTimeout(()=>search.focus(),10)}
}
function collect(form,fields,ctx){
  const out={},fd=new FormData(form);
  fields.forEach(f=>{
    if(f.t==='image'){out[f.k]=ctx.img[f.k]||'';return}
    const raw=fd.get(f.k),s=String(raw==null?'':raw);
    if(f.t==='lines')out[f.k]=s.split('\n').map(x=>x.trim()).filter(Boolean);
    else if(f.t==='pairs')out[f.k]=s.split('\n').map(x=>x.trim()).filter(Boolean).map(l=>{const i=l.indexOf('|');return i<0?{[f.keys[0]]:'',[f.keys[1]]:l}:{[f.keys[0]]:l.slice(0,i).trim(),[f.keys[1]]:l.slice(i+1).trim()}});
    else if(f.t==='number')out[f.k]=s===''?0:Number(s);
    else out[f.k]=s.trim();
  });
  return out;
}
function readImage(file,max){
  return new Promise((res,rej)=>{
    const fr=new FileReader();
    fr.onload=()=>{const im=new Image();im.onload=()=>{
      const k=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');
      c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));
      c.getContext('2d').drawImage(im,0,0,c.width,c.height);
      const type=file.type==='image/png'?'image/png':'image/jpeg';
      c.toBlob(blob=>res({dataUrl:c.toDataURL(type,.82),blob}),type,.82);
    };im.onerror=rej;im.src=fr.result};
    fr.onerror=rej;fr.readAsDataURL(file);
  });
}
async function uploadImage(blob){
  const token=getToken();
  const fd=new FormData();fd.append('image',blob,'photo.jpg');
  const headers={Accept:'application/json'};if(token)headers.Authorization='Bearer '+token;
  let res;
  try{res=await fetch(API_BASE+'/upload',{method:'POST',headers,body:fd})}
  catch(e){throw Object.assign(new Error('Could not reach the server'),{network:true})}
  const data=await res.json().catch(()=>({}));
  if(!res.ok||!data.url)throw new Error(data.message||'Upload failed');
  return data.url;
}

/* ================= DASHBOARD DATA MODEL ================= */
const rowHtml=(kind,id,thumb,title,meta,tint)=>`<li class="drow"${tint?` style="--tint:${esc(tint)}"`:''}><div class="dthumb">${thumb}</div><div class="dinfo"><b>${esc(title)}</b><span>${esc(meta)}</span></div><div class="dact"><button class="btn btn-ghost btn-sm" data-act="edit" data-kind="${kind}" data-id="${esc(id)}">Edit</button><button class="btn btn-ghost btn-sm danger" data-act="del" data-kind="${kind}" data-id="${esc(id)}">Delete</button></div></li>`;
const ENT={
  products:{one:'product',title:'Products',apiPath:'/products',items:()=>state.products,label:p=>p.name,
    make:()=>({id:uid('p-'),name:'',category:'Fruit',country:'',factoryId:'',price:0,unit:'kg',discount:0,short:'',description:'',features:[],packaging:'',shelfLife:'',moq:'',season:'',tint:'#CFE3B5',image:''}),
    fields:(vals={})=>[
      {k:'name',l:'Product name',t:'text',req:1},{k:'category',l:'Category',t:'select',req:1,opts:state.categories.map(c=>[c.name,c.name])},
      {k:'country',l:'Country',t:'select',opts:[['','Not set'],...state.countries.map(c=>[c.code,c.name])]},
      {k:'factoryId',l:'Made at factory',t:'select',opts:[['','Not assigned'],...state.factories.filter(f=>!vals.country||f.code===vals.country||f.id===vals.factoryId).map(f=>[f.id,f.country+', '+f.agency])],hint:'Filtered to factories in the selected country.'},
      {k:'unit',l:'Sold by',t:'select',opts:[['kg','Kilogram'],['ton','Tonne'],['L','Litre'],['box','Box']]},
      {k:'price',l:'Price',t:'number',step:'0.01',min:0},{k:'discount',l:'Discount (%)',t:'number',min:0,max:90},
      {k:'short',l:'Short line',t:'text',wide:1},{k:'description',l:'Description',t:'textarea',rows:4,wide:1},
      {k:'features',l:'Highlights (one per line)',t:'lines',rows:4,wide:1},
      {k:'packaging',l:'Packaging',t:'text'},{k:'shelfLife',l:'Shelf life',t:'text'},{k:'moq',l:'Minimum order',t:'text'},{k:'season',l:'Season',t:'text'},
      {k:'tint',l:'Placeholder tint',t:'color'},
      {k:'image',l:'Product photo',t:'image',wide:1,hint:'Upload a photo to preview it here. For the live site, save it as assets/img/products/<id>.jpg.'}],
    row:p=>{const c=state.countries.find(x=>x.code===p.country);return rowHtml('products',p.id,photo(p.image,p.name),p.name,`${p.category}${c?', '+c.name:''}, ${money(p.price)} per ${UNIT[p.unit]||p.unit}${p.discount?`, ${p.discount}% off`:''}`,p.tint)}},
  factories:{one:'factory',title:'Factories',apiPath:'/factories',items:()=>state.factories,label:f=>f.country,
    make:()=>({id:uid('f-'),country:'',code:'ES',city:'',agency:'',director:'',since:'',employees:'',capacity:'',certs:[],description:'',image:''}),
    fields:()=>[
      {k:'code',l:'Country',t:'select',req:1,opts:state.countries.map(c=>[c.code,c.name])},
      {k:'agency',l:'Agency name',t:'text',req:1},{k:'director',l:'Director',t:'text'},
      {k:'city',l:'City or region',t:'text'},{k:'since',l:'Established (year)',t:'text'},
      {k:'employees',l:'Team size',t:'text'},{k:'capacity',l:'Capacity',t:'text',ph:'18,000 tonnes a year'},
      {k:'certs',l:'Certifications (one per line)',t:'lines',rows:3,wide:1},
      {k:'description',l:'About the factory (blank line between paragraphs)',t:'textarea',rows:6,wide:1},
      {k:'image',l:'Cover photo',t:'image',wide:1}],
    row:f=>rowHtml('factories',f.id,flag(f.code),f.country,`${f.agency}, ${productsOf(f.id).length} products`)},
  agents:{one:'agent',title:'Agents',apiPath:'/agents',items:()=>state.agents,label:a=>a.name,
    make:()=>({id:uid('a-'),name:'',contact:'',role:'',code:'KU',city:'',territory:'',phone:'',whatsapp:'',email:'',hours:'',logo:''}),
    fields:()=>[
      {k:'name',l:'Agent or sales centre name',t:'text',req:1,wide:1},{k:'contact',l:'Contact person',t:'text'},{k:'role',l:'Role',t:'text'},
      {k:'code',l:'Country flag',t:'select',opts:state.countries.map(c=>[c.code,c.name])},{k:'city',l:'City',t:'text'},
      {k:'territory',l:'Territory covered',t:'text',wide:1},{k:'phone',l:'Phone',t:'tel',req:1},{k:'whatsapp',l:'WhatsApp number',t:'tel'},
      {k:'email',l:'Email',t:'email'},{k:'hours',l:'Opening hours',t:'text'},{k:'logo',l:'Logo',t:'image',wide:1}],
    row:a=>rowHtml('agents',a.id,flag(a.code),a.name,`${a.city}, ${a.phone}`)},
  notices:{one:'notice',title:'Notices and offers',apiPath:'/announcements',items:()=>state.announcements,label:a=>a.title,
    make:()=>({id:uid('n-'),type:'offer',title:'',body:'',discount:0,code:'',until:''}),
    fields:()=>[
      {k:'type',l:'Type',t:'select',opts:[['offer','Offer or discount'],['notice','Notice'],['note','Note']]},{k:'discount',l:'Discount (%)',t:'number',min:0,max:90},
      {k:'title',l:'Title',t:'text',req:1,wide:1},{k:'body',l:'Details',t:'textarea',rows:4,wide:1},
      {k:'until',l:'Ends on',t:'date',hint:'Leave empty for no end date.'}],
    row:a=>rowHtml('notices',a.id,ico(a.type==='offer'?'bell':'note'),a.title,`${a.type}${a.discount?`, ${a.discount}% off`:''}${a.until?`, ends ${a.until}`:''}`)},
  faqs:{one:'question',title:'FAQs',apiPath:'/faqs',items:()=>state.faqs,label:f=>f.question,
    make:()=>({id:'',question:'',answer:''}),
    fields:()=>[{k:'question',l:'Question',t:'text',req:1,wide:1},{k:'answer',l:'Answer',t:'textarea',rows:4,req:1,wide:1}],
    row:f=>rowHtml('faqs',f.id,ico('note'),f.question,f.answer.length>70?f.answer.slice(0,70)+'…':f.answer)},
  categories:{one:'category',title:'Categories',apiPath:'/categories',items:()=>state.categories,label:c=>c.name,
    make:()=>({id:'',name:''}),
    fields:()=>[{k:'name',l:'Category name',t:'text',req:1,wide:1}],
    row:c=>{const n=state.products.filter(p=>p.category===c.name).length;return rowHtml('categories',c.id,ico('note'),c.name,`${n} product${n===1?'':'s'}`)}},
  countries:{one:'country',title:'Countries',apiPath:'/countries',items:()=>state.countries,label:c=>c.name,
    make:()=>({id:'',name:'',flagImage:''}),
    fields:()=>[{k:'name',l:'Country name',t:'text',req:1,wide:1},
      {k:'flagImage',l:'Flag image',t:'image',wide:1,hint:'Upload the country’s flag. This is what shows up everywhere the country is picked.'}],
    row:c=>{const n=state.factories.filter(f=>f.code===c.code).length+state.agents.filter(a=>a.code===c.code).length;return rowHtml('countries',c.id,flag(c.code),c.name,`${n} item${n===1?'':'s'} using this country`)}}
};
const SITE=[
  ['Company',[
    {k:'company.name',l:'Company name',t:'text',req:1},{k:'company.currency',l:'Currency symbol',t:'text'},
    {k:'company.logo',l:'Company logo',t:'image',wide:1,hint:'Shown in the header and footer on every page.'}]],
  ['Home page',[
    {k:'company.tagline',l:'Headline',t:'text',wide:1},{k:'company.intro',l:'Short introduction',t:'textarea',rows:3,wide:1},
    {k:'company.hero',l:'Cover photo',t:'image',wide:1}]],
  ['About page',[
    {k:'company.aboutLead',l:'Page intro line',t:'text',wide:1,ph:'Leave blank to reuse the Home page headline'},
    {k:'company.aboutImage',l:'Photo',t:'image',wide:1},
    {k:'company.story',l:'Company story (blank line between paragraphs)',t:'textarea',rows:7,wide:1},
    {k:'company.milestones',l:'Milestones (year | text, one per line)',t:'pairs',keys:['y','t'],rows:6,wide:1}]],
  ['Products page',[
    {k:'company.productsTitle',l:'Title',t:'text',ph:'Our harvest'},
    {k:'company.productsLead',l:'Intro line',t:'text',wide:1,ph:'Everything we grow, pack and ship…'}]],
  ['Factories page',[
    {k:'company.factoriesTitle',l:'Title',t:'text',ph:'Our factories'},
    {k:'company.factoriesLead',l:'Intro line',t:'text',wide:1,ph:'{n} factories across {m} countries…',hint:'{n} and {m} are replaced automatically with the live factory and country counts.'}]],
  ['Agents page',[
    {k:'company.agentsTitle',l:'Title',t:'text',ph:'Authorised agents'},
    {k:'company.agentsLead',l:'Intro line',t:'text',wide:1,ph:'Our agents are the sales centres for their regions…'}]],
  ['Contact page',[
    {k:'company.contactTitle',l:'Title',t:'text',ph:'Talk to us'},
    {k:'company.contactLead',l:'Intro line',t:'text',wide:1,ph:'Have a question about products, pricing or an order…'},
    {k:'company.email',l:'Email',t:'email'},{k:'company.phone',l:'Phone',t:'tel'},{k:'company.address',l:'Head office address',t:'text',wide:1}]],
  ['Social links',Object.keys(SOCIAL_LABELS).map((k,i)=>({k:'socials.'+k,l:SOCIAL_LABELS[k],t:'url',ph:'https://',hint:i===0?'These same links are used in both the footer and the Contact page.':undefined}))],
  ['About page: authorised agent',[
    {k:'agent.name',l:'Agent name',t:'text'},{k:'agent.since',l:'Agent since',t:'text'},
    {k:'agent.tagline',l:'Tagline',t:'text',wide:1},{k:'agent.territory',l:'Territory',t:'text'},{k:'agent.license',l:'Licence number',t:'text'},
    {k:'agent.logo',l:'Agent logo',t:'image',wide:1},{k:'agent.story',l:'Agent story',t:'textarea',rows:6,wide:1},
    {k:'agent.services',l:'Services (one per line)',t:'lines',rows:5,wide:1},
    {k:'agent.stats',l:'Numbers (value | label, one per line)',t:'pairs',keys:['n','l'],rows:4,wide:1}]]
];
const SITE_FIELDS=SITE.flatMap(s=>s[1]);

/* ================= LOGIN ================= */
function pageLogin(){
  const c=S().company;
  return `<section class="login-shell">
  <i class="login-orb a" aria-hidden="true"></i><i class="login-orb b" aria-hidden="true"></i>
  <div class="login-formwrap">
    <div class="login-card">
      <div class="login-head">
        <span class="brand-mark">${c.logo?`<img src="${esc(c.logo)}" alt="">`:LOGO}</span>
        <h1>${esc(c.name||'Admin')}</h1>
      </div>
      <form id="loginForm" novalidate autocomplete="on">
        <label class="lf-field"><span>Email</span><input type="email" name="email" autocomplete="username" autofocus required placeholder="you@company.com"></label>
        <label class="lf-field"><span>Password</span><div class="lf-passwrap"><input type="password" name="password" autocomplete="current-password" required placeholder="Your password"><button type="button" class="lf-eye" data-act="togglepass" aria-label="Show password">${ico('eye')}</button></div></label>
        <button class="btn btn-primary lf-submit" type="submit"><span>Sign in</span>${ico('arrow')}</button>
      </form>
    </div>
  </div>
  </section>`;
}

/* ================= DASHBOARD PAGES ================= */
const DTABS=[['overview','Overview'],['products','Products'],['factories','Factories'],['agents','Agents'],['notices','Notices and offers'],['faqs','FAQs'],['categories','Categories'],['countries','Countries'],['site','Site and profile'],['account','Account settings']];
function dashBody(tab){
  if(ENT[tab]){
    const E=ENT[tab],items=E.items();
    return `<div class="dhead"><h2>${E.title}</h2><button class="btn btn-primary" data-act="add" data-kind="${tab}">${ico('plus')}Add ${E.one}</button></div><ul class="dlist">${items.length?items.map(E.row).join(''):`<li class="empty">Nothing here yet. Add your first ${E.one}.</li>`}</ul>`;
  }
  if(tab==='site'){
    const s=S();formCtx={img:{}};SITE_FIELDS.filter(f=>f.t==='image').forEach(f=>formCtx.img[f.k]=getPath(s,f.k)||'');
    return `<div class="dhead"><h2>Site and profile</h2></div><form id="siteForm" novalidate>${SITE.map(([t,fs])=>`<div class="dpanel"><h3>${t}</h3><div class="fgrid2">${fs.map(f=>fieldHtml(f,getPath(s,f.k))).join('')}</div></div>`).join('')}<div class="savebar"><button class="btn btn-primary" type="submit">Save changes</button></div></form>`;
  }
  if(tab==='account'){
    if(!state.me){
      apiFetch('/me').then(me=>{state.me=me;rerenderDash()}).catch(()=>{state.me={name:'',email:''};rerenderDash()});
      return `<div class="dhead"><h2>Account settings</h2></div><p class="lead">Loading…</p>`;
    }
    return `<div class="dhead"><h2>Account settings</h2></div><form id="accountForm" novalidate><div class="dpanel"><h3>Sign-in details</h3><div class="fgrid2">
    <label class="field"><span>Name</span><input name="name" required value="${esc(state.me.name)}"></label>
    <label class="field"><span>Email</span><input type="email" name="email" required autocomplete="username" value="${esc(state.me.email)}"></label>
    <label class="field wide"><span>Current password</span><input type="password" name="current_password" required autocomplete="current-password" placeholder="Needed to confirm any change"></label>
    <label class="field wide"><span>New password</span><input type="password" name="new_password" autocomplete="new-password" placeholder="Leave blank to keep your current password" minlength="6"></label>
    </div></div><div class="savebar"><button class="btn btn-primary" type="submit">Save account</button></div></form>`;
  }
  const cards=[['products','Products',state.products.length],['factories','Factories',state.factories.length],['agents','Agents',state.agents.length],['notices','Notices and offers',state.announcements.length]];
  return `<div class="dhead"><h2>Overview</h2></div><div class="dcards">${cards.map(([t,l,n])=>`<a class="dcard" href="#${t}"><b>${n}</b><span>${l}</span></a>`).join('')}</div>
  <div class="dpanel"><h3>Quick actions</h3><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" data-act="add" data-kind="products">${ico('plus')}Product</button><button class="btn btn-ghost btn-sm" data-act="add" data-kind="factories">${ico('plus')}Factory</button><button class="btn btn-ghost btn-sm" data-act="add" data-kind="agents">${ico('plus')}Agent</button><button class="btn btn-ghost btn-sm" data-act="add" data-kind="notices">${ico('plus')}Notice</button></div></div>`;
}
function pageDashboard(tab){
  tab=DTABS.some(t=>t[0]===tab)?tab:'overview';current.arg=tab;
  const c=S().company;
  return `<header class="nav scrolled"><div class="wrap nav-in">
    <a class="brand" href="index.html" aria-label="${esc(c.name)}, view site">${brandHtml(c)}</a>
    <div class="ctl">
      <button class="theme-switch" data-act="theme" role="switch" aria-checked="false" aria-label="Dark mode"><span class="ts-knob"></span>${ico('sun','i-sun')}${ico('moon','i-moon')}</button>
      <button class="icon-btn burger" data-act="menu" aria-label="Open menu" aria-expanded="false">${ico('menu','i-m')}${ico('close','i-x')}</button>
    </div>
  </div></header>
  <div class="mmenu">
    <button class="theme-switch" data-act="theme" role="switch" aria-checked="false" aria-label="Dark mode" style="--i:0"><span class="ts-knob"></span>${ico('sun','i-sun')}${ico('moon','i-moon')}</button>
    ${DTABS.map(([k,l],i)=>`<a href="#${k}"${k===tab?' aria-current="page"':''} style="--i:${i+1}">${l}</a>`).join('')}
    <button class="btn btn-ghost dlogout" type="button" data-act="logout" style="--i:${DTABS.length+1}">${ico('logout')}Log out</button>
  </div>
  <div class="wrap dash"><aside class="dside"><h1>Dashboard</h1><nav class="dtabs" aria-label="Dashboard">${DTABS.map(([k,l])=>`<a href="#${k}"${k===tab?' aria-current="page"':''}>${l}</a>`).join('')}</nav><div class="dside-foot"><p class="dnote">Changes save straight to the database.</p><button class="btn btn-ghost btn-sm dlogout" type="button" data-act="logout">${ico('logout')}Log out</button></div></aside><section class="dmain" id="dmain">${dashBody(tab)}</section></div>`;
}
function rerenderDash(){const m=$('#dmain');if(m){m.innerHTML=dashBody(current.arg)}}
function openEntityForm(kind,id){
  const E=ENT[kind],cur=id?E.items().find(x=>x.id===id):null,vals=cur?clone(cur):E.make(),fields=E.fields(vals);
  formCtx={img:{}};fields.filter(f=>f.t==='image').forEach(f=>formCtx.img[f.k]=vals[f.k]||'');
  openSheet(`<form class="fpanel" data-form="${kind}" data-id="${esc(id||'')}" novalidate><button type="button" class="x" data-act="close" aria-label="Close">${ico('close')}</button><h2>${cur?'Edit':'Add'} ${E.one}</h2><div class="fbody2">${fields.map(f=>fieldHtml(f,vals[f.k])).join('')}</div><footer><button type="button" class="btn btn-ghost" data-act="close">Cancel</button><button class="btn btn-primary" type="submit">Save ${E.one}</button></footer></form>`,{cls:'wide'});
}

/* ================= ADMIN ROUTER ================= */
function renderAdmin(){
  document.body.classList.add('hide-foot');
  document.body.classList.remove('menu-open');
  if(!isAdmin()){
    $('#main').innerHTML=pageLogin();
    document.title='Sign in | '+(S().company.name||'Admin');
    return;
  }
  const tab=location.hash.replace(/^#\/?/,'')||'overview';
  $('#main').innerHTML=pageDashboard(tab);
  document.title='Dashboard | '+(S().company.name||'Admin');
  syncThemeUi();
}
window.addEventListener('hashchange',()=>{if(isAdmin())renderAdmin()});

/* ================= EVENTS ================= */
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-act]');
  if(!t){
    const xbtn=e.target.closest('.xselect-btn');
    if(xbtn){const wrap=xbtn.closest('.xselect');wrap.classList.contains('open')?xselectClose(wrap):xselectOpen(wrap);return}
    const li=e.target.closest('.xselect-list li');
    if(li){
      const wrap=li.closest('.xselect'),select=wrap.querySelector('select');
      select.value=li.dataset.v;
      xselectSync(select);
      select.dispatchEvent(new Event('change',{bubbles:true}));
      xselectClose(wrap);
      return;
    }
    if(!e.target.closest('.xselect'))$$('.xselect.open').forEach(xselectClose);
    const a=e.target.closest('.mmenu a');if(a)document.body.classList.remove('menu-open');
    return;
  }
  const act=t.dataset.act,d=t.dataset;
  switch(act){
    case'close':closeSheet();break;
    case'yes':{const fn=pendingYes;pendingYes=null;closeSheet();if(fn)fn();break}
    case'theme':toggleTheme(t);document.body.classList.remove('menu-open');break;
    case'menu':{const o=document.body.classList.toggle('menu-open');t.setAttribute('aria-expanded',String(o));break}
    case'togglepass':{const wrap=t.closest('.lf-passwrap'),inp=wrap&&wrap.querySelector('input');if(inp){const show=inp.type==='password';inp.type=show?'text':'password';t.innerHTML=show?ico('eyeoff'):ico('eye');t.setAttribute('aria-label',show?'Hide password':'Show password')}break}
    case'logout':logout();break;
    case'add':openEntityForm(d.kind);break;
    case'edit':openEntityForm(d.kind,d.id);break;
    case'del':{const E=ENT[d.kind],it=E.items().find(x=>x.id===d.id);if(!it)break;confirmSheet('Delete “'+E.label(it)+'”?','This can’t be undone.',()=>{
      apiFetch(`${E.apiPath}/${d.id}`,{method:'DELETE'}).then(()=>{
        const arr=E.items();arr.splice(arr.findIndex(x=>x.id===d.id),1);
        rerenderDash();toast('Deleted');
      }).catch(err=>toast(err.network?'Could not reach the server':errMsg(err,'Could not delete. Try again.')));
    });break}
    case'img-clear':{const box=t.closest('.imgpick');if(box){formCtx.img[box.dataset.k]='';$('.imgprev',box).innerHTML='<span>No image</span>'}break}
    case'retry':location.reload();break;
  }
});
document.addEventListener('input',e=>{
  const s=e.target.closest('.xselect-search input');if(!s)return;
  const wrap=s.closest('.xselect'),q=s.value.trim().toLowerCase();
  $$('.xselect-list li',wrap).forEach(li=>{li.style.display=li.textContent.toLowerCase().includes(q)?'':'none'});
});
document.addEventListener('change',e=>{
  const inp=e.target;
  if(inp.tagName==='SELECT'){
    if(inp.name==='country'){
      const form=inp.closest('form[data-form="products"]');
      if(form){
        const fsel=form.querySelector('select[name="factoryId"]');
        if(fsel){
          const country=inp.value,cur=fsel.value;
          const opts=[['','Not assigned'],...state.factories.filter(f=>!country||f.code===country).map(f=>[f.id,f.country+', '+f.agency])];
          fsel.innerHTML=opts.map(([v,l])=>`<option value="${esc(v)}"${v===cur?' selected':''}>${esc(l)}</option>`).join('');
          if(!opts.some(([v])=>v===cur))fsel.value='';
          xselectSync(fsel);
        }
      }
    }
    return;
  }
  if(inp.type!=='file')return;
  const box=inp.closest('.imgpick'),file=inp.files&&inp.files[0];if(!box||!file)return;
  const k=box.dataset.k,max=/logo/.test(k)?420:/hero|aboutImage/.test(k)?1600:1000;
  readImage(file,max).then(({dataUrl,blob})=>{
    $('.imgprev',box).innerHTML=`<img src="${esc(dataUrl)}" alt="">`;
    box.classList.add('uploading');
    formCtx.uploading=(formCtx.uploading||0)+1;
    uploadImage(blob).then(url=>{formCtx.img[k]=url}).catch(()=>toast('Image upload failed. Try again.')).finally(()=>{formCtx.uploading--;box.classList.remove('uploading')});
  }).catch(()=>toast('That image could not be read'));
});
document.addEventListener('submit',e=>{
  const form=e.target;e.preventDefault();
  if(form.id==='loginForm'){
    const d=Object.fromEntries(new FormData(form)),btn=$('.lf-submit',form);
    if(btn)btn.disabled=true;
    apiFetch('/login',{method:'POST',json:{email:d.email,password:d.password}}).then(res=>{
      saveToken(res.token);
      location.hash='overview';
      renderAdmin();
      toast('Welcome back');
    }).catch(err=>{
      const card=form.closest('.login-card');
      if(card){card.classList.remove('shake');void card.offsetWidth;card.classList.add('shake')}
      toast(err.network?'Could not reach the server':'Email or password is incorrect');
    }).finally(()=>{if(btn)btn.disabled=false});
    return;
  }
  if(form.id==='siteForm'){
    if(formCtx.uploading>0){toast('Please wait for the image to finish uploading');return}
    const v=collect(form,SITE_FIELDS,formCtx);
    if(!v['company.name']){toast('Company name is required');return}
    const payload={company:{},socials:{},agent:{}};
    SITE_FIELDS.forEach(f=>setPath(payload,f.k,v[f.k]));
    const btn=form.querySelector('button[type=submit]');if(btn)btn.disabled=true;
    apiFetch('/settings',{method:'PUT',json:payload}).then(res=>{
      state.settings=res;toast('Site settings saved');
    }).catch(err=>toast(err.network?'Could not reach the server':'Could not save changes')).finally(()=>{if(btn)btn.disabled=false});
    return;
  }
  if(form.id==='accountForm'){
    const d=Object.fromEntries(new FormData(form));
    if(!d.name||!d.email||!d.current_password){toast('Name, email and current password are required');return}
    const payload={name:d.name,email:d.email,current_password:d.current_password};
    if(d.new_password)payload.new_password=d.new_password;
    const btn=form.querySelector('button[type=submit]');if(btn)btn.disabled=true;
    apiFetch('/account',{method:'PUT',json:payload}).then(res=>{
      state.me=res;form.current_password.value='';form.new_password.value='';
      toast('Account updated');
    }).catch(err=>{
      toast(err.network?'Could not reach the server':errMsg(err,'Could not save changes'));
    }).finally(()=>{if(btn)btn.disabled=false});
    return;
  }
  if(form.dataset.form){
    if(formCtx.uploading>0){toast('Please wait for the image to finish uploading');return}
    const kind=form.dataset.form,id=form.dataset.id,E=ENT[kind],fields=E.fields(),v=collect(form,fields,formCtx);
    if(kind==='factories'&&!v.country){const c=state.countries.find(x=>x.code===v.code);v.country=c?c.name:''}
    const bad=fields.find(f=>f.req&&!v[f.k]);
    if(bad){toast(bad.l+' is required');const el=form.querySelector(`[name="${bad.k}"]`);if(el)el.focus();return}
    const payload=Object.assign({},v);
    if(!id)payload.slug=E.make().id;
    const path=id?`${E.apiPath}/${id}`:E.apiPath,method=id?'PUT':'POST';
    const btn=form.querySelector('button[type=submit]');if(btn)btn.disabled=true;
    apiFetch(path,{method,json:payload}).then(res=>{
      const item=res.data,list=E.items();
      if(id){const i=list.findIndex(x=>x.id===id);list[i]=item}else list.push(item);
      closeSheet();rerenderDash();toast(id?'Changes saved':E.one.charAt(0).toUpperCase()+E.one.slice(1)+' added');
    }).catch(err=>{
      toast(err.network?'Could not reach the server':errMsg(err,'Could not save changes'));
    }).finally(()=>{if(btn)btn.disabled=false});
  }
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if($('.xselect.open')){$$('.xselect.open').forEach(xselectClose);return}if(sheetOpen)closeSheet();document.body.classList.remove('menu-open')}});
document.addEventListener('error',e=>{
  const i=e.target;if(!i||i.tagName!=='IMG'||!i.hasAttribute('data-photo'))return;
  i.remove();
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
    state={faqs:[],categories:[],countries:[],...cached,me:null};
    initTheme();renderAdmin();
  }else{
    $('#main').innerHTML=`<div class="wrap" style="min-height:60vh;display:grid;place-items:center;text-align:center"><p class="lead">Loading…</p></div>`;
  }
  try{
    const [settings,factories,products,agents,announcements,faqs,categories,countries]=await Promise.all([
      apiFetch('/settings'),apiFetch('/factories'),apiFetch('/products'),apiFetch('/agents'),apiFetch('/announcements'),apiFetch('/faqs'),apiFetch('/categories'),apiFetch('/countries'),
    ]);
    const fresh={settings,factories:factories.data,products:products.data,agents:agents.data,announcements:announcements.data,faqs:faqs.data,categories:categories.data,countries:countries.data};
    const changed=!cached||JSON.stringify(cached)!==JSON.stringify(fresh);
    state={...fresh,me:state.me};saveCache(fresh);
    if(changed&&!sheetOpen){initTheme();renderAdmin()}
  }catch(e){if(!cached)bootError()}
}

document.documentElement.classList.add('js');
boot();
})();
