import whitePath from '##/assets/svg/wallPaper_zvz copy.svg'

export class Item{
  public images: {imageWite:HTMLImageElement, imageDark:HTMLImageElement};
  public x: number;
  public y: number;
  public widthItem: number;
  public heightItem: number;
  
  constructor(
    images: {imageWite:HTMLImageElement, imageDark:HTMLImageElement}, 
    x: number,
    y: number,
    widthItem: number,
    heightItem: number,
  ){
    this.images = images;
    this.x = x;
    this.y = y;
    this.widthItem =  widthItem;
    this.heightItem = heightItem;
  }
};

export class Line{
  private countMaxElemWidth: number;
  private images: {imageWite:HTMLImageElement, imageDark:HTMLImageElement};
  public widthGap: number;
  private widthItem: number;
  public heightGap: number;
  private heightItem: number;
  private row: number;
  public coordinHeightString: {upper: number, down: number};
  public maxSpeed: number;
  public minSpeed: number;
  public speed: number;
  public items: Item[];

  constructor(
    countMaxElemWidth: number,
    images: {imageWite:HTMLImageElement, imageDark:HTMLImageElement},
    widthGap: number,
    widthItem: number,
    heightItem: number,
    heightGap: number,
    row: number,
    speed: number,
    maxSpeed: number,
  ){
    this.countMaxElemWidth = countMaxElemWidth;
    this.images = images;
    this.widthItem = widthItem;
    this.widthGap = widthGap;
    this.heightItem = heightItem;
    this.heightGap = heightGap;
    this.row = row;
    this.speed = speed;
    this.minSpeed = speed;
    this.maxSpeed = maxSpeed;
    this.coordinHeightString = this._getCoordinHeightString();
    this.items = this._getStreeng();
  };
  private _getStreeng():Item[]{
    const line: Item[] = [];
    
    for(let column = 0; column < this.countMaxElemWidth; column++){
      const item = new Item(this.images, this._getCordinateX(column), this._getCordinateY(), this.widthItem, this.heightItem);
      line.push(item);
    }
    return line;
  };
  private _getCordinateX(column:number):number{
    let coordinate = column * (this.widthItem + this.widthGap) - this.widthItem ;
    coordinate = this._centrateCordinateX(coordinate, this.widthItem)
    return coordinate;
  };
  private _getCordinateY():number{
    let coordinate = this.row * (this.heightItem + this.heightGap);
    coordinate = this._centrateCordinateY(coordinate, this.heightItem)
    return coordinate;
  };
  private _centrateCordinateX(cordinX: number, widthItem: number){
    return cordinX + (widthItem ) / 2;
  };
  private _centrateCordinateY(cordinY: number, heightItem: number){
    return cordinY + (heightItem) / 2;
  };
  private _getCoordinHeightString():{upper: number, down: number}{
    const upper = this._getCordinateY();
    const down = upper + this.heightItem;
    return {upper, down}
  }
};

