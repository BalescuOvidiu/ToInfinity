var canvas;
var context;

var offsetX;
var offsetY;

var mouseX = 0;
var mouseY = 0;

var dragStartX = 0;
var dragStartY = 0;
var mouseDown = false;

var unitSizeInitial;
var unitSizeCurrent;
var unitLastFactor;

var canvasMoveSpeed = 20;
var canvasMoveSpeedFromButton = 20;

var timeCanvasKeyPressed = 16;
var lastCanvasKeyPressed = 0;

var beginTime = 0;
var timeFpsShow = 1000;
var lastFpsShow = 0;

var fractionModeEnabled = false;

var isAnInputSelected = false;
var indexOfSelectedInput = 1;

function loadCanvas(width, height) {
	canvas = document.getElementById("canvas");

	toDecimalsMode();

	reset();
	loadContext(width, height);

	lastCanvasKeyPressed = 0;
}

function loadContext(width, height) {
	canvas.width = width;
	canvas.height = height;
	context = canvas.getContext("2d");
}

function startTiming() {
	beginTime = performance.now();
}

function finishTiming() {
	if(timePast(timeFpsShow, lastFpsShow)) {
		var updateTime = performance.now() - beginTime;

		document.getElementById("ms").innerHTML = Math.floor(updateTime) + " ms";
		document.getElementById("fps").innerHTML = Math.floor(1000 / updateTime) + " fps";
		lastFpsShow = performance.now();
	}
}

function moveLeft(distance) {
	offsetX += distance;
}

function moveLeftUp(distance) {
	moveLeft(distance);
	moveUp(distance);
}

function moveLeftDown(distance) {
	moveLeft(distance);
	moveDown(distance);
}

function moveRight(distance) {
	offsetX -= distance;
}

function moveRightUp(distance) {
	moveRight(distance);
	moveUp(distance);
}

function moveRightDown(distance) {
	moveRight(distance);
	moveDown(distance);
}

function moveUp(distance) {
	offsetY += distance;
}

function moveDown(distance) {
	offsetY -= distance;
}

function zoomOut() {
	var previous = unitLastFactor;

	if(getMinUnit() < unitSizeCurrent) {
		switch(unitLastFactor) {
			case 1:
				unitLastFactor = 5;
				break;
			case 2:
				unitLastFactor = 1;
				break;
			case 4:
				unitLastFactor = 2;
				break;
			case 5:
				unitLastFactor = 4;
				break;
			default:
				break;
		}

		if(5 == unitLastFactor) {
			unitSizeCurrent = unitSizeCurrent / 2;
		}
		else {
			unitSizeCurrent = unitSizeCurrent * unitLastFactor / previous;
		}
	}
}

function zoomIn() {
	var previous = unitLastFactor;

	if(getMaxUnit() > unitSizeCurrent) {
		switch(unitLastFactor) {
			case 1:
				unitLastFactor = 2;
				break;
			case 2:
				unitLastFactor = 4;
				break;
			case 4:
				unitLastFactor = 5;
				break;
			case 5:
				unitLastFactor = 1;
				break;
			default:
				break;
		}

		if(1 == unitLastFactor) {
			unitSizeCurrent = unitSizeCurrent * 2;
		}
		else {
			unitSizeCurrent = unitSizeCurrent * unitLastFactor / previous;
		}
	}
}

function resetOffset() {
	offsetX = 0;
	offsetY = 0;
}

function resetZoom() {
	unitLastFactor = 1;
	unitSizeInitial = 1;
	unitSizeCurrent = 10;
}

function reset() {
	resetOffset();
	resetZoom();
}

function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function renderBackground() {
	clear();
    renderGrids(getGridWidth(), getGridSecondarySize(), getGridSecondaryColor());
    renderGrids(getGridWidth(), getGridPrimarySize(), getGridPrimaryColor());
}

function renderAxis(width, color) {
	context.beginPath();
    context.lineWidth = width;
	context.strokeStyle = color;

	context.moveTo(getOriginX(), 0);
	context.lineTo(getOriginX(), canvas.height);
	context.moveTo(0, getOriginY());
	context.lineTo(canvas.width, getOriginY());
    context.stroke();
}

function renderAxisText(size, secondarySize, font, color) {
	context.font = secondarySize + "px " + font;
	context.fillStyle = color;
	context.textAlign = "left";

	for(var x = getOriginX(); x < canvas.width; x += size) {
		context.fillText(formatAxis(xToCartezian(x)), x + secondarySize, getOriginY() + secondarySize);
	}
	for(var x = getOriginX() - size; x >= 0; x -= size) {
		context.fillText(formatAxis(xToCartezian(x)), x + secondarySize, getOriginY() + secondarySize);
	}
	
	for(var y = getOriginY() + size; y < canvas.height; y += size) {
		context.fillText(formatAxis(yToCartezian(y)), getOriginX() + secondarySize, y + secondarySize);
	}
	for(var y = getOriginY() - size; y >= 0; y -= size) {
		context.fillText(formatAxis(yToCartezian(y)), getOriginX() + secondarySize, y + secondarySize);
	}
}

function renderGrids(width, size, color) {
	context.beginPath();
    context.lineWidth = width;
	context.strokeStyle = color;

	for(var x = getOriginX() + size; x < canvas.width; x += size) {
		context.moveTo(x, 0);
		context.lineTo(x, canvas.height);
	}
	for(var x = getOriginX() - size; x >= 0; x -= size) {
		context.moveTo(x, 0);
		context.lineTo(x, canvas.height);
	}

	for(var y = getOriginY() + size; y < canvas.height; y += size) {
		context.moveTo(0, y);
		context.lineTo(canvas.width, y);
	}
	for(var y = getOriginY() - size; y >= 0; y -= size) {
		context.moveTo(0, y);
		context.lineTo(canvas.width, y);
	}

    context.stroke();
}

