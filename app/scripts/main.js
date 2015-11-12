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

	// packery
	var $container = $('.ns-dynamic-grid');

	// init
	$container.packery({
	  itemSelector: '.ns-grid',
	  gutter: 20
	});
	// layout Packery after all images have loaded
	$container.imagesLoaded( function() {
	  $container.packery();
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

	// grid functionality
	var gridFunctions = function(){		
		// hover on things
		$('[hover-article]').hover(function(){
			$(this).parents('.ns-article').toggleClass('hover');
		});

		// truncate text
		$('.ns-dynamic-grid .ns-article .uk-thumbnail-caption').dotdotdot({
			watch: 'window',
			lastCharacter: {
				noEllipsis: []
			}
		});

		// responsive images
		$('picture').picture({
			ignorePixelRatio: true
		});
	};

	gridFunctions();

	// viewMore load test
	// $('#ns-view-more').on('click', function(e) {
	// 	e.preventDefault();

	// 	var $prevContainer = $('#ns-dynamic-grid');

	// 	if(typeof viewMore !== 'undefined'){
	// 		// append elements to container
	// 		$.get(viewMore, function(data){
	// 			var $data = $(data);

	// 		    // append elements to container
	// 	        $prevContainer.append( $data );

	// 	        // add and lay out newly appended elements
	// 	        $prevContainer.packery( 'appended', $data );

	// 	        // re-init grid functions
	// 	        gridFunctions();
	// 		});

	// 		// Remove button if page is single load only
	// 		if($(this).is('[single-load]')){
	// 			$(this).detach();
	// 		}
	// 	}
	// });

	// wrap tables on article pages
	$('.ns-single-page-content table').each(function(){
		if(!$(this).parent().hasClass('ns-table-wrap')){
			$(this).wrap('<div class="ns-table-wrap"></div>');
		}
	});

	// find/list an event pages

	// category all toggle
	$('.ns-single-page-event-list [type="checkbox"]').change(function(){
		// var name = $(this).prop('name');
		if($(this).is(':checked')){
			if($(this).val() !== 'all'){
				$('#category-all').prop('checked', false);
			} else {
				$('[type="checkbox"]').not('#category-all').prop('checked', false);
			}
		}	
	});

	// Stop top tab nav
	$('#ns-form-tab-nav > li').on('click', function(e){
		e.preventDefault();
		return false;
	});

	// datepicker
	$('[data-uk-datepicker]').on('focus', function(){
		$(this).parent().addClass('ns-date-focus');
	});

	// empty datepicker if today is selected
	$('#SelectedDateFilter').on('change', function(){
		if($(this).val() === '1'){
			$('[data-uk-datepicker]').val('');
		}
	});

	// dropdown textarea toggle
	$('#association').on('change', function(){
		var $textarea = $(this).parent().next();
		if($(this).val() === 'notassociated'){
			$textarea.removeClass('uk-hidden');
		} else {			
			$textarea.addClass('uk-hidden');
		}
	});

	// radio toggle
	$.fn.radioHiddenToggle = function(hiddenElement, trigger){
		var 
			$hiddenElement = $('#' + hiddenElement),
			$hiddenSection = $hiddenElement.parent(),
			regex = new RegExp(trigger)
		;
		$(this).on('change', function(){
			if($(this).val().match(regex)){
				$hiddenSection.removeClass('uk-hidden');
			} else {			
				$hiddenSection.addClass('uk-hidden');		
			}
		});
	};

	$('[name="event-costs"]').radioHiddenToggle('cost-details', 'paid|both');
	$('[name="booking-required"]').radioHiddenToggle('booking-site', 'yes');

	// form validation
	$('[psuedo-submit]').on('click', function(){
		var
			$parent = $(this).parent().parent(),
			isValid = true
		;

		$parent.find('[required]').each(function(){
			var regex = $(this).prop('pattern');
			$(this).removeClass('required');

			if(($(this).val() === '' || (regex && !$(this).val().match(regex))) && $(this).is(':visible')){ // check if required field is visible and empty
				$(this).addClass('required');
				isValid = false;
			}
		});

		return isValid;

	});

	$('[required]').on('blur change', function(){
		if($(this).val() !== ''){
			$(this).removeClass('required');		
		}
	});

	// add/remove event date sessions
	var newRowID = 1;
	$('#add-session').on('click', function(e){
		e.preventDefault();

		var 
			$template = $('#init-event-date-row'),
			$newRow = $template.clone(),

			$dateStartLabel = $newRow.find('[for="date-start"]'),
			$dateStart = $newRow.find('#date-start'),

			$timeStartLabel = $newRow.find('[for="time-start"]'),
			$timeStart = $newRow.find('#time-start'),

			$dateEndLabel = $newRow.find('[for="date-end"]'),
			$dateEnd = $newRow.find('#date-end'),

			$timeEndLabel = $newRow.find('[for="time-end"]'),
			$timeEnd = $newRow.find('#time-end')
		;

		// update IDs and stuff
		var updatedID = ++newRowID;
		$newRow.find('[required]').removeProp('required');
		$newRow.prop('id', 'new-event-date-row-' + (updatedID));

		$dateStartLabel
			.prop('for', 'date-start-' + (updatedID))
			.text($dateStartLabel.text().replace('*', ''))
		;
		$dateStart.prop('id', 'date-start-' + (updatedID));
		$dateStart.prop('name', 'date-start-' + (updatedID));

		$timeStartLabel.prop('for', 'time-start-' + (updatedID));
		$timeStart.prop('id', 'time-start-' + (updatedID));
		$timeStart.prop('name', 'time-start-' + (updatedID));

		$dateEndLabel
			.prop('for', 'date-end-' + (updatedID))
			.text($dateEndLabel.text().replace('*', ''))
		;
		$dateEnd.prop('id', 'date-start-' + (updatedID));
		$timeStart.prop('name', 'time-start-' + (updatedID));

		$timeEndLabel.prop('for', 'time-end-' + (updatedID));
		$timeEnd.prop('id', 'time-end-' + (updatedID));
		$timeStart.prop('name', 'time-start-' + (updatedID));
		

		$template.parent().append($newRow);
	});
	$(document).on('click', '.ns-date-close', function(e){
		e.preventDefault();
        $(this).closest('.event-date-row').remove();
    });

    // add/remove links on feedback form
	var newLinkID = 1;
	$('#add-links').on('click', function(e){
		e.preventDefault();

		var 
			$template = $('#init-link-row'),
			$newRow = $template.clone(),

			$linkLabel = $newRow.find('[for="link"]'),
			$link = $newRow.find('#link')
		;

		// update IDs and stuff
		var updatedID = ++newLinkID;
		$newRow.find('[required]').removeProp('required');
		$newRow.prop('id', 'link-row-' + (updatedID));

		$linkLabel.prop('for', 'link-' + (updatedID));
		$link.prop('id', 'link-' + (updatedID));
		$link.prop('name', 'link-' + (updatedID));
		

		$template.parent().append($newRow);
	});
	$(document).on('click', '.ns-link-close', function(e){
		e.preventDefault();
        $(this).closest('.link-row').remove();
    });

    // sharing functionality
    // $('.share-buttons').sharrre({
    //   share: {
    //     facebook: true,
    //     twitter: true,
    //     linkedin: true
    //   },
    //   template: '<a href="#" class="uk-display-block facebook-share"><span>Share</span><i class="uk-icon-facebook uk-margin-small-left" aria-hidden="true"></i></a><a href="#" class="uk-display-block twitter-share"><span>Tweet</span><i class="uk-icon-twitter uk-margin-small-left" aria-hidden="true"></i></a><a href="#" class="uk-display-block linkedin-share"><span>Share</span><i class="uk-icon-linkedin uk-margin-small-left" aria-hidden="true"></i></a>',
    //   enableHover: false,
    //   render: function(api, options){
    //       $(api.element).on('click', '.facebook-share', function(event) {
    //           event.preventDefault();
    //           api.openPopup('facebook');
    //       });
    //       $(api.element).on('click', '.twitter-share', function(event) {
    //           event.preventDefault();
    //           api.openPopup('twitter');
    //       });
    //       $(api.element).on('click', '.linkedin-share', function(event) {
    //           event.preventDefault();
    //           api.openPopup('linkedin');
    //       });
    //   }
    // });
});


// image file upload
$(function(){

    var settings = {

        // action: '/images/', // upload url

        allow : '*.(jpg|jpeg|gif|png)', // allow only images

        allcomplete: function(response) {

        	console.log(response);

            UIkit.notify({
                message : 'Upload complete!',
                status  : 'info',
                timeout : 3000,
                pos     : 'top-center'
            });
        }
    };

    var selecthero = UIkit.uploadSelect($('#hero-image'), settings),
        drophero   = UIkit.uploadDrop($('#upload-hero-image'), settings),
        selectsecond = UIkit.uploadSelect($('#second-image'), settings),
        dropsecond   = UIkit.uploadDrop($('#upload-second-image'), settings),
        selectthird = UIkit.uploadSelect($('#third-image'), settings),
        dropthird   = UIkit.uploadDrop($('#upload-third-image'), settings)
    ;
});