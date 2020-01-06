function pasteImage(url, canvas) {
    const size = localStorage.getItem('size');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    let img = new Image();
    img.src = url;

    img.onload = () => {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, size, size);
        context.imageSmoothingEnable = false;
        context.drawImage(img, 0, 0);
    }
}

function pasteOnFrame(canvas) {   
    let currentFrame = document.querySelector('.frame--active');
    const currentCanvas = currentFrame.children[1];

    pasteImage(canvas.toDataURL(), currentCanvas);
}

export { pasteImage, pasteOnFrame };