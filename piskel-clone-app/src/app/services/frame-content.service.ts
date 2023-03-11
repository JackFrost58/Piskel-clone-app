import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrameContentService {
  constructor() { }

  public contentFrame = new BehaviorSubject(''); 

  public setContent(content: string): void {
    this.contentFrame.next(content)
  }
}
