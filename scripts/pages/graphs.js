var interval;
graph = [];

function loadProgram() {
	setTitle("Grafuri");
	
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
}

function update() {
	
}