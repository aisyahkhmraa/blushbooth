const track = document.querySelector(".slider-track");
const next = document.querySelector(".layout-next");
const prev = document.querySelector(".layout-prev");
const layouts = document.querySelectorAll(".layout-card");
const maxSlide = 800;
const nextButton = document.querySelector(".cta-button");

let selectedLayout = null;
let position = 0;

layouts.forEach((layout) => {
  layout.addEventListener("click", () => {
    selectedLayout = Number(layout.dataset.layout);

    console.log(selectedLayout);
  });
});

nextButton.addEventListener("click", () => {
  if (selectedLayout === null) {
    alert("Choose a layout first");
  } else {
    localStorage.setItem("layout", selectedLayout);

    window.location.href = "camera.html";
  }
});

next.addEventListener("click", () => {
  if (position > -maxSlide) {
    position -= maxSlide;
    track.style.transform = `translateX(${position}px)`;
  }
});

prev.addEventListener("click", () => {
  if (position < 0) {
    position += maxSlide;
    track.style.transform = `translateX(${position}px)`;
  }
});
