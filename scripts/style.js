var idColor = 0;

function getProperty(property) {
	return getComputedStyle(document.querySelector(":root")).getPropertyValue(property);
}

function getBackgroundColor() {
	return getProperty("--color-background");
}

function getForegroundColor() {
	return getProperty("--color-foreground");
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
	return Math.max(0 || document.documentElement.clientWidth, 0 || window.innerWidth);
}

function getHeight() {
	return Math.max(0 || document.documentElement.clientHeight, 0 || window.innerHeight);
}

function getAxisWidth() {
	return 0.5;
}

function getGridWidth() {
	return 0.5;
}

function getLineWidth() {
	return 2;
}

function getPointRadius() {
	return 4;
}

function getNextColor() {
	var array = [
		"--red",
		"--orange",
		"--yellow",
		"--green",
		"--cyan",
		"--blue",
		"--purple"
	];

	var value = array[idColor];



	if(array.length <  2 + idColor) {
		idColor = 0;
	}
	else {
		idColor++;
	}

	return getProperty(value);
}

function setProperty(property, value) {
	document.documentElement.style.setProperty(property, value);
}

function setTheme(theme) {
	var color = [
		"-color-background",
		"-color-panel",
		"-color-button",
		"-color-border",
		"-color-grid-primary",
		"-color-grid-secondary",
		"-color-line",
		"-color-title",
		"-color-subtitle",
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