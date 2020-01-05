import { addActiveClassToFrame } from "../../utils/frameUpdate";
import createFrame from "../createFrame";

const frameContainers = document.querySelector('.frame-containers');

function addFrame(frames) {
    const newFrameContainer = createFrame(frames.length + 1);
    const frame = newFrameContainer.firstElementChild;

    frameContainers.append(newFrameContainer);
    
    addActiveClassToFrame(frame, frames);

    frames.push(frame);
}

export default addFrame;