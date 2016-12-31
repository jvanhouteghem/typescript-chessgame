class CaseRoi extends Case {

  playerId:number; 
  roiBlanc:any;
  roiNoir:any;

  constructor(x: number = 0, y: number = 0, w: number = 50, h: number = 50, backgroundColor:string = "#3366CC", borderWidth:number = 5, playerId:number = null) {
    super();

    this.roiBlanc = new Image();
    this.roiBlanc.src = "img/chess/roi_blanc.png";
    this.roiNoir = new Image();
    this.roiNoir.src = "img/chess/roi_noir.png"; 

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.backgroundColor = backgroundColor;
    this.borderColor = colorBlack;
    this.borderWidth = 2;
    this.backgroundImage = playerId == 0 ? this.roiBlanc : this.roiNoir;
    this.displayCase = true;
    this.playerId = playerId;
  }

}