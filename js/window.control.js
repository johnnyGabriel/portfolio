$(document).ready(function() {

	resizeDivs();

	$(window).resize(function() {

		resizeDivs();

	});

	function resizeDivs()
	{
		var screen_width = $(window).width();
		var divs_hor_width = 0;

		if(screen_width > 800)
		{
			var i = 2;
			do{
				divs_hor_width = (screen_width / i);
				i++;
			}
			while(divs_hor_width > 700);

			$('.content div').width((divs_hor_width-15)+'px');
		} 
		else
		{
			$('.content div').width((screen_width-15)+'px');
		}
	}
}) 