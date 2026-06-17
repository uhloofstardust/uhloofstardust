/* ═══════════════════════════════════════════════════
   SANVED BANGALE — script.js
   ═══════════════════════════════════════════════════ */

/* ── DATA ──────────────────────────────────────────
   Edit these to update non-file-based content.
   Work, books, and postcards live in assets/ as data files/images.
   ─────────────────────────────────────────────── */

const now = [
  {
    key: "studying",
    value: "Master's at IIT Madras, Data Science and AI",
    link: null,
  },
  {
    key: "role",
    value: "DSAI Placement Core, IIT Madras",
    link: "https://placement.iitm.ac.in/ourteam",
  },
  {
    key: "work",
    value: "Interning at Bajaj Auto, Data Science Intern",
    link: null,
  },
  {
    key: "reading",
    value: "The Remains of the Day, Kazuo Ishiguro",
    link: null,
  },
];

const contact = [
  {
    label: "github",
    text: "uhloofstardust",
    href: "https://github.com/uhloofstardust",
  },
  {
    label: "linkedin",
    text: "sanved23",
    href: "https://in.linkedin.com/in/sanved23",
  },
  {
    label: "email",
    text: "sanvedbangale23@gmail.com",
    href: "mailto:sanvedbangale23@gmail.com",
  },
  {
    label: "iitm",
    text: "da25m027@smail.iitm.ac.in",
    href: "mailto:da25m027@smail.iitm.ac.in",
  },
  {
    label: "iitm (placement)",
    text: "damtcouncillor@smail.iitm.ac.in",
    href: "mailto:damtcouncillor@smail.iitm.ac.in",
  },
];

/*
   ── ASSETS LAYOUT ────────────────────────────────
   assets/
     work.js              ← edit window.WORK_DATA here
     books/
       books.js          ← edit window.BOOKS_DATA here
       cover-name.jpg    ← optional cover images
     postcards/
       manifest.js       ← edit window.POSTCARDS array here
       photo1.jpg        ← postcard images
   These .js files are loaded as <script> tags in index.html,
   so they work on file:// locally and on GitHub Pages alike.
   ─────────────────────────────────────────────── */

/* ── BOOK COLOUR PALETTES (fallback when no image) */
const BOOK_LIGHT = [
  { bg: "#e8d5c4", text: "#3a2820" },
  { bg: "#d4c5d8", text: "#2a1e30" },
  { bg: "#c5d4d0", text: "#1a2e2a" },
  { bg: "#d8c5c5", text: "#2e1e1e" },
  { bg: "#c5ccd4", text: "#1a2030" },
  { bg: "#d4d0c5", text: "#2a2820" },
];
const BOOK_DARK = [
  { bg: "#3a2820", text: "#e8d5c4" },
  { bg: "#2a1e30", text: "#d4c5d8" },
  { bg: "#1a2e2a", text: "#c5d4d0" },
  { bg: "#2e1e1e", text: "#d8c5c5" },
  { bg: "#1a2030", text: "#c5ccd4" },
  { bg: "#2a2820", text: "#d4d0c5" },
];

function bookPalette(i) {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  const pal = dark ? BOOK_DARK : BOOK_LIGHT;
  return pal[i % pal.length];
}

/* ── RENDER: NOW ─────────────────────────────── */
function renderNow() {
  const el = document.getElementById("now-list");
  if (!el) return;

  el.innerHTML = now
    .map(
      ({ key, value, link }) => `
    <div class="now-item">
      <dt class="now-key">${key}</dt>
      <dd class="now-value">
        ${link ? `<a class="now-link" href="${link}" target="_blank" rel="noopener noreferrer">${value}<span aria-hidden="true">↗</span></a>` : value}
      </dd>
    </div>
  `,
    )
    .join("");
}

/* ── RENDER: WORK ─────────────────────────────── */
function renderWork() {
  const el = document.getElementById("work-grid");
  if (!el) return;

  const work = Array.isArray(window.WORK_DATA) ? window.WORK_DATA : [];

  el.innerHTML = work
    .map(
      (item) => `
    <article class="work-card">
      <div class="work-card-inner">
        <div class="work-card-header">
          <h3 class="work-card-title">
            ${
              item.link
                ? `<a class="work-card-link" href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}<span aria-hidden="true">↗</span></a>`
                : item.title
            }
          </h3>
          <span class="work-card-org">${item.org}</span>
        </div>
        <p class="work-card-desc">${item.desc}</p>
        <div class="work-card-tags" aria-label="Technologies">
          ${(item.tags || []).map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
    </article>
  `,
    )
    .join("");
}

