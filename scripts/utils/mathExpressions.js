var resultFunctionString = "{0}({1}) = {2}";
var equationFunctionString = "{2} = {0}({1})";

function isValidMathExpression(expresion){
	const scope = {
		x: 0
	}

    try {
        math.evaluate(expresion, scope);
    }
    catch(e) {
        return false;
    }

    return true;
}

function formatAxis(n) {
	n = parseFloat(n.toString());
	var f = math.fraction(n);

	if(true == fractionModeEnabled) {
		if(1 != f.d) {
			return (f.s * f.n) + "/" + f.d;
		}

		return f.s * f.n;
	}

	return (f.n / f.d) * f.s;
}

function getHtmlSqrt(n) {
	return "√<span class='math-symbol-radical'>" + n + "</span>";
}

function getHtmlRadical(n, k) {
	return "<sup>" + k + "</sup>√<span class='math-symbol-radical'>" + n + "</span>";
}

function getHtmlFraction(s, n, d) {
	if(0 <= s) {
		return "<span class='fraction'><span class='math-symbol-nominator'>" + n + "</span><span class='math-symbol-denominator'>" + d + "</span></span>";
	}

	return "-<span class='fraction'><span class='math-symbol-nominator'>" + n + "</span><span class='math-symbol-denominator'>" + d + "</span></span>";
}

function fromHtmlToFormula(formula) {
	formula=formula.replace(/<br>/gi,"");

	formula=formula.replace(/!/g,"factorial");
	formula=formula.replace(/•/g,"*");
	formula=formula.replace(/π/g,"Pi");
	formula=formula.replace(/γ/g,"0.577215664901532860606");
	formula=formula.replace(/°/g," deg");
	formula=formula.replace(/Σ/g,"sigma");
	formula=formula.replace(/П/g,"produce");

	formula=formula.replace(/<sup>/gi,"^(");
	formula=formula.replace(/<\/sup>/gi,")");

	formula=formula.replace(/<span class=\"fraction\">/gi,"(");

	formula=formula.replace(/<span class=\"math-symbol-nominator\">/gi,"(");
	formula=formula.replace(/<\/span><span class=\"math-symbol-denominator\">/gi,")/(");

	formula=formula.replace(/√<span class=\"math-symbol-radical\">/g,"sqrt(");

	formula=formula.replace(/<\/span>/gi,")");

	formula=formula.replace(/[[]/g,"floor(");
	formula=formula.replace(/]/g,")");

	formula=formula.replace(/{/g,"decimals(");
	formula=formula.replace(/}/g,")");
	formula=formula.replace(/mod/g,"%");

	return formula;
}

function formatNumber(n) {
	if(Infinity == n) {
		return "∞";
	}

	if(-Infinity == n) {
		return "-∞";
	}

	n = parseFloat(n.toString());
	var f = math.fraction(n);

	if(true == fractionModeEnabled) {
		if(1 != f.d) {
			return getHtmlFraction(f.s, f.n, f.d);
		}

		return f.s * f.n;
	}

	return (f.n / f.d) * f.s;
}

function getProduce2Points2d(x1, x2, y1, y2) {
	return x1 * x2 + y1 * y2;
}

function getLength2d(x1, y1) {
	return Math.sqrt(x1 * x1 + y1 * y1);
}

function getAngle2Points2dRadians(x1, y1, x2, y2) {
	var produce = getProduce2Points2d(x1, x2, y1, y2);
	var length1 = x1 * x1 + y1 * y1;
	var length2 = x2 * x2 + y2 * y2;

	return Math.acos(Math.sign(produce) * Math.sqrt((produce * produce) / length1 / length2));
}

function getAngle3Points2dRadians(x1, y1, x2, y2, x3, y3) {
	return getAngle2Points2dRadians(x2 - x1, y2 - y1, x3 - x2, y3 - y2);
}

function importCustom() {
	const customFunctions = {
		decimals: function (n) {
			return n - Math.floor(n);
		},

		radical: function (n, k) {
			return math.pow(k, 1/n);
		},

		decimals: function (n) {
			return n - Math.floor(n);
		},

		A: function (k, n) {
			var result = 1;

			for(var i = n - k + 1; i <= n; i++) {
				result *= i;
			}

			return result;
		},

		C: function (k, n) {
			var result = 1;

			for(var i = n - k + 1; i <= n;i++) {
				result *= i;
			}

			for(var i = 2;i <= k; i++) {
				result /= i;
			}

			return result;
		},

		ln: function (n) {
			return math.log(n, math.e);
		},

		lg: function (n) {
			return math.log(n, 10);
		},

		sigma: function (begin, end, step, expresion) {
			var s = 0;

			if(isValidMathExpression(expresion)) {
				for(var x = begin; x <= end; x += step) {
					s += math.evaluate(expresion, n);
				}
			}

			return s;
		},

		produce: function (begin, end, step, expresion) {
			var p = 1;

			if(isValidMathExpression(expresion)) {
				for(var x = begin; x <= end; x += step) {
					p *= math.evaluate(expresion, n);
				}
			}
			
			return p;
		}
	}

	math.import({
		customFunctions,
		Y: 0.577215664901532860606
	});
}
