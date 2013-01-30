function showHilfe(){	

	var url = window.location.pathname;
	var filename = url.substring(url.lastIndexOf('/')+1);
	
	
	localStorage["currentURL"] = filename;

	window.location = "hilfe.html"; 
}

function endHilfe(){

	window.location = localStorage.currentURL;

}