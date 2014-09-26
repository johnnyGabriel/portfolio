var gallery = {

	running: null,
	container: null,
	imagens: [],
	speed: 'normal',
	auto_interval : null,
	timer: null,
	state: false,
	busy: false,


	init: function(_container) {

		//inicializa as variaveis
		gallery.container = _container;

		//marca thumbs com ids *#gallery = container de thumbs*
		var thumbs = $('#gallery').find('img');
		for(i=0; x=thumbs.length, i < x; i++)
		{
			$(thumbs[i]).attr('id', 'img-'+(i+1));
		}

		//inicializa o vetor de imagens
		this.imagens = thumbs.toArray();

		//cria ul de imagens no container
		$(gallery.container).append('<ul><li id="li0" style="border: 0"></li></ul>');

		//preenche a ul
		var i,
			x = gallery.imagens;
		for(i=0; i < x.length; i++)
		{
			var html = "<li id='li"+(i+1)+"' style='background: url("+gallery.getFullImageURL(x[i].src)+") 0% 0% / cover;'></li>";
			$(gallery.container+' ul').append(html);
		}		

		//organiza os elementos de acordo com a resolução
		gallery.resize();

		//eventos
		$('#gallery img').click(function(e) {
			
			gallery.open(parseInt(e.target.id.substring(4)));

		});

		$(window).resize(function() {

			gallery.resize();

		});

	},

	resize: function() {

		var img_width = (79.5 * $(window).width()) /100;
		var img_height_ratio = (img_width/16) *9.6;
		var img_margin = ($(window).height() - img_height_ratio) /2;

		$(gallery.container+' ul').animate({

			height: img_height_ratio,
			marginTop: img_margin
			
		}, gallery.speed);

	},

	open: function(_id) {

		//checa se _id é válido
		if((_id > gallery.imagens.length) || (_id < 1) || (_id == undefined)) return false; 

		//checa se container esta ativo
		if(gallery.state == false)
		{
			$(gallery.container).fadeIn('fast');
			gallery.state = true;

			if(_id == gallery.running) return false;
		}

		//checa se é a primeira abertura de imagem
		if(gallery.running === null) {

			gallery.running = _id;

			$('#li'+(gallery.running-1)).show( 0, function() {

				$(this).animate({
					width: '10%'
				}, gallery.speed);

			});

			$('#li'+gallery.running).show( 0, function() {

				$(this).animate({
					width: '79.5%'
				}, gallery.speed);

			});

			$('#li'+(gallery.running+1)).show( 0, function() {

				$(this).animate({
					width: '10%'
				}, gallery.speed);

			});

			return false;

		}

		//armazena o _id anterior para uso posterior em animate
		var old_id = gallery.running;
		gallery.running = _id

		//esconde imagens anteriores
		$('#li'+(old_id+1)).animate({

			width: '0%'

		}, gallery.speed, function() {

			$(this).hide();

		});

		$('#li'+(old_id)).animate({

			width: '0%'

		}, gallery.speed, function() {

			$(this).hide();
			
		});

		$('#li'+(old_id-1)).animate({

			width: '0%'

		}, gallery.speed, function() {

			$(this).hide();
			
		});


		//mostra imagens atuais
		$('#li'+(gallery.running+1)).show( 0, function() {

			$(this).animate({
				width: '10%'
			}, gallery.speed);

		});

		$('#li'+(gallery.running)).show( 0, function() {

			$(this).animate({
				width: '79.5%'
			}, gallery.speed);

		});

		$('#li'+(gallery.running-1)).show( 0, function() {

			$(this).animate({
				width: '10%'
			}, gallery.speed);

		});

	},

	close: function() {

		//checa se container esta ativo
		if(gallery.state == true)
		{
			gallery.stop();
			$(gallery.container).fadeOut('fast');
			gallery.state = false;
		}

	},

	forth: function() {

		if((gallery.busy == true) ||(gallery.running == gallery.imagens.length) || (gallery.state == false))return false;

		gallery.running++;
		gallery.busy = true;		
		setTimeout(function() {

			gallery.busy = false;

		}, (isNaN(gallery.speed)) ? jQuery.speed(gallery.speed).duration : gallery.speed);


		$('#li'+(gallery.running-2)).animate({

			width: '0%'

		}, gallery.speed, function() {

			$(this).hide(0);

		});

		$('#li'+(gallery.running-1)).show( 0, function() {

			$(this).animate({
				width: '10%'
			}, gallery.speed);

		});

		$('#li'+gallery.running).show( 0, function() {

			$(this).animate({
				width: '79.5%'
			}, gallery.speed);

		});

		$('#li'+(gallery.running+1)).show( 0, function() {

			$(this).animate({
				width: '10%'
			}, gallery.speed);

		});

	},

	back: function() {

		if((gallery.busy == true) ||(gallery.running == 1) || (gallery.state == false)) return false;

		gallery.running--;
		gallery.busy = true;	
		setTimeout(function() {

			gallery.busy = false;

		}, (isNaN(gallery.speed)) ? jQuery.speed(gallery.speed).duration : gallery.speed);	

		$('#li'+(gallery.running+2)).animate({

			width: '0%'

		}, gallery.speed, function() {

			$(this).hide(0);

		});	

		$('#li'+(gallery.running+1)).show( 0, function() {

			$(this).animate({
				width: '10%'
			}, gallery.speed);

		});

		$('#li'+gallery.running).show( 0, function() {

			$(this).animate({
				width: '79.5%'
			}, gallery.speed);

		});

		$('#li'+(gallery.running-1)).show( 0, function() {

			$(this).animate({
				width: '10%'
			}, gallery.speed);

		});

	},

	auto: function(_interval) {

		if(_interval == undefined) _interval = 3000;
		if((gallery.running == null) || ($(gallery.container).css('display') == 'none')) gallery.open(1);

		gallery.auto_interval = _interval;
		var length = gallery.imagens.length;

		if(gallery.running == length)
		{
			gallery.timer = setInterval(function() {

				if(gallery.running == 1) {
					gallery.stop();
					gallery.auto(_interval);
					return false;
				} 

				gallery.back();

			}, gallery.auto_interval);

		} else if(gallery.running == 1) {

			gallery.timer = setInterval(function() {

				if(gallery.running == length) {
					gallery.stop();
					gallery.auto(_interval);
					return false;
				}

				gallery.forth();

			}, gallery.auto_interval);
			
		} else {

			gallery.timer = setInterval(function() {

				if(gallery.running == length) {
					gallery.stop();
					gallery.auto(_interval);
					return false;
				}

				gallery.forth();

			}, gallery.auto_interval);

		}

	},

	stop: function() {

		clearInterval(gallery.timer);

	},

	maximize: function() {

		var path = gallery.imagens[gallery.running].src;
		window.open(path, '_blank');

	},

	getFullImageURL:function(_url) {

		return _url.replace('thumbs/', '');

	},

	log: function() {

		var x = gallery.running;

		console.log('busy, '+gallery.busy);
		console.log("running, "+x);
		console.log("li"+(x-2)+", display: "+$('#li'+(x-2)).css('display')+", width: "+$('#li'+(x-2)).css('width'));
		console.log("li"+(x-1)+", display: "+$('#li'+(x-1)).css('display')+", width: "+$('#li'+(x-1)).css('width'));
		console.log("li"+x+", display: "+$('#li'+x).css('display')+", width: "+$('#li'+x).css('width'));
		console.log("li"+(x+1)+", display: "+$('#li'+(x+1)).css('display')+", width: "+$('#li'+(x+1)).css('width'));
		console.log("li"+(x+2)+", display: "+$('#li'+(x+2)).css('display')+", width: "+$('#li'+(x+2)).css('width'));
		console.log("li"+(x+3)+", display: "+$('#li'+(x+3)).css('display')+", width: "+$('#li'+(x+3)).css('width'));

	}

}