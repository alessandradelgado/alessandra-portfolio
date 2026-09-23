// Subtle motion layer: scroll-reveal for content blocks, and an animated
// count-up for the stat numbers. Both are pure progressive enhancement —
// if this script fails to load, every element is already in its normal,
// fully visible state (see the .reveal rule in styles.css). Both also
// bail out completely when the visitor's system asks for reduced motion.

(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // ---------- Scroll reveal ----------
  if ('IntersectionObserver' in window) {
    var revealTargets = document.querySelectorAll('.work-card, .case-section, .tools-col');

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  // ---------- Animated stat counters ----------
  if ('IntersectionObserver' in window) {
    var statStrips = document.querySelectorAll('.stat-strip');

    function splitTextNode(node) {
      var matches = node.textContent.match(/\d+(?:[.,]\d+)?/g);
      if (!matches) return;
      var frag = document.createDocumentFragment();
      var rest = node.textContent;
      matches.forEach(function (numStr) {
        var idx = rest.indexOf(numStr);
        if (idx > 0) frag.appendChild(document.createTextNode(rest.slice(0, idx)));
        var span = document.createElement('span');
        span.className = 'count-num';
        var normalized = numStr.replace(',', '.');
        span.dataset.target = normalized;
        span.dataset.decimals = normalized.indexOf('.') > -1 ? String(normalized.split('.')[1].length) : '0';
        span.textContent = normalized.indexOf('.') > -1 ? (0).toFixed(span.dataset.decimals) : '0';
        frag.appendChild(span);
        rest = rest.slice(idx + numStr.length);
      });
      if (rest) frag.appendChild(document.createTextNode(rest));
      node.parentNode.replaceChild(frag, node);
    }

    function prepareCounters(strip) {
      var numberEls = strip.querySelectorAll('.stat-number');
      numberEls.forEach(function (el) {
        Array.prototype.slice.call(el.childNodes).forEach(function (node) {
          if (node.nodeType === 3) splitTextNode(node);
        });
      });
    }

    function runCounters(strip) {
      var spans = strip.querySelectorAll('.count-num');
      var duration = 1200;
      var start = null;

      function frame(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        spans.forEach(function (span) {
          var target = parseFloat(span.dataset.target);
          var decimals = parseInt(span.dataset.decimals, 10);
          span.textContent = (target * eased).toFixed(decimals);
        });
        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          spans.forEach(function (span) {
            span.textContent = parseFloat(span.dataset.target).toFixed(parseInt(span.dataset.decimals, 10));
          });
        }
      }
      requestAnimationFrame(frame);
    }

    statStrips.forEach(function (strip) {
      prepareCounters(strip);
    });

    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounters(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0 });

    statStrips.forEach(function (strip) {
      statObserver.observe(strip);
    });
  }
})();
