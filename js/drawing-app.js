/* *********************************************
	DRAWING APPLICATION
	UQDRAW
	TEAM ONE
 ********************************************* */

// VARIABLES
// *********************************************
	
	// Context 
	var ctx; 

	// Checkers
	var firstTime = true;
	
	// draggable
	var isLeft = true;

	// Colours
	var color = "#000";	
	var white = "#FFFFFF";

	// Colours (split by each component)
	var red = 'red';
	var blue = 'blue';
	var green = 'green';
	var yellow = 'yellow';

	var pumkin = '#D35400';
	var orange = 'orange';
	var purple = 'purple';
	var pink = 'pink';

	var silver = '#BDC3C7';
	var gray = '#7F8C8D';
	var black = 'black';
	var white = 'white';

	// Size
	var thin = 5;
	var medium = 8;
	var thick = 12;

	// Current color and size that the user has selected
	var currentColor = blue;
	var currentSize = medium;
	var eraserSelected = false;

	// Arrays for storing the drawing
	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var sizeA = new Array();
	var colourA = new Array();

	// Erasor
	var erasorClass = {
	  	0: 'small',
	  	1: 'medium',
	  	2: 'large'
	  }

	var questionClosed = true;



// ON READY 
// *********************************************
$(document).ready(function () {

	var questionID = getParameterByName("questionID");
	var serverUrl = "http://teamone.uqcloud.net/uqDrawBackend/fetchImageFromQid.php?questionID="+questionID;
	var imageLink = "";
	$.get( serverUrl, function( data ) {
		//imageLink = data;
		if (imageExists(data)) {
			console.log("image exists");
			imageLink = data;
			console.log(imageLink);
			document.getElementById("image-question").src = imageLink;
		}

	});


	document.getElementById("questionTitle").innerHTML = getParameterByName("questionTitle");
	
	// Prevent the user from dragging the screen
	$(window).bind (
		'touchmove',
   	function(e) {
    	e.preventDefault();
  	}
	);

	// Image loader
	var imageLoader = document.getElementById('imageLoader');
  imageLoader.addEventListener('change', handleImage, false);

  setTimeout(function(){
		newCanvas();
	}, 1000);

	// Check whether we should OPEN the tool bar 
	// usually if on desktop or big screen
	// *********************************************
	if ($(window).height() > 690 && $(window).width() > 960) {
		$("#tool-bar").removeClass('closed');
		$("#menu").addClass('flipper');
	}

	// TOOL BAR (buttons)
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

	$("#question").click(function() {
		console.log('clicked');
		if (questionClosed) {
			questionClosed = !questionClosed;
			$("#question-container").removeClass('closed');
			$("#question").addClass('close');

			$("#question").html('Close');
		} else {
			questionClosed = !questionClosed;
			$("#question-container").addClass('closed');
			$("#question").removeClass('close');

			$("#question").html('Question');
	  }

	});

	// on insert image into canvas 
	$("#insert-into-canvas").click(function() {
		var width = $(document).width();
		var height = $(document).height();
		var a, b;
		
		// Get url INSERT HERE 
		var url = $("#image-question").attr('src');
		var img = document.getElementById("image-question");

		// Check if image exists first
		if (!imageExists(url))
			return;

		if (img.naturalWidth >= width) {
			a = width;

			// Check the height
			if (img.naturalHeight >= height) {
				b = height;
				ctx.drawImage(img, 0, 0, a, a * b / a);
			} else {
				ctx.drawImage(img, 0, 0, a, a * img.naturalHeight / a);
			}
		} else {
			ctx.drawImage(img, 0, 0);
		}

		// Close the image opening
		questionClosed = !questionClosed;
		$("#question-container").addClass('closed');
		$("#question").removeClass('close');
		$("#question").html('Question');
	});

	// http://stackoverflow.com/questions/18837735/check-if-image-exists-on-server-using-javascript
	function imageExists(image_url){
	    var http = new XMLHttpRequest();

	    http.open('HEAD', image_url, false);
	    http.send();

	    return http.status != 404;
	}

	// COLOUR SELECTION
	// *******************************
	// BLOCK 1
	$( "#color-red" ).click(function() {
	  removeColourClasses(this);
	  ctx.beginPath();
	  ctx.strokeStyle = red;
	  currentColor = 'red';
	  ctx.lineWidth = currentSize;
	});

	$( "#color-blue" ).click(function() {
	  removeColourClasses(this);
	  ctx.beginPath();
	  ctx.strokeStyle = blue;
	  currentColor = 'blue';
	  ctx.lineWidth = currentSize;
	});

	$( "#color-green" ).click(function() {
	  // Box colour
	  removeColourClasses(this);
	  // Action
		ctx.beginPath();
		ctx.strokeStyle = green;
		currentColor = 'green';
		ctx.lineWidth = currentSize;
	});

	$( "#color-yellow").click(function() {
	  // Box colour
	  removeColourClasses(this);
	  // Action
		ctx.beginPath();
		ctx.strokeStyle = yellow;
		currentColor = 'yellow';
		ctx.lineWidth = currentSize;
	});


	// BLOCK 2
	$( "#color-pumkin" ).click(function() {
	  removeColourClasses(this);
	  ctx.beginPath();
	  ctx.strokeStyle = pumkin;
	  currentColor = '#D35400';
	  ctx.lineWidth = currentSize;
	});

	$( "#color-orange" ).click(function() {
	  removeColourClasses(this);
	  ctx.beginPath();
	  ctx.strokeStyle = orange;
	  currentColor = 'orange';
	  ctx.lineWidth = currentSize;
	});

	$( "#color-purple" ).click(function() {
	  // Box colour
	  removeColourClasses(this);
	  // Action
		ctx.beginPath();
		ctx.strokeStyle = purple;
		currentColor = 'purple';
		ctx.lineWidth = currentSize;
	});

	$( "#color-pink").click(function() {
	  // Box colour
	  removeColourClasses(this);
	  // Action
		ctx.beginPath();
		ctx.strokeStyle = pink;
		currentColor = 'pink';
		ctx.lineWidth = currentSize;
	});


	// BLOCK 3 
	$( "#color-silver" ).click(function() {
	  removeColourClasses(this);
	  ctx.beginPath();
	  ctx.strokeStyle = silver;
	  currentColor = '#BDC3C7';
	  ctx.lineWidth = currentSize;
	});

	$( "#color-gray" ).click(function() {
	  removeColourClasses(this);
	  ctx.beginPath();
	  ctx.strokeStyle = gray;
	  currentColor = '#7F8C8D';
	  ctx.lineWidth = currentSize;
	});

	$( "#color-black" ).click(function() {
	  // Box colour
	  removeColourClasses(this);
	  // Action
		ctx.beginPath();
		ctx.strokeStyle = black;
		currentColor = 'black';
		ctx.lineWidth = currentSize;
	});

	$( "#color-white").click(function() {
	  // Box colour
	  removeColourClasses(this);
	  // Action
		ctx.beginPath();
		ctx.strokeStyle = white;
		currentColor = 'white';
		ctx.lineWidth = currentSize;
	});


	// Size
	$( "#size-small" ).click(function() {
	  currentSize = thin;
	  ctx.lineWidth = thin;
	  removeSizeClasses(this);
	});

	$( "#size-medium" ).click(function() {
	  currentSize = medium;
	  ctx.lineWidth = medium;
	  removeSizeClasses(this);
	});

	$( "#size-large" ).click(function() {
		currentSize = thick;
	  ctx.lineWidth = thick;
	  removeSizeClasses(this);
	});

	// Tools
	$( "#tool-1" ).click(function() {
	  removeToolClasses(this);
	  ctx.strokeStyle = currentColor;
	  eraserSelected = false;
	  ctx.lineWidth = currentSize;
	});

	$( "#tool-2" ).click(function() {
	  removeToolClasses(this);
	  ctx.beginPath();
	  ctx.strokeStyle = white;
	  ctx.lineWidth = currentSize * 2;
	  
	  $("#canvas").addClass(getErasorClass());
	  eraserSelected = true;
	});

	$( "#tool-3" ).click(function() {
		eraserSelected = false;
	  newCanvas();
	  firstTime = true;
	  $("#tool-bar").addClass('closed');
	  $("#menu").removeClass('flipper');

	});	

	
	function removeColourClasses(selected) {
		eraserSelected = false;
		removeErasorClass();
		$("#tool-2").removeClass('selected');
		$("#tool-1").addClass('selected');
		
		$("#color-blue").removeClass('color-selected');
		$("#color-red").removeClass('color-selected');
		$("#color-green").removeClass('color-selected');
		$("#color-yellow").removeClass('color-selected');

		$("#color-pumkin").removeClass('color-selected');
		$("#color-orange").removeClass('color-selected');
		$("#color-purple").removeClass('color-selected');
		$("#color-pink").removeClass('color-selected');

		$("#color-silver").removeClass('color-selected');
		$("#color-gray").removeClass('color-selected');
		$("#color-black").removeClass('color-selected');
		$("#color-white").removeClass('color-selected');

		$(selected).addClass('color-selected');		
	}

	function removeSizeClasses(selected) {
		removeErasorClass();
		$("#size-small").removeClass('selected');
		$("#size-medium").removeClass('selected');
		$("#size-large").removeClass('selected');
		$(selected).addClass('selected');
		if (eraserSelected) {
			$("#canvas").addClass(getErasorClass());
			ctx.lineWidth = currentSize * 2;
		}
	}

	function removeToolClasses(selected) {
		removeErasorClass();
		$("#tool-1").removeClass('selected');
		$("#tool-2").removeClass('selected');
		$("#tool-3").removeClass('selected');
		$(selected).addClass('selected');
	}

	function getErasorClass() {
		if (currentSize == thin)
			return erasorClass[0];
		if (currentSize == thick)
			return erasorClass[2];
		if (currentSize == medium)
			return erasorClass[1];
	}

	function removeErasorClass() {
		$("#canvas").removeClass(erasorClass[0]);
		$("#canvas").removeClass(erasorClass[1]);
		$("#canvas").removeClass(erasorClass[2]);
	}
	
	// *********************************************
	// SUBMIT BUTTON
	// *********************************************

	$("#submit").click(function() {
		var canvas = document.getElementById("canvas");
		var data = canvas.toDataURL("image/png");
		console.log(data);
		var questionID = getParameterByName("questionID");
		if (questionID=="") {
			// if no question ID, won't upload
		   alert("no question is selected, can't send data");
		} else {
			// document.getElementById("testImg").src = data;
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
				window.history.back();
			});

		}
	});
});
// END OF on READY 
// ----------------------------------------------

