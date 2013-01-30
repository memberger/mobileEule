// myJson kommt dann noch!
var myJson = new MyJson();
var Begriffe = myJson.getBegriffe();// Alle n?tigen Begriffe
var Kategorie   = myJson.getKategorie();//Alle n?tige aus Katrgorie.json

window.addEventListener("load", function(){

var d = document;
var kat = Kategorie.id;
var event = localStorage.myEvent;
	
d.body.style.backgroundImage = "url(assets/img/spiel/"+kat+"_hintergrund.png)";
d.getElementById("kategorieName").textContent = Begriffe.name;
d.getElementById("kategorieBild").setAttribute("src", "assets/img/spiel/"+kat+"_bild.svg");



d.getElementById("btn-nochmal-spielen").addEventListener(event,function(){ window.location = "spiel_wissen.html" },false);
d.getElementById("btn-foto").addEventListener(event,function(){ window.location = "foto_anzeigen.html" },false);
d.getElementById("btn-bilder").addEventListener(event,function(){ window.location = "zeichnung_anzeigen.html" },false);




},false);