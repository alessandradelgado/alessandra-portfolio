// Single deliberate motion moment: rotating words in the hero.
// Respects prefers-reduced-motion by simply not rotating (first word stays).

(function () {
  const el = document.getElementById('wordRotator');
  if (!el) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const defaultWords = ['Strategy.', 'Creative.', 'Digital.', 'Growth.'];
  const words = el.dataset.words ? el.dataset.words.split('|') : defaultWords;
  let index = 0;
  const intervalMs = 2200;

  setInterval(() => {
    index = (index + 1) % words.length;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = words[index];
      el.style.opacity = '1';
    }, 220);
  }, intervalMs);

  el.style.transition = 'opacity 0.22s ease';
})();

// Mobile menu toggle: shows/hides the primary nav as a dropdown on narrow screens.
(function () {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close the menu after picking a link, so it doesn't stay open on the next page.
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
