import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ToolsComponent} from './tools.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  declarations: [ToolsComponent],
  exports: [ToolsComponent]
})
export class ToolsModule { }
