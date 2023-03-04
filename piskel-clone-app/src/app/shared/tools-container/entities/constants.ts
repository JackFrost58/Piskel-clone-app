import {NameTools} from "./enums";
import {ColorCustomPalette, ColorPalette, Tool} from "./interfaces";

export const TOOLS: Tool[] = [
  {
    name: NameTools.Bucket,
    icon: 'format_color_fill'
  },
  {
    name: NameTools.Pen,
    icon: 'draw'
  },
  {
    name: NameTools.Stroke,
    icon: 'border_color'
  },
  {
    name: NameTools.Clear,
    icon: 'delete'
  },
  {
    name: NameTools.Eraser,
    icon: 'width_full',
    color: '#ffffff'
  },
];

export const COLORS: ColorPalette[] = [
  {
    colorValue: '#ffffff'
  },
  {
    colorValue: '#c3c3c3'
  },
  {
    colorValue: '#585858'
  },
  {
    colorValue: '#000000'
  },
  {
    colorValue: '#88001b'
  },
  {
    colorValue: '#ec1c24'
  },
  {
    colorValue: '#ff7f27'
  },
  {
    colorValue: '#ffca18'
  },
  {
    colorValue: '#fdeca6'
  },
  {
    colorValue: '#fff200'
  },
  {
    colorValue: '#c4ff0e'
  },
  {
    colorValue: '#0ed145'
  },
  {
    colorValue: '#8cfffb'
  },
  {
    colorValue: '#00a8f3'
  },
  {
    colorValue: '3f48cc'
  },
  {
    colorValue: '#b83dba'
  },
  {
    colorValue: '#ffaec8'
  },
  {
    colorValue: '#b97a56'
  },
];

export const CUSTOM_COLORS: ColorCustomPalette[] = [
  {
    id: 1,
    colorValue: '#ffffff'
  },
  {
    id: 2,
    colorValue: '#c3c3c3'
  },
]

export const DEFAULT_COLOR: ColorPalette = {
  colorValue: '#000000'
}