var menu = (function ($) {

	// document ready
	$(function () {
		'use strict';
		menu.init();
	});

	return {
		init: function() {

			// remove laggy tap behaviour
			FastClick.attach(document.body);

			$header = $('header');
			$menuToggle = $('header .menu-toggle');
			$menu = $('header .menu');			
			$parent = $('header .menu .parent');

			// place the menu
			$menu.css('top', $header.outerHeight());

			// handle menu on/off
			$menuToggle.on('click', function() {
				if($menuToggle.hasClass('active')) {
					$menuToggle.removeClass('active');					
					$parent.removeClass('active');
					$menu.removeClass('active');
					$menu.removeClass('out');
					$menu.height('auto');
				} else {
					$menuToggle.addClass('active');
					$menu.addClass('active');
				}
			});

			// insert back links
			$parent.find('ul').each(function() {
				$(this).html('<li class="back"><a>Back</a></li>' + $(this).html());
			});	

			// make back go back
			$parent.on('click', 'li.back', function(e) {
				e.stopPropagation();
				$menu.height('auto');
				$menu.removeClass('out');

				// wait for css animation to finish before removing the menu
				window.setTimeout(function () {
					$parent.removeClass('active');
				}, 200);
			});

			// remove links on parents
			$parent.find('> a').removeAttr('href');

			// parent links show submenu
			$menu.on('click', 'li.parent', function(e) {
				e.stopPropagation();
				var $menuItem = $(this);
				if(!$menuItem.hasClass('active')) {
					$menuItem.addClass('active');
					$menu.addClass('out');
					$menu.height($menuItem.find('.submenu').prop('scrollHeight'));
				}
			});

			// link the whole li element
			$menu.on('click', 'li:not(.parent)', function(e) {				
				e.stopPropagation();				
				var a = $(this).find('> a').attr('href');
				if(a !== undefined) {
					window.location.href = a;	
				}				
			});
		}	
	}
})(jQuery, this);
