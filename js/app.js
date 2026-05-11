// Lightweight scroll-triggered animations (replaces AOS)
document.addEventListener('DOMContentLoaded', () => {
  const nodes = Array.from(document.querySelectorAll('[data-aos]'));
  if (nodes.length === 0) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach(el => el.classList.add('aav-animate'));
    return;
  }

  const opts = { root: null, rootMargin: '0px', threshold: 0.15 };
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const name = el.getAttribute('data-aos') || 'fade-up';
      const delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
      const duration = parseInt(el.getAttribute('data-aos-duration') || '800', 10);
      el.style.setProperty('--aav-duration', `${duration}ms`);
      setTimeout(() => {
        el.classList.add('aav-animate');
      }, delay);
      if (el.getAttribute('data-aos-once') !== 'false') observer.unobserve(el);
    });
  }, opts);

  nodes.forEach(el => {
    const name = el.getAttribute('data-aos') || 'fade-up';
    el.classList.add('aav-pre', `aav-${name}`);
    io.observe(el);
  });
});