if(localStorage.img == undefined){

    localStorage.img = 0;
    console.log("img=0");

}



var fileroot;
var pictureSource;   
var destinationType;
var currentImage = null;
var categorie = 0;
var anzahlBilder = 0;

var pictureDirectory;


document.addEventListener("deviceready",onDeviceReady,false);

/*function handleError()
{
    alert("error");
    return true;
}
window.onerror = handleError;

*/


function onDeviceReady() {
    console.log("ready");
    window.requestFileSystem(LocalFileSystem.PERSISTENT,0, onFileSystemSuccess, fail);
	pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    loadPic();
    
        
}


function onFileSystemSuccess(fileSystem){
    
    console.log("in");
    fileroot = fileSystem.root.fullPath+"/pics/user/cat"+categorie;
    console.log("fileroot:"+fileroot);

    
}

function success(entries){
    
    console.log(entries.length);
    anzahlBilder = entries.length;
	
	for(var i = 0; i<entries.length; i++){
		
		console.log(entries[i].fullPath);
        console.log(entries[i]);
        
        if(entries[i].isFile == true){
            
            console.log("zeigeBild");
            readPic(entries[i].name);
            
        }
        
        
		
	}
    
   /* readPic(entries[0].name);
    console.log(entries[0].name);*/
    
    
}

function capturePhoto(){
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 100,
                                destinationType: destinationType.DATA_URL });
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64 encoded image data
    //console.log("meinBild:"+imageData);
    
    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');
    
    currentImage = imageData;
    
    // Unhide image elements
    //
    smallImage.style.display = 'block';
    
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;

    var writer = new FileWriter(fileroot+"/img-"+anzahlBilder+".txt");
    //localStorage.img += 1;
    writer.write(currentImage);
    
    writer.onwrite = function(evt){
      
        console.log("write success");
                
    };
    
    
    console.log("speichern ok");
    
    
    
    
}

function refreshDirectory(fileSystem){
	
    fileSystem.root.getDirectory(fileroot,{create: true, exclusive: false },null,fail);
    

    var directoryReader = fileSystem.root.createReader();
    directoryReader.readEntries(success , fail);	
	
	
}

function readPic(filename){
    
    console.log("einBild:"+filename);
    var imageDiv = document.createElement("img");
    imageDiv.setAttribute("class","foto");
    var body = document.body;
    
    var reader = new FileReader();
    
    reader.readAsText(fileroot+"/"+filename);
    
    reader.onloadend = function(evt){
        imageDiv.src = "data:image/jpeg;base64," + evt.target.result;
        
        body.appendChild(imageDiv);
        
    };
    
    reader.onerror = function (evt){
        
        console.log("reader error");
        console.log(evt.target.error);
        
        
        
    };
}


function loadPic(){
    
    console.log("laden");
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT,0, refreshDirectory, fail);	


}


// Called if something bad happens.
//
function onFail(message) {
    alert('Failed because: ' + message);
}

function fail(evt) {
    console.log("error");
    console.log(evt.target.error.code);
}


