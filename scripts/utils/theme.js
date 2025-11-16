/**
 * A list of theme colors pulled from CSS root variables.
 * @type {string[]}
 */
var colors = [
	getProperty("--orange"),
	getProperty("--yellow"),
	getProperty("--green"),
	getProperty("--teal"),
	getProperty("--cyan"),
	getProperty("--blue"),
	getProperty("--indigo"),
	getProperty("--purple"),
	getProperty("--pink"),
	getProperty("--red")
];

/**
 * Tracks the last used color index when cycling through the `colors` array.
 * @type {number}
 */
var idLastGivenColor = 0;

/**
 * Retrieves the value of a CSS custom property.
 * @param {string} property - The CSS variable name (e.g. "--color-text").
 * @returns {string} The property value.
 */
function getProperty(property) {
	return getComputedStyle(document.querySelector(":root")).getPropertyValue(property);
}

/** @returns {string} Background color */
function getBackgroundColor() {
	return getProperty("--color-background");
}

/** @returns {string} Panel background color */
function getPanelColor() {
	return getProperty("--color-panel");
}

/** @returns {string} Border color */
function getBorderColor() {
	return getProperty("--color-border");
}

/** @returns {string} Grid primary color */
function getGridPrimaryColor() {
	return getProperty("--color-grid-primary");
}

/** @returns {string} Grid secondary color */
function getGridSecondaryColor() {
	return getProperty("--color-grid-secondary");
}

/** @returns {string} Line color */
function getLineColor() {
	return getProperty("--color-line");
}

/** @returns {string} Title color */
function getTitleColor() {
	return getProperty("--color-title");
}

/** @returns {string} Heading color */
function getHeadingColor() {
	return getProperty("--color-heading");
}

/** @returns {string} Normal text color */
function getTextColor() {
	return getProperty("--color-text");
}

/** @returns {string} Button font family */
function getFontButton() {
	return getProperty("--font-button");
}

/** @returns {string} Input font family */
function getfontInput() {
	return getProperty("--font-input");
}

/** @returns {string} Heading font family */
function getFontHeading() {
	return getProperty("--font-heading");
}

/** @returns {string} Paragraph font family */
function getFontParagraph() {
	return getProperty("--font-paragraph");
}

/** @returns {string} Button font size */
function getFontSizeButton() {
	return getProperty("--font-size-button");
}

/** @returns {string} Input font size */
function getFontSizeInput() {
	return getProperty("--font-size-input");
}

/** @returns {string} Paragraph font size */
function getFontSizeParagraph() {
	return getProperty("--font-size-paragraph");
}

/** @returns {string} Heading font size */
function getFontSizeHeading() {
	return getProperty("--font-size-h1");
}

/**
 * Gets the viewport width.
 * @returns {number} The current viewport width.
 */
function getWidth() {
	return Math.max(document.documentElement.clientWidth, window.innerWidth);
}

/**
 * Gets the viewport height.
 * @returns {number} The current viewport height.
 */
function getHeight() {
	return Math.max(document.documentElement.clientHeight, window.innerHeight);
}

/**
 * Retrieves the next color in the color cycle.
 * Wraps to the beginning after reaching the end.
 * @returns {string} The next color value.
 */
function getNextColor() {
	var value = colors[idLastGivenColor];
	idLastGivenColor = getIndex(colors, idLastGivenColor, 1);
	return value;
}

/**
 * Retrieves the previous color in the color cycle.
 * Wraps to the end after reaching the beginning.
 * @returns {string} The previous color value.
 */
function getPreviousColor() {
	var value = colors[idLastGivenColor];
	idLastGivenColor = getIndex(colors, idLastGivenColor, -1);
	return value;
}

/**
 * Sets a CSS custom property on :root.
 * @param {string} property - The CSS variable name, starting with "--".
 * @param {string} value - The value to assign.
 */
function setProperty(property, value) {
	document.documentElement.style.setProperty(property, value);
}

/**
 * Applies a theme by mapping a set of color-related CSS variables
 * to their light or dark equivalents.
 * @param {string} theme - "light" or "dark".
 */
function setTheme(theme) {
	var color = [
		"-color-background",
		"-color-panel",
		"-color-panel-button",
		"-color-button",
		"-color-border",
		"-color-grid-primary",
		"-color-grid-secondary",
		"-color-line",
		"-color-title",
		"-color-heading",
		"-color-text",
		"-color-hover",
		"-color-focus",
		"-color-link",
		"-color-link-hover",
		"-image-filter",
	];

	for (var i = 0; i < color.length; i++) {
		setProperty("-" + color[i], "var(--" + theme + color[i] + ")");
	}
}

/**
 * Toggles between the light and dark theme.
 * Uses text color comparison to detect the active theme.
 */
function toggleTheme() {
	if (getProperty("--dark-color-text") == getTextColor()) {
		setTheme("light");
	} else {
		setTheme("dark");
	}
}