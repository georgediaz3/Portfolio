gsap.registerPlugin(CustomEase, Draggable, InertiaPlugin);

// Default GSAP settings
CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
gsap.defaults({ ease: "main", duration: 0.7 });

// Menu Initialization
function initMenu() {
    const navWrap = document.querySelector(".nav");
    if (!navWrap) {
        console.error("Menu not found: .nav");
        return;
    }
    const state = navWrap.getAttribute("data-nav");
    const overlay = navWrap.querySelector(".overlay");
    const menu = navWrap.querySelector(".menu");
    const bgPanels = navWrap.querySelectorAll(".bg-panel");
    const menuToggles = document.querySelectorAll("[data-menu-toggle]");
    const menuLinks = navWrap.querySelectorAll(".menu-link");
    const fadeTargets = navWrap.querySelectorAll("[data-menu-fade]");
    const menuButton = document.querySelector(".menu-button");
    const menuButtonTexts = menuButton.querySelectorAll("p");
    const menuButtonIcon = menuButton.querySelector(".menu-button-icon");

    const tl = gsap.timeline();

    const openNav = () => {
        navWrap.setAttribute("data-nav", "open");
        tl.clear()
            .set(navWrap, { display: "block" })
            .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
            .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
            .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
            .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
            .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35")
            .fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, "<+=0.2");
    };

    const closeNav = () => {
        navWrap.setAttribute("data-nav", "closed");
        tl.clear()
            .to(overlay, { autoAlpha: 0 })
            .to(menu, { xPercent: 120 }, "<")
            .to(menuButtonTexts, { yPercent: 0 }, "<")
            .to(menuButtonIcon, { rotate: 0 }, "<")
            .set(navWrap, { display: "none" });
    };

    // Toggle menu
    menuToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const state = navWrap.getAttribute("data-nav");
            state === "open" ? closeNav() : openNav();
        });
    });

    // Close with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navWrap.getAttribute("data-nav") === "open") {
            closeNav();
        }
    });
}

// Slider Initialization
function initSlider() {
    const wrapper = document.querySelector('[data-slider="list"]');
    if (!wrapper) {
        console.error("Slider wrapper not found.");
        return;
    }
    const slides = gsap.utils.toArray('[data-slider="slide"]');
    const nextButton = document.querySelector('[data-slider="button-next"]');
    const prevButton = document.querySelector('[data-slider="button-prev"]');
    const totalElement = document.querySelector('[data-slide-count="total"]');
    const stepElement = document.querySelector('[data-slide-count="step"]');

    if (!nextButton || !prevButton || !totalElement || !stepElement) {
        console.error("Slider buttons or counters missing.");
        return;
    }

    const totalSlides = slides.length;
    totalElement.textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides;

    // Implement the slider logic...
}

document.addEventListener("DOMContentLoaded", () => {
    try {
        initMenu();
        initSlider();
    } catch (error) {
        console.error("Initialization error:", error);
    }
});



