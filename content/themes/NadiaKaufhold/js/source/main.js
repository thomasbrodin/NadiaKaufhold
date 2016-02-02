jQuery(document).ready(function($) {
	$(window).scroll(function() {
		scrolled = Math.max(0, $(window).scrollTop());
		if ( scrolled >= 10 ){
            $('header').addClass('scrolled');
        } else {
			$('header').removeClass('scrolled');
        }
	});
	/* ============================================================= home */
	function resizeHome(){
		topPad = parseInt($(".wrap").css('padding-top').replace("px", ""),10);
		botPad = parseInt($(".wrap").css('padding-bottom').replace("px", ""),10);
		wrapPadding = topPad+botPad;
		windowMax = $(window).height();
		$('#home').css({ height:(windowMax-wrapPadding)});
	}
	if ( $("#home").length ) {
		$('#home .flexslider').flexslider({
			controlNav: true,
			directionNav: false,
			animation: "fade",
			slideshow: true,
			slideshowSpeed: 3000,
			animationSpeed: 300,
			useCSS:true,
			smoothHeight:true,
			start: function(slider) {
				$('.slides li').click(function(e){
					e.preventDefault();
					slider.flexAnimate(slider.getTarget("next"));
				});
			}
		});
		$(window).on('resize',resizeHome);
		resizeHome();
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
		$('#about').css({ height:(windowMax - 178)});
	}
	if ( ($('body').hasClass('page-template-page-about')) && ($(window).width() > 768) ) {
		$(window).on('resize',resizeAbout);
		resizeAbout();
	}

	/* ============================================================= MENU */
	var in_menu, in_share_menu;
	var menu_on = false;
	function hide_menu() {
		if (!menu_on){
			$('#menu').stop().fadeOut(250);
		}
	}
	function show_menu() {
		$('#menu').stop().show();//fadeIn(300);
		$('#menu').css('opacity', '1.0');
	}
	$('#menu_icon').click(function () {
		if ($('#menu').css('display') == 'none')
			show_menu();
		if (menu_on)
			hide_menu();
		menu_on = !menu_on
	});
	$('#menu_icon').hover(function () {
		show_menu();
	}, function () {
		setTimeout(function () {
			if (!in_menu)
				hide_menu();
		}, 100);
	});
	$('#menu').mouseover(function () {
		in_menu = true;
	}).mouseleave(function () {
		in_menu = false;
		hide_menu();
	});
	/* ============================================================= Overlay thumbnails */
	$('.article_inner').bind('mouseenter',function() {
		var height = $(this).children('img').height();
		var width = $(this).children('img').width();
		$(this).children('.article_overlay').css({'height':height, 'width':width});
		$(this).children('.article_overlay').animate({'opacity':'0.8'},'fast');
	}).bind('mouseleave',function() {
		$(this).children('.article_overlay').animate({'opacity':'0'},'slow');
	});
	/* ============================================================= Fancybox */
	$(".fancybox").fancybox({
      padding : 0,
			margin : [70, 60, 70, 60],
			maxWidth: "100%",
			maxHeight: "100%",
			autoResize	: true,
			fitToView	: false,
			nextEffect : 'fade',
			prevEffect : 'fade',
			openEffect : 'none',
			closeEffect : 'none',
			tpl: {
				closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;">CLOSE</a>'
			},
    });
});
