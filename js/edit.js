const photos = JSON.parse(localStorage.getItem("photos"));
const layout = Number(localStorage.getItem("layout"));
const colorButtons = document.querySelectorAll(".color-option");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");
let currentPattern = "leopard.png";
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

const frameSize = {
  1: { width: 1200, height: 1600 },
  2: { width: 1200, height: 1600 },
  3: { width: 1200, height: 2800 },
  4: { width: 1200, height: 3600 },
};

const photoPosition = {
  1: [
    {
      x: 100,
      y: 147,
      width: 1000,
      height: 700,
    },
  ],

  2: [],

  3: [],

  4: [],
};

function renderPreview() {
  const frame = new Image();

  frame.src = `assets/frames/${folderName[layout]}/${currentPattern}`;

  frame.onload = () => {
    canvas.width = frameSize[layout].width;
    canvas.height = frameSize[layout].height;

    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

    photos.forEach((photo, index) => {
      const img = new Image();

      img.src = photo;

      img.onload = () => {
        const position = photoPosition[layout][index];

        ctx.drawImage(
          img,
          position.x,
          position.y,
          position.width,
          position.height,
        );
      };
    });
  };
}

console.log(photos);
console.log(layout);
renderPreview();
