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

// Enhanced Hero slider with dynamic text
(function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll('.slide'));
  if (slides.length <= 1) return;
  const prevBtn = document.querySelector('.slider-control.prev');
  const nextBtn = document.querySelector('.slider-control.next');
  const dotsContainer = document.querySelector('.slider-dots');
  const dynamicTitle = document.getElementById('dynamic-title');
  const dynamicSubtitle = document.getElementById('dynamic-subtitle');

  let currentIndex = 0;
  let autoTimer = null;
  const AUTO_MS = 6000; // Increased for better readability

  function updateDynamicText(slide) {
    if (!dynamicTitle || !dynamicSubtitle) return;
    
    const title = slide.dataset.title || 'Building Excellence';
    const subtitle = slide.dataset.subtitle || 'Creative solutions, Creative results.';
    const theme = slide.dataset.theme || 'construction';

    // Add loading animation
    dynamicTitle.classList.add('loading');
    
    // Update text with smooth transition
    setTimeout(() => {
      dynamicTitle.textContent = title;
      dynamicSubtitle.textContent = subtitle;
      
      // Remove loading animation
      dynamicTitle.classList.remove('loading');
      
      // Add visible class for animation
      dynamicTitle.classList.add('is-visible');
      
      // Update body theme class for potential theme-based styling
      document.body.className = document.body.className.replace(/theme-\w+/g, '');
      document.body.classList.add(`theme-${theme}`);
    }, 300);
  }

  function goTo(index) {
    slides[currentIndex].classList.remove('is-active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('is-active');
    updateDots();
    updateDynamicText(slides[currentIndex]);
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
  updateDynamicText(slides[currentIndex]); // Initialize with first slide
  startAuto();
})();


// Interactive Service Cards
(function initInteractiveCards() {
  const serviceCards = document.querySelectorAll('.interactive-card');
  
  serviceCards.forEach(card => {
    const service = card.dataset.service;
    
    // Add click interaction
    card.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.left = e.offsetX + 'px';
      ripple.style.top = e.offsetY + 'px';
      ripple.style.width = ripple.style.height = '20px';
      ripple.style.pointerEvents = 'none';
      
      card.style.position = 'relative';
      card.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      // Navigate to relevant section or show modal
      const targetSection = service === 'construction' ? '#projects' : '#services';
      const target = document.querySelector(targetSection);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    
    // Add keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
    
    // Make cards focusable
    card.setAttribute('tabindex', '0');
  });
})();

// Interactive Project Cards
(function initInteractiveProjects() {
  const projectCards = document.querySelectorAll('.interactive-project');
  
  projectCards.forEach(card => {
    const project = card.dataset.project;
    
    // Add click interaction
    card.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Add pulse animation
      card.style.animation = 'pulse 0.3s ease';
      setTimeout(() => {
        card.style.animation = '';
      }, 300);
      
      // Show project details or navigate
      console.log(`Clicked on ${project} project`);
      
      // For now, just scroll to contact section
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    
    // Add keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
    
    // Make cards focusable
    card.setAttribute('tabindex', '0');
  });
})();

// Enhanced scroll animations
(function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.card, .project-card, .about-media');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
})();

// Text & Picture Slideshow
(function initTextPictureSlideshow() {
  const slideshowContainer = document.querySelector('.slideshow-container');
  if (!slideshowContainer) return;
  
  const slides = Array.from(document.querySelectorAll('.slide-content'));
  const indicators = Array.from(document.querySelectorAll('.indicator'));
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const progressBar = document.querySelector('.progress-bar');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let autoTimer = null;
  let progressTimer = null;
  const AUTO_MS = 8000; // 8 seconds per slide
  const PROGRESS_MS = 50; // Update progress every 50ms
  
  function showSlide(index) {
    const prevSlide = currentSlide;
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active', 'prev'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add prev class to previous slide for exit animation
    if (slides[prevSlide]) {
      slides[prevSlide].classList.add('prev');
    }
    
    // Add active class to current slide and indicator
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Update progress bar
    updateProgressBar();
    
    // Restart auto-advance
    startAutoAdvance();
  }
  
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }
  
  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }
  
  function updateProgressBar() {
    if (!progressBar) return;
    const progress = ((currentSlide + 1) / slides.length) * 100;
    progressBar.style.transform = `scaleX(${progress / 100})`;
  }
  
  function startAutoAdvance() {
    stopAutoAdvance();
    autoTimer = setInterval(nextSlide, AUTO_MS);
    
    // Start progress animation
    if (progressBar) {
      progressBar.style.animation = 'none';
      progressBar.offsetHeight; // Trigger reflow
      progressBar.style.animation = `progress ${AUTO_MS}ms linear forwards`;
    }
  }
  
  function stopAutoAdvance() {
    if (autoTimer) clearInterval(autoTimer);
    if (progressTimer) clearInterval(progressTimer);
    if (progressBar) {
      progressBar.style.animation = 'none';
    }
  }
  
  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === ' ') {
      e.preventDefault();
      nextSlide();
    }
  });
  
  // Pause on hover
  slideshowContainer.addEventListener('mouseenter', stopAutoAdvance);
  slideshowContainer.addEventListener('mouseleave', startAutoAdvance);
  
  // Touch/swipe support
  let startX = 0;
  let endX = 0;
  
  slideshowContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  slideshowContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide(); // Swipe left - next slide
      } else {
        prevSlide(); // Swipe right - previous slide
      }
    }
  }
  
  // Initialize
  showSlide(0);
  startAutoAdvance();
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

