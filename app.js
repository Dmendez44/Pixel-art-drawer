const canvas = document.querySelector('.canvas');
const slider = document.querySelector('.slider');
const output = document.querySelector('#sliderOutput');

const clear = document.querySelector('#clear')

clear.addEventListener('click', removePixels)
clear.addEventListener('click', createCanvas)

colorPicker = document.querySelector("#colorpicker");
colorPicker.addEventListener("input", updateFirst);
colorPicker.addEventListener("change", updateSecond);

let toggleEraser = 1;
const eraser = document.querySelector('#eraser')
eraserMode = false;

eraser.addEventListener('click', () => {
    if (eraserMode % 2 === 0) {
        eraserMode = true;
        toggleEraser++;
        eraser.style.backgroundColor = 'green';
    } else {
        eraser.style.backgroundColor = 'red';
        eraserMode = false;
        toggleEraser++;
    }

});

let toggleRandMode = 1;
const randomColor = document.querySelector('#randomMode')
randMode = false;
randomColor.addEventListener('click', () => {
    if (randMode % 2 === 0) {
        randMode = true;
        toggleRandMode++;
        randomColor.style.backgroundColor = 'green';
    } else {
        randomColor.style.backgroundColor = 'red';
        randMode = false;
        toggleRandMode++;
    }
});


function updateFirst(event) {
    colorPicker.style.color = event.target.value;
}
function updateSecond(event) {
    colorPicker.style.color = event.target.value;
}


function createCanvas () {
    let pixelAmount = slider.value;
    for (let i = 1; i <= pixelAmount**2; i++) {
        let pixel = document.createElement('div');
        pixel.setAttribute('draggable', false);
        pixel.classList.add('pixel');
        pixel.classList.add('eraserMode');
        pixel.classList.add('randomMode');
        pixel.style.height = `${600 / pixelAmount}px`;
        pixel.style.width = `${600 / pixelAmount}px`;
        canvas.appendChild(pixel);
    }
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseover', drawPixel);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing)
}

let isDrawing = false;

function disableDragging(e) {
    e.preventDefault()
}

function startDrawing(e) {
    isDrawing = true;
    if (isDrawing && e.buttons === 1 && e.target.classList.contains('eraserMode') && eraserMode) {
        e.target.style.backgroundColor = 'transparent';
        // removeProperty("backgroundColor")
    } else if (isDrawing && e.buttons === 1 && e.target.classList.contains('randomMode') && randMode) {
        randomNum = Math. floor(Math. random() * 256)
        let randomColor = `rgb(${randomNumber()}, ${randomNumber}, ${randomNumber})`
        e.target.style.backgroundColor = 'red';
    } else if (e.target.classList.contains('pixel')) {
        e.target.style.backgroundColor = colorPicker.style.color;
    }
}

function drawPixel(e) {
    if (isDrawing && e.buttons === 1 && e.target.classList.contains('eraserMode') && eraserMode) {
        e.target.style.backgroundColor = 'transparent';
    } else if (isDrawing && e.buttons === 1 && e.target.classList.contains('randomMode') && randMode) {
        randomNum = Math. floor(Math. random() * 256)
        let randomColor = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`
        e.target.style.backgroundColor = randomColor;
    } else if (isDrawing && e.buttons === 1 && e.target.classList.contains('pixel')) {
        e.target.style.backgroundColor = colorPicker.style.color;
    } 
}

function stopDrawing() {
    isDrawing = false;
}


function removePixels () {
    let pixels = document.querySelectorAll('.pixel')
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.firstChild)
    }

}

function randomNumber() {
    let randomNum = Math. floor(Math. random() * 256);
    return randomNum;
}
document.addEventListener('dragstart', disableDragging);

slider.addEventListener('input', () => {
    removePixels();
    createCanvas();
    output.textContent = `Size: ${slider.value}x${slider.value}`;

});

createCanvas();
