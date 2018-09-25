<?php
if(isset($_POST["context"])){
	$_POST["context"]=mb_convert_encoding($_POST["context"],'UTF-8','UTF-8');
	mail("balescuovidiu@gmail.com","Mate pentru toţi",$_POST["context"]);
	echo("Mesajul a fost trimis!");
}else{
	echo("Mesajul nu a putut fi trimis!");
}
?>