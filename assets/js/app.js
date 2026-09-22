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
const flag=code=>`<span class="flag"><svg viewBox="0 0 60 40" role="img" aria-label="${esc(COUNTRIES[code]||'Flag')}">${FLAGS[code]||'<rect width="60" height="40" fill="#8FAFA8"/><circle cx="30" cy="20" r="12" fill="none" stroke="#fff" stroke-width="2"/><path d="M18 20h24M30 8c-6 8-6 16 0 24M30 8c6 8 6 16 0 24" stroke="#fff" stroke-width="1.6" fill="none"/>'}</svg></span>`;

/* ================= SEED CONTENT ================= */
const iso=(d)=>{const t=new Date();t.setDate(t.getDate()+d);return t.toISOString().slice(0,10)};
const SEED={
  settings:{
    company:{
      name:'Atlantik Garden Holding',
      tagline:'Rooted in good soil, sent gently across the world.',
      intro:'We grow, pack and ship fruit, grain, oils and nuts from working factories in four countries, straight to buyers and trusted agents.',
      email:'hello@atlantikgarden.com',phone:'+964 750 000 0000',address:'Head office, City, Country',
      currency:'$',logo:'',hero:'',aboutImage:'',
      story:'Atlantik Garden Holding began with a simple idea: the best produce is grown close to good soil and handled by people who care how it arrives. Today we work through factories in Spain, Türkiye, the Kurdistan Region and Egypt, each partnered with growers nearby.\n\nEvery factory packs at source, keeps its own quality records and ships through our network of authorised agents, so buyers deal with a person they can call rather than a faceless catalogue.',
      milestones:[
        {y:'2011',t:'Our first factory opens in Almería, Spain, pressing olive oil and packing almonds.'},
        {y:'2014',t:'A second factory in Türkiye begins packing pomegranates and pistachios.'},
        {y:'2016',t:'The Kurdistan Region factory starts milling wheat and packing vegetables.'},
        {y:'2018',t:'Egypt joins the group with citrus and date orchards.'},
        {y:'2024',t:'Authorised agent network expands to four regions.'}
      ]
    },
    socials:{facebook:'https://www.facebook.com/',instagram:'https://www.instagram.com/',whatsapp:'https://wa.me/9647500000000',telegram:'https://t.me/',linkedin:'https://www.linkedin.com/',tiktok:'',youtube:''},
    agent:{
      name:'Atlantik Kurdistan Sales Center',
      tagline:'Authorised agent of Atlantik Garden Holding for Iraq and the Kurdistan Region.',
      since:'2016',territory:'Iraq and the Kurdistan Region',license:'AGH-AG-0412',logo:'',
      story:'Our team represents Atlantik Garden Holding across Iraq and the Kurdistan Region. We handle orders, cold storage and last-mile delivery, and we keep buyers informed about prices, seasons and new arrivals in Kurdish, Arabic and English.\n\nWhether you supply a single shop or a chain of supermarkets, you get one contact who knows your orders and your delivery window.',
      services:['Wholesale supply of all Atlantik products','Cold-chain storage and delivery','Private-label packing on request','Weekly price and season updates','Sample packs for new buyers'],
      stats:[{n:'8',l:'Years as authorised agent'},{n:'140+',l:'Active buyers'},{n:'3,200 t',l:'Delivered each year'}]
    }
  },
  factories:[
    {id:'f-es',country:'Spain',code:'ES',city:'Almería, Andalusia',agency:'Atlantik Iberia S.L.',director:'Carlos Mendoza Ruiz',since:'2011',employees:'240',capacity:'18,000 tonnes a year',certs:['GlobalG.A.P.','BRC Food','EU Organic'],image:'',
      description:'Our oldest factory sits between olive groves and the greenhouse belt of southern Spain. Olives are pressed within hours of picking, and almonds are shelled, sorted and packed in a single line.\n\nThe plant runs its own laboratory, so every lot of oil is tested for acidity and taste before it is bottled. Growers within 60 km supply most of the fruit.'},
    {id:'f-tr',country:'Türkiye',code:'TR',city:'Gaziantep and İzmir',agency:'Atlantik Anadolu Tarım A.Ş.',director:'Elif Yılmaz',since:'2014',employees:'160',capacity:'9,500 tonnes a year',certs:['ISO 22000','HACCP','GlobalG.A.P.'],image:'',
      description:'Two sites work together here: Gaziantep for pistachios and İzmir for pomegranates. Both regions have grown these crops for centuries, and our growers know the trees by name.\n\nFruit is graded by colour and size on optical sorters, then packed in cartons or vacuum bags depending on the market.'},
    {id:'f-ku',country:'Kurdistan Region, Iraq',code:'KU',city:'Erbil',agency:'Atlantik Kurdistan Agro',director:'Dilshad Karim',since:'2016',employees:'120',capacity:'22,000 tonnes a year',certs:['ISO 9001','HACCP'],image:'',
      description:'The Erbil plain is some of the best wheat land in the region. Our mill cleans, grades and stores durum wheat, while a packing hall handles tomatoes and fresh herbs from nearby farms.\n\nBecause the factory is close to our home market, produce reaches shops in Erbil, Sulaymaniyah and Kirkuk within a day.'},
    {id:'f-eg',country:'Egypt',code:'EG',city:'Beheira Governorate',agency:'Atlantik Nile Farms',director:'Omar El-Sayed',since:'2018',employees:'190',capacity:'14,000 tonnes a year',certs:['GlobalG.A.P.','HACCP','Halal'],image:'',
      description:'West of the Nile delta, our orchards produce navel oranges in winter and Siwi dates in autumn. Fruit goes from tree to cold room in under four hours.\n\nThe factory ships by sea from Alexandria and by road to neighbouring markets, with temperature loggers in every container.'}
  ],
  products:[
    {id:'p-oil',name:'Extra Virgin Olive Oil',category:'Oils',factoryId:'f-es',price:9.8,unit:'L',discount:8,art:'oil',tint:'#C9D67A',image:'',
      short:'Cold-extracted from Picual olives and bottled within days of pressing.',
      description:'Pressed within hours of harvest at our Almería mill and bottled under nitrogen to keep the fruitiness intact. A green-gold oil with a soft peppery finish, made for dressing, dipping and finishing rather than frying.',
      features:['Cold extracted below 27 °C','Acidity under 0.4%','Dark glass, nitrogen-flushed','Traceable to the harvest lot'],
      packaging:'250 ml, 500 ml and 1 L bottles; 5 L tins',shelfLife:'18 months',moq:'1 pallet (about 600 L)',season:'Harvest October to December'},
    {id:'p-olives',name:'Manzanilla Green Olives',category:'Fruit',factoryId:'f-es',price:3.4,unit:'kg',discount:0,art:'olives',tint:'#B7CC78',image:'',
      short:'Firm, buttery table olives cured in brine the traditional way.',
      description:'Hand-sorted by size and cured slowly in stainless tanks. Available whole, pitted or stuffed with almond, pepper or garlic.',
      features:['Brine-cured, no artificial colour','Sizes 18/20 to 24/26','Whole, pitted or stuffed','Ready-to-serve pouches'],
      packaging:'1 kg to 5 kg pouches; 20 kg drums',shelfLife:'24 months',moq:'2 tonnes',season:'September to November'},
    {id:'p-almonds',name:'Marcona Almonds',category:'Nuts',factoryId:'f-es',price:11.2,unit:'kg',discount:0,art:'almonds',tint:'#E6C79A',image:'',
      short:'Soft, sweet and rounder than any ordinary almond.',
      description:'Grown on dry-farmed Andalusian slopes and shelled the same week they are dried. Raw, blanched or lightly roasted with sea salt.',
      features:['Raw, blanched or roasted','Low moisture, long crunch','Sorted by optical grader','Aflatoxin tested per lot'],
      packaging:'500 g and 1 kg bags; 10 kg cartons',shelfLife:'12 months',moq:'1 tonne',season:'Harvest August to October'},
    {id:'p-pom',name:'Hicaz Pomegranates',category:'Fruit',factoryId:'f-tr',price:2.1,unit:'kg',discount:0,art:'pomegranate',tint:'#F0B6B0',image:'',
      short:'Deep-red arils with a bright, balanced sweetness.',
      description:'Hicaz is the classic Turkish variety: thick-skinned, deep crimson and juicy. Picked by hand and graded by size before they leave İzmir.',
      features:['Sizes 350 g and up','Deep-red arils','Thick skin for long transport','Fresh fruit or fresh arils'],
      packaging:'4 kg and 5 kg cartons',shelfLife:'8 weeks in cold storage',moq:'1 container (about 20 t)',season:'October to January'},
    {id:'p-pist',name:'Antep Pistachios',category:'Nuts',factoryId:'f-tr',price:16.5,unit:'kg',discount:5,art:'pistachio',tint:'#CFE0A0',image:'',
      short:'Small, intensely green kernels with a rich, buttery flavour.',
      description:'Sourced from family orchards around Gaziantep and dried on raised racks. Sold in shell, shelled or roasted.',
      features:['In shell, shelled or roasted','Naturally split shells','Vivid green kernels','Sorted for colour and size'],
      packaging:'1 kg bags; 10 kg vacuum cartons',shelfLife:'12 months',moq:'500 kg',season:'Harvest September'},
    {id:'p-wheat',name:'Hard Durum Wheat',category:'Grains',factoryId:'f-ku',price:420,unit:'ton',discount:0,art:'wheat',tint:'#EBD08A',image:'',
      short:'Clean, high-protein wheat for pasta, bulgur and bread.',
      description:'Grown on the Erbil plain and stored in our own silos. Every lot is tested for protein, moisture and gluten before it is released.',
      features:['Protein 13% or higher','Moisture under 12.5%','Cleaned and graded','Bulk or 50 kg sacks'],
      packaging:'50 kg sacks; bulk trucks',shelfLife:'12 months',moq:'25 tonnes',season:'Harvest May to July'},
    {id:'p-tomato',name:'Vine Tomatoes',category:'Vegetables',factoryId:'f-ku',price:1.2,unit:'kg',discount:0,art:'tomato',tint:'#F2B5A5',image:'',
      short:'Sun-ripened tomatoes packed the morning they are picked.',
      description:'Field-grown near Erbil and packed on site. Firm enough for shipping, sweet enough to eat like fruit.',
      features:['Picked vine-ripe','Graded by size','Cold-room packed','Fresh or for paste'],
      packaging:'6 kg crates',shelfLife:'10 days',moq:'1 pallet',season:'May to November'},
    {id:'p-mint',name:'Fresh Mint',category:'Herbs',factoryId:'f-ku',price:6,unit:'kg',discount:0,art:'mint',tint:'#A9D8B6',image:'',
      short:'Fragrant spearmint, cut and cooled within the hour.',
      description:'Grown in shaded beds and washed in cold water before packing. A staple for teas, salads and yoghurt dishes.',
      features:['Cut to order','Triple washed','Bundled or loose','Cold-chain delivery'],
      packaging:'500 g bundles; 5 kg boxes',shelfLife:'7 days',moq:'50 kg',season:'Year round'},
    {id:'p-orange',name:'Navel Oranges',category:'Fruit',factoryId:'f-eg',price:1.05,unit:'kg',discount:10,art:'orange',tint:'#F8C98A',image:'',
      short:'Seedless, sweet and easy to peel.',
      description:'Tree-ripened in the Nile delta and waxed lightly for shipping. Juicy, low in acid and loved by children.',
      features:['Seedless','Brix 11 or higher','Sizes 56 to 88','Food-grade wax only'],
      packaging:'15 kg cartons',shelfLife:'6 weeks in cold storage',moq:'1 container (about 22 t)',season:'November to April'},
    {id:'p-dates',name:'Siwi Dates',category:'Fruit',factoryId:'f-eg',price:5.6,unit:'kg',discount:12,art:'dates',tint:'#D8B49A',image:'',
      short:'Soft, honeyed dates with a caramel finish.',
      description:'Siwi dates are picked at the soft stage and packed by hand. No added sugar, no syrup, just fruit.',
      features:['Hand-packed','No added sugar','Soft and moist','Pitted option'],
      packaging:'500 g boxes; 5 kg cartons',shelfLife:'12 months',moq:'500 kg',season:'September to November'}
  ],
  agents:[
    {id:'a-ku',name:'Atlantik Kurdistan Sales Center',contact:'Awat Rashid',role:'Sales manager',code:'KU',city:'Erbil',territory:'Kurdistan Region and Iraq',phone:'+964 750 000 0001',whatsapp:'+964 750 000 0001',email:'kurdistan@atlantikgarden.com',hours:'Saturday to Thursday, 9:00 to 17:00',logo:''},
    {id:'a-ae',name:'Atlantik Gulf Trading',contact:'Layla Haddad',role:'Regional director',code:'AE',city:'Dubai',territory:'GCC countries',phone:'+971 4 000 0002',whatsapp:'+971 50 000 0002',email:'gulf@atlantikgarden.com',hours:'Sunday to Thursday, 8:30 to 17:30',logo:''},
    {id:'a-nl',name:'Atlantik Europe Partners',contact:'Daan de Vries',role:'Account lead',code:'NL',city:'Rotterdam',territory:'Benelux and Germany',phone:'+31 10 000 0003',whatsapp:'+31 6 0000 0003',email:'europe@atlantikgarden.com',hours:'Monday to Friday, 9:00 to 17:00',logo:''},
    {id:'a-eg',name:'Nile Fresh Distribution',contact:'Mona Farouk',role:'Distribution manager',code:'EG',city:'Cairo',territory:'Egypt and North Africa',phone:'+20 2 0000 0004',whatsapp:'+20 100 000 0004',email:'egypt@atlantikgarden.com',hours:'Sunday to Thursday, 9:00 to 16:00',logo:''}
  ],
  announcements:[
    {id:'n-dates',type:'offer',title:'Autumn dates offer',body:'Order 500 kg or more of Siwi dates and take 12% off the list price.',discount:12,code:'DATES12',until:iso(45)},
    {id:'n-oil',type:'offer',title:'New-season olive oil',body:'Introductory price on this year\u2019s extra virgin olive oil for first-time buyers.',discount:8,code:'OLIVE8',until:iso(30)},
    {id:'n-ship',type:'notice',title:'Holiday shipping schedule',body:'Dispatch desks close on public holidays. Please book shipments at least ten days ahead.',discount:0,code:'',until:iso(60)},
    {id:'n-samples',type:'note',title:'Samples on request',body:'We send 1 kg sample packs of any product to registered buyers. Ask your agent.',discount:0,code:'',until:''}
  ]
};

