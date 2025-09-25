// Mobile navigation toggle
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const primaryMenu = document.getElementById('primary-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top: y, behavior: 'smooth' });
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Update footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Basic form handling (demo only)
const form = document.getElementById('quote-form');
if (form) {
  form.addEventListener('submit', (e) => {
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    if (!name || !email || !service) {
      e.preventDefault();
      alert('Please complete the required fields.');
      return;
    }
  });

  // Show service info when user selects a service
  const serviceSelect = document.getElementById('service');
  const serviceInfo = document.getElementById('service-info');
  if (serviceSelect && serviceInfo) {
    const descriptions = {
      'Building Construction': 'Turnkey builds from foundation to finishing with quality control.',
      'Electrical Services': 'Installation, repair, and maintenance for residential and industrial systems.',
      'Architectural Works & Consultancy': 'Functional, aesthetic designs with professional advisory support.',
      'AC & CCTV Camera Services': 'Supply, installation, and maintenance of AC units and security cameras.'
    };
    const updateInfo = () => {
      const value = serviceSelect.value;
      serviceInfo.textContent = descriptions[value] || '';
    };
    serviceSelect.addEventListener('change', updateInfo);
    updateInfo();
  }
}

// Hero slider
(function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll('.slide'));
  if (slides.length <= 1) return;
  const prevBtn = document.querySelector('.slider-control.prev');
  const nextBtn = document.querySelector('.slider-control.next');
  const dotsContainer = document.querySelector('.slider-dots');

  let currentIndex = 0;
  let autoTimer = null;
  const AUTO_MS = 5000;

  function goTo(index) {
    slides[currentIndex].classList.remove('is-active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('is-active');
    updateDots();
    restartAuto();
  }

  function next() { goTo(currentIndex + 1); }
  function prev() { goTo(currentIndex - 1); }

  function createDots() {
    if (!dotsContainer) return;
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
      btn.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(btn);
    });
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    const buttons = dotsContainer.querySelectorAll('button');
    buttons.forEach((b, i) => b.setAttribute('aria-selected', String(i === currentIndex)));
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, AUTO_MS);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  function restartAuto() {
    startAuto();
  }

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  createDots();
  startAuto();
})();


// Reveal animation for About image
(function revealAboutMedia() {
  const aboutEl = document.querySelector('.about-media');
  if (!aboutEl) return;
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutEl.classList.add('is-visible');
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });
    io.observe(aboutEl);
  } else {
    // Fallback: show immediately
    aboutEl.classList.add('is-visible');
  }
})();