/* ── RENDER: BOOKS — reads window.BOOKS_DATA (assets/books/books.js) */
function renderBooks() {
  const data = window.BOOKS_DATA || { recent: [], favourites: [] };
  renderShelf("recent-books", data.recent || [], 0);
  renderShelf("fav-books", data.favourites || [], (data.recent || []).length);
}

function bookCardHTML(book, index, offset) {
  if (book.image) {
    return `
      <div class="book-card book-card--img"
           style="background-image:url('assets/books/${book.image}')"
           title="${book.author}">
        ${book.link ? `<a href="${book.link}">` : ""}
          <div class="book-inner">
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
          </div>
        ${book.link ? `</a>` : ""}
      </div>
    `;
  }

  const { bg, text } = bookPalette(index + offset);
  return `
    <div class="book-card"
         style="background:${bg};color:${text}"
         title="${book.author}">
      <div class="book-inner">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
      </div>
    </div>
  `;
}

function renderShelf(id, books, offset) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = books.map((b, i) => bookCardHTML(b, i, offset)).join("");
}

/* ── RENDER: ANIME — reads window.ANIME_DATA (assets/anime/anime.js) */
function renderAnime() {
  const el = document.getElementById("anime-shelf");
  if (!el) return;
  const list = window.ANIME_DATA || [];
  el.innerHTML = list
    .map((item, i) => {
      if (item.image) {
        return `
        <div class="book-card book-card--img"
             style="background-image:url('assets/anime/${item.image}')"
             title="${item.studio}">
          ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">` : ""}
          <div class="book-inner">
            <div class="book-title">${item.title}</div>
            <div class="book-author">${item.studio}</div>
          </div>
          ${item.link ? `</a>` : ""}
        </div>`;
      }
      const { bg, text } = bookPalette(i);
      return `
      <div class="book-card" style="background:${bg};color:${text}" title="${item.studio}">
        <div class="book-inner">
          <div class="book-title">${item.title}</div>
          <div class="book-author">${item.studio}</div>
        </div>
      </div>`;
    })
    .join("");
}

/* ── RENDER: POSTCARDS — reads window.POSTCARDS (assets/postcards/manifest.js) */
function renderPostcards() {
  const wrap = document.getElementById("postcards-wrap");
  if (!wrap) return;

  const images = Array.isArray(window.POSTCARDS) ? window.POSTCARDS : [];

  if (images.length === 0) {
    wrap.innerHTML = `
      <div class="postcards-empty" role="status">
        <span class="postcards-empty-main">✉&ensp;somewhere in transit&hellip;</span>
        <span class="postcards-empty-sub">postcards from around the world</span>
      </div>
    `;
    return;
  }

  wrap.innerHTML = `
    <div class="postcards-grid">
      ${images
        .map(
          (filename, i) => `
        <figure
          class="postcard"
          tabindex="0"
          role="button"
          aria-label="Open postcard ${i + 1}"
          data-postcard-src="assets/postcards/${filename}"
          data-postcard-alt="Postcard ${i + 1}"
        >
          <img
            class="postcard-img"
            src="assets/postcards/${filename}"
            alt="Postcard ${i + 1}"
            loading="lazy"
          />
          <div class="postcard-stamp" aria-hidden="true">✦</div>
          <figcaption class="postcard-meta">
            <span class="postcard-index">No.&thinsp;${String(i + 1).padStart(2, "0")}</span>
          </figcaption>
        </figure>
      `,
        )
        .join("")}
    </div>
  `;
}

/* ── POSTCARD DIALOG ─────────────────────────── */
(function initPostcardDialog() {
  const dialog = document.getElementById("postcard-dialog");
  const image = document.getElementById("postcard-dialog-img");
  const close = document.getElementById("postcard-dialog-close");
  const wrap = document.getElementById("postcards-wrap");

  if (!dialog || !image || !wrap) return;

  function openPostcard(card) {
    image.src = card.dataset.postcardSrc;
    image.alt = card.dataset.postcardAlt;
    dialog.showModal();
  }

  wrap.addEventListener("click", (event) => {
    const card = event.target.closest(".postcard");
    if (card) openPostcard(card);
  });

  wrap.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".postcard");
    if (!card) return;
    event.preventDefault();
    openPostcard(card);
  });

  close?.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
    image.alt = "";
  });
})();

/* ── RENDER: CONTACT ─────────────────────────── */
function renderContact() {
  const el = document.getElementById("contact-list");
  if (!el) return;

  el.innerHTML = contact
    .map(
      (c) => `
    <div class="contact-item">
      <span class="contact-label">${c.label}</span>
      <a
        class="contact-link"
        href="${c.href}"
        target="${c.href.startsWith("mailto") ? "_self" : "_blank"}"
        rel="noopener noreferrer"
      >${c.text}</a>
    </div>
  `,
    )
    .join("");
}

/* ── THEME ───────────────────────────────────── */
(function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById("theme-btn");
  const saved = localStorage.getItem("sb-theme");
  const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  root.setAttribute("data-theme", saved || "dark");

  btn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("sb-theme", next);
    renderBooks(); // re-render to swap book card colours
    renderAnime();
  });
})();

/* ── NAVIGATION ──────────────────────────────── */
(function initNav() {
  const nav = document.getElementById("nav");
  const navList = document.getElementById("nav-list");
  const hamburger = document.getElementById("hamburger");
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Scroll border
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    },
    { passive: true },
  );

  // Active link
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) =>
            l.classList.toggle(
              "is-active",
              l.getAttribute("href") === `#${id}`,
            ),
          );
        }
      }
    },
    {
      rootMargin: `-${getComputedStyle(
        document.documentElement,
      ).getPropertyValue("--nav-h")} 0px -55% 0px`,
    },
  );

  sections.forEach((s) => io.observe(s));

  // Mobile menu
  hamburger?.addEventListener("click", () => {
    const open = navList.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", String(open));
  });

  links.forEach((l) =>
    l.addEventListener("click", () => {
      navList.classList.remove("is-open");
      hamburger?.setAttribute("aria-expanded", "false");
    }),
  );
})();

