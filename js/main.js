var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Board = (function () {
    function Board(tailleCase, nbLignes, nbColonnes, timeRefresh) {
        if (tailleCase === void 0) { tailleCase = 50; }
        if (nbLignes === void 0) { nbLignes = 8; }
        if (nbColonnes === void 0) { nbColonnes = 8; }
        if (timeRefresh === void 0) { timeRefresh = 10; }
        this.protectedHighlightCases = new Array();
        this.casesBackground = new Array();
        this.casesForeground = new Array();
        this.selectedCases = new Array();
        this.mouseClicked = function (e) {
            var mooveX = e.clientX;
            var mooveY = e.clientY;
            console.log("Mouse clicked : " + mooveX + " " + mooveY);
        };
        this.mouseMoove = function (e) {
            var mooveX = e.clientX;
            var mooveY = e.clientY;
            console.log("Mouse mooved : " + mooveX + " " + mooveY);
        };
        this.tailleCase = tailleCase;
        this.nbLignes = nbLignes;
        this.nbColonnes = nbColonnes;
        this.timeRefresh = timeRefresh;
        this.aForegroundCaseIsSelected = false;
        this.previousSelectedForegroundCaseNb = null;
        this.setCanvas(document.getElementById("myCanvas"));
        this.createBackgroundCases();
        this.createForegroundCases();
        this.autoRefreshCanvas();
    }
    Board.prototype.getTailleCase = function () {
        return this.tailleCase;
    };
    Board.prototype.setTailleCase = function (input) {
        this.tailleCase = input;
    };
    Board.prototype.getNbLignes = function () {
        return this.nbLignes;
    };
    Board.prototype.SetNbLignes = function (input) {
        this.nbLignes = input;
    };
    Board.prototype.getNbColonnes = function () {
        return this.nbColonnes;
    };
    Board.prototype.setNbColonnes = function (input) {
        this.nbColonnes = input;
    };
    Board.prototype.getTimeRefresh = function () {
        return this.timeRefresh;
    };
    Board.prototype.setTimeRefresh = function (input) {
        this.timeRefresh = input;
    };
    Board.prototype.getCanvas = function () {
        return this.canvas;
    };
    Board.prototype.getCtx = function () {
        return this.canvas.getContext("2d");
    };
    Board.prototype.setCanvas = function (inputCanvas) {
        this.canvas = inputCanvas;
    };
    Board.prototype.getAForegroundCaseIsSelected = function () {
        return this.aForegroundCaseIsSelected;
    };
    Board.prototype.setAForegroundCaseIsSelected = function (input) {
        this.aForegroundCaseIsSelected = input;
    };
    Board.prototype.toggleAForegroundCaseIsSelected = function () {
        this.aForegroundCaseIsSelected = this.aForegroundCaseIsSelected == true ? false : true;
    };
    Board.prototype.getPreviousSelectedForegroundCaseNb = function () {
        return this.previousSelectedForegroundCaseNb;
    };
    Board.prototype.setPreviousSelectedForegroundCaseNb = function (inputNb) {
        this.previousSelectedForegroundCaseNb = inputNb;
    };
    Board.prototype.getProtectedHighlightCases = function () {
        return this.protectedHighlightCases;
    };
    Board.prototype.setProtectedHighlightCases = function (input) {
        this.protectedHighlightCases = input;
    };
    Board.prototype.updateProtectedHighlightCase = function (inputArrayNb, inputCaseNb) {
        this.protectedHighlightCases[inputArrayNb] = inputCaseNb;
    };
    Board.prototype.getCasesBackground = function () {
        return this.casesBackground;
    };
    Board.prototype.setCasesBackground = function (input) {
        this.casesBackground = input;
    };
    Board.prototype.updateCaseBackground = function (inputArrayNb, inputCase) {
        this.casesBackground[inputArrayNb] = inputCase;
    };
    Board.prototype.getCasesForeground = function () {
        return this.casesForeground;
    };
    Board.prototype.setCasesForeground = function (input) {
        this.casesForeground = input;
    };
    Board.prototype.updateCaseForeground = function (inputArrayNb, inputCase) {
        this.casesForeground[inputArrayNb] = inputCase;
    };
    Board.prototype.addCaseForeground = function (inputCase) {
        this.casesForeground.push(inputCase);
    };
    Board.prototype.getSelectedCases = function () {
        return this.selectedCases;
    };
    Board.prototype.setSelectedCases = function (input) {
        this.selectedCases = input;
    };
    Board.prototype.addSelectedCase = function (inputNb) {
        this.selectedCases.push(inputNb);
    };
    Board.prototype.cleanCanvas = function () {
        this.getCtx().clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Board.prototype.autoRefreshCanvas = function () {
        setInterval(this.drawAllCases(), this.getTimeRefresh());
    };
    Board.prototype.createBackgroundCases = function () {
        var countCreatedCases = 0;
        var lastColorWhite = true;
        for (var i = 0; i < this.getNbLignes(); i++) {
            for (var j = 0; j < this.getNbColonnes(); j++) {
                var backgroundCaseColor;
                if (i % 2 == 0) {
                    if (j % 2 == 0) {
                        backgroundCaseColor = "#FFFFFF";
                    }
                    else {
                        backgroundCaseColor = "#808080";
                    }
                }
                else {
                    if (j % 2 == 0) {
                        backgroundCaseColor = "#808080";
                    }
                    else {
                        backgroundCaseColor = "#FFFFFF";
                    }
                }
                this.casesBackground[countCreatedCases] = new Case(j * this.getTailleCase(), i * this.getTailleCase(), this.getTailleCase(), this.getTailleCase(), backgroundCaseColor, 2);
                countCreatedCases++;
            }
        }
    };
    Board.prototype.createForegroundCases = function () {
        console.log("createForegroundCases() not overrided");
    };
    Board.prototype.drawCase = function (input, inputImage) {
        if (inputImage === void 0) { inputImage = null; }
        this.getCtx().beginPath();
        this.getCtx().rect(input.x, input.y, input.w, input.h);
        this.getCtx().fillStyle = input.backgroundColor;
        this.getCtx().fill();
        this.getCtx().lineWidth = input.borderWidth;
        this.getCtx().strokeStyle = input.borderColor;
        this.getCtx().stroke();
        if (input.backgroundImage != null) {
            this.getCtx().drawImage(input.backgroundImage, input.x, input.y, input.w, input.h);
        }
    };
    Board.prototype.drawAllCases = function () {
        this.drawBackgroundCases();
        this.drawForegroundCases();
    };
    Board.prototype.drawBackgroundCases = function () {
        for (var i = 0; i < this.casesBackground.length; i++) {
            this.drawCase(this.casesBackground[i]);
        }
    };
    Board.prototype.drawForegroundCases = function () {
        for (var i = 0; i < this.casesForeground.length; i++) {
            if (this.casesForeground[i].displayCase == true) {
                this.drawCase(this.casesForeground[i]);
            }
        }
    };
    Board.prototype.highlightCase = function (inputSelectedCaseNb, inputHighlightColor) {
        if (this.selectedCases.length > 0 && inputSelectedCaseNb >= 0) {
            this.casesBackground[inputSelectedCaseNb].borderColor = inputHighlightColor;
            this.casesBackground[inputSelectedCaseNb].borderWidth = 4;
        }
    };
    Board.prototype.cleanHighlightCasesExceptSelected = function () {
        for (var i = 0; i < this.casesBackground.length; i++) {
            if (i != this.protectedHighlightCases[0]) {
                this.casesBackground[i].borderColor = "#000000";
                this.casesBackground[i].borderWidth = 2;
            }
        }
    };
    Board.prototype.cleanHighlightCases = function () {
        for (var i = 0; i < this.casesBackground.length; i++) {
            this.casesBackground[i].borderColor = "#000000";
            this.casesBackground[i].borderWidth = 2;
        }
    };
    Board.prototype.changeForegroundCasePosition = function (inputNbForegroundCase, inputBackgroundCaseNb) {
        this.casesForeground[inputNbForegroundCase].x = this.getForegroundXAtCaseNb(inputBackgroundCaseNb);
        this.casesForeground[inputNbForegroundCase].y = this.getForegroundYAtCaseNb(inputBackgroundCaseNb);
        this.drawAllCases();
    };
    Board.prototype.getForegroundXAtCaseNb = function (inputPosition) {
        return (inputPosition % this.getNbLignes()) * 50;
    };
    Board.prototype.getForegroundYAtCaseNb = function (inputPosition) {
        return Math.floor(inputPosition / this.getNbLignes()) * 50;
    };
    Board.prototype.isForegroundCaseAtPosition = function (inputPosition) {
        var result = [];
        var testX = this.getForegroundXAtCaseNb(inputPosition);
        var testY = this.getForegroundYAtCaseNb(inputPosition);
        for (var i = 0; i < this.casesForeground.length; i++) {
            if (this.casesForeground[i].x == testX && this.casesForeground[i].y == testY) {
                result.push(i);
            }
        }
        return result;
    };
    Board.prototype.toggleShowHideCase = function (inputCaseForegroundNumber) {
        if (this.casesForeground[inputCaseForegroundNumber].displayCase == false) {
            this.casesForeground[inputCaseForegroundNumber].displayCase == true;
        }
        else {
            this.casesForeground[inputCaseForegroundNumber].displayCase == true;
        }
    };
    Board.prototype.deleteForegroundCase = function (inputForegroundCaseNb) {
        this.casesForeground.splice(inputForegroundCaseNb, 1);
    };
    Board.prototype.keyPressed = function (evt) {
        var charCode = evt.which;
        var charStr = String.fromCharCode(charCode);
        console.log("Key " + charStr + " is pressed.");
    };
    return Board;
}());
var Case = (function () {
    function Case(x, y, w, h, backgroundColor, borderWidth, inputBackgroundImage) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 8; }
        if (h === void 0) { h = 8; }
        if (backgroundColor === void 0) { backgroundColor = "#3366CC"; }
        if (borderWidth === void 0) { borderWidth = 5; }
        if (inputBackgroundImage === void 0) { inputBackgroundImage = null; }
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
    return Case;
}());
var colorRed = "#FF0000";
var colorBlack = "#000000";
var colorBlue = "#335500";
Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
var BoardChess = (function (_super) {
    __extends(BoardChess, _super);
    function BoardChess() {
        var _this = _super.call(this) || this;
        _this.mouseClicked = function (e) {
            var mooveX = e.clientX;
            var mooveY = e.clientY;
            if (mooveX < _this.getNbColonnes() * _this.getTailleCase() && mooveY < _this.getNbLignes() * _this.getTailleCase()) {
                var selectedBackgroundCaseNb = Math.floor((mooveX - 10) / 50) + (Math.floor((mooveY - 10) / 50) * _this.getNbColonnes());
                var selectedForegroundCaseNb = _this.isForegroundCaseAtPosition(selectedBackgroundCaseNb)[_this.isForegroundCaseAtPosition(selectedBackgroundCaseNb).length - 1];
                if ((_this.isForegroundCaseAtPosition(selectedBackgroundCaseNb).length > 0)
                    && (_this.getAForegroundCaseIsSelected() == false)) {
                    _this.setPreviousSelectedForegroundCaseNb(selectedForegroundCaseNb);
                    _this.toggleAForegroundCaseIsSelected();
                    _this.updateProtectedHighlightCase(0, selectedBackgroundCaseNb);
                    _this.cleanHighlightCasesExceptSelected();
                    _this.highlightCase(selectedBackgroundCaseNb, colorRed);
                }
                else if (_this.getAForegroundCaseIsSelected() == true) {
                    _this.toggleAForegroundCaseIsSelected();
                    _this.cleanHighlightCases();
                    if (selectedForegroundCaseNb == undefined
                        || _this.getCasesForeground()[_this.getPreviousSelectedForegroundCaseNb()].playerId != _this.getCasesForeground()[selectedForegroundCaseNb].playerId) {
                        _this.changeForegroundCasePosition(_this.getPreviousSelectedForegroundCaseNb(), selectedBackgroundCaseNb);
                    }
                    if (selectedForegroundCaseNb != undefined
                        && _this.getPreviousSelectedForegroundCaseNb() != selectedForegroundCaseNb
                        && _this.getCasesForeground()[_this.getPreviousSelectedForegroundCaseNb()].playerId != _this.getCasesForeground()[selectedForegroundCaseNb].playerId) {
                        _this.deleteForegroundCase(selectedForegroundCaseNb);
                    }
                }
                _this.drawAllCases();
            }
        };
        _this.mouseMoove = function (e) {
            var mooveX = e.clientX;
            var mooveY = e.clientY;
            _this.addSelectedCase(selectedCaseNb);
            _this.cleanHighlightCasesExceptSelected();
            if (mooveX < _this.getNbColonnes() * _this.getTailleCase() && mooveY < _this.getNbLignes() * _this.getTailleCase()) {
                var selectedCaseNb = Math.floor((mooveX - 10) / 50) + (Math.floor((mooveY - 10) / 50) * _this.getNbColonnes());
                if (selectedCaseNb != _this.getProtectedHighlightCases()[0]) {
                    _this.highlightCase(selectedCaseNb, colorBlack);
                }
            }
            _this.drawAllCases();
        };
        _this.getCanvas().addEventListener("mousedown", _this.mouseClicked, false);
        _this.getCanvas().addEventListener("mousemove", _this.mouseMoove, false);
        _this.getCanvas().addEventListener("keydown", _this.keyPressed, false);
        return _this;
    }
    BoardChess.prototype.createForegroundCases = function () {
        for (var i = 0; i < this.getNbColonnes(); i++) {
            this.addCaseForeground(new CasePion(i * 50, (this.getNbLignes() - 2) * 50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
            this.addCaseForeground(new CasePion(i * 50, 50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
            switch (i) {
                case 0:
                    this.addCaseForeground(new CaseTour(i * 50, (this.getNbLignes() - 1) * 50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseTour(i * 50, 0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;
                case 1:
                    this.addCaseForeground(new CaseCavalier(i * 50, (this.getNbLignes() - 1) * 50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseCavalier(i * 50, 0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;
                case 2:
                    this.addCaseForeground(new CaseFou(i * 50, (this.getNbLignes() - 1) * 50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseFou(i * 50, 0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;
                case 3:
                    this.addCaseForeground(new CaseDame(i * 50, (this.getNbLignes() - 1) * 50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseDame(i * 50, 0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;
                case 4:
                    this.addCaseForeground(new CaseRoi(i * 50, (this.getNbLignes() - 1) * 50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseRoi(i * 50, 0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;
                case 5:
                    this.addCaseForeground(new CaseFou(i * 50, (this.getNbLignes() - 1) * 50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseFou(i * 50, 0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;
                case 6:
                    this.addCaseForeground(new CaseCavalier(i * 50, (this.getNbLignes() - 1) * 50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseCavalier(i * 50, 0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;
                case 7:
                    this.addCaseForeground(new CaseTour(i * 50, (this.getNbLignes() - 1) * 50, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 0));
                    this.addCaseForeground(new CaseTour(i * 50, 0, this.getTailleCase(), this.getTailleCase(), "rgba(0, 0, 0, 0)", 2, 1));
                    break;
            }
        }
    };
    BoardChess.prototype.keyPressed = function (evt) {
        var charCode = evt.which;
        var charStr = String.fromCharCode(charCode);
        console.log("Key " + charStr + " is pressed.");
    };
    return BoardChess;
}(Board));
var CaseCavalier = (function (_super) {
    __extends(CaseCavalier, _super);
    function CaseCavalier(x, y, w, h, backgroundColor, borderWidth, playerId) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 50; }
        if (h === void 0) { h = 50; }
        if (backgroundColor === void 0) { backgroundColor = "#3366CC"; }
        if (borderWidth === void 0) { borderWidth = 5; }
        if (playerId === void 0) { playerId = null; }
        var _this = _super.call(this) || this;
        _this.cavalierBlanc = new Image();
        _this.cavalierBlanc.src = "img/chess/cavalier_blanc.png";
        _this.cavalierNoir = new Image();
        _this.cavalierNoir.src = "img/chess/cavalier_noir.png";
        _this.x = x;
        _this.y = y;
        _this.w = w;
        _this.h = h;
        _this.backgroundColor = backgroundColor;
        _this.borderColor = colorBlack;
        _this.borderWidth = 2;
        _this.backgroundImage = playerId == 0 ? _this.cavalierBlanc : _this.cavalierNoir;
        _this.displayCase = true;
        _this.playerId = playerId;
        return _this;
    }
    return CaseCavalier;
}(Case));
var CaseDame = (function (_super) {
    __extends(CaseDame, _super);
    function CaseDame(x, y, w, h, backgroundColor, borderWidth, playerId) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 50; }
        if (h === void 0) { h = 50; }
        if (backgroundColor === void 0) { backgroundColor = "#3366CC"; }
        if (borderWidth === void 0) { borderWidth = 5; }
        if (playerId === void 0) { playerId = null; }
        var _this = _super.call(this) || this;
        _this.dameBlanc = new Image();
        _this.dameBlanc.src = "img/chess/dame_blanc.png";
        _this.dameNoir = new Image();
        _this.dameNoir.src = "img/chess/dame_noir.png";
        _this.x = x;
        _this.y = y;
        _this.w = w;
        _this.h = h;
        _this.backgroundColor = backgroundColor;
        _this.borderColor = colorBlack;
        _this.borderWidth = 2;
        _this.backgroundImage = playerId == 0 ? _this.dameBlanc : _this.dameNoir;
        _this.displayCase = true;
        _this.playerId = playerId;
        return _this;
    }
    return CaseDame;
}(Case));
var CaseFou = (function (_super) {
    __extends(CaseFou, _super);
    function CaseFou(x, y, w, h, backgroundColor, borderWidth, playerId) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 50; }
        if (h === void 0) { h = 50; }
        if (backgroundColor === void 0) { backgroundColor = "#3366CC"; }
        if (borderWidth === void 0) { borderWidth = 5; }
        if (playerId === void 0) { playerId = null; }
        var _this = _super.call(this) || this;
        _this.fouBlanc = new Image();
        _this.fouBlanc.src = "img/chess/fou_blanc.png";
        _this.fouNoir = new Image();
        _this.fouNoir.src = "img/chess/fou_noir.png";
        _this.x = x;
        _this.y = y;
        _this.w = w;
        _this.h = h;
        _this.backgroundColor = backgroundColor;
        _this.borderColor = colorBlack;
        _this.borderWidth = 2;
        _this.backgroundImage = playerId == 0 ? _this.fouBlanc : _this.fouNoir;
        _this.displayCase = true;
        _this.playerId = playerId;
        return _this;
    }
    return CaseFou;
}(Case));
var CasePion = (function (_super) {
    __extends(CasePion, _super);
    function CasePion(x, y, w, h, backgroundColor, borderWidth, playerId) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 50; }
        if (h === void 0) { h = 50; }
        if (backgroundColor === void 0) { backgroundColor = "#3366CC"; }
        if (borderWidth === void 0) { borderWidth = 5; }
        if (playerId === void 0) { playerId = null; }
        var _this = _super.call(this) || this;
        _this.pionBlanc = new Image();
        _this.pionBlanc.src = "img/chess/pion_blanc.png";
        _this.pionNoir = new Image();
        _this.pionNoir.src = "img/chess/pion_noir.png";
        _this.x = x;
        _this.y = y;
        _this.w = w;
        _this.h = h;
        _this.backgroundColor = backgroundColor;
        _this.borderColor = colorBlack;
        _this.borderWidth = 2;
        _this.backgroundImage = playerId == 0 ? _this.pionBlanc : _this.pionNoir;
        _this.displayCase = true;
        _this.playerId = playerId;
        return _this;
    }
    return CasePion;
}(Case));
var CaseRoi = (function (_super) {
    __extends(CaseRoi, _super);
    function CaseRoi(x, y, w, h, backgroundColor, borderWidth, playerId) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 50; }
        if (h === void 0) { h = 50; }
        if (backgroundColor === void 0) { backgroundColor = "#3366CC"; }
        if (borderWidth === void 0) { borderWidth = 5; }
        if (playerId === void 0) { playerId = null; }
        var _this = _super.call(this) || this;
        _this.roiBlanc = new Image();
        _this.roiBlanc.src = "img/chess/roi_blanc.png";
        _this.roiNoir = new Image();
        _this.roiNoir.src = "img/chess/roi_noir.png";
        _this.x = x;
        _this.y = y;
        _this.w = w;
        _this.h = h;
        _this.backgroundColor = backgroundColor;
        _this.borderColor = colorBlack;
        _this.borderWidth = 2;
        _this.backgroundImage = playerId == 0 ? _this.roiBlanc : _this.roiNoir;
        _this.displayCase = true;
        _this.playerId = playerId;
        return _this;
    }
    return CaseRoi;
}(Case));
var CaseTour = (function (_super) {
    __extends(CaseTour, _super);
    function CaseTour(x, y, w, h, backgroundColor, borderWidth, playerId) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 50; }
        if (h === void 0) { h = 50; }
        if (backgroundColor === void 0) { backgroundColor = "#3366CC"; }
        if (borderWidth === void 0) { borderWidth = 5; }
        if (playerId === void 0) { playerId = null; }
        var _this = _super.call(this) || this;
        _this.tourBlanc = new Image();
        _this.tourBlanc.src = "img/chess/tour_blanc.png";
        _this.tourNoir = new Image();
        _this.tourNoir.src = "img/chess/tour_noir.png";
        _this.x = x;
        _this.y = y;
        _this.w = w;
        _this.h = h;
        _this.backgroundColor = backgroundColor;
        _this.borderColor = colorBlack;
        _this.borderWidth = 2;
        _this.backgroundImage = playerId == 0 ? _this.tourBlanc : _this.tourNoir;
        _this.displayCase = true;
        _this.playerId = playerId;
        return _this;
    }
    return CaseTour;
}(Case));
var b = new BoardChess();
