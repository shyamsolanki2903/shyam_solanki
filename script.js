const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

const menuBtn = document.querySelector('.nav-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.textContent = '☰';
    });
  });
}

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* Typed effect */
const roles = [
  'Full Stack Engineer',
  'SaaS & Automation Engineer',
  'AI Workflow Builder',
  'Backend Systems Engineer',
  'Problem Solver',
  'Tech Enthusiast'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-role');
function typeEffect() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  typedEl.textContent = isDeleting ? current.substring(0, charIndex - 1) : current.substring(0, charIndex + 1);
  charIndex += isDeleting ? -1 : 1;
  let delay = isDeleting ? 55 : 95;
  if (!isDeleting && charIndex === current.length) { delay = 2000; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 350; }
  setTimeout(typeEffect, delay);
}
typeEffect();

/* Contact form → opens mailto */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name    = document.getElementById('fname').value;
    const email   = document.getElementById('femail').value;
    const subject = document.getElementById('fsubject').value || 'Portfolio Inquiry';
    const message = document.getElementById('fmessage').value;
    const body = `Hi Shyam,\n\nMy name is ${name} (${email}).\n\n${message}\n\nRegards,\n${name}`;
    window.location.href = `mailto:shyamsolanki2903@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

/* Active nav highlight */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--gold)';
    }
  });
}, { threshold: 0.45 });
sections.forEach(sec => sectionObserver.observe(sec));
/* ============================================
   VIDEO DEMO MODAL
   ============================================ */

/* ============================================
   VIDEO DEMO MODAL
   ============================================ */
function openDemoModal() {
  const modal  = document.getElementById('demoModal');
  const video  = document.getElementById('demoVideo');
  const intro  = document.getElementById('demoIntro');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Reset intro overlay
  if (intro) {
    intro.style.animation = 'none';
    intro.style.opacity   = '1';
    intro.style.pointerEvents = 'all';
    void intro.offsetWidth; // reflow
    intro.style.animation = '';
  }

  // Auto-play after intro finishes (2.7s)
  if (video) {
    video.currentTime = 0;
    setTimeout(() => {
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play();
      });
    }, 2700);
  }
}

function _closeModal() {
  const modal = document.getElementById('demoModal');
  const video = document.getElementById('demoVideo');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  if (video) { video.pause(); video.currentTime = 0; }
}

// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') _closeModal();
});

// Click outside modal box to close
document.addEventListener('DOMContentLoaded', () => {
  const overlay  = document.getElementById('demoModal');
  const closeBtn = document.getElementById('demoCloseBtn');
  const reqBtn   = document.getElementById('demoRequestBtn');

  if (closeBtn) closeBtn.addEventListener('click', _closeModal);

  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) _closeModal();
  });

  // "Request Full Access" → close modal & scroll to contact
  if (reqBtn) reqBtn.addEventListener('click', () => {
    _closeModal();
  });
});

function goFullscreen() {
  const video = document.getElementById('demoVideo');
  if (!video) return;
  if      (video.requestFullscreen)       video.requestFullscreen();
  else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
  else if (video.mozRequestFullScreen)    video.mozRequestFullScreen();
}