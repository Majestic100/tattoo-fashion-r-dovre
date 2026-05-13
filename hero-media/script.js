// ============================================
// HERO MEDIA — interaction & animations
// ============================================

// ---------- Mobile nav toggle ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ---------- Sticky nav shadow on scroll ----------
const nav = document.querySelector('.nav');
const onScrollNav = () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScrollNav, { passive: true });
onScrollNav();

// ---------- Scroll progress bar ----------
const progress = document.createElement('div');
progress.className = 'scroll-progress';
document.body.appendChild(progress);
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.transform = `scaleX(${pct / 100})`;
}, { passive: true });

// ---------- Fade-in / reveal observer ----------
const reveal = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); reveal.unobserve(e.target); }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Section-level fade (skip sections with sticky children)
document.querySelectorAll('section').forEach((s) => {
  if (s.querySelector('.letter-img, .process-image')) return;
  s.classList.add('fade-in');
  reveal.observe(s);
});

// Stagger reveal on grid children
document.querySelectorAll('.case-grid, .review-grid, .process-stages, .hero-stats').forEach((grid) => {
  [...grid.children].forEach((child, i) => {
    child.classList.add('stagger-item');
    child.style.setProperty('--stagger-delay', `${i * 80}ms`);
    reveal.observe(child);
  });
});

// ---------- Word-by-word reveal helper ----------
const wrapWords = (root) => {
  const wrap = (node) => {
    if (node.nodeType === 3) {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
        else if (part.length) {
          const span = document.createElement('span');
          span.className = 'word';
          span.textContent = part;
          frag.appendChild(span);
        }
      });
      node.replaceWith(frag);
    } else if (node.nodeType === 1 && node.tagName !== 'BR') {
      [...node.childNodes].forEach(wrap);
    }
  };
  [...root.childNodes].forEach(wrap);
  const words = root.querySelectorAll('.word');
  words.forEach((w, i) => w.style.setProperty('--word-delay', `${i * 60}ms`));
};

// Hero h1 — reveal immediately
const h1 = document.querySelector('.hero-text h1');
if (h1) {
  wrapWords(h1);
  requestAnimationFrame(() => h1.classList.add('words-in'));
}

// Framer-style heading — reveal on scroll into view (skip rotator children)
const framerHeading = document.querySelector('.framer-heading');
if (framerHeading) {
  // Wrap words but skip the rotator block
  const rotator = framerHeading.querySelector('.framer-rotator');
  const placeholder = document.createComment('rotator');
  if (rotator) rotator.parentNode.replaceChild(placeholder, rotator);
  wrapWords(framerHeading);
  if (rotator) placeholder.parentNode.replaceChild(rotator, placeholder);

  const headingObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('words-in');
        headingObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  headingObs.observe(framerHeading);
}

// Word rotator
const rotatorWords = document.querySelectorAll('.framer-rotator-word');
if (rotatorWords.length > 1) {
  let idx = 0;
  setInterval(() => {
    const current = rotatorWords[idx];
    idx = (idx + 1) % rotatorWords.length;
    const next = rotatorWords[idx];
    current.classList.remove('is-active');
    current.classList.add('is-leaving');
    next.classList.add('is-active');
    setTimeout(() => current.classList.remove('is-leaving'), 600);
  }, 2400);
}

// ---------- Counter animation for hero stats ----------
const counters = document.querySelectorAll('[data-count]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    const duration = 2800;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart (slower tail)
      const val = (target * eased).toFixed(decimals);
      el.textContent = val + suffix;
      if (t < 1) requestAnimationFrame(step);
      else if (el.dataset.live === 'true') startLiveTick(el, target, suffix, decimals);
    };
    requestAnimationFrame(step);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach((c) => counterObs.observe(c));

// Live ticking — every 5 minutes, small increment, original decimal precision
function startLiveTick(el, base, suffix, decimals) {
  let current = base;
  const increment = base * 0.005;
  setTimeout(() => {
    setInterval(() => {
      current += increment * (0.6 + Math.random() * 0.8);
      el.textContent = current.toFixed(decimals) + suffix;
    }, 5 * 60 * 1000);
  }, 5 * 60 * 1000);
}


// ---------- Cursor spotlight on hero ----------
const hero = document.querySelector('.hero');
if (hero && !matchMedia('(hover: none)').matches) {
  const spot = document.createElement('div');
  spot.className = 'cursor-spotlight';
  hero.appendChild(spot);
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    spot.style.left = `${e.clientX - rect.left}px`;
    spot.style.top = `${e.clientY - rect.top}px`;
    spot.style.opacity = '1';
  });
  hero.addEventListener('mouseleave', () => { spot.style.opacity = '0'; });
}

// ---------- Tilt effect on case cards ----------
document.querySelectorAll('.case-card, .review-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ---------- Parallax on hero video ----------
const videoFrame = document.querySelector('.hero-video-frame');
if (videoFrame) {
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < 800) {
      videoFrame.style.setProperty('--parallax', `${scroll * 0.06}px`);
    }
  }, { passive: true });
}
