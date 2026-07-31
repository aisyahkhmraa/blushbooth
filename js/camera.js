const camera = document.querySelector("#camera");
const mirrorButton = document.querySelector("#mirrorButton");
const startButton = document.querySelector("#startButton");
const retakeButton = document.querySelector("#retakeButton");
const deleteButton = document.querySelector("#deleteButton");
const layout = Number(localStorage.getItem("layout"));
const previewPhoto = document.getElementById("preview-photo");
const previewContainer = document.getElementById("preview-container");
const timerSelect = document.querySelector('select[name="timer"]');
const countdown = document.querySelector("#countdown");
const flash = document.querySelector("#flash");
const insertImage = document.querySelector("#insertImage");
const progressText = document.querySelector("#progressText");
const photos = [];
let totalPhotos = layout;
let currentPhoto = 0;
let mode = "camera";
createPreview();

//UPLOAD IMAGE
insertImage.addEventListener("change", () => {
  mode = "upload";

  startButton.style.display = "none";
  mirrorButton.style.display = "none";

  const file = insertImage.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const imageData = reader.result;

    console.log(currentPhoto);

    photos.push(imageData);

    const previews = document.querySelectorAll(".preview-photo");

    previews[currentPhoto].src = imageData;

    currentPhoto++;

    if (currentPhoto < totalPhotos) {
      updateProgress();
      previewPhoto.style.display = "inline-block";
    } else {
      finishSession();
      retakeButton.style.display = "none";
    }

    insertImage.value = "";
  };

  reader.readAsDataURL(file);
});

//UPDATE PROGRESS TEXT
function updateProgress() {
  progressText.textContent = `${currentPhoto + 1} / ${totalPhotos}`;
}

//COUNTDOWN/TIMER
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
        updateProgress();
        startCountdown();
      } else {
        finishSession();
      }
    }
  }, 1000);
}

//RETAKE
function retakePhotos() {
  currentPhoto = 0;
  photos.length = 0;

  const previews = previewContainer.querySelectorAll("img");

  previews.forEach((img) => {
    img.src = "";
  });

  setTimeout(() => {
    startCountdown();
  }, 1000);

  startButton.disabled = false;
  nextButton.style.display = "none";
}

//CAPTURE FOTO
function capturePhoto() {
  const canvas = document.createElement("canvas");

  canvas.width = camera.videoWidth;
  canvas.height = camera.videoHeight;

  flash.classList.add("flash-effect");

  const ctx = canvas.getContext("2d");

  ctx.save();

  if (camera.classList.contains("mirrored")) {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(camera, 0, 0, canvas.width, canvas.height);

  ctx.restore();

  setTimeout(() => {
    flash.classList.remove("flash-effect");
  }, 200);

  const imageData = canvas.toDataURL("image/png");

  photos.push(imageData);

  const previews = document.querySelectorAll(".preview-photo");

  previews[currentPhoto].src = imageData;
}

//DELETE FOTO WHEN UPLOAD FOTO
function deletePhotos() {
  currentPhoto = 0;

  photos.length = 0;

  mode = "camera";

  const previews = document.querySelectorAll(".preview-photo");

  previews.forEach((img) => {
    img.src = "";
  });

  startButton.style.display = "inline-block";

  mirrorButton.style.display = "inline-block";

  deleteButton.style.display = "none";

  nextButton.style.display = "none";

  updateProgress();

  previewPhoto.style.display = "none";

  insertImage.value = "";
}

// PREVIEW FOTO
function createPreview() {
  for (let i = 0; i < totalPhotos; i++) {
    const img = document.createElement("img");
    img.classList.add("preview-photo");

    previewContainer.appendChild(img);
  }
}

//CAMERA
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

//FINISH SESSION

function finishSession() {
  nextButton.style.display = "inline-block";

  if (mode === "camera") {
    retakeButton.style.display = "inline-block";
  }

  if (mode === "upload") {
    deleteButton.style.display = "inline-block";
  }
}

//DELETE BUTTON
deleteButton.addEventListener("click", () => {
  deletePhotos();
});

//MIRROR BUTTON
mirrorButton.addEventListener("click", () => {
  camera.classList.toggle("mirrored");
});

//START BUTTON
startButton.addEventListener("click", () => {
  startButton.disabled = true;

  setTimeout(() => {
    startCountdown();
  }, 1500);
});

//RETAKE BUTTON
retakeButton.addEventListener("click", () => {
  retakePhotos();
});

//NEXT BUTTON
nextButton.addEventListener("click", () => {
  localStorage.setItem("photos", JSON.stringify(photos));
  window.location.href = "edit.html";
});
