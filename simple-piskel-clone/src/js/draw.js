const context = canvas.getContext('2d');

function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / (canvas.clientWidth / canvas.width));
    const y = Math.floor((e.clientY - rect.top) / (canvas.clientHeight / canvas.height));
  
    return [x, y];
  }

function draw(e, color, isDrawing) {
    if (!isDrawing) return;
    const [x, y] = getCoordinates(e);
    context.fillStyle = color;
    context.fillRect(x, y, 1, 1);
    context.fill();
}

export default draw