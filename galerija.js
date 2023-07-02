const slidesContainer = document.querySelector(".slides-container");
const dotsContainer = document.querySelector(".dots-container");
const slidesPerPage = 3;
let currentIndex = 0;
let numericGapValue = 0;
let slide = 0;
let slideCount = 0;
let width = screen.width;
console.log(width);

function openNav() {
  if (width < 770) {
    document.getElementById("menu").style.display = "flex";
  }
}

function closeNav() {
  if (width < 770) {
    document.getElementById("menu").style.display = "none";
  }
}

//proba
fetch("slides.json")
  .then((response) => response.json())
  .then((data) => {
    createSlides(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Create slide divs
const createSlides = (slidesData) => {
  slidesData.forEach((slideData) => {
    const slideDiv = document.createElement("li");
    slideDiv.classList.add("slide");

    const contentDiv = document.createElement("div");

    const titleH3 = document.createElement("h3");
    titleH3.textContent = slideData.title;

    const subtitleH4 = document.createElement("h4");
    subtitleH4.textContent = slideData.subtitle;

    contentDiv.appendChild(titleH3);
    contentDiv.appendChild(subtitleH4);

    const image = document.createElement("img");
    image.classList.add("slider-slika");
    image.src = slideData.imageSrc;
    image.alt = slideData.imageAlt;

    slideDiv.appendChild(contentDiv);
    slideDiv.appendChild(image);

    slidesContainer.appendChild(slideDiv);
  });

  const slides = Array.from(slidesContainer.children);

  // Create dots
  for (let i = 0; i < slides.length - slidesPerPage + 1; i++) {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.setAttribute("title", `Dot ${i + 1}`);
    dotsContainer.appendChild(dot);
  }
  const dots = Array.from(dotsContainer.children);
  const slideCount = slides.length;

  // Update active dot
  const updateActiveDot = () => {
    dots.forEach((dot, index) => {
      dot.classList.remove("active");
      if (index === currentIndex) {
        dot.classList.add("active");
      }
    });
  };

  // Move to a specific slide
  const moveToSlide = (index) => {
    const offsetSlide = slide * index;
    const offsetGap = numericGapValue * index;
    slidesContainer.style.transform = `translateX(-${
      offsetSlide + offsetGap
    }px)`;
    currentIndex = index;
    updateActiveDot();
  };

  // Handle dot click event
  dotsContainer.addEventListener("click", (event) => {
    const dot = event.target;
    if (dot.classList.contains("dot")) {
      const dotIndex = dots.indexOf(dot);
      moveToSlide(dotIndex);
    }
  });

  // Gap size
  const flexContainer = document.getElementById("slides-container");
  function updateGapValue() {
    const flexContainerStyles = window.getComputedStyle(flexContainer);
    const gapValue = flexContainerStyles.gap;
    numericGapValue = parseFloat(gapValue);
    if (gapValue.indexOf("%") !== -1) {
      const containerWidth = flexContainer.offsetWidth;
      numericGapValue = containerWidth * (numericGapValue / 100);
    }
    const slideWidth = slides[0].getBoundingClientRect().width;
    slide = slideWidth;

    moveToSlide(currentIndex);
  }
  updateGapValue();

  window.addEventListener("resize", updateGapValue);
};

createSlides();
