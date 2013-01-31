window.addEventListener("load",function(){

if(localStorage.tempJson != undefined){

	console.log("ls da");
	var obj = JSON.parse(localStorage.tempJson);
	var kat = obj.kat.id;
	console.log(kat);
	document.body.style.backgroundImage = "url(assets/img/spiel/"+kat+"_hintergrund.png)";

}else{

	document.body.style.backgroundImage = "url(assets/img/spiel/0100_hintergrund.png)";
}

},false);




function showHilfe(){	

	var url = window.location.pathname;
	var filename = url.substring(url.lastIndexOf('/')+1);
	
	
	localStorage["currentURL"] = filename;

	window.location = "hilfe.html"; 
}

function endHilfe(){

	window.location = localStorage.currentURL;

}