import './tools.scss';
import convertRgbaToHex from "../utils/rgbaToHex";
import { pasteOnFrame } from '../utils/drawImage';
import { setDefaultTool } from '../utils/saveLocalStorage';

const toolsMenu = document.querySelector('.menu__default');
const buttonClear = document.getElementById('clear');
  
function useTool(ctx, startCoord, currentCoord, color, penSize) {
  const context = ctx;
  let [x0, y0] = startCoord;
  const [x1, y1] = currentCoord;

  const deltaX = Math.abs(x1 - x0);
  const deltaY = Math.abs(y1 - y0);
  const signX = (x0 < x1) ? 1 : -1;
  const signY = (y0 < y1) ? 1 : -1;
  let err = deltaX - deltaY;

  while(true) {
    context.fillStyle = color;
    context.fillRect(x0, y0, penSize, penSize) 

    if ((x0 === Number(x1)) && (y0 === Number(y1))) break;
    const e2 = 2 * err;
    if (e2 > -deltaY) { err -= deltaY; x0  += signX; }
    if (e2 < deltaX) { err += deltaX; y0  += signY; }
  }
}

function bucketAll(ctx, currentColor, sizeCanvas) {
  const context = ctx;

  context.fillStyle = currentColor;
  context.fillRect(0, 0, sizeCanvas, sizeCanvas);
}

function clearCanvas(size) {
  const canvas = document.querySelector('#canvas');
  const context = canvas.getContext('2d');

  context.fillStyle = '#fff';
  context.fillRect(0, 0, size, size);
}

function bucketPart(ctx, targetColor, replaceColor, coors) {
  const context = ctx;

  if (targetColor === replaceColor) return;

  const replaceColorHex = convertRgbaToHex(replaceColor);

  context.fillStyle = replaceColorHex;
  context.fillRect(coors[0], coors[1], 1, 1);
  
  const queue = [];
  queue.push(coors);

  while (queue.length) {
    const node = queue[0];

    queue.shift();

    const rightNode = [node[0] + 1, node[1]];
    const leftNode = [node[0] - 1, node[1]];
    const bottomNode = [node[0], node[1] + 1];
    const topNode = [node[0], node[1] - 1];

    if (context.getImageData(rightNode[0], rightNode[1], 1, 1).data.toString() === targetColor) {
      context.fillRect(rightNode[0], rightNode[1], 1, 1);
      queue.push(rightNode);
    }
    
    if (context.getImageData(leftNode[0], leftNode[1], 1, 1).data.toString() === targetColor) {
      context.fillRect(leftNode[0], leftNode[1], 1, 1);
      queue.push(leftNode);
    }
    
    if (context.getImageData(bottomNode[0], bottomNode[1], 1, 1).data.toString() === targetColor) {
      context.fillRect(bottomNode[0], bottomNode[1], 1, 1);
      queue.push(bottomNode);
    }
    
    if (context.getImageData(topNode[0], topNode[1], 1, 1).data.toString() === targetColor) {
      context.fillRect(topNode[0], topNode[1], 1, 1);
      queue.push(topNode);

    }
    
  }
}

function btnClearMouseDownHandler() {
  const size = localStorage.getItem('size');
  const canvas = document.querySelector('#canvas');
  
  clearCanvas(size);
  pasteOnFrame(canvas)
}

function toolClickHandler(e) {
  const buttonTools = document.querySelectorAll('.button__element');
  buttonTools.forEach((element) => {
    element.classList.remove('active');
  });

  const currentTool = e.target;

  if (currentTool) {
    localStorage.setItem('activeTool', currentTool.id);
    currentTool.classList.add('active');
  }  
}

function windowLoadHandler() {
  setDefaultTool();
}

function initTool() {
  toolsMenu.addEventListener('click', toolClickHandler);
  buttonClear.addEventListener('click', btnClearMouseDownHandler);
  window.addEventListener('load', windowLoadHandler);
}

export {bucketAll, clearCanvas, bucketPart, useTool, initTool}