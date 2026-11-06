// Enhancement only: links, content, video and disclosures work without JS.
const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const closeMenu = (restoreFocus = false) => {
  menu.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  if (restoreFocus) menu.focus();
};
menu.hidden = false;
document.documentElement.classList.add("js");
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true")
    closeMenu(true);
});
navigation.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;
  closeMenu();
  if (link.hash) {
    const section = document.querySelector(link.hash);
    const destination = section?.querySelector("h2") || section;
    if (destination) {
      event.preventDefault();
      history.pushState(null, "", link.hash);
      section.scrollIntoView();
      destination.setAttribute("tabindex", "-1");
      destination.focus({ preventScroll: true });
    }
  }
});
const narrow = window.matchMedia("(max-width: 800px)");
narrow.addEventListener("change", () => closeMenu());

const filters = document.querySelector("#program-filters");
const programs = [...document.querySelectorAll(".program")];
const count = document.querySelector("#program-count");
filters.hidden = false;
filters.addEventListener("click", (event) => {
  const selected = event.target.closest("button[data-degree]");
  if (!selected) return;
  filters
    .querySelectorAll("button")
    .forEach((button) =>
      button.setAttribute("aria-pressed", String(button === selected)),
    );
  let visible = 0;
  programs.forEach((program) => {
    const show =
      selected.dataset.degree === "all" ||
      program.dataset.degree === selected.dataset.degree;
    if (!show) program.open = false;
    program.hidden = !show;
    if (show) visible++;
  });
  count.textContent = `${visible} program ditampilkan`;
});
