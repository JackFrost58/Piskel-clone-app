const select = document.getElementById('size');

const currentSizeCanvas = function setSize() {
    const select = document.getElementById('size');
    let size;
    if(localStorage.getItem('size')) {
        size = localStorage.getItem('size');
        select.value = localStorage.getItem('size');
    } else {
        localStorage.setItem('size', '32');
        size = localStorage.getItem('size');
    }
    
    return size;
}
  
function selectSizeCanvasHandler() {
    const previewField = document.getElementById('preview');

    if(select.value !== localStorage.getItem('size')) {
        localStorage.setItem('size', select.value);
        canvas.width = currentSizeCanvas();
        canvas.height = currentSizeCanvas(); 
        previewField.width = currentSizeCanvas();
        previewField.height = currentSizeCanvas(); 
    }
}

function initCanvasSize() {
    select.addEventListener('change', selectSizeCanvasHandler)
}

export {currentSizeCanvas, initCanvasSize};