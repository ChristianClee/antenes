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

export function getInitial(canvas:HTMLCanvasElement, imagesPath: {whiteThemeImgPath: string, darkThemeImgPath: string}):{ 
  lines:Lines,
  baseCanvas: BaseCanvas,
  ingine: Ingine,
}{
  const imageWite:HTMLImageElement = new Image();
  const imageDark:HTMLImageElement = new Image();
  imageWite.src = imagesPath.whiteThemeImgPath;
  imageDark.src = imagesPath.darkThemeImgPath;
  const images = {imageWite, imageDark};

  let baseCanvas = new BaseCanvas(canvas, radius);
  let lines = new Lines(
    baseCanvas.canvas,
    images,
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