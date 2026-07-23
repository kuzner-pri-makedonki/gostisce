// Mobilni meni
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const expanded = navLinks.classList.contains("open");
    navToggle.setAttribute("aria-expanded", String(expanded));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

// Samodejno izmeri višino glave strani, da se vsebina ob kliku na meni
// ne skrije pod njo (glava ima lahko različno višino na različnih zaslonih)
const siteHeader = document.querySelector(".site-header");
function setHeaderHeightVar() {
  if (!siteHeader) return;
  const h = siteHeader.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-h", `${h + 24}px`);
}
setHeaderHeightVar();
window.addEventListener("resize", setHeaderHeightVar);
window.addEventListener("load", setHeaderHeightVar);

// Urnik — samodejno zazna, ali je trenutno odprto/zaprto, in poudari današnji dan
const HOURS = {
  0: [11, 17], // nedelja
  1: [10, 17],
  2: [10, 17],
  3: [10, 17],
  4: [10, 17],
  5: [10, 19],
  6: [11, 19],
};
const hoursList = document.getElementById("hoursList");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");

if (hoursList && statusDot && statusText) {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const [open, close] = HOURS[day];
  const isOpen = hour >= open && hour < close;

  hoursList.querySelectorAll("li").forEach((li) => {
    if (Number(li.dataset.day) === day) li.classList.add("today");
  });

  if (isOpen) {
    const remaining = close - hour;
    statusDot.classList.remove("closed");
    statusText.textContent =
      remaining <= 1 ? "Kmalu zapiramo" : "Trenutno odprto";
  } else {
    statusDot.classList.add("closed");
    statusText.textContent = "Trenutno zaprto";
  }
}

// Postopno pojavljanje elementov ob scrollanju
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}

// Leto v footerju
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();