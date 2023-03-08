import addFrame from "../frames/methods/addFrame";

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

function getImageFromFrames() {
  const frameContainers = document.querySelectorAll('.frame-container');
  const imageFromFrames = Array.from(frameContainers).map(frame => 
    frame.firstElementChild.children[1].toDataURL());

  return imageFromFrames;
}

function pasteImage(url, canvasEl) {
  const canvas = canvasEl;
  const size = localStorage.getItem('size');
  const context = canvas.getContext('2d');
  const img = new Image();
  img.src = url;

  canvas.width = size;
  canvas.height = size;

  img.onload = () => {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, size, size);
    context.imageSmoothingEnable = false;
    context.drawImage(img, 0, 0);
  }
}

function pasteOnFrame(canvas) {   
  const currentFrame = document.querySelector('.frame--active');
  const currentCanvas = currentFrame.children[1];

  pasteImage(canvas.toDataURL(), currentCanvas);
}


export {saveFrames, drawFramesUrl, getImageFromFrames, pasteImage, pasteOnFrame}