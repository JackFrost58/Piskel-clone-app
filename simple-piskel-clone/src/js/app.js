import '../css/style.css';
import '../css/style.scss';

import { init } from './main';
import { func } from './event';
import bar from '../components/frames/frames'
import convertHexToRgba from '../components/utils/hexToRgba';
import {bucketPart, bucketAll, clearCanvas, getCoordinates, useTool} from '../components/tools/tools';


const flags = {
  bucketAll: false,
  bucketPart: false,
  pen: true,
  eraser: false,
  stroke: false,
};


const buttonTools = document.querySelectorAll('.button__element');
const buttonClear = document.getElementById('clear');
const select = document.getElementById('size');
//const buttonLogin = document.getElementById('login');
const colorList = document.querySelectorAll('.list__element');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

const currentColor = document.getElementById('current-color');
const prevColor = document.getElementById('prev-color');

const frames = document.querySelectorAll('.frame__canvas');


localStorage.setItem('sizePen', 1);


const previewField = document.getElementById('preview');
const previewCtx = previewField.getContext('2d');


const currentSizeCanvas = function setSize() {
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
      useTool(previewCtx, startCoordinates, currentCoordinates, currentColor.value, sizePen)

      startCoordinates = currentCoordinates;
    });

    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
    }); 
  }

  if (flags.bucketAll === true) {
    const size = localStorage.getItem('size');
    bucketAll(context, previewCtx, currentColor, size);
  }

  if(flags.bucketPart === true) {
    const coordinates = getCoordinates(canvas, event);
    const [x, y] = coordinates;
    const targetColor = context.getImageData(x,y,1,1).data.toString();
    const replaceColor = convertHexToRgba(currentColor.value);
    bucketPart(context, targetColor, replaceColor, coordinates);
    bucketPart(previewCtx, targetColor, replaceColor, coordinates);
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
  localStorage.setItem('canvasImage', this.canvas.toDataURL());
  localStorage.setItem('currentColor', currentColor.value);
  for (const prop in flags) {
    if (flags[prop] === true) {
      localStorage.setItem('activeTool', prop);
    }
  }
};

const dataURL = localStorage.getItem('canvasImage');
const img = new Image();
img.src = dataURL;
img.onload = function drawFromStorage() {
  context.drawImage(img, 0, 0);
  previewCtx.drawImage(img, 0, 0);
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
init();






export {currentSizeCanvas}

// buttonLogin.addEventListener('click', () => {
//   window.netlifyIdentity.open();
  
//   window.netlifyIdentity.on('logout', () => {
//     buttonLogin.textContent = 'Login';
//   });

//   window.netlifyIdentity.on('login', () => {
//     buttonLogin.textContent = 'Logout';
//   });
// });

// function isCanvasBlank(canvas) {
//   return !context
//   .getImageData(0, 0, canvas.width, canvas.height).data
//   .some(channel => channel !== 0)
// }

// async function getLinkToImage(town, key) {
//   const url = `https://api.unsplash.com/photos/random?query=town,${town}&client_id=${key}`;
  
//   const response = await fetch(url);
//   const data = await response.json();
  
//   const img = new Image();
//   img.src = data.urls.small;
//   img.crossOrigin = "Anonymous";

//   const scaledWidth = (canvas.width * data.width) / data.height;
//   const scaledHeight = (canvas.height * data.height) / data.width;

//   const paddingTopBottom = (canvas.height - scaledHeight) / 2;
//   const paddingLeftRight = (canvas.width - scaledWidth) / 2;

//   img.onload = function drawFromLink() {
//     if (data.width > data.height) {
//       context.drawImage(img, 0, paddingTopBottom, canvas.width, scaledHeight);
//     } else {
//       context.drawImage(img, paddingLeftRight, 0, scaledWidth, canvas.height);
//     }
    
//   }; 
// }

// function RgbToHex(red, green, blue) {
//   let redHex = red.toString(16);
//   let greenHex = green.toString(16);
//   let blueHex = blue.toString(16);

//   if (redHex.length === 1) { redHex = `0${redHex}`; }
//   if (greenHex.length === 1) { greenHex = `0${greenHex}`; }
//   if (blueHex.length === 1) { blueHex = `0${blueHex}`; }
//   return (`#${redHex},${greenHex},${blueHex},${255}`);
// }

// function initNetlify() {
//   const script = document.createElement('script');
//   script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
//   script.async = true;

//   document.body.append(script); 
// }
