/* ========================================
   TATTOO FASHION — LANDING PAGE SCRIPT
   ======================================== */

(function () {
  'use strict';

  /* ==========================================================
     TRUSTPILOT-ANMELDELSER — PLADSHOLDERE
     Erstat titel/tekst/navn/by med de rigtige anmeldelser fra
     dk.trustpilot.com/review/tattoofashion.dk.
     De første 15 vises i øverste række, de sidste 15 i nederste.
     Tilføj/fjern frit — rækkerne renderes automatisk.
     ========================================================== */
  var TP_REVIEWS = [
    { title: 'Fantastisk oplevelse fra start til slut', text: 'Blev taget godt imod, og min tatovør forstod præcis, hvad jeg ville have. Resultatet er bedre, end jeg turde håbe på.', name: 'Mette J.', city: 'København' },
    { title: 'Professionelle og trygge rammer', text: 'Super rent studie og en afslappet stemning. De guidede mig gennem hele forløbet — kan varmt anbefales.', name: 'Jonas P.', city: 'Rødovre' },
    { title: 'Min fineline er perfekt', text: 'Fik lavet en lille fineline-tatovering, og detaljerne sidder lige i skabet. Hurtig tid og fair pris.', name: 'Camilla B.', city: 'Glostrup' },
    { title: 'Kom med en idé — gik med et kunstværk', text: 'De tegnede designet til mig ud fra et par billeder, jeg havde med. Processen var nem, og resultatet taler for sig selv.', name: 'Alexander V.', city: 'Valby' },
    { title: 'Portræt med vanvittige detaljer', text: 'Fik lavet et portræt af min far — ligheden er slående. Tusind tak for det fine arbejde.', name: 'Thomas R.', city: 'Herlev' },
    { title: 'Matchende tatoveringer med min søster', text: 'Sjov og tryg oplevelse — vi er begge vilde med resultatet.', name: 'Louise M.', city: 'Ballerup' },
    { title: 'Lyttede til alle mine ønsker', text: 'Ændrede skitsen flere gange uden brok — det endte helt perfekt.', name: 'Nadia S.', city: 'Vanløse' },
    { title: 'Hurtig tid og topservice', text: 'Skrev mandag og sad i stolen torsdag. Nemmere bliver det ikke.', name: 'Frederik N.', city: 'Taastrup' },
    { title: 'Smukt script — præcis som håbet', text: 'Min håndskrift-tatovering er så fin og skarp. Kunne ikke være mere tilfreds.', name: 'Ida W.', city: 'Frederiksberg' },
    { title: 'Professionel rådgivning om placering', text: 'God og ærlig snak om størrelse og placering, inden vi gik i gang.', name: 'Kasper D.', city: 'Albertslund' },
    { title: 'Min tredje tatovering her', text: 'Kommer altid tilbage — kvaliteten er i top hver eneste gang.', name: 'Julie F.', city: 'Rødovre' },
    { title: 'Realism i verdensklasse', text: 'Skyggerne og detaljerne i min løve er helt vanvittige. Folk spørger, hvor jeg har fået den lavet.', name: 'Martin O.', city: 'København' },
    { title: 'Afslappet stemning og dygtige folk', text: 'Man føler sig velkommen fra det øjeblik, man træder ind ad døren.', name: 'Cecilie T.', city: 'Islev' },
    { title: 'De reddede min gamle tatovering', text: 'Troede den var håbløs — efter cover-uppen er den min favorit.', name: 'Rasmus B.', city: 'Glostrup' },
    { title: 'Fin lille ankeltatovering', text: 'Hurtigt, nemt og næsten smertefrit. Anbefales!', name: 'Anna G.', city: 'Vanløse' },
    { title: 'God opfølgning efter besøget', text: 'Fik klare instruktioner til helingen — alt helede perfekt.', name: 'Simon E.', city: 'Hvidovre' },
    { title: 'Blomstermotiv med fine detaljer', text: 'Min peon-tatovering er så elegant. Præcis den lethed, jeg ønskede mig.', name: 'Maria C.', city: 'Frederiksberg' },
    { title: 'Prisen holdt — ingen overraskelser', text: 'Fik et estimat på forhånd, og det holdt hele vejen igennem.', name: 'Oliver H.', city: 'Brønshøj' },
    { title: 'Perfekt til første gang', text: 'De forklarede alt undervejs, og jeg var helt rolig i stolen.', name: 'Laura K.', city: 'Rødovre' },
    { title: 'Mit sleeve blev bedre end skitsen', text: 'Vi byggede videre på designet undervejs — kunstneren tænkte med hele vejen.', name: 'Nikolaj S.', city: 'Valby' },
    { title: 'Skøn oplevelse med veninderne', text: 'Vi fik matchende motiver — god stemning og flot arbejde.', name: 'Trine P.', city: 'Ballerup' },
    { title: 'Detaljerne gør forskellen', text: 'Selv de tyndeste linjer sidder knivskarpt. Imponerende håndværk.', name: 'Andreas M.', city: 'Herlev' },
    { title: 'Hygiejne i verdensklasse', text: 'Alt blev pakket sterilt ud foran mig — det gav stor tryghed.', name: 'Sara N.', city: 'København' },
    { title: 'Mindetatovering med stor betydning', text: 'De behandlede mit ønske med respekt og omsorg. Tak.', name: 'Henrik J.', city: 'Taastrup' },
    { title: 'Kom igen med hele familien', text: 'Først mig, så min kone og vores søn — alle er vildt tilfredse.', name: 'Michael W.', city: 'Albertslund' },
    { title: 'Cover-up der overgik forventningerne', text: 'Min gamle tatovering er forvandlet til noget, jeg er stolt af at vise frem.', name: 'Sofie H.', city: 'Hvidovre' },
    { title: 'Stort projekt — styr på hele forløbet', text: 'Vi planlagde mit sleeve over flere sessioner, og kommunikationen var i top hele vejen.', name: 'Daniel K.', city: 'Brøndby' },
    { title: 'Tryg som førstegangs-kunde', text: 'Følte mig i gode hænder fra første besked til færdigt resultat.', name: 'Emma L.', city: 'Rødovre' },
    { title: 'Kvalitet til prisen', text: 'Fik præcis pris på forhånd, og de holdt, hvad de lovede. Flot arbejde og god stemning.', name: 'Mikkel A.', city: 'København' },
    { title: 'Anbefaler til alle', text: 'Bedste studie i København — punktum.', name: 'Katrine V.', city: 'Frederiksberg' }
  ];

  /* ==========================================================
     INSPIRATIONS-GALLERI
     Læg nye billeder i images/ og tilføj en linje her — galleriet
     og lightboxen opdaterer sig selv.
     ========================================================== */
  var INSPIRATION_IMAGES = [
    { src: 'images/insta-1.jpg', alt: 'Matchende script-tatoveringer på overarmene' },
    { src: 'images/insta-2.jpg', alt: 'Små matchende motiver på underarmene' },
    { src: 'images/insta-3.jpg', alt: 'Fine fineline blomster-tatoveringer' },
    { src: 'images/insta-4.jpg', alt: 'Matchende firkløver-tatoveringer til hele familien' },
    { src: 'images/insta-5.jpg', alt: 'Matchende tatoveringer på armene — mor og datter' },
    { src: 'images/insta-6.jpg', alt: 'Sommerfugle og elefant-motiver' }
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
      '<div class="tp-card-author"><strong>' + escapeHtml(r.name) + '</strong><span>' + escapeHtml(r.city) + '</span></div>' +
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
    rows.forEach(function (row) {
      if (!row.reviews.length) return;
      var cards = row.reviews.map(tpCardHtml).join('');
      var rowEl = document.createElement('div');
      rowEl.className = 'tp-row' + (row.reverse ? ' tp-row-reverse' : '');
      // ~13s pr. kort giver samme fart uanset antal anmeldelser
      rowEl.style.setProperty('--tp-dur', Math.round(row.reviews.length * 13) + 's');
      rowEl.innerHTML =
        '<div class="tp-track">' +
        '<div class="tp-group">' + cards + '</div>' +
        '<div class="tp-group" aria-hidden="true">' + cards + '</div>' +
        '</div>';
      tpRows.appendChild(rowEl);
    });
  }

  // --- Inspirations-galleri + lightbox ---
  var inspGrid = document.getElementById('inspGrid');
  var lightbox = document.getElementById('inspLightbox');
  var lbImg = document.getElementById('inspLbImg');
  var lbCounter = document.getElementById('inspLbCounter');
  var lbIndex = 0;
  var lastFocus = null;

  if (inspGrid && INSPIRATION_IMAGES.length) {
    INSPIRATION_IMAGES.forEach(function (img, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'insp-item';
      btn.setAttribute('aria-label', 'Vis billede: ' + img.alt);
      btn.innerHTML =
        '<img src="' + escapeHtml(img.src) + '" alt="' + escapeHtml(img.alt) + '" loading="lazy" decoding="async">' +
        '<span class="insp-item-overlay" aria-hidden="true">' +
        '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>' +
        '</span>';
      btn.addEventListener('click', function () { openLightbox(i); });
      inspGrid.appendChild(btn);
    });
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
    if (lastFocus) lastFocus.focus();
  }

  function stepLightbox(dir) {
    lbIndex = (lbIndex + dir + INSPIRATION_IMAGES.length) % INSPIRATION_IMAGES.length;
    updateLightbox();
  }

  function updateLightbox() {
    var img = INSPIRATION_IMAGES[lbIndex];
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCounter.textContent = (lbIndex + 1) + ' / ' + INSPIRATION_IMAGES.length;
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

  // --- Header: mørk baggrund når der scrolles ---
  var header = document.getElementById('lpHeader');
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 24);
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
