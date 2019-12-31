function getCoordinates(e) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / (canvas.clientWidth / canvas.width));
  const y = Math.floor((e.clientY - rect.top) / (canvas.clientHeight / canvas.height));

  return [x, y];
}

function useTool(context, startCoord, currentCoord, color, penSize) {
  let [x0, y0] = startCoord;
  const [x, y] = currentCoord;

  const deltaX = Math.abs(x - x0);
  const deltaY = Math.abs(y - y0);

  const signX = x0 < x ? 1 : -1;
  const signY = y0 < y ? 1 : -1;

  let difference = deltaX - deltaY;

  for (;;) {
    context.fillStyle = color;
    context.fillRect(x0, y0, penSize, penSize);

    if (x0 == x && y0 == y) break;

    const differenceX2 = difference * 2;

    if (differenceX2 > -deltaY) {
      difference -= deltaY;
      x0 += signX;
    }

    if (differenceX2 < deltaX) {
      difference += deltaX;
      y0 += signY;
    }
  }
}

function useToolStroke(context, startCoord, currentCoord, color, penSize) {
  let [x0, y0] = startCoord;
  let [x1, y1] = currentCoord;

  var dx = Math.abs(x1 - x0);
  var dy = Math.abs(y1 - y0);
  var sx = (x0 < x1) ? 1 : -1;
  var sy = (y0 < y1) ? 1 : -1;
  var err = dx - dy;

  while(true) {
    context.fillStyle = color;
      context.fillRect(x0, y0, penSize, penSize) 

      if ((x0 == x1) && (y0 == y1)) break;
      var e2 = 2*err;
      if (e2 > -dy) { err -= dy; x0  += sx; }
      if (e2 < dx) { err += dx; y0  += sy; }
  }
}

export {getCoordinates, useTool, useToolStroke}