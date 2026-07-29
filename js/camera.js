const camera = document.querySelector("#camera");
const mirrorButton = document.querySelector("#mirrorButton");
const startButton = document.querySelector("#startButton");
const layout = Number(localStorage.getItem("layout"));
const previewContainer = document.getElementById("preview-container");
const photos = [];
let totalPhotos = layout;
let currentPhoto = 0;

createPreview();

console.log(layout);
console.log(totalPhotos);

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

    img.classList.toggle("mirrored");

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
