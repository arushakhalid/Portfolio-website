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
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
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
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1000);
  });
})();
