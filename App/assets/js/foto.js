
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

document.getElementById("btn-bild-aufnehmen").addEventListener("touchend",my.takeFoto,false);

//document.getElementById("btn-load-bilder").addEventListener("touchend",loadBilder,false);



function onDeviceReady() {


my.init(0,"fotos","image");
    
}
