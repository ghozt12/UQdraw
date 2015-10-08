// Drawing-app 3

// CANVAS API
// *********************************************
	// Context 
	var ctx; 

	// Checkers
	var firstTime = true;
	var currentColor = 'green';

	// draggable
	var isLeft = true;

	// Colours
	var color = "#000";	
	var red = "#C02323";
	var green = "#329F24";
	var blue = "#2360C0";
	var white = "#FFFFFF";

	// Arrays
	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var sizeA = new Array();
	var colourA = new Array();

$(document).ready(function () {

	// Image loader
	var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);


	$(window).bind(
  'touchmove',
   function(e) {
    e.preventDefault();
  }
);

	// Check whether we should OPEN the tool bar 
	// usually if on desktop or big screen
	// *********************************************

	if ($(window).height() >= 690 && $(window).width() >= 960) {
		$("#tool-bar").removeClass('closed');
		$("#menu").addClass('flipper');
	}

	// Buttons 
	// *********************************************
	
	// Open up the tool bar
	$( "#menu" ).click(function() {
	  if ($("#tool-bar").hasClass('closed') || $("#tool-bar").hasClass('closed2')) {
	  	$("#tool-bar").removeClass('closed');
	  	$("#tool-bar").removeClass('closed2');
	  	$("#menu").addClass('flipper');
	  } else {
	  		$("#menu").removeClass('flipper');
	  		$("#tool-bar").addClass('closed');
	  }
	});

	// Colour
	$( "#color-blue" ).click(function() {
	  removeColourClasses(this);
	  ctx.beginPath();
	  ctx.strokeStyle = blue;
	  currentColor = 'blue';
	});

	$( "#color-red" ).click(function() {
	  removeColourClasses(this);
	  ctx.beginPath();
	  ctx.strokeStyle = red;
	  currentColor = 'red';
	});

	$( "#color-green" ).click(function() {
	  	// Box colour
	  	removeColourClasses(this);
	  	// Action
		ctx.beginPath();
		ctx.strokeStyle = green;
		currentColor = 'green';
	});

	// Size
	$( "#size-small" ).click(function() {
	  removeSizeClasses(this);
	  ctx.lineWidth = 3;
	});

	$( "#size-medium" ).click(function() {
	  removeSizeClasses(this);
	  ctx.lineWidth = 5;
	});

	$( "#size-large" ).click(function() {
	  removeSizeClasses(this);
	  ctx.lineWidth = 80;
	});

	// Tools
	$( "#tool-1" ).click(function() {
	  removeToolClasses(this);
	  ctx.strokeStyle = currentColor;
	});

	$( "#tool-2" ).click(function() {
	  removeToolClasses(this);
	  ctx.beginPath();
	  ctx.strokeStyle = white;
	});

	$( "#tool-3" ).click(function() {
	  newCanvas();
	  firstTime = true;
	  $("#tool-bar").addClass('closed');
	});	

	function removeColourClasses(selected) {
		$("#color-blue").removeClass('color-selected');
		$("#color-red").removeClass('color-selected');
		$("#color-green").removeClass('color-selected');
		$(selected).addClass('color-selected');
	}

	function removeSizeClasses(selected) {
		$("#size-small").removeClass('selected');
		$("#size-medium").removeClass('selected');
		$("#size-large").removeClass('selected');
		$(selected).addClass('selected');
	}

	function removeToolClasses(selected) {
		$("#tool-1").removeClass('selected');
		$("#tool-2").removeClass('selected');
		$("#tool-3").removeClass('selected');
		$(selected).addClass('selected');
	}


	// *********************************************



	
	// setup a new canvas for drawing wait for device init
	setTimeout(function(){
		newCanvas();
	}, 1000);
	
	/* ADD ANY ICONS on clicks IN BELOW */

	// ***** DEAFAULTS

	// ***** COLOURS 

	$("#app-green").click(function() {
		removeColourClasses(this);
		ctx.beginPath();
		ctx.strokeStyle = green;
		$(this).addClass('selected');
	});
	$("#app-red").click(function() {
		removeColourClasses(this);
		ctx.beginPath();
		ctx.strokeStyle = red;
	});
	$("#app-blue").click(function() {
		removeColourClasses(this);
		ctx.beginPath();
		ctx.strokeStyle = blue;
	});

	// ***** SIZE 
	$("#app-thin").click(function() {
		removeSizeClasses(this);
		ctx.lineWidth = 3;	

	});
	$("#app-normal").click(function() {
		removeSizeClasses(this);
		ctx.lineWidth = 5;	

	});
	$("#app-thick").click(function() {
		removeSizeClasses(this);
		ctx.lineWidth = 10;	
	});

	// ***** ERASER 
	$("#app-eraser").click(function() {
		removeColourClasses(this);
		ctx.beginPath();
		ctx.strokeStyle = white;
	});
    
	// link the new button with newCanvas() function
	$("#clear").click(function() {
		newCanvas();
	});

	$("#submit").click(function() {
		var canvas = document.getElementById("canvas");
		var data = canvas.toDataURL("image/png");
		var questionID = getParameterByName("questionID");
		if(questionID==""){// if no question ID, won't upload
			alert("no question is selected, can't send data");
		}else {
			document.getElementById("testImg").src = data;
			// Send to the server
			// Uncomment code and add a php user
			$.ajax({
				type: "POST",
				url: "../uqDrawBackend/addSubmission.php",
				data: {
					imgBase64: data,
					questionID: questionID,// hard code at the momvent
				}
			}).done(function (data) {
				alert(data);//get result from php
				console.log(data);
				console.log('saved successfully saved');
			});

		}
	});

	
});
$( window ).resize(function() {
	resize(ctx);
	redraw(ctx);
});

