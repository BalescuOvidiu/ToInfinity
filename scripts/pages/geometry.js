var interval;

function loadProgram() {
	setTitle("Geometrie");
	
	importCustom();
	loadCanvas(getWidth(), getHeight());

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
	renderAxis(getAxisWidth(), getLineColor());
	renderAxisText(getGridPrimarySize(), getGridSecondarySize(), getFontParagraph(), getLineColor());
}

function update() {
	
}