SEED.products.forEach(p=>{p.image='assets/img/products/'+p.id+'.jpg'});
SEED.factories.forEach(f=>{f.image='assets/img/factories/'+f.id+'.jpg'});

const UNS=(id,w=1400)=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const PEX=(id,w=1200)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const REMOTE={
  hero1:UNS('1758573728869-d25eb4bafb67',1920),hero2:UNS('1635176490410-5116fc497d45',1920),hero3:UNS('1689954517393-a60459f43f77',1920),
  story:UNS('1635176490410-5116fc497d45',1920),intro1:UNS('1758573728869-d25eb4bafb67',1000),intro2:PEX(6231898,1000),about:UNS('1635176490410-5116fc497d45',1000),intro3:UNS('1689954517393-a60459f43f77',900)
};
const PFB={'p-oil':UNS('1474979266404-7eaacbcd87c5',1000),'p-olives':PEX(6231898,1000),'p-wheat':UNS('1635176490410-5116fc497d45',1000),'p-pom':UNS('1689954517393-a60459f43f77',1000)};
SEED.products.forEach(p=>{if(PFB[p.id])p.imageFb=PFB[p.id]});
/* ================= HELPERS ================= */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clone=o=>JSON.parse(JSON.stringify(o));
const uid=p=>p+Math.random().toString(36).slice(2,8);
const rnd=(a,b)=>a+Math.random()*(b-a);
const rng=seed=>()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const hashStr=s=>{let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h};
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}}};
const REDUCED=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
const getPath=(o,p)=>p.split('.').reduce((a,k)=>a==null?a:a[k],o);
const setPath=(o,p,v)=>{const ks=p.split('.');const l=ks.pop();const t=ks.reduce((a,k)=>a[k]=a[k]||{},o);t[l]=v};
const paras=t=>String(t||'').split(/\n{2,}/).filter(Boolean).map(p=>`<p>${esc(p)}</p>`).join('');
const digits=s=>String(s||'').replace(/[^\d]/g,'');
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
  grid:'<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
  wa:'<path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z"/><path d="M9.3 8.9c.3 2.6 2.4 4.6 5 5l1-1.2-1.7-.9-.8.6a4.3 4.3 0 0 1-1.9-1.9l.6-.8-.9-1.7z"/>',
  facebook:'<path d="M14 8h2V5h-2.5C11.3 5 10 6.5 10 8.7V11H8v3h2v6h3v-6h2.2l.5-3H13V8.9c0-.6.3-.9 1-.9z"/>',
  instagram:'<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.7"/><circle cx="16.8" cy="7.2" r=".6"/>',
  whatsapp:'<path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z"/><path d="M9.3 8.9c.3 2.6 2.4 4.6 5 5l1-1.2-1.7-.9-.8.6a4.3 4.3 0 0 1-1.9-1.9l.6-.8-.9-1.7z"/>',
  telegram:'<path d="M20.5 4.5L3.5 11l5 2 2 5.5 3-3.5 4.5 3.3z"/><path d="M8.5 13l8-5.5"/>',
  linkedin:'<path d="M5 9.5h3V19H5zM6.5 4.8a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM11 9.5h2.8v1.3c.6-1 1.6-1.5 3-1.5 2.7 0 3.2 1.8 3.2 4V19h-3v-4.8c0-1.1 0-2.2-1.5-2.2S14 13 14 14.1V19h-3z"/>',
  tiktok:'<path d="M14 4v10.2a3.7 3.7 0 1 1-3.7-3.7"/><path d="M14 4c.4 2.5 2 4 4.6 4.3"/>',
  youtube:'<rect x="3" y="6" width="18" height="12" rx="4"/><path d="M10.5 9.5v5l4.2-2.5z"/>',
  lock:'<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:'<path d="M3 3l18 18"/><path d="M10.6 10.6a3 3 0 0 0 4.2 4.2"/><path d="M9.9 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a15.6 15.6 0 0 1-3.2 4.1M6.2 6.2A15.7 15.7 0 0 0 2 12s3.5 7 10 7c1 0 2-.1 2.9-.4"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>'
};
const ico=(k,cls='')=>`<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]||''}</svg>`;
const SOCIAL_LABELS={facebook:'Facebook',instagram:'Instagram',whatsapp:'WhatsApp',telegram:'Telegram',linkedin:'LinkedIn',tiktok:'TikTok',youtube:'YouTube'};
const LOGO='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="var(--btn)"/><path d="M24 33c0-9 2-14 10-18-1 9-4 15-10 18z" fill="var(--on-btn)"/><path d="M24 33c0-6-1-10-8-13 0 7 3 11 8 13z" fill="var(--on-btn)" opacity=".65"/><path d="M9 38c4-3 7-3 10 0s6 3 10 0 7-3 10 0" stroke="var(--on-btn)" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';

/* ================= STATE ================= */
let state={settings:{company:{},socials:{},agent:{}},factories:[],products:[],agents:[],announcements:[]};
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
let current={page:null,arg:null},cleanup=null,formCtx={img:{}},pendingYes=null;

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

/* ================= AUTH + API ================= */
const API_BASE='http://127.0.0.1:8000/api';
const TOKENKEY='agh.token';
function getToken(){try{return localStorage.getItem(TOKENKEY)||sessionStorage.getItem(TOKENKEY)}catch(e){return null}}
function saveToken(token,remember){try{if(remember)localStorage.setItem(TOKENKEY,token);else sessionStorage.setItem(TOKENKEY,token)}catch(e){}}
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
  clearToken();location.hash='#/';toast('Signed out');
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
    <a class="icon-btn" href="#/dashboard" data-page="dashboard" aria-label="Dashboard" style="display:var(--dash-ico,grid)">${ico('grid')}</a>
    <button class="icon-btn burger" data-act="menu" aria-label="Open menu" aria-expanded="false">${ico('menu','i-m')}${ico('close','i-x')}</button></div></div>`;
  $('#mmenu').innerHTML=NAV.map(([p,l],i)=>`<a href="${href(p)}" data-page="${p}" style="--i:${i}">${l}</a>`).join('')+`<a href="#/dashboard" data-page="dashboard" style="--i:${NAV.length}">Dashboard</a>`;
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
  return `<a class="pcard" href="#/products/${esc(p.id)}" data-act="product" data-id="${esc(p.id)}" style="--tint:${esc(p.tint||'#CFE3B5')}">
    <div class="parch">${photo(p.image,p.name,p.imageFb)}${p.discount?`<span class="badge">${+p.discount}% off</span>`:''}</div>
    <div class="pmeta"><h3>${esc(p.name)}</h3><p class="pshort">${esc(p.short)}</p>
    <div class="prow">${f?`<span class="origin">${flag(f.code)}<span>${esc(f.country.split(',')[0])}</span></span>`:'<span></span>'}<span class="price">${priceHtml(p)}</span></div></div></a>`;
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
  <span class="fx2-flag"><svg viewBox="0 0 60 40" aria-hidden="true">${FLAGS[f.code]||''}</svg></span>
  <span class="fx2-stamp"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="fxc${i}" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs><text><textPath href="#fxc${i}" startOffset="0">${esc(f.agency)} • EST ${esc(f.since)} • </textPath></text></svg><b>${esc(f.code)}</b></span>
  <span class="fx2-go">${ico('arrow')}</span></div>
  <div class="fx2-body"><h3>${esc(String(f.country).split(',')[0])}</h3><p>${esc(f.city)}</p>
  <dl class="fx2-facts"><div><dt>Since</dt><dd>${esc(f.since)}</dd></div><div><dt>Team</dt><dd>${esc(f.employees)}</dd></div><div><dt>Capacity</dt><dd>${esc(f.capacity)}</dd></div></dl>
  <div class="fx2-foot"><div class="fx2-prods">${ps.slice(0,4).map(p=>`<span class="mini" style="--tint:${esc(p.tint)}">${photo(p.image,p.name,p.imageFb)}</span>`).join('')}${ps.length?`<em>${ps.length}</em>`:''}</div>${ag?`<span class="fx2-ag">${agentLogo(ag)}</span>`:''}</div></div></a>`;
}

const words=t=>String(t).split(/\s+/).filter(Boolean).map((w,i)=>`<span class="w" style="--i:${i}">${esc(w)}</span>`).join(' ');
const photo=(src,alt,fb)=>{const u=src||fb;return `<span class="ph" aria-hidden="true"><b>${esc(((alt||'').trim()[0])||'')}</b></span>${u?`<img class="photo" src="${esc(u)}" alt="${esc(alt)}" loading="lazy" decoding="async" data-photo${fb&&src&&src!==fb?` data-fb="${esc(fb)}"`:''}>`:''}`};
const fphoto=f=>`<span class="fph grain" aria-hidden="true"><b>${esc(String(f.country||'').split(',')[0])}</b></span>${f.image?`<img class="photo" src="${esc(f.image)}" alt="" loading="lazy" decoding="async" data-photo>`:''}`;
const notFound=()=>`<section class="wrap page-head"><h1>Page not found</h1><p class="lead">That page doesn\u2019t exist.</p><p style="margin-top:24px"><a class="btn btn-primary" href="#/">Back to home</a></p></section>`;

