<?php

	include "../php/mySQL.class.php";

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
	<link rel="stylesheet" href="../css/projetos.css" type="text/css" />
	<link rel="stylesheet" href="../Gallery.2.0/css/gallery.min.css"  type="text/css" />
	<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300italic,700,300' type='text/css' />
</head>

	<body>

		<div id="gallery">
		</div>

		<div class="container">

			<div style="background: url('img/cover.jpg')" class="header"></div>

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
					<div id="gallery-thumbs">
						<? echo $res->galeria ?>
					</div>

				</div>

			</div>
		</div>

		<script type="text/javascript" src="../js/jquery.1.11.1.min.js"></script>
		<script type="text/javascript" src="../js/jquery-scrolltofixed-min.js"></script>
		<script type="text/javascript" src="../Gallery.2.0/js/gallery.min.js"></script>
		<script type="text/javascript">

			$(document).ready(function() {

				/*

				Menu Fixed

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

				Galeria
				
				*/

				//inicialização da galeria
				var imgs = [],
	        		container = $('#gallery');

	        	$.each($('#gallery-thumbs').find('img'), function(i, val) {
					imgs.push(val.src.replace('thumbs/', ''));
				});

        		gallery.init({
        			'container': container,
        			'images': imgs,
        			'loader': '../images/loader.gif',
        			'speed': 300,
        			'maxWidth': 1280
        		});

        		//evento de click das thumbs
        		$('#gallery-thumbs img').on('click', function(e) {

        			$('.container').fadeOut('fast');
        			$('#gallery').fadeIn('fast', function() {

        				var id = (e.currentTarget.src).split('/');
	        			id = id[id.length-1].split('.')[0];

	        			gallery.open(parseInt(id-1));

        			});

        			

        			setTimeout(function() {

        				var html =  "<span class='btn-close'>"+
        								"<img src='../images/Close-icon.png' />"
        							"</span>";
        				$('#gallery').prepend(html);

        				//evento do botão fechar galeria
		        		$('.btn-close img').on('click', function() {
		        			$('#gallery').fadeOut('normal');
		        			$('.container').fadeIn('normal');
		        		});

        			}, 1000);

        		});

				/*	//IE Bug Fix
					if(navigator.userAgent.search('Trident') > -1) {

						$('.header').fadeOut(0, function() {
							$(this).fadeIn(200);
						});
					}

				});*/

			});

		</script>

	</body>

</html>