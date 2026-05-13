/* ========================================
   TATTOO FASHION — MAIN SCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Hero Stagger Animation ---
  const heroAnims = document.querySelectorAll('.hero-anim');
  heroAnims.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 300 + i * 200);
  });

  // --- Sticky Header ---
  const stickyHeader = document.getElementById('stickyHeader');
  const heroSection = document.getElementById('hero');
  const floatBookMobile = document.getElementById('floatBookMobile');
  let lastScroll = 0;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header background
    if (scrollY > 80) {
      stickyHeader.classList.add('scrolled');
    } else {
      stickyHeader.classList.remove('scrolled');
    }

    // Floating mobile book button
    if (floatBookMobile) {
      if (scrollY > window.innerHeight * 0.8) {
        floatBookMobile.classList.add('visible');
      } else {
        floatBookMobile.classList.remove('visible');
      }
    }

    // Parallax hero background
    if (scrollY < window.innerHeight) {
      const heroBg = document.querySelector('.hero-bg');
      if (heroBg) {
        heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    }

    lastScroll = scrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Mobile Menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: anchor.getAttribute('href') === '#hero' ? 0 : offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- File Upload Display ---
  const fileInput = document.getElementById('files');
  const fileList = document.getElementById('fileList');

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      fileList.innerHTML = '';
      Array.from(fileInput.files).forEach(file => {
        const div = document.createElement('div');
        div.className = 'file-list-item';
        div.textContent = `${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
        fileList.appendChild(div);
      });
    });
  }

  // --- Form Validation & Submission ---
  const form = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.querySelectorAll('.form-group.error').forEach(g => g.classList.remove('error'));

      let isValid = true;

      const name = document.getElementById('name');
      if (!name.value.trim()) {
        name.closest('.form-group').classList.add('error');
        isValid = false;
      }

      const email = document.getElementById('email');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        email.closest('.form-group').classList.add('error');
        isValid = false;
      }

      const phone = document.getElementById('phone');
      if (!phone.value.trim()) {
        phone.closest('.form-group').classList.add('error');
        isValid = false;
      }

      const description = document.getElementById('description');
      if (!description.value.trim()) {
        description.closest('.form-group').classList.add('error');
        isValid = false;
      }

      if (!isValid) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        const subject = encodeURIComponent('Ny booking forespørgsel - Tattoo Fashion');
        const body = encodeURIComponent(
          `Navn: ${name.value}\n` +
          `Email: ${email.value}\n` +
          `Telefon: ${phone.value}\n` +
          `Stil: ${document.getElementById('style').value || 'Ved ikke endnu'}\n` +
          `Størrelse: ${document.getElementById('size').value || 'Ikke angivet'}\n` +
          `Placering: ${document.getElementById('placement').value || 'Ikke angivet'}\n` +
          `Tidsramme: ${document.getElementById('timing').value || 'Ikke angivet'}\n` +
          `Type: ${document.getElementById('type').value || 'Ikke angivet'}\n` +
          `Beskrivelse: ${description.value}`
        );

        form.querySelectorAll('.form-group').forEach(g => g.style.display = 'none');
        submitBtn.classList.remove('loading');
        formSuccess.style.display = 'block';

        window.location.href = `mailto:info@tattoofashion.dk?subject=${subject}&body=${body}`;
      }, 1200);
    });
  }

  // --- Scroll Animations (Fade-in + Stagger) ---
  const fadeTargets = document.querySelectorAll(
    '.intro, .artists, .studio, .reviews, .booking, .location, .faq, .instagram, ' +
    '.stat-item, .artist-card, .review-card, .studio-img-wrap, .step, .insta-item'
  );

  fadeTargets.forEach(el => {
    el.classList.add('fade-in');
  });

  // Add stagger index as CSS variable
  const staggerGroups = [
    '.stat-item', '.artist-card', '.review-card', '.step', '.insta-item'
  ];
  staggerGroups.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.setProperty('--stagger', i);
    });
  });

  // Slide-in variants for specific elements
  const bookingForm = document.querySelector('.booking-form');
  const bookingInfo = document.querySelector('.booking-info');
  if (bookingForm) bookingForm.classList.add('fade-in-left');
  if (bookingInfo) bookingInfo.classList.add('fade-in-right');

  const mapWrap = document.querySelector('.map-wrap');
  const locationInfo = document.querySelector('.location-info');
  if (mapWrap) mapWrap.classList.add('fade-in-left');
  if (locationInfo) locationInfo.classList.add('fade-in-right');

  // Observe all animated elements
  const allAnimated = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    allAnimated.forEach(el => fadeObserver.observe(el));

    setTimeout(() => {
      allAnimated.forEach(el => el.classList.add('visible'));
    }, 3000);
  } else {
    allAnimated.forEach(el => el.classList.add('visible'));
  }

  // --- Counter Animation for Stats ---
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounter = (el) => {
    const text = el.textContent.trim();
    const match = text.match(/^([\d.]+)(\+?)$/);
    if (!match) return; // skip non-numeric like "Gratis", "Alle"

    const target = parseFloat(match[1].replace('.', ''));
    const suffix = match[2];
    const hasThousandSep = match[1].includes('.');
    const duration = 1500;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);

      if (hasThousandSep && current >= 1000) {
        el.textContent = current.toLocaleString('da-DK') + suffix;
      } else {
        el.textContent = current + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  // --- Reviews Number Counter ---
  const reviewsNumber = document.querySelector('.reviews-number');
  if (reviewsNumber && 'IntersectionObserver' in window) {
    const revObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const duration = 2000;
          const target = 2617;
          const start = performance.now();

          const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            reviewsNumber.textContent = current.toLocaleString('da-DK') + '+';
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          revObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    revObserver.observe(reviewsNumber);
  }

  // --- Scroll-triggered Popup (fires when user reaches reviews section) ---
  const exitPopup = document.getElementById('exitPopup');
  const popupClose = document.getElementById('popupClose');
  const popupCta = document.getElementById('popupCta');
  let popupShown = false;

  const showPopup = () => {
    if (popupShown || !exitPopup) return;
    popupShown = true;
    exitPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const hidePopup = () => {
    if (!exitPopup) return;
    exitPopup.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Trigger popup when the reviews section enters the viewport
  const reviewsSection = document.getElementById('reviews');
  if (reviewsSection && exitPopup && 'IntersectionObserver' in window) {
    const reviewsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !popupShown) {
          showPopup();
          reviewsObserver.disconnect();
        }
      });
    }, { threshold: 0.25 });
    reviewsObserver.observe(reviewsSection);
  }

  if (popupClose) popupClose.addEventListener('click', hidePopup);
  if (popupCta) popupCta.addEventListener('click', hidePopup);
  if (exitPopup) {
    exitPopup.addEventListener('click', (e) => {
      if (e.target === exitPopup) hidePopup();
    });
  }

});
