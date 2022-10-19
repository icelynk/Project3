// Select all sides
const slides = document.querySelectorAll(".slide");

//Loop through slides and set each slides translateX property to index * 100%
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

//Current slide counter
let curSlide = 0;

//Select next slide button
const nextSlide = document.querySelector("btn-next");

//Add event listener and next slide funtionality
nextSlide.addEventListener("click", function () {
  curSlide++;

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

//Maximum number of slides
let maxSide = slides.length - 1;

//Add event listener and navigation functionality
nextSlide.addEventListener("click", function () {
  //check if current slide is the last and reset current slide
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  //Move slide by -100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

//Select prev slide button
const prevSlide = document.querySelector("btn-prev");

//Add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
  //Check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  //Move slide by 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});
