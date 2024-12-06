gsap.registerPlugin(CustomEase);

CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

function initMenu() {
  const navWrap = document.querySelector(".nav");
  const overlay = navWrap.querySelector(".overlay");
  const menu = navWrap.querySelector(".menu");
  const menuButton = document.querySelector("[data-menu-toggle]");
  let menuOpen = false;

  const openMenu = () => {
    menuOpen = true;
    gsap.timeline()
      .to(overlay, { autoAlpha: 1 })
      .to(menu, { xPercent: 0 });
  };

  const closeMenu = () => {
    menuOpen = false;
    gsap.timeline()
      .to(overlay, { autoAlpha: 0 })
      .to(menu, { xPercent: -100 });
  };

  menuButton.addEventListener("click", () => {
    menuOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) closeMenu();
  });
}

document.addEventListener("DOMContentLoaded", initMenu);
