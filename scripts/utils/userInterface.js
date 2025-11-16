/**
 * Formats a string by replacing {0}, {1}, ... with provided arguments.
 * @returns {string} The formatted string.
 */
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

/**
 * Gets a wrapped index from a list when applying a change.
 * @param {Array} list - The list to index.
 * @param {number} index - Current index.
 * @param {number} change - Change applied to the index (e.g., +1 or -1).
 * @returns {number} The new wrapped index.
 */
function getIndex(list, index, change) {
    index += change;
    if (0 > index) {
        index = list.length - 1;
    }
    else if (index + 1 > list.length) {
        index = 0;
    }
    return index;
}

/**
 * Safely retrieves an element by ID, returning a <p> element if not found.
 * @param {string} id - The ID of the element.
 * @returns {HTMLElement} The found element or a new <p>.
 */
function getElementById(id) {
    var element = document.getElementById(id);
    if (element) {
        return element;
    }
    else {
        return document.createElement("p");
    }
}

/**
 * Safely retrieves the first matching query selector.
 * Returns a <p> element if none found.
 * @param {string} q - The CSS selector.
 * @returns {HTMLElement} The matched element or a new <p>.
 */
function querySelector(q) {
    var element = document.querySelector(q);
    if (element) {
        return element;
    }
    else {
        return document.createElement("p");
    }
}

/**
 * Safely retrieves all matching elements for a selector.
 * Returns a <p> element if none found.
 * @param {string} q - The CSS selector.
 * @returns {NodeList|HTMLElement} The matched elements or a new <p>.
 */
function querySelectorAll(q) {
    var element = document.querySelectorAll(q);
    if (element) {
        return element;
    }
    else {
        return document.createElement("p");
    }
}

/**
 * Gets the cursor start position in a text input.
 * Handles both modern and legacy (IE) selection APIs.
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input element.
 * @returns {number} The selection start position.
 */
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

/**
 * Event handler for when an input is deselected.
 * @param {Event} event
 */
function inputDeselected(event) {
    isAnInputSelected = false;
}

/**
 * Event handler for when an input is selected.
 * @param {Event} event
 */
function inputSelected(event) {
    isAnInputSelected = true;
}

/**
 * Event handler for selecting an input by index.
 * @param {Event} event
 * @param {number|string} index - The index of the selected input.
 */
function inputSelectedByIndex(event, index) {
    inputSelected(event);
    indexOfSelectedInput = parseInt(index);
}

/**
 * Toggles between fraction mode and decimal mode.
 */
function toggleFractionMode() {
    if (fractionModeEnabled) {
        toDecimalMode();
    }
    else {
        toFractionMode();
    }
}

/**
 * Select input element for the function with the specific index.
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input element.
 */
function selectEndOfInput(input) {   
    // Creates object for selection
    selection = window.getSelection();
    
    // Remove all ranges before and set to the input
    selection.selectAllChildren(input);
    
    // Set range with respect to range object.
    selection.collapseToEnd();

    // Set cursor on focus
    input.focus();
}

/**
 * Enables fraction mode and updates UI elements.
 */
function toFractionMode() {
    fractionModeEnabled = true;
    getElementById("fraction-mode").innerHTML = getHtmlFraction(1, 1, 2);
    getElementById("multiply").innerHTML = "•";
    getElementById("division").innerHTML = getHtmlFraction(1, 1, "x");
}

/**
 * Enables decimal mode and updates UI elements.
 */
function toDecimalMode() {
    fractionModeEnabled = false;
    getElementById("fraction-mode").innerHTML = "0.5";
    getElementById("multiply").innerHTML = "*";
    getElementById("division").innerHTML = "/";
}

/**
 * Hides the on-screen GUI components.
 */
function hideGui() {
    getElementById("show").style.display = "flex";
    getElementById("keyboard").style.display = "none";
    getElementById("move").style.display = "none";
    getElementById("settings").style.display = "none";

    var removeButtons = querySelectorAll("#remove");
    for (var index = 0; index < removeButtons.length; index++) {
        removeButtons[index].style.display = "none";
    }
    querySelector("#f-table tr:last-child").style.display = "none";
}

/**
 * Shows the on-screen GUI components.
 */
function showGui() {
    getElementById("show").style.display = "none";
    getElementById("keyboard").style.display = "flex";
    getElementById("move").style.display = "flex";
    getElementById("settings").style.display = "flex";

    var removeButtons = document.querySelectorAll("#remove");
    for (var index = 0; index < removeButtons.length; index++) {
        removeButtons[index].style.display = "inline";
    }
    querySelector("#f-table tr:last-child").style.display = "table-row";
}

/**
 * Loads the page title and updates both <title>, the visible title element and current year.
 * @param {string} [page=""] - Optional page subtitle.
 */
function loadTitle(page = "") {
    var title = "To Infinity";
    if (page) {
        title += " | " + page;
    }
    document.title = title;
    getElementById("title").innerHTML = title;
    getElementById("current-year").innerHTML = new Date().getFullYear();
}
