//Globale Variablen
var el = null; //Das Element, welches per Drag&Drop verschoben wird
var dx = null; //Abstand von Mausposition zu linken Rand des Bildes, welches verschoben wird
var dy = null; //Abstand von Mausposition zu oberen Rand des Bildes, welches verschoben wird

//*******************

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
	//if(evt.changedTouches[0].clientX > this.ziele[i].div.offsetLeft && evt.changedTouches[0].clientY > this.ziele[i].div.offsetTop && 
		//evt.changedTouches[0].clientX < (this.ziele[i].div.offsetLeft + this.ziele[i].div.offsetWidth) && evt.changedTouches[0].clientY < (this.ziele[i].div.offsetTop + this.ziele[i].div.offsetHeight) ){
		 
	//Klicken
	if(evt.clientX > this.ziele[i].div.offsetLeft && evt.clientY > this.ziele[i].div.offsetTop && 
		evt.clientX < (this.ziele[i].div.offsetLeft + this.ziele[i].div.offsetWidth) && evt.clientY < (this.ziele[i].div.offsetTop + this.ziele[i].div.offsetHeight) ){
		 
			if(this.type == this.ziele[i].type){
				this.dragdrop = false;
				this.div.style.left = this.ziele[i].div.offsetLeft + "px";
				this.div.style.top =  this.ziele[i].div.offsetHeight + 50 + "px";
				alert("Hurra");
			}
			else {
				alert("Nope");
			}
		}
	}
	
	el.style.cursor = "";
	el = null;
	}
}

