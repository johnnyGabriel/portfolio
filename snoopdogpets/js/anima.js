var anima = {


	i: null,
	container: null,
	imagens: [],
	speed: 'normal',
	auto_interval : null,
	timer: null,
	state: false,


	init: function(_container) {

		//inicializa as variaveis
		anima.container = _container;
		anima.imagens = gallery.imagens;

		//cria lista grafica de imagens no container
		$(anima.container).append('<ul><li id="li0" style="border: 0"></li></ul>');

		//preenche a lista
		for(var i=0, x=anima.imagens.length; i < x; i++)
		{
			var html = "<li id='li"+(i+1)+"' style='background: url("+gallery.getFullImageURL(anima.imagens[i].src)+") 0% 0% / cover;'></li>";
			$(anima.container+' ul').append(html);
		}		

		//eventos
		$('img').click(function(e) {
			
			anima.open(parseInt(e.target.id.substring(4)));

		});

	},

	open: function(_id) {

		//checa se _id é válido
		if((_id > anima.imagens.length) || (_id < 1) || (_id == undefined)) return false; 

		//checa se container esta ativo
		if(anima.state == false)
		{
			$(anima.container).fadeIn('fast');
			anima.state = true;

			if(_id == anima.i) return false;
		}

		//checa se é a primeira abertura de imagem
		if(anima.i === null) {

			anima.i = _id;

			$('#li'+(anima.i-1)).show( 0, function() {

				$(this).animate({
					width: '10%'
				}, anima.speed);

			});

			$('#li'+anima.i).show( 0, function() {

				$(this).animate({
					width: '79.5%'
				}, anima.speed);

			});

			$('#li'+(anima.i+1)).show( 0, function() {

				$(this).animate({
					width: '10%'
				}, anima.speed);

			});

			return false;

		}

		//armazena o _id anterior para uso posterior em animate
		var old_id = anima.i;
		anima.i = _id

		//esconde imagens anteriores
		$('#li'+(old_id+1)).animate({

			width: '0%'

		}, anima.speed, function() {

			$(this).hide();

		});

		$('#li'+(old_id)).animate({

			width: '0%'

		}, anima.speed, function() {

			$(this).hide();
			
		});

		$('#li'+(old_id-1)).animate({

			width: '0%'

		}, anima.speed, function() {

			$(this).hide();
			
		});


		//mostra imagens atuais
		$('#li'+(anima.i+1)).show( 0, function() {

			$(this).animate({
				width: '10%'
			}, anima.speed);

		});

		$('#li'+(anima.i)).show( 0, function() {

			$(this).animate({
				width: '79.5%'
			}, anima.speed);

		});

		$('#li'+(anima.i-1)).show( 0, function() {

			$(this).animate({
				width: '10%'
			}, anima.speed);

		});

	},

	close: function() {

		//checa se container esta ativo
		if(anima.state == true)
		{
			anima.stop();
			$(anima.container).fadeOut('fast');
			anima.state = false;
		}

	},

	front: function() {

		if((anima.i == anima.imagens.length) || (anima.state == false))return false;

		anima.i++;
		

		$('#li'+(anima.i-2)).animate({

			width: '0%'

		}, anima.speed, function() {

			$(this).hide(0);

		});

		$('#li'+(anima.i-1)).show( 0, function() {

			$(this).animate({
				width: '10%'
			}, anima.speed);

		});

		$('#li'+anima.i).show( 0, function() {

			$(this).animate({
				width: '79.5%'
			}, anima.speed);

		});

		$('#li'+(anima.i+1)).show( 0, function() {

			$(this).animate({
				width: '10%'
			}, anima.speed);

		});

	},

	back: function() {

		if((anima.i == 1) || (anima.state == false)) return false;

		anima.i--;
		

		$('#li'+(anima.i+2)).animate({

			width: '0%'

		}, anima.speed, function() {

			$(this).hide(0);

		});	

		$('#li'+(anima.i+1)).show( 0, function() {

			$(this).animate({
				width: '10%'
			}, anima.speed);

		});

		$('#li'+anima.i).show( 0, function() {

			$(this).animate({
				width: '79.5%'
			}, anima.speed);

		});

		$('#li'+(anima.i-1)).show( 0, function() {

			$(this).animate({
				width: '10%'
			}, anima.speed);

		});

	},

	auto: function(_interval) {

		if(_interval == undefined) _interval = 3000;
		if((anima.i == null) || ($(anima.container).css('display') == 'none')) anima.open(1);

		anima.auto_interval = _interval;
		var length = anima.imagens.length;

		if(anima.i == length)
		{
			anima.timer = setInterval(function() {

				if(anima.i == 1) {
					anima.stop();
					anima.auto(_interval);
					return false;
				} 

				anima.back();

			}, anima.auto_interval);

		} else if(anima.i == 1) {

			anima.timer = setInterval(function() {

				if(anima.i == length) {
					anima.stop();
					anima.auto(_interval);
					return false;
				}

				anima.front();

			}, anima.auto_interval);
			
		} else {

			anima.timer = setInterval(function() {

				if(anima.i == length) {
					anima.stop();
					anima.auto(_interval);
					return false;
				}

				anima.front();

			}, anima.auto_interval);

		}

	},

	stop: function() {

		clearInterval(anima.timer);

	},

	log: function() {

		console.log("i, "+anima.i);

		console.log("li"+(anima.i-2)+", display: "+$('#li'+(anima.i-2)).css('display')+", width: "+$('#li'+(anima.i-2)).css('width'));
		console.log("li"+(anima.i-1)+", display: "+$('#li'+(anima.i-1)).css('display')+", width: "+$('#li'+(anima.i-1)).css('width'));
		console.log("li"+anima.i+", display: "+$('#li'+anima.i).css('display')+", width: "+$('#li'+anima.i).css('width'));
		console.log("li"+(anima.i+1)+", display: "+$('#li'+(anima.i+1)).css('display')+", width: "+$('#li'+(anima.i+1)).css('width'));
		console.log("li"+(anima.i+2)+", display: "+$('#li'+(anima.i+2)).css('display')+", width: "+$('#li'+(anima.i+2)).css('width'));
		console.log("li"+(anima.i+3)+", display: "+$('#li'+(anima.i+3)).css('display')+", width: "+$('#li'+(anima.i+3)).css('width'));

	}

}