const camera = document.querySelector("#camera");
const mirrorButton = document.querySelector("#mirrorButton");
const startButton = document.querySelector("#startButton");
const retakeButton = document.querySelector("#retakeButton");
const layout = Number(localStorage.getItem("layout"));
const previewPhoto = document.getElementById("preview-photo");
const previewContainer = document.getElementById("preview-container");
const timerSelect = document.querySelector('select[name="timer"]');
const countdown = document.querySelector("#countdown");
const flash = document.querySelector("#flash");
const photos = [];
let totalPhotos = layout;
let currentPhoto = 0;

createPreview();

console.log(layout);
console.log(totalPhotos);

function startCountdown() {
  let timer = parseInt(timerSelect.value);
  countdown.style.display = "block";

  const interval = setInterval(() => {
    startButton.style.display = "none";
    countdown.textContent = timer;
    timer--;
    if (timer === 0) {
      clearInterval(interval);
      capturePhoto();
      countdown.style.display = "none";
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

function retakePhotos() {
  currentPhoto = 0;
  photos.length = 0;

  const previews = previewContainer.querySelectorAll("img");

  previews.forEach((img) => {
    img.src = "";
  });

  setTimeout(() => {
    startCountdown();
  }, 1500);

  startButton.disabled = false;
  nextButton.style.display = "none";
}

function capturePhoto() {
  const canvas = document.createElement("canvas");

  canvas.width = camera.videoWidth;
  canvas.height = camera.videoHeight;

  flash.classList.add("flash-effect");

  const ctx = canvas.getContext("2d");

  ctx.drawImage(camera, 0, 0);

  setTimeout(() => {
    flash.classList.remove("flash-effect");
  }, 200);

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

  setTimeout(() => {
    startCountdown();
  }, 1500);
});

function finishSession() {
  nextButton.style.display = "inline-block";

  retakeButton.style.display = "inline-block";
}

retakeButton.addEventListener("click", () => {
  retakePhotos();
});
