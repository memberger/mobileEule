function Quelle(typ, text, reihenfolge, urlpuzzle, array){
var that = this;
this.type = typ;
 //var color = farbe;
 var position = reihenfolge;
this.dragdrop = true;
this.div=document.createElement("div");
this.div.style.top= 400+"px";
this.div.style.left= 100 + (160 * reihenfolge)+"px";
this.div.style.width="150px";
this.div.style.height="100px";
this.div.style.position="absolute";
	//div.style.backgroundColor = "red";

	

	//div.addEventListener("touchstart",down,false);
	//div.addEventListener("touchmove",move,false);
	//div.addEventListener("touchend",up.bind(this),false);
this.div.addEventListener("mousedown",down.bind(this),false);
this.div.addEventListener("mousemove",move,false);
this.div.addEventListener("mouseup",up.bind(this),false);
	//div.addEventListener("touchleave",move,false);
	
	this.ziele = array;
	var bild = document.createElement("img");
	bild.setAttribute("src", urlpuzzle);
	bild.setAttribute("height", "100px");
	bild.setAttribute("width", "150px");
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
	puzzleText.style.left = "50px";
	puzzleText.style.top = "50px";
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

function Ziel(typ, urlcontent, urlpuzzle, reihenfolge){
this.type = typ;
 //var color = farbe;
 var position = reihenfolge;
 
this.div=document.createElement("div");
this.div.style.top= 100+"px";
this.div.style.left= 100 + (160 * reihenfolge)+"px";
this.div.style.width="150px";
this.div.style.height="200px";
this.div.style.position="absolute";

var puzzlebild = document.createElement("img");
	puzzlebild.setAttribute("src", urlpuzzle);
	puzzlebild.setAttribute("height", "200px");
	puzzlebild.setAttribute("width", "150px");
this.div.appendChild(puzzlebild);

var bild = document.createElement("img");
	bild.setAttribute("src", urlcontent);
	bild.setAttribute("height", "100px");
	bild.setAttribute("width", "100px");
	bild.style.left = "25px";
	bild.style.top = "25px";
	bild.style.position="absolute";
this.div.appendChild(bild);

var target=document.body;
	target.appendChild(this.div);

}



