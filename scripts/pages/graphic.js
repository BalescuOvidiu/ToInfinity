var interval;

var maxFunctionsNumber = 7;
var functionsNumber = 0;
var idName = 0;
var idFormula = 0;

var firstIndex = 0;

var solveEquationModeEnabled = false;

var resolutionOutput = 2;
var resolutionInput = 0.5;
var maxAngleDeviation = 1.222;

var resultFunctionString = "{0}({1}) = {2}";
var equationFunctionString = "{2} = {0}({1})";

var functions;

function loadProgram() {
	setTitle("Grafice");
	loadCanvas(getWidth(), getHeight());

	importCustom();
	addFunctionOnGui();
	deactivateSolveEquation();

	interval = setInterval(loop);
}

function loop() {
	startTiming();

	update();
	render();

	finishTiming();
}

function render() {
	renderBackground();
	renderAxis(axisWidth, getLineColor());
	renderAxisText(gridPrimarySize, gridSecondarySize, getFontParagraph(), getLineColor());
	renderFunctions();
}

function renderFunctions() {
	var formula;
	var color;

	for(var index = firstIndex; index < functionsNumber; index++) {
		formula = getFormula(index);
		color = functions[index]["input-color"].value;
		if("" != formula) {
			if(isValidMathExpression(formula)) {
				renderFunction(formula, color);
				updatePoint(index, formula, color);
			}
			else {
				updateInvalidity(index, "Funcția nu poate fi calculată.");
			}
		}
		else {
			updateInvalidity(index, "Scrieți funcția pentru a afișa graficul.");
		}
	}
}

