import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HeaderContainerComponent} from './header-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderContainerComponent],
  exports: [HeaderContainerComponent]
})
export class HeaderContainerModule { }
