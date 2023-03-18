import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {HeaderContainerComponent} from './header-container.component';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [HeaderContainerComponent],
  exports: [HeaderContainerComponent]
})
export class HeaderContainerModule { }
