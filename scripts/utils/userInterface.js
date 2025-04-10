String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

function updateHtmlById(id, newHtml) {
    try {
        document.getElementById(id).innerHTML = newHtml;
    }
    catch(e) {
        
    }
}

function hideHtmlById(id) {
    try {
        document.getElementById(id).style.display = "none";
    }
    catch(e) {
        
    }
}

function showHtmlById(id) {
    try {
        document.getElementById(id).style.display = "flex";
    }
    catch(e) {
        
    }
}

function insert(element) {
    insertInto(element.innerHTML);
}

function getInputStartSelection(input) {
	var position;

    if (document.selection && document.selection.createRange) {
        var range = document.selection.createRange();
        var bookmark = range.getBookmark();
        position = bookmark.charCodeAt(2) - 2;
    }
    else {
        if (input.setSelectionRange)
            position = input.selectionStart;
    }

    return position;
}

function inputSelected(event, index) {
    isAnInputSelected = true;
    indexOfSelectedInput = index;
}

function inputSelected(event) {
    isAnInputSelected = true;
}

function inputDeselected(event) {
    isAnInputSelected = false;
}

function showFps() {
    document.getElementById("fps").style.display = "inline";
    document.getElementById("ms").style.display = "none";
}

function showMs() {
    document.getElementById("fps").style.display = "none";
    document.getElementById("ms").style.display = "inline";
}

function toggleFractionMode() {
    if(fractionModeEnabled) {
        toDecimalMode();
    }
    else {
        toFractionMode();
    }
}

function toFractionMode() {
    fractionModeEnabled = true;
    updateHtmlById("fraction-mode", "0.5");
    updateHtmlById("multiply", "•");
    updateHtmlById("division", getHtmlFraction(1, 1, "x"));
}

function toDecimalMode() {
    fractionModeEnabled = false;
    updateHtmlById("fraction-mode", "0.5");
    updateHtmlById("multiply", "*");
    updateHtmlById("division", "/");
}

function hideGui() {
    hideHtmlById("keyboard");
    hideHtmlById("move");
    hideHtmlById("settings");
    showHtmlById("show");
}

function showGui() {
    showHtmlById("keyboard");
    showHtmlById("move");
    showHtmlById("settings");
    hideHtmlById("show");
}