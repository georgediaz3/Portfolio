gsap.registerPlugin(CustomEase);

CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

function initMenu() {
  const navWrap = document.querySelector(".nav");
  const menuToggle = document.querySelectorAll("[data-menu-toggle]");
  const overlay = navWrap.querySelector(".overlay");

  const openMenu = () => {
    navWrap.setAttribute("data-nav", "open");
    gsap.fromTo(
      navWrap,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.5, ease: "main" }
    );
  };

  const closeMenu = () => {
    navWrap.setAttribute("data-nav", "closed");
    gsap.to(navWrap, { autoAlpha: 0, duration: 0.5, ease: "main" });
  };

  menuToggle.forEach((toggle) =>
    toggle.addEventListener("click", () => {
      const state = navWrap.getAttribute("data-nav");
      state === "closed" ? openMenu() : closeMenu();
    })
  );

  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navWrap.getAttribute("data-nav") === "open") {
      closeMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", initMenu);

