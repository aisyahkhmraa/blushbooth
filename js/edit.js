const photos = JSON.parse(localStorage.getItem("photos"));
const layout = Number(localStorage.getItem("layout"));
const colorButtons = document.querySelectorAll(".color-option");
let currentPattern = "";
let currentPattern = button.dataset.frame;
const folderName = {
  1: "one-photo",
  2: "two-photo",
  3: "three-photo",
  4: "four-photo",
};

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentPattern = button.dataset.frame;

    renderPreview();
  });
});

function renderPreview() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const frame = new Image();
}

frame.src = `assets/frames/${folderName[layout]}/${currentPattern}`;

frame.onload = () => {
  ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
  img.src = photo;
};

/*colorButtons[0].classList.add("active");

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    colorButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    currentPattern = button.dataset.frame;

    console.log(currentPattern);
  });
}); */

console.log(photos);
console.log(layout);
