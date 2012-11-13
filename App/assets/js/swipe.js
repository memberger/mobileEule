(function() {
    var swipey = {
        slideContainer: null,
        wrapper: null,
        slides: null,
        distanceX: 0,
        startX: 0, 
        preferredWidth: 0,
        preferredHeight: 0,
        direction: "",
        timer: null, 
        timerCounter: 0, 
        isTouchStart: false,
        maxDistance: 0,
        currentDistance: 0,


        initSwipey: function() {
           
            //HTML- elemente holen
            swipey.wrapper = document.getElementById("wrapper");
            swipey.slideContainer = document.getElementById("slideContainer");
            swipey.slides = slideContainer.getElementsByTagName("li");

            // höhe und breite auf device breite/höhe -> fullscreen
            swipey.preferredWidth = window.innerWidth;
            swipey.preferredHeight = window.innerHeight;   
           
            //breite höhe des wrapper ebenso auf device höhe breite setzen - wrapper muss overflow hidden sein
            swipey.wrapper.style.width = swipey.preferredWidth + "px";
            swipey.wrapper.style.height = swipey.preferredHeight + "px";

            
            // die breite des ul elements so breit setzen, dass alle li elemente platz haben => slideAnzahl * slideBreite
            swipey.slideContainer.style.width = swipey.slides.length * swipey.preferredWidth + "px";
            swipey.slideContainer.style.height = swipey.preferredHeight + "px";
           

            //<ul> element sichtbar machen
            swipey.slideContainer.style.display = "block";

            
            //höhe und breite bei li elementen setzen
            for(var i=0;i<swipey.slides.length;i++)
            {
                swipey.slides[i].style.width = swipey.preferredWidth + "px";
                swipey.slides[i].style.height = swipey.preferredHeight + "px";
            }

            
            swipey.maxDistance = swipey.slides.length * swipey.preferredWidth;
            
            //touch events initialisieren
            swipey.initEvents();
        },
        initEvents: function() {
            swipey.wrapper.addEventListener("touchstart", swipey.startHandler, false);
            swipey.wrapper.addEventListener("touchmove", swipey.moveHandler, false);
            swipey.wrapper.addEventListener("touchend", swipey.endHandler, false);
        },


        startHandler: function(event) {
                        
            swipey.startX = event.touches[0].pageX;
           
            swipey.timer = setInterval(function() { swipey.timerCounter++; }, 10);
            swipey.isTouchStart = true;
            event.preventDefault();
        },
       
        moveHandler: function(event) {
            if (swipey.isTouchStart) {
                swipey.distanceX = event.touches[0].pageX - swipey.startX;
                // die <li> elemente mit finger bewegen
                swipey.slideContainer.style.webkitTransform = "translate3d(" + (swipey.distanceX + swipey.currentDistance) + "px, 0,0)";
            }
        },
     
        endHandler: function(event) {
            clearInterval(swipey.timer); 

            // erkennen ob rechts oder links
            if (swipey.distanceX > 0) {
                swipey.direction = "right";
            }
            if (swipey.distanceX < 0) {
                swipey.direction = "left";
            }

            
            // falls wir uns am linken bzw. rechten rand der <ul> befinden -> da gibts nix mehr => comeBack()
            if ((swipey.direction == "right" && swipey.currentDistance == 0) || (swipey.direction == "left" && swipey.currentDistance == -(swipey.maxDistance - swipey.preferredWidth))) {
                swipey.comeBack();
            }

            // hier können wir uns dann noch überlegen ob wir das für iphone / ipad individuell machen

            // wenn 100px innerhalb einer von 0,6 sekunden zurückgelegt wurden
            else if (swipey.timerCounter < 60 && swipey.distanceX > 100) {
                swipey.moveRight();
            }
            else if (swipey.timerCounter < 60 && swipey.distanceX < -100) {
                swipey.moveLeft();
            }
            
            // wenn mehr als 1/3 der Bildschirmbreite zurückgelegt wurde
            
            else if (swipey.distanceX <= -(swipey.preferredWidth / 3)) { 
                swipey.moveLeft();
            }
            else if (swipey.distanceX >= (swipey.preferredWidth / 3)) { 
                swipey.moveRight();
            }

            // wenn nichts der fall dann wieder zurück
            else {
                swipey.comeBack();
            }

            swipey.timerCounter = 0;
            swipey.isTouchStart = false; 
            swipey.distanceX = 0; 

            // fertig der nächste touch kann kommen
       
        },
        // hier können wir uns auch wieder übrlegen ob wir zeit für ipad und iphone individuell machen
        // vielleicht geibt es noch feinere translate3d
        moveLeft: function() {
            swipey.currentDistance += -swipey.preferredWidth;
            swipey.slideContainer.style.webkitTransitionDuration = 400 + "ms";
            swipey.slideContainer.style.webkitTransform = "translate3d(" + swipey.currentDistance + "px, 0,0)";
        },
        moveRight: function() {
            swipey.currentDistance += swipey.preferredWidth;
            swipey.slideContainer.style.webkitTransitionDuration = 400 + "ms";
            swipey.slideContainer.style.webkitTransform = "translate3d(" + swipey.currentDistance + "px, 0,0)";
        },
        comeBack: function() {
            swipey.slideContainer.style.webkitTransitionDuration = 250 + "ms";
            swipey.slideContainer.style.webkitTransitionTimingFunction = "ease-out";
            swipey.slideContainer.style.webkitTransform = "translate3d(" + swipey.currentDistance + "px, 0,0)";
        }
    };// ende swipey Objekt
    window.swipeyObj = swipey;
})();

swipeyObj.initSwipey();

window.addEventListener("orientationchange",function(evt){ 
	window.scrollTo(0,1); 
	swipeyObj.initSwipey();
},false); 



