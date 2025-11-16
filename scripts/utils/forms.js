/**
 * Checks whether an email address is syntactically valid.
 * Rules:
 * - Must be a string
 * - No whitespace
 * - Basic pattern: local@domain.tld
 *
 * @param {string} mail - The email address to validate.
 * @returns {boolean} True if the email looks valid, false otherwise.
 */
function isValidEmail(email) {
	if (typeof email !== "string") {
		return false;
	}

	const trimmed = email.trim();
	if (!trimmed) {
		return false;
	}

	// Simple, practical email validation (not fully RFC-compliant, but robust enough for forms)
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(trimmed);
}

/**
 * Checks whether a message is considered valid.
 * Rules:
 * - Must be a string
 * - Trimmed length must be at least 10 characters
 *
 * @param {string} message - The message to validate.
 * @returns {boolean} True if the message is valid, false otherwise.
 */
function isValidMessage(message, minimumLength = 10) {
	if (typeof message !== "string") {
		return false;
	}

	const trimmed = message.trim();
	return trimmed.length >= minimumLength;
}

/**
 * Checks whether a name is considered valid.
 * Rules:
 * - Must be a string
 * - Trimmed length must be at least 2 characters
 * - Can contain letters, spaces, dots, apostrophes and hyphens
 *
 * @param {string} name - The name to validate.
 * @returns {boolean} True if the name is valid, false otherwise.
 */
function isValidName(name) {
	if (typeof name !== "string") {
		return false;
	}

	const trimmed = name.trim();
	if (trimmed.length < 2) {
		return false;
	}

	// Allow international names with letters, spaces, dots, apostrophes, and hyphens
	return /^[\p{L}.'\- ]+$/u.test(trimmed);
}

/**
 * Sends a contact message.
 * Stub implementation – always returns true.
 *
 * @param {string} name - Sender's name.
 * @param {string} email - Sender's email address.
 * @param {string} message - Message content.
 * @returns {boolean} Whether the message was (logically) sent successfully.
 */
function sendMessage(name, email, message) {
	return true;
}

/**
 * Adds an email address to the newsletter list.
 * Updates the DOM element with id equal to the global `responseObjectId`.
 *
 * @param {string} email - Email address to add to the newsletter.
 * @returns {boolean} True if added successfully, false otherwise.
 */
function addNewsletter(email) {
	if (!isValidEmail(email)) {
		document.getElementById(responseObjectId).innerHTML =
			"Adresa de mail trebuie să fie de forma local@domain.tld";
		return false;
	}
	return true;
}

/**
 * Verifies the contact form fields and sends the message if valid.
 * Displays validation and status messages in a given DOM element.
 *
 * @param {string} name - Sender's name.
 * @param {string} email - Sender's email address.
 * @param {string} message - Message content.
 * @param {string} responseObjectId - The id of the DOM element where status messages will be shown.
 * @returns {boolean} True if validation passes and the message is sent, false otherwise.
 */
function verifyContactMessage(name, email, message, responseObjectId) {
	if (!isValidName(name)) {
		document.getElementById(responseObjectId).innerHTML = "Completați numele.";
		return false;
	}
	if (!isValidEmail(email)) {
		document.getElementById(responseObjectId).innerHTML =
			"Adresa de mail trebuie să fie de forma local@domain.tld";
		return false;
	}
	if (!isValidMessage(message)) {
		document.getElementById(responseObjectId).innerHTML =
			"Mesajul trebuie să aibă cel puțin 10 caractere.";
		return false;
	}
	if (sendMessage(name, email, message)) {
		document.getElementById(responseObjectId).innerHTML = "Mesajul s-a trimis.";
		return true;
	}
	document.getElementById(responseObjectId).innerHTML =
		"Mesajul nu s-a putut trimite.";
	return false;
}

/**
 * Reads the contact form fields from the DOM, validates and sends the message,
 * optionally subscribes the user to the newsletter, and clears the form if
 * either sending or newsletter subscription succeeded.
 *
 * Expects the following elements to exist:
 * - #contact-name (input)
 * - #contact-email (input)
 * - #contact-message (textarea/input)
 * - #contact-newsletter (checkbox)
 * - #contact-message-status (status container)
 */
function sendContactMessage() {
	name = document.getElementById("contact-name").value;
	email = document.getElementById("contact-email").value;
	message = document.getElementById("contact-message").value;
	newsletter = document.getElementById("contact-newsletter").checked;
	responseObjectId = "contact-message-status";

	send = verifyContactMessage(name, email, message, responseObjectId);
	news = false;
	if (newsletter) {
		news = addNewsletter(email);
	}

	if (send) {
		document.getElementById(responseObjectId).innerHTML = "Mesajul s-a trimis.";
		clearContactForm();
	}

	if (news) {
		document.getElementById(responseObjectId).innerHTML = "Ați fost abonat la newsletter.";
		clearContactForm();		
	}

	if (send && news) {
		document.getElementById(responseObjectId).innerHTML = "Mesajul s-a trimis și ați fost abonat la newsletter.";
		clearContactForm();
	}
}

/**
 * Clear the inputs from contact form.
 *
 * Expects the following elements to exist:
 * - #contact-name (input)
 * - #contact-email (input)
 * - #contact-message (textarea/input)
 * - #contact-newsletter (checkbox)
 */
function clearContactForm() {
	document.getElementById("contact-name").value = "";
	document.getElementById("contact-email").value = "";
	document.getElementById("contact-message").value = "";
	document.getElementById("contact-newsletter").checked = false;
}