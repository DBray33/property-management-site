// ===========================
// NAV
// ===========================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

// Scroll state
let lastScroll = 0;
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
}

// ===========================
// HERO SLIDESHOW
// ===========================
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 1) {
  let current = 0;
  setInterval(() => {
    heroSlides[current].classList.remove('active');
    current = (current + 1) % heroSlides.length;
    heroSlides[current].classList.add('active');
  }, 5000);
}

// ===========================
// SCROLL REVEAL
// ===========================
const revealElements = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===========================
// RENT BAR ANIMATION
// ===========================
const rentBars = document.querySelectorAll('.rent-bar-fill');
if (rentBars.length) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.rent-bar-fill');
        fills.forEach(fill => {
          const w = fill.dataset.width;
          fill.style.setProperty('--fill-width', w + '%');
          fill.classList.add('animated');
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const rentSection = document.querySelector('.rent-bars');
  if (rentSection) barObserver.observe(rentSection);
}

// ===========================
// FAQ ACCORDION
// ===========================
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    // Toggle current
    if (!isOpen) item.classList.add('open');
  });
});

// ===========================
// YEAR
// ===========================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
