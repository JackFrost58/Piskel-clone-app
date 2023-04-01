import {ElementRef} from "@angular/core";
import {Point} from "@interfaces/coordinate.interface";

export function getCoordinates(canvas: ElementRef, event: MouseEvent, canvasSize: number, penSize: number): Point {
  const rect = canvas?.nativeElement.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / (penSize * (canvas.nativeElement.clientWidth / canvasSize)));
  const y = Math.floor((event.clientY - rect.top) / (penSize * (canvas.nativeElement.clientWidth / canvasSize)));

  return {x, y};
}