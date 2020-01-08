import { updateFramesState } from "../../utils/frameUpdate";

let frameContainers;

function deleteFrame(frame, frames) {
    frameContainers = document.querySelector('.frame-containers');
    const frameIndex = frame.children[0].textContent - 1;
    const removeEl = frame.parentElement;
    if (frame.classList.contains("frame--active")) {
        const previewFrame = frames[frameIndex - 1] || frames[1];
        previewFrame.classList.add('frame--active');
        frameContainers.removeChild(removeEl);
    } else {
        frameContainers.removeChild(removeEl);
    }
    
    return updateFramesState();
}

export default deleteFrame;