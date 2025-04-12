var interval;

function loadProgram() {
	setTitle("Electricitate");
	
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
	renderAxis(axisWidth, getLineColor());
}

function update() {
	
}