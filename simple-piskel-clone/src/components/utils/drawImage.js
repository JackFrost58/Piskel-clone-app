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

export { pasteImage, pasteOnFrame };