function resize(context) {
  context.canvas.width  = window.innerWidth;
  context.canvas.height = window.innerHeight;
}
function removeColourClasses(selected) {
	$("#app-eraser").removeClass('selected');
	$("#app-green").removeClass('selected');
	$("#app-red").removeClass('selected');
	$("#app-blue").removeClass('selected');
	$(selected).addClass('selected');
}

function removeSizeClasses(selected) {
	$("#app-thin").removeClass('selected');
	$("#app-normal").removeClass('selected');
	$("#app-thick").removeClass('selected');
	$(selected).addClass('selected');
}

// function to setup a new canvas for drawing
function newCanvas(){

	// Show text
	

	// Define and resize canvas
    $("#content").height($(window).height()-60);
    var canvas = '<canvas id="canvas" width="'+$(window).width()+'" height="'+($(window).height()-60)+'"></canvas>';
	$("#content").html(canvas);

	// Show starting text
	$( "#content" ).append( "<p id='starting-text'>Start drawing!</p>" );
    
    // setup canvas
	ctx=document.getElementById("canvas").getContext("2d");
	//ctx.strokeStyle = color;
	ctx.lineWidth = 5;
	ctx.strokeStyle = green;	
	
	// setup to trigger drawing on mouse or touch
	$("#canvas").drawTouch();
    $("#canvas").drawPointer();
	$("#canvas").drawMouse();

	// clear the stored canvas image
	clickX.length = 0;
	clickY.length = 0;
	clickDrag.length = 0;
	sizeA.length = 0;
	colourA.length = 0;
	$("#starting-text").on("mousedown", removeStartingText);
	$("#starting-text").on("press", removeStartingText);
	$("#starting-text").on("MSPointerDown", removeStartingText);

}

function removeStartingText() {
	if (firstTime) {
		$("#starting-text").remove();
		console.log(firstTime);
	}

	firstTime = false;

}
// adds to the array 
function addClick(color, thickness, x, y, dragging) {
	colourA.push(color);
	sizeA.push(thickness);
	  clickX.push(x);
	  clickY.push(y);
	  clickDrag.push(dragging);
};

// prototype to	start drawing on touch using canvas moveTo and lineTo
$.fn.drawTouch = function() {
	var start = function(e) {
		removeStartingText();
        e = e.originalEvent;
		ctx.beginPath();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		ctx.moveTo(x,y);
		addClick(ctx.strokeStyle, ctx.lineWidth, x, y);

	};
	var move = function(e) {
		e.preventDefault();
        e = e.originalEvent;
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		ctx.lineTo(x,y);
		ctx.stroke();
		addClick(ctx.strokeStyle, ctx.lineWidth, x, y, true);
	};
	$(this).on("touchstart", start);
	$(this).on("touchmove", move);	
}; 
    
