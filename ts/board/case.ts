class Case {

  x: number;
  y: number;
  w: number;
  h: number;
  backgroundColor:string;
  borderColor:string;
  borderWidth:number;
  backgroundImage:any;
  displayCase:boolean;

  constructor(x: number = 0, y: number = 0, w: number = 8, h: number = 8, backgroundColor:string = "#3366CC", borderWidth:number = 5, inputBackgroundImage:any = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.backgroundColor = backgroundColor;
    this.borderColor = colorBlack;
    this.borderWidth = 2;
    this.backgroundImage = inputBackgroundImage;
    this.displayCase = true;
  }
  
}
