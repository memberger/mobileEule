var myJson = new MyJson();
var Begriffe = myJson.getBegriffe();// Alle nštigen Begriffe
var Kategorie   = myJson.getKategorie();//Alle nštige aus Katrgorie.json

window.addEventListener("load",function(){

	var d = document;
	var kat = Kategorie.id;
	var event = localStorage.myEvent;
	
	d.body.style.backgroundImage = "url(assets/img/spiel/"+kat+"_hintergrund.png)";
	d.getElementById("kategorieName").textContent = Begriffe.name;
	d.getElementById("kategorieBild").setAttribute("src", "assets/img/spiel/"+kat+"_bild.svg");

	d.getElementById("img-bild-aufnehmen").addEventListener(event,function(){ window.location = "spiel_foto.html" }, false);
	d.getElementById("img-bild-malen").addEventListener(event,function(){ window.location = "spiel_zeichnung.html" }, false);
	



},false);


