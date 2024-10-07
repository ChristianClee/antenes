import {interactionParamsMouse, fpsParams} from './init.variable'
import { getInitial } from './functions.perfom';
import { TestIngine } from './classes';


export function createWallPaper(canvas:HTMLCanvasElement, status: React.MutableRefObject<boolean>){
  
  if(!status.current) return;
  status.current = false;
  
  let { lines, baseCanvas, ingine } = getInitial(canvas);

  window.addEventListener('resize', () => {  
    baseCanvas.removeEvents();
    const initial = getInitial(canvas);
    lines = initial.lines;
    baseCanvas = initial.baseCanvas;
    ingine = initial.ingine;
  });
  
  
  const getDeley = TestIngine.getDelayByFps();
  // The engine
  function draw(){
    
    ingine.clearRect(baseCanvas.canvas.width, baseCanvas.canvas.height)
    ingine.drowLines(lines, interactionParamsMouse);
    ingine.drowCircle()
    // window.requestAnimationFrame(draw) // this confuguration takes <150 hps> in my tests
    setTimeout(() => { draw() }, getDeley(fpsParams)); // this confuguration takes <60 hps> in my tests
  };
  
  window.requestAnimationFrame(draw)
}
