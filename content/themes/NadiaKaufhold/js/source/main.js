jQuery(document).ready(function($) {
	$( "#T_shaped" ).bind('mouseenter',function() {
		TweenMax.to($("polygon#red"), 1, { x:-4, y:-4, scale:1.1, opacity:0.8, ease: Power4.easeOut });
		TweenMax.to($("polygon#green"), 1, {x:-6, scale:1.1, opacity:1, ease: Power4.easeOut });
		TweenMax.to($("polygon#blue"), 1, {x:-2, y:-2, scale:1.1, opacity:1, ease: Power4.easeOut });
		TweenMax.to($("polygon#black"), 1, {x:3, opacity:0.8, ease: Power4.easeOut});
	}).bind('mouseleave',function() {
		TweenMax.to($("polygon#red"), 0.3, { opacity:0, ease: Power0.easeOut });
		TweenMax.to($("polygon#green"), 0.3, {opacity:0, ease: Power0.easeOut});
		TweenMax.to($("polygon#blue"), 0.3, {opacity:0, ease: Power0.easeOut });
		TweenMax.to($("polygon#black"), 0.7, {x:0, y:0, opacity:1, ease: Power4.easeOut});
	});
	/* ============================================================= sharethis button */
	if ( $("#share-this").length ) {
		$.material.ripples("#share-this");
		$( "#share-this").click(function() {
			$(this).next().animate({width: 'toggle'});
		});
	}
	/* ============================================================= Home */
	if ( $(".home").length ) {
		/* Snap */
		var s = Snap("#loading-T");
			t_width = 80;
			t_height = 18;

		x_middle = Math.round($(window).width()/2)-10;
		y_middle = Math.round($(window).height()/2)-60;
		t_top_x = x_middle - (t_width/2);
		t_top_y = y_middle - (t_width/2);
		t_bot_x = t_top_x + ((t_width/2)-(t_height/2));
		t_bot_y = t_top_y + t_height;

		var rect_top = s.rect(t_top_x,t_top_y,t_width,t_height).attr({fill: 'black'});
		var	rect_bottom = s.rect(t_bot_x,t_bot_y,t_height,t_width).attr({fill: 'black'});

		T = s.group(rect_top, rect_bottom);
		T.animate({transform: 's2,2' }, 1000, mina.backin, function () {
			T.animate({fillOpacity:'0.2'}, 500);
		});
		/* Load */
		$(window).load(function() {
			$('.loading').hide().delay(2400).show();
			$('.T-landing').hide().delay(2450).fadeIn();
			$('#wall article').addClass('placed');
			$(".loader").delay(800).fadeOut(500);
			$('.subliminal').delay(2500).fadeOut();
		});
		$(window).on('resize', function() {
			$('#wall article').hide().fadeIn(50);
		});
		/* BGs */
		var images = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg'];
		var templateUrl = script_vars.themeUrl;
		$('.subliminal').css({'background-image': 'url('+templateUrl+'/img/'+images[Math.floor(Math.random() * images.length)] + ')'});
		
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
	} else {
		$(window).load(function() {
			$('#wall article').addClass('placed');
		});
		$(window).on('resize', function() {
			$('#wall article').hide().fadeIn(50);
		});
	}

	function initHeadline() {
		//insert <i> element for each letter of a changing word
		singleLetters($('.tb-words.letters').find('b'));
		//initialise headline animation
		animateHeadline($('.tb-words'));
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
		
		if($word.parents('.tb-words').hasClass('type')) {
			var parentSpan = $word.parent('.words-wrapper');
			parentSpan.removeClass('waiting');	
			setTimeout(function(){ 
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
		
		} else if($word.parents('.tb-words').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

		}  else if($word.parents('.tb-words').hasClass('clip')) {
			$word.parents('.words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} else if ($word.parents('.tb-words').hasClass('loading-bar')){
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
		if($word.parents('.tb-words').hasClass('type')) {
			showLetter($word.find('i').eq(0), $word, false, $duration);
			$word.addClass('is-visible').removeClass('is-hidden');

		}  else if($word.parents('.tb-words').hasClass('clip')) {
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
			if($word.parents('.tb-words').hasClass('type')) { setTimeout(function(){ $word.parents('.words-wrapper').addClass('waiting'); }, 200);}
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
	/* ============================================================= About */
	if ($('body').hasClass('page-template-page-about')) {
		$(window).load(function() {
			$("header").addClass('white');
			$('footer').addClass('off');
			$('.loading').fadeIn(500);
		});
	}
	$( "#trigger-overlay" ).click(function() {
		if ($('body').hasClass('page-template-page-about')) {
			if (!$('#main-nav-content').hasClass('open')){
				$("header").addClass('white');
				$("footer").addClass('off');
			} else {
				$("header").removeClass('white');
				$('footer').removeClass('off');
			}
		}
	});
	/* ============================================================= single */
	if ($("#single").length){
		$('#single-content').fullpage({
			verticalCentered: false,
			scrollingSpeed: 800,
			keyboardScrolling : true,
			touchSensitivity: 15,
			loopBottom: false,
			responsive: 768,
			onLeave: function (index, nextIndex, direction){
				var numSec = $( ".section" ).length;
				if (index == (numSec-1) && direction == 'down') {
					$(".spacer").fadeOut();
					$('#arrow-up').addClass('up');
				}
				if (index == numSec && direction == 'up') {
					$(".spacer").fadeIn();
					$('#arrow-up').removeClass('up');
				}
			}
		});
		if ($('#arrow-up').length ) {
			$('#smooth-scroll').click(function () {
				if ($('#arrow-up').hasClass('up')) {
					$.fn.fullpage.moveTo(1);
				} else {
					$.fn.fullpage.moveSectionDown();
				}
			});
		}
}
	/* ============================================================= Search Expand */
	new UISearch( document.getElementById( 'sb-search' ) );

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