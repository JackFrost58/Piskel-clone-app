import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameContainerComponent } from './frame-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FrameContainerComponent],
  exports: [FrameContainerComponent]
})
export class FrameContainerModule { }
