var anima = {


	i: 1,
	speed: 'normal',
	interval: 1000,
	container: '',
	imagens: '',


	init: function(_container) {

		//inicializa as variaveis
		anima.container = _container;
		anima.imagens = gallery.imagens;

		//cria lista grafica de imagens no container
		$(anima.container).append('<ul><li id="li0" style="border: 0"></li></ul>');

		//preenche a lista
		for(i=0; x=anima.imagens.length,i < x; i++)
		{
			var html = "<li id='li"+(i+1)+"' style='background: url("+gallery.getFullImageURL(anima.imagens[i].src)+") 0% 0% / cover;'></li>";
			$(anima.container+' ul').append(html);
		}		

	},

	front: function() {

		anima.log();

		timer = setInterval(function() {

			if(anima.i == anima.imagens.length+1)
			{

				clearInterval(timer);
				anima.i-=2;
				anima.back();

			} else {

				anima.log();

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
						width: '79%'
					}, anima.speed);

				});

				$('#li'+(anima.i+1)).show( 0, function() {

					$(this).animate({
						width: '10%'
					}, anima.speed);

				});


				anima.i++;

			}

		}, anima.interval)
	},


	back: function() {

		anima.log();

		timer = setInterval(function() {

			if(anima.i == 0)
			{

				clearInterval(timer);
				anima.i+=2;
				anima.front();

			} else {

				anima.log();

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
						width: '79%'
					}, anima.speed);

				});

				$('#li'+(anima.i-1)).show( 0, function() {

					$(this).animate({
						width: '10%'
					}, anima.speed);

				});

				anima.i--;
				
			}

		}, anima.interval)
	},

	log: function() {

		console.log("i, "+anima.i);

		console.log("li"+(anima.i-2)+", "+$('#li'+(anima.i-2)).css('width'));
		console.log("li"+(anima.i-1)+", "+$('#li'+(anima.i-1)).css('width'));
		console.log("li"+anima.i+", "+$('#li'+anima.i).css('width'));
		console.log("li"+(anima.i+1)+", "+$('#li'+(anima.i+1)).css('width'));
		console.log("li"+(anima.i+2)+", "+$('#li'+(anima.i+2)).css('width'));
		console.log("li"+(anima.i+3)+", "+$('#li'+(anima.i+3)).css('width'));

	}

}