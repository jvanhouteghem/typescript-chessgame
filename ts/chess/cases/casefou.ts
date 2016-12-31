class CaseFou extends Case {

  playerId:number;
  fouBlanc:any;
  fouNoir:any; 

  constructor(x: number = 0, y: number = 0, w: number = 50, h: number = 50, backgroundColor:string = "#3366CC", borderWidth:number = 5, playerId:number = null) {
    super();

    this.fouBlanc = new Image();
    this.fouBlanc.src = "img/chess/fou_blanc.png";
    this.fouNoir = new Image();
    this.fouNoir.src = "img/chess/fou_noir.png";

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.backgroundColor = backgroundColor;
    this.borderColor = colorBlack;
    this.borderWidth = 2;
    this.backgroundImage = playerId == 0 ? this.fouBlanc : this.fouNoir;
    this.displayCase = true;
    this.playerId = playerId;
  }

}