import addFrame from "../frames/methods/addFrame";
import { pasteImage } from "./drawImage";

function saveFrames(frames) {
    const framesToDataUrls = frames.map(frame => frame.children[1].toDataURL());

    localStorage.setItem('allFrames', JSON.stringify(framesToDataUrls));
}

function setDefaultPenSize() {
    if (localStorage.getItem('sizePen')) {
        const activeSizePen = localStorage.getItem('sizePen');
        document.querySelector(`div[data-size="${activeSizePen}"]`).classList.add('active');
    } else {
        localStorage.setItem('sizePen', 2);
        document.querySelector(`div[data-size="2"]`).classList.add('active');
    }
}

function setColorPen() {
    document.querySelector('#current-color').value = localStorage.getItem('currentColor') || '#ff00ff';
    document.querySelector('#prev-color').value = localStorage.getItem('previewColor') || '#ffffff';
    
    if(!localStorage.getItem('currentColor') && !localStorage.getItem('previewColor')) {
        localStorage.setItem('currentColor', '#00ff00');
        localStorage.setItem('previewColor', '#ffffff');
    }     
}

function setDefaultTool() {
    if (localStorage.getItem('activeTool')) {
        const activeTool = localStorage.getItem('activeTool');
        document.querySelector(`#${activeTool}`).classList.add('active');
    } else {
        localStorage.setItem('activeTool', 'pen');
        document.querySelector(`#pen`).classList.add('active');
    }
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

export {saveFrames, drawFramesUrl, setDefaultTool, setDefaultPenSize, setColorPen}