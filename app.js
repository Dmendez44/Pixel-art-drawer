let slider = document.querySelector('.slider');
let output = document.querySelector('#sliderOutput');

slider.addEventListener('input', () => {
    output.textContent = `Size: ${slider.value}x${slider.value}`;
})