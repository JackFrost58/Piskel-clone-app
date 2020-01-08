import './frames.scss';

import { updateFramesIndexes, addActiveClassToFrame } from '../utils/frameUpdate';
import dublicateFrame from './methods/dublicateFrame';
import deleteFrame from './methods/deleteFrame';
import addFrame from './methods/addFrame';
import { pasteImage } from '../utils/drawImage';
import dragAndDrop from './methods/dragAndDrop';
import { drawFramesUrl, saveFrames } from '../utils/saveLocalStorage';

const frameContainers = document.querySelector('.frame-containers');
const btnAddFrame = document.getElementById('add-frame');
const startFrame = document.querySelector('.frame');
let frames = [startFrame];
let canvas;

function addFrameClickHandler() {
    addFrame(frames);
}

function windowUnloadHandler() {
    saveFrames(frames);
}

function windowLoadHandler() {
    drawFramesUrl(frames);
}

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
    } else if (classesEl.contains('frame__delete') && frames.length > 1) {
        frames = deleteFrame(frame, frames);
        updateFramesIndexes(frames);
    }
}

function initFrames() {
    frameContainers.addEventListener('click', framesContainerClickHandler);
    frameContainers.addEventListener('mousedown', dragAndDrop);
    btnAddFrame.addEventListener('click', addFrameClickHandler);
    window.addEventListener('load', windowLoadHandler);
    window.addEventListener('unload', windowUnloadHandler);
}

export default initFrames;