import { addActiveClassToFrame } from "../../utils/frameUpdate";
import createFrame from '../createFrame';
import { pasteImage } from "../../utils/drawImage";

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

export default addFrame;