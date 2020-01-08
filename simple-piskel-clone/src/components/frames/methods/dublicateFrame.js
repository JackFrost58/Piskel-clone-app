import createFrame from '../createFrame'
import { updateFramesState } from "../../utils/frameUpdate";
import { pasteImage } from "../../utils/drawImage";

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

export default dublicateFrame;