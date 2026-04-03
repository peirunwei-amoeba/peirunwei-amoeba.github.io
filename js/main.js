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
   MOBILE HAMBURGER MENU
============================================= */
(function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  let scrollY = 0;

  const open = () => {
    scrollY = window.scrollY;
    btn.classList.add('is-open');
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-label', 'Close menu');
    /* iOS-safe scroll lock: fix body in place */
    document.body.style.position = 'fixed';
    document.body.style.top      = `-${scrollY}px`;
    document.body.style.width    = '100%';
  };

  const close = () => {
    btn.classList.remove('is-open');
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-label', 'Open menu');
    /* Restore scroll position */
    document.body.style.position = '';
    document.body.style.top      = '';
    document.body.style.width    = '';
    window.scrollTo(0, scrollY);
  };

  btn.addEventListener('click', () =>
    btn.classList.contains('is-open') ? close() : open()
  );

  /* Close on any link tap */
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  /* Close if viewport grows past mobile breakpoint */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) close();
  }, { passive: true });
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
