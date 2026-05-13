// Lightweight scroll-triggered animations (replaces AOS)
document.addEventListener('DOMContentLoaded', () => {
  const nodes = Array.from(document.querySelectorAll('[data-aos]'));
  const whatsappForm = document.querySelector('[data-whatsapp-form]');

  if (whatsappForm) {
    whatsappForm.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(whatsappForm);
      const nombre = String(data.get('nombre') || '').trim();
      const contacto = String(data.get('contacto') || '').trim();
      const tipo = String(data.get('tipo') || '').trim();
      const mensaje = String(data.get('mensaje') || '').trim();
      const texto = [
        'Hola AAV Studio, quiero hacer una consulta.',
        '',
        `Nombre: ${nombre}`,
        `Contacto: ${contacto}`,
        `Tipo de proyecto: ${tipo}`,
        '',
        `Mensaje: ${mensaje}`,
      ].join('\n');
      window.open(`https://wa.me/5493888675361?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
    });
  }

  if (nodes.length === 0) return;

  nodes.forEach(el => {
    const name = el.getAttribute('data-aos') || 'fade-up';
    el.classList.add('aav-pre', `aav-${name}`);
  });

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach(el => el.classList.add('aav-animate'));
    return;
  }

  const opts = { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.08 };
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
      const duration = parseInt(el.getAttribute('data-aos-duration') || '800', 10);
      el.style.setProperty('--aav-duration', `${duration}ms`);
      setTimeout(() => {
        requestAnimationFrame(() => el.classList.add('aav-animate'));
      }, delay);
      if (el.getAttribute('data-aos-once') !== 'false') observer.unobserve(el);
    });
  }, opts);

  requestAnimationFrame(() => {
    nodes.forEach(el => io.observe(el));
  });
});
