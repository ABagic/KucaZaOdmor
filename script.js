const slidesContainer = document.querySelector(".swiper-wrapper");
const slidesPerPage = 3;

let slide = 0;
let slideCount = 0;

//dohvat slideova
fetch("slides.json")
  .then((response) => response.json())
  .then((data) => {
    createSlides(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

//stvaranje slideova
const createSlides = (slidesData) => {
  slidesData.forEach((slideData) => {
    const slideDiv = document.createElement("div");
    slideDiv.classList.add("swiper-slide");

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
};
createSlides();

function closeOffcanvas() {
  // Find the close button of the offcanvas element
  const closeButton = document.querySelector(".offcanvas .btn-close");

  // Trigger the click event on the close button
  setTimeout(() => {
    closeButton.click();
  }, 400);
}
