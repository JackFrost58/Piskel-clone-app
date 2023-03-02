import {ColorPalette, Tool} from "./interfaces";

export const TOOLS: Tool[] = [
  {
    name: 'Paint bucket',
    icon: 'format_color_fill'
  },
  {
    name: 'Pen',
    icon: 'draw'
  },
  {
    name: 'Stroke',
    icon: 'border_color'
  },
  {
    name: 'Clear',
    icon: 'delete'
  },
  {
    name: 'Eraser',
    icon: 'width_full',
    color: 'ffffff'
  },
];

export const COLORS: ColorPalette[] = [
  {
    name: 'white',
    colorValue: 'ffffff'
  },
  {
    name: 'gray',
    colorValue: 'c3c3c3'
  },
  {
    name: 'darkGray',
    colorValue: '585858'
  },
  {
    name: 'black',
    colorValue: '000000'
  },
  {
    name: 'vine',
    colorValue: '88001b'
  },
  {
    name: 'lightRed',
    colorValue: 'ec1c24'
  },
  {
    name: 'orange',
    colorValue: 'ff7f27'
  },
  {
    name: 'gold',
    colorValue: 'ffca18'
  },
  {
    name: 'lemon',
    colorValue: 'fdeca6'
  },
  {
    name: 'yellow',
    colorValue: 'fff200'
  },
  {
    name: 'lightGreen',
    colorValue: 'c4ff0e'
  },
  {
    name: 'green',
    colorValue: '0ed145'
  },
  {
    name: 'turquoise',
    colorValue: '8cfffb'
  },
  {
    name: 'blue',
    colorValue: '00a8f3'
  },
  {
    name: 'darkBlue',
    colorValue: '3f48cc'
  },
  {
    name: 'purple',
    colorValue: 'b83dba'
  },
  {
    name: 'pink',
    colorValue: 'ffaec8'
  },
  {
    name: 'braun',
    colorValue: 'b97a56'
  },
];

export const CUSTOM_COLORS: ColorPalette[] = [
  {
    name: 'white',
    colorValue: 'ffffff'
  },
  {
    name: 'gray',
    colorValue: 'c3c3c3'
  },
]

export const DEFAULT_COLOR: ColorPalette = {
  name: 'black',
  colorValue: '000000'
}