import {Tool} from "@components/tools-container/entities/interfaces";
import {NameTools} from "@enums/name-tools.enum";

export const TOOLS: Tool[] = [
  {
    name: NameTools.Bucket,
    icon: 'format_color_fill',
    isActive: false
  },
  {
    name: NameTools.Pen,
    icon: 'draw',
    isActive: true
  },
  {
    name: NameTools.Stroke,
    icon: 'border_color',
    isActive: false

  },
  {
    name: NameTools.Clear,
    icon: 'delete',
    isActive: false

  },
  {
    name: NameTools.Eraser,
    icon: 'width_full',
    color: '#ffffff',
    isActive: false
  },
];

export const COLOR_WHITE = '#ffffff';