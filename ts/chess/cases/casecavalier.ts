class CaseCavalier extends Case {

  playerId:number; 
  cavalierBlanc:any;
  cavalierNoir:any;

  constructor(x: number = 0, y: number = 0, w: number = 50, h: number = 50, backgroundColor:string = "#3366CC", borderWidth:number = 5, playerId:number = null) {
    super();

    this.cavalierBlanc = new Image();
    this.cavalierBlanc.src = "img/chess/cavalier_blanc.png";
    this.cavalierNoir = new Image();
    this.cavalierNoir.src = "img/chess/cavalier_noir.png"; 

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.backgroundColor = backgroundColor;
    this.borderColor = colorBlack;
    this.borderWidth = 2;
    this.backgroundImage = playerId == 0 ? this.cavalierBlanc : this.cavalierNoir;
    this.displayCase = true;
    this.playerId = playerId;
  }

}