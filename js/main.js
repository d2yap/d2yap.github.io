const projects = [
  {
    title: "8mb-electron",
    description:
      "A program that simplifies video compression for platforms with video size limits ",
    tags: ["JavaScript", "Electron", "FFMPEG"],
    link: "https://github.com/d2yap/8mb-electron",
    featured: true,
  },
  {
    title: "Allusion-Deep",
    description:
      "A fork of Allusion, a free and open source desktop application for managing your visual library. Adding local image tagging using a WD14-based model for tagging.",
    tags: ["JavaScript", "Electron", "Python", "Pytorch"],
    link: "https://github.com/d2yap/Allusion-Deep",
  },
  {
    title: "PINnote",
    description:
      'A mobile application about "pinning" notes to your current location.',
    tags: ["Flutter", "Dart", "Firebase"],
    link: "https://github.com/d2yap/pinnote",
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

projects.forEach((p) => {
  const card = document.createElement("a");
  card.href = p.link;
  card.target = "_blank";
  card.className = "repo-card";

  card.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    <div class="tags">${p.tags.join(" • ")}</div>
  `;

  projectContainer.appendChild(card);
});

// navigator
const pages = document.querySelectorAll(".page");
const nav = document.querySelectorAll(".navigation p");

nav.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    pages[i].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// toggle
const toggle = document.querySelector(".toggle");
toggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

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
  console.log(x, y);

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

// spawn continuously
setInterval(spawnWord, 500);