export class Lines{
  private countMaxElemWidth: number;
  private countMaxElemHeight: number;
  private images: {imageWite:HTMLImageElement, imageDark:HTMLImageElement};
  private widthGap: number;
  private widthItem: number;
  private heightItem: number;
  private heightGap: number;
  private normalSpeed: number;
  private canvas: HTMLCanvasElement;
  public radius: number;
  public items: Line[];
  private maxSpeed: number;
  private indexGapWidth: number;
  private indexGapHeight: number; 
  constructor(
    canvas: HTMLCanvasElement,
    images: {imageWite:HTMLImageElement, imageDark:HTMLImageElement},
    widthItem: number,
    heightItem: number,
    radius: number,
    normalSpeed: number,
    maxSpeed: number,
    indexGapWidth: number,
    indexGapHeight: number,
  ){
    this.canvas = canvas;
    this.images = images;
    this.widthItem = widthItem;
    this.heightItem = heightItem;
    this.radius = radius;
    this.normalSpeed = normalSpeed;
    this.maxSpeed = maxSpeed;
    this.indexGapWidth = indexGapWidth;
    this.indexGapHeight = indexGapHeight;
    this.countMaxElemHeight = this._getCountMaxElemHeight();
    this.countMaxElemWidth = this._getCountMaxElemWidth();
    this.heightGap = this._getGapHeight();
    this.widthGap = this._getGapWidth();
    this.items = this._getStreengs();
  }
  private _getStreengs():Line[]{
    const lines:Line[] = [];
    for(let row = 0; row < this.countMaxElemHeight; row ++){
      const speed = this._getSpeedDerection(row);
      
      const line = new Line(
        this.countMaxElemWidth,
        this.images,
        this.widthGap,
        this.widthItem,
        this.heightItem,
        this.heightGap,
        row,
        speed,
        this.maxSpeed,
      );
      lines.push(line);
    }
    return lines;
  };
  private _getSpeedDerection(row: number):number{
    let speed = this.normalSpeed;
    if(row % 2 == 0){
      return speed * -1
    }else{
      return speed
    }
  };
  private _getGapWidth():number{
    const widthCanvas = this.canvas.width;
    const count = Math.ceil(widthCanvas / this.widthItem / this.indexGapWidth);
    const lengthElems = count * this.widthItem;
    const lengthGaps = widthCanvas - lengthElems;
    const lengthGap = Math.round(lengthGaps / count);
    
    return lengthGap;
  };
  private _getGapHeight():number{
    const heightCanvas = this.canvas.height;
    const count = Math.floor(heightCanvas / this.heightItem / this.indexGapHeight);
    const lengthElems = count * this.heightItem;
    const lengthGaps = heightCanvas - lengthElems;
    const lengthGap = Math.round(lengthGaps / count);
    return lengthGap;
  };
  private _getCountMaxElemWidth():number{
    const widthCanvas = this.canvas.width;
    const count = Math.ceil(widthCanvas / this.widthItem / this.indexGapWidth) + 1;
    return count;
  };
  private _getCountMaxElemHeight():number{
    const widthCanvas = this.canvas.height;
    const count = Math.floor(widthCanvas / this.heightItem / this.indexGapHeight);
    return count; 
  }
};

export class BaseCanvas{
  public canvas: HTMLCanvasElement;
  public mouseX: number | null;
  public mouseY: number | null;
  public radius: number;
  private horizontGap: number;
  private verticalGap: number;

  constructor(canvas: HTMLCanvasElement, radius: number = 30){
    this.canvas = canvas;
    this.radius = radius;
    this.horizontGap = 30;
    this.verticalGap = 30;
    this.mouseX = null;
    this.mouseY = null;
    this._initialCanvas();
    this._bindEvents();
  }
  private _initialCanvas(){
    const canvasParams = this.canvas.parentElement?.getBoundingClientRect();
    if(!canvasParams) return;
    const displayWidth = canvasParams.width;
    const displayHeight = canvasParams.height;

    this.canvas.width = displayWidth;
    this.canvas.height = displayHeight;
    // canvas.style.transformOrigin = 'top left'
    // canvas.style.background = "rgba(101, 111, 0, .2)";

    // this.canvas.style.transform = "rotate(30deg)"
    // document.body.style.overflow = 'hidden'
  }
  private _bindEvents(){
    // this.canvas.addEventListener('mousemove', this._getMouseXMouseY);
    document.addEventListener('mousemove', this._getMouseXMouseY);
  };
  public removeEvents(){
    // this.canvas.removeEventListener('mousemove', this._getMouseXMouseY);
    document.removeEventListener('mousemove', this._getMouseXMouseY);
  };
  private _getMouseXMouseY = (event:MouseEvent) => {
    
    const isCanvas = event.target === this.canvas;
    const isInGorizontBorder = this.canvas.width - this.horizontGap < event.offsetX
    || this.horizontGap > event.offsetX;
    const isInVerticalBorder = this.canvas.height - this.verticalGap < event.offsetY
    || this.verticalGap > event.offsetY;

    if(!isCanvas){
      this.mouseY = null;
      this.mouseX = null;
    }else if(isInGorizontBorder ){
      this.mouseY = null;
      this.mouseX = null;
    }else if(isInVerticalBorder){
      this.mouseY = null;
      this.mouseX = null;
    }else{
      this.mouseY = event.offsetY;
      this.mouseX = event.offsetX;
    }

  };

};

export class Ingine{
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  private baseCanvas: BaseCanvas;

  constructor(
    baseCanvas: BaseCanvas
  ){
    this.baseCanvas = baseCanvas
    this.canvas = baseCanvas.canvas;
    this.ctx = this._init_Ctx();
  }

