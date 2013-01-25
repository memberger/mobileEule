//Globale Variablen
var el = null; //Das Element, welches per Drag&Drop verschoben wird
var dx = null; //Abstand von Mausposition zu linken Rand des Bildes, welches verschoben wird
var dy = null; //Abstand von Mausposition zu oberen Rand des Bildes, welches verschoben wird

// Sonstige globale Variablen
// Variablen für Spiel 1
var katBegriffe;
var richtigeBegriffe = 0;
var wort1,wort2,wort3;

var myJson = new MyJson();

var items = myJson.getBegriffe();// Alle nötigen Begriffe
var kat   = myJson.getKategorie();//Alle nötige aus Katrgorie.json

//*******************

// JSON Daten das erste mal holen

function nextBilder(){
	katBegriffe = items.begriffe;
	if((kat.fortschritt+2) == katBegriffe.length){
	wort1 = katBegriffe[kat.fortschritt];
	wort2 = katBegriffe[(kat.fortschritt)+1];
	wort3 = katBegriffe[0];
	}
	else if((kat.fortschritt+2) == katBegriffe.length+1){
	wort1 = katBegriffe[kat.fortschritt];
	wort2 = katBegriffe[0];
	wort3 = katBegriffe[1];
	}
	else{
	wort1 = katBegriffe[kat.fortschritt];
	wort2 = katBegriffe[(kat.fortschritt)+1];
	wort3 = katBegriffe[(kat.fortschritt)+2];
	}
	
	puzzleSetzen(wort1,wort2,wort3);
	document.body.style.backgroundImage = "url(assets/img/spiel/"+kat.id+"_hintergrund.png)"; 
	document.getElementById("kategorieName").insertAdjacentHTML("AfterBegin", items.name);
	document.getElementById("kategorieBild").setAttribute("src", "assets/img/spiel/"+kat.id+"_bild.png");
}

