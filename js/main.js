/* =============================================
   NAV — scroll state
============================================= */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 6);
  }, { passive: true });
}

/* =============================================
   NAV — mark active link from current path
============================================= */
(function markActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav__drop-item, a.nav__link').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && href !== '/' && path.includes(href.replace(/^\//, ''))) {
      a.classList.add('is-active');
    } else if (href === '/' && path === '/') {
      a.classList.add('is-active');
    }
  });
})();

/* =============================================
   SCROLL-REVEAL observer
============================================= */
(function initReveal() {
  const items = document.querySelectorAll('.card, .stat, .showcase-card, .video-card');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -28px 0px' });

  items.forEach(el => observer.observe(el));
})();

/* =============================================
   FULLSCREEN — iframe pages
============================================= */
(function initFullscreen() {
  const btn = document.getElementById('fsBtn');
  const iframe = document.getElementById('mainIframe');
  if (!btn || !iframe) return;

  btn.addEventListener('click', () => {
    const el = iframe;
    if (el.requestFullscreen)            el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.mozRequestFullScreen)    el.mozRequestFullScreen();
    else if (el.msRequestFullscreen)     el.msRequestFullscreen();
  });

  /* Update button label when fullscreen changes */
  const updateLabel = () => {
    const active = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement
    );
    btn.querySelector('.fs-label').textContent = active ? 'Exit fullscreen' : 'Full screen';
  };
  document.addEventListener('fullscreenchange',       updateLabel);
  document.addEventListener('webkitfullscreenchange', updateLabel);
})();
