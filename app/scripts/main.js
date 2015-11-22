'use strict';

$(document).ready(function(){
	// enable JS
	$('.no-js').removeClass('no-js');
	$('html').addClass('js');

	// toggle menu and search on mobile
	$('[data-toggle]').on('click',function(e){
		e.preventDefault();
		var
			$this = $(this),
			$thisID = $this.attr('id'),
			$thisToggle = $('[data-toggle-id="' + $thisID + '"]')
		;

		$('[data-toggle-id]').not($thisToggle).removeClass('active');

		$thisToggle.toggleClass('active');
	});

	// toggle things
	$('[data-toggle-next]').on('click', function(e){
		e.preventDefault();
		var
			$this = $(this),
			$thisToggle = $this.next()
		;

		if($('[data-toggle-next="add-class"]')){
			$this.toggleClass('active');
		}

		$thisToggle.toggleClass('active');

	});

	// off click things
	$(document).on('click', function(event) {
	  if (!$(event.target).closest('[data-toggle-id]').length && !$(event.target).closest('[data-toggle]').length) {
	    $('[data-toggle-id]').removeClass('active');
	  }
	});

	// uikit slider keyboard nav
	$('body').keydown(function(e) {
	  if(e.keyCode === 37) { // left
	    $('.uk-slidenav-previous').trigger('click');
	  }
	  else if(e.keyCode === 39) { // right	   
	   	$('.uk-slidenav-next').trigger('click'); 
	  }
	});

	// uikit modal close 
	$(document).keyup(function(e) {
	  if (e.keyCode === 27) $('.uk-modal-close').click();   // esc
	});

	
});
