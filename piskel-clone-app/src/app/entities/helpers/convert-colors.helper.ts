export class convertColor {
  public static hexToRgba(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r},${g},${b},${255}`
  }

  public static rgbaToHex(rgbaColor: string): string {
    return `#${rgbaColor.split(',')
      .map(number => {
        const hexChars = Number(number).toString(16);
        return hexChars.length === 1 ? `0${hexChars}` : hexChars;
      })
      .join('')
      .slice(0, -2)}`;
  }  
}