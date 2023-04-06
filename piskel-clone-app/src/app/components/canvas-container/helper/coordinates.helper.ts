import {ElementRef} from "@angular/core";
import {Point} from "@interfaces/coordinate.interface";

export function getCoordinates(canvas: ElementRef, event: MouseEvent, canvasSize: number, penSize: number): Point {
  const rect = canvas?.nativeElement.getBoundingClientRect();
  const countSquersCanvas = penSize * (canvas.nativeElement.clientWidth / canvasSize);

  return {
    x: Math.floor((event.clientX - rect.left) / countSquersCanvas),
    y: Math.floor((event.clientY - rect.top) / countSquersCanvas)
  };
}