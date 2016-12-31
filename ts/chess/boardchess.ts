Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

class BoardChess extends Board {

    constructor() {
        
        super();

        // Events
        this.getCanvas().addEventListener("mousedown", this.mouseClicked, false);
        this.getCanvas().addEventListener("mousemove", this.mouseMoove, false);
        this.getCanvas().addEventListener("keydown", this.keyPressed, false);

    }
    

    // -------------------------------------------
    //                  Cases
    // -------------------------------------------    

    public createForegroundCases(){

        for (var i = 0 ; i < this.getNbColonnes() ; i++){

            this.addCaseForeground(new CasePion(i*50,(this.getNbLignes()-2)*50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));

            this.addCaseForeground(new CasePion(i*50,50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
            
            switch(i){
            
                case 0:
                    this.addCaseForeground(new CaseTour(i*50,(this.getNbLignes()-1)*50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseTour(i*50,0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;

                case 1:
                    this.addCaseForeground(new CaseCavalier(i*50,(this.getNbLignes()-1)*50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseCavalier(i*50,0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;

                case 2:
                    this.addCaseForeground(new CaseFou(i*50,(this.getNbLignes()-1)*50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseFou(i*50,0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;

                case 3:
                    this.addCaseForeground(new CaseDame(i*50,(this.getNbLignes()-1)*50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseDame(i*50,0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;

                case 4:
                    this.addCaseForeground(new CaseRoi(i*50,(this.getNbLignes()-1)*50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseRoi(i*50,0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;

                case 5:
                    this.addCaseForeground(new CaseFou(i*50,(this.getNbLignes()-1)*50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseFou(i*50,0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;

                case 6:
                    this.addCaseForeground(new CaseCavalier(i*50,(this.getNbLignes()-1)*50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseCavalier(i*50,0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;

                case 7:
                    this.addCaseForeground(new CaseTour(i*50,(this.getNbLignes()-1)*50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseTour(i*50,0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;
            }

        }

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

        if (mooveX < this.getNbColonnes()*this.getTailleCase() && mooveY < this.getNbLignes()*this.getTailleCase()){

            var selectedBackgroundCaseNb = Math.floor((mooveX-10)/50) + (Math.floor((mooveY-10)/50)*this.getNbColonnes());
            var selectedForegroundCaseNb = this.isForegroundCaseAtPosition(selectedBackgroundCaseNb)[this.isForegroundCaseAtPosition(selectedBackgroundCaseNb).length-1];        
            //console.log("case cochée : " + selectedBackgroundCaseNb + " - foreground : " + selectedForegroundCaseNb);
            
            // Highlight case border if this is a foreground case and if this case isn't already selected
            if (
                (this.isForegroundCaseAtPosition(selectedBackgroundCaseNb).length > 0)
                && (this.getAForegroundCaseIsSelected() == false)
            ){

                // Memorize selected case
                this.setPreviousSelectedForegroundCaseNb(selectedForegroundCaseNb);

                // Toggle
                this.toggleAForegroundCaseIsSelected();
                

                // Highlight selected case
                this.updateProtectedHighlightCase(0, selectedBackgroundCaseNb);
                this.cleanHighlightCasesExceptSelected();
                this.highlightCase(selectedBackgroundCaseNb, colorRed);    

            } 

            // Else moove the foreground case to the clicked case if this case isn't fill with other foreground case of the player
            else if (this.getAForegroundCaseIsSelected() == true) {

                // Toggle
                this.toggleAForegroundCaseIsSelected();

                // Remove highlight
                this.cleanHighlightCases();

                // Moove
                if (
                    selectedForegroundCaseNb == undefined
                    || this.getCasesForeground()[this.getPreviousSelectedForegroundCaseNb()].playerId != this.getCasesForeground()[selectedForegroundCaseNb].playerId
                ){
                    this.changeForegroundCasePosition(this.getPreviousSelectedForegroundCaseNb(), selectedBackgroundCaseNb);
                }

                // Collision if the selected foreground case is an enemy
                if (selectedForegroundCaseNb != undefined 
                    && this.getPreviousSelectedForegroundCaseNb() != selectedForegroundCaseNb
                    && this.getCasesForeground()[this.getPreviousSelectedForegroundCaseNb()].playerId != this.getCasesForeground()[selectedForegroundCaseNb].playerId
                ){
                    this.deleteForegroundCase(selectedForegroundCaseNb);
                }
                
            }

            // Canvas update
            this.drawAllCases();

        }

    }

    //public mouseMoove(e){
    public mouseMoove=(e)=>{

        var mooveX = e.clientX; 
        var mooveY = e.clientY;

        //this.selectedCases = [];
        this.addSelectedCase(selectedCaseNb);

        this.cleanHighlightCasesExceptSelected();
        
        if (mooveX < this.getNbColonnes()*this.getTailleCase() && mooveY < this.getNbLignes()*this.getTailleCase()){

            // 10 is borderWidth*2
            var selectedCaseNb = Math.floor((mooveX-10)/50) + (Math.floor((mooveY-10)/50)*this.getNbColonnes());

            if (selectedCaseNb != this.getProtectedHighlightCases()[0]){
                this.highlightCase(selectedCaseNb, colorBlack);
            }
            
        } 
        
        this.drawAllCases();

    }

}