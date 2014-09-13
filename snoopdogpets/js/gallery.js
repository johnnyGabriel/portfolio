var gallery = {

	//array com imagens
	imagens: [],

	//imagem selecionada
	atual: 0,

	//elementos graficos
	container: "",
	visualizador: "",
	visualizador_img: "",
	seta_prox: "",
	seta_ant: "",
	btn_fec: "",
	btn_max: "",

	//velocidade transicao
	speed: 500,

	init: function(_container, _visualizador, _seta_prox, _seta_ant, _btn_fec, _btn_max) {

		//inicializa as variaveis
		this.container = _container;
		this.visualizador = _visualizador;
		this.seta_prox = _seta_prox;
		this.seta_ant = _seta_ant;
		this.btn_fec = _btn_fec;
		this.btn_max = _btn_max;

		//marca thumbs com ids
		var thumbs = $(this.container).find('img');
		for(i=0; x=thumbs.length, i < x; i++)
		{
			$(thumbs[i]).attr('id', 'img-'+i);
		}

		//inicializa o vetor
		this.imagens = thumbs.toArray();

		//inicializa visualizador
		$(this.visualizador).append('<img src="" alt="" />');
		this.visualizador_img = $(this.visualizador).find('img');

		//evento de click nas thumbs
		$(this.container+' img').click(function(e) {
			
			gallery.open(e.target.id.substring(4));

		});

	},

	open: function(_id) {

		if(typeof(_id) == 'undefined')
		{
			this.setAtual(0);

		} else {

			this.setAtual(_id);			
		}
		console.log(this.atual);
		$(this.visualizador_img).attr('src', this.getFullImageURL(this.imagens[this.atual].src));
		$(this.visualizador).fadeIn(this.speed);
		
		
	},

	close: function() {

		$(this.visualizador).fadeOut(this.speed);
		close();
	},  

	prox: function() {

		if(this.atual == this.imagens.length-1)
		{
			this.atual = 0;

		} else {
			this.atual++;
		}

		this.open(this.atual);
	},

	ant: function() {

		if(this.atual == 0)
		{
			this.atual = this.imagens.length-1;

		} else {
			this.atual--;
		}

		this.open(this.atual);
	},

	maximize: function() {

		var path = gallery.imagens[gallery.atual].src;
		window.open(path, '_blank');

	},

	setAtual: function(_id) {

		this.atual = _id;

	},

	getFullImageURL:function(_url) {

		return _url.replace('thumbs/', '');

	}




}