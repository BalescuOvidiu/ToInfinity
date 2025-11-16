// Timestamp when the current frame started
let startTime = 0;

// How often to update the FPS/MS display (in milliseconds)
const fpsUpdateInterval = 1000;

// Timestamp of the last FPS/MS UI update
let lastFpsUpdate = 0;

// Cache DOM references (better performance than repeated lookups)
const labelMs = document.getElementById("label-ms");
const labelFps = document.getElementById("label-fps");

/**
 * Start the timing interval.
 * Call this at the beginning of the process you want to measure.
 *
 * @returns {void}
 */
function startTiming() {
    startTime = performance.now();
}

/**
 * Finish the timing interval and update FPS/MS labels if needed.
 * Only updates the display at a fixed interval (once per second by default).
 *
 * @returns {void}
 */
function finishTiming() {
    const now = performance.now();

    // Check if the update interval has passed
    if (now - lastFpsUpdate >= fpsUpdateInterval) {
        const frameTime = now - startTime; // Time spent in ms
        const fps = 1000 / frameTime;      // Calculate frames per second

        labelMs.textContent = `${Math.floor(frameTime)} ms`;
        labelFps.textContent = `${Math.floor(fps)} fps`;

        lastFpsUpdate = now;
    }
}

/**
 * Show the FPS label and hide the MS label.
 *
 * @returns {void}
 */
function showFps() {
    labelFps.style.display = "inline";
    labelMs.style.display = "none";
}

/**
 * Show the MS label and hide the FPS label.
 *
 * @returns {void}
 */
function showMs() {
    labelFps.style.display = "none";
    labelMs.style.display = "inline";
}