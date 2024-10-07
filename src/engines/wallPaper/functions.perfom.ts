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
import imagePath from '../../assets/svg/wallPaper_zvz.svg';


const image:HTMLImageElement = new Image();
image.src = imagePath;


export function getInitial(canvas:HTMLCanvasElement):{ 
  lines:Lines,
  baseCanvas: BaseCanvas,
  ingine: Ingine,
}{
  
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