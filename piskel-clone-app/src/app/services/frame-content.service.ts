import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrameContentService {
  constructor() { }

  public contentFrame = new BehaviorSubject(''); 
  public canvasContent = new BehaviorSubject('');

  public setContentFrame(content: string): void {
    this.contentFrame.next(content)
  }

  public setContentCanvas(content: string): void {
    this.canvasContent.next(content)
  }
}
