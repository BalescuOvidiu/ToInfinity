var beginTime = 0;
var timeFpsShow = 1000;
var lastFpsShow = 0;

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

function timePast(time, last) {
	return (performance.now() > time + last);
}
