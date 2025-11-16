
/** @type {number} Interval id for the main loop. */
var timeInterval;

/** @type {number} Index of the first function in the list (always 0). */
var firstIndex = 0;
/** @type {number} Index of the last function in the list. */
var lastIndex = 0;
/** @type {number} Index of the currently selected input row. */
var indexOfSelectedInput = 0;

/** @type {boolean} Whether "solve equation" mode is enabled. */
var solveEquationModeEnabled = false;

/** @type {number} Step size in pixels for graph rendering. */
var resolutionGraphicFunctions = 2;
/** @type {number} Resolution for solution points when solving equations. */
var resolutionSolutionsPoints = 0.5;
/** @type {number} Maximum angle deviation used to detect discontinuity. */
var maxAngleDeviationForContinuity = 1.222;

/**
 * List of base function names available for auto-naming.
 * @type {string[]}
 */
var names = ["f", "g", "h", "k", "j", "α", "β", "Θ", "Φ", "ω"];
/** @type {number} Index of the last used function name. */
var idLastNameGiven = 0;

/**
 * List of function row objects, each with:
 * - input-color
 * - input-formula
 * - input-name
 * - results
 * - remove
 * @type {Array<Object<string, HTMLElement>>}
 */
var functions;

/**
 * Initializes the program: title, canvas, math functions, default rows,
 * and starts the main loop.
 */
function loadProgram() {
	loadTitle("Grafice");
	loadCanvas(getWidth(), getHeight());

	importCustom();
	reloadFunctions();
	addFunctionOnGui();
	removeFunctionFromGui(firstIndex);
	deactivateSolveEquation();

	timeInterval = setInterval(loop);
}

/**
 * Main loop: update state and render view.
 */
function loop() {
	startTiming();

	update();
	render();

	finishTiming();
}

/**
 * Renders the entire scene: background, axes, and all functions.
 */
function render() {
	renderBackground();
	renderAxis(axisWidth, getLineColor());
	renderAxisText(gridPrimarySize, gridSecondarySize, getFontParagraph(), getLineColor());
	renderFunctions();
}

/**
 * Iterates over all functions, validates their formulas, and renders them.
 * Also updates the point/equation info depending on the current mode.
 */
function renderFunctions() {
	var formula;
	var color;

	for (var index = firstIndex; index < functions.length; index++) {
		formula = getFormula(index);
		color = functions[index]["input-color"].value;
		if ("" != formula) {
			if (isValidMathExpression(formula)) {
				renderFunction(formula, color);
				updatePoint(index, formula, color);
			}
			else {
				updateInvalidity(index, "Funcția nu poate fi calculată.");
			}
		}
		else {
			updateInvalidity(index, "");
		}
	}
}

/**
 * Renders a single function on the canvas by sampling points along the x-axis.
 * Breaks lines where discontinuities are detected using angle deviation.
 *
 * @param {string} formula - The math.js expression of the function.
 * @param {string} color - The color used for the line.
 */
function renderFunction(formula, color) {
	var x1 = 0;
	var x2 = resolutionGraphicFunctions;
	var y1;
	var y2;
	var y3;

	var continous;

	y1 = calculateFromScreenForScreen(formula, x1);
	y2 = calculateFromScreenForScreen(formula, x2);

	context.lineWidth = lineWidth;
	context.strokeStyle = color;

	context.beginPath();
	context.moveTo(x1, y1);

	for (var x3 = 2; x3 <= resolutionGraphicFunctions + canvas.width; x3 += resolutionGraphicFunctions) {
		continous = true;

		y3 = calculateFromScreenForScreen(formula, x3);

		if (isNaN(y2)) {
			continous = false;
		}
		else if (Infinity == Math.abs(yToCartezian(y1)) || Math.abs(Infinity) == yToCartezian(y2)) {
			continous = false;
		}
		else if (maxAngleDeviationForContinuity < getAngle3Points2dRadians(x1, y1, x2, y2, x3, y3)) {
			continous = false;
		}

		if (continous) {
			context.lineTo(x2, y2);
		}
		else {
			context.moveTo(x2, y2);
		}

		x1 = x2;
		x2 = x3;
		y1 = y2;
		y2 = y3;
	}

	context.stroke();
}

/**
 * Renders a single point on the canvas.
 *
 * @param {number} x - Screen x-coordinate.
 * @param {number} y - Screen y-coordinate.
 * @param {string} color - Fill color of the point.
 */
