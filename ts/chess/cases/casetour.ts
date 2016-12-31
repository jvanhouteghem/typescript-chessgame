class CaseTour extends Case {

  playerId:number; 
  tourBlanc:any;
  tourNoir:any;

  constructor(x: number = 0, y: number = 0, w: number = 50, h: number = 50, backgroundColor:string = "#3366CC", borderWidth:number = 5, playerId:number = null) {
    super();

    this.tourBlanc = new Image();
    this.tourBlanc.src = "img/chess/tour_blanc.png";
    this.tourNoir = new Image();
    this.tourNoir.src = "img/chess/tour_noir.png"; 

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.backgroundColor = backgroundColor;
    this.borderColor = colorBlack;
    this.borderWidth = 2;
    this.backgroundImage = playerId == 0 ? this.tourBlanc : this.tourNoir;
    this.displayCase = true;
    this.playerId = playerId;
  }

}