function Quelle(typ, text, reihenfolge, array){
var that = this;
this.type = typ;
 //var color = farbe;
 var position = reihenfolge;
this.dragdrop = true;
this.div=document.createElement("div");
this.div.style.top= 60+"%";
this.div.style.left= 5 + (25 * reihenfolge)+"%";

this.startTop = this.div.style.top;
this.startLeft = this.div.style.left;

this.div.style.width="20%";
this.div.style.height="15%";
this.div.style.position="absolute";
	//div.style.backgroundColor = "red";

	

this.div.addEventListener("touchstart",down,false);
this.div.addEventListener("touchmove",move,false);
this.div.addEventListener("touchend",up.bind(this),false);
//this.div.addEventListener("mousedown",down.bind(this),false);
//this.div.addEventListener("mousemove",move,false);
//this.div.addEventListener("mouseup",up.bind(this),false);
this.div.addEventListener("touchleave",move,false);
	
	this.ziele = array;
	var bild = document.createElement("img");
	bild.setAttribute("src", "assets/img/puzzle/01-02.png");
	bild.setAttribute("height", "100%");
	bild.setAttribute("width", "100%");
	bild.addEventListener("mousedown",down.bind(this),false);
	bild.addEventListener("mousemove",move,false);
	bild.addEventListener("mouseup",up.bind(this),false);
	bild.myParam = "bla";
this.div.appendChild(bild);
	
	var puzzleText= document.createElement("span");
	var textNode = document.createTextNode(text);
	puzzleText.appendChild(textNode);
this.div.appendChild(puzzleText);
	puzzleText.style.position = "absolute";
	puzzleText.style.left = "39%";
	puzzleText.style.top = "50%";
	puzzleText.style.fontSize = "1.5em";
	puzzleText.addEventListener("mousedown",down.bind(this),false);
	puzzleText.addEventListener("mousemove",move,false);
	puzzleText.addEventListener("mouseup",up.bind(this),false);
	puzzleText.myParam = "bla";
	var target=document.body;
		target.appendChild(this.div);
	
/*this.vergleich = function(){
 for(var i=0; i<array.length;i++){
	if()
 }
}*/

}

function Ziel(typ, urlcontent, reihenfolge){
this.type = typ;
 //var color = farbe;
 var position = reihenfolge;
 
this.div=document.createElement("div");
this.div.style.top= 10+"%";
this.div.style.left= 5 + (25 * reihenfolge)+"%";
this.div.style.width="20%";
this.div.style.height="30%";
this.div.style.position="absolute";

var puzzlebild = document.createElement("img");
	puzzlebild.setAttribute("src", "assets/img/puzzle/01-01.png");
	puzzlebild.setAttribute("height", "100%");
	puzzlebild.setAttribute("width", "100%");
this.div.appendChild(puzzlebild);

var bild = document.createElement("img");
	bild.setAttribute("src", urlcontent);
	bild.setAttribute("height", "60%");
	bild.setAttribute("width", "60%");
	bild.style.left = "20%";
	bild.style.top = "15%";
	bild.style.position="absolute";
this.div.appendChild(bild);

var target=document.body;
	target.appendChild(this.div);

}



