import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {convertColor} from '@helpers/convert-colors.helper';
import {getCoordinates} from './helper/coordinates.helper';
import {ConfigTool} from '@interfaces/config-tool.interface';
import {Point, PointConfig} from '@interfaces/coordinate.interface';
import {FrameContentService} from '@services/frame-content.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ContentCanvas} from '@helpers/content-frame.helper';
import {SizeService} from '@services/size.service';
import {ToolCheckHelper} from '@helpers/tool-check.helper';
import {NameTools} from '@enums/name-tools.enum';
import {COLOR_WHITE} from '@constants/tools.constant';

@Component({
  selector: 'canvas-container',
  templateUrl: './canvas-container.component.html',
  styleUrls: ['./canvas-container.component.scss']
})

@UntilDestroy()
export class CanvasContainerComponent implements OnInit {
  @Input() toolConfig: ConfigTool;

  public context: CanvasRenderingContext2D | null;

  public contentConfig: PointConfig[] = [];
  public pointsStroke: PointConfig[] = []
  public startCoordinates: Point = {x: 0, y: 0};
  public isDrawing = false;
  public isLeftButtonDown = false;
  public sizeCanvas = 32;

  constructor(private frameContentService: FrameContentService, private sizeService: SizeService) {}

  ngOnInit(): void {    
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

  public canvasMouseDownHandler(event: MouseEvent): void {
    this.toggleMouseButton();

    switch (this.toolConfig.nameTool) {
      case NameTools.Eraser:
      case NameTools.Pen:
      case NameTools.Stroke:
        this.isDrawing = true;
        this.startCoordinates = getCoordinates(this.canvas, event, this.sizeCanvas, this.toolConfig.penSize);

        this.drawPoint(this.startCoordinates, this.toolConfig);
        this.addPointCanvas([{...this.startCoordinates, tool: {...this.toolConfig}}]);
        break;
      case NameTools.Clear:
        this.clearCanvas();
        break;
    }
  }

  public canvasMouseMoveHandler(event: MouseEvent): void {
    let currentCoordinates: Point;
   
    if (this.toolConfig.colorValue && this.toolConfig.penSize && this.isLeftButtonDown) {
      switch (this.toolConfig.nameTool) {
        case NameTools.Eraser:
        case NameTools.Pen: 
          currentCoordinates = getCoordinates(this.canvas, event, this.sizeCanvas, this.toolConfig.penSize);
          if(!this.isDrawing) return;
          this.drawPoint(currentCoordinates, this.toolConfig);
          this.addPointCanvas([{...currentCoordinates, tool: {...this.toolConfig}}]);
          break;
        case NameTools.Stroke:
          currentCoordinates = getCoordinates(this.canvas, event, this.sizeCanvas, this.toolConfig.penSize);

          this.drawStroke(this.startCoordinates, currentCoordinates);
          break;
      }
    }
  }

  public canvasMouseUpHandler(event: MouseEvent): void {
    let currentCoordinates;
    let targetColor;

    this.toggleMouseButton();

    if (this.context !== null) {
      switch(this.toolConfig.nameTool) {
        case NameTools.Stroke:
          this.addPointCanvas(this.pointsStroke)
          break;
        case NameTools.Bucket:
          currentCoordinates = getCoordinates(this.canvas, event, this.sizeCanvas, this.toolConfig.penSize);
          targetColor = this.context.getImageData(currentCoordinates.x, currentCoordinates.y, 1, 1).data.toString();
          
          this.fillSegment(targetColor, this.toolConfig.colorValue, currentCoordinates);
          break;
      }
    }
    
    this.isDrawing = false;
    this.frameContentService.setContentFrame(this.canvas.nativeElement.toDataURL());
  }

  public drawPoint(pointCoordinate: Point, tool: ConfigTool): void {
    if (this.context !== null && tool) {      
      ToolCheckHelper.isToolWithColor(tool.nameTool) ? this.context.fillStyle = COLOR_WHITE : this.context.fillStyle = tool.colorValue;
      this.context.fillRect(tool.penSize*pointCoordinate.x, tool.penSize*pointCoordinate.y, tool.penSize, tool.penSize);
    }
  }

  public drawStroke(pointStart: Point, pointEnd: Point): void {
    this.pointsStroke = []

   this.drawPreviousContent();

    const clonePointStart = {...pointStart};

    const deltaX = Math.abs(pointEnd.x - clonePointStart.x);
    const deltaY = Math.abs(pointEnd.y - clonePointStart.y);
    const signX = (clonePointStart.x < pointEnd.x) ? 1 : -1;
    const signY = (clonePointStart.y < pointEnd.y) ? 1 : -1;
    let err = deltaX - deltaY;

    while(true) {
      this.pointsStroke.push({...clonePointStart, tool: {...this.toolConfig}});
      this.drawPoint(clonePointStart, this.toolConfig);

      if ((clonePointStart.x === pointEnd.x) && (clonePointStart.y === pointEnd.y)) break;

      //out of while
      const e2 = 2 * err;
      
      if (e2 > -deltaY) { 
        err -= deltaY; 
        clonePointStart.x  += signX; 
      }
      
      if (e2 < deltaX) { 
        err += deltaX; 
        clonePointStart.y  += signY; 
      }
    }
  }

  public drawSquare(): void {// TODO refactoring
    if(!this.isDrawing) return;

    // this.endCoordinates = getCoordinates(this.canvas, event, this.sizeCanvas, this.toolConfig.penSize);
    if (this.context !== null && this.startCoordinates.x) {
      this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)
      // this.rects.forEach((rect: any) => {
      //   if (this.context !== null) {
      //     this.context.beginPath();
      //     this.useTool(rect.x, rect.y, rect.width)
      //     this.context.rect(rect.x, rect.y, rect.width, rect.height);
      //     this.context.strokeStyle = this.toolConfig.colorValue;
      //     this.context.stroke();
      //   }
      // }); 

      this.context.beginPath();
      // this.context.rect(this.startCoordinates.x, this.startCoordinates.y, this.endCoordinates.x - this.startCoordinates.x, this.endCoordinates.y - this.startCoordinates.y);
      this.context.strokeStyle = 'red';
      this.context.stroke();
      this.context.beginPath();
      this.context.fill();
      this.context.beginPath();
      this.context.fill();
    }
  }
  
