import { updateFramesState } from "../../utils/frameUpdate";

const frameContainers = document.querySelector('.frame-containers');

function deleteFrame(frame, frames) {
    const frameIndex = frame.children[0].textContent - 1;
    const removeEl = frame.parentElement;
    if (frame.classList.contains("frame--active")) {
        const previewFrame = frames[frameIndex - 1];
        previewFrame.classList.add('frame--active');
        frameContainers.removeChild(removeEl);
    } else {
        frameContainers.removeChild(removeEl);
    }
    
    return updateFramesState();
}

export default deleteFrame;