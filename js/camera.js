const camera = document.querySelector("#camera");
const mirrorButton = document.querySelector("#mirrorButton");
const insertImage = document.getElementById('#insertImage');
const previewPhoto = document.getElementById('#previewPhoto');

navigator.mediaDevices.getUserMedia({
    video: true
})
.then((stream) => {
    camera.srcObject = stream;
})
.catch((error) => {
    console.error("Camera error:", error);
})

mirrorButton.addEventListener("click", () => {
    camera.classList.toggle("mirrored");
})

insertImage.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        previewPhoto.src = e.target.result;
        previewPhoto.style.display = 'block'; 
      }
      reader.readAsDataURL(file);
    }
});