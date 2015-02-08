<?php

	include "php/mySQL.class.php";

	$bd = new mySQL;
	$bd->selecionar_bd('u321650215_works');
	$res = $bd->send_Query("SELECT * FROM works WHERE titulo = 'SnoopDogPets'");
	if($res == -1) exit();

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title><? echo $res->titulo ?></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="shortcut icon" href="../images/favicon.ico" type="image/x-icon" />
	<link rel="icon" href="../images/favicon.ico" type="image/x-icon" />
	<link href="css/style.css" rel="stylesheet" type="text/css" />
	<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300italic,700,300' rel='stylesheet' type='text/css' />
</head>

	<body>

		<div id="image-container">

			<div class="left"></div>
			<div class="right"></div>
			<span>X</span>

		</div>

		<div class="container">

			<div class="header"></div>

			<div class="header-shadow"></div>

			<div class="content">

				<div class="nav">
					<ul>
 					</ul>
				</div>

				<div class="text">
					
					<? echo $res->texto ?>

					<h2 id="nav-galeria">Galeria</h2>
					<hr>
					<div id="gallery">
						<? echo $res->galeria ?>
					</div>

				</div>

			</div>
		</div>

		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="js/gallery.min.js"></script>
		<script type="text/javascript" src="js/jquery-scrolltofixed-min.js"></script>
		<script type="text/javascript">

			$(document).ready(function() {

				/*

				EVENTOS DO MENU

				*/


				//fixa menu
				$('.nav').scrollToFixed();

				//popula o menu
				var elem = $('.nav').find('ul'),
					titulo = $('.text').find('h1'),
					menuOpts = $('.text').find('h2'),
					html = '';

				html += "<li><a href='#nav-sobre'>#sobre</a></li>";

				$(menuOpts).each(function() {

					var opt = $(this).text().toLowerCase();
					html += "<li><a href='#nav-"+ opt +"'>#"+ opt +"</a></li>";

				});

				$(elem).append(html);


				//evento de click menu
				$('a').on("click", function(e) {

					e.preventDefault();

					$('html, body').stop().animate({
						scrollTop: $(e.target.attributes.href.value).offset().top
					}, 500);

				});

				/*

				EVENTOS DA GALERIA

				*/

				//inicializa galeria
				gallery.init('#image-container', '#gallery');

				//seta velocidade da transição
				gallery.speed = 300

				//seta aspect ratio das imagens
				gallery.setRatio(16, 9.61);

				//seta esquerda				
				$('#image-container .left').click(function() {

					gallery.back();

				});

				//seta direita
				$('#image-container .right').click(function() {

					gallery.forth();

				});

				//botao fechar
				$('#image-container span').click(function() {

					gallery.close();

					//IE Bug Fix
					if(navigator.userAgent.search('Trident') > -1) {

						$('.header').fadeOut(0, function() {
							$(this).fadeIn(200);
						});
					}

				});

			});

		</script>

	</body>

</html>