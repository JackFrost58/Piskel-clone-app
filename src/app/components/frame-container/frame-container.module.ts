import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FrameContainerComponent} from './frame-container.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule
  ],
  declarations: [FrameContainerComponent],
  exports: [FrameContainerComponent]
})
export class FrameContainerModule { }
