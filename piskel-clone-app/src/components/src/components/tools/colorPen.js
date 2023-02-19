import { setColorPen} from "../utils/saveLocalStorage";

const colorField = document.querySelector('.wrapper-color');
const currentColor = document.getElementById('current-color');
const prevColor = document.getElementById('prev-color');

function colorClickHandler(e) {
    const selectColor = e.target;
      
    if (selectColor.id === 'colorChange') {
        localStorage.setItem('previewColor', currentColor.value);
        currentColor.value = prevColor.value;
        prevColor.value = localStorage.getItem('previewColor');
        localStorage.setItem('currentColor', currentColor.value);
    }
}

function colorChangeHandler() {
    localStorage.setItem('currentColor', currentColor.value);
    localStorage.setItem('previewColor', prevColor.value);
}

function windowLoadHandler() {
    setColorPen()
}

function initColor() {
    colorField.addEventListener('click', colorClickHandler);
    colorField.addEventListener('change', colorChangeHandler);
    window.addEventListener('load', windowLoadHandler);
}

export {initColor};