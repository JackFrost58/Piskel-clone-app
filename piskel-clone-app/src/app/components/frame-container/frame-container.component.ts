import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FrameContentService} from '@services/frame-content.service';
import {FramesService} from '@services/frames.service';
import {Frame} from './entities/frame-container.interface';

@Component({
  selector: 'frame-container',
  templateUrl: './frame-container.component.html',
  styleUrls: ['./frame-container.component.scss']
})

@UntilDestroy()
export class FrameContainerComponent implements OnInit {
  public frames: Frame[] = [
    {
      id: 1,
      canvasData: '',
      isActive: true,
    },
    {
      id: 2,
      canvasData: '',
      isActive: false,
    }
  ];

  public activeFrame: Frame | undefined;

  constructor(
    private frameContentService: FrameContentService, 
    private framesService: FramesService
  ) {}

  ngOnInit(): void {
    this.frameContentService.contentFrame
    .pipe(untilDestroyed(this))
    .subscribe((content: string) => {
      this.activeFrame = this.getActiveFrame();
      if (this.activeFrame) {
        this.activeFrame.canvasData = content;
      }
    });
    this.framesService.framesData = this.frames;
  }

  public addFrame(content = ''): void {
    const newFrame: Frame = {
      id: Date.now(),
      canvasData: content,
      isActive: false
    }
    this.frames.push(newFrame);
    this.framesService.framesData = this.frames;
  }

  public removeFrame(id: number): void {
    this.frames = this.frames.filter((frame) => frame.id !== id);
    this.frames[0].isActive = true;
    this.framesService.framesData = this.frames;
  }

  public dublicateFrame(frame: Frame): void {
    this.addFrame(frame.canvasData);
  }

  public selectFrame(frame: Frame): void {
    this.frames.forEach((frame) => frame.isActive = false);
    frame.isActive = true;

    this.frameContentService.setContentCanvas(frame.canvasData)
  }

  private getActiveFrame(): Frame | undefined {
    return this.frames.find((frame) => frame.isActive === true);
  }

  public drop(event: CdkDragDrop<Frame[]>): void {
    moveItemInArray(this.frames, event.previousIndex, event.currentIndex);
  }

  public isMinCountFrames(): boolean {
    const MIN_FRAME = 1;
    return this.frames.length <= MIN_FRAME;
  }
}
