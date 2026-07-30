const camera = document.querySelector("#camera");
const mirrorButton = document.querySelector("#mirrorButton");
const startButton = document.querySelector("#startButton");
const layout = Number(localStorage.getItem("layout"));
const previewContainer = document.getElementById("preview-container");
const timerSelect = document.querySelector('select[name="timer"]');
const photos = [];
let totalPhotos = layout;
let currentPhoto = 0;
let timer = parseInt(timerSelect.value);

createPreview();

console.log(layout);
console.log(totalPhotos);

const interval = setInterval(() => {
  console.log(timer);
  timer--;
  if (timer === 0) {
    clearInterval(interval);
    capturePhoto();
  }
}, 1000);

function capturePhoto() {
  const canvas = document.createElement("canvas");

  canvas.width = camera.videoWidth;
  canvas.height = camera.videoHeight;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(camera, 0, 0);

  const imageData = canvas.toDataURL("image/png");

  photos.push(imageData);

  const previews = document.querySelectorAll(".preview-photo");

  previews[currentPhoto].src = imageData;
}

function createPreview() {
  for (let i = 0; i < totalPhotos; i++) {
    const img = document.createElement("img");
    img.classList.add("preview-photo");

    previewContainer.appendChild(img);
  }
}

navigator.mediaDevices
  .getUserMedia({
    video: true,
  })
  .then((stream) => {
    camera.srcObject = stream;
  })
  .catch((error) => {
    console.error("Camera error:", error);
  });

mirrorButton.addEventListener("click", () => {
  camera.classList.toggle("mirrored");
});

startButton.addEventListener("click", () => {
  if (currentPhoto < totalPhotos) {
    capturePhoto();
    currentPhoto++;
    console.log(currentPhoto);
    if (currentPhoto === totalPhotos) {
      console.log("All photos are finished");
    }
  }
});
