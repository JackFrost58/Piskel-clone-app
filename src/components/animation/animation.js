import './animation.scss'

import getImageFromFrames from '../utils/getImageFromFrames';
import { pasteImage } from '../utils/drawImage';

const btnFullScreen = document.getElementById('fullScreen');
const inputRange = document.getElementById('numberFps');
const fieldFps = document.getElementById('fieldFps');
const previewWindow = document.getElementById('preview');

let fpsDuration;
let now;
let then;
let elapsed;

let currentFrame = 0;

function animate() {
    requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now -then;

    if (elapsed > fpsDuration) {
        then = now - (elapsed % fpsDuration);
        const imageUrl = getImageFromFrames();

        currentFrame = (currentFrame + 1) % imageUrl.length;

        pasteImage(imageUrl[currentFrame], previewWindow);
    }
}

function startAnimation(startFps) {
  fpsDuration = 1000 / startFps;
  then = Date.now();
  animate();  
}

function setCurrentFpsInputHandler(event) {
    const currentFps = event.target.value;

    fieldFps.textContent = `${currentFps} fps`;
    startAnimation(currentFps);
    localStorage.setItem('fps', currentFps);
}

function setStartFps() {
    const startFps = localStorage.getItem('fps') || '0';

    if (!startFps) {
        localStorage.setItem('fps', '0');
    }

    inputRange.value = startFps;
    fieldFps.textContent = `${startFps} fps`;

    startAnimation(startFps);
}

function fullScreenClickHandler() {
    previewWindow.requestFullscreen() ||
    previewWindow.webkitRequestFullscreen() ||
    previewWindow.mozRequestFullscreen();
}

function initAnimation() {
    setStartFps();

    inputRange.addEventListener('input', setCurrentFpsInputHandler);
    btnFullScreen.addEventListener('click', fullScreenClickHandler);
}

export default initAnimation;
