import {Injectable} from '@angular/core';
import {Frame} from '@components/frame-container/entities/frame-container.interface';

@Injectable({
  providedIn: 'root'
})
export class FramesService {
  private frames: Frame[];
  
  public set framesData(currentFrames: Frame[]) {
    this.frames = currentFrames;
  }

  public get framesData() {
    return this.frames;
  }
}
