document.addEventListener("DOMContentLoaded", () => {
  // Background Animation (Old Background)
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  let particles = [];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      if (particles[i].size <= 0.3) {
        particles.splice(i, 1);
        i--;
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
  }

  canvas.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(e.x * 2, e.y * 2));
    }
  });

  animate();

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





