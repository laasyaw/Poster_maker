const fontSizeSlider = document.getElementById("font-size-slider");
const fontSizeDisplay = document.getElementById("font-size-display");
const posterText = document.getElementById("poster-text");
const fontSelector = document.getElementById("font-selector");
const fontColorPicker = document.getElementById("font-color-picker");
const imageUploader = document.getElementById("image-uploader");
let currentTextElement = posterText; // Track the currently selected text element

// Function to update the controls based on the current text element
function updateControls() {
    if (currentTextElement) {
        fontSizeSlider.value = parseInt(window.getComputedStyle(currentTextElement).fontSize);
        fontSizeDisplay.textContent = fontSizeSlider.value + "px";
        fontSelector.value = window.getComputedStyle(currentTextElement).fontFamily.replace(/["']/g, '');
        fontColorPicker.value = rgbToHex(window.getComputedStyle(currentTextElement).color);
    }
}

// Update font size and display
fontSizeSlider.addEventListener("input", function () {
    const fontSize = fontSizeSlider.value + "px";
    if (currentTextElement) {
        currentTextElement.style.fontSize = fontSize;
    }
    fontSizeDisplay.textContent = fontSize;
});

// Update font family
fontSelector.addEventListener("change", function () {
    if (currentTextElement) {
        currentTextElement.style.fontFamily = fontSelector.value;
    }
});

// Update font color
fontColorPicker.addEventListener("input", function () {
    if (currentTextElement) {
        currentTextElement.style.color = fontColorPicker.value;
    }
});

const posterImage = document.getElementById("poster-image");

imageUploader.addEventListener("change", function () {
    const file = imageUploader.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        posterImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// Update text in real-time
const posterInput = document.getElementById("poster-input");
posterInput.addEventListener("input", function () {
    if (currentTextElement) {
        currentTextElement.textContent = posterInput.value || "Start typing";
    }
});

// Function to generate poster
function generate() {
    const captureElement = document.querySelector("#capture");
    html2canvas(captureElement, { scale: window.devicePixelRatio }).then(canvas => {
        const dataURL = canvas.toDataURL("image/jpeg");
        localStorage.setItem("posterImage", dataURL);
        window.location.href = "poster.html";
    });
}

document.getElementById("generate-button").addEventListener("click", generate);

// Make text draggable
function makeDraggable(element) {
    let offsetX, offsetY;

    element.addEventListener("mousedown", function (e) {
        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        function moveAt(event) {
            element.style.left = (event.pageX - offsetX) + "px";
            element.style.top = (event.pageY - offsetY) + "px";
        }

        document.addEventListener("mousemove", moveAt);

        document.addEventListener("mouseup", function () {
            document.removeEventListener("mousemove", moveAt);
        }, { once: true });
    });

    element.ondragstart = function () {
        return false;
    };

    // Click event to set current text element
    element.addEventListener("click", function () {
        currentTextElement = element;
        updateControls(); // Update controls when a new element is clicked
    });
}

makeDraggable(posterText); // Make the main poster text draggable

const addTextButton = document.getElementById("add-text-button");
addTextButton.addEventListener("click", function () {
    const newTextArea = document.createElement("textarea");
    newTextArea.className = "new-text-area";
    newTextArea.placeholder = "Type new text here...";

    const newPosterText = document.createElement("h1");
    newPosterText.className = "draggable-text";
    newPosterText.textContent = "New Text";
    newPosterText.style.position = "absolute"; // Position it absolutely
    newPosterText.style.left = "50px"; // Set initial position
    newPosterText.style.top = "50px"; // Set initial position
    newPosterText.style.fontSize = "16px"; // Default font size for new text
    newPosterText.style.color = "#000"; // Default font color for new text
    newPosterText.style.fontFamily = "Arial"; // Default font family for new text
    document.querySelector("#capture").appendChild(newPosterText);
    makeDraggable(newPosterText); // Make new text draggable

    // Update text area content on focus
    newTextArea.addEventListener("focus", function () {
        newPosterText.textContent = newTextArea.value;
        // Set current text element to the new poster text
        currentTextElement = newPosterText;
        updateControls(); // Update controls to reflect new text area properties
    });

    newTextArea.addEventListener("input", function () {
        newPosterText.textContent = newTextArea.value;
    });

    newPosterText.addEventListener("click", function () {
        currentTextElement = newPosterText; // Set as current text element
        updateControls(); // Update controls to reflect new text area properties
    });

    document.querySelector(".text-area").appendChild(newTextArea);
});

// Function to convert RGB color to HEX
function rgbToHex(rgb) {
    const result = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(rgb);
    if (!result) return '#000000'; // Default to black if not found
    const r = parseInt(result[1]);
    const g = parseInt(result[2]);
    const b = parseInt(result[3]);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
