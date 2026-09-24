const projects = [
  {
    title: "8mb-electron",
    description:
      "A program that simplifies video compression for platforms with video size limits ",
    tags: ["JavaScript", "Electron", "FFmpeg"],
    link: "https://github.com/d2yap/8mb-electron",
  },
  {
    title: "PINnote",
    description:
      'A mobile application about "pinning" notes to your current location.',
    tags: ["Flutter", "Dart", "Firebase"],
    link: "https://github.com/d2yap/pinnote",
  },
  {
    title: "Allusion-Deep",
    description:
      "A fork of Allusion, a free and open source desktop application for managing your visual library. Adding local image tagging using a WD14-based model for tagging.",
    tags: ["TypeScript", "Electron", "Python", "Pytorch"],
    link: "https://github.com/d2yap/Allusion-Deep",
  },
  {
    title: "FFXIV Playtime Tracker",
    description: "A FFXIV plugin used for tracking playtime.",
    tags: ["C#", "Plugin", "SQLite"],
    link: "https://github.com/d2yap/playtime-tracker",
  },
  {
    title: "github-download-button",
    description:
      "A browser extension for clearly labeling the releases button on GitHub for casual users.",
    tags: ["Javascript", "Firefox", "Extension"],
    link: "https://github.com/d2yap/github-download-button",
  },
];
const projectContainer = document.getElementById("projects-items");

// Build cards with DOM APIs so project data can never be parsed as markup.
projects.forEach((p) => {
  const card = document.createElement("a");
  card.href = p.link;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.className = "repo-card";

  const title = document.createElement("h3");
  title.textContent = p.title;

  const description = document.createElement("p");
  description.textContent = p.description;

  const tags = document.createElement("div");
  tags.className = "tags";
  tags.textContent = p.tags.join(" • ");

  card.append(title, description, tags);
  projectContainer?.append(card);
});

// navigator
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".navigation a");
const scroller = document.querySelector(".main");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // resolve the target from the href, so links never rely on DOM order
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// highlight whichever section is currently snapped into view
if (scroller && pages.length > 0 && navLinks.length > 0) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isActive = link.hash === `#${entry.target.id}`;
          link.classList.toggle("active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { root: scroller, threshold: 0.5 },
  );

  pages.forEach((page) => spy.observe(page));
}

// toggle
const toggle = document.querySelector(".toggle");
const root = document.documentElement;

function setTheme(isDark, persist) {
  root.classList.toggle("dark", isDark);

  if (toggle) {
    toggle.setAttribute("aria-pressed", String(isDark));
  }

  if (persist) {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {
      /* storage unavailable (private mode) */
    }
  }
}

if (toggle) {
  // the inline <head> script already applied the stored/system theme
  setTheme(root.classList.contains("dark"), false);

  toggle.addEventListener("click", () => {
    setTheme(!root.classList.contains("dark"), true);
  });
}

// words
const words = [
  "node",
  "react",
  "css",
  "html",
  "canvas",
  "flutter",
  "motion",
  "software",
  "javascript",
  "sql",
  "design",
  "web",
  "learning",
  "modern",
  "dev",
];

const container = document.querySelector(".title");

let lastWord = null;
let spawnTimer = null;
let titleVisible = false;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// preventing duplicates in a row
function getWord() {
  let word;
  do {
    word = words[Math.floor(Math.random() * words.length)];
  } while (word === lastWord);
  lastWord = word;
  return word;
}

function spawnWord() {
  if (!container) return;

  const wrapper = document.createElement("div");
  wrapper.className = "random";

  const p = document.createElement("p");
  p.textContent = getWord();

  wrapper.appendChild(p);
  container.appendChild(wrapper);

  // random position
  const maxX = container.clientWidth - 80; // rough width buffer
  const maxY = container.clientHeight - 20; // rough height buffer

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  wrapper.style.left = `${x}px`;
  wrapper.style.top = `${y}px`;
  wrapper.classList.add("show");
  // fade out later
  setTimeout(() => {
    wrapper.classList.remove("show");
    wrapper.classList.add("fade");
  }, 2000);

  // remove
  setTimeout(() => {
    wrapper.remove();
  }, 3000);
}

// only animate while the title page is on screen and the tab is visible
function startWords() {
  if (spawnTimer !== null || !container || reduceMotion.matches) return;

  spawnWord();
  spawnTimer = window.setInterval(spawnWord, 500);
}

function stopWords() {
  if (spawnTimer === null) return;

  window.clearInterval(spawnTimer);
  spawnTimer = null;
}

function syncWords() {
  if (titleVisible && !document.hidden) {
    startWords();
  } else {
    stopWords();
  }
}

if (container && !reduceMotion.matches) {
  new IntersectionObserver(
    ([entry]) => {
      titleVisible = entry.isIntersecting;
      syncWords();
    },
    { threshold: 0.25 },
  ).observe(container);

  document.addEventListener("visibilitychange", syncWords);
}
