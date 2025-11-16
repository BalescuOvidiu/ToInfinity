/**
 * Template for displaying a result as a function: f(x) = y.
 * Placeholders: {0} = function name, {1} = argument, {2} = result.
 * @type {string}
 */
var resultFunctionString = "{0}({1}) = {2}";

/**
 * Template for displaying an equation: y = f(x).
 * Placeholders: {0} = function name, {1} = argument, {2} = result/left side.
 * @type {string}
 */
var equationFunctionString = "{2} = {0}({1})";

/**
 * Checks whether a given string is a valid math.js expression.
 *
 * @param {string} expresion - The expression to validate.
 * @returns {boolean} True if the expression can be evaluated, false otherwise.
 */
function isValidMathExpression(expresion) {
	const scope = {
		x: 0
	};

	try {
		math.evaluate(expresion, scope);
	}
	catch (e) {
		return false;
	}

	return true;
}

/**
 * Formats a value for display on an axis, either as a fraction or decimal.
 *
 * @param {number|string} n - The value to format.
 * @returns {string|number} A string fraction (if fraction mode) or numeric value.
 */
function formatAxis(n) {
	n = parseFloat(n.toString());
	var f = math.fraction(n);

	if (true == fractionModeEnabled) {
		if (1 != f.d) {
			return (f.s * f.n) + "/" + f.d;
		}

		return f.s * f.n;
	}

	return (f.n / f.d) * f.s;
}

/**
 * Returns HTML representing a square root, e.g. √(n).
 *
 * @param {string|number} n - The radicand.
 * @returns {string} HTML string for the square root.
 */
function getHtmlSqrt(n) {
	return "√<span class='math-symbol-radical'>" + n + "</span>";
}

/**
 * Returns HTML representing a k-th root, e.g. √[k](n).
 *
 * @param {string|number} n - The radicand.
 * @param {string|number} k - The index of the root.
 * @returns {string} HTML string for the radical expression.
 */
function getHtmlRadical(n, k) {
	return "<sup>" + k + "</sup>√<span class='math-symbol-radical'>" + n + "</span>";
}

/**
 * Returns HTML for a fraction, optionally with a leading minus sign.
 *
 * @param {number} s - The sign (>= 0 for positive, < 0 for negative).
 * @param {string|number} n - The numerator.
 * @param {string|number} d - The denominator.
 * @returns {string} HTML string for the fraction.
 */
function getHtmlFraction(s, n, d) {
	if (0 <= s) {
		return "<span class='fraction'><span class='math-symbol-nominator'>" + n + "</span><span class='math-symbol-denominator'>" + d + "</span></span>";
	}

	return "-<span class='fraction'><span class='math-symbol-nominator'>" + n + "</span><span class='math-symbol-denominator'>" + d + "</span></span>";
}

/**
 * Converts an HTML-encoded math expression into a plain formula string
 * suitable for evaluation by math.js.
 *
 * @param {string} formula - The HTML-based formula.
 * @returns {string} The converted formula string.
 */
