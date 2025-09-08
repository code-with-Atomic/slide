const slider = document.querySelector(".slider");
const slidesContainer = document.querySelector(".slides");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const overlay = document.querySelector(".overlay");

// Create dots container
const dotsContainer = document.createElement("div");
dotsContainer.classList.add("dots");
slider.appendChild(dotsContainer);

let currentSlide = 0;
let autoplayInterval;
let isPlaying = true;

// Overlay text
overlay.innerHTML = '<h1>Welcome to the Growth hub Akure</h1> <p>We offer the best opportunity for your personal development </p>';

// Images
const imageSources = ["images/g3.jpg", "images/g2.jpg", "images/g4.jpg", "images/g5.jpg" , "images/67.jpg" , "images/g1.jpg" , "images/g6.jpg"];
const slides = [];
const dots = [];

imageSources.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  if (index === 0) img.classList.add("active");
  slidesContainer.appendChild(img);
  slides.push(img);

  // Create dot
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    goToSlide(index);
    restartAutoplay();
  });
  dotsContainer.appendChild(dot);
  dots.push(dot);
});



function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function goToSlide(index) {
  slides[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  updateOverlay();
  updateDots();
}

function showNextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

function showPrevSlide() {
  goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

function startAutoplay() {
  stopAutoplay();
  autoplayInterval = setInterval(showNextSlide, 3000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

function restartAutoplay() {
  if (isPlaying) {
    stopAutoplay();
    startAutoplay();
  }
}

// Start autoplay
startAutoplay();

// Buttons
nextButton.addEventListener("click", () => {
  showNextSlide();
  restartAutoplay();
});

prevButton.addEventListener("click", () => {
  showPrevSlide();
  restartAutoplay();
});

// Pause on hover
slider.addEventListener("mouseenter", stopAutoplay);
slider.addEventListener("mouseleave", () => {
  if (isPlaying) startAutoplay();
});

// Initialize overlay
updateOverlay();
