import { currentSizeCanvas } from "./app";


const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const previewField = document.getElementById('preview');
const previewCtx = previewField.getContext('2d');

function init() {
    canvas.width = currentSizeCanvas();
    canvas.height = currentSizeCanvas();
    previewField.width = currentSizeCanvas();
    previewField.height = currentSizeCanvas();
}

export {init}