/* ================= HERO ================= */
const heroSlides=()=>{const h=S().company.hero;return [[h||'assets/img/hero-1.jpg',REMOTE.hero1,h?'':'Golden wheat, Egypt'],['assets/img/hero-2.jpg',REMOTE.hero2,'Wheat ready for harvest'],['assets/img/hero-3.jpg',REMOTE.hero3,'Pomegranate after rain, Morocco']]};
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
function routeHtml(){
  const F=state.factories,A=state.agents;if(!F.length||!A.length)return '';
  const c=S().company;
  const fc=F.map((f,i)=>{const ps=productsOf(f.id);return `<a class="rn rn-f" href="#/factories/${esc(f.id)}" data-k="f${i}" style="--h:${HUES[i%HUES.length]};--n2:${i}"><span class="rn-tag">Factory</span><span class="rn-go">${ico('arrow')}</span><span class="rn-flag">${flag(f.code)}</span><b class="rn-t">${esc(String(f.country).split(',')[0])}</b><small class="rn-s">${esc(f.city)}</small><span class="rn-a">${esc(f.agency)}</span><span class="rn-p">${ps.slice(0,4).map(p=>`<span class="mini" style="--tint:${esc(p.tint)}">${photo(p.image,p.name,p.imageFb)}</span>`).join('')}<em>${ps.length} product${ps.length===1?'':'s'}</em></span></a>`}).join('');
  const ac=A.map((a,j)=>`<a class="rn rn-g" href="#/agents" data-k="g${j}" style="--h:${hashStr(a.name)%360};--n2:${j+F.length}"><span class="rn-tag">Agent</span><span class="rn-go">${ico('arrow')}</span>${agentLogo(a)}<b class="rn-t">${esc(a.city)}</b><small class="rn-s">${esc(a.territory)}</small><span class="rn-a">${esc(a.contact)}, ${esc(a.role)}</span><span class="rn-ph">${ico('phone')}${esc(a.phone)}</span></a>`).join('');
  return `<section class="sec wrap"><div class="sec-head" data-reveal><h2>From ${F.length} origins to every market</h2><p class="lead" style="max-width:40ch">Each factory supplies the holding, and our authorised agents deliver to buyers in their own region.</p></div>
  <div class="rt" id="rt" data-reveal><div class="rt-row" style="--n:${F.length}">${fc}</div>
  <div class="rt-hubrow"><div class="hub" aria-hidden="true"><i class="hub-p"></i><i class="hub-p b"></i><span class="hub-core">${c.logo?`<img src="${esc(c.logo)}" alt="">`:LOGO}</span></div></div>
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
  const off=[];
  [...tops,...bots].forEach(el=>{const k=el.dataset.k,ty=k[0],a=()=>focus(k,ty);el.addEventListener('mouseenter',a);el.addEventListener('focus',a);el.addEventListener('mouseleave',blur);el.addEventListener('blur',blur)});
  let raf=0;const sched=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(draw)};
  let ro=null;if('ResizeObserver' in window){ro=new ResizeObserver(sched);ro.observe(box)}else window.addEventListener('resize',sched);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sched);
  sched();
  return()=>{cancelAnimationFrame(raf);if(ro)ro.disconnect();else window.removeEventListener('resize',sched)};
}
const STEPS=[['leaf','Harvest','Picked at peak ripeness by the growers we work with, close to each factory.','Peak ripeness'],['search','Sort and grade','Optical and hand sorting by size, colour and quality, with samples tested in our lab.','Lab tested'],['box','Pack and label','Packed on site in the format you need, with a lot number that stays with the product.','Lot numbered'],['route','Ship and deliver','Sent by sea or road, in refrigerated containers where needed, and handed to your agent.','Cold chain']];
let stageApi=null;
const wavesHtml=cls=>`<div class="waves ${cls}" aria-hidden="true"><svg viewBox="0 0 1440 48" preserveAspectRatio="none"><path class="wf" d="M0 0H1440V20C1200 44 960 8 720 24S240 42 0 16Z"/><path class="wl" d="M1440 20C1200 44 960 8 720 24S240 42 0 16"/></svg></div>`;
function storyHtml(){
  const f=state.factories[0]||{},p=state.products.find(x=>x.factoryId===f.id)||state.products[0]||{};
  let k=0;const w=(t,c)=>String(t).split(/\s+/).filter(Boolean).map(x=>`<span class="sw ${c}" style="--k:${k++}">${esc(x)}</span>`).join(' ');
  const code=`AGH-${esc(f.code||'XX')}-${new Date().getFullYear()}-0142`;
  const row=(i,l,v)=>`<div style="--r:${i}"><dt>${l}</dt><dd>${v}</dd></div>`;
  return `<section class="story" id="story" data-reveal><div class="story-photo grain"><img src="assets/img/story.jpg" alt="" loading="lazy" data-photo data-fb="${REMOTE.story}"></div>${wavesHtml('t')}${wavesHtml('b')}
  <div class="wrap story-in"><div class="story-copy"><h2 class="st-h">${w('Every lot begins in a field.','h')}</h2><span class="st-line" aria-hidden="true"></span><p class="st-p">${w('We follow each harvest from the first pick to the last pallet, so the fruit, grain and oil you receive can be traced back to the row it grew in.','p')}</p></div>
  <div class="lot" aria-hidden="true"><div class="lot-card grain"><div class="lot-top"><span class="lot-h">Example lot label</span><i class="lot-holo"></i></div><div class="lot-code"><span>${code}</span></div>
  <dl>${row(0,'Product',esc(p.name||''))}${row(1,'Origin',`${esc(f.city||'')}${f.country?', '+esc(String(f.country).split(',')[0]):''}`)}${row(2,'Season',esc(p.season||''))}</dl>
  <div class="lot-trace"><span>Field</span><span>Factory</span><span>Agent</span><i></i></div><div class="lot-tear"></div>
  <div class="lot-bw"><div class="lot-bars"></div><i class="lot-scan"></i></div><div class="lot-stamp">${ico('check')}<b>Traced</b></div></div></div></div></section>`;
}
function initLot(){
  const box=$('#story .lot'),el=$('#story .lot-card');
  if(!box||!el||REDUCED||!(window.matchMedia&&matchMedia('(hover:hover)').matches))return null;
  const mv=e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;el.style.setProperty('--ry',((x-.5)*22).toFixed(2)+'deg');el.style.setProperty('--rx',((.5-y)*18).toFixed(2)+'deg');el.style.setProperty('--gx',(x*100).toFixed(1)+'%');el.style.setProperty('--gy',(y*100).toFixed(1)+'%')};
  const lv=()=>{el.style.setProperty('--ry','0deg');el.style.setProperty('--rx','0deg');el.style.setProperty('--gx','30%');el.style.setProperty('--gy','0%')};
  box.addEventListener('mousemove',mv);box.addEventListener('mouseleave',lv);
  return()=>{box.removeEventListener('mousemove',mv);box.removeEventListener('mouseleave',lv)};
}
function stageHtml(){
  const real=p=>(p.imageFb||/^data:/.test(p.image||''))?1:0,list=state.products.slice().sort((a,b)=>real(b)-real(a)).slice(0,10);
  if(!list.length)return '';
  const cards=list.map((p,k)=>`<a class="sc" href="#/products/${esc(p.id)}" data-act="product" data-id="${esc(p.id)}" data-k="${k}" style="--tint:${esc(p.tint||'#CFE3B5')}"><span class="sc-in"><span class="sc-arch">${photo(p.image,p.name,p.imageFb)}${p.discount?`<span class="badge">${+p.discount}% off</span>`:''}</span></span></a>`).join('');
  const dots=list.map((p,k)=>`<button class="sd" type="button" data-k="${k}" aria-label="${esc(p.name)}" style="--tint:${esc(p.tint||'#CFE3B5')}">${photo(p.image,p.name,p.imageFb)}</button>`).join('');
  return `<section class="stage" id="stage"><div class="stage-bg" aria-hidden="true"></div><div class="stage-word" id="stWord" aria-hidden="true"></div>
  <div class="wrap stage-grid"><div class="stage-head" data-reveal><h2>This season\u2019s harvest</h2></div>
  <div class="stage-infow"><div class="stage-info" id="stInfo" aria-live="polite"></div>
  <div class="stage-ctl"><button class="icon-btn" data-act="stage" data-dir="-1" aria-label="Previous product">${ico('left')}</button><button class="ring-btn" data-act="stage" data-dir="1" aria-label="Next product"><svg class="rb" viewBox="0 0 48 48" aria-hidden="true"><circle class="rb-track" cx="24" cy="24" r="22"/><circle class="rb-prog" cx="24" cy="24" r="22"/></svg>${ico('right')}</button><a class="link" href="#/products">See the full range</a></div>
  <div class="stage-dots">${dots}</div></div>
  <div class="stage-deck" id="stTrack" tabindex="0" aria-label="Featured products">${cards}</div></div></section>`;
}
function initStage(){
  const st=$('#stage');if(!st)return null;
  const cards=$$('.sc',st),dots=$$('.sd',st),info=$('#stInfo',st),word=$('#stWord',st),track=$('#stTrack',st),ring=$('.rb-prog',st),n=cards.length;
  if(!n)return null;
  const prods=cards.map(c=>state.products.find(p=>p.id===c.dataset.id)),prevP=cards.map(()=>0);
  let idx=0,timer=null,down=null,dragged=false;
  const render=first=>{
    cards.forEach((c,k)=>{
      const o=((k-idx)%n+n)%n,p=(n>2&&o===n-1)?-2:Math.min(o,4);
      if(!first&&Math.abs(p-prevP[k])>3){c.classList.add('jump');requestAnimationFrame(()=>requestAnimationFrame(()=>c.classList.remove('jump')))}
      prevP[k]=p;c.style.setProperty('--p',p);c.style.zIndex=String(p<0?24:20-p);
      c.classList.toggle('on',p===0);c.classList.toggle('out',p<0);c.classList.toggle('far',p>3);c.tabIndex=p===0?0:-1;
    });
    dots.forEach((d,k)=>d.classList.toggle('on',k===idx));
    const p=prods[idx],f=fById(p.factoryId);
    info.classList.remove('swap');void info.offsetWidth;
    info.innerHTML=`<h3>${esc(p.name)}</h3><p>${esc(p.short)}</p><div class="si-meta">${f?`<span>${flag(f.code)}${esc(f.country.split(',')[0])}</span>`:''}<span>${priceHtml(p)}</span>${p.season?`<span>${ico('clock')}${esc(p.season)}</span>`:''}</div><a class="btn btn-primary" href="#/products/${esc(p.id)}" data-act="product" data-id="${esc(p.id)}">View product</a>`;
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
  track.addEventListener('pointerup',e=>{if(down==null)return;const dx=e.clientX-down;down=null;if(Math.abs(dx)>50)go(dx<0?1:-1);setTimeout(()=>{dragged=false},60)});
  track.addEventListener('pointercancel',()=>{down=null});
  render(true);restart();stageApi={go};
  return()=>{if(timer)clearInterval(timer);stageApi=null};
}
const accHtml=()=>{
  const real=p=>(p.imageFb||/^data:/.test(p.image||''))?1:0,list=state.products.slice().sort((a,b)=>real(b)-real(a)).slice(0,3);
  return list.map((p,i)=>{const f=fById(p.factoryId);return `<a class="acc" href="#/products/${esc(p.id)}" data-act="product" data-id="${esc(p.id)}" style="--i:${i};--tint:${esc(p.tint||'#CFE3B5')}"><span class="ph" aria-hidden="true"><b>${esc((p.name||'?')[0])}</b></span>${p.image||p.imageFb?`<img class="photo" src="${esc(p.image||p.imageFb)}" alt="${esc(p.name)}" loading="lazy" data-photo${p.image&&p.imageFb?` data-fb="${esc(p.imageFb)}"`:''}>`:''}<span class="acc-frame" aria-hidden="true"></span><span class="acc-vt" aria-hidden="true">${esc(p.name)}</span><span class="acc-cap"><b>${esc(p.name)}</b><span class="acc-meta"><span>${f?flag(f.code)+esc(f.country.split(',')[0]):esc(p.category)}</span><span class="acc-price">${money(finalPrice(p))} / ${esc(UNIT[p.unit]||p.unit)}</span></span></span><span class="acc-go" aria-hidden="true">${ico('arrow')}</span></a>`}).join('');
};
function initAcc(){
  const w=$('#acc');if(!w)return null;
  const items=$$('.acc',w);if(!items.length)return null;
  let i=0,paused=false;const set=n=>items.forEach((el,k)=>el.classList.toggle('on',k===n));
  set(0);
  w.addEventListener('mouseenter',()=>{paused=true});w.addEventListener('mouseleave',()=>{paused=false});
  items.forEach((el,k)=>{
    el.addEventListener('mouseenter',()=>{i=k;set(k)});
    el.addEventListener('focus',()=>{i=k;set(k)});
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',(((e.clientX-r.left)/r.width-.5)*2).toFixed(3));el.style.setProperty('--my',(((e.clientY-r.top)/r.height-.5)*2).toFixed(3))});
    el.addEventListener('mouseleave',()=>{el.style.setProperty('--mx',0);el.style.setProperty('--my',0)});
    el.addEventListener('click',e=>{if(!el.classList.contains('on')){e.preventDefault();e.stopPropagation();i=k;set(k)}});
  });
  const t=REDUCED?null:setInterval(()=>{if(paused)return;i=(i+1)%items.length;set(i)},4200);
  return()=>{if(t)clearInterval(t)};
}
function journeyHtml(){
  return `<section class="jn" data-reveal><div class="jn-bg" aria-hidden="true"><img src="assets/img/story.jpg" alt="" loading="lazy" data-photo data-fb="${REMOTE.story}"></div>${wavesHtml('t')}
  <div class="wrap jn-in"><div class="jn-head"><h2>From field to pallet</h2><p class="lead">Four steps, the same care at every one.</p></div>
  <div class="jn-track"><i class="jn-line" aria-hidden="true"></i><i class="jn-dot" aria-hidden="true"></i><ol class="jn-row">${STEPS.map(([i,t,d,c],k)=>`<li class="jn-col" style="--k:${k}"><span class="jn-node">${ico(i)}</span><span class="jn-stem" aria-hidden="true"></span><div class="jn-card"><h3>${t}</h3><p>${d}</p><span class="jn-chip">${c}</span></div></li>`).join('')}</ol></div></div></section>`;
}
function fxHtml(){
  const F=state.factories;if(!F.length)return '';
  const hue=i=>HUES[i%HUES.length];
  const bgs=F.map((f,i)=>`<div class="fz-bg${i===0?' on':''}" style="--h:${hue(i)}"><svg class="fz-flag" viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${FLAGS[f.code]||''}</svg>${f.image?`<img class="photo" src="${esc(f.image)}" alt="" loading="lazy" data-photo>`:''}<i class="fz-aur"></i></div>`).join('');
  const conts=F.map((f,i)=>{const ps=productsOf(f.id);return `<article class="fz-c${i===0?' on':''}"><span class="fz-fl">${flag(f.code)}</span><h3 class="fz-country">${esc(String(f.country).split(',')[0])}</h3><p class="fz-sub">${esc(f.agency)}, ${esc(f.city)}</p>
    <div class="fz-facts">${f.director?`<span>Director <b>${esc(f.director)}</b></span>`:''}${f.since?`<span>Since <b>${esc(f.since)}</b></span>`:''}${f.employees?`<span>Team <b>${esc(f.employees)}</b></span>`:''}${f.capacity?`<span>Capacity <b>${esc(f.capacity)}</b></span>`:''}</div>
    ${(f.certs||[]).length?`<div class="fz-certs">${f.certs.map(x=>`<span>${ico('check')}${esc(x)}</span>`).join('')}</div>`:''}
    <div class="fz-row2"><div class="fz-prods">${ps.slice(0,4).map(p=>`<span class="mini" style="--tint:${esc(p.tint)}">${photo(p.image,p.name,p.imageFb)}</span>`).join('')}${ps.length?`<em>${ps.length} product${ps.length===1?'':'s'}</em>`:''}</div><a class="btn btn-primary" href="#/factories/${esc(f.id)}">Open factory</a></div></article>`}).join('');
  const tabs=F.map((f,i)=>{const n=productsOf(f.id).length;return `<li><a class="fz-tab${i===0?' on':''}" data-i="${i}" href="#/factories/${esc(f.id)}">${flag(f.code)}<span><b>${esc(String(f.country).split(',')[0])}</b><small>${esc(f.city)}</small></span><em>${n}</em><i class="fz-prog"></i></a></li>`}).join('');
  return `<section class="fz grain" id="fx" data-reveal><div class="fz-bgs" aria-hidden="true">${bgs}</div><div class="fz-scrim" aria-hidden="true"></div>${wavesHtml('b')}
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
function valuesHtml(){
  const V=[['leaf','Grown near the source','Growers work within a short drive of each factory, so fruit and grain reach the packing line hours after harvest.','assets/img/values-1.jpg',REMOTE.intro1,'#/factories','Meet the factories'],
    ['box','Packed where it is picked','Sorting, packing and quality checks happen on site, with lot numbers that follow the product all the way to you.','assets/img/values-2.jpg',PFB['p-oil'],'#/products','Browse products'],
    ['route','Delivered by people you can call','Every order goes through an authorised agent who knows your market, your paperwork and your delivery window.','assets/img/values-3.jpg',REMOTE.intro3,'#/agents','Find an agent']];
  return `<section class="sec wrap vals"><div class="sec-head" data-reveal><h2>What you can count on</h2><p class="lead" style="max-width:38ch">Three promises that stand behind every order.</p></div>
  <div class="vgrid" data-stagger>${V.map(([i,t,d,loc,fb,h,l])=>`<article class="vc"><div class="vc-img"><span class="ph" aria-hidden="true"><b></b></span><img class="photo" src="${loc}" alt="" loading="lazy" decoding="async" data-photo data-fb="${esc(fb)}"></div>
  <div class="vc-body"><span class="vc-med"><i class="vc-ring"></i>${ico(i)}</span><h3>${t}</h3><p>${d}</p><a class="vc-link" href="${h}">${l}${ico('arrow')}</a></div></article>`).join('')}</div></section>`;
}
function faqHtml(){
  const c=S().company,certs=[...new Set(state.factories.flatMap(x=>x.certs||[]))],wa=S().socials.whatsapp;
  const Q=[['Ordering','What is the minimum order?','It depends on the product. Most start at one pallet or 500 kg, and the exact figure is listed on every product page.'],
    ['Ordering','Can I get samples before ordering?','Yes. We send 1 kg sample packs of any product to registered buyers. Ask your local agent.'],
    ['Ordering','How do I request a quote?','Open any product and choose \u201CRequest a quote\u201D, or contact your regional agent directly. We reply within one working day.'],
    ['Quality','Which certifications do your factories hold?',certs.length?`Our factories are certified to ${certs.join(', ')}. Each factory page lists its own certificates.`:'Each factory page lists its own certificates.'],
    ['Quality','Can I trace where a product came from?','Yes. Every pack carries a lot number that links it back to the factory and the harvest it came from.'],
    ['Shipping','How is the produce shipped?','By sea and road. Fresh produce travels in refrigerated containers, and dry goods go on pallets or in bulk.'],
    ['Shipping','How long does delivery take?','It depends on the product and the destination. Your agent confirms the delivery date when you place the order.'],
    ['Partners','How do I become an agent?','Send us a message from the contact page and choose \u201CBecome an agent\u201D. Tell us about your market and your storage capacity.']];
  const tabs=['All','Ordering','Quality','Shipping','Partners'];
  return `<section class="sec wrap faq-sec"><div class="faq-grid"><aside class="faq-aside" data-reveal><div class="faq-card grain"><span class="faq-mark" aria-hidden="true">?</span><h2>Questions buyers ask</h2><p>Can\u2019t find your answer? Write to us or call, and we will reply within one working day.</p>
  <div class="faq-ctas"><a class="btn btn-primary" href="mailto:${esc(c.email)}">${ico('mail')}Email us</a><a class="btn btn-ghost" href="${tel(c.phone)}">${ico('phone')}Call</a>${wa?`<a class="btn btn-ghost" href="${esc(wa)}" target="_blank" rel="noopener">${ico('wa')}WhatsApp</a>`:''}</div></div></aside>
  <div class="faq-main" data-reveal><div class="chips" id="faqTabs">${tabs.map((t,i)=>`<button class="chip" data-act="fqtab" data-v="${t}" aria-pressed="${i===0}">${t}</button>`).join('')}</div>
  <div class="fqs" id="fqs">${Q.map(([cat,q,a],i)=>`<div class="fq${i===0?' open':''}" data-c="${cat}"><button class="fq-h" data-act="fq" aria-expanded="${i===0}"><span>${esc(q)}</span><i class="pm" aria-hidden="true"></i></button><div class="fq-a"><div><p>${esc(a)}</p></div></div></div>`).join('')}</div></div></div></section>`;
}
function matchProduct(a){
  const txt=(' '+(a.title||'')+' '+(a.body||'')+' '+(a.code||'')+' ').toLowerCase();
  let best=null,bs=0;
  state.products.forEach(p=>{const sc=String(p.name).toLowerCase().split(/[^a-z]+/).filter(w=>w.length>=4&&!['extra','virgin','green','fresh','hard','vine'].includes(w)).reduce((n,w)=>n+(new RegExp('\\b'+w.replace(/s$/,'')+'s?\\b').test(txt)?1:0),0);if(sc>bs){bs=sc;best=p}});
  return best;
}
function ticketHtml(a,i){
  const p=matchProduct(a),tint=(p&&p.tint)||'#E9C46A',real=p&&(p.imageFb||/^data:/.test(p.image||'')),atm=[REMOTE.intro1,REMOTE.intro3][i%2];
  const cd=a.until?`<div class="tk-cdw"><span class="tk-lbl">Ends in</span><div class="tk-cd" aria-label="Time left"><span><b data-u="d">0</b><i>days</i></span><span><b data-u="h">00</b><i>hrs</i></span><span><b data-u="m">00</b><i>min</i></span><span><b data-u="s">00</b><i>sec</i></span></div></div>`:`<span class="tk-open">No end date</span>`;
  const stub=real?photo(p.image,p.name,p.imageFb):`<img class="photo" src="${atm}" alt="" loading="lazy" data-photo><span class="tk-tone"></span>`;
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
  const live=state.announcements.filter(isLive),offers=live.filter(a=>a.type==='offer').slice(0,4),others=live.filter(a=>a.type!=='offer').slice(0,4);
  if(!offers.length&&!others.length)return '';
  return `<section class="sec wrap off-sec"><div class="sec-head" data-reveal><div>${offers.length?`<span class="live-badge"><i></i>${offers.length} active offer${offers.length===1?'':'s'}</span>`:''}<h2>Offers and notices</h2></div><a class="link" href="#/contact/offers">All offers</a></div>
  ${offers.length?`<div class="tk-grid" data-stagger>${offers.map(ticketHtml).join('')}</div>`:''}
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
function ctaHtml(){
  const A=state.agents;
  const cards=A.map(a=>`<div class="ac2"><div class="ac2-h">${agentLogo(a)}<div><b>${esc(a.name)}</b><small>${flag(a.code)}${esc(a.city)}${COUNTRIES[a.code]?', '+esc(COUNTRIES[a.code]):''}</small></div></div><p>${esc(a.territory)}</p><div class="ac2-ph"><span class="ac2-ic">${ico('phone')}<i></i></span><span>${esc(a.phone)}</span></div><div class="ac2-b"><a class="btn btn-primary btn-sm" href="${tel(a.phone)}">Call</a><a class="btn btn-ghost btn-sm" href="https://wa.me/${digits(a.whatsapp||a.phone)}" target="_blank" rel="noopener">WhatsApp</a></div></div>`).join('');
  return `<section class="cta2 grain" data-reveal><div class="cta2-bg" aria-hidden="true"><img src="assets/img/story.jpg" alt="" loading="lazy" data-photo data-fb="${REMOTE.story}"></div>${wavesHtml('t')}
  <div class="wrap cta2-in"><div class="cta2-l"><h2>Buy through an authorised agent</h2><p>Our agents handle pricing, samples, paperwork and delivery in your region. Pick the one closest to you.</p>
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
    prev[k]=q;c.style.setProperty('--q',q);c.style.zIndex=String(q<0?12:10-q);c.classList.toggle('out',q<0);c.classList.toggle('back',q>2);c.classList.toggle('front',q===0);
  });
  render(true);
  const t=(REDUCED||n<2)?null:setInterval(()=>{idx=(idx+1)%n;render()},3800);
  return()=>{if(t)clearInterval(t)};
}
function pageHome(){
  const c=S().company,f=state.factories,countries=new Set(f.map(x=>x.code)).size;
  const live=state.announcements.filter(isLive).slice(0,2);
  const years=f.map(x=>parseInt(x.since,10)).filter(Boolean),since=years.length?Math.min(...years):'';
  const certs=[...new Set(f.flatMap(x=>x.certs||[]))];
  const has=p=>p.image||p.imageFb?1:0,rail=state.products.slice().sort((a,b)=>has(b)-has(a)).slice(0,10);
  const fact=(n,l)=>`<li><b data-count="${n}">${n}</b><span>${l}</span></li>`;
  const mq=state.products.map(p=>`<span>${esc(p.name)}</span><i class="mq-dot" aria-hidden="true"></i>`).join('');
  const faq=[['What is the minimum order?','It depends on the product. Most start at one pallet or 500 kg, and the exact figure is listed on every product page.'],['Can I get samples before ordering?','Yes. We send 1 kg sample packs of any product to registered buyers. Ask your local agent.'],['Which certifications do your factories hold?',certs.length?`Our factories are certified to ${certs.join(', ')}. Each factory page lists its own certificates.`:'Each factory page lists its own certificates.'],['How is the produce shipped?','By sea and road. Fresh produce travels in refrigerated containers, and dry goods go on pallets or in bulk.'],['How do I become an agent?','Send us a message from the contact page and choose \u201CBecome an agent\u201D. Tell us about your market and your storage capacity.']];
  return `<section class="hero" id="hero"><div class="hero-bg grain"><div class="hero-slides">${heroSlides().map(([u,fb,cap],i)=>`<div class="hero-slide" data-cap="${esc(cap||'')}" style="--dl:-${i*7}s"><img src="${esc(u)}" alt="" data-slide data-fb="${esc(fb)}"></div>`).join('')}</div></div><div class="hero-scrim"></div>
  <div class="wrap hero-copy"><h1 class="grow">${words(c.tagline)}</h1><p class="lead hero-in" style="--i:9">${esc(c.intro)}</p>
  <div class="hero-cta hero-in" style="--i:10"><a class="btn btn-primary" href="#/products">Explore products</a><a class="btn btn-ghost" href="#/agents">Find an agent</a></div></div>
  <div class="hero-fade"></div><div class="hero-strip hero-in" style="--i:12"><div class="wrap hs-in"><ul class="hero-facts">${fact(f.length,'Factories')}${fact(countries,'Countries')}${fact(state.products.length,'Products')}${fact(state.agents.length,'Agents')}</ul><div class="hero-side"><div class="hero-cap"></div><div class="hero-dots" aria-hidden="true"></div></div></div></div><div class="pollen" aria-hidden="true"></div></section>
  <div class="marquee" aria-hidden="true"><div class="mq-track">${mq}${mq}</div></div>
  <section class="sec wrap intro"><div data-reveal><h2>One holding, several soils.</h2><p class="lead lead-l">Each factory works with growers near its own fields, so what reaches you was picked close to where it was raised and packed within hours.</p><div class="orn" aria-hidden="true"><i></i><b></b></div><p class="lead">Every lot is traceable, every shipment goes through an authorised agent, and every price is one you can confirm with a person.</p>
  ${certs.length?`<div class="certs"><span>Certified to</span><div class="tags">${certs.map(x=>`<span class="tag">${ico('check')}${esc(x)}</span>`).join('')}</div></div>`:''}<a class="link" href="#/about">Read our story</a></div>
  <div class="acc-art" data-reveal><div class="acc-wrap" id="acc">${accHtml()}</div>
  <div class="seal"><svg class="rot" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="sealCircle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"/></defs><text><textPath href="#sealCircle" startOffset="0">Grown near the source / Packed on site / Shipped with care / </textPath></text></svg><span class="seal-c">${since?`<small>since</small><b>${since}</b>`:LOGO}</span></div></div></section>
  ${storyHtml()}
  ${stageHtml()}
  ${routeHtml()}
  ${calendarHtml()}
  ${journeyHtml()}
  ${fxHtml()}
  ${valuesHtml()}
  ${faqHtml()}
  ${homeOffersHtml()}
  ${ctaHtml()}`;
}
const isReal=p=>!!(p.imageFb||/^data:/.test(p.image||''));
const inSeasonNow=p=>{const m=seasonMask(p.season);return !!(m&&m[new Date().getMonth()])};
const perKg=p=>{const v=finalPrice(p);return p.unit==='ton'?v/1000:v};
const shortC=f=>f?String(f.country).split(',')[0]:'';
function filteredP(){
  const q=ui.q.trim().toLowerCase();
  const l=state.products.map((p,i)=>({p,i})).filter(({p})=>(ui.cat==='All'||p.category===ui.cat)&&(ui.origin==='All'||p.factoryId===ui.origin)&&(!ui.season||inSeasonNow(p))&&(!ui.offer||p.discount>0)&&(!q||[p.name,p.short,p.category,shortC(fById(p.factoryId))].join(' ').toLowerCase().includes(q)));
  const by={featured:(a,b)=>(isReal(b.p)-isReal(a.p))||(inSeasonNow(b.p)-inSeasonNow(a.p))||a.i-b.i,az:(a,b)=>a.p.name.localeCompare(b.p.name),low:(a,b)=>perKg(a.p)-perKg(b.p),high:(a,b)=>perKg(b.p)-perKg(a.p),season:(a,b)=>(inSeasonNow(b.p)-inSeasonNow(a.p))||a.i-b.i};
  return l.sort(by[ui.sort]||by.featured).map(x=>x.p);
}
const catColor=c=>{const p=c==='All'?(state.products.find(isReal)||state.products[0]):state.products.find(x=>x.category===c);return (p&&p.tint)||'#CFE3B5'};
function pcardX(p,i){
  const f=fById(p.factoryId),m=seasonMask(p.season),cm=new Date().getMonth(),now=m&&m[cm];
  const facts=[['Packaging',p.packaging],['Minimum order',p.moq],['Shelf life',p.shelfLife]].filter(x=>x[1]);
  return `<a class="px" href="#/products/${esc(p.id)}" data-act="product" data-id="${esc(p.id)}" style="--tint:${esc(p.tint||'#CFE3B5')};--i:${i}">
  <div class="px-media">${photo(p.image,p.name,p.imageFb)}<span class="px-shade"></span>
  ${p.discount?`<span class="px-ribbon"><b>${+p.discount}%</b><small>off</small></span>`:''}
  ${now?'<span class="tg tg-now"><i></i>In season</span>':''}
  ${facts.length?`<div class="px-quick"><b>Quick facts</b>${facts.map(([k,v])=>`<span><i>${k}</i>${esc(v)}</span>`).join('')}</div>`:''}<span class="px-go">${ico('arrow')}</span></div>
  <div class="px-body"><span class="px-kick"><i></i>${esc(p.category)}</span><h3>${esc(p.name)}</h3><p>${esc(p.short)}</p>
  ${m?`<div class="px-cal" aria-label="Season: ${esc(runLabel(m))}">${m.map((on,k)=>`<i class="${on?'on':''}${k===cm?' now':''}"></i>`).join('')}<em>${esc(runLabel(m))}</em></div>`:''}
  <div class="px-foot"><span class="px-or">${f?flag(f.code)+esc(shortC(f)):''}</span><span class="px-pr">${priceHtml(p)}</span></div></div></a>`;
}
const emptyHtml=()=>`<div class="empty px-empty"><span class="pe-ic">${ico('search')}</span><h3>No products match</h3><p>Try another word, or remove a filter.</p><button class="btn btn-primary btn-sm" data-act="clear">Clear all filters</button></div>`;
function activeHtml(){
  const a=[];
  if(ui.cat!=='All')a.push(['cat',ui.cat]);
  if(ui.origin!=='All')a.push(['origin',shortC(fById(ui.origin))||'Origin']);
  if(ui.season)a.push(['season','In season now']);
  if(ui.offer)a.push(['offer','On offer']);
  if(ui.q.trim())a.push(['q','\u201C'+ui.q.trim()+'\u201D']);
  return a.length?a.map(([k,l])=>`<button class="af" data-act="unf" data-k="${k}">${esc(l)}${ico('close')}</button>`).join('')+'<button class="af af-clear" data-act="clear">Clear all</button>':'';
}
function panelHtml(){
  const cats=['All',...new Set(state.products.map(p=>p.category).filter(Boolean))];
  const cnt=c=>c==='All'?state.products.length:state.products.filter(p=>p.category===c).length;
  const dot=c=>{const p=c==='All'?null:state.products.find(x=>x.category===c);return p?`<i class="cd" style="--tint:${esc(p.tint)}"></i>`:ico('grid')};
  const seg=cats.map(c=>`<button class="sg" type="button" data-act="cat" data-v="${esc(c)}" aria-pressed="${ui.cat===c}">${dot(c)}${esc(c)}<em>${cnt(c)}</em></button>`).join('');
  const orig=`<button class="oc" type="button" data-act="origin" data-v="All" aria-pressed="${ui.origin==='All'}">All origins</button>`+state.factories.map(f=>`<button class="oc" type="button" data-act="origin" data-v="${esc(f.id)}" aria-pressed="${ui.origin===f.id}">${flag(f.code)}${esc(shortC(f))}<em>${productsOf(f.id).length}</em></button>`).join('');
  const sorts=[['featured','Featured'],['season','In season first'],['az','Name, A to Z'],['low','Price, low to high'],['high','Price, high to low']];
  return `<div class="pf-row pf-a"><label class="pf-search">${ico('search')}<input id="q" type="search" autocomplete="off" placeholder="Search products" aria-label="Search products" value="${esc(ui.q)}"><kbd>/</kbd></label>
   <label class="pf-sort"><span>Sort</span><select id="psort" aria-label="Sort products">${sorts.map(([v,l])=>`<option value="${v}"${ui.sort===v?' selected':''}>${l}</option>`).join('')}</select></label>
   <div class="vt" role="group" aria-label="View"><button class="vb" type="button" data-act="view" data-v="grid" aria-label="Grid view" aria-pressed="${ui.view==='grid'}">${ico('grid')}</button><button class="vb" type="button" data-act="view" data-v="list" aria-label="List view" aria-pressed="${ui.view==='list'}">${ico('list')}</button></div></div>
  <div class="pf-row"><div class="seg"><div class="seg-in"><i class="seg-pill"></i>${seg}</div></div></div>
  <div class="pf-row pf-c"><div class="ocs">${orig}</div><div class="pf-sw"><button class="sw2" type="button" data-act="tog" data-k="season" aria-pressed="${ui.season}"><i></i>In season now</button><button class="sw2" type="button" data-act="tog" data-k="offer" aria-pressed="${ui.offer}"><i></i>On offer</button></div></div>`;
}
function pageProducts(){
  const n=state.products.length,cn=new Set(state.factories.map(f=>f.code)).size,sn=state.products.filter(inSeasonNow).length;
  const hp=state.products.filter(isReal).slice(0,3);
  return `<div class="prd" id="prd" style="--cat:${esc(catColor(ui.cat))}"><section class="prd-hero grain"><div class="wrap prd-hero-in"><div class="prd-t"><h1 class="grow">${words('Our harvest')}</h1><p class="lead hero-in" style="--i:3">Everything we grow, pack and ship. Explore by category, origin or season, and open any product for prices and specifications.</p>
  <div class="prd-pills hero-in" style="--i:5"><span><b data-count="${n}">${n}</b> products</span><span><b data-count="${cn}">${cn}</b> origins</span><span><b data-count="${sn}">${sn}</b> in season now</span></div></div>
  ${hp.length?`<div class="prd-arches" aria-hidden="true">${hp.map((p,i)=>`<span class="pa pa${i}" style="--tint:${esc(p.tint)}">${photo(p.image,p.name,p.imageFb)}</span>`).join('')}</div>`:''}</div></section>
  <section class="wrap prd-pw"><div class="prd-panel hero-in" style="--i:6">${panelHtml()}</div></section>
  <section class="wrap prd-res"><div class="prd-meta"><span id="pcount"></span><div class="pact" id="pactive"></div></div><div class="grid pgrid px-grid" id="pgrid"></div></section><div style="height:clamp(30px,5vw,70px)"></div></div>`;
}
function syncPanel(){
  $$('#prd .sg').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===ui.cat)));
  $$('#prd .oc').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===ui.origin)));
  $$('#prd .sw2').forEach(b=>b.setAttribute('aria-pressed',String(!!ui[b.dataset.k])));
  $$('#prd .vb').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===ui.view)));
  const s=$('#psort');if(s&&s.value!==ui.sort)s.value=ui.sort;
}
function movePill(){
  const seg=$('#prd .seg-in');if(!seg)return;
  const a=$('.sg[aria-pressed="true"]',seg);if(!a)return;
  seg.style.setProperty('--x',a.offsetLeft+'px');seg.style.setProperty('--w',a.offsetWidth+'px');
}
function renderGrid(){
  const g=$('#pgrid');if(!g)return;
  const l=filteredP();
  g.className='grid pgrid px-grid'+(ui.view==='list'?' list':'');
  g.innerHTML=l.length?l.map((p,i)=>pcardX(p,i)).join(''):emptyHtml();
  const pc=$('#pcount');if(pc){pc.innerHTML=`Showing <b>${l.length}</b> of ${state.products.length} products`;pc.classList.remove('pop');void pc.offsetWidth;pc.classList.add('pop')}
  const pa=$('#pactive');if(pa)pa.innerHTML=activeHtml();
  syncPanel();movePill();
  const prd=$('#prd');if(prd)prd.style.setProperty('--cat',catColor(ui.cat));
}
function initProducts(){
  const prd=$('#prd');if(!prd)return null;
  renderGrid();
  const q=$('#q'),g=$('#pgrid'),names=state.products.map(p=>p.name);let k=0;
  const ph=setInterval(()=>{if(q&&document.activeElement!==q&&!q.value){k=(k+1)%names.length;q.placeholder='Search \u201C'+names[k]+'\u201D'}},2600);
  const key=e=>{if(e.key==='/'&&!/^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement||{}).tagName||'')&&q){e.preventDefault();q.focus()}};
  document.addEventListener('keydown',key);
  let cur=null;
  const reset=m=>{if(m){m.style.setProperty('--rx','0deg');m.style.setProperty('--ry','0deg')}};
  const mv=e=>{if(REDUCED)return;const m=e.target.closest&&e.target.closest('.px-media');if(m!==cur){reset(cur);cur=m}if(!m)return;const r=m.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;m.style.setProperty('--ry',(x*12).toFixed(2)+'deg');m.style.setProperty('--rx',(-y*10).toFixed(2)+'deg')};
  const lv=()=>{reset(cur);cur=null};
  g.addEventListener('pointermove',mv);g.addEventListener('pointerleave',lv);
  const rz=()=>movePill();window.addEventListener('resize',rz);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(movePill);
  return()=>{clearInterval(ph);document.removeEventListener('keydown',key);window.removeEventListener('resize',rz)};
}
function productSheet(p){
  const f=fById(p.factoryId),c=S().company;
  const mail=`mailto:${c.email}?subject=${encodeURIComponent('Quote request: '+p.name)}&body=${encodeURIComponent('Hello,\n\nI would like a quote for '+p.name+'.\nQuantity:\nDelivery country:\n\nThank you')}`;
  const specs=[['Packaging',p.packaging],['Shelf life',p.shelfLife],['Minimum order',p.moq],['Season',p.season]].filter(x=>x[1]);
  return `<button class="x" data-act="close" aria-label="Close">${ico('close')}</button><div class="pview" style="--tint:${esc(p.tint||'#CFE3B5')}">
  <div class="pview-art"><div class="parch">${photo(p.image,p.name,p.imageFb)}${p.discount?`<span class="badge">${+p.discount}% off</span>`:''}</div></div>
  <div class="pview-body"><div class="crumbs"><span class="tag">${esc(p.category)}</span>${f?`<a class="origin" href="#/factories/${esc(f.id)}">${flag(f.code)}<span>Packed in ${esc(f.country)}</span></a>`:''}</div>
  <h2>${esc(p.name)}</h2><div class="pprice"><b>${money(finalPrice(p))}</b>${p.discount?`<s>${money(p.price)}</s>`:''}<span>per ${esc(UNIT[p.unit]||p.unit)}, indicative</span></div>
  <p>${esc(p.description)}</p>${(p.features||[]).length?`<ul class="feat">${p.features.map(x=>`<li>${ico('check')}<span>${esc(x)}</span></li>`).join('')}</ul>`:''}
  ${specs.length?`<dl class="specs">${specs.map(([k,v])=>`<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`:''}
  <div class="pview-cta"><a class="btn btn-primary" href="${mail}">Request a quote</a><a class="btn btn-ghost" href="#/agents">Find an agent</a></div></div></div>`;
}
function pageFactories(){
  const F=state.factories,ncty=new Set(F.map(f=>f.code)).size,tprod=state.products.length;
  const cap=F.reduce((n,f)=>n+(parseFloat(String(f.capacity).replace(/[^\d.]/g,''))||0),0);
  const flags=F.map((f,i)=>`<span class="fa-orb" style="--i:${i};--n:${F.length}"><svg viewBox="0 0 60 40" aria-hidden="true">${FLAGS[f.code]||''}</svg></span>`).join('');
  const rows=F.map((f,i)=>`<a class="fa-row" href="#/factories/${esc(f.id)}" style="--i:${i}"><span class="fa-idx">0${i+1}</span><svg class="fa-flag" viewBox="0 0 60 40" aria-hidden="true">${FLAGS[f.code]||''}</svg><span class="fa-name">${esc(String(f.country).split(',')[0])}</span><span class="fa-city">${esc(f.city)}</span><span class="fa-since">Est. ${esc(f.since)}</span><span class="fa-arrow">${ico('arrow')}</span></a>`).join('');
  return `<section class="fatlas grain"><div class="fatlas-glow" aria-hidden="true"></div>
  <div class="wrap fatlas-in"><div class="fatlas-t"><span class="fatlas-kick">${ico('leaf')}A holding across ${ncty} nations</span><h1 class="grow">${words('Our factories')}</h1><p class="lead hero-in" style="--i:8">Each nation brings its own soil, its own hands and its own certification. Together they supply one holding you can trust anywhere in the world.</p>
  <ul class="fatlas-stats hero-in" style="--i:10">${[[ncty,'Countries'],[F.length,'Factories'],[tprod,'Products'],[cap?Math.round(cap).toLocaleString('en-US')+'t':F.length,cap?'Tonnes yearly':'Certifications']].map(([n,l])=>`<li><b data-count="${typeof n==='number'?n:0}">${n}</b><span>${l}</span></li>`).join('')}</ul></div>
  <div class="fatlas-orbit" aria-hidden="true"><div class="fatlas-core">${ico('leaf')}</div><div class="fatlas-ring r1"></div><div class="fatlas-ring r2"></div>${flags}</div></div></section>
  <section class="wrap fa-list"><div class="sec-head" data-reveal><h2>Every origin, in order</h2><p class="lead" style="max-width:36ch">Scroll the list or open a card below for the full story.</p></div>
  <div class="fa-rows" data-stagger>${rows}</div></section>
  <section class="wrap fa-grid-sec"><div class="fgrid fx2-grid" data-stagger>${F.map(fcard).join('')}</div></section><div style="height:clamp(30px,5vw,70px)"></div>`;
}
function pageFactory(id){
  const n=state.factories.length,i=state.factories.findIndex(f=>f.id===id);if(i<0)return notFound();
  const f=state.factories[i],ps=productsOf(f.id),prev=state.factories[(i-1+n)%n],next=state.factories[(i+1)%n],ag=state.agents.find(a=>a.code===f.code),h=HUES[i%HUES.length];
  const cname=String(f.country).split(',')[0];
  const stamp=(cls,label)=>`<div class="fd-stamp ${cls}"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="fdc${cls}${i}" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs><text><textPath href="#fdc${cls}${i}" startOffset="0">${esc(label)} \u2022 ${esc(f.agency)} \u2022 </textPath></text></svg><b>${esc(f.code)}</b></div>`;
  return `<article class="fd" style="--h:${h}">
  <header class="fd-hero grain"><div class="fd-media">${f.image?`<img class="photo" src="${esc(f.image)}" alt="" loading="lazy" data-photo>`:''}<i class="fd-orb a"></i><i class="fd-orb b"></i></div><div class="fd-scrim"></div>${wavesHtml('b')}
  <div class="wrap fd-hero-in"><a class="back fd-back" href="#/factories">${ico('left')}All factories</a>
  <div class="fd-title"><span class="fd-flag">${flag(f.code)}</span><div><span class="fd-kick">Factory 0${i+1} of 0${n}</span><h1>${esc(cname)}</h1><p>${esc(f.agency)}, ${esc(f.city)}</p></div></div>
  ${stamp('hero','Est. '+f.since)}</div></header>
  <div class="wrap fd-stripwrap"><dl class="fd-strip" data-reveal>
   <div><dt>${ico('pin')}Location</dt><dd>${esc(f.city)}</dd></div>
   <div><dt>${ico('clock')}Established</dt><dd>${esc(f.since)}</dd></div>
   <div><dt>${ico('route')}Team</dt><dd>${esc(f.employees)} people</dd></div>
   <div><dt>${ico('box')}Capacity</dt><dd>${esc(f.capacity)}</dd></div></dl></div>
  <section class="wrap fd-body"><div class="fd-two">
   <div class="prose fd-prose" data-reveal>${paras(f.description)}</div>
   <aside class="fd-aside" data-reveal>
    <div class="fd-card fd-person"><span class="avatar">${esc((f.director||'?')[0])}</span><div><small>Factory director</small><b>${esc(f.director)}</b></div></div>
    ${(f.certs||[]).length?`<div class="fd-card"><h3>Certifications</h3><div class="tags fd-certs">${f.certs.map(x=>`<span class="tag">${ico('check')}${esc(x)}</span>`).join('')}</div></div>`:''}
    ${ag?`<div class="fd-card fd-person"><a class="fd-agent" href="#/agents">${agentLogo(ag)}<div><small>Local sales agent</small><b>${esc(ag.name)}</b><small class="link">Contact details</small></div></a></div>`:''}
    <div class="fd-pass">${stamp('side','Authentic origin')}<div><small>Country of origin</small><b>${esc(cname)}</b></div></div>
   </aside></div></section>
  <section class="wrap fd-prod"><div class="sec-head" data-reveal><h2>Made in ${esc(cname)}</h2><a class="link" href="#/products">All products</a></div>
  <div class="grid pgrid px-grid" data-stagger>${ps.length?ps.map((p,k)=>pcardX(p,k)).join(''):'<div class="empty"><h3>No products yet</h3><p>Products assigned to this factory will appear here.</p></div>'}</div></section>
  ${n>1?`<nav class="fd-pager wrap" aria-label="Other factories"><a class="fdp fdp-prev" href="#/factories/${esc(prev.id)}"><span class="fdp-ic">${ico('left')}</span><span class="fdp-flag">${flag(prev.code)}</span><span><small>Previous</small><b>${esc(String(prev.country).split(',')[0])}</b></span></a><a class="fdp fdp-next" href="#/factories/${esc(next.id)}"><span><small>Next</small><b>${esc(String(next.country).split(',')[0])}</b></span><span class="fdp-flag">${flag(next.code)}</span><span class="fdp-ic">${ico('right')}</span></a></nav>`:''}
  <div style="height:clamp(30px,5vw,70px)"></div></article>`;
}
function agentsMatch(a,q){return !q||[a.name,a.contact,a.city,a.territory,COUNTRIES[a.code]||''].join(' ').toLowerCase().includes(q)}
function agentsGridHtml(){
  const q=(ui.aq||'').trim().toLowerCase(),l=state.agents.filter(a=>agentsMatch(a,q));
  return l.length?l.map(agentCard).join(''):`<div class="empty ag-empty"><span class="pe-ic">${ico('search')}</span><h3>No agents match</h3><p>Try a different city or region.</p><button class="btn btn-primary btn-sm" data-act="agclear">Clear search</button></div>`;
}
function renderAgentsGrid(){const g=$('#agrid');if(!g)return;g.innerHTML=agentsGridHtml();const c=$('#acount');if(c)c.textContent=state.agents.filter(a=>agentsMatch(a,(ui.aq||'').trim().toLowerCase())).length+' of '+state.agents.length;reveal(g)}
function pageAgents(){
  const A=state.agents,ncty=new Set(A.map(a=>a.code)).size,n=A.length;
  const chips=A.map(a=>`<button class="ah-chip" type="button" data-act="agjump" data-i="${a.id}"><span class="hl-dot" style="--cc:hsl(${hashStr(a.name)%360} 55% 45%)"></span>${esc(a.city)}</button>`).join('');
  return `<section class="ahub grain"><div class="ahub-glow" aria-hidden="true"></div>${wavesHtml('b')}<div class="wrap ahub-in">
  <div class="ahub-t"><span class="fatlas-kick">${ico('phone')}One call away, everywhere we sell</span><h1 class="grow">${words('Authorised agents')}</h1><p class="lead hero-in" style="--i:8">Our agents are the sales centres for their regions: pricing, samples, paperwork and delivery, handled by someone you can actually call.</p>
  <ul class="fatlas-stats hero-in" style="--i:10">${[[n,'Agents'],[ncty,'Countries'],[state.factories.length,'Origins served'],[24,'Hour reply target']].map(([v,l])=>`<li><b data-count="${v}">${v}</b><span>${l}</span></li>`).join('')}</ul>
  <div class="ahub-jump hero-in" style="--i:12">${chips}</div></div>
  <div class="ah-bigflag" aria-hidden="true"><i class="ah-bf-ring"></i><i class="ah-bf-ring r2"></i><i class="ah-bf-glow"></i>
  <div class="ah-bf-wrap"><svg class="ah-bf-svg" viewBox="0 0 60 40">${FLAGS.KU||''}</svg><i class="ah-bf-shine"></i><i class="ah-bf-pole"></i></div>
  <div class="ah-bf-dust">${Array.from({length:14},(_,i)=>`<i style="--i:${i};--x:${(6+i*6.7).toFixed(1)}%;--t:${(6+ (i%5)*1.6).toFixed(1)}s;--dl:-${(i*0.7).toFixed(1)}s;--s:${(2+ (i%3)).toFixed(0)}px"></i>`).join('')}</div></div></div></section>
  <section class="wrap ag-sec"><div class="ag-tool"><label class="pf-search ag-search">${ico('search')}<input id="aq" type="search" autocomplete="off" placeholder="Search by city, country or territory" aria-label="Search agents"></label><span id="acount" class="ag-count">${n} of ${n}</span></div>
  <div class="agrid ag2-grid" id="agrid" data-stagger>${agentsGridHtml()}</div></section><div style="height:clamp(30px,5vw,70px)"></div>`;
}
function initAgentsPage(){
  const el=$('.ahub');if(!el)return null;
  document.addEventListener('input',iw);document.addEventListener('click',cw);
  function iw(e){if(e.target.id==='aq'){ui.aq=e.target.value;renderAgentsGrid()}}
  function cw(e){const t=e.target.closest('[data-act=agjump],[data-act=agclear]');if(!t)return;
    if(t.dataset.act==='agclear'){ui.aq='';const q=$('#aq');if(q)q.value='';renderAgentsGrid()}
    else{const card=$$('.ag2')[state.agents.findIndex(a=>a.id===t.dataset.i)];if(card)card.scrollIntoView({behavior:REDUCED?'auto':'smooth',block:'center'});if(card){card.classList.add('pulse');setTimeout(()=>card.classList.remove('pulse'),1400)}}}
  return()=>{document.removeEventListener('input',iw);document.removeEventListener('click',cw)};
}
function pageAbout(){
  const TL_ICONS=['leaf','box','route','truck','check','gift','pin'];
  const c=S().company,a=S().agent,F=state.factories,ncty=new Set(F.map(f=>f.code)).size;
  const since=Math.min(...F.map(f=>parseInt(f.since,10)).filter(Boolean),new Date().getFullYear());
  const years=new Date().getFullYear()-since;
  const pillars=[['leaf','Grown with intent','We choose growers who work the same land season after season, not the cheapest lot available that week.',ncty,'countries of origin'],['box','Handled with care','Every factory packs on site, so nothing travels further than it has to before it reaches your agent.',state.products.length,'products packed at source'],['route','Delivered in person','No call centres. Every order is answered by an agent who knows your market by name.',state.agents.length,'authorised agents on call']];
  const letters=[...String(c.name)].map((ch,i)=>ch===' '?'<span class="ab-l sp"></span>':`<span class="ab-l" style="--i:${i}">${esc(ch)}</span>`).join('');
  const heroImgs=[[c.aboutImage||'assets/img/about.jpg',REMOTE.about],['assets/img/story.jpg',REMOTE.story],['assets/img/intro-1.jpg',REMOTE.intro1]];
  const homeAg=state.agents.find(x=>x.name===a.name);
  return `<section class="ab-hero grain"><div class="ab-hero-bg" aria-hidden="true">${heroImgs.map(([u,fb],i)=>`<div class="ab-slide" style="--dl:-${i*7}s"><img src="${esc(u)}" alt="" loading="lazy" data-photo data-fb="${esc(fb)}"></div>`).join('')}</div>${wavesHtml('b')}
  <div class="wrap ab-hero-in"><span class="ab-mark">${c.logo?`<img src="${esc(c.logo)}" alt="">`:LOGO}</span>
  <h1 class="ab-name" aria-label="${esc(c.name)}">${letters}</h1><p class="lead ab-tag">${esc(c.tagline)}</p>
  <ul class="ab-stats">${[[years,'Years growing'],[F.length,'Factories'],[ncty,'Countries'],[state.products.length,'Products']].map(([n,l])=>`<li><b data-count="${n}">${n}</b><span>${l}</span></li>`).join('')}</ul></div></section>
  <section class="wrap ab-story"><div class="ab-story-grid"><div class="ab-drop-wrap" data-reveal><div class="ab-founded"><b data-count="${since}">${since}</b><span>Founded</span><i>${years} yr${years===1?'':'s'} of service</i></div><div class="prose ab-drop">${paras(c.story)}</div></div>
  <div class="ab-pillars" data-stagger>${pillars.map(([i,t,d,n,l],k)=>`<div class="ab-pill"><span class="ab-pill-num">0${k+1}</span><span class="ab-pill-ic">${ico(i)}</span><div class="ab-pill-b"><h3>${t}</h3><p>${d}</p><span class="ab-pill-stat"><b data-count="${n}">${n}</b>${esc(l)}</span></div></div>`).join('')}</div></div></section>
  ${(c.milestones||[]).length?`<section class="ab-time grain"><div class="ab-time-bg" aria-hidden="true"><img src="assets/img/story.jpg" alt="" loading="lazy" data-photo data-fb="${REMOTE.story}"></div>${wavesHtml('t')}<span class="ab-time-yr" aria-hidden="true">${esc(String(since))}</span>
  <div class="wrap ab-time-in"><div class="sec-head" data-reveal><span class="ab-ag-kick" style="color:var(--citrus)">Since ${esc(String(since))}</span><h2 style="color:#fff">How we got here</h2></div>
  <div class="ab-tl" data-reveal><i class="ab-tl-line"></i><i class="ab-tl-fill"></i><ol class="ab-tl-row">${c.milestones.map((m,i)=>`<li class="ab-tl-item" style="--k:${i}"><span class="ab-tl-ic">${ico(TL_ICONS[i%TL_ICONS.length])}</span><span class="ab-tl-dot"></span><b>${esc(m.y)}</b><p>${esc(m.t)}</p></li>`).join('')}</ol></div></div></section>`:''}
  <section class="ab-gal-sec"><div class="wrap"><div class="sec-head" data-reveal><h2>What that looks like</h2><p class="lead" style="max-width:38ch">A few frames from the harvest, the packing line and the road in between.</p></div></div>
  <div class="ab-gal" id="abGal" data-reveal>${[['assets/img/intro-1.jpg',REMOTE.intro1,'Golden wheat, ready for harvest',-6],['assets/img/intro-2.jpg',REMOTE.intro2,'Olives on the branch',4],['assets/img/story.jpg',REMOTE.story,'The fields our growers work',-3],['assets/img/intro-3.jpg',REMOTE.intro3,'Pomegranate after rain',7]].map(([u,fb,cap,rot],i)=>`<figure class="ab-gph" style="--i:${i};--rot:${rot}deg"><span class="ab-gph-num">0${i+1}</span><span class="ab-gph-ph"><img src="${esc(u)}" alt="${esc(cap)}" loading="lazy" data-photo data-fb="${esc(fb)}"></span><figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div></section>
  <section class="wrap ab-quote-sec"><blockquote class="ab-quote" data-reveal><span class="ab-qmark" aria-hidden="true">\u201C</span><p>${esc(c.intro)}</p><footer>${esc(c.name)}</footer></blockquote></section>
  <section class="wrap ab-certs-sec"><div class="sec-head" data-reveal><h2>Trusted across borders</h2><p class="lead" style="max-width:36ch">The certifications our factories hold, so the paperwork is already done before you ask.</p></div>
  <div class="ab-certs" data-stagger>${[...new Set(state.factories.flatMap(f=>f.certs||[]))].map((x,i)=>`<div class="ab-cert" style="--k:${i};--h:${(i*47)%360}"><i class="ab-cert-ring"></i><span class="ab-cert-ic">${ico('check')}</span><b>${esc(x)}</b></div>`).join('')}</div></section>
  <section class="wrap ab-agent-sec"><div class="ab-agent" data-reveal><div class="ab-ag-glow"></div>${homeAg?`<span class="ab-ag-wm">${flag(homeAg.code)}</span>`:''}
  <div class="ab-ag-top">${agentLogo({name:a.name,logo:a.logo})}<div><span class="ab-ag-kick">Authorised agent for our home market</span><h2>${esc(a.name)}</h2><p>${esc(a.tagline)}</p></div>
  <div class="ab-ag-badge"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="abSeal" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs><text><textPath href="#abSeal" startOffset="0">Authorised \u2022 Since ${esc(a.since)} \u2022 </textPath></text></svg><b>${esc(a.license||'')}</b></div></div>
  <div class="ab-ag-body"><div class="prose">${paras(a.story)}</div>
  <div class="ab-ag-side"><dl class="ab-ag-kv"><div><dt>${ico('clock')}Authorised since</dt><dd>${esc(a.since)}</dd></div><div><dt>${ico('route')}Territory</dt><dd>${esc(a.territory)}</dd></div><div><dt>${ico('note')}Licence</dt><dd>${esc(a.license)}</dd></div></dl>
  <a class="btn btn-primary" href="#/contact">${ico('mail')}Send a message</a></div></div>
  ${(a.services||[]).length?`<div class="ab-svc-head">What we do for you</div><ul class="ab-svc" data-stagger>${a.services.map((s,i)=>`<li style="--k:${i}">${ico('check')}<span>${esc(s)}</span></li>`).join('')}</ul>`:''}
  ${(a.stats||[]).length?`<div class="ab-ag-stats">${a.stats.map(s=>`<div><b>${esc(s.n)}</b><span>${esc(s.l)}</span></div>`).join('')}</div>`:''}</div></section>
  <div style="height:clamp(30px,5vw,70px)"></div>`;
}
function initAbout(){
  const el=$('.ab-hero');if(!el)return null;
  const upd=()=>{const r=el.getBoundingClientRect(),h=window.innerHeight,p=Math.max(0,Math.min(1,1-(r.top+r.height*.4)/h));el.style.setProperty('--sc',(1+p*.06).toFixed(3));el.style.setProperty('--py',(p*22).toFixed(1)+'px')};
  let off1=null;
  if(!REDUCED){window.addEventListener('scroll',upd,{passive:true});upd();off1=()=>window.removeEventListener('scroll',upd)}
  const slides=$$('.ab-slide',el);let si=0,t=null;
  if(slides.length){slides[0].classList.add('on');
    if(!REDUCED)t=setInterval(()=>{slides[si].classList.remove('on');si=(si+1)%slides.length;slides[si].classList.add('on')},6500);
  }
  return()=>{if(off1)off1();if(t)clearInterval(t)};
}
function offersHtml(){
  const l=state.announcements.filter(a=>ui.otype==='all'||a.type===ui.otype);
  if(!l.length)return '<div class="empty ol-empty"><span class="pe-ic">'+ico('search')+'</span><h3>Nothing here right now</h3><p>Check back soon, or clear your filter.</p></div>';
  const offers=l.filter(a=>a.type==='offer'),rest=l.filter(a=>a.type!=='offer');
  return (offers.length?`<div class="tk-grid ol-tk">${offers.map(ticketHtml).join('')}</div>`:'')+(rest.length?`<div class="nc-grid ol-nc">${rest.map(noticeHtml).join('')}</div>`:'');
}
function pageContact(){
  const c=S().company,o=ui.otype,wa=S().socials.whatsapp;
  const chip=(v,l)=>`<button class="chip" data-act="otype" data-v="${v}" aria-pressed="${o===v}">${l}</button>`;
  const tiles=[['mail','Email',esc(c.email),`mailto:${esc(c.email)}`],['phone','Phone',esc(c.phone),tel(c.phone)]];
  return `<section class="ct-hero grain"><div class="ct-glow" aria-hidden="true"></div>${wavesHtml('b')}
  <div class="wrap ct-hero-in"><span class="fatlas-kick">${ico('mail')}Usually one working day to reply</span><h1 class="grow">${words('Talk to us')}</h1><p class="lead hero-in" style="--i:8">Ask about prices, samples or becoming an agent. A person on our team reads every message.</p></div></section>
  <section class="wrap ct-loc-wrap"><div class="ct-loc" data-reveal><div class="ct-loc-l"><span class="ct-loc-kick">${ico('pin')}Head office</span><h3>${esc(c.address)}</h3><p>Visitors are welcome by appointment. Write to us first so the right person can meet you.</p></div>
  <div class="ct-loc-r" aria-hidden="true"><i class="ct-loc-ring r1"></i><i class="ct-loc-ring r2"></i><i class="ct-loc-ring r3"></i><span class="ct-loc-pin"><i class="ct-loc-halo"></i>${ico('pin')}</span></div></div></section>
  <section class="wrap ct-body"><div class="contact-grid"><div class="ct-info" data-stagger>
  ${tiles.map(([i,l,v,h],k)=>`<${h?'a href="'+h+'"':'div'} class="ct-tile" style="--k:${k}"><span class="ct-tile-ic">${ico(i)}</span><span><small>${l}</small><b>${v}</b></span></${h?'a':'div'}>`).join('')}
  <div class="ct-tile ct-soc-tile" style="--k:3"><span class="ct-tile-ic">${ico('route')}</span><span><small>Follow us</small><div class="socials ct-soc">${socialsHtml()}</div></span></div>
  </div>
  <div class="formcard" id="formwrap" data-reveal><i class="ct-form-glow"></i><span class="ct-form-ic">${ico('mail')}</span><h2>Send a message</h2><form class="form" id="contactForm" novalidate><div class="frm2"><div class="field"><label for="cn">Your name <i>*</i></label><input id="cn" name="name" required autocomplete="name"></div><div class="field"><label for="ce">Email <i>*</i></label><input id="ce" name="email" type="email" required autocomplete="email"></div></div>
  <div class="field"><label for="ct">Topic</label><select id="ct" name="topic"><option>General question</option><option>Request a quote</option><option>Become an agent</option><option>Visit a factory</option></select></div>
  <div class="field"><label for="cm">Message <i>*</i></label><textarea id="cm" name="message" rows="5" required></textarea></div><div><button class="btn btn-primary" type="submit">${ico('mail')}Send message</button></div></form></div></div></section>
  <section class="sec wrap" id="offers"><div class="sec-head" data-reveal><h2>Offers, notices and notes</h2><div class="chips">${chip('all','All')}${chip('offer','Offers')}${chip('notice','Notices')}${chip('note','Notes')}</div></div><div class="ol-wrap" id="olist">${offersHtml()}</div></section>`;
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
    case'select':ctl=`<select id="${id}" name="${f.k}">${f.opts.map(([v,l])=>`<option value="${esc(v)}"${String(v)===String(val)?' selected':''}>${esc(l)}</option>`).join('')}</select>`;break;
    case'color':ctl=`<input id="${id}" name="${f.k}" type="color" value="${esc(val||'#CFE3B5')}">`;break;
    case'image':ctl=`<div class="imgpick" data-k="${f.k}"><div class="imgprev">${val?`<img src="${esc(val)}" alt="">`:'<span>No image</span>'}</div><div class="imgbtns"><label class="btn btn-ghost btn-sm">Choose image<input type="file" accept="image/*" hidden></label><button type="button" class="btn btn-ghost btn-sm" data-act="img-clear">Remove</button></div></div>`;break;
    default:ctl=`<input id="${id}" name="${f.k}" type="${f.t||'text'}" value="${esc(val)}"${f.step?` step="${f.step}"`:''}${f.min!=null?` min="${f.min}"`:''}${f.max!=null?` max="${f.max}"`:''}${f.ph?` placeholder="${esc(f.ph)}"`:''}${f.list?` list="dl_${id}"`:''}${f.req?' required':''}>${f.list?`<datalist id="dl_${id}">${f.list.map(o=>`<option value="${esc(o)}">`).join('')}</datalist>`:''}`;
  }
  return `<div class="field${f.wide?' wide':''}">${label}${ctl}${f.hint?`<small>${esc(f.hint)}</small>`:''}</div>`;
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
    fr.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL(file.type==='image/png'?'image/png':'image/jpeg',.82))};im.onerror=rej;im.src=fr.result};
    fr.onerror=rej;fr.readAsDataURL(file);
  });
}

