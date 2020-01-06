function getCoordinates(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / (canvas.clientWidth / canvas.width));
    const y = Math.floor((e.clientY - rect.top) / (canvas.clientHeight / canvas.height));
  
    return [x, y];
}

export default getCoordinates;