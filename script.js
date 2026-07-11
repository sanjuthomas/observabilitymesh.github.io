(() => {
  const tabs = Array.from(document.querySelectorAll("[data-path]"));
  const panels = Array.from(document.querySelectorAll("[data-path-panel]"));

  function activate(path) {
    tabs.forEach((tab) => {
      const active = tab.dataset.path === path;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    panels.forEach((panel) => {
      const active = panel.dataset.pathPanel === path;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });

    requestAnimationFrame(() => {
      document
        .querySelectorAll(`[data-path-panel="${path}"] .reveal`)
        .forEach((el) => el.classList.add("is-visible"));
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.path));
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
})();
