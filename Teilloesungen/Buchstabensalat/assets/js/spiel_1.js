// JSON Objekte sind global
var Allgemein = null;
var Begriffe = null;
var Kategorien = null;
// Sonstige globale Variablen
var JSONLoaded = false; // Wenn das true ist, sind alle drei JSON-Objekte befüllt
// Variablen für Spiel 1
var kat = "0100"; // Aktuelle Kategorie
var katBegriffe;
var wort;
var buchstaben;

// Alle JSON-Objekte mit aktuellen Daten befüllen
function getJSONData() {
	$.getJSON("assets/Allgemein.json",function(json){
		Allgemein = json;
		JSONReady();
	});
$.getJSON("assets/Begriffe.json",function(json){
		Begriffe = json;
		JSONReady();
	});
$.getJSON("assets/Kategorien.json",function(json){
		Kategorien = json;
		JSONReady();
	});
}

// Wird ausgeführt wenn das JSON fertig geladen hat
// Init-Sachen die mit JSON zutun haben gehören hier hinein
function JSONReady() {
	if(Allgemein != null && Begriffe != null && Kategorien != null) {
		JSONLoaded = true;
		
		// Initialisierung von JSON-Zeugs
		nextWord();
	
		
	}
}

// JSON Daten das erste mal holen
getJSONData();


// Funktionen für Spiel 1
function nextWord() {
	katBegriffe = Begriffe[kat].begriffe;

	wort = katBegriffe[Kategorien[kat].fortschritt];
	buchstaben = wort.name.split("");
	var container = document.getElementById("buchstaben");
	
	for(var i=0; i<buchstaben.length; i++) {
		buchstaben[i] = buchstaben[i].toLowerCase();
		
		// Platzhalter einfügen
		var el = document.createElement("li");
		document.getElementById("buchstabenPlatzhalter").appendChild(el);
		$(el).addClass("platzhalter");
		
		// Buchstaben einfügen
		var div = document.createElement("div");
		div.setAttribute("class", "buchstabeTrenner");
		div.style.width = Math.floor(container.offsetWidth/buchstaben.length)+"px";
		
		document.getElementById("buchstaben").appendChild(div);
		
		el = document.createElement("div");
		div.appendChild(el);
		
		el.style.left = (div.offsetWidth-60)*Math.random()+"px";
		el.style.top = (div.offsetHeight-60)*Math.random()+"px";
		
		el.style.backgroundImage = "url(assets/img/buchstaben/"+buchstaben[i]+".png)";
		$(el).addClass("buchstabe");

		//$(el).attr("ondragstart", "handeDragStart(this)");
		el.touchmove = handleDragStart;
	}

	$(".buchstabe").shuffle();
	
	document.body.style.backgroundImage = "url(assets/img/spiel/"+kat+"_hintergrund.png)"; 
	$("#kategorieName").html(Begriffe[kat].name);
	$("#kategorieBild").attr("src", "assets/img/spiel/"+kat+"_bild.png");
	$("#begriffBild").attr("src", "assets/img/spiel/"+wort.id+"_bild.png");	
}

function handleDragStart(e) {
	//e.preventDefault();
	
	if(e.touches.length == 1){ // Only deal with one finger
		var touch = e.touches[0]; // Get the information for finger #1
		var node = touch.target; // Find the node the drag started from
		node.style.position = "absolute";
		node.style.left = touch.pageX + "px";
		node.style.top = touch.pageY + "px";
	}
}

(function($){
 
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
 
})(jQuery);