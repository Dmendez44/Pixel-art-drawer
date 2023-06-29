const canvas = document.querySelector('.canvas');
const slider = document.querySelector('.slider');
const output = document.querySelector('#sliderOutput');

const clear = document.querySelector('#clear')

clear.addEventListener('click', removePixels)
clear.addEventListener('click', createCanvas)

colorPicker = document.querySelector("#colorpicker");
colorPicker.addEventListener("input", updateFirst);
colorPicker.addEventListener("change", updateSecond);

const eraser = document.querySelector('#eraser')

eraserMode = false;
eraser.addEventListener('click', () => {
    if (eraser.classList.contains('active')) {
        return;
    }
    colorMode.classList.remove("active")
    randomColor.classList.remove("active")
    eraser.classList.toggle("active")
    if (eraser.classList.contains('active')) {
        eraserMode = true;
    }
});

const randomColor = document.querySelector('#randomMode')
randMode = false;
randomColor.addEventListener('click', () => {
    if (randomColor.classList.contains('active')) {
        return;
    }
    colorMode.classList.remove("active")
    eraser.classList.remove("active")
    randomColor.classList.toggle("active")
    if (randomColor.classList.contains('active')) {
        randMode = true;
    }
});

const colorMode = document.querySelector('#colorMode');
colorMode.classList.add('active')
colorMode.addEventListener('click', () => {
    if (colorMode.classList.contains('active')) {
        return;
    }
    eraser.classList.remove("active")
    randomColor.classList.remove("active")
    colorMode.classList.toggle("active");
})


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
    if (isDrawing && e.buttons === 1 && e.target.classList.contains('eraserMode') && eraserMode && eraser.classList.contains('active')) {
        e.target.style.backgroundColor = 'transparent';
        // removeProperty("backgroundColor")
    } else if (isDrawing && e.buttons === 1 && e.target.classList.contains('randomMode') && randomColor.classList.contains('active')) {
        randomNum = Math. floor(Math. random() * 256)
        let randomColor = `rgb(${randomNumber()}, ${randomNumber}, ${randomNumber})`
        e.target.style.backgroundColor = randomColor;
    } else if (e.target.classList.contains('pixel')) {
        e.target.style.backgroundColor = colorPicker.style.color;
    }
}

function drawPixel(e) {
    if (isDrawing && e.buttons === 1 && e.target.classList.contains('eraserMode') && eraserMode && eraser.classList.contains('active')) {
        e.target.style.backgroundColor = 'transparent';
    } else if (isDrawing && e.buttons === 1 && e.target.classList.contains('randomMode') && randMode && randomColor.classList.contains('active')) {
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
    // let pixels = document.querySelectorAll('.pixel')
    // while (canvas.hasChildNodes()) {
    //     canvas.removeChild(canvas.firstChild)
    // }
    canvas.innerHTML = '';

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