/* ================= DASHBOARD DATA MODEL ================= */
const countryOpts=()=>Object.entries(COUNTRIES);
const rowHtml=(kind,id,thumb,title,meta,tint)=>`<li class="drow"${tint?` style="--tint:${esc(tint)}"`:''}><div class="dthumb">${thumb}</div><div class="dinfo"><b>${esc(title)}</b><span>${esc(meta)}</span></div><div class="dact"><button class="btn btn-ghost btn-sm" data-act="edit" data-kind="${kind}" data-id="${esc(id)}">Edit</button><button class="btn btn-ghost btn-sm danger" data-act="del" data-kind="${kind}" data-id="${esc(id)}">Delete</button></div></li>`;
const ENT={
  products:{one:'product',title:'Products',apiPath:'/products',items:()=>state.products,label:p=>p.name,
    make:()=>({id:uid('p-'),name:'',category:'Fruit',factoryId:(state.factories[0]||{}).id||'',price:0,unit:'kg',discount:0,short:'',description:'',features:[],packaging:'',shelfLife:'',moq:'',season:'',tint:'#CFE3B5',image:''}),
    fields:()=>[
      {k:'name',l:'Product name',t:'text',req:1},{k:'category',l:'Category',t:'text',req:1,list:[...new Set(state.products.map(p=>p.category))]},
      {k:'factoryId',l:'Made at factory',t:'select',opts:[['','Not assigned'],...state.factories.map(f=>[f.id,f.country+', '+f.agency])]},
      {k:'unit',l:'Sold by',t:'select',opts:[['kg','Kilogram'],['ton','Tonne'],['L','Litre'],['box','Box']]},
      {k:'price',l:'Price',t:'number',step:'0.01',min:0},{k:'discount',l:'Discount (%)',t:'number',min:0,max:90},
      {k:'short',l:'Short line',t:'text',wide:1},{k:'description',l:'Description',t:'textarea',rows:4,wide:1},
      {k:'features',l:'Highlights (one per line)',t:'lines',rows:4,wide:1},
      {k:'packaging',l:'Packaging',t:'text'},{k:'shelfLife',l:'Shelf life',t:'text'},{k:'moq',l:'Minimum order',t:'text'},{k:'season',l:'Season',t:'text'},
      {k:'tint',l:'Placeholder tint',t:'color'},
      {k:'image',l:'Product photo',t:'image',wide:1,hint:'Upload a photo to preview it here. For the live site, save it as assets/img/products/<id>.jpg.'}],
    row:p=>rowHtml('products',p.id,photo(p.image,p.name,p.imageFb),p.name,`${p.category}, ${money(p.price)} per ${UNIT[p.unit]||p.unit}${p.discount?`, ${p.discount}% off`:''}`,p.tint)},
  factories:{one:'factory',title:'Factories',apiPath:'/factories',items:()=>state.factories,label:f=>f.country,
    make:()=>({id:uid('f-'),country:'',code:'ES',city:'',agency:'',director:'',since:'',employees:'',capacity:'',certs:[],description:'',image:''}),
    fields:()=>[
      {k:'country',l:'Country name',t:'text',req:1},{k:'code',l:'Flag',t:'select',opts:countryOpts()},
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
      {k:'code',l:'Country flag',t:'select',opts:countryOpts()},{k:'city',l:'City',t:'text'},
      {k:'territory',l:'Territory covered',t:'text',wide:1},{k:'phone',l:'Phone',t:'tel',req:1},{k:'whatsapp',l:'WhatsApp number',t:'tel'},
      {k:'email',l:'Email',t:'email'},{k:'hours',l:'Opening hours',t:'text'},{k:'logo',l:'Logo',t:'image',wide:1}],
    row:a=>rowHtml('agents',a.id,flag(a.code),a.name,`${a.city}, ${a.phone}`)},
  notices:{one:'notice',title:'Notices and offers',apiPath:'/announcements',items:()=>state.announcements,label:a=>a.title,
    make:()=>({id:uid('n-'),type:'offer',title:'',body:'',discount:0,code:'',until:''}),
    fields:()=>[
      {k:'type',l:'Type',t:'select',opts:[['offer','Offer or discount'],['notice','Notice'],['note','Note']]},{k:'discount',l:'Discount (%)',t:'number',min:0,max:90},
      {k:'title',l:'Title',t:'text',req:1,wide:1},{k:'body',l:'Details',t:'textarea',rows:4,wide:1},
      {k:'until',l:'Ends on',t:'date',hint:'Leave empty for no end date.'}],
    row:a=>rowHtml('notices',a.id,ico(a.type==='offer'?'bell':'note'),a.title,`${a.type}${a.discount?`, ${a.discount}% off`:''}${a.until?`, ends ${a.until}`:''}`)}
};
const SITE=[
  ['Company',[
    {k:'company.name',l:'Company name',t:'text',req:1},{k:'company.currency',l:'Currency symbol',t:'text'},
    {k:'company.tagline',l:'Home page headline',t:'text',wide:1},{k:'company.intro',l:'Short introduction',t:'textarea',rows:3,wide:1},
    {k:'company.email',l:'Email',t:'email'},{k:'company.phone',l:'Phone',t:'tel'},{k:'company.address',l:'Head office address',t:'text',wide:1},
    {k:'company.logo',l:'Company logo',t:'image',wide:1},{k:'company.hero',l:'Home page cover photo',t:'image',wide:1},{k:'company.aboutImage',l:'About page photo',t:'image',wide:1},
    {k:'company.story',l:'Company story (blank line between paragraphs)',t:'textarea',rows:7,wide:1},
    {k:'company.milestones',l:'Milestones (year | text, one per line)',t:'pairs',keys:['y','t'],rows:6,wide:1}]],
  ['Social links',Object.keys(SOCIAL_LABELS).map(k=>({k:'socials.'+k,l:SOCIAL_LABELS[k],t:'url',ph:'https://'}))],
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
  const c=S().company,F=state.factories,countries=new Set(F.map(f=>f.code)).size;
  return `<section class="login-shell">
  <div class="login-side">
    <a class="login-brand" href="#/" aria-label="${esc(c.name)}, home">${brandHtml(c)}</a>
    <div class="login-side-mid"><span class="login-kick">${ico('lock')}Admin access</span>
    <blockquote class="login-quote">${esc(c.tagline)}</blockquote></div>
    <ul class="login-stats"><li><b>${F.length}</b><span>Factories</span></li><li><b>${countries}</b><span>Countries</span></li><li><b>${state.agents.length}</b><span>Agents</span></li></ul>
  </div>
  <div class="login-formwrap">
    <div class="login-card">
      <div class="login-head"><span class="brand-mark">${c.logo?`<img src="${esc(c.logo)}" alt="">`:LOGO}</span><h1>Welcome back</h1><p class="muted">Sign in to manage products, factories and offers.</p></div>
      <form id="loginForm" novalidate autocomplete="on">
        <label class="lf-field"><span>Email</span><input type="email" name="email" autocomplete="username" autofocus required placeholder="you@company.com"></label>
        <label class="lf-field"><span>Password</span><div class="lf-passwrap"><input type="password" name="password" autocomplete="current-password" required placeholder="Your password"><button type="button" class="lf-eye" data-act="togglepass" aria-label="Show password">${ico('eye')}</button></div></label>
        <div class="lf-row"><label class="lf-remember"><input type="checkbox" name="remember" checked><span>Remember me</span></label><a class="lf-forgot" href="mailto:${esc(c.email)}">Forgot password?</a></div>
        <button class="btn btn-primary lf-submit" type="submit"><span>Sign in</span>${ico('arrow')}</button>
      </form>
      <p class="lf-note">${ico('note')}Signed in with a token from the API. No cookies, no third parties.</p>
      <a class="login-back" href="#/">${ico('left')}Back to the site</a>
    </div>
  </div>
  </section>`;
}

