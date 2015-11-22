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

	// countdown clock
	function getTimeRemaining(endtime){
	  var t = Date.parse(endtime) - Date.parse(new Date());
	  var seconds = Math.floor( (t/1000) % 60 );
	  var minutes = Math.floor( (t/1000/60) % 60 );
	  var hours = Math.floor( (t/(1000*60*60)) % 24 );
	  var days = Math.floor( t/(1000*60*60*24) );
	  return {
	    'total': t,
	    'days': days,
	    'hours': hours,
	    'minutes': minutes,
	    'seconds': seconds
	  };
	}

	function initializeClock(id, endtime){
	  var clock = document.getElementById(id);
	  var daysSpan = clock.querySelector('.days');
	  var hoursSpan = clock.querySelector('.hours');
	  var minutesSpan = clock.querySelector('.minutes');
	  var secondsSpan = clock.querySelector('.seconds');

	  function updateClock(){
	    var t = getTimeRemaining(endtime);

	    daysSpan.innerHTML = t.days;
	    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
	    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
	    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

	    if(t.total<=0){
	      clearInterval(timeinterval);
	    }
	  }

	  updateClock();
	  var timeinterval = setInterval(updateClock,1000);
	}

	var deadline = 'January 28 2017 15:00:00 GMT+1300';
	initializeClock('clockdiv', deadline);
});
