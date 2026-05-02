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
  if (document.documentElement.style.filter === "invert(100%)") {
    document.documentElement.style.filter = "invert(0%)";
  } else {
    document.documentElement.style.filter = "invert(100%)";
  }
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