$( window ).resize(function() {
	resize(ctx);
	redraw(ctx);
});

function resize(context) {
  context.canvas.width  = window.innerWidth;
  context.canvas.height = window.innerHeight;
}

// function to setup a new canvas for drawing
function newCanvas(){

	// Define and resize canvas
  $("#content").height($(window).height() - 60);
  var canvas = '<canvas id="canvas" width="'+$(window).width()+'" height="'+($(window).height()-60)+'"></canvas>';
	$("#content").html(canvas);

	// Show starting text
	$( "#content" ).append( "<p id='starting-text'>Start drawing!</p>" );
    
    // setup canvas
	ctx = document.getElementById("canvas").getContext("2d");
	//ctx.strokeStyle = color;
	ctx.lineWidth = currentSize;
	ctx.strokeStyle = currentColor;	
	
	// Setup to trigger drawing on mouse or touch
	$("#canvas").drawTouch();
  $("#canvas").drawPointer();
	$("#canvas").drawMouse();

	// Clear the stored canvas image
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
}

function fetchImage(){
	var questionID = getParameterByName("questionID");
	var url = "http://teamone.uqcloud.net/uqDrawBackend/fetchImageFromQid.php?questionID="+questionID;
	//var imageLink = "";
	$.get( url, function( data ) {
		//imageLink = data;
		//console.log(imageLink);
		imageURL = data;
	});
	//return imageLink;
}


;

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


// Handle Image uploads
// *********************************************
function handleImage(e) {
	// Grab the width and height of the window
	var width = $(window).width();
	var height = $(window).height();

	// Grab the file uploaded 
	var file = e.target.files[0];
	
	var exifNode = $('#exif');
	var target = e.dataTransfer || e.target,
               file = target && target.files && target.files[0];
  // orientation
  var orie;
  
  var options = {
  		canvas: true
	};

	// Error checking
	if (!file) {
		return;
	}

	// Load the image
	loadImage.parseMetaData(file, function (data) {
		// Check if the image has exif data, then orientate it
		// correctly (since iphones flip the image by default)
	  if (data.exif) {
	  	options.orientation = data.exif.get('Orientation');	      
	  } else {
	  	alert('Failed');
	  }

	  // Display the image
	  loadImage(
    	e.target.files[0],
    	function (img) {
				ctx.drawImage(img, 0, 0, width, height);
    	}, 
    	options
    );
	});
}