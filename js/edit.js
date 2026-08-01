const photos = JSON.parse(localStorage.getItem("photos"));
const template = document.querySelector("#template");

console.log(photos);

for (let i = 1; i <= 6; i++) {
  const img = document.createElement("img");

  img.src = `assets/templates/template${i}.png`;

  img.classList.add("template-option");

  template.appendChild(img);
}
