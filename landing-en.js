/* ========================================
   TATTOO FASHION — LANDING PAGE SCRIPT (EN)
   English mirror of landing.js. Same behaviour, translated
   content. Keep the two in sync when either changes.
   ======================================== */

(function () {
  'use strict';

  /* ==========================================================
     TRUSTPILOT REVIEWS — real reviews from
     dk.trustpilot.com/review/tattoofashion.dk.
     The Danish originals have been translated; reviews left in
     English are quoted verbatim as they were written.
     NOTE: if this page ever goes live, either quote the Danish
     originals or state that they are translations.
     First half fills the top row, the rest the bottom row.
     Format: { title, text, name } (city optional)
     ========================================================== */
  var TP_REVIEWS = [
    { title: 'Professional and reassuring', text: 'Easy to talk to and highly skilled tattooists.', name: 'Naja Holmgaard Pedersen' },
    { title: 'Amazing service', text: 'Amazing service, and a beautiful tattoo. Very precise line work.', name: 'Sophia Hesselberg' },
    { title: 'Seriously good at what they do', text: 'Rødovre. Seriously good at what they do, I can absolutely recommend them.', name: 'Henrik' },
    { title: 'Ridiculously talented', text: 'Ridiculously talented, kind and funny. I am definitely coming back for more!', name: 'Daniella Steinstø' },
    { title: 'Very friendly people', text: 'Very friendly people, awesome service, always coming back for more!', name: 'Pietro Fatebene' },
    { title: 'Genuinely kind people', text: 'Genuinely kind people. They look after you, even if you start feeling faint.', name: 'Katrine TH' },
    { title: 'Great service', text: 'Great service, and the artist did an amazing job and mirrored my vision perfectly!', name: 'Liam Bak' },
    { title: 'Clean and professional', text: 'Nice, clean and professional service and very good advice regarding size and placement.', name: 'Rune Christensen' },
    { title: 'Very nice staff', text: 'Very nice staff, good at keeping things clean. And they make sure that you\u2019re okay!', name: 'Victoria Rasnis' },
    { title: 'The experience was so good', text: 'The experience was so good. I\u2019m so happy with the results and will definitely come back!', name: 'Sofia Rosa Andersen' },
    { title: 'Good service, beautiful result', text: 'Good service and a really beautiful result. Had my upper arm done. Not the last time I visit.', name: 'Brian Albertsen' },
    { title: 'Kind and welcoming', text: 'Really beautiful tattoo. Good service, plenty of space, clean and tidy.', name: 'Mia Andersen' },
    { title: 'Top service', text: 'My artist really understood what I wanted and took the time to draw it straight onto me.', name: 'Carina Jessen' },
    { title: 'I love this place', text: 'A place you feel safe, great people, and above all genuinely skilled artists. Looking forward to going back.', name: 'Sir Frederik' },
    { title: 'Calm and reassuring', text: 'It was my first tattoo, so I was very nervous, but the place was calm and welcoming. Would 100% recommend!', name: 'Christensen Kira' }
  ];

  /* ==========================================================
     INSPIRATION SHOWCASE — images AND videos
     Drop new files in images/ and add a line here; the mosaic and
     the lightbox update themselves.
       Image: { src: 'images/file.jpg', alt: 'Description' }
       Video: { src: 'images/file.mp4', type: 'video', alt: 'Description' }
       Large mosaic cell: add featured: true
     ========================================================== */
  var INSPIRATION_MEDIA = [
    { src: 'images/work-rygprojekt.mp4', type: 'video', alt: 'Full back piece in black and grey, seven sessions', featured: true },
    { src: 'images/work-ksenia-snake.jpg', alt: 'Snake and peonies in black and grey, back piece' },
    { src: 'images/work-fullsleeve-bali.mp4', type: 'video', alt: 'Greek full sleeve with Zeus and a lion in black and grey' },
    { src: 'images/work-oldschool-gangster.jpg', alt: 'Old school gangster portraits on the leg, black and grey realism', featured: true },
    { src: 'images/work-disney-ben.mp4', type: 'video', alt: 'Disney project covering the whole leg, nine sessions' },
    { src: 'images/work-pamela-leopard.jpg', alt: 'Leopard and lilies, full sleeve' },
    { src: 'images/work-chicano-sleeve.mp4', type: 'video', alt: 'Chicano sleeve with a portrait' },
    { src: 'images/work-clock-roulette.mp4', type: 'video', alt: 'Roulette wheel and pocket watch on the forearm, black and grey realism' },
    { src: 'images/work-graesk.mp4', type: 'video', alt: 'Greek-inspired sleeve' }
  ];

  /* ==========================================================
     INSTAGRAM SECTION (bottom of the page)
     Same format as above; every cell links to the profile.
     Set url on a single cell to link straight to that post.
     ========================================================== */
  var INSTAGRAM_PROFILE = 'https://www.instagram.com/tattoo_fashion_roedovre/';
  var INSTAGRAM_ITEMS = [
    { src: 'images/insta-1.jpg', alt: 'Instagram post: matching script tattoos' },
    { src: 'images/insta-2.jpg', alt: 'Instagram post from the studio' },
    { src: 'images/insta-3.jpg', alt: 'Instagram post from the studio' },
    { src: 'images/insta-4.jpg', alt: 'Instagram post: four-leaf clover tattoos' },
    { src: 'images/insta-5.jpg', alt: 'Instagram post: mother and daughter' },
    { src: 'images/insta-6.jpg', alt: 'Instagram post: butterflies and elephants' }
  ];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // --- Trustpilot marquee: 2 rows of 15 cards, each duplicated for the loop ---
  function initials(name) {
    return name.split(/\s+/).map(function (p) { return p.charAt(0); }).join('').replace('.', '').toUpperCase().slice(0, 2);
  }

  function tpCardHtml(r) {
    return '<article class="tp-card">' +
      '<div class="tp-card-top"><span class="tp-stars" aria-label="5 out of 5 stars"><i>★</i><i>★</i><i>★</i><i>★</i><i>★</i></span><span class="tp-quote" aria-hidden="true">“”</span></div>' +
      '<h3>' + escapeHtml(r.title) + '</h3>' +
      '<p>' + escapeHtml(r.text) + '</p>' +
      '<div class="tp-card-foot">' +
      '<span class="tp-avatar" aria-hidden="true">' + escapeHtml(initials(r.name)) + '</span>' +
      '<div class="tp-card-author"><strong>' + escapeHtml(r.name) + '</strong>' +
      (r.city ? '<span>' + escapeHtml(r.city) + '</span>' : '') + '</div>' +
      '<span class="tp-verified">Verified</span>' +
      '</div></article>';
  }

  var tpRows = document.getElementById('tpRows');
  if (tpRows && TP_REVIEWS.length) {
    var half = Math.ceil(TP_REVIEWS.length / 2);
    var rows = [
      { reviews: TP_REVIEWS.slice(0, half), reverse: false },
      { reviews: TP_REVIEWS.slice(half), reverse: true }
    ];
    var CARD_WIDTH = 380; // approx. card width incl. gap
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
  // Videoer bruger data-src + poster, så de først hentes når de er i syne,
  // og viser et stillbillede indtil da (også på mobil).
  function mediaHtml(item) {
    if (item.type === 'video') {
      var poster = item.src.replace(/\.mp4$/, '-poster.jpg');
      return '<video data-src="' + escapeHtml(item.src) + '" poster="' + escapeHtml(poster) + '" muted playsinline loop preload="none" aria-label="' + escapeHtml(item.alt) + '"></video>' +
        '<span class="media-play-badge" aria-hidden="true">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>' +
        '</span>';
    }
    return '<img src="' + escapeHtml(item.src) + '" alt="' + escapeHtml(item.alt) + '" loading="lazy" decoding="async">';
  }

  // Videoer i grids/marquee afspiller lydløst når de er i syne — også på
  // mobil, hvor der ikke er hover. Kun synlige videoer hentes og spiller.
  function enableAutoplayInView(container) {
    var vids = container.querySelectorAll('video[data-src]');
    if (!vids.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.src) v.src = v.getAttribute('data-src');
          if (!reduce) v.play().catch(function () {});
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: 0.4 });
    vids.forEach(function (v) { obs.observe(v); });
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
        ' aria-label="' + escapeHtml((item.type === 'video' ? 'Play video: ' : 'Show image: ') + item.alt) + '">' +
        mediaHtml(item) +
        '<span class="insp-item-overlay" aria-hidden="true">' +
        '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>' +
        '</span></button>';
    };

    // Hver række viser ALLE felter (i hver sin rækkefølge og retning), så en
    // fuld skærmbredde fyldes med unikt arbejde, før noget gentages. Det
    // undgår, at de samme videoer står side om side på brede skærme.
    var GAL_ITEM_WIDTH = 240;
    var galScreen = Math.max(window.innerWidth, window.screen ? window.screen.width : 0, 1440);
    var galCells = INSPIRATION_MEDIA.map(function (item, i) { return { item: item, idx: i }; });
    var galMid = Math.floor(galCells.length / 2);
    var galRows = [
      { cells: galCells, reverse: false },
      // Række 2: samme felter, men roteret et halvt sæt og modsat retning
      { cells: galCells.slice(galMid).concat(galCells.slice(0, galMid)), reverse: true }
    ];
    galRows.forEach(function (row) {
      if (!row.cells.length) return;
      // Kun så mange kopier at ét spor er bredere end skærmen (undgår tomrum).
      // Med alle felter i rækken bliver det typisk 1 kopi = ingen nabo-gentagelser.
      var copies = Math.max(1, Math.ceil((galScreen * 1.15) / (row.cells.length * GAL_ITEM_WIDTH)));
      var groupHtml = '';
      var dupHtml = '';
      for (var c = 0; c < copies; c++) {
        row.cells.forEach(function (cell) {
          groupHtml += galTile(cell.item, cell.idx, false);
          dupHtml += galTile(cell.item, cell.idx, true);
        });
      }
      var rowEl = document.createElement('div');
      rowEl.className = 'gal-row' + (row.reverse ? ' gal-row-reverse' : '');
      // ~8s pr. felt giver en rolig glidning uanset antal medier
      rowEl.style.setProperty('--gal-dur', Math.round(row.cells.length * copies * 8) + 's');
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
    enableAutoplayInView(inspGrid);
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
      a.setAttribute('aria-label', item.alt + ', opens Instagram');
      a.innerHTML = mediaHtml(item) +
        '<span class="ig-item-overlay" aria-hidden="true">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>' +
        '</span>';
      igGrid.appendChild(a);
    });
    enableAutoplayInView(igGrid);
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

  // --- Størrelsesguide: indlæs + afspil videoerne først når de er i syne ---
  var sizeVideos = document.querySelectorAll('.size-media video[data-src]');
  if (sizeVideos.length && 'IntersectionObserver' in window) {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var sizeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.src) v.src = v.getAttribute('data-src'); // hentes først her (loadtid)
          if (!reduceMotion) v.play().catch(function () {});
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    sizeVideos.forEach(function (v) { sizeObs.observe(v); });
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
