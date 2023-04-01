import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Thickness} from '@constants/config-slider.namespace';
import {TOOLS} from '@constants/tools.constant';
import {NameTools} from '@enums/name-tools.enum';
import {ConfigTool} from '@interfaces/config-tool.interface';
import {ToolCheckHelper} from '@helpers/tool-check.helper';
import {COLORS, CUSTOM_COLORS, DEFAULT_COLOR} from './entities/constants';
import {Tool} from './entities/interfaces';

@Component({
  selector: 'tools-container',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsComponent implements OnInit {
  public readonly CONFIG_SLIDER = Thickness;
  public readonly MAX_CUSTOM_COLORS = 6;
  public readonly tools = TOOLS;
  public readonly colors = COLORS;
  public readonly customColors = CUSTOM_COLORS;
  public readonly defaultColor = DEFAULT_COLOR;
  
  public thicknessTools = 1;

  public activeTool = {
    nameTool: (NameTools.Stroke) as string,
    colorValue: this.defaultColor.colorValue,
    penSize: this.thicknessTools
  }

  @Output() config = new EventEmitter<ConfigTool>()

  ngOnInit(): void {
    this.setConfig(this.activeTool);
  }

  public isDrawTools(): boolean {
    const drawToolsList = [NameTools.Pen, NameTools.Stroke, NameTools.Eraser];
    return drawToolsList.find((tool) => tool === this.activeTool.nameTool) ? true : false
  }

  public setTool(tool: Tool): void {
    this.activeTool.nameTool = tool.name;
    this.tools.forEach((tool) => tool.isActive = false);
    tool.isActive = true;

    if (tool.color && !ToolCheckHelper.isToolWithColor(tool.name)) {
      this.setColor(tool.color);
    }

    this.setConfig(this.activeTool)
  }

  public setColor(colorValue: string): void {
    this.activeTool.colorValue = colorValue;
    this.setConfig(this.activeTool)
  }

  public changeActiveColor(event: Event): void {    
    this.activeTool.colorValue = (event.target as HTMLInputElement).value
  }

  public addCustomColor(): void {
    const newCustomColor = {
      id: Date.now(),
      colorValue: this.activeTool.colorValue
    }
    this.customColors.push(newCustomColor)
  }

  public setConfig(activeTool: ConfigTool): void {
    this.config.emit(activeTool);
  }

  public setSize(size: number): void {
    this.activeTool.penSize = size;
    this.setConfig(this.activeTool);
  }
}
