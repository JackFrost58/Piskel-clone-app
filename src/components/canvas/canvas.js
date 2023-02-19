import './canvas.scss';
import { currentSizeCanvas } from './currentSizeCanvas';
import getCoordinates from '../utils/getCoordinate';
import { pasteOnFrame } from '../utils/drawImage';
import { useTool, bucketAll, bucketPart } from '../tools/tools';
import convertHexToRgba from '../utils/hexToRgba';

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const previewField = document.getElementById('preview');

let startCoordinates = [0, 0];
let isDrawing = false;

function canvasClickHandler(e) {
    const activeTool = localStorage.getItem('activeTool');
    const currentColor = localStorage.getItem('currentColor');

    switch(activeTool){
        case 'bucketAll':
            const size = localStorage.getItem('size');
            bucketAll(context, currentColor, size);
            pasteOnFrame(canvas);
            break
        case 'bucketPart':
            const coordinates = getCoordinates(canvas, e);
            const [x, y] = coordinates;
            const targetColor = context.getImageData(x, y, 1, 1).data.toString();
            const replaceColor = convertHexToRgba(currentColor);
    
            bucketPart(context, targetColor, replaceColor, coordinates);
            pasteOnFrame(canvas);
            break
    }
}

function canvasMouseDownHandler(e) {
    const activeTool = localStorage.getItem('activeTool');
    const sizePen = localStorage.getItem('sizePen');
    let currentColor;

    if (activeTool === 'pen' || activeTool === 'stroke') {
        const currentColor = document.getElementById('current-color');
        localStorage.setItem('currentColor', currentColor.value);
    } else if(activeTool ==='eraser') {
        localStorage.setItem('currentColor', '#ffffff')
        currentColor = '#000000'
    }
    if (activeTool === 'pen' || activeTool === 'eraser' || activeTool === 'stroke') {
        isDrawing = true;
        startCoordinates = getCoordinates(canvas, e);
        useTool(context, startCoordinates, startCoordinates, currentColor, sizePen);
    }
    
}

function canvasMouseMoveHandler(e) {
    const activeTool = localStorage.getItem('activeTool');

    if (activeTool === 'eraser' || activeTool === 'pen'){
        const currentColor = localStorage.getItem('currentColor');
        const sizePen = localStorage.getItem('sizePen');
        const currentCoordinates = getCoordinates(canvas, e);
        if(!isDrawing) return;
        useTool(context, startCoordinates, currentCoordinates, currentColor, sizePen);
    
        startCoordinates = currentCoordinates;
    }

    if (activeTool === 'stroke') {
        const currentCoordinates = getCoordinates(canvas, e);
        localStorage.setItem('endCoorLine', currentCoordinates);     
    }
    
}

function canvasMouseUpHandler() {
    const activeTool = localStorage.getItem('activeTool');
    const currentColor = localStorage.getItem('currentColor');
    
    if (activeTool === 'stroke') {
        if(!isDrawing) return;
        const sizePen = localStorage.getItem('sizePen');
        const endCoors = localStorage.getItem('endCoorLine').split(',');
        useTool(context, startCoordinates, endCoors, currentColor, sizePen);
    }

    isDrawing = false;
    pasteOnFrame(canvas);
}

function initCanvas() {
    canvas.width = currentSizeCanvas();
    canvas.height = currentSizeCanvas();
    previewField.width = currentSizeCanvas();
    previewField.height = currentSizeCanvas();

    canvas.addEventListener('click', canvasClickHandler);
    canvas.addEventListener('mousedown', canvasMouseDownHandler);
    canvas.addEventListener('mousemove', canvasMouseMoveHandler);
    canvas.addEventListener('mouseup', canvasMouseUpHandler);

}

export default initCanvas;