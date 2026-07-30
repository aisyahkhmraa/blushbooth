const camera = document.querySelector("#camera");
const mirrorButton = document.querySelector("#mirrorButton");
const startButton = document.querySelector("#startButton");
const retakeButton = document.querySelector("#retakeButton");
const layout = Number(localStorage.getItem("layout"));
const previewPhoto = document.getElementById("preview-photo");
const previewContainer = document.getElementById("preview-container");
const timerSelect = document.querySelector('select[name="timer"]');
const photos = [];
let totalPhotos = layout;
let currentPhoto = 0;

createPreview();

console.log(layout);
console.log(totalPhotos);

function startCountdown() {
  let timer = parseInt(timerSelect.value);

  const interval = setInterval(() => {
    console.log(timer);
    timer--;
    if (timer === 0) {
      clearInterval(interval);
      capturePhoto();
      previewPhoto.style.display = "inline-block";
      currentPhoto++;
      if (currentPhoto < totalPhotos) {
        startCountdown();
      } else {
        finishSession();
      }
    }
  }, 1000);
}

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
  startButton.disabled = true;

  startCountdown();
});

function finishSession() {
  nextButton.style.display = "inline-block";
  retakeButton.style.display = "inline-block";
  startButton.style.display = "none";
}
