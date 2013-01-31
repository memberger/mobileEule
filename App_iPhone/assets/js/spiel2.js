// Variablen Spiel 2
var katBegriff;
var spielFortschritt = 0;
var rundenProSpiel = 5;
var bildID;
// JSON Zeugs
var myJson = new MyJson();
var Begriffe = myJson.getBegriffe();// Alle nötigen Begriffe
var Kategorie   = myJson.getKategorie();//Alle nötige aus Katrgorie.json
//myJson.saveTemp();

$(document).ready(function() {
	katBegriff = Begriffe.begriffe;
	for(var i in katBegriff){
		katBegriff[i].verfuegbar = "true";
		katBegriff[i].choosen = "false";
	}
	nextWord();
});


function nextWord(){
	$("#antworten").empty();
	
	kat = Kategorie.id;
	$(document.body).css("background-image","url(assets/img/spiel/"+kat+"_hintergrund.png)");
	shuffle(katBegriff);
	
	
	$("#kategorieName").text(Begriffe.name);
    $("#kategorieBild").attr("src","assets/img/spiel/"+Kategorie.id+"_bild.svg");
    

    // Array wo nur verfuegbare Elemente hineinkommen
    
    var verfuegbar = [];
    
    $.map(katBegriff, function(el, index){
		if(el.verfuegbar == "true"){
			verfuegbar.push(el);
		} // end if
	}); // end $.map function 
	
    //von den verfuegbaren Elementen eine ZufallsID nehmen
    var randomBild = Math.floor(Math.random()*verfuegbar.length);
    var bildID = verfuegbar[randomBild].id;
    //randomBild();
    // und schließlich anzeigen 
    $("#begriffBild").attr({"src":"assets/img/spiel/"+bildID+"_bild.svg", "class":bildID});  
    
    
    // die 3 Begriffe dazu
    
    var helper = [];
    for (var i in katBegriff){
	    if(katBegriff[i].id == bildID){
		    katBegriff[i].choosen = "true";
		    console.log("bild ID: "+bildID);
		    console.log(katBegriff[i].id);
		    helper.push(katBegriff[i]);
	    } else {
	    	helper.push(katBegriff[i]);
	    }   
    }
    helper.sort(sortArray);
    helper.splice(3,2);
    shuffle(helper);
    //katBegriff.splice(3,2);
    
    for(var i in helper){
	    var html = "<li><a href='#' id='"+helper[i].id+"'class='singleAnswer'>"+helper[i].name+"</a></li>";
	    $("#antworten").append(html);
    }    


    $(".singleAnswer").bind('click',checkAnswer);
}


function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function checkAnswer(evt){
	evt.preventDefault();
	var answer = $("#begriffBild").attr('class');
	var clicked = $(this).attr('id')
	// das richtige Bild angeklicked
	if(clicked == answer){
			console.log("richtig");
			spielFortschritt++;
			console.log("spielFortschritt: "+spielFortschritt);
			// alle Runden gespielt
			if(spielFortschritt >= rundenProSpiel){
				
				Kategorie.gewonnen++;
				console.log("Spiel gewonnen");
				spielFertig();
			} else {
				// noch offene Spielrunden
				$.map(katBegriff, function(el, index){
					if(el.id == answer){
						el.verfuegbar = "false";
						console.log(el);
						el.choosen = "false";
						//verfuegbar.splice(index,1);
					}
				}); // end $.map function			
				$(".singleAnswer").unbind();		
				nextWord();
			}
		
		} else {
			// nicht das richtige Bild angeklickt			
			console.log("falsch");
		}
}



function sortArray(a, b){
  var aName = a.choosen.toLowerCase();
  var bName = b.choosen.toLowerCase(); 
  return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
}

function spielFertig() {
	$("#spiel-fertig").css("display", "block");
	$("#spiel-fertig").attr("href", "spiel_belohnung.html");

	Kategorie.gewonnen++;
	
	myJson.saveTemp();
}
/*
**Event Listener by Michael Emberger
function initEvents(){

	var d = document;
	var myEvent = localStorage.myEvent;
	
	d.getElementById("zurueck-karte").addEventListener(myEvent,function(){ window.location = 'spiel_karte.html'});
	d.getElementById("spiel-fertig").addEventListener(myEvent,spielFertig);
	
}

var spielFertig = function(){

 window.location = 'spiel_belohnung.html';


}

initEvents();

var myJson = new MyJson();

var items = myJson.getBegriffe();// Alle nötigen Begriffe
var kat   = myJson.getKategorie();//Alle nötige aus Katrgorie.json

kat.gewonnen = 350; //  gewonnen verändern


myJson.saveTemp();// save Temp muss aufgerufen werden damit alle änderungen in kat gespeichert werden! es reicht
// wenn sie kurz bevor die seite verlassen wird aufgerufen wird -> einmal aufrufen wenn spiel beendet!

//da aktuell alles JSONstrings im Lokal Storage gespeichert werden und daher bei einem neuen Seitenaufruf nicht zurück gesetzt werden
//hat myJson noch die Methode reset(); Diese resetet alle betroffenen items im localStorage und lädt die original JSON files erneut!
//Diese function sollten wenn nötig nur in der Konsole aufgerufen werden, da sie sonst ws probleme machen kann ( ist eher zum entwickeln gedacht )
//myJson.reset()

for(var i = 0, len = items.begriffe.length; i < len; i++){
	
	var ptag = document.createElement("p");
	ptag.textContent = items.begriffe[i].name;
	document.body.appendChild(ptag);	
	}	



*/
