import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CanvasContainerComponent} from './canvas-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CanvasContainerComponent],
  exports: [CanvasContainerComponent]
})
export class CanvasContainerModule {}
