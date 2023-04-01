import {COLOR_WHITE} from "@constants/tools.constant";

export class ContentCanvas {
  public static setCanvasContent(content: string, context: CanvasRenderingContext2D | null, sizeCanvas: number) {
    if (context !== null && context) {
      context.fillStyle = COLOR_WHITE;
      context.fillRect(0, 0, sizeCanvas, sizeCanvas);

      if (content) {
        const image = new Image();
        image.src = content;

        context.imageSmoothingEnabled = false;
        context.drawImage(image, 0, 0);
      }
    }
  }
}