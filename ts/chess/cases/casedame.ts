class CaseDame extends Case {

  playerId:number; 
  dameBlanc:any;
  dameNoir:any;

  constructor(x: number = 0, y: number = 0, w: number = 50, h: number = 50, backgroundColor:string = "#3366CC", borderWidth:number = 5, playerId:number = null) {
    super();

    this.dameBlanc = new Image();
    this.dameBlanc.src = "img/chess/dame_blanc.png";
    this.dameNoir = new Image();
    this.dameNoir.src = "img/chess/dame_noir.png";

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.backgroundColor = backgroundColor;
    this.borderColor = colorBlack;
    this.borderWidth = 2;
    this.backgroundImage = playerId == 0 ? this.dameBlanc : this.dameNoir;
    this.displayCase = true;
    this.playerId = playerId;
  }

}