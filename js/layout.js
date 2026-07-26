const track = document.querySelector(".slider-track");
const next = document.querySelector(".layout-next");
const prev = document.querySelector(".layout-prev");

let position = 0;
const maxSlide = 800;

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