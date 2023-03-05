import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConfigTool} from '@interfaces/config-tool.interface';
import {COLORS, CUSTOM_COLORS, DEFAULT_COLOR, TOOLS} from './entities/constants';
import {NameTools} from './entities/enums';
import {Tool} from './entities/interfaces';

@Component({
  selector: 'tools-container',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsComponent implements OnInit{
  public readonly MAX_CUSTOM_COLORS = 6;
  public readonly tools = TOOLS;
  public readonly colors = COLORS;
  public readonly customColors = CUSTOM_COLORS;
  public readonly defaultColor = DEFAULT_COLOR;
  
  public activeColor = this.defaultColor.colorValue;
  public thicknessTools = 1;
  public currentTool: string = NameTools.Pen;

  @Output() config = new EventEmitter<ConfigTool>()

  constructor() {}

  ngOnInit(): void {
    const activeTool = {
      nameTool: this.currentTool,
      colorValue: this.activeColor,
      penSize: this.thicknessTools
    }
    this.config.emit(activeTool)
  }

  public isDrawTools(): boolean {
    const drawToolsList = [NameTools.Pen, NameTools.Stroke, NameTools.Eraser];
    return drawToolsList.find((tool) => tool === this.currentTool) ? true : false
  }

  public setTool(tool: Tool): void {
    const activeTool = {
      nameTool: tool.name,
      colorValue: tool.color ? tool.color : this.activeColor,
      penSize: this.thicknessTools
    }

    this.currentTool = tool.name;
    this.tools.forEach((tool) => tool.isActive = false);
    tool.isActive = true;

    this.config.emit(activeTool)
  }

  public setColor(colorValue: string): void {
    console.log(this.customColors)
    console.log(colorValue)
    this.activeColor = colorValue;
  }

  public changeActiveColor(event: Event): void {    
    this.activeColor = (event.target as HTMLInputElement).value
  }

  public addCustomColor(): void {
    const newCustomColor = {
      id: Date.now(),
      colorValue: this.activeColor
    }
    this.customColors.push(newCustomColor)
  }
}
