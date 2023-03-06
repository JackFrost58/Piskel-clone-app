import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigSlider} from '@interfaces/config-slider.interface';

@Component({
  selector: 'slider-component',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() config: ConfigSlider;

  @Output() getSize = new EventEmitter<number>();
  public sliderSize: number;

  constructor() {}

  ngOnInit(): void {
    this.sliderSize = this.config.min
  }

  public onMouseUpHandler(size: number) {
    this.getSize.emit(size);
  }
}
