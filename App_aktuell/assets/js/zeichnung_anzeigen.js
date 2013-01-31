// myJson kommt dann noch!
var myJson = new MyJson();
var Begriffe = myJson.getBegriffe();// Alle nötigen Begriffe
var Kategorie   = myJson.getKategorie();//Alle nötige aus Katrgorie.json


document.addEventListener("deviceready",onDeviceReady,false);

var showPics = {
categorie : null,
type : null,
imgElement : null,
pic : null,
fs : null,
currentFoto:0,
init : function(categorie, type, imgelement){
this.categorie = categorie;
this.type = type;
this.imgElement = imgelement;
this.pic = new MyPicture(this.categorie, this.imgElement);
this.fs  = new MyFileSystem(this.categorie, this.type); 
},
loadAndShowFoto : function(index){
	showPics.fs.getFoto(index, this.pic);
},
nextPic : function(){

	

	if(showPics.currentFoto < showPics.fs.dirData.length-1){
		console.log("next");
		showPics.currentFoto++;
		showPics.loadAndShowFoto(showPics.currentFoto);
		showPics.updateView();
		
	}	

},
prevPic : function(){

	if(showPics.currentFoto > 0){
		console.log("prev");
		showPics.currentFoto--;
		showPics.loadAndShowFoto(showPics.currentFoto);
		showPics.updateView();	
	}		


},
removePic : function(){

	showPics.fs.removeFoto(showPics.currentFoto);
	showPics.refreshFileSystem();

},
updateView : function(){

 var d = document;
 var btnNext = d.getElementById("next-pic");
 var btnPrev = d.getElementById("prev-pic");
 var btnDelete = d.getElementById("remove-pic");
 var img = d.getElementById("image");

 img.style.display = "block";
 btnNext.style.display = "block";
 btnPrev.style.display = "block";
 btnDelete.style.display = "block";

 if(showPics.fs.dirData.length == 0){

	
	 img.style.display = "none";
	 btnNext.style.display = "none";
	 btnPrev.style.display = "none";
	 btnDelete.style.display = "none";
	 
 }

 if(showPics.currentFoto == 0){
	 
	btnPrev.style.display = "none";

 }

  if(showPics.currentFoto + 1 == showPics.fs.dirData.length){
	 
	btnNext.style.display = "none";

 }
 


 
},
refreshFileSystem : function(){

showPics.fs.dirData == undefined;
showPics.fs.readTargetDir();

var loading = window.setInterval(function(){fsReady()}, 10);

function fsReady(){

	if(showPics.fs.dirData == undefined){
		
		console.log("loading");

	}else{
		
		console.log("ready");
		showPics.currentFoto = 0;
		showPics.updateView();
		
		window.clearInterval(loading);
		
		if(showPics.fs.dirData.length > 0){
			showPics.loadAndShowFoto(0);
		}
		
		
		

	}


}






}


}




function onDeviceReady() {


var d = document;
var kat = Kategorie.id;
var event = localStorage.myEvent;
	
d.body.style.backgroundImage = "url(assets/img/spiel/"+kat+"_hintergrund.png)";
d.getElementById("kategorieName").textContent = Begriffe.name;
d.getElementById("kategorieBild").setAttribute("src", "assets/img/spiel/"+kat+"_bild.svg");

d.getElementById("next-pic").addEventListener(event, showPics.nextPic, false);
d.getElementById("prev-pic").addEventListener(event, showPics.prevPic, false);
d.getElementById("remove-pic").addEventListener(event, showPics.removePic, false);
d.getElementById("fertig").addEventListener(event, function(){ window.location = "spiel_nochmal.html"}, false);



showPics.init(Kategorie.id,"zeichnungen","image");
showPics.refreshFileSystem();


}




