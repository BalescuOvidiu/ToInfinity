/** @type {HTMLCanvasElement} */
var canvas;
/** @type {CanvasRenderingContext2D} */
var context;

/** @type {number} Canvas horizontal offset (panning). */
var offsetX;
/** @type {number} Canvas vertical offset (panning). */
var offsetY;

/** @type {number} Current mouse X position on screen. */
var mouseX = 0;
/** @type {number} Current mouse Y position on screen. */
var mouseY = 0;

/** @type {number} Mouse X position at the start of dragging. */
var dragStartX = 0;
/** @type {number} Mouse Y position at the start of dragging. */
var dragStartY = 0;
/** @type {boolean} Whether the mouse is currently pressed on the canvas. */
var mouseDown = false;

/** @type {number} Initial unit size (logical units to pixels). */
var unitSizeInitial;
/** @type {number} Current unit size (logical units to pixels). */
var unitSizeCurrent;
/** @type {number} Last factor used in zooming (1,2,4,5). */
var unitLastFactor;

/** @type {number} Keyboard panning speed (pixels per step). */
var canvasMoveSpeed = 20;
/** @type {number} Button-based panning speed (pixels per step). */
var canvasMoveSpeedFromButton = 20;

/** @type {number} Minimum time between canvas key presses (ms). */
var timeCanvasKeyPressed = 8;
/** @type {number} Timestamp of last canvas key press. */
var lastCanvasKeyPressed = 0;

/** @type {boolean} Whether fraction display mode is enabled. */
var fractionModeEnabled = false;

/** @type {boolean} Whether an input field is currently selected/focused. */
var isAnInputSelected = false;

/** @type {number} Size (in pixels) between primary grid lines. */
var gridPrimarySize = 100;
/** @type {number} Size (in pixels) between secondary grid lines. */
var gridSecondarySize = 10;

/** @type {number} Line width for axes. */
var axisWidth = 0.5;
/** @type {number} Line width for grid lines. */
var gridWidth = 0.5;
/** @type {number} Line width for graph lines. */
var lineWidth = 2;
/** @type {number} Radius for drawn points. */
var pointRadius = 4;

/** @type {number} Maximum allowed unit size for zooming. */
var maxUnit = 200000000;
/** @type {number} Minimum allowed unit size for zooming. */
var minUnit = 2.0000000000000003e-14;

/**
 * Initializes the canvas, context, and related state.
 * Also resets zoom, offsets, and sets decimal mode.
 *
 * @param {number} width - Canvas width in pixels.
 * @param {number} height - Canvas height in pixels.
 */
function loadCanvas(width, height) {
	startTiming();
	canvas = document.querySelector("canvas");

	toDecimalMode();

	reset();
	loadContext(width, height);
	lastCanvasKeyPressed = 0;
	finishTiming();
}

/**
 * Sets the canvas size and retrieves the 2D drawing context.
 *
 * @param {number} width - Canvas width in pixels.
 * @param {number} height - Canvas height in pixels.
 */
function loadContext(width, height) {
	canvas.width = width;
	canvas.height = height;
	context = canvas.getContext("2d");
}

/**
 * Updates GUI-related canvas state, resizing the canvas
 * if the window size changed.
 */
function updateGui() {
	if (canvas.width != getWidth() || canvas.height != getHeight()) {
		loadContext(getWidth(), getHeight());
	}
}

/**
 * Moves the canvas viewport to the left by a given distance.
 *
 * @param {number} distance - Distance in pixels.
 */
function moveLeft(distance) {
	offsetX += distance;
}

/**
 * Moves the canvas viewport diagonally: left and up.
 *
 * @param {number} distance - Distance in pixels.
 */
function moveLeftUp(distance) {
	moveLeft(distance);
	moveUp(distance);
}

/**
 * Moves the canvas viewport diagonally: left and down.
 *
 * @param {number} distance - Distance in pixels.
 */
function moveLeftDown(distance) {
	moveLeft(distance);
	moveDown(distance);
}

/**
 * Moves the canvas viewport to the right by a given distance.
 *
 * @param {number} distance - Distance in pixels.
 */
function moveRight(distance) {
	offsetX -= distance;
}

/**
 * Moves the canvas viewport diagonally: right and up.
 *
 * @param {number} distance - Distance in pixels.
 */
function moveRightUp(distance) {
	moveRight(distance);
	moveUp(distance);
}

/**
 * Moves the canvas viewport diagonally: right and down.
 *
 * @param {number} distance - Distance in pixels.
 */
function moveRightDown(distance) {
	moveRight(distance);
	moveDown(distance);
}

/**
 * Moves the canvas viewport upward by a given distance.
 *
 * @param {number} distance - Distance in pixels.
 */
