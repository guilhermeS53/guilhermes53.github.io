const navbar = document.querySelector(".navbar");
const hamburger = document.getElementById("hamburgerBtn");
const mobileLinks = document.getElementById("mobileLinks");
const sidebarOverlay = document.getElementById("sidebarOverlay");

/* ===== Sidebar Mobile ===== */
function openSidebar() {
  hamburger?.classList.add("active");
  mobileLinks?.classList.add("active");
  sidebarOverlay?.classList.add("active");
  document.body.style.overflow = "hidden"; // trava scroll
}

function closeSidebar() {
  hamburger?.classList.remove("active");
  mobileLinks?.classList.remove("active");
  sidebarOverlay?.classList.remove("active");
  document.body.style.overflow = "";
}

hamburger?.addEventListener("click", function () {
  const isOpen = mobileLinks?.classList.contains("active");
  isOpen ? closeSidebar() : openSidebar();
});

/* Fecha sidebar ao clicar no overlay */
sidebarOverlay?.addEventListener("click", closeSidebar);

/* Fecha sidebar ao clicar num link */
document.querySelectorAll("#mobileLinks a").forEach(link => {
  link.addEventListener("click", closeSidebar);
});

/* Scroll → navbar shadow */
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 0) navbar.classList.add("active");
  else navbar.classList.remove("active");
});

/* ===== Theme Toggle (Light/Dark) ===== */

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === "dark" ? "#0b1220" : "#f8fafc";
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return setTheme(saved);

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  setTheme(prefersDark ? "dark" : "light");
}

document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);

initTheme();

/* ===== Scroll Reveal (Intersection Observer) ===== */
const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach((el) => revealObserver.observe(el));
