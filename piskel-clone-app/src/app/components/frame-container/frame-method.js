import {addActiveClassToFrame} from "../../utils/frameUpdate";
import createFrame from '../createFrame';
import {pasteImage} from "../../utils/drawImage";
import {updateFramesState} from "../../utils/frameUpdate";

let frameContainers; 
let canvas;

function addFrame(frames) {
    frameContainers = document.querySelector('.frame-containers');
    canvas = document.getElementById('canvas');
    const newFrameContainer = createFrame(frames.length + 1);
    const frame = newFrameContainer.firstElementChild;

    frameContainers.append(newFrameContainer);

    pasteImage(frame.children[1].toDataURL(), canvas)
    addActiveClassToFrame(frame, frames);

    frames.push(frame);
}

function dublicateFrame(copiedFrame, canvas) {
    const frameNum = copiedFrame.children[0].textContent;
    const frameContainer = createFrame(Number(frameNum) + 1);
    const frame = frameContainer.firstElementChild;
    const copiedFrameContainer = copiedFrame.parentElement;
    copiedFrameContainer.after(frameContainer);

    const url = copiedFrame.children[1].toDataURL();

    pasteImage(url, frame.children[1]);
    pasteImage(url, canvas);

    return updateFramesState();
}


export {dublicateFrame, addFrame};