function moveUp(distance) {
	offsetY += distance;
}

/**
 * Moves the canvas viewport downward by a given distance.
 *
 * @param {number} distance - Distance in pixels.
 */
function moveDown(distance) {
	offsetY -= distance;
}

/**
 * Zooms out by updating the unit size based on the last zoom factor,
 * respecting the minimum unit size.
 */
function zoomOut() {
	var previous = unitLastFactor;

	if (minUnit < unitSizeCurrent) {
		switch (unitLastFactor) {
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

		if (5 == unitLastFactor) {
			unitSizeCurrent = unitSizeCurrent / 2;
		}
		else {
			unitSizeCurrent = unitSizeCurrent * unitLastFactor / previous;
		}
	}
}

/**
 * Zooms in by updating the unit size based on the last zoom factor,
 * respecting the maximum unit size.
 */
function zoomIn() {
	var previous = unitLastFactor;

	if (maxUnit > unitSizeCurrent) {
		switch (unitLastFactor) {
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

		if (1 == unitLastFactor) {
			unitSizeCurrent = unitSizeCurrent * 2;
		}
		else {
			unitSizeCurrent = unitSizeCurrent * unitLastFactor / previous;
		}
	}
}

/**
 * Resets the canvas panning offsets to the origin.
 */
function resetOffset() {
	offsetX = 0;
	offsetY = 0;
}

/**
 * Resets zoom-related variables to their defaults.
 */
function resetZoom() {
	unitLastFactor = 1;
	unitSizeInitial = 1;
	unitSizeCurrent = 10;
}

/**
 * Resets both panning offsets and zoom.
 */
function reset() {
	resetOffset();
	resetZoom();
}

/**
 * Clears the entire canvas.
 */
function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Renders the full background: secondary and primary grid lines.
 */
function renderBackground() {
	clear();
	renderGrids(gridWidth, gridSecondarySize, getGridSecondaryColor());
	renderGrids(gridWidth, gridPrimarySize, getGridPrimaryColor());
}

/**
 * Renders the X and Y axes centered at the current origin.
 *
 * @param {number} width - Line width for the axes.
 * @param {string} color - Stroke color.
 */
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

/**
 * Renders numeric labels for the axes at each grid unit.
 *
 * @param {number} size - Distance between labels in pixels.
 * @param {number} secondarySize - Font size and offset for labels.
 * @param {string} font - Font family used for labels.
 * @param {string} color - Text color.
 */
function renderAxisText(size, secondarySize, font, color) {
	context.font = secondarySize + "px " + font;
	context.fillStyle = color;
	context.textAlign = "left";

	for (var x = getOriginX(); x < canvas.width; x += size) {
		context.fillText(formatAxis(xToCartezian(x)), x + secondarySize, getOriginY() + secondarySize);
	}
	for (var x = getOriginX() - size; x >= 0; x -= size) {
		context.fillText(formatAxis(xToCartezian(x)), x + secondarySize, getOriginY() + secondarySize);
	}

	for (var y = getOriginY() + size; y < canvas.height; y += size) {
		context.fillText(formatAxis(yToCartezian(y)), getOriginX() + secondarySize, y + secondarySize);
	}
	for (var y = getOriginY() - size; y >= 0; y -= size) {
		context.fillText(formatAxis(yToCartezian(y)), getOriginX() + secondarySize, y + secondarySize);
	}
}

/**
 * Renders grid lines across the canvas based on a given spacing.
 *
 * @param {number} width - Line width for grid lines.
 * @param {number} size - Spacing between grid lines in pixels.
 * @param {string} color - Stroke color for grid lines.
 */
function renderGrids(width, size, color) {
	context.beginPath();
	context.lineWidth = width;
	context.strokeStyle = color;

	for (var x = getOriginX() + size; x < canvas.width; x += size) {
		context.moveTo(x, 0);
		context.lineTo(x, canvas.height);
	}
	for (var x = getOriginX() - size; x >= 0; x -= size) {
		context.moveTo(x, 0);
		context.lineTo(x, canvas.height);
	}

	for (var y = getOriginY() + size; y < canvas.height; y += size) {
		context.moveTo(0, y);
		context.lineTo(0, y);
		context.lineTo(canvas.width, y);
	}
	for (var y = getOriginY() - size; y >= 0; y -= size) {
		context.moveTo(0, y);
		context.lineTo(canvas.width, y);
	}

	context.stroke();
}

/**
 * Wheel event handler that zooms in or out based on scroll direction.
 *
 * @param {WheelEvent} event - The wheel event.
 */
function zoom(event) {
	if (0 < event.deltaY) {
		zoomOut();
	}
	else {
		zoomIn();
	}
}

/**
 * Updates the global mouse position and, if dragging, pans the canvas.
 *
 * @param {MouseEvent} event - The mouse move event.
 */
function updateMousePosition(event) {
	mouseX = event.clientX;
	mouseY = event.clientY;

	if (true == mouseDown) {
		offsetX += mouseX - dragStartX;
		offsetY += mouseY - dragStartY;

		dragStartX = mouseX;
		dragStartY = mouseY;
	}
}

/**
 * Starts a drag operation using the current mouse coordinates.
 *
 * @param {MouseEvent} event - The mouse down event.
 */
function dragStart(event) {
	dragStartX = mouseX;
	dragStartY = mouseY;

	mouseDown = true;
}

/**
 * Continues a drag operation, updating the canvas offsets.
 * (Note: contains a small bug where dragStartY is not updated correctly.)
 *
 * @param {MouseEvent} event - The mouse move event while dragging.
 */
function dragOnCanvas(event) {
	offsetX += mouseX - dragStartX;
	offsetY += mouseY - dragStartY;

	dragStartX = mouseX;
	dragStartX = mouseY;
}

/**
 * Ends a drag operation.
 *
 * @param {MouseEvent} event - The mouse up event.
 */
function dragStop(event) {
	mouseDown = false;
}

/**
 * Handles keyboard input for panning and zooming the canvas.
 * Ignored if an input element is selected.
 *
 * @param {KeyboardEvent} event - The keydown event.
 */
function checkKeyDown(event) {
	if (false == isAnInputSelected) {
		if (timePast(timeCanvasKeyPressed, lastCanvasKeyPressed)) {
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

/**
 * Gets the X coordinate of the origin in screen space.
 *
 * @returns {number} Screen X coordinate of the origin.
 */
function getOriginX() {
	return canvas.width / 2 + offsetX;
}

/**
 * Gets the Y coordinate of the origin in screen space.
 *
 * @returns {number} Screen Y coordinate of the origin.
 */
function getOriginY() {
	return canvas.height / 2 + offsetY;
}

/**
 * Gets the current pixel size of a single logical unit.
 *
 * @returns {number} Pixels per unit.
 */
function getCurrentUnit() {
	return unitSizeCurrent * gridSecondarySize;
}

/**
 * Gets the ratio between initial and current unit sizes.
 *
 * @returns {number} Zoom ratio.
 */
function getRatio() {
	return unitSizeInitial / unitSizeCurrent;
}

/**
 * Converts an x-coordinate from Cartesian space to screen space.
 *
 * @param {number} x - Cartesian x-coordinate.
 * @returns {number} Screen x-coordinate.
 */
function xToScreen(x) {
	return x * getCurrentUnit() + getOriginX();
}

/**
 * Converts an x-coordinate from screen space to Cartesian space.
 *
 * @param {number} x - Screen x-coordinate.
 * @returns {number} Cartesian x-coordinate.
 */
function xToCartezian(x) {
	return (x - getOriginX()) / getCurrentUnit();
}

/**
 * Snaps a screen x-coordinate to the nearest grid value in Cartesian space.
 *
 * @param {number} x - Screen x-coordinate.
 * @returns {number} Snapped Cartesian x-coordinate.
 */
function xToGrid(x) {
	return (Math.floor(xToCartezian(x) / getRatio()) * getRatio());
}

/**
 * Converts a y-coordinate from Cartesian space to screen space.
 *
 * @param {number} y - Cartesian y-coordinate.
 * @returns {number} Screen y-coordinate.
 */
function yToScreen(y) {
	return getOriginY() - y * getCurrentUnit();
}

/**
 * Converts a y-coordinate from screen space to Cartesian space.
 * (First definition – later overridden.)
 *
 * @param {number} y - Screen y-coordinate.
 * @returns {number} Cartesian y-coordinate.
 */
function yToCartezian(y) {
	return (y - getOriginY()) / getCurrentUnit();
}

/**
 * Snaps a screen y-coordinate to the nearest grid value in Cartesian space.
 *
 * @param {number} y - Screen y-coordinate.
 * @returns {number} Snapped Cartesian y-coordinate.
 */
function yToGrid(y) {
	return (Math.floor(yToCartezian(y) / getRatio()) * getRatio());
}

/**
 * Converts a y-coordinate from screen space to Cartesian space.
 * This overrides the previous yToCartezian implementation.
 *
 * @param {number} y - Screen y-coordinate.
 * @returns {number} Cartesian y-coordinate.
 */
function yToCartezian(y) {
	return (getOriginY() - y) / getCurrentUnit();
}
