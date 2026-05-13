# Hero Media — Landing Page

## Sådan tilpasser du siden

### 1. Hero-video (9:16)
Læg din 9:16 video som `assets/hero.mp4` og evt. et thumbnail som `assets/hero-poster.jpg`.

### 2. Calendly-link
Åbn `index.html`, find linjen der starter med `data-url="https://calendly.com/YOUR-CALENDLY-LINK/...` og udskift `YOUR-CALENDLY-LINK` med dit eget Calendly-brugernavn (fx `sinan-heromedia`).

### 3. Billeder
Læg disse i `assets/`:
- `about.jpg` — billede til About-sektion
- `case-1.jpg`, `case-2.jpg`, `case-3.jpg` — case-billeder
- `founder.jpg` — billede af Sinan til founder's letter

### 4. Tekst
Al tekst kan ændres direkte i `index.html`.

---

## Sådan deployer du (nemt + gratis)

### Vercel (anbefales)
1. Gå til [vercel.com](https://vercel.com) og log ind
2. Klik "Add New… → Project"
3. Drag-and-drop `hero-media`-mappen
4. Klik Deploy — siden er live på 30 sekunder

### Tilkobl dit domæne
1. I Vercel-dashboard → Settings → Domains
2. Tilføj `heromedia.dk` (eller dit domæne)
3. Vercel viser dig hvilke DNS-records du skal tilføje hos din domæneudbyder
4. Når DNS er propageret (få minutter til en time), er siden live på dit domæne

### Alternativ: Netlify
Samme proces — bare drag-and-drop på [app.netlify.com/drop](https://app.netlify.com/drop)

---

## Fremtidige ændringer
Bare bed mig om ændringer — jeg redigerer filerne, og du re-deployer ved at trække den opdaterede mappe ind igen (eller sætter GitHub-deploy op for automatiske opdateringer).
