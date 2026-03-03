// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== STICKY NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  updateActiveNav();
});

// ===== ACTIVE NAV LINK =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let currentSection = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      currentSection = sec.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

// ===== TYPED TEXT =====
const titles = [
  'Business / Data Analyst',
  'Power BI Specialist',
  'SQL & Python Expert',
  'Data Storyteller'
];

let titleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  const current = titles[titleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 60 : 90);
}

typeEffect();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ===== SKILL BARS =====
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') + '%';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-bars').forEach(el => barObserver.observe(el));

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'var(--accent2)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    this.reset();
  }, 3000);
});

// ===== SMOOTH SCROLL FOR OLDER BROWSERS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});