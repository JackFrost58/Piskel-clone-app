import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {COLORS, TOOLS} from './entities/constants';
import {Tool} from './entities/interfaces';
// import {setColorPen, setDefaultPenSize} from "@helpers/saveLocalStorage";

@Component({
  selector: 'tools-container',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsComponent implements OnInit {
  public readonly tools = TOOLS;
  public readonly colors = COLORS;
  public value = 1;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `icon_eraser`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/tools-icons/eraser.svg`)
    );
  }

  ngOnInit() {
  }

  public isDrawTools(tool: Tool): boolean {
    return true
  }

  public setTool(tool: Tool) {

  }

  public setColor(colorValue: string): string {
    return `#${colorValue}`;
  }
// const colorField = document.querySelector('.wrapper-color');
// const currentColor = document.getElementById('current-color');
// const prevColor = document.getElementById('prev-color');

// function colorClickHandler(e) {
//     const selectColor = e.target;
      
//     if (selectColor.id === 'colorChange') {
//         localStorage.setItem('previewColor', currentColor.value);
//         currentColor.value = prevColor.value;
//         prevColor.value = localStorage.getItem('previewColor');
//         localStorage.setItem('currentColor', currentColor.value);
//     }
// }

// function colorChangeHandler() {
//     localStorage.setItem('currentColor', currentColor.value);
//     localStorage.setItem('previewColor', prevColor.value);
// }

// function windowLoadHandler() {
//     setColorPen()
// }

// function initColor() {
//     colorField.addEventListener('click', colorClickHandler);
//     colorField.addEventListener('change', colorChangeHandler);
//     window.addEventListener('load', windowLoadHandler);
// }


// const penSizeFields = document.querySelector('.pen-size-container');

// function penSizeClickHandler(e) {
//     const allSizePen = document.querySelectorAll('.pen-size');

//     allSizePen.forEach((item) => {
//         item.classList.remove('active');
//     });

//     const currentSize = e.target;

//     currentSize.classList.add('active');
//     localStorage.setItem('sizePen', currentSize.dataset.size);
// }

// function windowLoadHandler() {
//     setDefaultPenSize();
// }

// function initPenSize() {
//     penSizeFields.addEventListener('click', penSizeClickHandler);
//     window.addEventListener('load', windowLoadHandler);
// }

// import './tools.scss';
// import convertRgbaToHex from "../utils/rgbaToHex";
// import { pasteOnFrame } from '../utils/drawImage';
// import { setDefaultTool } from '../utils/saveLocalStorage';

// const toolsMenu = document.querySelector('.menu__default');
// const buttonClear = document.getElementById('clear');
  
// function useTool(ctx, startCoord, currentCoord, color, penSize) {
//   const context = ctx;
//   let [x0, y0] = startCoord;
//   const [x1, y1] = currentCoord;

//   const deltaX = Math.abs(x1 - x0);
//   const deltaY = Math.abs(y1 - y0);
//   const signX = (x0 < x1) ? 1 : -1;
//   const signY = (y0 < y1) ? 1 : -1;
//   let err = deltaX - deltaY;

//   while(true) {
//     context.fillStyle = color;
//     context.fillRect(x0, y0, penSize, penSize) 

//     if ((x0 === Number(x1)) && (y0 === Number(y1))) break;
//     const e2 = 2 * err;
//     if (e2 > -deltaY) { err -= deltaY; x0  += signX; }
//     if (e2 < deltaX) { err += deltaX; y0  += signY; }
//   }
// }

// function bucketAll(ctx, currentColor, sizeCanvas) {
//   const context = ctx;

//   context.fillStyle = currentColor;
//   context.fillRect(0, 0, sizeCanvas, sizeCanvas);
// }

// function clearCanvas(size) {
//   const canvas = document.querySelector('#canvas');
//   const context = canvas.getContext('2d');

//   context.fillStyle = '#fff';
//   context.fillRect(0, 0, size, size);
// }

// function bucketPart(ctx, targetColor, replaceColor, coors) {
//   const context = ctx;

//   if (targetColor === replaceColor) return;

//   const replaceColorHex = convertRgbaToHex(replaceColor);

//   context.fillStyle = replaceColorHex;
//   context.fillRect(coors[0], coors[1], 1, 1);
  
//   const queue = [];
//   queue.push(coors);

//   while (queue.length) {
//     const node = queue[0];

//     queue.shift();

//     const rightNode = [node[0] + 1, node[1]];
//     const leftNode = [node[0] - 1, node[1]];
//     const bottomNode = [node[0], node[1] + 1];
//     const topNode = [node[0], node[1] - 1];

//     if (context.getImageData(rightNode[0], rightNode[1], 1, 1).data.toString() === targetColor) {
//       context.fillRect(rightNode[0], rightNode[1], 1, 1);
//       queue.push(rightNode);
//     }
    
//     if (context.getImageData(leftNode[0], leftNode[1], 1, 1).data.toString() === targetColor) {
//       context.fillRect(leftNode[0], leftNode[1], 1, 1);
//       queue.push(leftNode);
//     }
    
//     if (context.getImageData(bottomNode[0], bottomNode[1], 1, 1).data.toString() === targetColor) {
//       context.fillRect(bottomNode[0], bottomNode[1], 1, 1);
//       queue.push(bottomNode);
//     }
    
//     if (context.getImageData(topNode[0], topNode[1], 1, 1).data.toString() === targetColor) {
//       context.fillRect(topNode[0], topNode[1], 1, 1);
//       queue.push(topNode);

//     }
    
//   }
// }

// function btnClearMouseDownHandler() {
//   const size = localStorage.getItem('size');
//   const canvas = document.querySelector('#canvas');
  
//   clearCanvas(size);
//   pasteOnFrame(canvas)
// }

// function toolClickHandler(e) {
//   const buttonTools = document.querySelectorAll('.button__element');
//   buttonTools.forEach((element) => {
//     element.classList.remove('active');
//   });

//   const currentTool = e.target;

//   if (currentTool) {
//     localStorage.setItem('activeTool', currentTool.id);
//     currentTool.classList.add('active');
//   }  
// }

// function windowLoadHandler() {
//   setDefaultTool();
// }

// function initTool() {
//   toolsMenu.addEventListener('click', toolClickHandler);
//   buttonClear.addEventListener('click', btnClearMouseDownHandler);
//   window.addEventListener('load', windowLoadHandler);
// }

}
