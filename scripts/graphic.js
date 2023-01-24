var interval;

var maxFunctionsNumber = 7;
var functionsNumber = 0;
var idName = 0;
var idFormula = 0;

var solveEquationModeEnabled = false;

var resolutionOutput = 2;
var resolutionInput = 0.5;
var maxAngleDeviation = 1.222;

function loadProgram() {
	setTitle("Grafice");
	
	importCustom();
	loadCanvas(getWidth(), getHeight());
	addFunctionOnGui();
	deactivateSolveEquation();

	interval = setInterval(loop, 1);
}

function loop() {
	startTiming();

	update();
	render();

	finishTiming();
}

function render() {
	renderBackground();
	renderAxis(getAxisWidth(), getLineColor());
	renderAxisText(getGridPrimarySize(), getGridSecondarySize(), getFontParagraph(), getLineColor());
	renderFunctions();
	renderPoints();
}

function renderFunctions() {
	for(var index = 1; index <= functionsNumber; index++) {
		renderFunction(getFormula(index), getColor(index));
	}
}

function renderFunction(formula, color) {
	var x1 = 0;
	var x2 = resolutionOutput;
	var y1;
	var y2;
	var y3;

	var continous;

	var max = -100000;

	if(isValidMathExpression(formula)) {
		y1 = calculateFromScreenForScreen(formula, x1);
		y2 = calculateFromScreenForScreen(formula, x2);

    	context.lineWidth = getLineWidth();
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
}

function renderPoints() {
	var formula;

	for(var index = 1; index <= functionsNumber; index++) {
		formula = getFormula(index);
		if("" == formula) {
			updateInvalidity(index, "Scrieți funcția pentru a afișa graficul.");
		}
		else {			
			if(isValidMathExpression(formula)) {
				updatePoint(index, formula);
			}
			else {
				updateInvalidity(index, "Funcția nu poate fi calculată.");
			}
		}
	}
}

function renderPoint(x, y, color) {
	context.beginPath();
	context.arc(x, y, getPointRadius(), 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
}

function addFunction(color, name, formula) {
	if(maxFunctionsNumber > functionsNumber) {
		previousColors = [];

		for(var index = 1; index <= functionsNumber; index++) {
			previousColors.push(getColor(index));
		}

		document.querySelector(getFunctionsTable()).innerHTML += document.querySelector("#domExample tbody").innerHTML;
		updateFunctionsNumber();
		updateOrder();

		setColor(functionsNumber, color);
		setName(functionsNumber, name);
		setFormula(functionsNumber, formula);

		for(var index = 1; index < functionsNumber; index++) {
			setColor(index, previousColors[index - 1]);
		}
	}
}

function addFunctionOnGui() {
	addFunction(getNextColor(), getNextName(), getNextFormula());
}

function removeFunctionFromGui(index) {
	if(1 < functionsNumber) {
		document.querySelector(getQuery(index)).remove();
		updateFunctionsNumber();
		updateOrder();

		isAnInputSelected = false;
	}
	else {
		document.querySelector(getQuery(1) + " #input-formula").innerHTML = "";
	}
}

function removeFunctionsFromGui() {
	while(1 < functionsNumber) {
		removeFunctionFromGui(functionsNumber);
	}
}

function update() {
	updateGui();
}

function updateOrder() {
	for(var index = 1; index <= functionsNumber; index++) {
		document.querySelector(getQuery(index) + " #remove").style.order = index;
		document.querySelector(getQuery(index) + " #input-formula").style.order = index;
	}
}

function updateGui() {
	if(canvas.width != getWidth() || canvas.height != getHeight()) {
		loadContext(getWidth(), getHeight());
	}

	if(true == fractionModeEnabled) {
		document.getElementById("multiply").innerHTML = "•";
		document.getElementById("division").innerHTML = getHtmlFraction(1, 1, "x");
	}
	else {
		document.getElementById("multiply").innerHTML = "*";
		document.getElementById("division").innerHTML = "/";
	}
}

function updateName(index) {
	try {
		if(true == solveEquationModeEnabled) {
			document.querySelector(getQuery(index) + " #equation-name").innerHTML = getName(index);
		}
		else {
			document.querySelector(getQuery(index) + " #output-name").innerHTML = getName(index);
		}
	}
	catch(e) {

	}
}

function updateFunctionsNumber() {
	functionsNumber = document.querySelector(getFunctionsTable()).children.length;
}

function updatePoint(index, formula) {
	document.querySelector(getQuery(index) + " td alert").style.display = "none";
	updateName(index);

	if(true == solveEquationModeEnabled) {
		updateEquation(index, formula);
	}
	else {
		updateResult(index, formula);
	}
}

function updateResult(index, formula) {
	var x = xToScreen(xToGrid(mouseX));
	var y = calculateFromScreenForScreen(formula, x);

	if(isNaN(y)) {
		x = "x";
		y = "y";
	}
	else {
		renderPoint(x, y, getColor(index));
		x = formatNumber(xToCartezian(x));
		y = formatNumber(yToCartezian(y));
	}

	document.querySelector(getQuery(index) + " #equation").style.display = "none";
	document.querySelector(getQuery(index) + " #result").style.display = "flex";

	document.querySelector(getQuery(index) + " #output-x").innerHTML = x;
	document.querySelector(getQuery(index) + " #output-y").innerHTML = y;
}

function updateEquation(index, formula) {
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
					renderPoint(x1, y2[x1], getColor(index));
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

	document.querySelector(getQuery(index) + " #equation").style.display = "flex";
	document.querySelector(getQuery(index) + " #result").style.display = "none";

	document.querySelector(getQuery(index) + " #equation-x").innerHTML = x;
	document.querySelector(getQuery(index) + " #equation-y").innerHTML = y;	
}

function updateInvalidity(index, message) {
	document.querySelector(getQuery(index) + " alert").innerHTML = message;
	document.querySelector(getQuery(index) + " alert").style.display = "flex";
	document.querySelector(getQuery(index) + " #result").style.display = "none";
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

function getFunctionsTable() {
	return "#f-table";
}

function getQuery(index) {
	return getFunctionsTable() + " tr:nth-child(" + index + ")";
}

function getColor(index) {
	try {
		return document.querySelector(getQuery(index) + " #input-color").value;
	}
	catch(e) {

	}

	return "";
}

function getName(index) {
	try {
		return document.querySelector(getQuery(index) + " #input-name").innerHTML;
	}
	catch(e) {
		
	}
}

function getFormula(index) {
	try {
		var formula = document.querySelector(getQuery(index) + " #input-formula").innerHTML;
	}
	catch(e) {
		
	}

	return fromHtmlToFormula(formula);
}

function setColor(index, color) {
	document.querySelector(getQuery(index) + " #input-color").value = color;
}

function setName(index, name) {
	document.querySelector(getQuery(index) + " #input-name").innerHTML = name;	
}

function setFormula(index, formula) {
	document.querySelector(getQuery(index) + " #input-formula").innerHTML = formula;
}

function hideGui() {
	document.getElementById("keyboard").style.display = "none";
	document.getElementById("move").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("show").style.display = "inline-flex";
}

function showGui() {
	document.getElementById("keyboard").style.display = "inline-flex";
	document.getElementById("move").style.display = "inline-flex";
	document.getElementById("settings").style.display = "inline-flex";
	document.getElementById("show").style.display = "none";
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

function insert(element) {
	insertInto(element.innerHTML);
}

function insertInto(theHtmlCode) {
	if(indexOfSelectedInput <= functionsNumber) {
		document.querySelector(getQuery(indexOfSelectedInput) + " #input-formula").innerHTML += theHtmlCode;
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

	for(index = 1; index <= functionsNumber; index++) {
		document.getElementById("solve-equation").innerHTML = "y = f(x)";
	}
}

function deactivateSolveEquation() {
	solveEquationModeEnabled = false;

	for(index = 1; index <= functionsNumber; index++) {
		document.getElementById("solve-equation").innerHTML = "f(x) = y";
	}
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