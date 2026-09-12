/**
 * components.js
 * Fetches HTML partial files and injects them into placeholder elements.
 * Usage: <div data-component="components/navbar.html"></div>
 *
 * Rocket Rebar Service
 */

'use strict';

/**
 * Load a single component by fetching its HTML partial and injecting into a target element.
 * @param {HTMLElement} el - The placeholder element with data-component attribute.
 */
async function loadComponent(el) {
  const src = el.getAttribute('data-component');
  if (!src) return;

  try {
    const response = await fetch(src);
    if (!response.ok) throw new Error(`HTTP ${response.status} loading "${src}"`);
    const html = await response.text();
    el.outerHTML = html;           // replace placeholder with actual component HTML
  } catch (err) {
    console.error('[components.js]', err);
    el.style.display = 'none';    // hide broken placeholder silently
  }
}

/**
 * Discover all component placeholders and load them in parallel.
 * Dispatches a custom "componentsLoaded" event on document when all are done.
 */
async function loadAllComponents() {
  const placeholders = [...document.querySelectorAll('[data-component]')];
  if (!placeholders.length) return;

  await Promise.all(placeholders.map(loadComponent));

  // Notify the rest of the app that components are in the DOM
  document.dispatchEvent(new CustomEvent('componentsLoaded'));
}

// Kick off immediately (script is deferred in index.html)
loadAllComponents();
