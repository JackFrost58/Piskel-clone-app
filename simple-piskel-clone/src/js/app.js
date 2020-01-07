import '../css/style.css';
import '../css/style.scss';

import { func } from './event';
import convertHexToRgba from '../components/utils/hexToRgba';
import {bucketPart, bucketAll, clearCanvas, useTool} from '../components/tools/tools';
import { pasteOnFrame } from '../components/utils/drawImage';
import initFrames from '../components/frames/frames';
import initCanvas from '../components/canvas/canvas';
import getCoordinates from '../components/utils/getCoordinate';
import initAnimation from '../components/animation/animation';
import initNetlify from '../components/login/login';

const flags = {
  bucketAll: false,
  bucketPart: false,
  pen: true,
  eraser: false,
  stroke: false,
};

const buttonTools = document.querySelectorAll('.button__element');
const buttonClear = document.getElementById('clear');

const colorList = document.querySelectorAll('.list__element');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

const currentColor = document.getElementById('current-color');
const prevColor = document.getElementById('prev-color');

localStorage.setItem('sizePen', 1);

const previewField = document.getElementById('preview');
const previewCtx = previewField.getContext('2d');


const keyToRemove = ['canvasImage', 'currentColor', 'activeTool']


buttonTools.forEach((item) => {
  item.addEventListener('click', (event) => {
    buttonTools.forEach((element) => {
      element.classList.remove('active');
    });
    switch (event.currentTarget.id) {
      case ('bucketAll'):
        flags.bucketAll = true;
        flags.bucketPart = false;
        flags.pen = false;
        flags.eraser = false;
        flags.stroke = false;
        document.querySelector('#bucketAll').classList.add('active');
        break;

        case ('bucketPart'):
        flags.bucketAll = false;
        flags.bucketPart = true;
        flags.pen = false;
        flags.eraser = false;
        flags.stroke = false;
        document.querySelector('#bucketPart').classList.add('active');
        break;

      case ('pen'):
        flags.bucketAll = false;
        flags.bucketPart = false;
        flags.pen = true;
        flags.eraser = false;
        flags.stroke = false;
        document.querySelector('#pen').classList.add('active');
        break;

      case ('eraser'):
        flags.bucketAll = false;
        flags.bucketPart = false;
        flags.pen = false;
        flags.eraser = true;
        flags.stroke = false;
        document.querySelector('#eraser').classList.add('active');
        break;

      case ('stroke'):
        flags.bucketAll = false;
        flags.bucketPart = false;
        flags.pen = false;
        flags.eraser = false;
        flags.stroke = true;
        document.querySelector('#stroke').classList.add('active');
        break;

      default: console.log('');
    }
  });
});

colorList.forEach((item) => {
  item.addEventListener('click', (event) => {
    switch (event.target.id) {
      case ('current-color'):
        prevColor.value = currentColor.value;
        break;
      case ('prev-color'):
        currentColor.value = prevColor.value;
        break;
      default: console.log('');
    }
  });
});

let startCoordinates = [0, 0];


canvas.addEventListener('mousedown', (event) => {
  let isDrawing = false;

  if (flags.pen === true) {
    isDrawing = true;
    startCoordinates = getCoordinates(canvas, event);

    canvas.addEventListener('mousemove', (e) => {
      if(!isDrawing) return;

      const sizePen = localStorage.getItem('sizePen');
      const currentCoordinates = getCoordinates(canvas, e);

      useTool(context, startCoordinates, currentCoordinates, currentColor.value, sizePen);
      useTool(previewCtx, startCoordinates, currentCoordinates, currentColor.value, sizePen);
      

      startCoordinates = currentCoordinates;
    });

    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      pasteOnFrame(canvas);
      //pasteImage(previewField);
    }); 
  }

  if (flags.bucketAll === true) {
    const size = localStorage.getItem('size');
    bucketAll(context, previewCtx, currentColor, size);
    pasteOnFrame(canvas);
  }

  if(flags.bucketPart === true) {
    const coordinates = getCoordinates(canvas, event);
    const [x, y] = coordinates;
    const targetColor = context.getImageData(x,y,1,1).data.toString();
    const replaceColor = convertHexToRgba(currentColor.value);
    bucketPart(context, targetColor, replaceColor, coordinates);
    bucketPart(previewCtx, targetColor, replaceColor, coordinates);
    pasteOnFrame(canvas);
  }

  if (flags.eraser === true) {
    isDrawing = true;
    const colorEraser = '#ffffff';
    startCoordinates = getCoordinates(canvas, event);

    canvas.addEventListener('mousemove', (e) => {
      if(!isDrawing) return;

      const sizePen = localStorage.getItem('sizePen');
      const currentCoordinates = getCoordinates(canvas, e);

      useTool(context, startCoordinates, currentCoordinates, colorEraser, sizePen);
      useTool(previewCtx, startCoordinates, currentCoordinates, colorEraser, sizePen)

      startCoordinates = currentCoordinates;
    });

    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      pasteOnFrame(canvas);
    });
  }

  if (flags.stroke === true) {
    isDrawing = true;
    startCoordinates = getCoordinates(canvas, event);

    canvas.addEventListener('mousemove', (e) => {
      const currentCoordinates = getCoordinates(canvas, e);
      localStorage.setItem('endCoorLine', currentCoordinates);      
    });

    canvas.addEventListener('mouseup', () => {
      if(!isDrawing) return;
      const sizePen = localStorage.getItem('sizePen');
      const endCoors = localStorage.getItem('endCoorLine').split(',');
      useTool(context, startCoordinates, endCoors, currentColor.value, sizePen);
      useTool(previewCtx, startCoordinates, endCoors, currentColor.value, sizePen);
      isDrawing = false;
      pasteOnFrame(canvas);
    });
  }
});

buttonClear.addEventListener('mousedown', () => {
  buttonClear.classList.add('active');
  keyToRemove.forEach(element => localStorage.removeItem(element));
  currentColor.value = '#00ff00';
  const size = localStorage.getItem('size');
  clearCanvas(context, previewCtx, size);
});

buttonClear.addEventListener('mouseup', () => {
  buttonClear.classList.remove('active');
})

window.onbeforeunload = function saveData() {
  localStorage.setItem('currentColor', currentColor.value);
  for (const prop in flags) {
    if (flags[prop] === true) {
      localStorage.setItem('activeTool', prop);
    }
  }
};

window.onload = function setTool() {
  currentColor.value = localStorage.getItem('currentColor');
  const activeTool = localStorage.getItem('activeTool');
  for (const prop in flags) {
    if (prop === activeTool) {
      flags[activeTool] = true;
    } else {
      flags[prop] = false;
    }
  }
  document.querySelector(`#${activeTool}`).classList.add('active');
};


func;
initFrames();
initCanvas();
initAnimation();
initNetlify();