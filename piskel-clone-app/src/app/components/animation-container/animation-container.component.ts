import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FPS} from '@constants/config-slider.namespace';
import {ContentCanvas} from '@helpers/content-frame.helper';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FramesService} from '@services/frames.service';
import {SizeService} from '@services/size.service';

@Component({
  selector: 'animation-container',
  templateUrl: './animation-container.component.html',
  styleUrls: ['./animation-container.component.scss']
})

@UntilDestroy()
export class AnimationContainerComponent implements OnInit {
  public readonly CONFIG_SLIDER = FPS;

  public isFullscreen = false;
  public fps = 0;
  public currentFrameIndex = 0;

  public fpsDuration: number;
  public now: number;
  public then: number;
  public elapsed: number;
  public contextPreview: CanvasRenderingContext2D | null;
  public sizePreview: number;

  constructor(private framesService: FramesService, private sizeService: SizeService) {}

  ngOnInit(): void {
    this.sizeService.size
    .pipe(untilDestroyed(this))
    .subscribe((newSize: number) => {
      this.preview.nativeElement.width = newSize;
      this.preview.nativeElement.height = newSize;
      this.sizePreview = newSize
    })

    this.startAnimation(this.fps);
    this.contextPreview = this.preview.nativeElement.getContext('2d');
  }

  @ViewChild('preview', {static: true}) preview: ElementRef<HTMLCanvasElement>;

  public getFPS(currentFPS: number): void {
    this.fps = currentFPS;
    this.startAnimation(currentFPS);
  }

  public setFullscreen(): void {
    this.isFullscreen = false;
    this.preview.nativeElement.requestFullscreen();
  }

  public animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    
    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsDuration) {
      this.then = this.now - (this.elapsed % this.fpsDuration);
      const frames = this.framesService.framesData;
      this.currentFrameIndex = (this.currentFrameIndex + 1) % frames.length;
      ContentCanvas.setCanvasContent(frames[this.currentFrameIndex].canvasData, this.contextPreview, this.sizePreview)
    }
  }

  public startAnimation(startFps: number): void {
    this.fpsDuration = 1000 / startFps;
    this.then = Date.now();
    this.animate();  
  }
}
