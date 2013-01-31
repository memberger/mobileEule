
// myJson kommt dann noch!
var myJson = new MyJson();
var Begriffe = myJson.getBegriffe();// Alle n?tigen Begriffe
var Kategorie   = myJson.getKategorie();//Alle n?tige aus Katrgorie.json

var my = {
categorie : null,
type : null,
imgElement : null,
pic : null,
fs : null,
init : function(categorie, type, imgelement){
this.categorie = categorie;
this.type = type;
this.imgElement = imgelement;
this.pic = new MyPicture(this.categorie, this.imgElement);
this.fs  = new MyFileSystem(this.categorie, this.type); 
},
takeFoto : function(){
	my.pic.takePicture();
},
saveFoto : function(){
	my.fs.saveFoto(this.pic);
},
loadAndShowFoto : function(index){
	my.fs.getFoto(index, this.pic);
}
}



document.addEventListener("deviceready",onDeviceReady,false);






function onDeviceReady() {


var d = document;
var kat = Kategorie.id;
var event = localStorage.myEvent;
	
d.body.style.backgroundImage = "url(assets/img/spiel/"+kat+"_hintergrund.png)";
d.getElementById("kategorieName").textContent = Begriffe.name;
d.getElementById("kategorieBild").setAttribute("src", "assets/img/spiel/"+kat+"_bild.svg");

d.getElementById("pic-loeschen").addEventListener("touchend",function(){

	my.takeFoto();

},false);


d.getElementById("pic-ok").addEventListener("touchend",function(){

	my.saveFoto();
	Kategorie.foto = true;
	myJson.saveTemp();
	window.location = "spiel_belohnung.html";

},false);





my.init(Kategorie.id,"fotos","image");
my.takeFoto();
    
}
