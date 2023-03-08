import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, OnInit} from '@angular/core';
import {Frame} from './entities/frame-container.interface';

@Component({
  selector: 'frame-container',
  templateUrl: './frame-container.component.html',
  styleUrls: ['./frame-container.component.scss']
})
export class FrameContainerComponent implements OnInit {
  public frames: Frame[] = [
    {
      id: 1,
      canvasData: [],
      isActive: true,
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  public addFrame(): void {
    const newFrame: Frame = {
      id: Date.now(),
      canvasData: [],
      isActive: false
    }
    this.frames.push(newFrame)
  }

  public removeFrame(id: number): void {
    this.frames = this.frames.filter((frame) => frame.id !== id);
    this.frames[0].isActive = true;
  }

  public dublicateFrame(frame: Frame): void {
    this.addFrame();
  }

  public selectFrame(frame: Frame): void {
    this.frames.forEach((frame) => frame.isActive = false);
    frame.isActive = true;
  }
  

  public drop(event: CdkDragDrop<Frame[]>): void {
    moveItemInArray(this.frames, event.previousIndex, event.currentIndex);
  }

  public isMinCountFrames(){
    const MIN_FRAME = 1;
    return this.frames.length <= MIN_FRAME;
  }
}
