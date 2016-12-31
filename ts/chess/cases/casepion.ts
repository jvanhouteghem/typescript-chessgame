class CasePion extends Case {

  playerId:number; 

  pionBlanc:any;
  pionNoir:any;

  constructor(x: number = 0, y: number = 0, w: number = 50, h: number = 50, backgroundColor:string = "#3366CC", borderWidth:number = 5, playerId:number = null) {
    super();

    this.pionBlanc = new Image();
    this.pionBlanc.src = "img/chess/pion_blanc.png";
    this.pionNoir = new Image();
    this.pionNoir.src = "img/chess/pion_noir.png"; 
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.backgroundColor = backgroundColor;
    this.borderColor = colorBlack;
    this.borderWidth = 2;
    this.backgroundImage = playerId == 0 ? this.pionBlanc : this.pionNoir;
    this.displayCase = true;
    this.playerId = playerId;
  }

}