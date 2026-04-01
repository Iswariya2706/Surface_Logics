// main.js

// Intersection Observer for Scroll Animations
const observeElements = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Stop observing once faded in
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
};

// Subtle Parallax Effect for Background Lines
const handleParallax = () => {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        
        // Move the topological background slowly depending on scroll position
        // The background is pseudo element on body, so we can adjust it via Custom Properties on body or document element,
        // or just apply a translate transform on a standalone div.
        // For simplicity and performance, we'll apply it to the body css variables.
        document.body.style.setProperty('--scroll-offset', `${scrolled * 0.1}px`);
        ticking = false;
      });
      ticking = true;
    }
  });
};

// Update CSS for Parallax
const initParallaxStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    body::before {
      transform: translateY(var(--scroll-offset, 0px));
    }
  `;
  document.head.appendChild(style);
};

// Initialize scripts
document.addEventListener('DOMContentLoaded', () => {
  observeElements();
  initParallaxStyles();
  handleParallax();
});
