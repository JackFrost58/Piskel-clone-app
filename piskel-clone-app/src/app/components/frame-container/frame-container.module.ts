import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FrameContainerComponent} from './frame-container.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [FrameContainerComponent],
  exports: [FrameContainerComponent]
})
export class FrameContainerModule { }
