document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP Plugins
  gsap.registerPlugin(Draggable, InertiaPlugin);

  // Smooth Scrolling
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
    smoothWheel: true,
    smoothTouch: true,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Canvas Setup
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = innerWidth * 2;
  canvas.height = innerHeight * 2;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "-1";

  // Mouse position
  let mx = 0,
    my = 0;
  window.onpointermove = (e) => {
    mx = e.clientX - innerWidth / 2;
    my = e.clientY / 300;
  };

  // Helper function for random numbers
  const random = (n = 1) => Math.random() * n;

  // De Jong Attractor Function
  function dejong(anchorX, anchorY) {
    const aOffset = (Math.random() - 0.5) * 2;
    const bOffset = (Math.random() - 0.5) * 2;
    const cOffset = (Math.random() - 0.5) * 2;
    const dOffset = (Math.random() - 0.5) * 2;

    let sx = Math.random() * 2 - 1;
    let sy = Math.random() * 2 - 1;
    let scale = 20 + 240 * Math.random() * Math.random();

    let msx = 1 / (10 + Math.random() * 1000);
    let msy = 1 / (100 + Math.random() * 1000);

    let t = 0;
    let rotation = Math.PI * 2 * Math.random();

    return function () {
      const a = 1.4 + aOffset + mx * msx;
      const b = -2.3 + bOffset + my * msy;
      const c = 2.4 + cOffset + my * msy;
      const d = -2.1 + dOffset - mx * msx;

      let x = sx + t;
      let y = sy + t;
      t += 0.0001;

      ctx.translate(anchorX, anchorY);
      ctx.rotate(rotation);
      for (let i = 0; i < 500; i++) {
        let newX = Math.sin(a * y) - Math.cos(b * x);
        let newY = Math.sin(c * x) - Math.cos(d * y);
        x = newX;
        y = newY;

        const plotX = x * scale;
        const plotY = y * scale;

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fillRect(plotX, plotY, 2, 2);
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }

  // Generate Attractors
  let attractors = [];
  function generateAttractors() {
    attractors = [];
    for (let i = 0; i < 20; i++) {
      attractors.push(
        dejong(Math.random() * canvas.width, Math.random() * canvas.height)
      );
    }
  }
  generateAttractors();

  // Handle Window Resize
  let resizeTimer;
  window.onresize = () => {
    canvas.width = innerWidth * 2;
    canvas.height = innerHeight * 2;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      generateAttractors();
    }, 200);
  };

  // Regenerate Attractors on Click
  window.onclick = generateAttractors;

  // Animation Loop
  function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    attractors.forEach((attractor) => attractor());
    requestAnimationFrame(loop);
  }
  loop();

  // Slider Functionality
  function initSlider() {
    const wrapper = document.querySelector('[data-slider="list"]');
    const slides = gsap.utils.toArray('[data-slider="slide"]');

    const nextButton = document.querySelector('[data-slider="button-next"]');
    const prevButton = document.querySelector('[data-slider="button-prev"]');

    const totalElement = document.querySelector('[data-slide-count="total"]');
    const stepElement = document.querySelector('[data-slide-count="step"]');
    const stepsParent = stepElement.parentElement;

    let activeElement;
    const totalSlides = slides.length;

    // Update total slides text, prepend 0 if less than 10
    totalElement.textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides;

    // Create step elements dynamically
    stepsParent.innerHTML = ""; // Clear any existing steps
    slides.forEach((_, index) => {
      const stepClone = stepElement.cloneNode(true); // Clone the single step
      stepClone.textContent =
        index + 1 < 10 ? `0${index + 1}` : index + 1;
      stepsParent.appendChild(stepClone); // Append to the parent container
    });

    // Dynamically generated steps
    const allSteps = stepsParent.querySelectorAll('[data-slide-count="step"]');

    const loop = gsap.to(slides, {
      xPercent: -100 * (slides.length - 1),
      duration: 1,
      paused: true,
      snap: { xPercent: -100 },
      modifiers: {
        xPercent: gsap.utils.wrap(-100 * slides.length, 0),
      },
    });

    nextButton.addEventListener("click", () =>
      loop.play().timeScale(1.5)
    );
    prevButton.addEventListener("click", () =>
      loop.reverse().timeScale(1.5)
    );
  }

  initSlider();
});