function fromHtmlToFormula(formula) {
	formula = formula.replace(/<br>/gi, "");

	formula = formula.replace(/!/g, "factorial");
	formula = formula.replace(/•/g, "*");
	formula = formula.replace(/π/g, "Pi");
	formula = formula.replace(/γ/g, "0.577215664901532860606");
	formula = formula.replace(/°/g, " deg");
	formula = formula.replace(/Σ/g, "sigma");
	formula = formula.replace(/П/g, "produce");

	formula = formula.replace(/<sup>/gi, "^(");
	formula = formula.replace(/<\/sup>/gi, ")");

	formula = formula.replace(/<span class=\"fraction\">/gi, "(");

	formula = formula.replace(/<span class=\"math-symbol-nominator\">/gi, "(");
	formula = formula.replace(/<\/span><span class=\"math-symbol-denominator\">/gi, ")/(");

	formula = formula.replace(/√<span class=\"math-symbol-radical\">/g, "sqrt(");

	formula = formula.replace(/<\/span>/gi, ")");

	formula = formula.replace(/[[]/g, "floor(");
	formula = formula.replace(/]/g, ")");

	formula = formula.replace(/{/g, "decimals(");
	formula = formula.replace(/}/g, ")");
	formula = formula.replace(/mod/g, "%");

	return formula;
}

/**
 * Formats a number (including Infinity) either as a fraction in HTML
 * or as a plain decimal, depending on fraction mode.
 *
 * @param {number|string} n - The value to format.
 * @returns {string|number} HTML fraction / special symbol, or numeric value.
 */
function formatNumber(n) {
	if (Infinity == n) {
		return "∞";
	}

	if (-Infinity == n) {
		return "-∞";
	}

	n = parseFloat(n.toString());
	var f = math.fraction(n);

	if (true == fractionModeEnabled) {
		if (1 != f.d) {
			return getHtmlFraction(f.s, f.n, f.d);
		}

		return f.s * f.n;
	}

	return (f.n / f.d) * f.s;
}

/**
 * Computes the dot product of two 2D vectors (x1, y1) and (x2, y2).
 *
 * @param {number} x1 - x component of the first vector.
 * @param {number} x2 - x component of the second vector.
 * @param {number} y1 - y component of the first vector.
 * @param {number} y2 - y component of the second vector.
 * @returns {number} The dot product.
 */
function getProduce2Points2d(x1, x2, y1, y2) {
	return x1 * x2 + y1 * y2;
}

/**
 * Computes the length (magnitude) of a 2D vector.
 *
 * @param {number} x1 - x component.
 * @param {number} y1 - y component.
 * @returns {number} The length of the vector.
 */
function getLength2d(x1, y1) {
	return Math.sqrt(x1 * x1 + y1 * y1);
}

/**
 * Computes the angle (in radians) between two 2D vectors (x1, y1) and (x2, y2).
 *
 * @param {number} x1 - x component of the first vector.
 * @param {number} y1 - y component of the first vector.
 * @param {number} x2 - x component of the second vector.
 * @param {number} y2 - y component of the second vector.
 * @returns {number} The angle in radians.
 */
function getAngle2Points2dRadians(x1, y1, x2, y2) {
	var produce = getProduce2Points2d(x1, x2, y1, y2);
	var length1 = x1 * x1 + y1 * y1;
	var length2 = x2 * x2 + y2 * y2;

	return Math.acos(Math.sign(produce) * Math.sqrt((produce * produce) / length1 / length2));
}

/**
 * Computes the angle (in radians) at point (x2, y2) between points
 * (x1, y1) -> (x2, y2) -> (x3, y3).
 *
 * @param {number} x1 - x coordinate of the first point.
 * @param {number} y1 - y coordinate of the first point.
 * @param {number} x2 - x coordinate of the vertex point.
 * @param {number} y2 - y coordinate of the vertex point.
 * @param {number} x3 - x coordinate of the third point.
 * @param {number} y3 - y coordinate of the third point.
 * @returns {number} The angle in radians at (x2, y2).
 */
function getAngle3Points2dRadians(x1, y1, x2, y2, x3, y3) {
	return getAngle2Points2dRadians(x2 - x1, y2 - y1, x3 - x2, y3 - y2);
}

/**
 * Imports custom functions and constants into math.js under a single namespace.
 * Includes combinatorics, logs, series/product operators, etc.
 */
function importCustom() {
	const customFunctions = {
		/**
		 * Returns the decimal part of a number.
		 *
		 * @param {number} n - Input number.
		 * @returns {number} Decimal part of n.
		 */
		decimals: function (n) {
			return n - Math.floor(n);
		},

		/**
		 * Computes the k-th radical (root) of n.
		 *
		 * @param {number} n - The root index.
		 * @param {number} k - The value.
		 * @returns {number} Computed radical.
		 */
		radical: function (n, k) {
			return math.pow(k, 1 / n);
		},

		/**
		 * Returns the decimal part of a number.
		 * (Duplicate of decimals above, kept for compatibility.)
		 *
		 * @param {number} n - Input number.
		 * @returns {number} Decimal part of n.
		 */
		decimals: function (n) {
			return n - Math.floor(n);
		},

		/**
		 * Arrangements A(k, n) = n! / (n - k)!.
		 *
		 * @param {number} k - Number of selected elements.
		 * @param {number} n - Total number of elements.
		 * @returns {number} Number of arrangements.
		 */
		A: function (k, n) {
			var result = 1;

			for (var i = n - k + 1; i <= n; i++) {
				result *= i;
			}

			return result;
		},

		/**
		 * Combinations C(k, n) = n! / (k! (n - k)!).
		 *
		 * @param {number} k - Number of selected elements.
		 * @param {number} n - Total number of elements.
		 * @returns {number} Number of combinations.
		 */
		C: function (k, n) {
			var result = 1;

			for (var i = n - k + 1; i <= n; i++) {
				result *= i;
			}

			for (var i = 2; i <= k; i++) {
				result /= i;
			}

			return result;
		},

		/**
		 * Natural logarithm (base e).
		 *
		 * @param {number} n - Input number.
		 * @returns {number} Natural log of n.
		 */
		ln: function (n) {
			return math.log(n, math.e);
		},

		/**
		 * Common logarithm (base 10).
		 *
		 * @param {number} n - Input number.
		 * @returns {number} Base-10 log of n.
		 */
		lg: function (n) {
			return math.log(n, 10);
		},

		/**
		 * Summation operator Σ with a given step and expression.
		 *
		 * @param {number} begin - Start value for x.
		 * @param {number} end - End value for x.
		 * @param {number} step - Step between values of x.
		 * @param {string} expresion - Expression in terms of x.
		 * @returns {number} The sum over the range.
		 */
		sigma: function (begin, end, step, expresion) {
			var s = 0;

			if (isValidMathExpression(expresion)) {
				for (var x = begin; x <= end; x += step) {
					s += math.evaluate(expresion, n);
				}
			}

			return s;
		},

		/**
		 * Product operator Π with a given step and expression.
		 *
		 * @param {number} begin - Start value for x.
		 * @param {number} end - End value for x.
		 * @param {number} step - Step between values of x.
		 * @param {string} expresion - Expression in terms of x.
		 * @returns {number} The product over the range.
		 */
		produce: function (begin, end, step, expresion) {
			var p = 1;

			if (isValidMathExpression(expresion)) {
				for (var x = begin; x <= end; x += step) {
					p *= math.evaluate(expresion, n);
				}
			}

			return p;
		}
	};

	math.import({
		customFunctions,
		/**
		 * Euler–Mascheroni constant γ.
		 * @type {number}
		 */
		Y: 0.577215664901532860606
	});
}