function renderFunction(formula, color) {
	var x1 = 0;
	var x2 = resolutionOutput;
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

	for(var x3 = 2; x3 <= resolutionOutput + canvas.width; x3 += resolutionOutput) {
		continous = true;

		y3 = calculateFromScreenForScreen(formula, x3);

		if(isNaN(y2)) {
			continous = false;
		}
		else if(Infinity == Math.abs(yToCartezian(y1)) || Math.abs(Infinity) == yToCartezian(y2)) {
			continous = false;
		}
		else if(maxAngleDeviation < getAngle3Points2dRadians(x1, y1, x2, y2, x3, y3)) {
			continous = false;
		}

		if(continous) {
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

function renderPoint(x, y, color) {
	context.beginPath();
	context.arc(x, y, pointRadius, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
}

function addFunction(color, name, formula) {
	if(maxFunctionsNumber > functionsNumber) {
		previousColors = [];

		for(var index = firstIndex; index < functionsNumber; index++) {
			previousColors.push(functions[index]["input-color"].value);
		}

		getFunctionsTable().innerHTML += document.getElementById("templateFunctionInput").innerHTML;
		reloadFunctions();

		setColor(functionsNumber, color);
		setName(functionsNumber, name);
		setFormula(functionsNumber, formula);

		for(var index = firstIndex; index < functionsNumber - firstIndex; index++) {
			setColor(index, previousColors[index - firstIndex]);
		}
		updateFunctionsNumber();
		updateOrder();
	}
}

function addFunctionOnGui() {
	addFunction(getNextColor(), getNextName(), getNextFormula());
}

function removeFunctionFromGui(index) {
	if(1 < functionsNumber) {
		getFunctionsTable().querySelectorAll("tr")[index].remove();
		reloadFunctions();
		updateFunctionsNumber();
		updateOrder();

		isAnInputSelected = false;
	}
	else {
		functions[firstIndex]["input-formula"].innerHTML = "";
	}
}

function removeFunctionsFromGui() {
	while(1 < functionsNumber) {
		removeFunctionFromGui(functionsNumber - 1);
	}
}

function update() {
	updateGui();
}

function updateOrder() {
	for(var index = firstIndex; index < functionsNumber; index++) {
		functions[index]["remove"].style.order = index;
		functions[index]["input-formula"].style.order = index;
	}
}

function updateGui() {
	if(canvas.width != getWidth() || canvas.height != getHeight()) {
		loadContext(getWidth(), getHeight());
	}
}

function updateFunctionsNumber() {
	functionsNumber = functions.length;
}

function updatePoint(index, formula, color) {
	if(true == solveEquationModeEnabled) {
		updateEquation(index, formula, color);
	}
	else {
		updateResult(index, formula, color);
	}
}

function updateResult(index, formula, color) {
	var x = xToScreen(xToGrid(mouseX));
	var y = calculateFromScreenForScreen(formula, x);

	if(isNaN(y)) {
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

function updateEquation(index, formula, color) {
	var x = NaN;
	var y = yToScreen(yToGrid(mouseY));

	if(false == isNaN(y)) {
		var y2 = [];
		var distance = resolutionInput;

		for(var x1 = 0; x1 <= canvas.width; x1++) {
			y2.push(calculateFromScreenForScreen(formula, x1));

			if(distance > Math.abs(y2[x1] - y)) {
				distance = Math.abs(y2[x1] - y);
				x = x1;
			}
		}

		if(false == isNaN(x)) {
			for(var x1 = 0; x1 <= canvas.width; x1++) {
				if(resolutionInput >= Math.abs(y2[x] - y2[x1])) {
					renderPoint(x1, y2[x1], color);
				}
			}
		}
	}
	
	if(true == isNaN(x) || true == isNaN(y)) {
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

function updateInvalidity(index, message) {
	functions[index]["results"].innerHTML = message;
}

function getNextName() {
	var array = [
		"f",
		"g",
		"h",
		"k",
		"j",
		"α",
		"β"
	];

	var value = array[idName];

	if(array.length <  2 + idName) {
		idName = 0;
	}
	else {
		idName++;
	}

	return value;
}

function getNextFormula() {
	var array = [
		"sin(x)",
		"asin(x)",
		"tan(x)",
		getHtmlFraction(1, 1, "x"),
		"[x]",
		"{x}",
		"x<sup>2</sup>"
	];

	var value = array[idFormula];

	if(array.length < 2 + idFormula) {
		idFormula = 0;
	}
	else {
		idFormula++;
	}

	return value;
}

function getFormula(index) {
	formula = functions[index]["input-formula"].innerHTML;
	if(formula) {
		return fromHtmlToFormula(formula);
	}
	return "";
}

function getFunctionsTable() {
	return document.querySelector("#f-table");
}

function reloadFunctions() {
	functions = [];
	temp = getFunctionsTable().children;
	for(var index = 0; index < temp.length; index++) {
		functions.push({
			"input-color": temp[index].querySelector("#input-color"),
			"input-formula": temp[index].querySelector("#input-formula"),
			"input-name": temp[index].querySelector("#input-name"),
			"results": temp[index].querySelector("#results"),
			"remove": temp[index].querySelector("#remove"),
		});
	}
}

function setColor(index, color) {
	functions[index]["input-color"].value = color;
}

function setName(index, name) {
	functions[index]["input-name"].innerHTML = name;	
}

function setFormula(index, formula) {
	functions[index]["input-formula"].innerHTML = formula;
}

function keyboardShowTrigonometric() {
	document.querySelector("#keyboard #elementary").style.display = "none";
	document.querySelector("#keyboard #trigonometry").style.display = "flex";
}

function keyboardShowElementary() {
	document.querySelector("#keyboard #elementary").style.display = "flex";
	document.querySelector("#keyboard #trigonometry").style.display = "none";
}

function insertFunction(element) {
	insertInto(element.innerHTML + "(x)");
}

function insertInto(theHtmlCode) {
	if(indexOfSelectedInput < functionsNumber) {
		functions[indexOfSelectedInput]["input-formula"].innerHTML += theHtmlCode;
	}
}

function clearInput() {
	try {
		setFormula(indexOfSelectedInput, "");
	}
	catch(e) {
		
	}
}

function backspace() {
	try {
		setFormula(indexOfSelectedInput, getFormula(indexOfSelectedInput).slice(0, -1));
	}
	catch(e) {

	}
}

function activateSolveEquation() {
	solveEquationModeEnabled = true;
	document.getElementById("solve-equation").innerHTML = equationFunctionString.format("f", "x", "y");
}

function deactivateSolveEquation() {
	solveEquationModeEnabled = false;
	document.getElementById("solve-equation").innerHTML = resultFunctionString.format("f", "x", "y");
}

function toggleSolveEquation() {
	if(true == solveEquationModeEnabled) {
		deactivateSolveEquation();
	}
	else {
		activateSolveEquation();
	}
}

function calculateFromScreenForScreen(f, x) {
	const scope = {
		x: xToCartezian(x)
	}

	return yToScreen(math.evaluate(f, scope));
}

function calculateFomCartezianForScreen(f, x) {
	const scope = {
		x: x
	}

	return yToScreen(math.evaluate(f, scope));
}

function calculateFromScreenForCartezian(f, x) {
	const scope = {
		x: xToCartezian(x)
	}

	return math.evaluate(f, scope);
}

function calculateFomCartezianForCartezian(f, x) {
	const scope = {
		x: x
	}

	return math.evaluate(f, scope);
}