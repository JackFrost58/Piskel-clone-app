import './frames.scss';

import { updateFramesIndexes, addActiveClassToFrame } from '../utils/frameUpdate';
import dublicateFrame from './methods/dublicateFrame';
import deleteFrame from './methods/deleteFrame';
import addFrame from './methods/addFrame';
import { pasteImage } from '../utils/drawImage';
import dragAndDrop from './methods/dragAndDrop';

const frameContainers = document.querySelector('.frame-containers');
const btnAddFrame = document.getElementById('add-frame');
const startFrame = document.querySelector('.frame');
let frames = [startFrame];
let canvas;

btnAddFrame.addEventListener('click', () => {
    addFrame(frames);
})

function framesContainerClickHandler(e) {
    const frame = e.target.parentElement;
    const classesEl = e.target.classList;
    canvas = document.getElementById('canvas');

    if (classesEl.contains('frame__canvas')) {
        addActiveClassToFrame(frame, frames);
        pasteImage(e.target.toDataURL(), canvas);
    } else if (classesEl.contains('frame__duplicate')) {
        frames = dublicateFrame(frame, canvas);
        updateFramesIndexes(frames);
    } else if (classesEl.contains('frame__delete')) {
        frames = deleteFrame(frame, frames);
        updateFramesIndexes(frames);
    }
}

function initFrames() {
    frameContainers.addEventListener('click', framesContainerClickHandler);
    frameContainers.addEventListener('mousedown', dragAndDrop);
}

export default initFrames;