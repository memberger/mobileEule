MyPicture = function(categorie, imgel){

this.picture;
this.categorie = categorie;
this.picID;
this.imgElement = document.getElementById(imgel);

}

MyPicture.prototype.takePicture = function(){

	var that = this;

	var pictureSource=navigator.camera.PictureSourceType;
    var destinationType=navigator.camera.DestinationType;

	navigator.camera.getPicture(onPhotoDataSuccess, fail, { quality: 40, destinationType: destinationType.DATA_URL });

   function onPhotoDataSuccess(imageData){
	    that.picture = imageData;
	    that.drawImage();
	   
	}
	 
	function fail(evt){ 
		console.log("error");
		console.log(evt.target.error.code);
		
	}

}
MyPicture.prototype.getBase64 = function(){

	var data = "data:image/jpeg;base64,"+this.picture;
	return data;

}

MyPicture.prototype.drawImage = function(){

	this.imgElement.setAttribute('src', this.getBase64());
	this.imgElement.style.display = "block";	

}