function renderPoint(x, y, color) {
	context.beginPath();
	context.arc(x, y, pointRadius, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
}

/**
 * Adds a new function row to the table and initializes its properties.
 *
 * @param {string} color - Initial color for the function.
 * @param {string} name - Name (label) for the function.
 * @param {string} formula - Initial formula contents (HTML).
 */
function addFunction(color, name, formula) {
	previousColors = [];

	for (var index = firstIndex; index < functions.length; index++) {
		previousColors.push(functions[index]["input-color"].value);
	}

	getFunctionsTable().innerHTML += getFunctionsTable().querySelector("tr").innerHTML;
	reloadFunctions();

	updateFunctionsNumber();
	updateOrder();
	setColor(lastIndex, color);
	setName(lastIndex, name);
	setFormula(lastIndex, formula);

	if (previousColors) {
		for (var index = firstIndex; index < lastIndex; index++) {
			setColor(index, previousColors[index - firstIndex]);
		}
	}

	selectEndOfInput(functions[indexOfSelectedInput]["input-formula"]);
}

/**
 * Adds a function row using the next available color and name,
 * with an empty formula.
 */
function addFunctionOnGui() {
	addFunction(getNextColor(), getNextName(), "");
}

/**
 * Removes a function row by index from the DOM and updates internal state.
 *
 * @param {number} index - Index of the row to remove.
 */
function removeFunction(index) {
	getFunctionsTable().querySelectorAll("tr")[index].remove();
	reloadFunctions();
	updateFunctionsNumber();
	updateOrder();

	isAnInputSelected = false;
}

/**
 * Removes a function row from the GUI in a user-friendly way:
 * if it is the last or only row, it just clears the formula instead.
 *
 * @param {number} index - Index of the function to remove or clear.
 */
function removeFunctionFromGui(index) {
	if (1 < functions.length && index != lastIndex) {
		removeFunction(index);
	}
	else {
		functions[index]["input-formula"].innerHTML = "";
	}
}

/**
 * Removes all function rows from the GUI except the first,
 * clearing the formula of the remaining one.
 */
function removeFunctionsFromGui() {
	while (1 < functions.length) {
		removeFunctionFromGui(lastIndex);
	}
}

/**
 * Updates the program's state each frame:
 * - Resizes GUI if needed
 * - Auto-adds a new function row if the last one is filled
 * - Removes the last row if it is empty and no longer needed
 */
function update() {
	updateGui();
	if (functions[lastIndex]["input-formula"].innerHTML) {
		addFunctionOnGui();
	}
	else if (indexOfSelectedInput + 1 == lastIndex) {
		if (isFormulaEmpty(indexOfSelectedInput)) {
			removeFunction(lastIndex);
			functions[indexOfSelectedInput]["input-formula"].innerHTML = "";
			getPreviousColor();
			getPreviousName();
		}
	}
}

/**
 * Updates the CSS flex order of function row elements to match their index.
 */
function updateOrder() {
	for (var index = firstIndex; index < functions.length; index++) {
		functions[index]["remove"].style.order = index;
		functions[index]["input-formula"].style.order = index;
	}
}

/**
 * Updates the index of the last function in the list.
 */
function updateFunctionsNumber() {
	lastIndex = functions.length - 1;
}

/**
 * Updates the displayed result or equation for a function depending on mode.
 *
 * @param {number} index - Function index.
 * @param {string} formula - Function formula (math.js string).
 * @param {string} color - Color used for drawing.
 */
function updatePoint(index, formula, color) {
	if (true == solveEquationModeEnabled) {
		updateEquation(index, formula, color);
	}
	else {
		updateResult(index, formula, color);
	}
}

/**
 * Updates the function's result display in "f(x) = y" mode and
 * renders the point under the current mouse x.
 *
 * @param {number} index - Function index.
 * @param {string} formula - Function formula.
 * @param {string} color - Color used for the point.
 */
function updateResult(index, formula, color) {
	var x = xToScreen(xToGrid(mouseX));
	var y = calculateFromScreenForScreen(formula, x);

	if (isNaN(y)) {
		x = "x";
		y = "y";
	}
	else {
		renderPoint(x, y, color);
		x = formatNumber(xToCartezian(x));
		y = formatNumber(yToCartezian(y));
	}

	functions[index]["results"].innerHTML = resultFunctionString.format(
		functions[index]["input-name"].innerHTML, x, y);
}

/**
 * Updates the function's result display in "solve equation" mode (y = f(x)).
 * Finds points whose y-value is close to the current mouse y and highlights them.
 *
 * @param {number} index - Function index.
 * @param {string} formula - Function formula.
 * @param {string} color - Color used for solution points.
 */
function updateEquation(index, formula, color) {
	var x = NaN;
	var y = yToScreen(yToGrid(mouseY));

	if (false == isNaN(y)) {
		var y2 = [];
		var distance = resolutionSolutionsPoints;

		for (var x1 = 0; x1 <= canvas.width; x1++) {
			y2.push(calculateFromScreenForScreen(formula, x1));

			if (distance > Math.abs(y2[x1] - y)) {
				distance = Math.abs(y2[x1] - y);
				x = x1;
			}
		}

		if (false == isNaN(x)) {
			for (var x1 = 0; x1 <= canvas.width; x1++) {
				if (resolutionSolutionsPoints >= Math.abs(y2[x] - y2[x1])) {
					renderPoint(x1, y2[x1], color);
				}
			}
		}
	}

	if (true == isNaN(x) || true == isNaN(y)) {
		x = "x";
		y = "y";
	}
	else {
		x = formatNumber(xToCartezian(x));
		y = formatNumber(yToCartezian(y));
	}

	functions[index]["results"].innerHTML = equationFunctionString.format(
		functions[index]["input-name"].innerHTML, x, y);
}

/**
 * Sets the result message for a function (e.g. validation error).
 *
 * @param {number} index - Function index.
 * @param {string} message - Message to display.
 */
function updateInvalidity(index, message) {
	functions[index]["results"].innerHTML = message;
}

/**
 * Returns the next available function name that is not already used.
 *
 * @returns {string} The next function name.
 */
function getNextName() {
	var value = names[idLastNameGiven];
	var idName = 1;

	while (isNameSelected(value)) {
		value = names[idLastNameGiven] + idName;
		idName += 1;
	}
	idLastNameGiven = getIndex(names, idLastNameGiven, 1);

	return value;
}

/**
 * Steps the name index backward and returns the previous base name.
 *
 * @returns {string} The previous function name.
 */
function getPreviousName() {
	var value = names[idLastNameGiven];
	idLastNameGiven = getIndex(names, idLastNameGiven, -1);

	return value;
}

/**
 * Retrieves the math.js formula string for a function row at an index.
 *
 * @param {number} index - Function index.
 * @returns {string} The formula string, or empty string if none.
 */
function getFormula(index) {
	if (isFormulaEmpty(index)) {
		return "";
	}
	return fromHtmlToFormula(functions[index]["input-formula"].innerHTML);
}

/**
 * Returns the functions table element.
 *
 * @returns {HTMLTableElement} The table element containing function rows.
 */
function getFunctionsTable() {
	return document.querySelector("#f-table");
}

/**
 * Checks whether a given function name is already in use.
 *
 * @param {string} name - Name to check.
 * @returns {boolean} True if the name is already used, false otherwise.
 */
function isNameSelected(name) {
	if (functions) {
		for (var index = firstIndex; index < functions.length; index++) {
			if (functions[index]["input-name"].innerHTML == name) {
				return true;
			}
		}
	}
	return false;
}

/**
 * Checks whether the formula at a given index is visually empty.
 *
 * @param {number} index - Function index.
 * @returns {boolean} True if empty, false otherwise.
 */
function isFormulaEmpty(index) {
	if (functions[index]["input-formula"].innerText.replace("\n", "")) {
		return false;
	}
	return true;
}

/**
 * Rebuilds the `functions` array from the DOM table rows.
 */
function reloadFunctions() {
	functions = [];
	var temp = getFunctionsTable().children;
	for (var index = firstIndex; index < temp.length; index++) {
		functions.push({
			"input-color": temp[index].querySelector("#input-color"),
			"input-formula": temp[index].querySelector("#input-formula"),
			"input-name": temp[index].querySelector("#input-name"),
			"results": temp[index].querySelector("#results"),
			"remove": temp[index].querySelector("#remove"),
		});
	}
}

/**
 * Sets the color value for a given function.
 *
 * @param {number} index - Function index.
 * @param {string} color - Color value (e.g. "#ff0000").
 */
function setColor(index, color) {
	functions[index]["input-color"].value = color;
}

/**
 * Sets the name label for a given function.
 *
 * @param {number} index - Function index.
 * @param {string} name - The function name.
 */
function setName(index, name) {
	functions[index]["input-name"].innerHTML = name;
}

/**
 * Sets the formula HTML content for a given function.
 *
 * @param {number} index - Function index.
 * @param {string} formula - HTML formula representation.
 */
function setFormula(index, formula) {
	functions[index]["input-formula"].innerHTML = formula;
}

/**
 * Inserts a function call like "f(x)" into the current formula
 * based on the clicked element's innerHTML.
 *
 * @param {HTMLElement} element - Element containing the function name.
 */
function insertFunction(element) {
	insertInto(element.innerHTML + "(x)");
}

/**
 * Inserts arbitrary HTML into the currently selected formula field.
 *
 * @param {string} theHtmlCode - HTML string to append.
 */
function insertInto(theHtmlCode) {
	if (indexOfSelectedInput < functions.length) {
		functions[indexOfSelectedInput]["input-formula"].innerHTML += theHtmlCode;
	}
}

/**
 * Inserts the clicked element's innerHTML into the current formula.
 *
 * @param {HTMLElement} element - Element containing HTML to insert.
 */
function insert(element) {
	insertInto(element.innerHTML);
}

/**
 * Clears the content of the currently selected input formula.
 */
function clearInput() {
	try {
		setFormula(indexOfSelectedInput, "");
	}
	catch (e) {

	}
}

/**
 * Performs a backspace on the currently selected formula, removing
 * the last character from its math string representation.
 */
function backspace() {
	try {
		setFormula(indexOfSelectedInput, getFormula(indexOfSelectedInput).slice(0, -1));
	}
	catch (e) {

	}
}

/**
 * Activates "solve equation" mode and updates the corresponding UI.
 */
function activateSolveEquation() {
	solveEquationModeEnabled = true;
	document.getElementById("solve-equation").innerHTML = equationFunctionString.format("f", "x", "y");
}

/**
 * Deactivates "solve equation" mode and restores result display mode.
 */
function deactivateSolveEquation() {
	solveEquationModeEnabled = false;
	document.getElementById("solve-equation").innerHTML = resultFunctionString.format("f", "x", "y");
}

/**
 * Toggles between regular result mode and "solve equation" mode.
 */
function toggleSolveEquation() {
	if (true == solveEquationModeEnabled) {
		deactivateSolveEquation();
	}
	else {
		activateSolveEquation();
	}
}

/**
 * Evaluates a function at a screen x-coordinate and returns
 * the corresponding screen y-coordinate.
 *
 * @param {string} f - Function formula in math.js syntax.
 * @param {number} x - Screen x-coordinate.
 * @returns {number} Screen y-coordinate, or NaN if evaluation fails.
 */
function calculateFromScreenForScreen(f, x) {
	const scope = {
		x: xToCartezian(x)
	};
	try {
		return yToScreen(math.evaluate(f, scope));
	}
	catch (e) {
		return NaN;
	}
}

/**
 * Evaluates a function at a Cartesian x-coordinate and returns
 * the corresponding screen y-coordinate.
 *
 * @param {string} f - Function formula in math.js syntax.
 * @param {number} x - Cartesian x-coordinate.
 * @returns {number} Screen y-coordinate, or NaN if evaluation fails.
 */
function calculateFomCartezianForScreen(f, x) {
	const scope = {
		x: x
	};
	try {
		return yToScreen(math.evaluate(f, scope));
	}
	catch (e) {
		return NaN;
	}
}

/**
 * Evaluates a function at a screen x-coordinate and returns
 * the corresponding Cartesian y-coordinate.
 *
 * @param {string} f - Function formula in math.js syntax.
 * @param {number} x - Screen x-coordinate.
 * @returns {number} Cartesian y-coordinate, or NaN if evaluation fails.
 */
function calculateFromScreenForCartezian(f, x) {
	const scope = {
		x: xToCartezian(x)
	};
	try {
		return math.evaluate(f, scope);
	}
	catch (e) {
		return NaN;
	}
}

/**
 * Evaluates a function at a Cartesian x-coordinate and returns
 * the corresponding Cartesian y-coordinate.
 *
 * @param {string} f - Function formula in math.js syntax.
 * @param {number} x - Cartesian x-coordinate.
 * @returns {number} Cartesian y-coordinate, or NaN if evaluation fails.
 */
function calculateFomCartezianForCartezian(f, x) {
	const scope = {
		x: x
	};
	try {
		return math.evaluate(f, scope);
	}
	catch (e) {
		return NaN;
	}
}