function puzzleSetzen(a,b,c){
var ziele = new Array();
var r = Math.random() * 100;

if(r >= 0 && r < 10){
	ziele[0] = new Ziel(a.id,"assets/img/spiel/"+a.id+"_bild.png",0);
	ziele[1] = new Ziel(b.id,"assets/img/spiel/"+b.id+"_bild.png",1);
	ziele[2] = new Ziel(c.id,"assets/img/spiel/"+c.id+"_bild.png",2);

	var quelle1 = new Quelle(a.id, a.name, 0, ziele);
	var quelle2 = new Quelle(b.id, b.name, 1, ziele);
	var quelle3 = new Quelle(c.id, c.name, 2, ziele);
}
if(r >= 10 && r < 20){
	ziele[0] = new Ziel(a.id,"assets/img/spiel/"+a.id+"_bild.png",0);
	ziele[1] = new Ziel(b.id,"assets/img/spiel/"+b.id+"_bild.png",1);
	ziele[2] = new Ziel(c.id,"assets/img/spiel/"+c.id+"_bild.png",2);

	var quelle1 = new Quelle(a.id, a.name, 2, ziele);
	var quelle2 = new Quelle(b.id, b.name, 0, ziele);
	var quelle3 = new Quelle(c.id, c.name, 1, ziele);
}
if(r >= 20 && r < 30){
	ziele[0] = new Ziel(a.id,"assets/img/spiel/"+a.id+"_bild.png",0);
	ziele[1] = new Ziel(b.id,"assets/img/spiel/"+b.id+"_bild.png",1);
	ziele[2] = new Ziel(c.id,"assets/img/spiel/"+c.id+"_bild.png",2);

	var quelle1 = new Quelle(a.id, a.name, 1, ziele);
	var quelle2 = new Quelle(b.id, b.name, 2, ziele);
	var quelle3 = new Quelle(c.id, c.name, 0, ziele);
}
if(r >= 30 && r < 40){
	ziele[0] = new Ziel(a.id,"assets/img/spiel/"+a.id+"_bild.png",0);
	ziele[1] = new Ziel(b.id,"assets/img/spiel/"+b.id+"_bild.png",1);
	ziele[2] = new Ziel(c.id,"assets/img/spiel/"+c.id+"_bild.png",2);

	var quelle1 = new Quelle(a.id, a.name, 0, ziele);
	var quelle2 = new Quelle(b.id, b.name, 2, ziele);
	var quelle3 = new Quelle(c.id, c.name, 1, ziele);
}
if(r >= 40 && r < 50){
	ziele[0] = new Ziel(a.id,"assets/img/spiel/"+a.id+"_bild.png",1);
	ziele[1] = new Ziel(b.id,"assets/img/spiel/"+b.id+"_bild.png",0);
	ziele[2] = new Ziel(c.id,"assets/img/spiel/"+c.id+"_bild.png",2);

	var quelle1 = new Quelle(a.id, a.name, 0, ziele);
	var quelle2 = new Quelle(b.id, b.name, 1, ziele);
	var quelle3 = new Quelle(c.id, c.name, 2, ziele);
}
if(r >= 50 && r < 60){
	ziele[0] = new Ziel(a.id,"assets/img/spiel/"+a.id+"_bild.png",2);
	ziele[1] = new Ziel(b.id,"assets/img/spiel/"+b.id+"_bild.png",0);
	ziele[2] = new Ziel(c.id,"assets/img/spiel/"+c.id+"_bild.png",1);

	var quelle1 = new Quelle(a.id, a.name, 0, ziele);
	var quelle2 = new Quelle(b.id, b.name, 1, ziele);
	var quelle3 = new Quelle(c.id, c.name, 2, ziele);
}
if(r >= 60 && r < 70){
	ziele[0] = new Ziel(a.id,"assets/img/spiel/"+a.id+"_bild.png",2);
	ziele[1] = new Ziel(b.id,"assets/img/spiel/"+b.id+"_bild.png",0);
	ziele[2] = new Ziel(c.id,"assets/img/spiel/"+c.id+"_bild.png",1);

	var quelle1 = new Quelle(a.id, a.name, 1, ziele);
	var quelle2 = new Quelle(b.id, b.name, 2, ziele);
	var quelle3 = new Quelle(c.id, c.name, 0, ziele);
}
if(r >= 70 && r < 80){
	ziele[0] = new Ziel(a.id,"assets/img/spiel/"+a.id+"_bild.png",1);
	ziele[1] = new Ziel(b.id,"assets/img/spiel/"+b.id+"_bild.png",2);
	ziele[2] = new Ziel(c.id,"assets/img/spiel/"+c.id+"_bild.png",0);

	var quelle1 = new Quelle(a.id, a.name, 0, ziele);
	var quelle2 = new Quelle(b.id, b.name, 1, ziele);
	var quelle3 = new Quelle(c.id, c.name, 2, ziele);
}
if(r >= 80 && r < 90){
	ziele[0] = new Ziel(a.id,"assets/img/spiel/"+a.id+"_bild.png",1);
	ziele[1] = new Ziel(b.id,"assets/img/spiel/"+b.id+"_bild.png",2);
	ziele[2] = new Ziel(c.id,"assets/img/spiel/"+c.id+"_bild.png",0);

	var quelle1 = new Quelle(a.id, a.name, 2, ziele);
	var quelle2 = new Quelle(b.id, b.name, 0, ziele);
	var quelle3 = new Quelle(c.id, c.name, 1, ziele);
}
if(r >= 90 && r <= 100){
	ziele[0] = new Ziel(a.id,"assets/img/spiel/"+a.id+"_bild.png",2);
	ziele[1] = new Ziel(b.id,"assets/img/spiel/"+b.id+"_bild.png",0);
	ziele[2] = new Ziel(c.id,"assets/img/spiel/"+c.id+"_bild.png",1);

	var quelle1 = new Quelle(a.id, a.name, 2, ziele);
	var quelle2 = new Quelle(b.id, b.name, 1, ziele);
	var quelle3 = new Quelle(c.id, c.name, 0, ziele);
}

}

