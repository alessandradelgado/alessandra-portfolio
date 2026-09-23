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
