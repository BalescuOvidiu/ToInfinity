String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

function getIndex(list, index, change) {
    index += change;
    if(0 > index) {
        index = list.length - 1;
    }
    else if(index + 1 > list.length) {
        index = 0;
    }
    return index;
}

function updateHtmlById(id, newHtml) {
    try {
        document.getElementById(id).innerHTML = newHtml;
    }
    catch(e) {
        
    }
}

function displayHtmlById(id, display) {
    try {
        document.getElementById(id).style.display = display;
    }
    catch(e) {
        
    }
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

function inputDeselected(event) {
    isAnInputSelected = false;
}

function inputSelected(event) {
    isAnInputSelected = true;
}

function inputSelectedByIndex(event, index) {
    inputSelected(event);
    indexOfSelectedInput = parseInt(index);
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
    updateHtmlById("fraction-mode", getHtmlFraction(1, 1, 2));
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
    displayHtmlById("show", "flex");

    displayHtmlById("keyboard", "none");
    displayHtmlById("move", "none");
    displayHtmlById("settings", "none");

    removeButtons = document.querySelectorAll("#remove");
    for(var index = 0; index < removeButtons.length; index++) {
        removeButtons[index].style.display = "none";
    }
    lastFunction = document.querySelector("#f-table tr:last-child");
    if(lastFunction) {
        lastFunction.style.display = "none";
    }
}

function showGui() {
    displayHtmlById("show", "none");

    displayHtmlById("keyboard", "flex");
    displayHtmlById("move", "flex");
    displayHtmlById("settings", "flex");

    removeButtons = document.querySelectorAll("#remove");
    for(var index = 0; index < removeButtons.length; index++) {
        removeButtons[index].style.display = "inline";
    }
    lastFunction = document.querySelector("#f-table tr:last-child");
    if(lastFunction) {
        lastFunction.style.display = "table-row";        
    }
}