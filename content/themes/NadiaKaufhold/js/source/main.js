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
		windowMax = Math.max($(window).height(),700);
		$('#home').css({ height:(windowMax-112)});
	}
	if ( $("#home").length ) {
		/* words typing */
		var animationDelay = 2500,
			//loading bar effect
			barAnimationDelay = 3800,
			barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
			//letters effect
			lettersDelay = 50,
			//type effect
			typeLettersDelay = 150,
			selectionDuration = 500,
			typeAnimationDelay = selectionDuration + 800,
			//clip effect 
			revealDuration = 600,
			revealAnimationDelay = 1500;
		
		initHeadline();
		$('#home .flexslider').flexslider({
			controlsContainer: "#controls",
			controlNav: false,
			directionNav: false,
			animation: "fade",
			slideshow: false,
			slideshowSpeed: 5000,
			animationSpeed: 500,
			useCSS:true,
			smoothHeight:true,
			start: function(slider) {
				$('.slides li').click(function(e){
					e.preventDefault();
					slider.flexAnimate(slider.getTarget("next"));
				});
			}
		});
		if ( ($(window).width() > 768) ){
			$(window).on('resize',resizeHome);
			resizeHome();
		}
	}
	function initHeadline() {
		//insert <i> element for each letter of a changing word
		singleLetters($('.nk-words.letters').find('b'));
		//initialise headline animation
		animateHeadline($('.nk-words'));
	}

	function singleLetters($words) {
		$words.each(function(){
			var word = $(this),
				letters = word.text().split(''),
				selected = word.hasClass('is-visible');
			for (i in letters) {
				if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
				letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
			}
			var newLetters = letters.join('');
			word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);
			
			if(headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.words-wrapper').addClass('is-loading') }, barWaiting);
			} else if (headline.hasClass('clip')){
				var spanWrapper = headline.find('.words-wrapper'),
					newWidth = spanWrapper.width() + 10
				spanWrapper.css('width', newWidth);
			} else if (!headline.hasClass('type') ) {
				//assign to .words-wrapper the width of its longest word
				var words = headline.find('.words-wrapper b'),
					width = 0;
				words.each(function(){
					var wordWidth = $(this).width();
					if (wordWidth > width) width = wordWidth;
				});
				headline.find('.words-wrapper').css('width', width);
			};

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);
		
		if($word.parents('.nk-words').hasClass('type')) {
			var parentSpan = $word.parent('.words-wrapper');
			parentSpan.removeClass('waiting');	
			setTimeout(function(){ 
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
		
		} else if($word.parents('.nk-words').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

		}  else if($word.parents('.nk-words').hasClass('clip')) {
			$word.parents('.words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} else if ($word.parents('.nk-words').hasClass('loading-bar')){
			$word.parents('.words-wrapper').removeClass('is-loading');
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
			setTimeout(function(){ $word.parents('.words-wrapper').addClass('is-loading') }, barWaiting);

		} else {
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, animationDelay);
		}
	}

	function showWord($word, $duration) {
		if($word.parents('.nk-words').hasClass('type')) {
			showLetter($word.find('i').eq(0), $word, false, $duration);
			$word.addClass('is-visible').removeClass('is-hidden');

		}  else if($word.parents('.nk-words').hasClass('clip')) {
			$word.parents('.words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
				setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
			});
		}
	}

	function hideLetter($letter, $word, $bool, $duration) {
		$letter.removeClass('in').addClass('out');
		
		if(!$letter.is(':last-child')) {
			setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);
		} else if($bool) {
			setTimeout(function(){ hideWord(takeNext($word)); }, animationDelay);
		}

		if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		}
	}

	function showLetter($letter, $word, $bool, $duration) {
		$letter.addClass('in').removeClass('out');
		
		if(!$letter.is(':last-child')) {
			setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration);
		} else {
			if($word.parents('.nk-words').hasClass('type')) { setTimeout(function(){ $word.parents('.words-wrapper').addClass('waiting'); }, 200);}
			if(!$bool) { setTimeout(function(){ hideWord($word);}, animationDelay); }
		}
	}

	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function takePrev($word) {
		return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}
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
		$('#about').css({ height:(windowMax-160)});
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