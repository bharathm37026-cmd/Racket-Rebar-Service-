/**
 * scroll.js
 * Handles:
 *  - Back-to-top button visibility & smooth scroll
 *  - Header compact state on scroll
 *  - Dynamic year in footer
 *
 * All content is now inline in index.html, so we run on DOMContentLoaded.
 * Only the navbar is loaded via fetch (handled by navbar.js).
 *
 * Rocket Rebar Service
 */

'use strict';

/* ── Back to top ── */
function initBackToTop() {
  const btn = document.querySelector('.back-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Footer year ── */
function setYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Init — runs as soon as DOM is ready (no fetch wait needed) ── */
document.addEventListener('DOMContentLoaded', () => {
  initBackToTop();
  setYear();
});
