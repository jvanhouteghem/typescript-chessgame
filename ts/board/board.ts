class Board {

    private tailleCase: number;
    private nbLignes:number;
    private nbColonnes:number;
    private timeRefresh:number;

    private canvas: any;

    private aForegroundCaseIsSelected:boolean;
    private previousSelectedForegroundCaseNb;

    private protectedHighlightCases:Array<Number> = new Array();
    private casesBackground:Array<Case> = new Array();
    private casesForeground:Array<Case> = new Array();
    private selectedCases:Array<Number> = new Array();

    // -------------------------------------------
    //            Getters / Setters
    // -------------------------------------------

    public getTailleCase(){
        return this.tailleCase;
    }
    public setTailleCase(input : any) {
        this.tailleCase = input;
    }

    public getNbLignes(){
        return this.nbLignes;
    }
    public SetNbLignes(input : any) {
        this.nbLignes = input;
    }

    public getNbColonnes(){
        return this.nbColonnes;
    }
    public setNbColonnes(input : any) {
        this.nbColonnes = input;
    }

    public getTimeRefresh(){
        return this.timeRefresh;
    }
    public setTimeRefresh(input : any) {
        this.timeRefresh = input;
    }

    public getCanvas(){
        return this.canvas;
    }
    public getCtx(){
        return this.canvas.getContext("2d");
    }
    public setCanvas(inputCanvas : any) {
        this.canvas = inputCanvas;
    }

    
    public getAForegroundCaseIsSelected(){
        return this.aForegroundCaseIsSelected;
    }
    public setAForegroundCaseIsSelected(input : any) {
        this.aForegroundCaseIsSelected = input;
    }
    public toggleAForegroundCaseIsSelected(){
        this.aForegroundCaseIsSelected = this.aForegroundCaseIsSelected == true ? false : true;
    }


    public getPreviousSelectedForegroundCaseNb(){
        return this.previousSelectedForegroundCaseNb;
    }
    public setPreviousSelectedForegroundCaseNb(inputNb : any) {
        this.previousSelectedForegroundCaseNb = inputNb;
    }

    
    public getProtectedHighlightCases(){
        return this.protectedHighlightCases;
    }
    public setProtectedHighlightCases(input : any) {
        this.protectedHighlightCases = input;
    }
    public updateProtectedHighlightCase(inputArrayNb : number, inputCaseNb : number){
        this.protectedHighlightCases[inputArrayNb] = inputCaseNb;
    }


    public getCasesBackground(){
        return this.casesBackground;
    }
    public setCasesBackground(input : any) {
        this.casesBackground = input;
    }
    public updateCaseBackground(inputArrayNb : number, inputCase : Case){
        this.casesBackground[inputArrayNb] = inputCase;
    }


    public getCasesForeground(){
        return this.casesForeground;
    }
    public setCasesForeground(input : any) {
        this.casesForeground = input;
    }
    public updateCaseForeground(inputArrayNb : number, inputCase : Case){
        this.casesForeground[inputArrayNb] = inputCase;
    }
    public addCaseForeground(inputCase : Case){
        this.casesForeground.push(inputCase);
    }


    public getSelectedCases(){
        return this.selectedCases;
    }
    public setSelectedCases(input : any) {
        this.selectedCases = input;
    }
    public addSelectedCase(inputNb : number){
        this.selectedCases.push(inputNb);
    }

    // -------------------------------------------
    //                  Constructor
    // -------------------------------------------

    constructor(tailleCase:number = 50, nbLignes:number = 8, nbColonnes = 8, timeRefresh:number = 10) {

        this.tailleCase = tailleCase;
        this.nbLignes = nbLignes;
        this.nbColonnes = nbColonnes;
        this.timeRefresh = timeRefresh;

        this.aForegroundCaseIsSelected = false;
        this.previousSelectedForegroundCaseNb = null;

        this.setCanvas(<HTMLCanvasElement> document.getElementById("myCanvas"));

        this.createBackgroundCases();
        this.createForegroundCases();

        // Events
        /*this.canvas.addEventListener("mousedown", this.mouseClicked, false);
        this.canvas.addEventListener("mousemove", this.mouseMoove, false);
        this.canvas.addEventListener("keydown", this.keyPressed, false);*/

        // Rafraichissement de l'écran
        this.autoRefreshCanvas();

    // -------------------------------------------
    //                  Methods
    // -------------------------------------------       

    }

    public cleanCanvas(){
        this.getCtx().clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public autoRefreshCanvas(){
        setInterval(this.drawAllCases(), this.getTimeRefresh());
    }

    public createBackgroundCases(){ 
        var countCreatedCases:number = 0;

        var lastColorWhite = true;

        for(var i = 0; i < this.getNbLignes(); i++) {

            for(var j = 0; j < this.getNbColonnes(); j++) {

                // Patern noir et blanc
                var backgroundCaseColor;

                if (i % 2 == 0) {
                    if (j % 2 == 0){
                        backgroundCaseColor = "#FFFFFF";
                    } else {
                        backgroundCaseColor = "#808080";
                    }
                } else {
                    if (j % 2 == 0){
                        backgroundCaseColor = "#808080";
                    } else {
                        backgroundCaseColor = "#FFFFFF";
                    }                   
                }

                this.casesBackground[countCreatedCases] = new Case(j*this.getTailleCase(),i*this.getTailleCase(), this.getTailleCase(), this.getTailleCase(), backgroundCaseColor, 2);
                countCreatedCases++;
            }
        }
    }

    public createForegroundCases(){
        console.log("createForegroundCases() not overrided");
    }

    public drawCase(input:Case, inputImage:any = null){
        this.getCtx().beginPath();
        this.getCtx().rect(input.x,input.y, input.w, input.h);
        this.getCtx().fillStyle = input.backgroundColor;
        this.getCtx().fill();
        
        this.getCtx().lineWidth = input.borderWidth;
        this.getCtx().strokeStyle = input.borderColor;
        this.getCtx().stroke();

        if (input.backgroundImage != null){
            this.getCtx().drawImage(input.backgroundImage, input.x, input.y, input.w, input.h);
        }

        //this.ctx.closePath();
    }
    

    public drawAllCases(){
        this.drawBackgroundCases();
        this.drawForegroundCases();
    }


    public drawBackgroundCases(){
        for(var i = 0; i < this.casesBackground.length; i++) {
            this.drawCase(this.casesBackground[i]);
        }
    }

    public drawForegroundCases(){
        for(var i = 0; i < this.casesForeground.length; i++) {
            if (this.casesForeground[i].displayCase == true){
                this.drawCase(this.casesForeground[i]);
            }
        }
    }

    public highlightCase(inputSelectedCaseNb, inputHighlightColor){
        if (this.selectedCases.length > 0 && inputSelectedCaseNb >= 0){
            this.casesBackground[inputSelectedCaseNb].borderColor = inputHighlightColor;
            this.casesBackground[inputSelectedCaseNb].borderWidth = 4;
        }
       
    }

    public cleanHighlightCasesExceptSelected(){
        for (var i = 0 ; i < this.casesBackground.length ; i++){
            if (i != this.protectedHighlightCases[0]){
                this.casesBackground[i].borderColor = "#000000";
                this.casesBackground[i].borderWidth = 2;
            }
        }
    }

    public cleanHighlightCases(){
        for (var i = 0 ; i < this.casesBackground.length ; i++){
            this.casesBackground[i].borderColor = "#000000";
            this.casesBackground[i].borderWidth = 2;
        }
    }

    public changeForegroundCasePosition(inputNbForegroundCase, inputBackgroundCaseNb){

        this.casesForeground[inputNbForegroundCase].x = this.getForegroundXAtCaseNb(inputBackgroundCaseNb);
        this.casesForeground[inputNbForegroundCase].y = this.getForegroundYAtCaseNb(inputBackgroundCaseNb);

        this.drawAllCases();

    }

    public getForegroundXAtCaseNb(inputPosition){
        return (inputPosition % this.getNbLignes())*50;
    }

    public getForegroundYAtCaseNb(inputPosition){
        return Math.floor(inputPosition/this.getNbLignes())*50;
    }

    public isForegroundCaseAtPosition(inputPosition){

        var result = [];
        
        var testX = this.getForegroundXAtCaseNb(inputPosition);
        var testY = this.getForegroundYAtCaseNb(inputPosition);

        for (var i = 0 ; i < this.casesForeground.length ; i++){
            if (this.casesForeground[i].x == testX && this.casesForeground[i].y == testY){
                result.push(i);
            }
        }

        return result;

    }

    public toggleShowHideCase(inputCaseForegroundNumber){
        if (this.casesForeground[inputCaseForegroundNumber].displayCase == false){
            this.casesForeground[inputCaseForegroundNumber].displayCase == true;
        } else {
            this.casesForeground[inputCaseForegroundNumber].displayCase == true;
        }
    }

    public deleteForegroundCase(inputForegroundCaseNb){
        this.casesForeground.splice(inputForegroundCaseNb, 1);
    }
    
    // -------------------------------------------
    //                  Events
    // -------------------------------------------

    public keyPressed(evt:any){

        var charCode = evt.which;
        var charStr = String.fromCharCode(charCode);
        console.log("Key " + charStr + " is pressed.");

    }

    public mouseClicked=(e:any)=>{

        var mooveX = e.clientX; 
        var mooveY = e.clientY;
        console.log("Mouse clicked : " + mooveX + " " + mooveY);

    }

    public mouseMoove=(e)=>{

        var mooveX = e.clientX; 
        var mooveY = e.clientY;
        console.log("Mouse mooved : " + mooveX + " " + mooveY);

    }

}