/* ================= DASHBOARD PAGES ================= */
const DTABS=[['overview','Overview'],['products','Products'],['factories','Factories'],['agents','Agents'],['notices','Notices and offers'],['site','Site and profile']];
function dashBody(tab){
  if(ENT[tab]){
    const E=ENT[tab],items=E.items();
    return `<div class="dhead"><h2>${E.title}</h2><button class="btn btn-primary" data-act="add" data-kind="${tab}">${ico('plus')}Add ${E.one}</button></div><ul class="dlist">${items.length?items.map(E.row).join(''):`<li class="empty">Nothing here yet. Add your first ${E.one}.</li>`}</ul>`;
  }
  if(tab==='site'){
    const s=S();formCtx={img:{}};SITE_FIELDS.filter(f=>f.t==='image').forEach(f=>formCtx.img[f.k]=getPath(s,f.k)||'');
    return `<div class="dhead"><h2>Site and profile</h2></div><form id="siteForm" novalidate>${SITE.map(([t,fs])=>`<div class="dpanel"><h3>${t}</h3><div class="fgrid2">${fs.map(f=>fieldHtml(f,getPath(s,f.k))).join('')}</div></div>`).join('')}<div class="savebar"><button class="btn btn-primary" type="submit">Save changes</button></div></form>`;
  }
  const cards=[['products','Products',state.products.length],['factories','Factories',state.factories.length],['agents','Agents',state.agents.length],['notices','Notices and offers',state.announcements.length]];
  return `<div class="dhead"><h2>Overview</h2></div><div class="dcards">${cards.map(([t,l,n])=>`<a class="dcard" href="#/dashboard/${t}"><b>${n}</b><span>${l}</span></a>`).join('')}</div>
  <div class="dpanel"><h3>Quick actions</h3><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" data-act="add" data-kind="products">${ico('plus')}Product</button><button class="btn btn-ghost btn-sm" data-act="add" data-kind="factories">${ico('plus')}Factory</button><button class="btn btn-ghost btn-sm" data-act="add" data-kind="agents">${ico('plus')}Agent</button><button class="btn btn-ghost btn-sm" data-act="add" data-kind="notices">${ico('plus')}Notice</button></div></div>`;
}
function pageDashboard(arg){
  const tab=DTABS.some(t=>t[0]===arg)?arg:'overview';current.arg=tab;
  return `<div class="wrap dash"><aside class="dside"><h1>Dashboard</h1><nav class="dtabs" aria-label="Dashboard">${DTABS.map(([k,l])=>`<a href="#/dashboard/${k}"${k===tab?' aria-current="page"':''}>${l}</a>`).join('')}</nav><div class="dside-foot"><p class="dnote">Changes save straight to the database.</p><button class="btn btn-ghost btn-sm dlogout" type="button" data-act="logout">${ico('logout')}Log out</button></div></aside><section class="dmain" id="dmain">${dashBody(tab)}</section></div>`;
}
function rerenderDash(){const m=$('#dmain');if(m){m.innerHTML=dashBody(current.arg)}}
function openEntityForm(kind,id){
  const E=ENT[kind],cur=id?E.items().find(x=>x.id===id):null,vals=cur?clone(cur):E.make(),fields=E.fields();
  formCtx={img:{}};fields.filter(f=>f.t==='image').forEach(f=>formCtx.img[f.k]=vals[f.k]||'');
  openSheet(`<form class="fpanel" data-form="${kind}" data-id="${esc(id||'')}" novalidate><button type="button" class="x" data-act="close" aria-label="Close">${ico('close')}</button><h2>${cur?'Edit':'Add'} ${E.one}</h2><div class="fbody2">${fields.map(f=>fieldHtml(f,vals[f.k])).join('')}</div><footer><button type="button" class="btn btn-ghost" data-act="close">Cancel</button><button class="btn btn-primary" type="submit">Save ${E.one}</button></footer></form>`,{cls:'wide'});
}

