import addFrame from "../frames/methods/addFrame";
import { pasteImage } from "./drawImage";

function saveFrames(frames) {
    const framesToDataUrls = frames.map(frame => frame.children[1].toDataURL());

    localStorage.setItem('allFrames', JSON.stringify(framesToDataUrls));
}

function drawFramesUrl(frames) {
    const allFrames = JSON.parse(localStorage.getItem('allFrames'));
    const canvas = document.getElementById('canvas');

    allFrames.forEach((url, index) => {
        if (index !== 0) {
            addFrame(frames);
        }

        pasteImage(url, frames[index].children[1]);
        pasteImage(url, canvas);
    })
}

export {saveFrames, drawFramesUrl}