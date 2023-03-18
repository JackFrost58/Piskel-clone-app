import {Injectable} from '@angular/core';
import {listSizes} from '@components/header-container/entities/list-sizes.constant';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  public size = new BehaviorSubject(listSizes[0]);
  
  public sizeCanvas(newSize: number): void {
    this.size.next(newSize);
  }
}
