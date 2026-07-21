/* ========================================
   TATTOO FASHION — LANDING PAGE SCRIPT
   ======================================== */

(function () {
  'use strict';

  // Header: mørk baggrund når der scrolles
  var header = document.getElementById('lpHeader');
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // FAQ accordion
  document.querySelectorAll('.lp-faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.lp-faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.lp-faq-item.open').forEach(function (open) {
        open.classList.remove('open');
        open.querySelector('.lp-faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Sticky mobil-CTA: vis efter hero, skjul mens formularen er synlig
  var mobileCta = document.getElementById('lpMobileCta');
  var leadCard = document.getElementById('tilbud');
  if (mobileCta && leadCard && 'IntersectionObserver' in window) {
    var formVisible = false;
    var pastHero = false;

    var formObserver = new IntersectionObserver(function (entries) {
      formVisible = entries[0].isIntersecting;
      update();
    }, { threshold: 0.15 });
    formObserver.observe(leadCard);

    var updateScroll = function () {
      pastHero = window.scrollY > window.innerHeight * 0.6;
      update();
    };
    window.addEventListener('scroll', updateScroll, { passive: true });

    function update() {
      mobileCta.classList.toggle('visible', pastHero && !formVisible);
    }
  }
})();
