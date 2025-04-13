var colors = [
	getProperty("--orange"),
	getProperty("--yellow"),
	getProperty("--green"),
	getProperty("--cyan"),
	getProperty("--blue"),
	getProperty("--purple"),
	getProperty("--red")
];
var idLastGivenColor = 0;

function getProperty(property) {
	return getComputedStyle(document.querySelector(":root")).getPropertyValue(property);
}

function getBackgroundColor() {
	return getProperty("--color-background");
}

function getPanelColor() {
	return getProperty("--color-panel");
}

function getBorderColor() {
	return getProperty("--color-border");
}

function getGridPrimaryColor() {
	return getProperty("--color-grid-primary");
}

function getGridSecondaryColor() {
	return getProperty("--color-grid-secondary");
}

function getLineColor() {
	return getProperty("--color-line");
}

function getTitleColor() {
	return getProperty("--color-title");
}

function getHeadingColor() {
	return getProperty("--color-heading");
}

function getTextColor() {
	return getProperty("--color-text");
}

function getFontButton() {
	return getProperty("--font-button");
}

function getfontInput() {
	return getProperty("--font-input");
}

function getFontHeading() {
	return getProperty("--font-heading");
}

function getFontParagraph() {
	return getProperty("--font-paragraph");
}

function getFontSizeButton() {
	return getProperty("--font-size-button");
}

function getFontSizeInput() {
	return getProperty("--font-size-input");
}

function getFontSizeParagraph() {
	return getProperty("--font-size-paragraph");
}

function getFontSizeHeading() {
	return getProperty("--font-size-h1");
}

function getWidth() {
	return Math.max(document.documentElement.clientWidth, window.innerWidth);
}

function getHeight() {
	return Math.max(document.documentElement.clientHeight, window.innerHeight);
}

function getNextColor() {
	var value = colors[idLastGivenColor];
    idLastGivenColor = getIndex(colors, idLastGivenColor, 1);

	return value;
}

function getPreviousColor() {
	var value = colors[idLastGivenColor];
    idLastGivenColor = getIndex(colors, idLastGivenColor, -1);

	return value;
}

function setProperty(property, value) {
	document.documentElement.style.setProperty(property, value);
}

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
		"-color-hovered",
		"-color-active",
	];

	for(var i = 0; i < color.length; i++) {
		setProperty("-" + color[i], "var(--" + theme + color[i] + ")");
	}
}

function toggleTheme() {
	if(getProperty("--dark-color-text") == getTextColor()) {
		setTheme("light");
	}
	else {
		setTheme("dark");
	}
}