//Diese Funktion wird aufgerufen wenn die Maustaste gedrückt wird
//Hier wird entschieden ob auf ein verschiebbares Element gedrückt wurde
//Falls das der Fall is werden dx und dy berechnet
function down(evt){
	//Mit dieser Anweisung wird das Standardverhalten vom Browser unterdrückt
	if(this.dragdrop){
	if (evt.preventDefault) {
            evt.preventDefault(); // The W3C DOM way
        } else {
            evt.returnValue = false; // The IE way
        }
	//Mit dieser Anweisung wird das geklickte Element erkannt
	if(evt.target){
                var element=evt.target;  //w3c
        }else{
                var element=evt.srcElement;   //internet explorer
    }
	console.log(evt);
	if(element.myParam == "bla"){
		element = element.parentNode;
	}
	//Die while-Schleife wird benötigt falls ein Container verschoben werden soll
	//egal auf welches beinhaltene Element man klickt
	//Falls keine Element gefunden wird passiert nichts
	
		//Klicken
		dx = element.offsetLeft - evt.clientX;
		dy = element.offsetTop - evt.clientY;
	
	//Touch	
	//	dx = element.offsetLeft - evt.touches[0].clientX;
	//	dy = element.offsetTop - evt.touches[0].clientY;
		
		el = element;
		//el.style.cursor = "move"; //Damit wird die Form des Mauszeigers verändert
		element.parentNode.appendChild(element);
	}
}

//Diese Funktion wird auferufen wenn die Maus über ein Element geschoben wird
//Wenn vorher auf ein verschiebbares Element gedrückt wurde und die Maustaste
//gedrückt gehalten wird, folgt das Element der Mausbewegung 
function move(evt){
	//Mit dieser Anweisung wird das Standardverhalten vom Browser unterdrückt
	if (evt.preventDefault) {
            evt.preventDefault(); // The W3C DOM way
        } else {
            evt.returnValue = false; // The IE way
        }
	//Die If-Anweisung wird benutzt um zu erkennen ob auf ein Element geklickt wurde
	if(el != null){
	//Die gedrückte Stelle des Elements wird auf die Mausposition gesetzt
	
	//Touch
	//el.style.left = evt.touches[0].clientX + dx + "px";
	//el.style.top = evt.touches[0].clientY + dy + "px";
	
	//Klicken
	el.style.left = evt.clientX + dx + "px";
	el.style.top = evt.clientY + dy + "px";
	

	}
}

//Diese Funktion wird auferufen wenn die Maustaste losgelassen wird

function up(evt){
//Alle weiteren Anweisungen nur ausführen wenn voher auf ein verschiebbares
//Element dedrückt wurde 
if(el != null){ 
	
	//Mit dieser Anweisung wird das Standardverhalten vom Browser unterdrückt
	
	
	if (evt.preventDefault) {
            evt.preventDefault(); // The W3C DOM way
        } else {
            evt.returnValue = false; // The IE way
        }
	//this.vergleich();
	

	
	for(var i=0; i<this.ziele.length; i++){
	//Touch
	/*if(evt.changedTouches[0].clientX > this.ziele[i].div.offsetLeft && evt.changedTouches[0].clientY > this.ziele[i].div.offsetTop && 
		evt.changedTouches[0].clientX < (this.ziele[i].div.offsetLeft + this.ziele[i].div.offsetWidth) && evt.changedTouches[0].clientY < (this.ziele[i].div.offsetTop + this.ziele[i].div.offsetHeight) ){
		*/ 
	//Klicken
	if(evt.clientX > this.ziele[i].div.offsetLeft && evt.clientY > this.ziele[i].div.offsetTop && 
		evt.clientX < (this.ziele[i].div.offsetLeft + this.ziele[i].div.offsetWidth) && evt.clientY < (this.ziele[i].div.offsetTop + this.ziele[i].div.offsetHeight) ){
		 
			if(this.type == this.ziele[i].type){
				this.dragdrop = false;
				this.div.style.left = this.ziele[i].div.offsetLeft + "px";
				this.div.style.top =  this.ziele[i].div.offsetHeight + this.div.offsetHeight/6 + "px";
				richtigeBegriffe++;
				if(richtigeBegriffe == 3){
					puzzleSpielGeschafft();
				}
			}
			else {
				this.div.style.top = this.startTop;
				this.div.style.left = this.startLeft;
				
			}
		}

	}
	
	
	el.style.cursor = "";
	el = null;
	}
}

function puzzleSpielGeschafft(){
	richtigeBegriffe=0;
	kat.fortschritt++;
	if(kat.fortschritt < 5){
	window.location = 'spiel_3.html';
	myJson.saveTemp();
	}
	else{
	spielFertig();
	}
}

