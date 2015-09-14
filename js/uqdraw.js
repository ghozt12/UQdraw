// Inspired by William Malone (www.williammalone.com)
// Created by Team One, DECO3801
// Drawing Application 


var UQdraw = (function() {

	// Changeables

	// Variables
	var context,
		currently_painting,
		canvasHeight = window.innerHeight-100, // to account for the bars
		canvasWidth = window.innerWidth,
		canvas, 
		upTo = 0,
		divi = 1;

	// These store our drawings
	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();

	// Initilise
	init = function init() {
		
		// Canvas
		canvas = document.createElement('canvas');
		canvas.setAttribute('width', canvasWidth);
		canvas.setAttribute('height', canvasHeight);
		canvas.setAttribute('id', 'canvas');
		canvas = document.getElementById('canvasDiv').appendChild(canvas);

		// Get the Html canvas element
		context = canvas.getContext("2d"); 
		// Setup
		setupListenerEvents();
	},

	zoom = function zoom() {

		context.scale(2, 2);
		div = 2;
		// Redraw everything

	},

	// Clears the canvas
	clear_canvas = function() {
 		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	},

	addClick = function(x, y, dragging) {
	  clickX.push(x);
	  clickY.push(y);
	  clickDrag.push(dragging);
	},

	setupListenerEvents = function() {

		// When the user press down
		press = function(e) {
			clickX.length = 0;
			clickY.length = 0;
			clickDrag.length = 0;

			e.preventDefault();
			// Mouse position
			var mouseX = e.pageX - this.offsetLeft;
			var mouseY = e.pageY - this.offsetTop;
				
			currently_painting = true;
			addClick(mouseX, mouseY);
			redraw();
		},

		touchPress = function(e) {

			e.preventDefault();
			// Mouse position
			var mouseX = e.changedTouches[0].pageX - this.offsetLeft;
			var mouseY = e.changedTouches[0].pageY - this.offsetTop;
				
			currently_painting = true;
			addClick(mouseX, mouseY);
			redraw();
		},

		// When the user drags
		drag = function(e) {
			e.preventDefault();
			// Make sure that they have touched first
			if (currently_painting) {
				addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
				redraw();
			}
		},

		touchDrag = function(e) {
			e.preventDefault();
			// Make sure that they have touched first
			if (currently_painting) {
				if (clickX.length > 21) {
					clickX[0] = clickX[19];
					clickY[0] = clickY[19];
					clickDrag[0] = clickDrag[19];

					clickX.length = 1;
					clickY.length = 1;
					clickDrag.length = 1;
				}
				addClick(e.changedTouches[0].pageX - this.offsetLeft, e.changedTouches[0].pageY - this.offsetTop, true);
				redraw();
			}
		},

		// When the user releases
		release = function (e) {
			currently_painting = false;
			redraw();
		},

		// If they cancel 
		cancel = function (e) {
			currently_painting = false;
		};

	    canvas.addEventListener("touchstart", touchPress);
	    canvas.addEventListener("touchmove", touchDrag);
	    canvas.addEventListener("touchend", release);
	    canvas.addEventListener("touchcancel", cancel); 

	    // Mouse resources 
		canvas.addEventListener("mousedown", press);
		canvas.addEventListener("mousemove", drag);
		canvas.addEventListener("mouseup", release);
		canvas.addEventListener("mouseout", cancel);
	},

	draw = function () {

	},

	// Redraw Function
	// Note that this redraws the entire canvas each time it
	// is called.
	redraw = function () {
		// Clears the canvas
		// clear_canvas;

		// Colours and line size
		context.strokeStyle = "#df4b26";
		context.lineJoin = "round";
		context.lineWidth = 5;
		
		// Drawing the line
		for (var i = 0; i < clickX.length; i++) {
			/* 	To understand this method you need to know how 
				to draw a line using static points.

				context.beginPath(); 
				context.moveTo(0,75);
				context.lineTo(250,75);
				context.stroke();
				(This draws a line from 0 to 250(x))

				So firstly you begin the path
				The starting point is set with moveTo
				The end point is set with lineTo
				Stroke is then used to draw it

				So instead of static coords, we get our
				coords from the arrays we stored them in. 
			*/
			
			// The beginPath() method begins a path		
			context.beginPath();

			// This is here to show the start of a line
			// true && any integer = integer
			// false && integer = false
			// So if clickDrag is true, means its the start
			// of a line.
			if (clickDrag[i] && i) {
				context.moveTo(clickX[i - 1]/divi, clickY[i - 1]/divi);
			} else {
				context.moveTo(clickX[i]/divi, clickY[i]/divi);
			}

			// Draws a line to the x,y co-ord
			context.lineTo(clickX[i]/divi, clickY[i]/divi);
			// Clost the path
			context.closePath();
			// This draws the stroke on the canvas 
			context.stroke();
		}
	};

	return {
		init: init,
		zoom: zoom
	};
}());




