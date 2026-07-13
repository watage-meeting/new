const menu = document.querySelector(".menu");
const nav = document.querySelector(".navlinks");

menu?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open") ?? false;
  menu.textContent = isOpen ? "×" : "☰";
  menu.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  }),
);

const revealObserver = new IntersectionObserver(
  (entries, observer) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }),
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));

document.querySelector(".more")?.addEventListener("click", (event) => {
  document
    .querySelectorAll(".news-row.hidden")
    .forEach((row) => row.classList.remove("hidden"));
  event.currentTarget.remove();
});

document.querySelectorAll(".brand").forEach((brand) =>
  brand.addEventListener("mouseenter", (event) => {
    for (let i = 0; i < 6; i++) {
      const seed = document.createElement("span");
      seed.className = "seed-fly";
      seed.textContent = "✦";
      seed.style.left = `${event.clientX}px`;
      seed.style.top = `${event.clientY}px`;
      seed.style.setProperty("--x", `${Math.random() * 120 - 60}px`);
      seed.style.setProperty("--y", `${-40 - Math.random() * 100}px`);
      document.body.appendChild(seed);
      setTimeout(() => seed.remove(), 1300);
    }
  }),
);
