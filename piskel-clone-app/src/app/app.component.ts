import {Component} from '@angular/core';
import {ConfigTool} from '@interfaces/config-tool.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public configTool: ConfigTool;

  public getConfigTool(item: ConfigTool) {
    this.configTool = item;
  }
}
