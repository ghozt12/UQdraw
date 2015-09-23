// Drawing-app 3

// CANVAS API
// *********************************************
	// Context 
	var ctx; 

	// Checkers
	var firstTime = true;
	var currentColor = 'green';

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
	
	// Buttons 
	// *********************************************
	
	// Open up the tool bar
	$( "#tools" ).click(function() {
	  if ($("#tool-bar").hasClass('closed'))
	  	$("#tool-bar").removeClass('closed');
	  else 
	  	$("#tool-bar").addClass('closed');
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
	  ctx.lineWidth = 10;
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

var myElement = document.getElementById('tool-bar');
	// Touch gestures
	var mc = new Hammer(myElement);
	mc.on('panup pandown', function(ev) {
	    $("#tool-bar").addClass('closed');
	});

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
	$( "#content" ).append( "<p id='starting-text'>Touch here to start drawing</p>" );
    
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
	};

function getParameterByName(name) { // get url parameter added by Brian
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
// *********************************************




// Interface 
// *********************************************

// *********************************************
