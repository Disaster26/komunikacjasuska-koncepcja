(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

/* menu */
var hd=$('#hd'),bg=$('#burger');
bg.addEventListener('click',function(){var o=hd.classList.toggle('otw');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');document.body.style.overflow=o?'hidden':''});
$$('#nav a').forEach(function(a){a.addEventListener('click',function(){hd.classList.remove('otw');bg.setAttribute('aria-expanded','false');document.body.style.overflow='';$$('#nav a').forEach(function(x){x.classList.toggle('akt',x===a)})})});
$('#rok').textContent=new Date().getFullYear();

/* dane: wyłącznie z obecnej strony komunikacjasuska.pl (stan 21.11.2026) */
var T={
 zk:{def:'Sucha Beskidzka (PKP)',nazwa:'Zawoja – Kraków',krotko:'X-Bus',przewoznik:'X-Bus',od:'04.12.2023',czas:'2:10 h',
  dni:{pt:'Pon–pt',sn:'Sob–nd'},
  przez:['Zawoja','Skawica','Białka','Maków Podhalański','Sucha Beskidzka','Zembrzyce','Budzów','Baczyn','Palcza','Harbutowice','Biertowice','Krzywaczka','Głogoczów','Mogilany','Gaj','Libertów','Kraków'],
  p:{
   'Zawoja Markowa':{pt:'6:00 7:20 9:20 10:00 12:00 14:00 17:25',sn:'6:00 7:00 10:00 12:00 14:00 16:00 18:10'},
   'Zawoja Policzne':{pt:'8:00 11:20 13:20 15:30 17:15',sn:'6:00 8:00 10:00 11:00 14:00 15:00 17:00 18:00'},
   'Zawoja Widły':{pt:'4:05 5:25 6:05 7:25 8:05 9:25 10:05 11:25 12:05 13:25 14:05 15:35 17:30',sn:'4:05 6:05 7:05 8:05 10:05 11:05 12:05 14:05 15:05 16:05 17:05 18:15'},
   'Maków Podhalański (Osiedle)':{pt:'4:17 4:37 5:57 6:37 7:57 8:37 9:57 10:37 11:57 12:37 13:57 14:37 16:07 18:02',sn:'4:37 6:37 7:37 8:37 10:37 11:37 12:37 14:37 15:37 16:37 17:37 18:47'},
   'Sucha Beskidzka (PKP)':{pt:'4:30 4:50 6:10 6:50 8:10 8:50 10:10 10:50 12:10 12:50 14:10 14:50 16:20 18:15',sn:'4:50 6:50 7:50 8:50 10:50 11:50 12:50 14:50 15:50 16:50 17:50 19:00'}
  },leg:''},
 kz:{nazwa:'Kraków – Zawoja',krotko:'X-Bus',przewoznik:'X-Bus',od:'15.01.2022',czas:'2:10 h',
  dni:{pt:'Pon–pt',sn:'Sob–nd'},
  przez:['Kraków (MDA)','Libertów','Gaj','Mogilany','Głogoczów','Krzywaczka','Biertowice','Sułkowice','Harbutowice','Palcza','Baczyn','Budzów','Zembrzyce','Maków Podhalański','Białka','Skawica','Zawoja'],
  p:{
   'Kraków (MDA)':{pt:'6:15M 7:00P 8:55M 10:15P 10:55M 12:00P 12:45M 14:05P 15:00M 16:00P 16:45M 18:15P 19:00M 20:15MP',sn:'7:00P 8:30M 9:30P 10:30M 12:30P 14:05M 15:00P 16:30P 17:30M 18:30P 19:30M 21:00MP'},
   'Sucha Beskidzka (PKP)':{pt:'7:35M 8:20P 10:15M 11:35P 12:15M 13:20P 14:05M 15:25P 16:20M 17:20P 18:05M 19:35P 20:20M 21:35MP',sn:'8:20P 9:50M 10:50P 11:50M 13:50P 15:25M 16:20P 17:50P 18:50M 19:50P 20:50M 22:20MP'},
   'Maków Podhalański (Rynek)':{pt:'7:47M 8:32P 10:27M 11:47P 12:27M 13:32P 14:17M 15:37P 16:32M 17:32P 18:17M 19:47P 20:32M 21:47MP',sn:'8:32P 10:02M 11:02P 12:02M 14:02P 15:37M 16:32P 18:02P 19:02M 20:02P 21:02M 22:32MP'}
  },leg:'<b>M</b> kurs do Zawoi Markowej, <b>P</b> kurs do Zawoi Policzne.'},
 jk:{nazwa:'Jordanów – Kraków',krotko:'3 przewoźników',przewoznik:'Euro-Bus (kursy firm A, E, M)',od:'01.07.2022',czas:'1:25–1:29 h',
  dni:{pt:'Pon–pt',sob:'Sobota',nd:'Niedziela'},
  przez:['Jordanów','Łętownia','Tokarnia','Krzczonów','Pcim','Stróża','Myślenice','Jawornik','Krzyszkowice','Głogoczów','Mogilany','Gaj','Libertów','Kraków'],
  p:{
   'Jordanów (do Krakowa)':{pt:'4:25E 5:00M 5:30A 5:55A 6:20E 7:00M 7:25E 7:55E 8:30M 9:00A 10:25E 11:05A 12:05M 12:50E 13:25M 14:10A 15:00M 15:20E 15:55A 16:45E 17:50M',sob:'5:00M 5:55A 6:25E 7:25E 8:05M 8:45E 10:00E 11:05A 12:05M 12:50E 15:20E 15:55A 16:45E 17:50M',nd:'5:00M 6:25E 7:25E 10:25E 12:50E 14:45A 15:20E 16:30E 17:00M 17:50E 18:30A'},
   'Kraków (do Jordanowa)':{pt:'6:00E 6:30M 7:20A 8:30E 9:00A 10:10E 10:45M 11:25M 12:00A 12:30E 13:00E 13:50A 14:25M 15:05E 15:40M 16:25A 17:00M 17:30E 18:05A 18:40E 19:45M',sob:'6:30M 7:40A 8:00E 9:40E 10:20E 11:00M 12:40E 13:50A 14:25M 14:50E 17:00E 18:05A 18:40E 19:45M',nd:'6:30M 8:00E 10:20E 12:40E 14:50E 16:30A 17:00E 18:40E 19:25M 19:50E 20:10A'}
  },leg:'<b>A</b> Przewóz Osób Angelika Kęder, <b>E</b> Elżbieta Działowy Przewóz Osób, <b>M</b> Przewóz Osób Małgorzata Działowy.'},
 kr:{nazwa:'Zawoja Markowa – Krowiarki',krotko:'Wójtowicz Travel',przewoznik:'Wójtowicz Travel',od:'01.04.2024',czas:'0:17 h',sezon:[4,10],
  dni:{c:'Codziennie'},
  przez:['Zawoja Markowa','Zawoja Policzne','Zawoja Lajkonik','Zawoja Podryżowana','Zawoja Widły','Zawoja Wilczna','Zawoja Składy','Zawoja Barańcowa','Zawoja Krowiarki'],
  p:{
   'Zawoja Markowa (do Krowiarek)':{c:'8:20 9:00 10:00 11:00 15:30 16:10 16:50 17:30'},
   'Zawoja Krowiarki (do Markowej)':{c:'8:40 9:30 10:30 11:30 15:50 16:30 17:10 17:50'}
  },leg:'Kursy od 1 kwietnia do 31 października, codziennie. Nie kursuje w Wielki Piątek, Wielką Sobotę, Niedzielę i Poniedziałek Wielkanocny.'}
};
var KOL=['zk','kz','jk','kr'];
var stan={t:'zk',p:null,d:null};

function dzisTyp(t){
 var d=new Date().getDay();var k=Object.keys(T[t].dni);
 if(k.indexOf('c')>=0)return 'c';
 if(k.indexOf('sn')>=0)return (d===0||d===6)?'sn':'pt';
 return d===0?'nd':(d===6?'sob':'pt');
}
function parse(s){return s.split(' ').map(function(x){var m=x.match(/^(\d{1,2}):(\d{2})(.*)$/);return {h:+m[1],m:m[2],z:m[3]||'',min:+m[1]*60+ +m[2]}})}
function e(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

function rysujWybor(){
 $('#wyborTrasy').innerHTML=KOL.map(function(k){return '<button type="button" data-t="'+k+'" aria-pressed="'+(k===stan.t)+'">'+e(T[k].nazwa)+'<small>'+e(T[k].krotko)+'</small></button>'}).join('');
 $$('#wyborTrasy button').forEach(function(b){b.addEventListener('click',function(){ustaw(b.dataset.t)})});
}
function ustaw(t){stan.t=t;stan.p=T[t].def||Object.keys(T[t].p)[0];stan.d=dzisTyp(t);rysujWybor();rysuj()}

function rysuj(){
 var r=T[stan.t];
 var sel=$('#przystanek');
 sel.innerHTML=Object.keys(r.p).map(function(p){return '<option'+(p===stan.p?' selected':'')+'>'+e(p)+'</option>'}).join('');
 $('#dni').innerHTML=Object.keys(r.dni).map(function(k){return '<button type="button" data-d="'+k+'" aria-pressed="'+(k===stan.d)+'">'+r.dni[k]+'</button>'}).join('');
 $$('#dni button').forEach(function(b){b.addEventListener('click',function(){stan.d=b.dataset.d;rysuj()})});
 var lista=parse(r.p[stan.p][stan.d]);
 var teraz=new Date(),nm=teraz.getHours()*60+teraz.getMinutes(),mies=teraz.getMonth()+1;
 var poSezonie=r.sezon&&(mies<r.sezon[0]||mies>r.sezon[1]);
 var dzis=stan.d===dzisTyp(stan.t)&&!poSezonie;
 var nast=null;
 if(dzis){for(var i=0;i<lista.length;i++){if(lista[i].min>=nm){nast=lista[i];break}}}
 var nb=$('#najblizszy');
 if(poSezonie)nb.innerHTML='Poza sezonem <span>kursy od 1 kwietnia do 31 października</span>';
 else if(nast){var za=nast.min-nm;nb.innerHTML='Najbliższy odjazd '+nast.h+':'+nast.m+' <span>za '+(za<60?za+' min':Math.floor(za/60)+' h '+(za%60)+' min')+'</span>'}
 else if(dzis)nb.innerHTML='Dziś nie ma już odjazdów <span>pierwszy kurs jutro rano</span>';
 else nb.innerHTML='';
 var godz={};lista.forEach(function(x){(godz[x.h]=godz[x.h]||[]).push(x)});
 var h='<div class="naglowek"><b>'+e(stan.p)+'</b><span>'+r.dni[stan.d]+'</span></div>';
 Object.keys(godz).map(Number).sort(function(a,b){return a-b}).forEach(function(g){
  h+='<div class="wiersz"><div class="g">'+g+'</div><div class="m">'+godz[g].map(function(x){return '<span'+(x===nast?' class="nast"':'')+' aria-label="'+g+':'+x.m+'">'+x.m+(x.z?'<sup>'+e(x.z)+'</sup>':'')+'</span>'}).join('')+'</div></div>';
 });
 if(!lista.length)h+='<div class="pusto">Brak kursów w tym dniu.</div>';
 $('#tabl').innerHTML=h;
 $('#legenda').innerHTML=(r.leg?r.leg+' ':'')+'Rozkład ważny od '+r.od+' r.';
 var pr=r.przez;
 $('#bok').innerHTML='<h3>'+e(r.nazwa)+'</h3><p class="meta">Przewoźnik: <b>'+e(r.przewoznik)+'</b><br>Czas przejazdu: '+r.czas+'</p><details id="przez"'+(innerWidth>899?' open':'')+'><summary>Trasa przez '+pr.length+' miejscowości</summary><ul class="przyst">'+pr.map(function(p,i){return '<li'+(i===0||i===pr.length-1?' class="kon"':'')+'>'+e(p)+'</li>'}).join('')+'</ul></details><p class="zastrz">Rozkład przygotowany na podstawie informacji od przewoźników, ich stron internetowych i wydanych zezwoleń. Redakcja nie odpowiada za kursy odwołane lub opóźnione.</p>';
}
$('#przystanek').addEventListener('change',function(){stan.p=this.value;rysuj()});
$$('button.poz[data-trasa],.szybkie button').forEach(function(b){b.addEventListener('click',function(){ustaw(b.dataset.trasa);$('#rozklad').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})})});
ustaw('zk');

/* przewoźnicy */
var P=[
 {n:'X-Bus',f:31,l:'Zawoja – Kraków, Żywiec – Kraków, Zawoja, Palcza i Sułkowice – Sucha Beskidzka',z:['ksu-hk33','k1-xbus','xbus-busy']},
 {n:'BUS Krzysztof Janowiec',f:19,l:'Sucha Beskidzka – Jordanów',z:['knt-97264','knt-98394','knt-1tg5']},
 {n:'Euro-Bus',f:14,l:'Jordanów – Kraków',z:['ksu-cs88','ksu-88vx','ksu-eg57']},
 {n:'Beskid Bus',f:26,z:['knt-92913']},
 {n:'Wójtowicz Travel',f:5,l:'Zawoja Markowa – Zawoja Krowiarki',z:['ksu-la81','ksu-gu14']},
 {n:'MasterCar',f:4,z:['kmy-13917','kmy-13916']},
 {n:'Robertur',f:7,z:['ksu-fw77']},
 {n:'Maja Bus',f:7,z:['ksu-at69']},
 {n:'Kasia Bus',f:4,z:['ksu-25gm']},
 {n:'PITBUS',f:4,z:['ksu-ky64']}
];
function poj(n){return n===1?'pojazd':(n%10>=2&&n%10<=4&&(n%100<10||n%100>=20))?'pojazdy':'pojazdów'}
var strL='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M13 4l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>',strP='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>';
$('#karuzela').innerHTML=P.map(function(p,i){
 return '<article class="karta"><div class="zdj"><div class="tor">'+p.z.map(function(z,j){return '<img src="img/'+z+'-600.webp" srcset="img/'+z+'-600.webp 600w, img/'+z+'-1200.webp 1200w" sizes="(max-width:899px) 82vw, 420px" width="600" height="400" loading="lazy" decoding="async" alt="'+e(p.n)+', zdjęcie '+(j+1)+'" data-duze="img/'+z+'-1200.webp">'}).join('')+'</div>'+(p.z.length>1?'<button class="st l" type="button" aria-label="Poprzednie zdjęcie">'+strL+'</button><button class="st p" type="button" aria-label="Następne zdjęcie">'+strP+'</button><span class="lic">1 / '+p.z.length+'</span>':'')+'</div><div class="op"><span class="trasa" aria-hidden="true"><i></i><b></b><i></i><b></b><i></i></span><h3>'+e(p.n)+'</h3><span class="fl">W bazie: <b>'+p.f+'</b> '+poj(p.f)+'</span>'+(p.l?'<span class="lin">'+e(p.l)+'</span>':'')+'</div></article>';
}).join('');
$$('.zdj').forEach(function(z){
 var tor=$('.tor',z),lic=$('.lic',z),n=$$('img',z).length;
 function idx(){return Math.round(tor.scrollLeft/tor.clientWidth)}
 tor.addEventListener('scroll',function(){if(lic)lic.textContent=(idx()+1)+' / '+n},{passive:true});
 $$('.st',z).forEach(function(b){b.addEventListener('click',function(ev){ev.stopPropagation();var k=b.classList.contains('p')?1:-1;var i=(idx()+k+n)%n;tor.scrollTo({left:i*tor.clientWidth,behavior:'smooth'})})});
});
/* karuzela: przeciąganie myszą */
var kar=$('#karuzela'),drag=null,przes=false;
kar.addEventListener('pointerdown',function(ev){if(ev.pointerType!=='mouse'||ev.target.closest('button'))return;var tor=ev.target.closest('.tor');drag={x:ev.clientX,y:ev.clientY,el:tor&&tor.scrollWidth>tor.clientWidth?tor:kar,s:0};drag.s=drag.el.scrollLeft;przes=false});
window.addEventListener('pointermove',function(ev){if(!drag)return;var dx=ev.clientX-drag.x;if(Math.abs(dx)>6){przes=true;kar.classList.add('ciag');drag.el.style.scrollSnapType='none';drag.el.scrollLeft=drag.s-dx}});
window.addEventListener('pointerup',function(){if(!drag)return;var el=drag.el;el.style.scrollSnapType='';kar.classList.remove('ciag');if(el.classList.contains('tor')){var i=Math.round(el.scrollLeft/el.clientWidth);el.scrollTo({left:i*el.clientWidth,behavior:'smooth'})}drag=null;setTimeout(function(){przes=false},0)});
kar.addEventListener('dragstart',function(ev){ev.preventDefault()});
$$('.nawig button').forEach(function(b){b.addEventListener('click',function(){var k=+b.dataset.k;var w=$('.karta',kar).getBoundingClientRect().width+20;kar.scrollBy({left:k*w*(innerWidth>900?2:1),behavior:'smooth'})})});

/* lightbox */
var lb=$('#lb'),li=$('#lb-img'),lp=$('#lb-p'),grupa=[],gi=0,ostatni=null;
function pokaz(){var im=grupa[gi];li.src=im.dataset.duze;li.alt=im.alt;lp.textContent=im.alt.replace(/, zdjęcie \d+$/,'')+(grupa.length>1?'  ·  '+(gi+1)+' / '+grupa.length:'')}
kar.addEventListener('click',function(ev){var im=ev.target.closest('.tor img');if(!im||przes)return;grupa=$$('img',im.parentNode);gi=grupa.indexOf(im);ostatni=im;pokaz();lb.classList.add('otw');document.body.style.overflow='hidden';$('.x',lb).focus()});
function zamknij(){lb.classList.remove('otw');document.body.style.overflow='';li.removeAttribute('src');if(ostatni)ostatni.focus&&ostatni.focus()}
$('.x',lb).addEventListener('click',zamknij);
$('.l',lb).addEventListener('click',function(){gi=(gi-1+grupa.length)%grupa.length;pokaz()});
$('.p',lb).addEventListener('click',function(){gi=(gi+1)%grupa.length;pokaz()});
lb.addEventListener('click',function(ev){if(ev.target===lb)zamknij()});
document.addEventListener('keydown',function(ev){if(!lb.classList.contains('otw'))return;if(ev.key==='Escape')zamknij();if(ev.key==='ArrowLeft')$('.l',lb).click();if(ev.key==='ArrowRight')$('.p',lb).click()});
var sx=null;lb.addEventListener('touchstart',function(ev){sx=ev.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(ev){if(sx===null)return;var dx=ev.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)$(dx<0?'.p':'.l',lb).click();sx=null});

/* formularz pokazowy */
$('#zgl').addEventListener('submit',function(ev){ev.preventDefault();$('#zgl-ok').textContent='To podgląd: na docelowej stronie zgłoszenie trafi prosto na kontakt@komunikacjasuska.pl.'});
})();
