	$(document).ready(function() {

		$('#gallery img').click(function(e) {

			gallery.create(e);
			gallery.show();

		});

		$('#close').click(function() {

			gallery.hide();

		});

		$('#expand').click(function() {

			gallery.expand();

		});

		$('#previous').click(function() {

			gallery.prev();

		});

		$('#next').click(function() {

			gallery.next();

		});



		var gallery = {

			obj_img: $('#image-viewer').find('img'),
			selected: "",
			imgs: [],

			create: function(e)
			{
				this.imgs = $('#gallery').find('img').toArray();
				var s = e.target.src;
				var i = 0;
				while(s != this.imgs[i].src)
				{
					i++;
				}
				this.selected = i;
				$(this.obj_img).attr('src', this.replaceURL(this.imgs[this.selected].src));
			},

			prev: function()
			{
				var new_selected = this.selected-1;

				if(new_selected < 0)
				{
					new_selected = this.imgs.length-1;
				}

				$(this.obj_img).attr('src', this.replaceURL(this.imgs[new_selected].src));
				this.selected = new_selected;
			},

			next: function()
			{
				var new_selected = this.selected+1;

				if(new_selected > this.imgs.length-1)
				{
					new_selected = 0;
				}

				$(this.obj_img).attr('src', this.replaceURL(this.imgs[new_selected].src));
				this.selected = new_selected;
			},

			show: function()
			{
				$('#image-viewer').fadeIn();
			},

			hide: function()
			{
				$('#image-viewer').fadeOut();
			},

			expand: function()
			{
				var path = $(this.obj_img).attr('src');
				window.open(path, '_blank');
			},

			replaceURL: function(_url)
			{
				return _url.replace('thumb/', '');
			}

		}

	});