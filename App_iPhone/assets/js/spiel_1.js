// Variablen für Spiel 1
var katBegriffe;
var wort;
var buchstaben;
var dragElement;
var richtig = 0;
var spielFortschritt = 0;
var rundenProSpiel = 5;
var zIndex = 2;

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
	
	if(Kategorie.fortschritt >= Begriffe.begriffe.length) {
		Kategorie.fortschritt = 0;
	} 

	wort = katBegriffe[Kategorie.fortschritt];
	buchstaben = wort.name.split("");
	var container = document.getElementById("buchstaben");
	
	// Alles zurücksetzen
	$("#buchstabenPlatzhalter").empty();
	$("#buchstaben").empty();
	$("#weiterButton").css("display", "none");
	richtig = 0;
	dragElement = null;
	
	
	for(var i=0; i<buchstaben.length; i++) {
		buchstaben[i] = buchstaben[i].toLowerCase();
		
		// Platzhalter einfügen
		var el = document.createElement("li");
		document.getElementById("buchstabenPlatzhalter").appendChild(el);
		$(el).addClass("platzhalter");
		el.setAttribute("wert", buchstaben[i]);
		
		// Buchstaben einfügen
		var div = document.createElement("div");
		div.setAttribute("class", "buchstabeTrenner");
		div.style.width = Math.floor(container.offsetWidth/buchstaben.length)+"px";
		
		document.getElementById("buchstaben").appendChild(div);
		
		el = document.createElement("div");
		div.appendChild(el);
		
		var left = (div.offsetWidth-60)*Math.random();
		var top = (div.offsetHeight-60)*Math.random();
		
		el.style.left = left+"px";
		el.style.top = top+"px";
		
		el.style.backgroundImage = "url(assets/img/buchstaben/"+buchstaben[i]+".svg)";
		$(el).addClass("buchstabe");
		el.setAttribute("left", left);
		el.setAttribute("top", top);
		el.setAttribute("wert", buchstaben[i]);
		
		//$(el).attr("ondragstart", "handeDragStart(this)");
		el.touchmove = handleDrag;
		el.touchend = handleDragEnd;
		el.touchstart = handleDragStart;
		
		el.setAttribute("ontouchstart", "handleDragStart(event)");
		el.setAttribute("ontouchmove", "handleDrag(event)");
		el.setAttribute("ontouchend", "handleDragEnd(event)");
		
	}

	$(".buchstabe").shuffle();
	$(".buchstabeTrenner").each(function() {
		var pos = $('.buchstabeTrenner').index(this);
		$(this).children(".buchstabe").attr("pos", pos);
	});
	
	
	document.body.style.backgroundImage = "url(assets/img/spiel/"+kat+"_hintergrund.png)"; 
	$("#kategorieName").html(Begriffe.name);
	$("#kategorieBild").attr("src", "assets/img/spiel/"+kat+"_bild.svg");
	$("#begriffBild").attr("src", "assets/img/spiel/"+wort.id+"_bild.svg");	
}

function handleDragStart(e) {
	e.preventDefault();
	if(e.touches.length == 1){ 
		dragElement = e.touches[0].target;
		zIndex++;
		dragElement.style.zIndex = zIndex;
	}
}

function handleDrag(e) {
	e.preventDefault();
	
	if(e.touches.length == 1){ // Only deal with one finger
		var touch = e.touches[0]; // Get the information for finger #1
		var node = touch.target; // Find the node the drag started from

		var offsetLeft = $(node).parent().offset().left + 40;
		var offsetTop = $(node).parent().offset().top + 40;

		node.style.left = (touch.pageX - offsetLeft) + "px";
		node.style.top = (touch.pageY - offsetTop) + "px";
	}
}

function handleDragEnd(e) {
	e.preventDefault();
	
	if(dragElement != null) {
		// Auf richtigem Ziel?
		var touch = e.changedTouches[0];
		var touchX = touch.clientX;
		var touchY = touch.clientY;
		var wert = dragElement.getAttribute("wert");
		var target = null;
		
		// What target has the letter been released on?
		var platzhalter = $(".platzhalter");
		for(var i = 0; i < platzhalter.length; i++) {
			var x1 = $(platzhalter[i]).offset().left;
			var y1 = $(platzhalter[i]).offset().top;
			var x2 = x1 + platzhalter[i].offsetWidth;
			var y2 = y1 + platzhalter[i].offsetHeight;
			
			if(touchX >= x1 && touchX <= x2 && touchY >= y1 && touchY <= y2) {
				target = platzhalter[i];
			}
		}

		// Is it a correct target?
		if(target != null && (target.getAttribute("wert") == wert)) {
			dragElement.setAttribute("ontouchmove", "");
			dragElement.setAttribute("ontouchstart", "");
			dragElement.setAttribute("ontouchend", "");
			target.setAttribute("wert","belegt");
			richtig++;
			
			// Snap Element
			var offsetLeft = $(dragElement).parent().offset().left;
			var offsetTop = $(dragElement).parent().offset().top;
			
			var newX = $(target).offset().left - offsetLeft - 6;
			var newY = $(target).offset().top - offsetTop - 2;
		
			dragElement.style.left = newX + "px";
			dragElement.style.top =  newY + "px";
		} else {
			// If not in correct target, reset to initial position
			dragElement.style.left = dragElement.getAttribute("left")+"px";
			dragElement.style.top = dragElement.getAttribute("top")+"px";
		}
	
		// Spiel vorbei?
		if(richtig >= buchstaben.length) {
			// Runde ist vorbei!
			spielFortschritt++;
			Kategorie.fortschritt++;
			
			if(spielFortschritt >= rundenProSpiel) {
				// Spiel ist vorbei
				console.log("Spiel ist vorbei!");
				spielFertig();
			} else {
				// Nächste Runde
				console.log("Fertig - Nächster Begriff!");
				$("#weiterButton").css("display", "block");
				$("#weiterButton").attr("href", "javascript: nextWord()");
			}
			
			
			
			
		}
	}

	dragElement = null;
}

function spielFertig() {
	$("#weiterButton").css("display", "block");
	$("#weiterButton").attr("href", "test.html");

	Kategorie.gewonnen++;
	
	myJson.saveTemp();
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