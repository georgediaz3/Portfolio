document.addEventListener("DOMContentLoaded", () => {
  // Background Animation
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function drawBackground() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    requestAnimationFrame(drawBackground);
  }
  drawBackground();

  // Slider Functionality
  const slides = document.querySelectorAll(".slider-slide");
  const sliderList = document.querySelector(".slider-list");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const currentSlideElement = document.getElementById("current-slide");
  let currentSlide = 0;

  function updateSlides() {
    sliderList.style.transform = `translateX(-${currentSlide * 100}%)`;
    currentSlideElement.textContent = `0${currentSlide + 1}`;
  }

  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  });

  prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  });

  updateSlides();
});






