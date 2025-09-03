const slider = document.querySelector(".slider");
const slidesContainer = document.querySelector(".slides");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const overlay = document.querySelector(".overlay");
const togglePlayButton = document.querySelector(".toggle-play");

let currentSlide = 0;
let autoplayInterval;
let isPlaying = true;

// Overlay text
overlay.innerHTML = '<h1>Welcome to Heavens Pride</h1>';

// Images
const imageSources = ["images/nat10.jpg", "images/nat11.jpg", "images/nat12.jpg", "images/nat13.jpg"];
const slides = [];

imageSources.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  if (index === 0) img.classList.add("active");
  slidesContainer.appendChild(img);
  slides.push(img);
});

function showNextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

function showPrevSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

function startAutoplay() {
  stopAutoplay(); // clear any existing interval first
  autoplayInterval = setInterval(showNextSlide, 3000);
}



function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Start autoplay once
startAutoplay();
togglePlayButton.textContent = "⏸";

// Toggle autoplay
togglePlayButton.addEventListener("click", () => {
  if (isPlaying) {
    stopAutoplay();
    togglePlayButton.textContent = "▶";
  } else {
    startAutoplay();
    togglePlayButton.textContent = "⏸";
  }
  isPlaying = !isPlaying;
});

// Buttons
nextButton.addEventListener("click", () => {
  stopAutoplay();
  showNextSlide();
  if (isPlaying) startAutoplay();
});

prevButton.addEventListener("click", () => {
  stopAutoplay();
  showPrevSlide();
  if (isPlaying) startAutoplay();
});

// Pause on hover
slider.addEventListener("click", stopAutoplay);
slider.addEventListener("leave", () => {
  if (isPlaying) startAutoplay();
});
