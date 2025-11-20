// Theme toggle with localStorage persistence
(function () {
  const root = document.documentElement;
  const toggleButton = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if (stored === 'light') root.setAttribute('data-theme', 'light');
  if (stored === 'dark') root.setAttribute('data-theme', 'dark');

  toggleButton?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// Footer year
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

// Lightweight parallax: translate section backgrounds on scroll
(function () {
  const sections = Array.from(document.querySelectorAll('.parallax'));
  if (!sections.length) return;
  const update = () => {
    const viewportH = window.innerHeight;
    sections.forEach((sec) => {
      const speed = Number(sec.getAttribute('data-parallax-speed') || 0.2);
      const rect = sec.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - viewportH / 2;
      const translate = -center * speed;
      sec.style.backgroundPosition = `center calc(50% + ${translate}px)`;
    });
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

// Subtle 3D tilt on hover based on cursor position
(function () {
  const tilts = Array.from(document.querySelectorAll('[data-tilt]'));
  const maxRotation = 10; // degrees
  const perspective = 800; // px

  tilts.forEach((el) => {
    let frame = 0;
    const onMove = (e) => {
      // support mouse and touch
      const rect = el.getBoundingClientRect();
      const clientX = (e.touches ? e.touches[0].clientX : e.clientX) ?? 0;
      const clientY = (e.touches ? e.touches[0].clientY : e.clientY) ?? 0;
      const x = (clientX - rect.left) / rect.width; // 0..1
      const y = (clientY - rect.top) / rect.height; // 0..1
      const rotY = (x - 0.5) * (maxRotation * 2);
      const rotX = (0.5 - y) * (maxRotation * 2);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('touchend', onLeave);
  });
})();

// Contact form handling
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();
    
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Show quick feedback, then submit to Web3Forms
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
    }

    // Let the browser submit the form normally to Web3Forms
    form.submit();
  });
})();

// Typing animation for hero roles
(function () {
  const roles = [
    "Web Developer",
    "WordPress Expert",
    "Webflow Expert",
    "Digital Creator"
  ];

  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  function typeRole() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      
      if (currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        setTimeout(typeRole, 500);
        return;
      }
      
      setTimeout(typeRole, deletingSpeed);
    } else {
      typingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      
      if (currentCharIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeRole, pauseTime);
        return;
      }
      
      setTimeout(typeRole, typingSpeed);
    }
  }

  // Start typing animation when page loads
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeRole, 1000);
  });
})();
