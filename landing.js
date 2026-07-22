/* ========================================
   TATTOO FASHION — LANDING PAGE SCRIPT
   ======================================== */

(function () {
  'use strict';

  /* ==========================================================
     TRUSTPILOT-ANMELDELSER — ægte anmeldelser fra
     dk.trustpilot.com/review/tattoofashion.dk.
     Første halvdel vises i øverste række, resten i nederste.
     Tilføj/fjern frit — rækkerne fylder sig selv op.
     Format: { title, text, name } (city er valgfri)
     ========================================================== */
  var TP_REVIEWS = [
    { title: 'Professionelle og trygge rammer', text: 'Nemme at kommunikere med og dygtige tatovører.', name: 'Naja Holmgaard Pedersen' },
    { title: 'Amazing service', text: 'Amazing service, and a beautiful tattoo. Very precise line work.', name: 'Sophia Hesselberg' },
    { title: 'Super dygtige og seriøse', text: 'Rødovre. Super dygtige og seriøse, kan helt sikkert anbefale dem.', name: 'Henrik' },
    { title: 'Vanvittig dygtige', text: 'Vanvittig dygtige, søde og humoristiske. Kommer helt sikkert igen for mere!', name: 'Daniella Steinstø' },
    { title: 'Very friendly people', text: 'Very friendly people, awesome service, always coming back for more!', name: 'Pietro Fatebene' },
    { title: 'Virkelig venlige mennesker', text: 'Virkelig venlige mennesker. Passer godt på en, selv hvis man bliver dårlig.', name: 'Katrine TH' },
    { title: 'Great service', text: 'Great service, and the artist did an amazing job and mirrored my vision perfectly!', name: 'Liam Bak' },
    { title: 'Ren og professionel', text: 'Nice, clean and professional service and very good advice regarding size and placement.', name: 'Rune Christensen' },
    { title: 'Very nice staff', text: 'Very nice staff, good at keeping things clean. And they make sure that you’re okay!', name: 'Victoria Rasnis' },
    { title: 'The experience was so good', text: 'The experience was so good. I’m so happy with the results and will definitely come back!', name: 'Sofia Rosa Andersen' },
    { title: 'God service og flot resultat', text: 'God service og super flot resultat. Fik lavet en overarm. Ikke sidste gang jeg kommer.', name: 'Brian Albertsen' },
    { title: 'Rigtig sød og imødekommende', text: 'Rigtig flot tatovering. God service, masser af plads, rent og pænt.', name: 'Mia Andersen' },
    { title: 'Top service', text: 'Min tatovør forstod virkelig hvad jeg ønskede og tog sig god tid til at tegne den direkte på mig.', name: 'Carina Jessen' },
    { title: 'Elsker det her sted', text: 'Trygge omgivelser, super mennesker, og ikke mindst virkelig dygtige kunstnere. Glæder mig til at komme igen.', name: 'Sir Frederik' },
    { title: 'Rart og trygt', text: 'Det var min første tatovering, så jeg var meget nervøs, men stedet var rart og roligt. Vil 100% anbefale!', name: 'Christensen Kira' }
  ];

  /* ==========================================================
     INSPIRATIONS-SHOWCASE — billeder OG videoer
     Læg nye filer i images/ og tilføj en linje her — mosaikken og
     lightboxen opdaterer sig selv.
       Billede: { src: 'images/fil.jpg', alt: 'Beskrivelse' }
       Video:   { src: 'images/fil.mp4', type: 'video', alt: 'Beskrivelse' }
       Stort felt i mosaikken: tilføj featured: true
     ========================================================== */
  var INSPIRATION_MEDIA = [
    { src: 'images/insta-1.jpg', alt: 'Matchende script-tatoveringer på overarmene', featured: true },
    { src: 'images/insta-2.jpg', alt: 'Små matchende motiver på underarmene' },
    { src: 'images/insta-3.jpg', alt: 'Fine fineline blomster-tatoveringer' },
    { src: 'images/studio-video.mp4', type: 'video', alt: 'Rundtur i studiet på Roskildevej', featured: true },
    { src: 'images/insta-4.jpg', alt: 'Matchende firkløver-tatoveringer til hele familien' },
    { src: 'images/insta-5.jpg', alt: 'Matchende tatoveringer på armene, mor og datter' },
    { src: 'images/insta-6.jpg', alt: 'Sommerfugle og elefant-motiver' }
  ];

  /* ==========================================================
     INSTAGRAM-SEKTION (bunden af siden)
     Samme format som ovenfor — hvert felt linker til profilen.
     Sæt url på et enkelt felt for at linke direkte til et opslag.
     ========================================================== */
  var INSTAGRAM_PROFILE = 'https://www.instagram.com/tattoo_fashion_roedovre/';
  var INSTAGRAM_ITEMS = [
    { src: 'images/insta-1.jpg', alt: 'Instagram-opslag: matchende script-tatoveringer' },
    { src: 'images/insta-2.jpg', alt: 'Instagram-opslag: små matchende motiver' },
    { src: 'images/insta-3.jpg', alt: 'Instagram-opslag: fineline blomster' },
    { src: 'images/insta-4.jpg', alt: 'Instagram-opslag: firkløver-tatoveringer' },
    { src: 'images/insta-5.jpg', alt: 'Instagram-opslag: mor og datter' },
    { src: 'images/insta-6.jpg', alt: 'Instagram-opslag: sommerfugle og elefanter' }
  ];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // --- Trustpilot-marquee: 2 rækker à 15 kort, hver duplikeret til loopet ---
  function initials(name) {
    return name.split(/\s+/).map(function (p) { return p.charAt(0); }).join('').replace('.', '').toUpperCase().slice(0, 2);
  }

  function tpCardHtml(r) {
    return '<article class="tp-card">' +
      '<div class="tp-card-top"><span class="tp-stars" aria-label="5 ud af 5 stjerner"><i>★</i><i>★</i><i>★</i><i>★</i><i>★</i></span><span class="tp-quote" aria-hidden="true">“”</span></div>' +
      '<h3>' + escapeHtml(r.title) + '</h3>' +
      '<p>' + escapeHtml(r.text) + '</p>' +
      '<div class="tp-card-foot">' +
      '<span class="tp-avatar" aria-hidden="true">' + escapeHtml(initials(r.name)) + '</span>' +
      '<div class="tp-card-author"><strong>' + escapeHtml(r.name) + '</strong>' +
      (r.city ? '<span>' + escapeHtml(r.city) + '</span>' : '') + '</div>' +
      '<span class="tp-verified">Verificeret</span>' +
      '</div></article>';
  }

  var tpRows = document.getElementById('tpRows');
  if (tpRows && TP_REVIEWS.length) {
    var half = Math.ceil(TP_REVIEWS.length / 2);
    var rows = [
      { reviews: TP_REVIEWS.slice(0, half), reverse: false },
      { reviews: TP_REVIEWS.slice(half), reverse: true }
    ];
    var CARD_WIDTH = 380; // ca. kortbredde inkl. mellemrum
    var screenWidth = Math.max(window.innerWidth, window.screen ? window.screen.width : 0, 1440);
    rows.forEach(function (row) {
      if (!row.reviews.length) return;
      var cards = row.reviews.map(tpCardHtml).join('');
      // Sporet skal altid være bredere end skærmen, ellers opstår der
      // tomrum i loopet — gentag kortsættet indtil det fylder rigeligt
      var copies = Math.max(1, Math.ceil((screenWidth * 1.3) / (row.reviews.length * CARD_WIDTH)));
      var group = new Array(copies + 1).join(cards);
      var rowEl = document.createElement('div');
      rowEl.className = 'tp-row' + (row.reverse ? ' tp-row-reverse' : '');
      // ~13s pr. kort giver samme fart uanset antal anmeldelser
      rowEl.style.setProperty('--tp-dur', Math.round(row.reviews.length * copies * 13) + 's');
      rowEl.innerHTML =
        '<div class="tp-track">' +
        '<div class="tp-group">' + group + '</div>' +
        '<div class="tp-group" aria-hidden="true">' + group + '</div>' +
        '</div>';
      tpRows.appendChild(rowEl);
    });
  }

  // --- Fælles medie-markup (billede eller video-tile) ---
  function mediaHtml(item) {
    if (item.type === 'video') {
      return '<video src="' + escapeHtml(item.src) + '" muted playsinline loop preload="metadata" aria-label="' + escapeHtml(item.alt) + '"></video>' +
        '<span class="media-play-badge" aria-hidden="true">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>' +
        '</span>';
    }
    return '<img src="' + escapeHtml(item.src) + '" alt="' + escapeHtml(item.alt) + '" loading="lazy" decoding="async">';
  }

  // Videoer i grids afspiller lydløst ved hover
  function enableHoverPlay(container) {
    container.querySelectorAll('video').forEach(function (v) {
      var tile = v.closest('.insp-item, .ig-item') || v;
      tile.addEventListener('mouseenter', function () { v.play().catch(function () {}); });
      tile.addEventListener('mouseleave', function () { v.pause(); });
    });
  }

  // --- Inspirations-showcase + lightbox ---
  var inspGrid = document.getElementById('inspGrid');
  var lightbox = document.getElementById('inspLightbox');
  var lbImg = document.getElementById('inspLbImg');
  var lbVideo = document.getElementById('inspLbVideo');
  var lbCounter = document.getElementById('inspLbCounter');
  var lbIndex = 0;
  var lastFocus = null;

  if (inspGrid && INSPIRATION_MEDIA.length) {
    var galTile = function (item, idx, inDuplicate) {
      return '<button type="button" class="insp-item' + (item.featured ? ' insp-item-large' : '') + '"' +
        ' data-idx="' + idx + '"' +
        (inDuplicate ? ' tabindex="-1"' : '') +
        ' aria-label="' + escapeHtml((item.type === 'video' ? 'Afspil video: ' : 'Vis billede: ') + item.alt) + '">' +
        mediaHtml(item) +
        '<span class="insp-item-overlay" aria-hidden="true">' +
        '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>' +
        '</span></button>';
    };

    // To rækker i hver sin retning — fyldes op til skærmbredden ligesom
    // anmeldelses-marqueen, så der aldrig opstår tomrum
    var GAL_ITEM_WIDTH = 240;
    var galScreen = Math.max(window.innerWidth, window.screen ? window.screen.width : 0, 1440);
    var galHalf = Math.ceil(INSPIRATION_MEDIA.length / 2);
    var galRows = [
      { items: INSPIRATION_MEDIA.slice(0, galHalf), start: 0, reverse: false },
      { items: INSPIRATION_MEDIA.slice(galHalf), start: galHalf, reverse: true }
    ];
    galRows.forEach(function (row) {
      if (!row.items.length) return;
      var copies = Math.max(1, Math.ceil((galScreen * 1.3) / (row.items.length * GAL_ITEM_WIDTH)));
      var groupHtml = '';
      var dupHtml = '';
      for (var c = 0; c < copies; c++) {
        row.items.forEach(function (item, j) {
          groupHtml += galTile(item, row.start + j, false);
          dupHtml += galTile(item, row.start + j, true);
        });
      }
      var rowEl = document.createElement('div');
      rowEl.className = 'gal-row' + (row.reverse ? ' gal-row-reverse' : '');
      // ~8s pr. felt giver en rolig glidning uanset antal medier
      rowEl.style.setProperty('--gal-dur', Math.round(row.items.length * copies * 8) + 's');
      rowEl.innerHTML =
        '<div class="gal-track">' +
        '<div class="gal-group">' + groupHtml + '</div>' +
        '<div class="gal-group" aria-hidden="true">' + dupHtml + '</div>' +
        '</div>';
      inspGrid.appendChild(rowEl);
    });
    inspGrid.addEventListener('click', function (e) {
      var btn = e.target.closest('.insp-item');
      if (btn) openLightbox(parseInt(btn.getAttribute('data-idx'), 10));
    });
    enableHoverPlay(inspGrid);
  }

  function openLightbox(i) {
    if (!lightbox) return;
    lastFocus = document.activeElement;
    lbIndex = i;
    updateLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('inspLbClose').focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    lbVideo.pause();
    lbVideo.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  }

  function stepLightbox(dir) {
    lbIndex = (lbIndex + dir + INSPIRATION_MEDIA.length) % INSPIRATION_MEDIA.length;
    updateLightbox();
  }

  function updateLightbox() {
    var item = INSPIRATION_MEDIA[lbIndex];
    var isVideo = item.type === 'video';
    lbVideo.pause();
    if (isVideo) {
      lbImg.hidden = true;
      lbVideo.hidden = false;
      lbVideo.src = item.src;
      lbVideo.play().catch(function () {});
    } else {
      lbVideo.removeAttribute('src');
      lbVideo.hidden = true;
      lbImg.hidden = false;
      lbImg.src = item.src;
      lbImg.alt = item.alt;
    }
    lbCounter.textContent = (lbIndex + 1) + ' / ' + INSPIRATION_MEDIA.length;
  }

  // --- Instagram-grid ---
  var igGrid = document.getElementById('igGrid');
  if (igGrid && INSTAGRAM_ITEMS.length) {
    INSTAGRAM_ITEMS.forEach(function (item) {
      var a = document.createElement('a');
      a.className = 'ig-item';
      a.href = item.url || INSTAGRAM_PROFILE;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', item.alt + ', åbner Instagram');
      a.innerHTML = mediaHtml(item) +
        '<span class="ig-item-overlay" aria-hidden="true">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>' +
        '</span>';
      igGrid.appendChild(a);
    });
    enableHoverPlay(igGrid);
  }

  if (lightbox) {
    document.getElementById('inspLbClose').addEventListener('click', closeLightbox);
    document.getElementById('inspLbPrev').addEventListener('click', function () { stepLightbox(-1); });
    document.getElementById('inspLbNext').addEventListener('click', function () { stepLightbox(1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });
  }

  // --- Header: mørk baggrund ved scroll + skjul ved rul ned (mobil) ---
  var header = document.getElementById('lpHeader');
  var lastScrollY = window.scrollY;
  var onScroll = function () {
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 24);
    // Skjul først et stykke nede på siden; vis straks ved rul op
    if (y > lastScrollY + 6 && y > 280) {
      header.classList.add('lp-header-hidden');
    } else if (y < lastScrollY - 6 || y <= 280) {
      header.classList.remove('lp-header-hidden');
    }
    lastScrollY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Scroll reveal ---
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

  // --- FAQ accordion ---
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

  // --- Sticky mobil-CTA: vis efter hero, skjul mens formularen er synlig ---
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
