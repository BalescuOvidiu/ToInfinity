

function sendMessage(name, email, message) {
	return true;
}

function addNewsletter(email) {
	if(email.length < 5) {
		document.getElementById(responseObjectId).innerHTML = "Adresa de mail trebuie să aibă cel puțin 5 caractere.";
		return false;
	}
	document.getElementById(responseObjectId).innerHTML = "Mesajul s-a trimis și ați fost adăugat la newsletter.";
	return true;
}

function verifyContactMessage(name, email, message, responseObjectId) {
	if(name.length < 1) {
		document.getElementById(responseObjectId).innerHTML = "Completați numele.";
		return false;
	}
	if(email.length < 5) {
		document.getElementById(responseObjectId).innerHTML = "Adresa de mail trebuie să aibă cel puțin 5 caractere.";
		return false;
	}
	if(message.length < 15) {
		document.getElementById(responseObjectId).innerHTML = "Mesajul trebuie să aibă cel puțin 15 caractere.";
		return false;
	}
	if(sendMessage(name, email, message)) {
		document.getElementById(responseObjectId).innerHTML = "Mesajul s-a trimis.";
		return true;
	}
	document.getElementById(responseObjectId).innerHTML = "Mesajul nu s-a putut trimite.";
	return false;
}

function sendContactMessage() {
	name = document.getElementById("contact-name").value;
	email = document.getElementById("contact-email").value;
	message = document.getElementById("contact-message").value;
	newsletter = document.getElementById("contact-newsletter").checked;
	responseObjectId = "contact-message-status";

	send = verifyContactMessage(name, email, message, responseObjectId);
	news = false;
	console.log(document.getElementById("contact-newsletter").checked);
	if(newsletter) {
		news = addNewsletter(email);
	}

	if(send || news) {
		document.getElementById("contact-name").value = "";
		document.getElementById("contact-email").value = "";
		document.getElementById("contact-message").value = "";
	}

	document.getElementById(responseObjectId).style.display = "block";
}