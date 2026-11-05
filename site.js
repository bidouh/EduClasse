(()=>{'use strict';
const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav.addEventListener('click',e=>{if(e.target.closest('a')){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}});
const figures=[...document.querySelectorAll('[data-category]')],status=document.querySelector('.gallery-status');
function filter(category){let count=0;for(const f of figures){f.hidden=category!=='all'&&f.dataset.category!==category;if(!f.hidden)count++;}status.textContent=new Intl.NumberFormat(document.documentElement.lang==='ar'?'ar-MA':'fr-FR').format(count)+' '+status.dataset.countLabel;}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(other=>other.setAttribute('aria-pressed',String(other===b)));filter(b.dataset.filter);}));filter('all');
const dialog=document.querySelector('.lightbox'),image=dialog.querySelector('img'),title=document.getElementById('lightbox-title');let previous=null;
document.querySelectorAll('[data-image]').forEach(b=>b.addEventListener('click',()=>{previous=b;image.src=b.dataset.image;image.alt=b.dataset.caption;title.textContent=b.dataset.caption;dialog.showModal();document.body.classList.add('modal-open');}));
const close=()=>dialog.close();dialog.querySelector('[data-close]').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');image.removeAttribute('src');previous?.focus({preventScroll:true});});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');menu.focus();}});
})();