/* ── SCROLL REVEAL ───────────────────────────── */
(function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.07 },
  );

  document.querySelectorAll(".section").forEach((s) => io.observe(s));
})();

/* ── CHERRY BLOSSOM ANIMATION ────────────────── */
(function sakura() {
  const canvas = document.getElementById("sakura");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const COUNT = 14;
  let W,
    H,
    petals = [],
    raf;

  const LIGHT_PAL = [
    "#d0b8f0",
    "#e8b0d8",
    "#c8b8f4",
    "#f0c0e0",
    "#b8c8f0",
    "#e0b8f0",
  ];
  const DARK_PAL = [
    "#90d0f0",
    "#b0c8f8",
    "#f0b8d8",
    "#c8b0f0",
    "#a0d8f4",
    "#f0c0e0",
  ];

  function pal() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    return dark ? DARK_PAL : LIGHT_PAL;
  }
  function rnd(a, b) {
    return a + Math.random() * (b - a);
  }

  function drawPetal(p) {
    const r = p.r;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(r * 0.9, r * 0.3, r * 1.2, -r * 0.5, r, -r * 0.95);
    ctx.bezierCurveTo(r * 0.5, -r * 1.6, r * 0.1, -r * 1.45, 0, -r * 0.9);
    ctx.bezierCurveTo(-r * 0.1, -r * 1.45, -r * 0.5, -r * 1.6, -r, -r * 0.95);
    ctx.bezierCurveTo(-r * 1.2, -r * 0.5, -r * 0.9, r * 0.3, 0, 0);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, -r * 0.2);
    ctx.bezierCurveTo(r * 0.2, -r * 0.6, r * 0.1, -r * 1.0, 0, -r * 0.9);
    ctx.bezierCurveTo(-r * 0.1, -r * 1.0, -r * 0.2, -r * 0.6, 0, -r * 0.2);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.14)";
    ctx.fill();

    ctx.restore();
  }

  function makePetal(scatter) {
    const p = pal();
    return {
      x: scatter ? rnd(0, W) : rnd(-20, W + 20),
      y: scatter ? rnd(-20, H) : rnd(-80, -20),
      r: rnd(5.5, 11),
      rot: rnd(0, Math.PI * 2),
      rotV: rnd(-0.014, 0.014),
      vx: rnd(-0.25, 0.25),
      vy: rnd(0.22, 0.55),
      swing: rnd(0, Math.PI * 2),
      swingSpeed: rnd(0.005, 0.012),
      alpha: rnd(0.28, 0.58),
      color: p[Math.floor(Math.random() * p.length)],
    };
  }

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    const p = pal();

    for (const petal of petals) {
      drawPetal(petal);
      petal.swing += petal.swingSpeed;
      petal.x += petal.vx + Math.sin(petal.swing) * 0.44;
      petal.y += petal.vy;
      petal.rot += petal.rotV;

      if (petal.y > H + 30 || petal.x < -40 || petal.x > W + 40) {
        Object.assign(petal, makePetal(false));
        petal.color = p[Math.floor(Math.random() * p.length)];
      }
    }

    raf = requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else tick();
  });

  resize();
  petals = Array.from({ length: COUNT }, () => makePetal(true));
  tick();
})();

/* ── INIT ────────────────────────────────────── */
renderNow();
renderWork();
renderContact();
renderBooks();
renderAnime();
renderPostcards();
