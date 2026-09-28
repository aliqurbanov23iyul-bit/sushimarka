/* ============================================================
   SUSHI MARKA V2 — Script
   ============================================================ */

// ── Intersection Observer: fade-up animations ──
const io = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// ── Scroll-to-top button ──
const scrollBtn = document.getElementById('scrollTop');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show', window.scrollY > 400);
  });
}

// ── Falling petals ──
(function spawnPetals() {
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('i');
    p.className = 'petal';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top  = (-50 - Math.random() * 200) + 'px';
    p.style.animationDuration  = (9 + Math.random() * 7) + 's';
    p.style.animationDelay     = (-Math.random() * 12) + 's';
    p.style.width  = (8 + Math.random() * 6) + 'px';
    p.style.height = (5 + Math.random() * 4) + 'px';
    p.style.opacity = (0.4 + Math.random() * 0.4).toString();
    document.body.appendChild(p);
  }
})();

// ── Mascot click easter egg ──
const mascot = document.getElementById('mascot');
const reactions = ['🍣 ♡', '✨ Sushi!', '🥹 Sevdim!', '🛵 Yoldayam!', 'Sifariş et! ♡'];
let reactionIdx = 0;
if (mascot) {
  mascot.addEventListener('click', () => {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = reactions[reactionIdx % reactions.length];
    reactionIdx++;
    bubble.style.cssText = `
      position:absolute; top:${30 + Math.random()*40}px; left:${40 + Math.random()*60}%;
      z-index:99; pointer-events:none; animation:bblPop .6s ease-out forwards;
      font-size:14px; white-space:nowrap;
    `;
    mascot.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1800);
  });
}

// ── Active nav link highlight ──
(function highlightNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === path || (path === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });
})();

// ── FAQ Accordion ──
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

  // Open clicked (if it was closed)
  if (!isOpen) item.classList.add('open');
}

// ── Smooth nav shadow on scroll ──
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.filter = window.scrollY > 10
      ? 'drop-shadow(0 8px 30px rgba(0,0,0,.08))'
      : 'none';
  }, { passive: true });
}

// ── Card hover tilt effect ──
document.querySelectorAll('.card, .feat, .cat').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Mobile hamburger menu ──
document.querySelectorAll('.hamburger').forEach(btn => {
  const nav = btn.closest('.nav');
  const links = nav && nav.querySelector('.links');
  if (!links) return;
  const closeMenu = () => {
    links.classList.remove('mobile-open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-label','Menyunu aç');
  };
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = !links.classList.contains('mobile-open');
    links.classList.toggle('mobile-open', open);
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Menyunu bağla' : 'Menyunu aç');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', e => { if (!nav.contains(e.target)) closeMenu(); });
  window.addEventListener('resize', () => { if (innerWidth > 820) closeMenu(); });
});
