const fontSizeSlider = document.getElementById("font-size-slider");
const fontSizeDisplay = document.getElementById("font-size-display");
const posterText = document.getElementById("poster-text");

fontSizeSlider.addEventListener("input", function () {
  const fontSize = fontSizeSlider.value + "px";
  posterText.style.fontSize = fontSize;
  fontSizeDisplay.textContent = fontSize;
});

const fontSelector = document.getElementById("font-selector");

fontSelector.addEventListener("change", function () {
  posterText.style.fontFamily = fontSelector.value;
});

const imageUploader = document.getElementById("image-uploader");
const posterImage = document.getElementById("poster-image");

imageUploader.addEventListener("change", function () {
  const file = imageUploader.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    posterImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
});
function generate() {
    const captureElement = document.querySelector("#capture");
    const scale = window.devicePixelRatio;

    html2canvas(captureElement, {
        scale: scale,
        width: captureElement.offsetWidth,
        height: captureElement.offsetHeight
    }).then(canvas => {
        document.getElementById("render").innerHTML = "";
        document.getElementById("render").appendChild(canvas);
    });
}

// Update text in real-time
const posterInput = document.getElementById("poster-input");
posterInput.addEventListener("input", function () {
  if (posterInput.value !== "") {
    posterText.innerHTML = posterInput.value.replace(/\n/g,"<br>");
  } else {
    posterText.textContent = "Start typing";
  }
});

function generate() {
  document.getElementById("render").innerHTML = "";
  html2canvas(document.querySelector("#capture")).then(canvas => {
    document.getElementById("render").appendChild(canvas);
  });
}

function download() {
  const downloadLink = document.getElementById("download");
  const canvas = document.querySelector("canvas");
  let image = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
  downloadLink.setAttribute("href", image);
}
