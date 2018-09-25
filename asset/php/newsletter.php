<?php
include 'connection.php';
//Menu
$menu="<label for='email0'>Email</label><input id='email0' maxlength='30' type='email'/>
<strong>Să fie de forma localpart@subdomain.domain şi să aibă între 6 şi 30 de caractere.<b id='email0_'>(0)</b></strong>
<button id='newsletter'>Trimite</button>
<p>Ca abonat, veţi primi un mail cu fiecare postare nouă apărută pe site, în timp real.</p>
<p>După ce vă trimite-ţi adresa de mail, veţi primi un mail de confirmare.</p>
<p id='warning'></p>";
//Verification
if(isset($_GET["newsletter"])){
	$confirmed=mysqli_real_escape_string($_GET["newsletter"]);
	$confirmed=mb_convert_encoding($confirmed,'UTF-8','UTF-8');
	if($result=mysqli_query($GLOBALS["db"],"UPDATE newsletter SET confirmed=0 WHERE confirmed='$confirmed'")&&mysqli_affected_rows($GLOBALS["db"]))
		echo("<p>Felicitări! Sunteţi abonat(ă)!</p>");
	else
		echo($menu);
}else
	echo($menu);
//Submit
if(isset($_POST["newsletter"])){
	$email=mysqli_real_escape_string(mb_convert_encoding($_POST["newsletter"],'UTF-8','UTF-8'));
	if(mysqli_query($GLOBALS["db"],"INSERT INTO newsletter (email,confirmed) VALUES ('$email',0)")){
		//Send mail
		mail($_POST["newsletter"],"To Infinity","Daţi click pe link pentru confirmarea abonării: ".link."?newsletter=".$confirmed." ");
		echo("<p>Veţi primi un mail de confirmare.</p>");
	}else
		echo("Există deja un abonament pentru această adresă de mail.");
}
?>