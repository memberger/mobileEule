function Quelle(typ, farbe, reihenfolge, array){
var that = this;
this.type = typ;
 var color = farbe;
 var position = reihenfolge;
 
 var div=document.createElement("div");
	div.style.top= 100+"px";
	div.style.left= 100 + (100 * reihenfolge)+"px";
	div.style.width="100px";
	div.style.height="100px";
	div.style.position="absolute";
	div.style.backgroundColor = farbe;
	div.addEventListener("mousedown",down,false);
	div.addEventListener("mousemove",move,false);
	div.addEventListener("mouseup",up.bind(that),false);
	div.addEventListener("mouseout",move,false);

	this.ziele = array;

var target=document.body;
	target.appendChild(div);
/*this.vergleich = function(){
 for(var i=0; i<array.length;i++){
	if()
 }
}*/

}

function Ziel(typ, farbe, reihenfolge){
this.type = typ;
 var color = farbe;
 var position = reihenfolge;
 
this.div=document.createElement("div");
this.div.style.top= 500+"px";
this.div.style.left= 100 + (100 * reihenfolge)+"px";
this.div.style.width="100px";
this.div.style.height="100px";
this.div.style.position="absolute";
this.div.style.backgroundColor = farbe;

var target=document.body;
	target.appendChild(this.div);

}



