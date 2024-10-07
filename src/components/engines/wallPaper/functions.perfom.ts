import {
  widthElem, // it's value 50 by default;
  heightElem, // it's value 30 by default;
  radius,
  normalSpeed,
  maxSpeed,
  indexGapWidth,
  indexGapHeight,
} from './init.variable';

import { Lines, BaseCanvas, Ingine } from './classes';

export function getInitial(canvas:HTMLCanvasElement, imagePath: string):{ 
  lines:Lines,
  baseCanvas: BaseCanvas,
  ingine: Ingine,
}{
  const image:HTMLImageElement = new Image();
  image.src = imagePath;

  let baseCanvas = new BaseCanvas(canvas, radius);
  let lines = new Lines(
    baseCanvas.canvas,
    image,
    widthElem, 
    heightElem,
    radius,
    normalSpeed,
    maxSpeed,
    indexGapWidth,
    indexGapHeight
  );
  let ingine = new Ingine(baseCanvas);
  return {
    lines,
    baseCanvas,
    ingine
  }
};