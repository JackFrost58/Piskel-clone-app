import { updateFramesState } from "../../utils/frameUpdate";

const frameContainers = document.querySelector('.frame-containers');

function deleteFrame(frame, frames) {
    const frameIndex = frame.children[0].textContent - 1;
    const removeEl = frame.parentElement;
    if (frame.classList.contains("frame--select")) {
        const previewFrame = frames[frameIndex - 1];
        previewFrame.classList.add('frame--select');
        frameContainers.removeChild(removeEl);
    } else {
        frameContainers.removeChild(removeEl);
    }
    
    return updateFramesState();
}

export default deleteFrame;