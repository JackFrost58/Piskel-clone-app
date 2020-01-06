import './canvas.scss';
import currentSizeCanvas from './currentSizeCanvas';

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const previewField = document.getElementById('preview');
const previewCtx = previewField.getContext('2d');

function initCanvas() {
    canvas.width = currentSizeCanvas();
    canvas.height = currentSizeCanvas();
    previewField.width = currentSizeCanvas();
    previewField.height = currentSizeCanvas();
}

export default initCanvas;