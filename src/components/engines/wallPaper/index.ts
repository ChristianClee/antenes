import {interactionParamsMouse, fpsParams} from './init.variable'
import { getInitial } from './functions.perfom';
import { TestIngine, BaseCanvas } from './classes';
import imagePath from '##/assets/svg/wallPaper_zvz.svg';
import imagePathDarkTheme from '##/assets/svg/wallPaper_zvz_black_theme.svg';



export function createWallPaper(canvas:HTMLCanvasElement, colorThemeRef: React.MutableRefObject<string | null> ) {
  //@ts-ignore
  createWallPaper.stop = false;

  const imagesPath = { whiteThemeImgPath: imagePath, darkThemeImgPath: imagePathDarkTheme}
  let { lines, baseCanvas, ingine } = getInitial(canvas, imagesPath);

  window.addEventListener('resize', () => {
    baseCanvas.removeEvents();
    const initial = getInitial(canvas, imagesPath);
    lines = initial.lines;
    baseCanvas = initial.baseCanvas;
    ingine = initial.ingine;
  });
  
  
  const getDeley = TestIngine.getDelayByFps();
  // The engine
  function draw(){
    ingine.clearRect(baseCanvas.canvas.width, baseCanvas.canvas.height);
    
    //@ts-ignore
    if(createWallPaper.stop){
      baseCanvas.removeEvents();
      return
    }
    
    ingine.drowLines(lines, interactionParamsMouse, colorThemeRef);
    ingine.drowCircle("rgba(200,102,110,0.3)")
   
    // window.requestAnimationFrame(draw) // this confuguration takes <150 hps> in my tests
    setTimeout(() => { draw() }, getDeley(fpsParams)); // this confuguration takes <60 hps> in my tests
  };
  
  window.requestAnimationFrame(draw)
}
