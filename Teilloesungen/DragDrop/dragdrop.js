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
	//Die while-Schleife wird benötigt falls ein Container verschoben werden soll
	//egal auf welches beinhaltene Element man klickt
	//Falls keine Element gefunden wird passiert nichts
	
	/*
	Wenn ein Element gefunden wird das verschoben werden kann, werden dx und dy
	berechnet und el auf dieses Element gesetzt
	Die weitere Fallunterscheidung wird benötigt, da Elemente entweder von
	der Auswahlbox in den Rahmen gezogen werden können oder Elemente innerhalb des
	Rahmens verschoben werden können
	*/
	

		dx = element.offsetLeft - evt.clientX;
		dy = element.offsetTop - evt.clientY;
		//dx = element.offsetLeft - evt.touches[0].clientX;
		//dy = element.offsetTop - evt.touches[0].clientY;
		el = element;
		//el.style.cursor = "move"; //Damit wird die Form des Mauszeigers verändert
		element.parentNode.appendChild(element);
		
	
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
	
	//el.style.left = evt.touches[0].clientX + dx + "px";
	//el.style.top = evt.touches[0].clientY + dy + "px";
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
	console.log(this.type);
	for(var i=0; i<this.ziele.length; i++){
	if(evt.clientX > this.ziele[i].div.offsetLeft && evt.clientY > this.ziele[i].div.offsetTop && 
		evt.clientX < (this.ziele[i].div.offsetLeft + this.ziele[i].div.offsetWidth) && evt.clientY < (this.ziele[i].div.offsetTop + this.ziele[i].div.offsetHeight) ){
		 if(this.type == this.ziele[i].type) alert("Hurra");
		 else alert("Nope");
		}
	}
	
	el.style.cursor = "";
	el = null;
	}
}
//Diese Funktion kopiert das Bild welches im Auswahlrahmen ausgewählt wird
//Die Kopie wird auf die selbe Position wie daas Orginal gesetzt
//So entsteht der Schein das man einfach ein Element wegziehen kann
/*function copyImg(orginal){
	kopie = document.createElement("img");
	kopie.style.left = orginal.style.left; 
	kopie.style.top = orginal.style.top;
	kopie.setAttribute("src",orginal.getAttribute("src"));
	kopie.setAttribute("dragdrop","yes");
	kopie.style.width = orginal.style.width;
	kopie.style.height = orginal.style.height;
	document.getElementById("auswahlbox").appendChild(kopie);
}*/

//Diese Funktion lädt unterschiedliche Bilder in die Auswahlbox
//x markiert dabei den Anfang und y das Ende des Bereiches der aus dem JSON-Array
//gelesen werden soll um die entsprechenden Bilder in der Auswahlbox darzustellen
/*function changeTo(x, y, index){
	var box = document.getElementById("auswahlbox");
	var abstand_horizontal = 0;
	var abstand_vertikal = 0;
	
	//zuerst werden mal alle vorhanden Bilder gelöscht
	while(box.firstChild){
		box.removeChild(box.firstChild);
	}
	var element = null;
	//Die Quellenangaben der Bilder x bis y werden aus dem JSON-Array gelesen
	for(var i = parseInt(x); i < parseInt(y); i++){
	element = document.createElement("img");
	element.setAttribute("src", "Bilder/"+bilder.bild[i]);
	element.setAttribute("dragdrop","yes");
	box.appendChild(element);
	//Anweisung um die Bilder schön in der Auswahlbox  zu verteilen 
	if(abstand_horizontal + element.offsetWidth > box.offsetWidth){
		abstand_horizontal = 0;
		if(abstand_vertikal + 2*element.offsetHeight > box.offsetHeight){
		
		abstand_vertikal = abstand_vertikal + (element.offsetHeight/2);
		}
		else{
		abstand_vertikal = abstand_vertikal + ((box.offsetHeight*2) * (1/(parseInt(y)-parseInt(x))));
		}
	}
	
	element.style.left = abstand_horizontal +"px";
	element.style.top = abstand_vertikal +"px";
	abstand_horizontal = abstand_horizontal + element.offsetWidth;
	}
	var menue = document.getElementById("menu");
	var menuepunkt = null;
	for(var y=0; y<7; y++){
	menuepunkt = menue.getElementsByTagName("a")[y];
	menuepunkt.setAttribute("class","menu-link");
	}
	menuepunkt = menue.getElementsByTagName("a")[index];
	menuepunkt.setAttribute("class","active-menu-link");
	
}*/
//Diese Funktion wird beim Laden der Seite ausgeführt
//Eigentlich nur da um mal alle Bilder geladen zu haben damit der Wechsel flüssig
//ablaufen kann 
/*function loadImages(){
	var box = document.getElementById("auswahlbox");
	var element = null;
	//Alle GUI-Elemente in die Auswahlbox hauen
	for(var i = 0; i < bilder.bild.length; i++){
	element = document.createElement("img");
	element.setAttribute("src", "Bilder/"+bilder.bild[i]);
	box.appendChild(element);
	}
	//changeTo wird aufgerufen um die Auswahlbox schon zu Beginn mit Bildern zu füllen
	changeTo('0','4','0');
}*/
