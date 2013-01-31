function Quelle(typ, text, reihenfolge, array){
var that = this;
this.type = typ;
 //var color = farbe;
 var position = reihenfolge;
this.dragdrop = true;
this.div=document.createElement("div");
this.div.style.top= "180px";
this.div.style.left= 15 + ( (132.5 + 12.5) * reihenfolge)+"px";

this.startTop = this.div.style.top;
this.startLeft = this.div.style.left;

this.div.style.width="125px";
this.div.style.height="62.5px";
this.div.style.position="absolute";
	//div.style.backgroundColor = "red";

	

this.div.addEventListener("touchstart",down.bind(this),false);
this.div.addEventListener("touchmove",move,false);
this.div.addEventListener("touchend",up.bind(this),false);
this.div.addEventListener("touchleave",move,false);

/*
this.div.addEventListener("mousedown",down.bind(this),false);
this.div.addEventListener("mousemove",move,false);
this.div.addEventListener("mouseup",up.bind(this),false);
*/
	
	this.ziele = array;
	var bild = document.createElement("img");
	bild.setAttribute("src", "assets/img/puzzle/01-02.png");
	bild.setAttribute("height", "62.5px");
	bild.setAttribute("width", "125px");
	bild.style.filter = "Alpha(opacity=90)"; /* Internet Explorer */
	bild.style.opacity = 0.9; /* Safari, Opera */
	bild.style.MozOpacity = 0.9; /* Firefox */
	/*
	bild.addEventListener("mousedown",down.bind(this),false);
	bild.addEventListener("mousemove",move,false);
	bild.addEventListener("mouseup",up.bind(this),false);
	*/
	bild.addEventListener("touchstart",down.bind(this),false);
	bild.addEventListener("touchmove",move,false);
	bild.addEventListener("touchend",up.bind(this),false);
	bild.addEventListener("touchleave",move,false);
	
	bild.myParam = "bla";
this.div.appendChild(bild);
	
	var puzzleText= document.createElement("span");
	var textNode = document.createTextNode(text);
	puzzleText.appendChild(textNode);
this.div.appendChild(puzzleText);
	puzzleText.style.position = "absolute";
	puzzleText.style.left = "36%";
	puzzleText.style.top = "50%";
	puzzleText.style.fontSize = "12pt";
	/*
	puzzleText.addEventListener("mousedown",down.bind(this),false);
	puzzleText.addEventListener("mousemove",move,false);
	puzzleText.addEventListener("mouseup",up.bind(this),false);
	*/
	puzzleText.addEventListener("touchstart",down.bind(this),false);
	puzzleText.addEventListener("touchmove",move,false);
	puzzleText.addEventListener("touchend",up.bind(this),false);
	puzzleText.addEventListener("touchleave",move,false);
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
this.div.style.top= "35px";
this.div.style.left= 15 + ( (132.5 + 12.5) * reihenfolge)+"px";
this.div.style.width="125px";
this.div.style.height="125px";
this.div.style.position="absolute";

var puzzlebild = document.createElement("img");
	puzzlebild.setAttribute("src", "assets/img/puzzle/01-01.png");
	puzzlebild.setAttribute("height", "125px");
	puzzlebild.setAttribute("width", "125px");
	

this.div.appendChild(puzzlebild);
puzzlebild.style.filter = "Alpha(opacity=90)"; /* Internet Explorer */
	puzzlebild.style.opacity = 0.9; /* Safari, Opera */
	puzzlebild.style.MozOpacity = 0.9; /* Firefox */
var bild = document.createElement("img");
	bild.setAttribute("src", urlcontent);
	bild.setAttribute("height", "80px");
	bild.setAttribute("width", "80px");
	bild.style.left = "20%";
	bild.style.top = "15%";
	bild.style.position="absolute";
this.div.appendChild(bild);

var target=document.body;
	target.appendChild(this.div);

}



