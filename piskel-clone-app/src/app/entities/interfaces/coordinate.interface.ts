import {ConfigTool} from "./config-tool.interface"

export interface Point {
  x: number,
  y: number
}

export interface PointConfig extends Point {
  tool: ConfigTool
}