var MyJson = function(){
this.allgemein;
this.begriffe;
this.kat;
this.temp;

}

MyJson.prototype.loadAll = function(){
	
	var ls = localStorage;

	this.ajax("Allgemein");
	this.ajax("Begriffe");
	if (ls.katJson == undefined){
		
		this.ajax("Kategorien");

	}else{
		this.kat = JSON.parse(ls.katJson);
	}
}


MyJson.prototype.createTemp = function(catID){

	var ls = localStorage;

	if(this.kat == undefined){
		console.log("es muss zuerst loadAll() ausgeführt werden!");
		return false;
	}
	var temp = {};
	temp["kat"] = this.kat[catID];
	temp["begriffe"] = this.begriffe[catID];

	ls.tempJson = JSON.stringify(temp);
	this.temp = temp;

}

MyJson.prototype.loadTemp = function(){

	var ls = localStorage;

	if(ls.tempJson == undefined){
		
		console.log("es muss zuerst createTemp(catID) ausgeführt werden!");
		return false;

	}

	this.temp = JSON.parse(ls.tempJson);

}

MyJson.prototype.saveTemp = function(){

	var ls = localStorage;
	
	var kat = JSON.parse(ls.katJson);

	kat[this.temp.kat.id] = this.temp.kat;
	ls.katJson = JSON.stringify(kat);
	ls.tempJson = JSON.stringify(this.temp);
	
}

MyJson.prototype.getBegriffe = function(){
 if(this.temp == undefined){
	 
	 this.loadTemp();

 }

 return this.temp.begriffe;


}

MyJson.prototype.getKategorie = function(){
 if(this.temp == undefined){
	 
	 this.loadTemp();

 }

 return this.temp.kat;


}


MyJson.prototype.reset = function(){

	var ls = localStorage;
	
	ls.removeItem("katJson");
	ls.removeItem("tempJson");
	this.loadAll();
	
		
}
	

MyJson.prototype.ajax = function(name){

	var that = this;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		
		if(xmlhttp.readyState == 4){
			
			
			var obj = JSON.parse(xmlhttp.responseText);
			
			if( name == "Allgemein" ){
				that.allgemein = obj;

			}else if( name == "Begriffe"){
				that.begriffe = obj;

			}else if( name == "Kategorien"){
				that.kat = obj;
				localStorage.katJson = JSON.stringify(obj);
			}

				

		}
		
	}

	xmlhttp.open('GET','assets/'+name+'.json',false)
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send();
	
}