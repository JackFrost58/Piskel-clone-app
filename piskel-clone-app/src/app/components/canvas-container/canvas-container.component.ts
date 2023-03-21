import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {convertColor} from '@helpers/convert-colors.helper';
import {getCoordinates} from '@helpers/coordinates.helper';
import {ConfigTool} from '@interfaces/config-tool.interface';
import {Point} from '@interfaces/coordinate.interface';
import {FrameContentService} from '@services/frame-content.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ContentCanvas} from '@helpers/content-frame.helper';
import {SizeService} from '@services/size.service';
import {ToolCheckHelper} from 'src/app/helpers/tool-check.helper';
import {NameTools} from '@enums/name-tools.enum';
import {DEFAULT_COLOR_ERASER} from '@constants/tools.constant';

@Component({
  selector: 'canvas-container',
  templateUrl: './canvas-container.component.html',
  styleUrls: ['./canvas-container.component.scss']
})

@UntilDestroy()
export class CanvasContainerComponent implements OnInit {
  @Input() toolConfig: ConfigTool;

  public startCoordinates: Point;
  public endCoordinates: Point;
  public context: CanvasRenderingContext2D | null;

  public isDrawing = false;
  public sizeCanvas = 32;

  constructor(private frameContentService: FrameContentService, private sizeService: SizeService) {}

  ngOnInit(): void {
    this.startCoordinates = {x: 0, y: 0};
    
    this.sizeService.size
    .pipe(untilDestroyed(this))
    .subscribe((newSize: number) => {
      this.canvas.nativeElement.width = newSize;
      this.canvas.nativeElement.height = newSize;
      this.sizeCanvas = newSize
    })
    
    this.context = this.canvas.nativeElement.getContext('2d');

    this.frameContentService.canvasContent
    .pipe(untilDestroyed(this))
    .subscribe((canvasContent: string) => {
      ContentCanvas.setCanvasContent(canvasContent, this.context, this.sizeCanvas)
    })
  }

  @ViewChild('canvasElement', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  public useTool(startCoord: Point, currentCoord: Point, tool: ConfigTool): void {
    if (this.context !== null && tool) {    
      const deltaX = Math.abs(currentCoord.x - startCoord.x);
      const deltaY = Math.abs(currentCoord.y - startCoord.y);
      const signX = (startCoord.x < currentCoord.x) ? 1 : -1;
      const signY = (startCoord.y < currentCoord.y) ? 1 : -1;
      let err = deltaX - deltaY;
    
      while(true) {
        ToolCheckHelper.isToolWithColor(tool.nameTool) ? this.context.fillStyle = DEFAULT_COLOR_ERASER : this.context.fillStyle = tool.colorValue;
        this.context?.fillRect(startCoord.x, startCoord.y, tool.penSize, tool.penSize) 
    
        if ((startCoord.x === Number(currentCoord.x)) && (startCoord.y === Number(currentCoord.y))) break;
        const e2 = 2 * err;
        if (e2 > -deltaY) { err -= deltaY; startCoord.x  += signX; }
        if (e2 < deltaX) { err += deltaX; startCoord.y  += signY; }
      }
    }
  }

  public canvasMouseDownHandler(e: MouseEvent): void {
    if (this.toolConfig.colorValue && this.toolConfig.penSize) {
      this.isDrawing = true;
      this.startCoordinates = getCoordinates(this.canvas, e);
      this.useTool(this.startCoordinates, this.startCoordinates, this.toolConfig);
    }
  }

  public canvasMouseMoveHandler(e: MouseEvent): void {
    let currentCoordinates;
    if (this.toolConfig.colorValue && this.toolConfig.penSize) {
      switch (this.toolConfig.nameTool) {
        case NameTools.Eraser:
        case NameTools.Pen: 
          currentCoordinates = getCoordinates(this.canvas, e);
          this.startCoordinates = currentCoordinates;
          if(!this.isDrawing) return;
          this.useTool(this.startCoordinates, currentCoordinates, this.toolConfig);
          break;
        case NameTools.Stroke:
          currentCoordinates = getCoordinates(this.canvas, e);
          this.endCoordinates = currentCoordinates;
          break;
      }
    }
  }

  public canvasMouseUpHandler(e: MouseEvent): void {
    let currentCoordinates;
    let targetColor;
    let replaceColor;

    if (this.toolConfig.colorValue && this.toolConfig.penSize && this.context !== null) {
      switch(this.toolConfig.nameTool) {
        case NameTools.Stroke: // add to schema line on draw
          if(!this.isDrawing) return;
          this.useTool(this.startCoordinates, this.endCoordinates, this.toolConfig);
          break;
        case NameTools.Bucket: // fix work bucket for clear list
          currentCoordinates = getCoordinates(this.canvas, e);
          targetColor = this.context.getImageData(currentCoordinates.x, currentCoordinates.y, 1, 1).data.toString();
          replaceColor = convertColor.hexToRgba(this.toolConfig.colorValue);
          this.bucketPart(targetColor, replaceColor, currentCoordinates);
          break;
        case NameTools.Clear: //fix onClick because onMove draw px mb better to downClick
          this.clearCanvas();
      }
    }
    
    this.isDrawing = false;
    this.frameContentService.setContentFrame(this.canvas.nativeElement.toDataURL());
  }
  
  public clearCanvas(): void {
    if (this.context !== null) {
      this.context.fillStyle = '#ffffff';
      this.context.fillRect(0, 0, 32, 32);
    }
  }
  
  //fix method for bucket canvas
  public bucketPart(targetColor: string, replaceColor: string, coors: Point): void {  
    if (targetColor === replaceColor) return;
  
    const replaceColorHex = convertColor.rgbaToHex(replaceColor);
    
    if(this.context !== null) {
      this.context.fillStyle = replaceColorHex;
      this.context.fillRect(coors.x, coors.y, 1, 1);
      
      const queue: Point[] = [];
      queue.push(coors);

      while (queue.length) {
        const node = queue[0];
        console.log(node)
        queue.shift();
    
        const rightNode = {
          x: node.x + 1,
          y: node.y
        };

        const leftNode = {
          x: node.x - 1,
          y: node.y
        };

        const bottomNode = {
          x: node.x,
          y: node.y + 1
        };

        const topNode = {
          x: node.x,
          y: node.y - 1 
        };
    
        if (this.context.getImageData(rightNode.x, rightNode.y, 1, 1).data.toString() === targetColor) {
          this.context.fillRect(rightNode.x, rightNode.y, 1, 1);
          queue.push(rightNode);
        }
        
        if (this.context.getImageData(leftNode.x, leftNode.y, 1, 1).data.toString() === targetColor) {
          this.context.fillRect(leftNode.x, leftNode.y, 1, 1);
          queue.push(leftNode);
        }
        
        if (this.context.getImageData(bottomNode.x, bottomNode.y, 1, 1).data.toString() === targetColor) {
          this.context.fillRect(bottomNode.y, bottomNode.y, 1, 1);
          queue.push(bottomNode);
        }
        
        if (this.context.getImageData(topNode.x, topNode.y, 1, 1).data.toString() === targetColor) {
          this.context.fillRect(topNode.x, topNode.y, 1, 1);
          queue.push(topNode);
        }
      }
    }
  }
}