function zoom(event) {
	if(0 < event.deltaY) {
		zoomOut();
	}
	else {
		zoomIn();
	}
}

function inputSelected(event, index) {
	isAnInputSelected = true;
	indexOfSelectedInput = index;
}

function inputSelected(event) {
	isAnInputSelected = true;
}

function inputDeselected(event) {
	isAnInputSelected = false;
}

function updateMousePosition(event) {
	mouseX = event.clientX;
	mouseY = event.clientY;

	if(true == mouseDown) {
		offsetX += mouseX - dragStartX;
		offsetY += mouseY - dragStartY;

		dragStartX = mouseX;
		dragStartY = mouseY;	
	}
}

function dragStart(event) {
	dragStartX = mouseX;
	dragStartY = mouseY;

	mouseDown = true;
}

function dragOnCanvas(event) {
	offsetX += mouseX - dragStartX;
	offsetY += mouseY - dragStartY;

	dragStartX = mouseX;
	dragStartX = mouseY;
}

function dragStop(event) {
	mouseDown = false;
}

function checkKeyDown(event) {
	if(false == isAnInputSelected) {
		if(timePast(timeCanvasKeyPressed,lastCanvasKeyPressed)) {
			switch (event.key) {
				case "A":
					moveLeft(canvasMoveSpeed);
					break;
				case "D":
					moveRight(canvasMoveSpeed);
					break;
				case "W":
					moveUp(canvasMoveSpeed);
					break;
				case "S":
					moveDown(canvasMoveSpeed);
					break;
				case "a":
					moveLeft(canvasMoveSpeed);
					break;
				case "d":
					moveRight(canvasMoveSpeed);
					break;
				case "w":
					moveUp(canvasMoveSpeed);
					break;
				case "s":
					moveDown(canvasMoveSpeed);
					break;
				case "ArrowLeft":
					moveLeft(canvasMoveSpeed);
					break;
				case "ArrowRight":
					moveRight(canvasMoveSpeed);
					break;
				case "ArrowUp":
					moveUp(canvasMoveSpeed);
					break;
				case "ArrowDown":
					moveDown(canvasMoveSpeed);
					break;
				case "+":
					increaseZoom(canvasZoomSpeed);
					break;
				case "-":
					decreaseZoom(canvasZoomSpeed);
					break;
				default:
					break;
			}
			lastCanvasKeyPressed = performance.now();
		}
	}
}

function getOriginX() {
	return canvas.width / 2 + offsetX;
}

function getOriginY() {
	return canvas.height / 2 + offsetY;
}

function getGridPrimarySize() {
	return 100;
}

function getGridSecondarySize() {
	return 10;
}

function getCurrentUnit() {
	return unitSizeCurrent * getGridSecondarySize();
}

function getMaxUnit() {
	return 200000000;
}

function getMinUnit() {
	return 2.0000000000000003e-14;
}

function getRatio() {
	return unitSizeInitial / unitSizeCurrent;
}

function xToScreen(x) {
	return x * getCurrentUnit() + getOriginX();
}

function xToCartezian(x) {
	return (x - getOriginX()) / getCurrentUnit();
}

function xToGrid(x) {
	return (Math.floor(xToCartezian(x) / getRatio()) * getRatio());
}

function yToScreen(y) {
	return getOriginY() - y * getCurrentUnit();
}

function yToCartezian(y) {
	return (y - getOriginY()) / getCurrentUnit();
}

function yToGrid(y) {
	return (Math.floor(yToCartezian(y) / getRatio()) * getRatio());
}

function yToCartezian(y) {
	return (getOriginY() - y) / getCurrentUnit();
}

function showFps() {
	document.getElementById("fps").style.display = "inline";
	document.getElementById("ms").style.display = "none";
}

function showMs() {
	document.getElementById("fps").style.display = "none";
	document.getElementById("ms").style.display = "inline";
}

function toggleFractionMode() {
	if(fractionModeEnabled) {
		toDecimalsMode();
	}
	else {
		toFractionMode();
	}
}

function toFractionMode() {
	fractionModeEnabled = true;
	document.getElementById("fraction-mode").innerHTML = "0.5"; 

}

function toDecimalsMode() {
	fractionModeEnabled = false;
	document.getElementById("fraction-mode").innerHTML = getHtmlFraction(1, 1, 2);
}

function hideGui() {
	try {
		document.getElementById("keyboard").style.display = "none";
	}
	catch(e) {
		
	}
	try {
		document.getElementById("move").style.display = "none";
	}
	catch(e) {
		
	}
	try {
		document.getElementById("settings").style.display = "none";
	}
	catch(e) {
		
	}
	try {
		document.getElementById("show").style.display = "flex";
	}
	catch(e) {
		
	}
}

function showGui() {
	try {
		document.getElementById("keyboard").style.display = "flex";
	}
	catch(e) {
		
	}
	try {
		document.getElementById("move").style.display = "flex";
	}
	catch(e) {
		
	}
	try {
		document.getElementById("settings").style.display = "flex";
	}
	catch(e) {
		
	}
	try {
		document.getElementById("show").style.display = "none";
	}
	catch(e) {
		
	}
}