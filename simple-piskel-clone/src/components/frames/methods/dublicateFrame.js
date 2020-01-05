import createFrame from "../createFrame";
import { updateFramesState } from "../../utils/frameUpdate";

function dublicateFrame(copiedFrame) {
    const frameNum = copiedFrame.children[0].textContent;
    const frameContainer = createFrame(Number(frameNum) + 1);
    //const frame = frameContainer.firstElementChild;
    const copiedFrameContainer = copiedFrame.parentElement;
    //console.log(frame);
    copiedFrameContainer.after(frameContainer);

   // const url = copiedFrame.firstElementChild.toDataURL();

    //printImage(url, frame.firstElementChild);
    //printImage(url, canvas);

    return updateFramesState();
}

export default dublicateFrame;