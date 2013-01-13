// Variablen für Spiel 1
var katBegriffe;
var wort;
var buchstaben;

// JSON Objekte
var myJson = new MyJson();
var Begriffe = myJson.getBegriffe();// Alle nötigen Begriffe
var Kategorie   = myJson.getKategorie();//Alle nötige aus Katrgorie.json
//myJson.saveTemp();

// Initialisierung von JSON-Zeugs
$(document).ready(function() {
	nextWord();
});


// Funktionen für Spiel 1
function nextWord() {
	katBegriffe = Begriffe.begriffe;
	kat = Kategorie.id;

	wort = katBegriffe[Kategorie.fortschritt];
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
	$("#kategorieName").html(Begriffe.name);
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