  public clearRect(width:number, height:number){
    this.ctx.clearRect(0, 0, width, height)
  };
  public drowLines(lines: Lines, interaction: {boost: number, deceletation: number}, colorThemeRef:React.MutableRefObject<string | null> ){
    for(let row of lines.items){
      if(interaction){
        this._interectionMose(row, lines, interaction.boost, interaction.deceletation);
      }
      for(let item of row.items){  
        this._moveDefaultSpeed(row, item);
        let img = item.images.imageWite
        if(colorThemeRef.current){
          img = item.images.imageDark
        }
        this.ctx.drawImage(img, item.x, item.y, item.widthItem, item.heightItem);
      }
    }
  };
  public drowCircle(color:string){
    if(this.baseCanvas.mouseX && this.baseCanvas.mouseY){
    
      this.ctx.beginPath();
      this.ctx.arc(this.baseCanvas.mouseX, this.baseCanvas.mouseY, this.baseCanvas.radius, 0, 2 * Math.PI, false); // Draw the circle
  
      // // Set the fill color and fill the circle
      // this.ctx.fillStyle = "rgba(200,0,0,0.3)"; // You can change the color
      this.ctx.fillStyle =  color; // You can change the color
      this.ctx.fill();
      // // Optionally, add a stroke around the circle
    }
  };
  private _init_Ctx():CanvasRenderingContext2D{
    // @ts-ignore
    return this.canvas.getContext('2d')
  };
  private _moveDefaultSpeed(row:Line, item: Item){
    const {isMoveRight, isMoveLeft} = this._getIsMove(item, row)
    if(isMoveRight){
      item.x = 0 - item.widthItem;
      item.x += row.speed;
    }else if(isMoveLeft){
      item.x = this.canvas.width;
    }else{
      item.x += row.speed;
    }
  };
  private _getIsMove(item:Item, row: Line):{isMoveRight:boolean, isMoveLeft:boolean}{
    const isMoveRight:boolean = item.x >= this.canvas.width + row.widthGap;
    const isMoveLeft:boolean = item.x < 0 - (item.widthItem + row.widthGap);
    return {isMoveRight, isMoveLeft}
  };
  private _interectionMose(row: Line, lines: Lines, boost: number, deceleration: number  ):void{
    const isLessMaxSpeed = Math.abs(row.speed) < row.maxSpeed;
    const isBiggerMinSpeed = Math.abs(row.speed) > row.minSpeed;
    
    if(this.baseCanvas.mouseY){
      const isMoveFaster = row.coordinHeightString.upper < this.baseCanvas.mouseY + this.baseCanvas.radius 
        && row.coordinHeightString.down > this.baseCanvas.mouseY - this.baseCanvas.radius;
      if( isMoveFaster ){
        if(isLessMaxSpeed){
          row.speed = this._myMathRound(row.speed + row.speed * boost) 
        }
      }else{
        if(isBiggerMinSpeed){
          row.speed = this._myMathRound(row.speed - row.speed * deceleration)
        }
      }
    }else{
      if(isBiggerMinSpeed){ 
        row.speed = this._myMathRound(row.speed - row.speed * deceleration)
      }
    }
  };
  private _myMathRound(value: number, roundIndex: number = 1000):number{
    return Math.round( value * roundIndex) / roundIndex
  }

};

export class TestIngine{
  static getDelayByFps(){
    const measureTime = 1000;
    const breakTime = 2000;
    let start = Date.now();
    let finish = start + measureTime;
    let fps = 0;
    let flag = true;
    let deley = 26;
    return (fpsParams: {minFps: number, maxFps: number }) => {
      const currentTime = Date.now();
      const condition = currentTime <= finish;
      const condition_2 = start + breakTime <= currentTime
      if(condition){
        fps += 1
      }
      else if(flag){
        flag = false;
        if( fps > fpsParams.maxFps ){
          if(fps > fpsParams.maxFps + 10){
            deley += 4
          }else{
            deley += 1
          }
        }else if(fps < fpsParams.minFps){
          if(fps < fpsParams.minFps - 10){
            deley -= 4
          }else{
            deley -= 1
          }
        }
        
      }
      else if(condition_2){
        start = currentTime;
        finish = start + measureTime;
        fps = 0;
        flag = true;
      }
      return deley;
    }
  };
};