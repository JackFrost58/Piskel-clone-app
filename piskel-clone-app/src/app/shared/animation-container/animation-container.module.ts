import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationContainerComponent } from './animation-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AnimationContainerComponent],
  exports: [AnimationContainerComponent]
})
export class AnimationContainerModule { }
