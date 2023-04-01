import {NameTools} from "@enums/name-tools.enum";

export class ToolCheckHelper {
  static isToolWithColor(nameTool: string): boolean {
    const toolsDefaultColor = [NameTools.Eraser];
    return toolsDefaultColor.find((tool) => tool === nameTool) ? true : false
  }
}

