	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	 ga('create', 'UA-52136840-1', 'hol.es');
	 ga('send', 'pageview');

	 $('ul').click(function(e) {
		var elem = e.currentTarget.children[0].id;
		ga('send', 'event', elem, 'click', 'trabalhos', 1);
	});