// prototype to	start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
$.fn.drawPointer = function() {
	var start = function(e) {
		removeStartingText();
        e = e.originalEvent;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY-44;
		ctx.moveTo(x,y);
		addClick(ctx.strokeStyle, ctx.lineWidth, x, y);

	};
	var move = function(e) {
		e.preventDefault();
        e = e.originalEvent;
		x = e.pageX;
		y = e.pageY-44;
		ctx.lineTo(x,y);
		ctx.stroke();
		addClick(ctx.strokeStyle, ctx.lineWidth, x, y, true);

    };
	$(this).on("MSPointerDown", start);
	$(this).on("MSPointerMove", move);
};        

// prototype to	start drawing on mouse using canvas moveTo and lineTo
$.fn.drawMouse = function() {
	var clicked = 0;
	var start = function(e) {
		removeStartingText();
		clicked = 1;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY-44;
		ctx.moveTo(x,y);
		addClick(ctx.strokeStyle, ctx.lineWidth, x, y);
	};
	var move = function(e) {
		if(clicked){
			x = e.pageX;
			y = e.pageY-44;
			ctx.lineTo(x,y);
			ctx.stroke();
			addClick(ctx.strokeStyle, ctx.lineWidth, x, y, true);
		}
	};
	var stop = function(e) {
		clicked = 0;
	};
	$(this).on("mousedown", start);
	$(this).on("mousemove", move);
	$(window).on("mouseup", stop);
};

function redraw(context) {
		// Drawing the line
		for (var i = 0; i < clickX.length; i++) {
				
			context.beginPath();
			context.strokeStyle = colourA[i];
			context.lineWidth = sizeA[i];
	
			if (clickDrag[i] && i) {
				context.moveTo(clickX[i - 1], clickY[i - 1]);
			} else {
				context.moveTo(clickX[i], clickY[i]);
			}

			context.lineTo(clickX[i], clickY[i]);
			context.closePath();
			context.stroke();
		}

		context.strokeStyle = currentColor;
	};

function getParameterByName(name) { // get url parameter added by Brian
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
// *********************************************

/*
function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}
*/



// Interface 
// *********************************************


// Handle Image uploads
// *********************************************

function handleImage(e){
	var width = $(window).width();
	var height = $(window).height()
	loadImage(
    e.target.files[0],
    function (img) {
        ctx.drawImage(img, 0, 0, width, height);
    },
    {
        maxWidth: $(window).width(),
        canvas: true,
        maxHeight: $(window).height(),
        minWidth: 100,
        minHeight: 50,
        canvas: true,
        orientation: true
    }
	);
}
	/*
		alert("loading image");
    var reader = new FileReader();

    reader.onload = function(event){
        var img = new Image();

        img.onload = function() {
            var MAX_WIDTH = $(window).width();
						var MAX_HEIGHT = $(window).height();
						var width = img.width;
						var height = img.height;

						if (width > height) {
						  if (width > MAX_WIDTH) {
						    height *= MAX_WIDTH / width;
						    width = MAX_WIDTH;
						  }
						} else {
						  if (height > MAX_HEIGHT) {
						    width *= MAX_HEIGHT / height;
						    height = MAX_HEIGHT;
						  }
						}

						alert("WIDTH " + width + " HEIHGT: " + height);

						canvas.width = width;
						canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
        }
        img.src = event.target.result;

        // We need to rotate the canvas if
        // they took photo in
        // portrait
    }

    reader.onloadend = function() {
    	var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));
			switch(exif.Orientation){
			case 8:
				ctx.rotate(90*Math.PI/180);
				break;
			case 3:
				ctx.rotate(180*Math.PI/180);
				break;
			case 6:
				ctx.rotate(-90*Math.PI/180);
				break;
			}
    }   
    reader.readAsBinaryString(e.target.files[0]);  

    */

