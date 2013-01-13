MyFileSystem = function(categorie, type){
this.categorie = categorie;// 0- ....
this.type = type;//fotos oder zeichnungen
//this.nextItemID;
this.directory;
this.dirData;


this.readTargetDir();

}



MyFileSystem.prototype.readTargetDir = function(){

	var that = this;
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFsSuccess, that.fail);

	function onFsSuccess(fileSystem){

		fileSystem.root.getDirectory(that.type+""+that.categorie,{create:true, exclusive: false},getDirSuccess,that.fail);
	}

	function getDirSuccess(dir){
		that.directory = dir;
		var dirReader = dir.createReader();
		dirReader.readEntries(onEntriesSuccess, that.fail);
	}

	function onEntriesSuccess(entries){
			that.dirData = entries;
			//that.nextItemID = entries.length+1;
	}

			
}


MyFileSystem.prototype.saveFoto = function(myPicture){
	
	var that = this;
	var ts = new Date().getTime();
	this.directory.getFile("bild"+ts+".txt",{create: true, exclusive: false}, gotFileEntry, that.fail);	
		
	function gotFileEntry(fileEntry){
		console.log("FILE ENTRY");
		fileEntry.createWriter(gotFileWriter, that.fail);
		
	}

	function gotFileWriter(writer){
		writer.write(myPicture.picture);
		writer.onwrite = function(){
			that.readTargetDir();

			console.log("schreiben erfolgreich");

		}

		writer.onerror = that.fail;
		
	}
		

}	
		




MyFileSystem.prototype.saveZeichnung = function(myZeichnung){




}

MyFileSystem.prototype.getFoto = function(index, myPicture){

	var that = this;
	var entry = that.dirData[index];

	
	function win(file){
		
		var reader = new FileReader();
		
		reader.onloadend = function(evt){
			
			console.log("read success");
			myPicture.picture = evt.target.result;
			myPicture.drawImage();
			

		}
		reader.readAsText(file);

	}

	entry.file(win, that.fail);
	

}

MyFileSystem.prototype.removeFoto = function(index){

	var that = this;
	that.dirData[index].remove(success, that.fail);

	function success(){
		
		console.log(that.dirData[index].name+" wurde gelöscht");
		that.readTargetDir();
	}

}



MyFileSystem.prototype.fail = function(evt){
	
	console.log("error");
	console.log(evt.target.error.code);

}



MyFileReader = function(categorie){
this.pictureFiles = [];
this.categorie = categorie;

}

MyFileReader.prototype.loadPictures = function(){
	var that = this;
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFsSuccess, fail);
	
	function onFsSuccess(fileSystem){

		fileSystem.root.getDirectory("fotos"+this.categorie,{create:true, exclusive: false},getDirSuccess,fail);

		function getDirSuccess(dir){
			var dirReader = dir.createReader();
			dirReader.readEntries(onEntriesSuccess, fail);

				function onEntriesSuccess(entries){
					that.pictureFiles = entries;
				}
		}
			console.log("FS SUCCESS");

		}
		

	

	function fail(evt){ 
		console.log("error");
		console.log(evt.target.error.code);
		
	}	
	
	
	



}