  public fillSegment(targetColor: string, replaceColor: string, coors: Point): void {
    if (targetColor === replaceColor) return;
      
    if(this.context !== null) {
      this.context.fillStyle = replaceColor;
      this.context.fillRect(coors.x, coors.y, 1, 1);
      
      const queue: Point[] = [];
      queue.push(coors);
      
      while (queue.length) {
        const {x, y} = queue[0];
        queue.shift();
    
        const coordinates = [
          {
            x: x + 1,
            y: y
          },
          {
            x: x - 1,
            y: y
          },
          {
            x: x,
            y: y + 1
          },
          {
            x: x,
            y: y - 1 
          }
        ];

        coordinates.forEach((coordinate) => {
          if (this.context!.getImageData(coordinate.x, coordinate.y, 1, 1).data.toString() === targetColor && x >= 0 && y >= 0 && x < this.sizeCanvas && y < this.sizeCanvas) {
            this.context!.fillRect(coordinate.x, coordinate.y, 1, 1);
            queue.push(coordinate);
          }
        })
      }
    }
  }

  public clearCanvas(): void {
    if (this.context !== null) {
      this.context.fillStyle = COLOR_WHITE;
      this.context.fillRect(0, 0, this.sizeCanvas, this.sizeCanvas);
    }
  }

  private toggleMouseButton(): void {
    this.isLeftButtonDown = !this.isLeftButtonDown;
  }

  private addPointCanvas(newPoint: PointConfig[]): void {
    const content = [...newPoint, ...this.contentConfig];
    this.contentConfig = content.filter((point, index) => content.findIndex((s) => point.x === s.x && point.y === s.y) === index);
  }

  private drawPreviousContent(): void {
    if (this.context !== null) {
      this.context.clearRect(0, 0, this.sizeCanvas, this.sizeCanvas);
    }
    
    this.contentConfig.forEach((item) => {
      this.drawPoint({x: item.x, y: item.y}, item.tool)
    })
  }
}
