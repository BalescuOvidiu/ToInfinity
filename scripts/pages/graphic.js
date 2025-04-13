var timeInterval;

var firstIndex = 0;
var lastIndex = 0;
var indexOfSelectedInput = 0;

var solveEquationModeEnabled = false;

var resolutionGraphicFunctions = 2;
var resolutionSolutionsPoints = 0.5;
var maxAngleDeviationForContinuity = 1.222;

var names = ["f", "g", "h",	"k", "j", "α", "β"];
var idLastNameGiven = 0;

var functions;

function loadProgram() {
	setTitle("Grafice");
	loadCanvas(getWidth(), getHeight());

	importCustom();
	reloadFunctions();
	addFunctionOnGui();
	removeFunctionFromGui(firstIndex);
	deactivateSolveEquation();

	timeInterval = setInterval(loop);
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

	for(var index = firstIndex; index < functions.length; index++) {
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
			updateInvalidity(index, "");
		}
	}
}

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

	for(var x3 = 2; x3 <= resolutionGraphicFunctions + canvas.width; x3 += resolutionGraphicFunctions) {
		continous = true;

		y3 = calculateFromScreenForScreen(formula, x3);

		if(isNaN(y2)) {
			continous = false;
		}
		else if(Infinity == Math.abs(yToCartezian(y1)) || Math.abs(Infinity) == yToCartezian(y2)) {
			continous = false;
		}
		else if(maxAngleDeviationForContinuity < getAngle3Points2dRadians(x1, y1, x2, y2, x3, y3)) {
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
	previousColors = [];

	for(var index = firstIndex; index < functions.length; index++) {
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
		for(var index = firstIndex; index < lastIndex; index++) {
			setColor(index, previousColors[index - firstIndex]);
		}
	}
}

function addFunctionOnGui() {
	addFunction(getNextColor(), getNextName(), "");
}

function removeFunction(index) {
	getFunctionsTable().querySelectorAll("tr")[index].remove();
	reloadFunctions();
	updateFunctionsNumber();
	updateOrder();

	isAnInputSelected = false;
}

function removeFunctionFromGui(index) {
	if(1 < functions.length && index != lastIndex) {
		removeFunction(index);
	}
	else {
		functions[index]["input-formula"].innerHTML = "";
	}
}

function removeFunctionsFromGui() {
	while(1 < functions.length) {
		removeFunctionFromGui(lastIndex);
	}
}

function update() {
	updateGui();
	if(functions[lastIndex]["input-formula"].innerHTML) {
		addFunctionOnGui();
	}
	else if(indexOfSelectedInput + 1 == lastIndex) {
		if(isFormulaEmpty(indexOfSelectedInput)) {
			removeFunction(lastIndex);
			functions[indexOfSelectedInput]["input-formula"].innerHTML = "";
			getPreviousColor();
			getPreviousName();
		}
	}
}

function updateOrder() {
	for(var index = firstIndex; index < functions.length; index++) {
		functions[index]["remove"].style.order = index;
		functions[index]["input-formula"].style.order = index;
	}
}

function updateFunctionsNumber() {
	lastIndex = functions.length - 1;
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
		var distance = resolutionSolutionsPoints;

		for(var x1 = 0; x1 <= canvas.width; x1++) {
			y2.push(calculateFromScreenForScreen(formula, x1));

			if(distance > Math.abs(y2[x1] - y)) {
				distance = Math.abs(y2[x1] - y);
				x = x1;
			}
		}

		if(false == isNaN(x)) {
			for(var x1 = 0; x1 <= canvas.width; x1++) {
				if(resolutionSolutionsPoints >= Math.abs(y2[x] - y2[x1])) {
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
	var value = names[idLastNameGiven];
	var idName = 1;

	while(isNameSelected(value)){
		value = names[idLastNameGiven] + idName;
		idName += 1;
	}
	idLastNameGiven = getIndex(names, idLastNameGiven, 1);

	return value;
}

function getPreviousName() {
	var value = names[idLastNameGiven];
	idLastNameGiven = getIndex(names, idLastNameGiven, -1);

	return value;
}

function getFormula(index) {
	if(isFormulaEmpty(index)) {
		return "";
	}
	return fromHtmlToFormula(functions[index]["input-formula"].innerHTML);;
}

function getFunctionsTable() {
	return document.querySelector("#f-table");
}

function isNameSelected(name) {
	if(functions) {
		for(var index = firstIndex; index < functions.length; index++) {
			if(functions[index]["input-name"].innerHTML == name) {
				return true;
			}
		}		
	}
	return false;
}

function isFormulaEmpty(index) {
	if(functions[index]["input-formula"].innerText.replace("\n", "")) {
		return false;
	}
	return true;
}

function reloadFunctions() {
	functions = [];
	var temp = getFunctionsTable().children;
	for(var index = firstIndex; index < temp.length; index++) {
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

function insertFunction(element) {
	insertInto(element.innerHTML + "(x)");
}

function insertInto(theHtmlCode) {
	if(indexOfSelectedInput < functions.length) {
		functions[indexOfSelectedInput]["input-formula"].innerHTML += theHtmlCode;
	}
}

function insert(element) {
    insertInto(element.innerHTML);
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
	try {
		return yToScreen(math.evaluate(f, scope));
	}
	catch(e) {
		return NaN;
	}
}

function calculateFomCartezianForScreen(f, x) {
	const scope = {
		x: x
	}
	try {
		return yToScreen(math.evaluate(f, scope));
	}
	catch(e) {
		return NaN;
	}	
}

function calculateFromScreenForCartezian(f, x) {
	const scope = {
		x: xToCartezian(x)
	}
	try {
		return math.evaluate(f, scope);
	}
	catch(e) {
		return NaN;
	}
}

function calculateFomCartezianForCartezian(f, x) {
	const scope = {
		x: x
	}
	try {
		return math.evaluate(f, scope);
	}
	catch(e) {
		return NaN;
	}
}