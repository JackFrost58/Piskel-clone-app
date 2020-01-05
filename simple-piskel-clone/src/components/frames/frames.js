import './frames.scss';

import { updateFramesIndexes, addActiveClassToFrame } from '../utils/frameUpdate';
import dublicateFrame from './methods/dublicateFrame';
import deleteFrame from './methods/deleteFrame';
import addFrame from './methods/addFrame';

const frameContainers = document.querySelector('.frame-containers');
const btnAddFrame = document.getElementById('add-frame');
const startFrame = document.querySelector('.frame');
let frames = [startFrame];
let canvas;

function bar() {
    console.log('succes');
}


btnAddFrame.addEventListener('click', () => {
    addFrame(frames);
})

function framesContainerClickHandler(e) {
    const frame = e.target.parentElement;
    const classesEl = e.target.classList;
    canvas = document.getElementById('canvas');

    if (classesEl.contains('frame__canvas')) {
        addActiveClassToFrame(frame, frames);
    } else if (classesEl.contains('frame__duplicate')) {
        frames = dublicateFrame(frame);
        updateFramesIndexes(frames);
    } else if (classesEl.contains('frame__delete')) {
        frames = deleteFrame(frame, frames);
        updateFramesIndexes(frames);
    }
}


function initFrames() {
    frameContainers.addEventListener('click', framesContainerClickHandler);
}

initFrames();

export default bar;