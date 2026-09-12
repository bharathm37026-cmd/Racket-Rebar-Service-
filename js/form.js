/**
 * form.js
 * Handles the quote form submission → mailto: handler.
 * Form is now inline in index.html so we init on DOMContentLoaded.
 *
 * Rocket Rebar Service
 */

'use strict';

function initForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get('name') || '';
    const company = data.get('company') || '';
    const email = data.get('email') || '';
    const phone = data.get('phone') || '';
    const service = data.get('service') || '';
    const details = data.get('details') || '';

    const subject = encodeURIComponent(
      `New Rebar Quote Request – ${name}${company ? ` (${company})` : ''}`
    );
    const body = encodeURIComponent(
      `Name:    ${name}\n` +
      `Company: ${company}\n` +
      `Email:   ${email}\n` +
      `Phone:   ${phone}\n` +
      `Service: ${service}\n\n` +
      `Project Details:\n${details}`
    );

    window.location.href =
      `mailto:Rocketrebarservice@outlook.com?subject=${subject}&body=${body}`;
  });
}

/* Form is inline — init on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', initForm);
