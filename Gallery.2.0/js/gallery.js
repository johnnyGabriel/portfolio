var gallery = {};

$(function() {
	
	gallery = {

		index: 0, //índice da imagem atual
		divs: [], //array com as divs containers de imagens
		images: [], //array com as urls das imagens
		positions: [], //array com as posições das imagens
		width: null, //largura das imagens
		maxWidth: null, //largura máxima das imagens
		margin: 20, //margin entre as imagens
		speed: 'normal', //velocidade de animações e transições
		container: null, //elemento container das imagens
		loader: null,//caminho da imagem de loader
		horizontalSpace: 0, //valor de raio da sobra de tela horizontal (usado para posicionar a imagem no centro)

		init: function(options) {

			//seta valores às variaveis
			if(typeof(options) != 'undefined') {

				if(typeof(options.container) != 'undefined')
					this.container = options.container;

				if(typeof(options.maxWidth) != 'undefined')
					this.maxWidth = options.maxWidth;

				if(typeof(options.margin) != 'undefined')
					this.margin = options.margin;

				if(typeof(options.speed) != 'undefined')
					this.speed = options.speed;

				if(typeof(options.images) != 'undefined')
					this.images = options.images;

				if(typeof(options.loader) != 'undefined')
					this.loader = options.loader;

			}

			//preenche o container com o codigo das imagens
			var html = '';

			$.each(this.images, function(index) {
				 
				html +=  "<div>"+
						 	"<div style='display: none' class='image'>"+
						 		"<img id='img-"+ index +"' />"+
						 	"</div>"+	
						 	"<div class='loading'>"+
							   "<div>"+
									"<img src='"+ gallery.loader +"' />"+
								"</div>"+
						 	"</div>"+				 		
					 	"</div>";
			});

			this.container.html(html);

			//preenche o array divs com as divs containers das imagens
			this.divs = this.container.children('div');
			
			//chama o método de ajuste de elementos na tela - delay de 1s para rodar após a inserção do código acima
			setTimeout(function() {
				gallery.adjustScreen();
			}, 1000);

			//define um evento de resize de tela
			$(window).resize(function() {
				gallery.adjustScreen();
			});

			//define um evento de click nas imagens
			$(this.container).find('.image').on('click', function(e) {
				var id = (e.currentTarget.children[0].id).split('-')[1];
				gallery.open(parseInt(id));
			});
			
		},

		adjustScreen: function() {

			var screenWidth = $(window).width(),
				screenHeight = $(window).height(),
				imageWidth = 0, //variavel com a largura definida das imagens
				imageLeft = 0; //variavel com o left que a imagem processada deverá assumir

			//reseta o array de posições de imagens
			this.positions = [];

			//seta a altura do container
			$(this.container).height(screenHeight);

			//calcula a largura da imagem de acordo com o tamanho da tela
			switch(true) {

				case screenWidth < 1200:
					imageWidth = 800;
					break;

				case screenWidth < 1400:
					imageWidth = 1000;
					break;

				case screenWidth < 1600:
					imageWidth = 1200;
					break;

				case screenWidth > 1600:
					imageWidth = 1400;
					break;
			}

			//verifica se a largura escolhida é maior que maxWidth definida pelo usuário
			if((this.maxWidth !== null) && (imageWidth > this.maxWidth))
				imageWidth = this.maxWidth;

			//seta a largura das imagens como igual a imageWidth
			this.width = imageWidth;

			//calcula o espaço de sobra horizontal - usado para centralizar a imagem atual e deixar uma parte da imagem anteior e seguinte à mostra
			this.horizontalSpace = (((screenWidth / this.width) - 1) * this.width) / 2;

			//seta a largura nos containers das imagens
			this.container.children().css('width', this.width);

			//posiciona todas as imagens
			this.container.children().each(function(index, el) {

				//verifica a primeira execução para nao acrescentar o espaço de uma imagem no left da primeira imagem
				if (index === 0)
				    imageLeft += gallery.margin;
				else
				    imageLeft += (gallery.margin + gallery.width);

				//seta o left da imagem
				$(el).css('left', imageLeft);

				//acrescenta o left da imagem atual ao array de posições das imagens
				gallery.positions.push(imageLeft);

			});

		},

		//carrega as imagens (2 < atual > 2)
		load: function(index) {
			
			var order = [index, index-1, index+1, index-2, index+2], //array com id de imagens a carregar
				i = 0, //indice de controle do array order
				currentImage; //variavel que guarda a imagem sendo processada

			//array com status do carregamento das imagens
			if(this.statusLoad === undefined)
				this.statusLoad = [];

			function rec(i) {

				//verificação de overflow do array order
				if(i == order.length)
					return false;

				//seta o valor de currentImage se for diferente de undefined, caso nao seja chama novamente a funcao e para a execucao atual
				if(typeof(gallery.images[order[i]]) != 'undefined')
					currentImage = gallery.images[order[i]];
				else {
					rec(++i);
					return;
				}				

				//verifica no array statusLoad se a imagem ja foi carregada anteriormente
				var status = gallery.statusLoad[order[i]];
				if(status) {
					rec(++i);
					return false;
				}

				//realiza a requisição da imagem no servidor
				$.get(currentImage)

					.done(function() {

						//insere a imagem na tag img
						var el = $(gallery.divs[order[i]]).find('.image');
						el.find('img').attr('src', currentImage);

						//marca no array statusLoad que a imagem atual já foi carregada e nao precisara novamente
						gallery.statusLoad[order[i]] = true;
						rec(++i);
						
						setTimeout(function() {

							el.fadeIn(gallery.speed, function() {
								$(this).next('.loading').hide(0);
							});

						}, 100);

					})

					.fail(function() {

						//marca no array statusLoad que o carregamento da imagem falhou
						gallery.statusLoad[order[i]] = false;
						rec(++i);

					});
			}

			rec(i);

		},

		open: function(pos) {

			if((pos < 0) || (pos > this.images.length-1))
				return false;

			//chama o método de carregamento das imagens
			this.load(pos);	

			if(this.positions.length === 0) {

				setTimeout(function() {
					gallery.open(pos);
				}, 500);
				return false;

			}

			//obtem a posição left da imagem atraves do array de position - adiciona tbm o horizontalSpace (valor de sobra para a imagem ficar centralizada)
			var left = -this.positions[pos] + this.horizontalSpace;

			//seta o valor left ao container
			this.container.stop().animate({'left': left}, this.speed);

			//define o índice como igual a 'pos' fornecida
			this.index = pos;

		},

		back: function() {

			//chama o método open() subtraindo 1 do índice
			if(this.index !== 0)
				this.open(--this.index);

		},

		forth: function() {

			//chama o método open() adicionando 1 ao indíce
			if(this.index != this.images.length-1)
				this.open(++this.index);

		},

		auto: function(interval) {

			//se interval nao for informado define ele como igual a speed
			if(typeof(interval) == 'undefined')
				interval = this.speed;

			//checa se o valor de interval é um valor speed do jQuery para convertelo para numero
			if(isNaN(interval))
				interval = jQuery.speed(this.speed).duration;

			//define a direção como 'para frente'
			var direction = 'forth';

			//abre a imagem do index atual para começar a transição automatica
			this.open(this.index);

			//pára qualquer outra instancia anterior do setInterval
			this.stop();

			//define o timer que executara as trocas de tempos em tempos
			gallery.interval = setInterval(function() {

				//se alcançar o numero maximo de imagens define a direção como 'para trás'
				if(gallery.index == gallery.positions.length-1)
					direction = 'back';

				//se alcançar o numero minimo de imagens define a direção como 'para frente'
				else if(gallery.index === 0)
					direction = 'forth';

				//chama o metodo forth() se direção for 'para frente'
				if(direction == 'forth')
					gallery.forth();

				//chama o método back() se direção for 'para trás'
				else if(direction == 'back')
					gallery.back();

			}, interval);

		},

		stop: function() {
			//pára o timer
			clearInterval(this.interval);

		}

	};

});