/* ================= ROUTER ================= */
const PAGES={home:pageHome,products:pageProducts,factories:a=>a?pageFactory(a):pageFactories(),agents:pageAgents,about:pageAbout,contact:pageContact,dashboard:a=>isAdmin()?pageDashboard(a):pageLogin()};
const TITLES={home:'',products:'Products',factories:'Factories',agents:'Agents',about:'About',contact:'Contact',dashboard:'Dashboard'};
const parseRoute=()=>location.hash.replace(/^#\/?/,'').split('?')[0].split('/').filter(Boolean).map(decodeURIComponent);
function route(first){
  const parts=parseRoute(),page=PAGES[parts[0]]?parts[0]:'home',arg=parts[1];
  if(!first&&page==='products'&&current.page==='products'){if(arg)openProduct(arg);else closeSheet();return}
  if(!first&&page==='dashboard'&&current.page==='dashboard'){closeSheet();current.arg=arg;$('#main').innerHTML=isAdmin()?pageDashboard(arg):pageLogin();setNav(page);window.scrollTo(0,0);return}
  const main=$('#main'),render=()=>{
    if(cleanup){cleanup();cleanup=null}
    closeSheet();document.body.classList.remove('menu-open');
    current={page,arg};main.innerHTML=PAGES[page](arg);
    document.body.classList.toggle('hide-foot',page==='dashboard');document.body.classList.toggle('on-hero',page==='home');
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
    case'yes':{const fn=pendingYes;pendingYes=null;closeSheet();if(fn)fn();break}
    case'theme':toggleTheme(t);break;
    case'top':window.scrollTo({top:0,behavior:REDUCED?'auto':'smooth'});break;
    case'menu':{const o=document.body.classList.toggle('menu-open');t.setAttribute('aria-expanded',String(o));break}
    case'togglepass':{const wrap=t.closest('.lf-passwrap'),inp=wrap&&wrap.querySelector('input');if(inp){const show=inp.type==='password';inp.type=show?'text':'password';t.innerHTML=show?ico('eyeoff'):ico('eye');t.setAttribute('aria-label',show?'Hide password':'Show password')}break}
    case'logout':logout();break;
    case'fq':{const it=t.closest('.fq'),o=!it.classList.contains('open');$$('.fq.open').forEach(x=>{x.classList.remove('open');const h=$('.fq-h',x);if(h)h.setAttribute('aria-expanded','false')});if(o){it.classList.add('open');t.setAttribute('aria-expanded','true')}break}
    case'fqtab':{$$('#faqTabs .chip').forEach(b=>b.setAttribute('aria-pressed',String(b===t)));let first=true;$$('#fqs .fq').forEach(x=>{const show=d.v==='All'||x.dataset.c===d.v;x.classList.toggle('hide',!show);if(show&&first&&!x.classList.contains('open')){$$('#fqs .fq.open').forEach(y=>{y.classList.remove('open');const h=$('.fq-h',y);if(h)h.setAttribute('aria-expanded','false')})}if(show)first=false});break}
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
    case'add':openEntityForm(d.kind);break;
    case'edit':openEntityForm(d.kind,d.id);break;
    case'del':{const E=ENT[d.kind],it=E.items().find(x=>x.id===d.id);if(!it)break;confirmSheet('Delete \u201C'+E.label(it)+'\u201D?','This can\u2019t be undone.',()=>{
      apiFetch(`${E.apiPath}/${d.id}`,{method:'DELETE'}).then(()=>{
        const arr=E.items();arr.splice(arr.findIndex(x=>x.id===d.id),1);
        renderChrome();rerenderDash();toast('Deleted');
      }).catch(err=>toast(err.network?'Could not reach the server':'Could not delete. Try again.'));
    });break}
    case'img-clear':{const box=t.closest('.imgpick');if(box){formCtx.img[box.dataset.k]='';$('.imgprev',box).innerHTML='<span>No image</span>'}break}
    case'retry':location.reload();break;
  }
});
document.addEventListener('input',e=>{if(e.target.id==='q'){ui.q=e.target.value;renderGrid()}});
document.addEventListener('change',e=>{
  if(e.target.id==='psort'){ui.sort=e.target.value;renderGrid();return}
  const inp=e.target;if(inp.type!=='file')return;
  const box=inp.closest('.imgpick'),file=inp.files&&inp.files[0];if(!box||!file)return;
  const k=box.dataset.k,max=/logo/.test(k)?420:/hero|aboutImage/.test(k)?1600:1000;
  readImage(file,max).then(url=>{formCtx.img[k]=url;$('.imgprev',box).innerHTML=`<img src="${esc(url)}" alt="">`}).catch(()=>toast('That image could not be read'));
});
document.addEventListener('submit',e=>{
  const form=e.target;e.preventDefault();
  if(form.id==='loginForm'){
    const d=Object.fromEntries(new FormData(form)),btn=$('.lf-submit',form);
    if(btn)btn.disabled=true;
    apiFetch('/login',{method:'POST',json:{email:d.email,password:d.password}}).then(res=>{
      saveToken(res.token,!!d.remember);
      document.body.classList.add('hide-foot');
      $('#main').innerHTML=pageDashboard(current.arg);
      window.scrollTo(0,0);
      toast('Welcome back');
    }).catch(err=>{
      const card=form.closest('.login-card');
      if(card){card.classList.remove('shake');void card.offsetWidth;card.classList.add('shake')}
      toast(err.network?'Could not reach the server':'Email or password is incorrect');
    }).finally(()=>{if(btn)btn.disabled=false});
    return;
  }
  if(form.id==='contactForm'){
    const d=Object.fromEntries(new FormData(form));
    if(!d.name.trim()||!/^\S+@\S+\.\S+$/.test(d.email||'')||!d.message.trim()){toast('Please fill in your name, a valid email and a message');return}
    const c=S().company,url=`mailto:${c.email}?subject=${encodeURIComponent(d.topic+': '+d.name)}&body=${encodeURIComponent(d.message+'\n\n'+d.name+'\n'+d.email)}`;
    $('#formwrap').innerHTML=`<div class="thanks"><span class="o-ico">${ico('check')}</span><h2 style="margin-bottom:10px">Thank you, ${esc(d.name.split(' ')[0])}</h2><p class="muted">Your email app should open with the message ready to send. If it doesn\u2019t, write to <a class="link" href="mailto:${esc(c.email)}">${esc(c.email)}</a>.</p></div>`;
    window.location.href=url;return;
  }
  if(form.id==='siteForm'){
    const v=collect(form,SITE_FIELDS,formCtx);
    if(!v['company.name']){toast('Company name is required');return}
    const payload={company:{},socials:{},agent:{}};
    SITE_FIELDS.forEach(f=>setPath(payload,f.k,v[f.k]));
    const btn=form.querySelector('button[type=submit]');if(btn)btn.disabled=true;
    apiFetch('/settings',{method:'PUT',json:payload}).then(res=>{
      state.settings=res;renderChrome();toast('Site settings saved');
    }).catch(err=>toast(err.network?'Could not reach the server':'Could not save changes')).finally(()=>{if(btn)btn.disabled=false});
    return;
  }
  if(form.dataset.form){
    const kind=form.dataset.form,id=form.dataset.id,E=ENT[kind],fields=E.fields(),v=collect(form,fields,formCtx);
    if(kind==='factories'&&!v.country)v.country=COUNTRIES[v.code]||'';
    const bad=fields.find(f=>f.req&&!v[f.k]);
    if(bad){toast(bad.l+' is required');const el=form.querySelector(`[name="${bad.k}"]`);if(el)el.focus();return}
    const payload=Object.assign({},v);
    if(!id)payload.slug=E.make().id;
    const path=id?`${E.apiPath}/${id}`:E.apiPath,method=id?'PUT':'POST';
    const btn=form.querySelector('button[type=submit]');if(btn)btn.disabled=true;
    apiFetch(path,{method,json:payload}).then(res=>{
      const item=res.data,list=E.items();
      if(id){const i=list.findIndex(x=>x.id===id);list[i]=item}else list.push(item);
      closeSheet();renderChrome();rerenderDash();toast(id?'Changes saved':E.one.charAt(0).toUpperCase()+E.one.slice(1)+' added');
    }).catch(err=>{
      toast(err.network?'Could not reach the server':(err.data&&err.data.message)||'Could not save changes');
    }).finally(()=>{if(btn)btn.disabled=false});
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
function bootError(){
  $('#main').innerHTML=`<div class="wrap" style="min-height:60vh;display:grid;place-items:center;text-align:center;gap:18px"><div><h2 style="margin-bottom:10px">Can’t reach the server</h2><p class="lead">Make sure the Laravel backend is running, then try again.</p></div><button class="btn btn-primary" data-act="retry">Try again</button></div>`;
}
async function boot(){
  $('#main').innerHTML=`<div class="wrap" style="min-height:60vh;display:grid;place-items:center;text-align:center"><p class="lead">Loading…</p></div>`;
  try{
    const [settings,factories,products,agents,announcements]=await Promise.all([
      apiFetch('/settings'),apiFetch('/factories'),apiFetch('/products'),apiFetch('/agents'),apiFetch('/announcements'),
    ]);
    products.data.forEach(p=>{if(PFB[p.id])p.imageFb=PFB[p.id]});
    state={settings,factories:factories.data,products:products.data,agents:agents.data,announcements:announcements.data};
    initTheme();renderChrome();route(true);
  }catch(e){bootError()}
}

/* ================= INIT ================= */
document.documentElement.classList.add('js');
boot();
})();