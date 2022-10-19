function nextSlide() {
  var slides = [...document.getElementsByClassName("slide")];
  var activeSlideIndex = 0;

  slides.forEach((slide, index) => {
    if (slide.classList.contains("active")) {
      activeSlideIndex = index;
    }
  });

  var newSlideIndex = activeSlideIndex + 1;
  if (newSlideIndex >= slides.length) {
    newSlideIndex = 0;
  }

  changeSlide(newSlideIndex);
}

function previousSlide() {
  var slides = [...document.getElementsByClassName("slide")];
  var activeSlideIndex = 0;

  slides.forEach((slide, index) => {
    if (slide.classList.contains("active")) {
      activeSlideIndex = index;
    }
  });

  var newSlideIndex = activeSlideIndex - 1;
  if (newSlideIndex < 0) {
    newSlideIndex = slides.length - 1;
  }

  changeSlide(newSlideIndex);
}

function changeSlide(activeSlideIndex) {
  var slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slides[activeSlideIndex].classList.add("active");
}
