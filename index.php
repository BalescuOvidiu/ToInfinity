<!DOCTYPE html>
<html>
	<head>
		<title>To Infinity</title>
		<meta http-equiv='content-type' content='text/html;charset=UTF-8'/>
		<meta name='author' content='Balescu Ovidiu-Gheorghe, Cîlțea Marian'/>
		<link rel='stylesheet' type='text/css' href='asset/css/style.css'/>
		<link rel='stylesheet' type='text/css' href='asset/css/header.css'/>
		<link rel='stylesheet' type='text/css' href='asset/css/main.css'/>
		<link rel='stylesheet' type='text/css' href='asset/css/footer.css'/>
		<link rel='stylesheet' type='text/css' href='asset/css/calculator.css'/>
		<link rel='stylesheet' type='text/css' href='asset/css/graph.css'/>
	</head>
	<body>
		<header>
			<nav id='menu0'>ACASĂ</nav>
			<nav id='menu1'>POSTĂRI</nav>
			<nav id='menu2'>CALCULATOR</nav>
			<nav id='menu3'>GRAFICE</nav>
			<nav id='menu4'>GRAFURI</nav>
		</header>
		<main>
			<div id='main'>
			</div>
			<span class='menu'>
				<button id='m1'>Postări</button>
				<img src='img/menu/0.png'/>
				<img src='img/menu/1.png'/>
				<button id='m2'>Calculator</button>
			</span>
			<span class='menu'>
				<button id='m3'>Grafice</button>
				<img src='img/menu/2.png'/>
				<img src='img/menu/3.png'/>
				<button id='m4'>Grafuri</button>
			</span>
		</main>
		<footer>
			<section>
				<h1>Contact</h1>
				<label for='email1'>Email</label><input id='email1' maxlength='30' type='email'/>
				<strong>Să fie de forma localpart@subdomain.domain şi să aibă între 6 şi 30 de caractere.<b id='email1_'>(0)</b></strong>
				<label for='message1'>Mesaj</label>
				<textarea id='message1' maxlength='1000'></textarea>
				<strong>Între 5 şi 1000 de caractere.<b id='message1_'>(0)</b></strong>
				<button id='contact'>Trimite</button>
				<p>Ne puteţi contacta pentru orice problemă sau sugestie legată de site.</p>
			</section>
			<section>
				<h1>Despre site</h1>
				<p>Doi elevi de liceu, Bălescu Ovidiu Gheorghe şi Cîlţea Marian, au hotărât să facă mai accesibilă matematica 
				pentru toţi, elevi, profesori sau doar simpli pasionaţi.</p>
				<p>Matematica e ştiinţa minţii. O regăsism în fiecare domeniu, de la IT la biologie.</p>
				<img id='logo' src='img/logo.png'/>
				<p>Site-ul pune la dispoziţia utilizatorului câteva aplicații, în care sunt exemplificate anumite noţiuni elementare de matematică. Toate acestea uşurează predarea şi învățarea.</p>
				<p>Acest site a luat Premiul I la faza județeană a concursului național InfoEducație. De asemenea a fost selectat la concursul național de IT GREPIT.</p>
				<a href='http://infoeducatie.ro/' target='_blank'><img src='img/extern/0.png' class='extern_logo'/></a>
				<a href='http://onicescu.ro/' target='_blank'><img src='img/extern/1.png' class='extern_logo'/></a>
				<a href='http://grepit.info/' target='_blank'><img src='img/extern/2.png' class='extern_logo'/></a>
				<a href='http://fmi.unibuc.ro/' target='_blank'><img src='img/extern/3.png' class='extern_logo'/></a>
			</section>
			<section>
				<h1>Noutăți</h1>
				<?php include "asset/php/newsletter.php";	?>
			</section>
		</footer>
		<script type='text/javascript' src='asset/js/lib/jquery.js' type='text/javascript'></script>
		<script type='text/javascript' src='asset/js/lib/jquery-selection.js' type='text/javascript'></script>
		<script type='text/javascript' src='asset/js/lib/jcanvas.js' type='text/javascript'></script>
		<script type='text/javascript' src='asset/js/lib/math.js' type='text/javascript'></script>
		<script type='text/javascript' src='asset/js/calculator.js' type='text/javascript'></script>
		<script type='text/javascript' src='asset/js/functionsDraw.js' type='text/javascript'></script>
		<script type='text/javascript' src='asset/js/graph.js' type='text/javascript'></script>
		<script type='text/javascript' src='asset/js/posts.js' type='text/javascript'></script>
		<script type='text/javascript' src='asset/js/script.js' type='text/javascript'></script>
		<noscript>Browserul dumneavoastră nu suportă JavaScript!</noscript>	
	</body>
</html>