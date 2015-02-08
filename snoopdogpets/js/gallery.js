var gallery = {

	running: null, //flag (id da imagem mostrada atual)
	speed: 'normal', //velocidade de transições
	timer: null, //timer do método auto (troca automatica de imagens)
	timer_interval : null, //intervalo de tempo do timer
	state: false, //flag (galeria aberta ou nao)
	busy: false, //flag (imagens em transição ou não)
	images: [], //array com lista de elementos li com imagens
	container: null, //container da galeria
	thumbs: null, //array com lista de imagens de thumb
	dimensions: {center: 79.6, sides: 9.7}, //dimensões das imagens na tela
	ratio: {width: 16, height: 9}, //aspect ratio das imagens

	//inicializa a galeria
	init: function(_container, _thumbs) {

		//inicializa as variaveis
		gallery.container = _container;
		gallery.thumbs = $(_thumbs).find('img');

		//marca thumbs com ids
		var l = gallery.thumbs.length;
		for(i=0; x=l, i < x; i++)
		{
			$(gallery.thumbs[i]).attr('id', 'img-'+(i+1));
		}

		//cria ul de imagens no container
		$(gallery.container).append('<ul><li id="li0"></li></ul>');

		//cria as li's com imagens
		var i,
			x = gallery.thumbs,
			html = '';
		for(i=1; i < x.length+1; i++)
		{
			html = "<li id='li"+i+"'><div></div></li>";
			$(gallery.container+' ul').append(html);
		}	

		//preenche o array images com as li's
		gallery.images = $(gallery.container+' ul').find('li');

		//organiza os elementos de acordo com a resolução
		gallery.resize();

		/*
		EVENTOS
		*/
		//evento de click em thumbs
		$('#gallery img').click(function(e) {
			
			gallery.open(parseInt(e.target.id.substring(4)));

		});

		//evento de resize da tela
		$(window).resize(function() {

			gallery.resize();

		});

	},

	//seta as dimensões das imagens na tela
	setDimensions: function(_center, _sides) {

		this.dimensions.center = _center;
		this.dimensions.sides = _sides;

	},

	//seta o aspect ratio das imagens
	setRatio: function(_width, _height) {

		this.ratio.width = _width;
		this.ratio.height = _height;
		this.resize();

	},

	//realiza o resize dos elementos
	resize: function() {

		var img_width = parseFloat(((gallery.dimensions.center * $(window).width()) /99).toFixed(2));
		var img_height_ratio = parseFloat(((img_width/this.ratio.width) * this.ratio.height).toFixed(2));
		var img_margin = parseFloat((($(window).height() - img_height_ratio) /2).toFixed(2));

		$(gallery.container+' ul').animate({

			height: img_height_ratio,
			marginTop: img_margin
			
		}, gallery.speed);

	},

	//carrega as imagens (2 < atual > 2)
	load: function(_id) {

		var elem = gallery.images,
			path = '',
			//array com id de imagens a carregar
			order = [_id, _id-1, _id+1, _id-2, _id+2],
			//indice de controle do array order
			i = 0;
			//variavel de controle de carregamento
			if(window.statusLoad == undefined) statusLoad = [];

		function rec(_id) {

			var thumb = gallery.thumbs[order[i]-1];

			if(i == order.length) {

				return false;

			} else if((statusLoad[order[i]] == true) || (thumb == undefined)) {

				rec(++i);
				return false;

			}

			var e = elem[order[i]],				
				path = gallery.getFullImageURL(thumb.src);
				statusLoad[order[i]] = true;

			$.get(path)

				.done(function() {

					$(e).css("background", "url("+ path +") 0% 0% / cover");

					setTimeout(function() {

						$(e).find('div').fadeOut('normal');
						rec(++i);

					}, 200);

				})

				.fail(function() {

					statusLoad[order[i]] = false;
					rec(++i);

				});
		}

		rec(_id);

	},

	//pula para determinada imagem (pelo id), diferente do open, este vai percorrendo as imagens
	jump: function(_id) {

		var index=1,
			times = Math.abs(gallery.running - _id),
			storeSpeed = gallery.speed,
			tempSpeed = 200,
			interval = 0,
			command = "";

		(_id > gallery.running) ? command = gallery.forth : command = gallery.back;

		gallery.speed = tempSpeed;

		function rec(index) {

			if(index <= times) {

				setTimeout(function() {

					command();
					rec(++index);

				}, interval);

				interval = gallery.speed;
				

			} else {

				gallery.speed = storeSpeed;
				return false;

			}

		}

		rec(index);

	},

	//abre determinada imagem (pelo id)
	open: function(_id) {

		//checa se _id é válido
		if((_id > gallery.images.length) || (_id < 1) || (_id == undefined)) return false; 

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
			gallery.load(gallery.running);
			

			$('#li'+(gallery.running-1)).show( 0, function() {

				$(this).animate({
					width: gallery.dimensions.sides+'%'
				}, gallery.speed);

			});

			$('#li'+gallery.running).show( 0, function() {

				$(this).animate({
					width: gallery.dimensions.center+'%'
				}, gallery.speed);

			});

			$('#li'+(gallery.running+1)).show( 0, function() {

				$(this).animate({
					width: gallery.dimensions.sides+'%'
				}, gallery.speed);

			});

			return false;

		}

		if((_id >= gallery.running-2) && (_id <= gallery.running+2)) {
			
			gallery.jump(_id);
			return false;

		}

		//armazena o _id anterior para uso posterior em animate
		var old_id = gallery.running;
		gallery.running = _id;
		gallery.load(gallery.running);

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
				width: gallery.dimensions.sides+'%'
			}, gallery.speed);

		});

		$('#li'+(gallery.running)).show( 0, function() {

			$(this).animate({
				width: gallery.dimensions.center+'%'
			}, gallery.speed);

		});

		$('#li'+(gallery.running-1)).show( 0, function() {

			$(this).animate({
				width: gallery.dimensions.sides+'%'
			}, gallery.speed);

		});

	},

	//fecha a galeria
	close: function() {

		//checa se container esta ativo
		if(gallery.state == true)
		{
			gallery.stop();
			$(gallery.container).fadeOut('fast');
			gallery.state = false;
		}

	},

	//pula para a imagem posterior
	forth: function() {

		if((gallery.busy == true) ||(gallery.running == gallery.images.length-1) || (gallery.state == false))return false;

		gallery.running++;
		gallery.load(gallery.running);
		gallery.busy = true;		
		setTimeout(function() {

			gallery.busy = false;

		}, (isNaN(gallery.speed)) ? jQuery.speed(gallery.speed).duration : gallery.speed);

		//gallery.open(gallery.running);
		
		$('#li'+(gallery.running-2)).animate({

			width: '0%'

		}, gallery.speed, function() {

			$(this).hide(0);

		});

		$('#li'+(gallery.running-1)).show( 0, function() {

			$(this).animate({
				width: gallery.dimensions.sides+'%'
			}, gallery.speed);

		});

		$('#li'+gallery.running).show( 0, function() {

			$(this).animate({
				width: gallery.dimensions.center+'%'
			}, gallery.speed);

		});

		$('#li'+(gallery.running+1)).show( 0, function() {

			$(this).animate({
				width: gallery.dimensions.sides+'%'
			}, gallery.speed);

		});	

	},

	//pula para a imagem anterior
	back: function() {

		if((gallery.busy == true) ||(gallery.running == 1) || (gallery.state == false)) return false;

		gallery.running--;
		gallery.load(gallery.running);
		gallery.busy = true;	
		setTimeout(function() {

			gallery.busy = false;

		}, (isNaN(gallery.speed)) ? jQuery.speed(gallery.speed).duration : gallery.speed);	

		//gallery.open(gallery.running);
		
		$('#li'+(gallery.running+2)).animate({

			width: '0%'

		}, gallery.speed, function() {

			$(this).hide(0);

		});	

		$('#li'+(gallery.running+1)).show( 0, function() {

			$(this).animate({
				width: gallery.dimensions.sides+'%'
			}, gallery.speed);

		});

		$('#li'+gallery.running).show( 0, function() {

			$(this).animate({
				width: gallery.dimensions.center+'%'
			}, gallery.speed);

		});

		$('#li'+(gallery.running-1)).show( 0, function() {

			$(this).animate({
				width: gallery.dimensions.sides+'%'
			}, gallery.speed);

		});

	},

	//pula as imagens automaticamente
	auto: function(_interval) {

		if(_interval == undefined) _interval = 3000;
		if((gallery.running == null) || ($(gallery.container).css('display') == 'none')) gallery.open(1);

		gallery.timer_interval = _interval;
		var length = gallery.images.length-1;

		if(gallery.running == length)
		{
			gallery.timer = setInterval(function() {

				if(gallery.running == 1) {
					gallery.stop();
					gallery.auto(_interval);
					return false;
				} 

				gallery.back();

			}, gallery.timer_interval);

		} else if(gallery.running == 1) {

			gallery.timer = setInterval(function() {

				if(gallery.running == length) {
					gallery.stop();
					gallery.auto(_interval);
					return false;
				}

				gallery.forth();

			}, gallery.timer_interval);
			
		} else {

			gallery.timer = setInterval(function() {

				if(gallery.running == length) {
					gallery.stop();
					gallery.auto(_interval);
					return false;
				}

				gallery.forth();

			}, gallery.timer_interval);

		}

	},

	//para de pular as imagens automaticamente
	stop: function() {

		clearInterval(gallery.timer);

	},

	//abre a imagem completa em nova aba
	maximize: function() {

		var path = gallery.images[gallery.running].src;
		window.open(path, '_blank');

	},

	//obtem o caminho da imagem completa pela sua thumb
	getFullImageURL:function(_url) {

		return _url.replace('thumbs/', '');

	},

	//log de elementos em tela
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