import '../css/style.css';
import '../css/style.scss';

import { getCoordinates, useTool, useToolStroke } from './draw'
import { init } from './main';
import { func } from './event';

const flags = {
  bucket: false,
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
const prevColor = document.getElementById('change-color');
const currentColor = document.getElementById('select-color');
const frames = document.querySelectorAll('.frame__canvas');


localStorage.setItem('sizePen', 1);
prevColor.style.value = '#0000ff';

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
      case ('bucket'):
        flags.bucket = true;
        flags.pen = false;
        flags.eraser = false;
        flags.stroke = false;
        document.querySelector('#bucket').classList.add('active');
        break;

      case ('pen'):
        flags.bucket = false;
        flags.pen = true;
        flags.eraser = false;
        flags.stroke = false;
        document.querySelector('#pen').classList.add('active');
        break;

      case ('eraser'):
        flags.bucket = false;
        flags.pen = false;
        flags.eraser = true;
        flags.stroke = false;
        document.querySelector('#eraser').classList.add('active');
        break;

      case ('stroke'):
        flags.bucket = false;
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
    colorList.forEach((element) => {
      element.classList.remove('active');
    });
    switch (event.currentTarget.id) {
      case ('current-color'):
        prevColor.style.value = currentColor.value;
        currentColor.click();
        document.querySelector('#current-color').classList.add('active');
        break;
      case ('prev-color'):
        prevColor.style.value = currentColor.value;
        prevColor.classList.add('active');
        break;
      default: console.log('');
    }
  });
});

let startCoordinates = [0, 0];

canvas.addEventListener('mousedown', (event) => {
  if (flags.pen === true) {
    let isDrawing = true;
    startCoordinates = getCoordinates(event);

    canvas.addEventListener('mousemove', (e) => {
      if(!isDrawing) return;

      const sizePen = localStorage.getItem('sizePen');

      const currentCoordinates = getCoordinates(e);

      useTool(context, startCoordinates, currentCoordinates, currentColor.value, sizePen);
      useTool(previewCtx, startCoordinates, currentCoordinates, currentColor.value, sizePen)

      startCoordinates = currentCoordinates;
    });

    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
    });
  }

  if (flags.bucket === true) {
    context.fillStyle = currentColor.value;
    previewCtx.fillStyle = currentColor.value;
    context.fillRect(0, 0, 512, 512);
    previewCtx.fillRect(0, 0, 512, 512);
  }

  if (flags.eraser === true) {
    let isDrawing = true;
    const colorEraser = '#ffffff';
    startCoordinates = getCoordinates(event);

    canvas.addEventListener('mousemove', (e) => {
      if(!isDrawing) return;

      const sizePen = localStorage.getItem('sizePen');
      const currentCoordinates = getCoordinates(e);

      useTool(context, startCoordinates, currentCoordinates, colorEraser, sizePen);
      useTool(previewCtx, startCoordinates, currentCoordinates, colorEraser, sizePen)

      startCoordinates = currentCoordinates;
    });

    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
    });
  }

  if (flags.stroke === true) {
    let isDrawing = true;
    startCoordinates = getCoordinates(event);

    canvas.addEventListener('mousemove', (e) => {
      if(!isDrawing) return;

      const currentCoordinates = getCoordinates(e);
      localStorage.setItem('loc', currentCoordinates);      
    });

    canvas.addEventListener('mouseup', () => {
      const sizePen = localStorage.getItem('sizePen');
      const endCoors = localStorage.getItem('loc').split(',');
      useToolStroke(context, startCoordinates, endCoors, currentColor.value, sizePen);
      useToolStroke(previewCtx, startCoordinates, endCoors, currentColor.value, sizePen);
      isDrawing = false;
    });
  }
});

buttonClear.addEventListener('mousedown', () => {
  buttonClear.classList.add('active');
  keyToRemove.forEach(element => localStorage.removeItem(element));
  currentColor.value = '#00ff00';
  context.clearRect(0, 0, 512, 512);
  previewCtx.clearRect(0, 0, 512, 512);
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
//   return (`#${redHex}${greenHex}${blueHex}`);
// }

// function initNetlify() {
//   const script = document.createElement('script');
//   script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
//   script.async = true;

//   document.body.append(script); 
// }
