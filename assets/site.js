'use strict';
const menu=document.querySelector('.menu');
const navigation=document.querySelector('#navigation');
function closeMenu(){menu?.setAttribute('aria-expanded','false');navigation?.classList.remove('is-open');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
navigation?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});
const recommendations={dev:'پیشنهاد: Click Pro؛ نیاز ابزار یا API موردنظرتان را پیش از خرید با پشتیبانی مطرح کنید.',daily:'پیشنهاد: Click Plus؛ حجم و مدت مناسب استفاده روزمره را با راهنمایی ادمین انتخاب کنید.',team:'پیشنهاد: بررسی سرویس تیمی Click Pro؛ تعداد اعضا و فهرست ابزارهای موردنیاز را برای پشتیبانی بفرستید.'};
document.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-choice]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));document.querySelector('#recommendation').textContent=recommendations[button.dataset.choice];}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));let count=0;document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});document.querySelector('#filter-result').textContent=count.toLocaleString('fa-IR')+' راهنما';}));

const currentFile=location.pathname.split("/").pop()||"index.html";
document.querySelectorAll("#navigation a").forEach(a=>{const u=new URL(a.href);if(u.origin===location.origin&&!u.hash&&u.pathname.split("/").pop()===currentFile)a.setAttribute("aria-current","page");});
document.querySelectorAll('.motion-toggle').forEach(button=>button.addEventListener('click',()=>{const paused=button.closest('.flag-marquee').classList.toggle('is-paused');button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'ادامه حرکت':'توقف حرکت';}));
function updateActiveNavigation(){const here=new URL(location.href);document.querySelectorAll('#navigation a').forEach(a=>{const u=new URL(a.href);const sameFile=(u.pathname.split('/').pop()||'index.html')===(here.pathname.split('/').pop()||'index.html');const active=u.origin===here.origin&&sameFile&&u.hash===here.hash;if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
window.addEventListener('hashchange',updateActiveNavigation);updateActiveNavigation();
