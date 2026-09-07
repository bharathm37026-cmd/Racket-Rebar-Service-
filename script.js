const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
document.querySelector('#year').textContent = new Date().getFullYear();
