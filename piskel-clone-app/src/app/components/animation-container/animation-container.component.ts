import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FPS} from '@constants/config-slider.namespace';

@Component({
  selector: 'animation-container',
  templateUrl: './animation-container.component.html',
  styleUrls: ['./animation-container.component.scss']
})
export class AnimationContainerComponent implements OnInit {
  public readonly CONFIG_SLIDER = FPS;
  public isFullscreen = false;
  constructor() {}

  ngOnInit() {}

  @ViewChild('preview', {static: true}) preview: ElementRef<HTMLCanvasElement>;

  public getItem(item: any){
    console.log(item)
  }

  public setFullscreen(): void {
    this.isFullscreen = false;
    this.preview.nativeElement.requestFullscreen();
  }
}
