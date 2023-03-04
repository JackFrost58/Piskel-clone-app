export interface Tool {
  name: string;
  icon: string;
  color?: string;
}

export interface ColorPalette {
  colorValue: string; 
}

export interface ColorCustomPalette extends ColorPalette {
  id: number;
}