let canvas = document.querySelector('.canvas');
let slider = document.querySelector('.slider');
let output = document.querySelector('#sliderOutput');


function createCanvas () {
    let pixelAmount = slider.value;
    for (let i = 1; i <= pixelAmount**2; i++) {
        let pixel = document.createElement('div');
        pixel.addEventListener('mousedown', startDrawing);
        pixel.addEventListener('mouseover', drawPixel);
        pixel.addEventListener('mouseup', stopDrawing);
        pixel.classList.add('pixel');
        pixel.style.height = `${600 / pixelAmount}px`;
        pixel.style.width = `${600 / pixelAmount}px`;
        canvas.appendChild(pixel);
    }
}

let isDrawing = false;

function startDrawing(e) {
    isDrawing = true;
    e.target.style.backgroundColor = 'black';
}

function drawPixel(e) {
    if (isDrawing) {
        e.target.style.backgroundColor = 'black';
    }
}

function stopDrawing(e) {
    if (isDrawing) {
        e.target.style.backgroundColor = 'black';
    }
    isDrawing = false;
}

function removePixels () {
    let pixels = document.querySelectorAll('.pixel')
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.firstChild)
    }
    console.log(pixels);

}
slider.addEventListener('input', () => {
    removePixels();
    createCanvas();
    output.textContent = `Size: ${slider.value}x${slider.value}`;

})

createCanvas();
