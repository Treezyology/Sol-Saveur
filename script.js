/* ═══════════════════════════════════════════════
   SOL & SAVEUR — script.js
   - Sticky header on scroll
   - Mobile nav toggle
   - Scroll-reveal animation
   - Active nav link highlight
   - Back-to-top button
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── ELEMENTS ── */
  const header     = document.getElementById('top') ? document.querySelector('.site-header') : document.querySelector('.site-header');
  const navToggle  = document.getElementById('navToggle');
  const mainNav    = document.getElementById('mainNav');
  const backToTop  = document.getElementById('backToTop');
  const navLinks   = document.querySelectorAll('.nav-link');
  const sections   = document.querySelectorAll('section[id]');
  const reveals    = document.querySelectorAll('.reveal');

  /* ══════════════════════════════════════
     1. STICKY HEADER
  ══════════════════════════════════════ */
  function handleScroll() {
    const scrollY = window.scrollY;

    // Add scrolled class after 60px
    header.classList.toggle('scrolled', scrollY > 60);

    // Back-to-top button visibility
    backToTop.classList.toggle('visible', scrollY > 400);

    // Highlight active nav section
    highlightActiveNav(scrollY);
  }

  /* ══════════════════════════════════════
     2. MOBILE NAV TOGGLE
  ══════════════════════════════════════ */
  navToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target) && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ══════════════════════════════════════
     3. SCROLL-REVEAL (IntersectionObserver)
  ══════════════════════════════════════ */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Stagger sibling reveals
          const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
          siblings.forEach(function (el, i) {
            if (el === entry.target) {
              setTimeout(function () {
                entry.target.classList.add('visible');
              }, index * 80);
            }
          });
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(function (el, i) {
    // Add stagger delay via inline style
    el.style.transitionDelay = (i % 5) * 0.08 + 's';
    revealObserver.observe(el);
  });

  /* ══════════════════════════════════════
     4. ACTIVE NAV HIGHLIGHT
  ══════════════════════════════════════ */
  function highlightActiveNav(scrollY) {
    let currentSection = '';

    sections.forEach(function (section) {
      const sectionTop    = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  /* ══════════════════════════════════════
     5. SMOOTH SCROLL (fallback for older browsers)
  ══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 8;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════════
     6. GALERIE HOVER OVERLAY (touch support)
  ══════════════════════════════════════ */
  const galerieItems = document.querySelectorAll('.galerie-item');
  galerieItems.forEach(function (item) {
    item.addEventListener('touchstart', function () {
      item.classList.toggle('touch-active');
    }, { passive: true });
  });

  /* ══════════════════════════════════════
     7. EVENT LISTENERS
  ══════════════════════════════════════ */
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', function () {
    // Close mobile nav on resize to desktop
    if (window.innerWidth > 768) {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Run once on load
  handleScroll();

  /* ══════════════════════════════════════
     8. ACTIVE NAV LINK STYLE (CSS injection)
  ══════════════════════════════════════ */
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: var(--green);
      background: var(--willow-light);
    }
  `;
  document.head.appendChild(style);

  /* ══════════════════════════════════════
     9. YEAR IN FOOTER (keep copyright current)
  ══════════════════════════════════════ */
  const copyEl = document.querySelector('.footer-copy');
  if (copyEl) {
    copyEl.innerHTML = copyEl.innerHTML.replace('2025', new Date().getFullYear());
  }

})();
