import '../css/style.css';
import '../css/style.scss';

const flags = {
    bucket: false,
    pen: true,
    eraser: false,
    stroke: false,
  };
  
  const buttonTools = document.querySelectorAll('.button__element');
  const buttonClear = document.getElementById('clear');
  const buttonLogin = document.getElementById('login');
  const buttonGrayscale = document.getElementById('grayscale');
  const buttonLoad = document.getElementById('buttonLoad');
  const colorList = document.querySelectorAll('.list__element');
  const canvas = document.querySelector('#canvas');
  const prevColor = document.getElementById('change-color');
  const currentColor = document.getElementById('select-color');
  const context = canvas.getContext('2d');
  let isDrawing = false;
  const size = 128;
  const keyToRemove = ['canvasImage', 'currentColor', 'activeTool']
  
  prevColor.style.background = '#0000ff';
  canvas.width = size;
  canvas.height = size;
  
  async function getLinkToImage(town, key) {
    const url = `https://api.unsplash.com/photos/random?query=town,${town}&client_id=${key}`;
    
    const response = await fetch(url);
    const data = await response.json();
   
    const img = new Image();
    img.src = data.urls.small;
    img.crossOrigin = "Anonymous";
  
    const scaledWidth = (canvas.width * data.width) / data.height;
    const scaledHeight = (canvas.height * data.height) / data.width;
  
    const paddingTopBottom = (canvas.height - scaledHeight) / 2;
    const paddingLeftRight = (canvas.width - scaledWidth) / 2;
  
    img.onload = function drawFromLink() {
      if (data.width > data.height) {
        context.drawImage(img, 0, paddingTopBottom, canvas.width, scaledHeight);
      } else {
        context.drawImage(img, paddingLeftRight, 0, scaledWidth, canvas.height);
      }
      
    }; 
  }
  
  function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / (canvas.clientWidth / canvas.width));
    const y = Math.floor((e.clientY - rect.top) / (canvas.clientHeight / canvas.height));
  
    return [x, y];
  }
  
  function draw(e, color) {
    if (!isDrawing) return;
    const [x, y] = getCoordinates(e);
    context.fillStyle = color;
    context.fillRect(x, y, 1, 1);
    context.fill();
    
  }
  
  function RgbToHex(red, green, blue) {
    let redHex = red.toString(16);
    let greenHex = green.toString(16);
    let blueHex = blue.toString(16);
  
    if (redHex.length === 1) { redHex = `0${redHex}`; }
    if (greenHex.length === 1) { greenHex = `0${greenHex}`; }
    if (blueHex.length === 1) { blueHex = `0${blueHex}`; }
    return (`#${redHex}${greenHex}${blueHex}`);
  }
  
  function initNetlify() {
    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
  
    document.body.append(script); 
  }
  
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
          prevColor.style.background = currentColor.value;
          currentColor.click();
          document.querySelector('#current-color').classList.add('active');
          break;
        case ('prev-color'):
          prevColor.style.background = currentColor.value;
          prevColor.classList.add('active');
          break;
        default: console.log('');
      }
    });
  });
  
  canvas.addEventListener('mousedown', (event) => {
    if (flags.pen === true) {
      isDrawing = true;
      canvas.addEventListener('mousemove', (e) => {
        draw(e, currentColor.value);
      });
      canvas.addEventListener('mouseup', () => {
        isDrawing = false;
      });
    }
  
    if (flags.bucket === true) {
      context.fillStyle = currentColor.value;
      context.fillRect(0, 0, 512, 512);
    }
  
    // if (flags.pipet === true) {
    //   const [x, y] = getCoordinates(event);
    //   console.log(x,y);
    //   const pixelData = context.getImageData(x, y, 4, 4).data;
    //   prevColor.style.background = currentColor.value;
    //   currentColor.value = `${RgbToHex(pixelData[0], pixelData[1], pixelData[2])}`;
    // }
  });
  
  buttonClear.addEventListener('mousedown', () => {
    buttonClear.classList.add('active');
    keyToRemove.forEach(element => localStorage.removeItem(element));
    currentColor.value = '#00ff00';
    context.clearRect(0, 0, 512, 512);
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