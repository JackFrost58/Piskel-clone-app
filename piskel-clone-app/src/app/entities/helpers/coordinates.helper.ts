import {ElementRef} from "@angular/core";
import {Point} from "@interfaces/coordinate.interface";

export function getCoordinates(canvas: ElementRef, event: MouseEvent): Point {
  const rect = canvas?.nativeElement.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / (canvas.nativeElement.clientWidth / canvas.nativeElement.width));
  const y = Math.floor((event.clientY - rect.top) / (canvas.nativeElement.clientHeight / canvas.nativeElement.height));

  return {x, y};
}