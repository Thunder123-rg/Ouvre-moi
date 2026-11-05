const pages = document.querySelectorAll(".page");
const counter = document.getElementById("counter");
const navigation = document.getElementById("navigation");
const navLabel = document.getElementById("navLabel");

let currentPage = 1;
const totalPages = pages.length;

const labels = [
  "INTRODUCTION",
  "UNE ATTENTION",
  "LES ANCIENS RIVAUX",
  "NOTRE COMPLICITÉ",
  "NOS PETITS DÉLIRES",
  "UNE AMITIÉ PRÉCIEUSE",
  "POUR OUMOU"
];

function showPage(number) {
  if (number < 1 || number > totalPages) return;

  pages.forEach(page => page.classList.remove("active"));

  currentPage = number;

  document.getElementById(`page${number}`).classList.add("active");

  counter.textContent =
    String(number).padStart(2, "0") + " / " +
    String(totalPages).padStart(2, "0");

  navLabel.textContent = labels[number - 1];

  navigation.style.display = number === 1 ? "none" : "flex";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (number === totalPages) {
    createConfetti();
  }
}

function nextPage() {
  showPage(currentPage + 1);
}

function previousPage() {
  showPage(currentPage - 1);
}

function restart() {
  const letter = document.getElementById("letter");
  const finalMessage = document.getElementById("finalMessage");
  const letterButton = document.getElementById("openLetter");

  letter.classList.add("hidden");
  finalMessage.classList.add("hidden");
  letterButton.classList.remove("hidden");

  showPage(1);
}

// Ouverture de la lettre
function openLetter() {
  const letter = document.getElementById("letter");
  const button = document.getElementById("openLetter");

  button.classList.add("hidden");
  letter.classList.remove("hidden");

  setTimeout(() => {
    letter.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 1500);

  setTimeout(() => {
    document.getElementById("finalMessage")
      .classList.remove("hidden");

    createConfetti();
  }, 5000);
}

// Étoiles décoratives
function createStars() {
  const container = document.getElementById("stars");

  for (let i = 0; i < 35; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.textContent = Math.random() > 0.5 ? "✦" : "✧";

    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.fontSize = (8 + Math.random() * 13) + "px";
    star.style.animationDelay = Math.random() * 3 + "s";

    container.appendChild(star);
  }
}

// Pluie de fleurs, étoiles et cœurs
function createConfetti() {
  const symbols = ["♡", "✦", "🌸", "♥", "✧", "✨"];

  for (let i = 0; i < 55; i++) {
    const item = document.createElement("span");

    item.className = "confetti";
    item.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    item.style.left = Math.random() * 100 + "vw";
    item.style.fontSize = (12 + Math.random() * 17) + "px";
    item.style.animationDuration = (3 + Math.random() * 4) + "s";
    item.style.animationDelay = Math.random() * 2 + "s";

    document.body.appendChild(item);

    setTimeout(() => item.remove(), 8000);
  }
}

// Navigation au clavier
document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") nextPage();
  if (event.key === "ArrowLeft") previousPage();
});

// Démarrage
createStars();
showPage(1);
