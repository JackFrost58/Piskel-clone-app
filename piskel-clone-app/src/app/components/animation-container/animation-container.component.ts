import {Component, OnInit} from '@angular/core';
import {FPS} from '@constants/config-slider.namespace';

@Component({
  selector: 'animation-container',
  templateUrl: './animation-container.component.html',
  styleUrls: ['./animation-container.component.scss']
})
export class AnimationContainerComponent implements OnInit {
  public readonly CONFIG_SLIDER = FPS;

  constructor() { }

  ngOnInit() {
  }

  public getItem(item: any){
    console.log(item)
  }
}
