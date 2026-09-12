/**
 * navbar.js
 * Handles:
 *  - Mobile hamburger menu toggle
 *  - Active nav link highlight via IntersectionObserver
 *  - Header shrink on scroll
 *
 * Rocket Rebar Service
 */

'use strict';

function initNavbar() {
  const header     = document.getElementById('site-header');
  const toggle     = document.getElementById('menu-toggle');
  const nav        = document.getElementById('main-nav');
  const navLinks   = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
  const sections   = [...document.querySelectorAll('main section[id]')];

  if (!header || !toggle || !nav) return;

  /* ── Mobile menu toggle ── */
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !header.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ── Header compact on scroll ── */
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Active link via IntersectionObserver ── */
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
  );

  sections.forEach(s => observer.observe(s));
}

/* ── Wait for components if needed ── */
if (document.getElementById('main-nav')) {
  initNavbar();
} else {
  document.addEventListener('componentsLoaded', initNavbar, { once: true });
}
