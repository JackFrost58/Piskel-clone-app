import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {SizeService} from '@services/size.service';
import {listSizes} from './entities/list-sizes.constant';

@Component({
  selector: 'header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss']
})
export class HeaderContainerComponent implements OnInit {
  public sizes = listSizes;
  public currentSize = listSizes[0];

  constructor(private sizeService: SizeService) {}

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  ngOnInit(): void {}

  public setSize(size: number) {
    this.sizeService.sizeCanvas(size);
  }
}
