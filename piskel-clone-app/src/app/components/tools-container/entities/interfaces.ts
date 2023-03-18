export interface Tool {
  name: string;
  icon: string;
  color?: string;
  isActive: boolean;
}

export interface ColorPalette {
  colorValue: string; 
}

export interface ColorCustomPalette extends ColorPalette {
  id: number;
}