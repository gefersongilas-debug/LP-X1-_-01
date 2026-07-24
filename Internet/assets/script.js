const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// Aplica animações de entrada aos principais elementos de toda a página.
const entranceGroups=[
  '.intro-grid > *',
  '.plans-grid > *',
  '.use-grid > *',
  '.reason-list > *',
  '.region-card > *',
  '.benefit-grid > *',
  '.support-grid > *',
  '.final-inner > *',
  '.footer-grid > *',
  '.footer-bottom > *',
  '.section-btn',
  '.centered-note',
  '.center',
  '.legal-note'
];
entranceGroups.forEach(selector=>{
  document.querySelectorAll(selector).forEach((el,index)=>{
    el.classList.add('reveal');
    if(!el.classList.contains('delay-1')&&!el.classList.contains('delay-2')&&!el.classList.contains('delay-3')){
      el.style.setProperty('--reveal-delay',`${Math.min(index*0.07,0.28)}s`);
    }
  });
});
document.querySelectorAll('.intro-grid > :first-child,.sticky-title,.region-content,.support-image').forEach(el=>el.classList.add('from-left'));
document.querySelectorAll('.intro-grid > :last-child,.region-visual,.support-content').forEach(el=>el.classList.add('from-right'));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}),{threshold:.10,rootMargin:'0px 0px -35px 0px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const toast=document.querySelector('.pending-toast');
document.querySelectorAll('[data-pending-link]').forEach(link=>link.addEventListener('click',e=>{
  e.preventDefault();toast.classList.add('show');clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>toast.classList.remove('show'),2800)
}));
window.addEventListener('scroll',()=>document.querySelector('.header').style.boxShadow=window.scrollY>20?'0 12px 35px rgba(0,0,0,.24)':'none');

// Loader rápido com a logo, removido logo após a página estar pronta.
const loader=document.querySelector('.site-loader');
const startedAt=performance.now();
const hideLoader=()=>{
  const elapsed=performance.now()-startedAt;
  const wait=Math.max(0,650-elapsed);
  window.setTimeout(()=>{
    loader?.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
    window.setTimeout(()=>loader?.remove(),500);
  },wait);
};
if(document.readyState==='complete') hideLoader();
else window.addEventListener('load',hideLoader,{once:true});
window.setTimeout(hideLoader,1800);
