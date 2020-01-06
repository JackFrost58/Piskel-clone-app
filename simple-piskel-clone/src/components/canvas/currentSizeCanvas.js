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
    
export default currentSizeCanvas;