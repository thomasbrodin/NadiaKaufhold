jQuery(document).ready(function($) {
	$( "#NK_logo" ).bind('mouseenter',function() {
		TweenLite.set("#diamond", {visibility:"visible"});
		var tl = new TimelineMax();
		tl.timeScale(2);
		tl.from("#diamond", 2, {
			drawSVG:0,
			stroke:"#847C79",
			ease: Power4.easeIn
		});
	}).bind('mouseleave',function() {
		TweenLite.set("#diamond", {visibility:"hidden"});
	});
	/* ============================================================= sharethis button */
	if ( $("#share-this").length ) {
		$.material.ripples("#share-this");
		$( "#share-this").click(function() {
			$(this).next().animate({width: 'toggle'});
		});
	}
	/* ============================================================= Wall */
	$(window).load(function() {
		$('#loader').delay(1000).fadeOut(100);
		TweenLite.set("#polygons", {visibility:"visible"});
		TweenLite.from(("polygon#one"), 1, { x:-29, y:-34, ease: Power4.easeOut });
		TweenLite.from(("polygon#two"), 1, {x:-19, y:-42, ease: Power4.easeOut });
		TweenLite.from(("polygon#three"), 1, {x:-13, y:-46, ease: Power4.easeOut });
		TweenLite.from(("polygon#four"), 1, { x:4, y:-44, ease: Power4.easeOut });
		TweenLite.from(("polygon#five"), 1, {x:14, y:-25, ease: Power4.easeOut });
		TweenLite.from(("polygon#six"), 1, {x:22, y:-11, ease: Power4.easeOut });
		TweenLite.from(("polygon#seven"), 1, { x:25, y:0, ease: Power4.easeOut });
		TweenLite.from(("polygon#eight"), 1, {x:15, y:37, ease: Power4.easeOut });
		TweenLite.from(("polygon#nine"), 1, {x:31, y:9, ease: Power4.easeOut });
		TweenLite.from(("polygon#ten"), 1, { x:12, y:9, ease: Power4.easeOut });
		TweenLite.from(("polygon#eleven"), 1, {x:10, y:19, ease: Power4.easeOut });
		TweenLite.from(("polygon#twelve"), 1, {x:-7, y:0, ease: Power4.easeOut });
		TweenLite.from(("polygon#thirteen"), 1, { x:-10, y:-12, ease: Power4.easeOut });
		TweenLite.from(("polygon#fourteen"), 1, {y:-15, ease: Power4.easeOut });
		$('.loading').hide().delay(1100).fadeIn();
		$('.wrap').hide().delay(1200).fadeIn(200);
		if ($("#wall").length){
			$('#wall article').addClass('placed');
		}
	});
	function resizeAbout(){
		windowMax = Math.max($(window).height(),700);
		$('#about').css({ height:(windowMax-100)});
	}
	if ( ($('body').hasClass('page-template-page-about')) && ($(window).width() > 768) ) {
		$(window).on('resize',resizeAbout);
		resizeAbout();
	}
	if ($('#arrow-up').length ) {
		$('#smooth-scroll').click(function () {
			$('html,body').animate({scrollTop: 0}, 500);
		});
	}
	/* ============================================================= Overlay thumbnails */
	$('.article_inner').bind('mouseenter',function() {
		var height = $(this).children('img').height();
		var width = $(this).children('img').width();
		$(this).children('.article_overlay').css({'height':height, 'width':width});
		$(this).children('.article_overlay').animate({'opacity':'0.8'},'fast');
	}).bind('mouseleave',function() {
		$(this).children('.article_overlay').animate({'opacity':'0'},'slow');
	});
});