$().ready(function() {
	
	
/* 1. Navigation 
======================================================================================= */

	
	/* 1A. Update the navigation bar on click. Display dropdown menu.
	----------------------------------------------------------------------------------- */  	
	
	$('#main-nav a:not(#menu), #intro-nav a').live('click', function() {
		var section = $(this).attr('href');
		
		// scroll to relative section
		if (section == '#prologue') {
			$.scrollTo(0, 200);
		}
		else {
			$.scrollTo(section, 200, {offset: {top:1}, axis:'y'});
		}
		return false;
	});
	$('.drop').hover(
		function() {
			$(this).find('ul').show();
		},
		function() {
			$(this).find('ul').hide();
		}
	);
	
	/* 1B. Logo actions
	----------------------------------------------------------------------------------- */  	
	
	// Go to section section on click of logo
	$('#logo a').live('click',function() {
		$.scrollTo('.section:eq(1)', 200, {offset: {top:1}, axis:'y'});
		$(this).find('span').trigger('stopRumble');
		return false;
	});
	
	// initialize vibration plugin
	$('#logo a span').jrumble({
		x: 0,
		y: 0,
		rotation:20,
		speed: 10
	});
	
	// vibrate logo on hover
	$('#logo a span:not(.nospin)').hover(function(){
		$(this).trigger('startRumble');
	}, function(){
		$(this).trigger('stopRumble');
	}); 	
	

	/* 1C. Update navigation and do stuff in sections when scrolling
	----------------------------------------------------------------------------------- */ 
		
	$('.section').waypoint(function(direction) 
		{
    		if (direction === 'down') {
    			id = $(this).attr('id');
    			
    			// update main nav current link
    			if (id != 'prologue') {
    				$('#main-nav li').removeClass('current');
    				$('#main-nav li').find('a[href="#'+id+'"]').parent().addClass('current');
    			} 			
     			// do stuff for about section
     			if (id == 'about') {
    				$('#bio-layer1').animate({marginTop:'0'},{duration: 1500, queue: false, easing: 'linear'});
    				$('#bio-layer2').animate({marginTop:'0'},{duration: 100, queue: false, easing: 'linear'});
    			}
    			else {
     				$('#bio-layer1').animate({marginTop:'-30'},{duration: 1500, queue: false, easing: 'linear'});
    				$('#bio-layer2').animate({marginTop:'20'},{duration: 100, queue: false, easing: 'linear'});   			
    			}
    			
    			// do stuff for services section
    			if (id == 'services') {
					for (var i = 0; i < 4; i++) {
    					(function(i){
        					setTimeout(function(){
            					$('#services #circles li').eq(i).removeClass('circlex');
       						}, 100 * i);
   						}(i));
					}
    			} 
    			else {
    				$('#services #circles li').addClass('circlex');
    			}
    		}
		}, 
		{
			offset: 70
		}		
	);
	
	/* 1D. Update navigation and do stuff in sections when scrolling up
	----------------------------------------------------------------------------------- */  	

	$('.section').waypoint(function(direction) 
		{
    		if (direction === 'up') {
    			id = $(this).attr('id');
    			
    			// update main nav current link
    			if (id != 'prologue') {
    				$('#main-nav li').removeClass('current');
    				$('#main-nav li').find('a[href="#'+id+'"]').parent().addClass('current');
    			}
    			
     			// do stuff for about section
     			if (id == 'about') {
    				$('#bio-layer1').animate({marginTop:'0'},{duration: 1500, queue: false, easing: 'linear'});
    				$('#bio-layer2').animate({marginTop:'0'},{duration: 500, queue: false, easing: 'linear'});
    			}
    			else {
     				$('#bio-layer1').animate({marginTop:'-30'},{duration: 1500, queue: false, easing: 'linear'});
    				$('#bio-layer2').animate({marginTop:'20'},{duration: 500, queue: false, easing: 'linear'});   			
    			}
    			
    			// do stuff for services section
    			if (id == 'services') {
					for (var i = 0; i < 4; i++) {
						(function(i){
        					setTimeout(function(){
            					$('#services #circles li').eq(i).removeClass('circlex');
        					}, 100 * i);
   						}(i));
					}
    			} 
    			else {
    				$('#services #circles li').addClass('circlex');
    			}
    		}
		}, 
		{
			offset: function() {
				// This is the calculation that would give you bottom of element hits middle of window
				return $.waypoints('viewportHeight')/2 - $(this).outerHeight();
			}
		}		
	);

	/* 1E. show or hide #main-nav based on position of section section
	----------------------------------------------------------------------------------- */  	
	$('.section:eq(1)').waypoint(function(direction) 
		{
    		if (direction === 'down') {
    			$('#main-nav').animate({opacity:'1', top:'0'}, 200);
    			setTimeout(function() {
    			$('#prologue').animate({marginTop:'0'}, 200);
    			$('#logo a span').animate({marginTop:'-187'}, 200);
    			}, 100);
    		}
    		else {
     			$('#main-nav').animate({opacity:'0', top:'-80'}, 200);
    			// animate and shake logo
    			setTimeout(function() {
    				$('#prologue').animate({marginTop:'-187'}, 200);
    				$('#logo a span').animate({marginTop:'0'}, 200).trigger('startRumble');
					setTimeout(function(){$('#logo a span').trigger('stopRumble');}, 500);
    			}, 100);   		
    		
    		}
		}, 
		{
			offset: 0
		}		
	);	

	/* 1F. Show menu on click (for small screens only)
	----------------------------------------------------------------------------------- */
	$('#menu').toggle( 
		function() {
			$(this).parent().addClass('active').next().show();
			return false;
		},
		function() {
			$(this).parent().removeClass('active').next().hide();
			return false;
		}
	);  	
	
	
/* 2. Portfolio
======================================================================================= */

	// open project from thumbnail click
	$('#portfolio a').live('click', function() {
		var $this = $(this);
		var hrefOfProject = $this.attr('href');
		var titleOfProject = $this.find('span').html();
		var project = $(this).parent();		
		loadProject(project, titleOfProject, hrefOfProject);                        
        return false;       
	});	
	
	// open project from pagination click
	$('#project-nav .next, #project-nav .prev').live('click', function() {			
		var $this = $(this);
		var hrefOfProject = $this.attr('href');
		var link = $('#portfolio').find('a[href="'+hrefOfProject+'"]');
		var titleOfProject = link.find('span').html();
		var project = link.parent();	
		loadProject(project, titleOfProject, hrefOfProject);                     
        return false;       
	});
	
    // close project on click of close button
    $('#project-nav').find('.close').live('click', function() {  		
       	$('#project').hide().parent().hide().css('height','100%');
        $('#sections-wrapper').show();
        $.scrollTo('#portfolio', 70, {offset: {top:1}, axis:'y'});
        $.waypoints('refresh');
		return false;
    }); 
    


/* 3. Timeline
======================================================================================= */

	// get number of periods in timeline
	var numOfPeriod = $('#periods').find('li').length;

	// initialize timeline
	timeline(1, numOfPeriod);    
    
    // show next or previous timeline set           				
	$('#periods .next, #periods .prev').live('click', function() {
		// hide all periods first
		$(this).parent().find('li').hide().find('.period').css('margin-right','0');
		
		
		// get page number and remaining count
		pageNumber = $(this).attr('data-page');
		remaining = $(this).attr('data-remaining');
		
		// update timeline
		timeline(pageNumber, remaining);
		
		return false;
	});
	
	// update timeline period and image
	$('#periods li').live('click', function() {
		$this = $(this);
		src = $this.find('.picture').attr('src');
		$this.parent().find('li').removeClass('current');
		$this.addClass('current');
		$this.parent().parent().parent().find('#visual').find('img').attr('src',src);
	});

/* 4. Skills (Space)
======================================================================================= */

// move slide slide image from mouse on mouseover
$('#error404').mousemove(function(e){
		
	/* Work out mouse position */
	var offset = $(this).offset();
	var xPos = e.pageX - offset.left;
	var yPos = e.pageY - offset.top;

	/* Get percentage positions */
	var mouseXPercent = Math.round(xPos / $(this).width() * 100);
	var mouseYPercent = Math.round(yPos / $(this).height() * 100);
	var diffX = $(this).width();
	var diffY = $(this).height();
	var myX = diffX * (mouseXPercent / 1000);
	var myY = diffY * (mouseYPercent / 1000) - 40;
	var myX2 = diffX * (mouseXPercent / 2000);
	var myY2 = diffY * (mouseYPercent / 2000);
	var myX3 = diffX * (mouseXPercent / 3000);
	var myY3 = diffY * (mouseYPercent / 2000);
	var myX4 = diffX * (mouseXPercent / 2000);
	var myY4 = diffY * (mouseYPercent / 2000);
	var myX5 = diffX * (mouseXPercent / 3000);
	var myY5 = diffY * (mouseYPercent / 4000);
	var myX6 = diffX * (mouseXPercent / 3000);
	var myY6 = diffY * (mouseYPercent / 2000) + 200;
	
	/* Animate floating images */				
	$(this).find('#elayer1').animate({marginRight: '-' + myX4 + 'px', top: '-' + myY4 + 'px'},{duration: 200, queue: false, easing: 'linear'});
	$(this).find('#elayer2').animate({marginRight: '-' + myX5 + 'px', top: myY5 + 'px'},{duration: 200, queue: false, easing: 'linear'});
	$(this).find('#elayer3').animate({right: myX6 + 'px', bottom: myY6 + 'px'},{duration: 200, queue: false, easing: 'linear'});
	$(this).find('#elayer4').animate({marginLeft: '-' + myX + 'px', bottom: '-' + myY + 'px'},{duration: 100, queue: false, easing: 'linear'});
	$(this).find('#elayer5').animate({marginLeft: '-' + myX2 + 'px', bottom: '-' + myY2 + 'px'},{duration: 200, queue: false, easing: 'linear'});
	$(this).find('#elayer6').animate({marginLeft: '-' + myX3 + 'px', bottom: '-' + myY3 + 'px'},{duration: 200, queue: false, easing: 'linear'});

	/* Floating images with caption */
	$('#interactions a').hover( 
		function() {
			$(this).parent().find('p').css('visibility','visible');
			return false;
		},
		function() {
			$(this).parent().find('p').css('visibility','hidden');
			return false;
		}	
	).click(function() {return false});
});	



/* 5. Inquiry
======================================================================================= */
		
	/* 5A. Preset form
	----------------------------------------------------------------------------------- */ 

	// Select first option in choices with radio buttons
	$('.choices').find('li:first').addClass('checked').find('input').attr('checked','checked');

	/* 5B. Click action of radio buttons or checkboxes
	----------------------------------------------------------------------------------- */ 

	// Radio button click action
	$('.singles').find('li').live('click', function(){	
		if (!$(this).hasClass('checked')) {	
			$(this).parent().find('li').each(function(){
				if ($(this).hasClass('checked')) {
					$(this).removeClass('checked');
					$(this).find('input[type=radio]').attr('checked',false);
				}
			});
			selectbox = $(this).find('input[type=radio]');
			selectbox.attr('checked',true);
			$(this).addClass('checked');
		}
		return false;
	});

	// Checkbox click action
	$('.multis').find('li').live ('click', function(){
		checkbox = $(this).find('input[type=checkbox]');
		if (!$(this).hasClass('checked')) {	
			checkbox.attr('checked',true);
			$(this).addClass('checked');
		}
		else {	
			checkbox.attr('checked',false);
			$(this).removeClass('checked');
		}
		return false;
	});


	/* 5C. Pagination
	----------------------------------------------------------------------------------- */ 

	var $pagination = $('.pagination');
	var $stepNumber = $('#step-number');
	var $totalSteps = $('#total-steps');
	var totalSteps  = $('.step').length;
	var indexOfLastStep = totalSteps - 1;	
	$('.step:first').show();	
	$stepNumber.html('1');
	$totalSteps.html(totalSteps);	
	if (totalSteps > 1) {
		$pagination.find('.next').show();
	}
	$pagination.find('.next').live('click', function() {
		var stepNumber = $stepNumber.html();
		var newNumber = parseInt(stepNumber) + 1;
		var checkboxGroup = $('.step:visible').find('.multis');
		var errorCheckbox = $('.checkboxerror').html();
		
		/* check if step contains checkbox group and has a selection */
		if (checkboxGroup.length > 0 ) {
			if (checkboxGroup.find('input[checked=checked]').length < 1) {
				alert(errorCheckbox);
			}
			else {
				$('.step .header').find('h3,p').css({'margin-left':'0', 'opacity':'0'});
				$('.step').hide();
				$('.step:eq('+stepNumber+')').show();
				$stepNumber.html(newNumber);
				updatePagination(indexOfLastStep);			
			}
		}
		else {
			$('.step .header').find('h3,p').css({'margin-left':'0', 'opacity':'0'});
			$('.step').hide();
			$('.step:eq('+stepNumber+')').show();
			$stepNumber.html(newNumber);
			updatePagination(indexOfLastStep);		
		}

		return false;




	});
	$pagination.find('.prev').live('click', function() {
		$('.step .header').find('h3,p').css({'margin-left':'0', 'opacity':'0'});
		var stepNumber = $stepNumber.html();
		var newNumber = parseInt(stepNumber) - 1;
		var prevStep   = parseInt(stepNumber) - 2;
		$('.step').hide();
		$('.step:eq('+prevStep+')').show();
		$stepNumber.html(newNumber);
		updatePagination(indexOfLastStep);
		return false;
	});
	
	// Hide or show next or previous buttons function
	function updatePagination(lastStep) {
		//remove next arrow for last step
		var current = $('.step:visible').index();
		if (current == lastStep) { 
			$pagination.find('.next').hide();
			$pagination.find('.prev').show();
		}
		//remove prev arrow for first step
		if (current == 0) {
			$pagination.find('.prev').hide();
			$pagination.find('.next').show();
		}
		//show next and prev arrow 
		if (current != 0 && current != lastStep) {
			$pagination.find('.prev').show();
			$pagination.find('.next').show();
		}
		$('.step .header').find('h3,p').animate({'marginLeft':'30', 'opacity':'1'},200);
	}

	/* 5D. Inquiry form
	----------------------------------------------------------------------------------- */ 
	
	// Inquiry form submission
	$('#inquire').find('input[type=submit]').live('click', function() {
		
        // Inquire container 
        var $inquire = $(this).parent().parent();
        
        // Form values
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var email = $inquire.find('#email');
        var emailVal = email.val();
        var myemailVal = $inquire.find('#sendto_email').val();
        var name = $inquire.find('#name');
		var nameVal = name.val();
		var dname = name.prop('defaultValue');
        var phone = $inquire.find('#phone');
		var phoneVal = phone.val();
		var comments = $inquire.find('#comments');
		var commentsVal = comments.val().replace(/(<([^>]+)>)/ig,"");		
        var error = false;
        var errormsg = $('.errormsg').html();
        
        // Check email for error
        if (!emailReg.test(emailVal)) {
        	//show error
        	email.addClass('red');
        	error = true;
        }
        // Check if name is empty
        if ((nameVal == '') || (nameVal == dname)) {
        	//show error
        	name.addClass('red');
        	error = true;
        }
        if (error == true) {
        	alert(errormsg);       	
        	return false;
        }
        

        // Process form
        else {
			// Disable form
			$inquire.find('input[type=text], textarea').attr('disabled','disabled');
			$inquire.find('#submit').hide();
			$('.pagination').css('visibility','hidden');
			
			// Show processing
			$('.processing').show();
	
			var selectedItems = '';
			$('.choices').find('.checked').each(function() {
				choice = $(this).find('input').val();
				selectedItems = selectedItems + choice + ', ';
			});
			selectedItems = selectedItems.substring(0, selectedItems.length-2);

			// Convert form values into data string
			var dataString = 'selectedItems='+ selectedItems + '&name=' + nameVal  + '&email=' + emailVal + '&phone=' + phoneVal + '&comments=' + commentsVal + '&myemail=' + myemailVal;
			
			$.ajax({
				type: 'POST',
				url: 'inquire.php', //process inquiry form
				data: dataString,
				success: function(result) {
					// Show success message
					if (result == "s"){
						$('.step').hide();
						$('#confirmation').show().find('h3').animate({'marginLeft':'30', 'opacity':'1'},200);
					}
					// Show form with error message
					else {
						$('.processing').hide();
						$('.pagination').css('visibility','visible');
						$('.fields').find('input[type=text], textarea').removeAttr('disabled');
						$('.fields').find('#submit').show();
						alert(errormsg);	
					}
				}
			});
			return false;  
		}
	});
	
	// Clear input fields on focus
	$('.clear-focus').live('focus', function(){
		if($(this).val() == this.defaultValue){
			$(this).val('');
		}
	});
	$('.clear-focus').live('blur', function(){
		if($.trim($(this).val()) == ''){
			$(this).val(this.defaultValue);
		}
	});	
	//remove errors on click
	$('.red').live('click', function() {
		$(this).parent().find('.red').removeClass('red');
		$('#error').hide();
	});


/* 6. Misc
======================================================================================= */
	
	/* 6A. Rotating Headline
	----------------------------------------------------------------------------------- */
	if ($('#heading').length > 0) {
		var $heading = $('#heading').find('h1');
		var hdrTotal = $heading.length;
		var hdrCount = 0;
		var playHeader;
	
		$heading.eq(0).show().addClass('animated spinText');

		
   		playHeader = setInterval(function() {rotateHeader();}, 2000);  
    	function rotateHeader() {
			$heading.eq(hdrCount).hide().removeClass('animated spinText');
   			if (hdrCount == hdrTotal - 1) {
    			hdrCount = 0;
    			clearInterval(playHeader);
    			$heading.eq(0).addClass('fanimated').removeClass('spinText2');
    		}
    		else {
    			hdrCount++;
    		}
			$heading.eq(hdrCount).show().addClass('animated spinText');    	
    	}

    	$('.fanimated').live('click', function() {
    		$(this).removeClass('fanimated').addClass('animated spinText2');
    		playHeader = setInterval(function() {rotateHeader();}, 2000);  


    	});


		// move intro image from mouse on mouseover
		$('#intro:not(.nomove)').mousemove(function(e){
		
			/* Work out mouse position */
			var offset = $(this).offset();
			var xPos = e.pageX - offset.left;
			var yPos = e.pageY - offset.top;

			/* Get percentage positions */
			var mouseXPercent = Math.round(xPos / $(this).width() * 100);
			var mouseYPercent = Math.round(yPos / $(this).height() * 100);
			var diffX = $(this).width();
			var diffY = $(this).height();

			var myX = diffX * (mouseXPercent / 2000);
			var myY = diffY * (mouseYPercent / 2000);

			$(this).find('#intro-banner img').animate({right: '-' + myX + 'px', marginTop: '-' + myY + 'px', opacity:'0.8'},{duration: 100, queue: false, easing: 'linear'});
			$(this).find('#intro-banner').css({'background-position': 'right -' + myY + 'px'});
		});	
		$('#intro').mouseout(function(){
			$(this).find('#intro-banner img').animate({right:'-100px', opacity:'1'},{duration: 100, queue: false, easing: 'linear'});
			$(this).find('#intro-banner').css({'background-position': 'right center'});
		});
    }

	/* 6B. Twitter Feed
	----------------------------------------------------------------------------------- */
	
	if ($('#jstwitter').length > 0) {
   		var displaylimit = 1;
    	var showdirecttweets = false;
    	var showretweets = true;
    	var showtweetlinks = true;
		var headerHTML = '';
	
		$('#jstwitter').html(headerHTML);
	 
    	$.getJSON('get-tweets.php', 
        	function(feeds) {   
		    	//alert(feeds);
            	var feedHTML = '';
            	var paginateHTML = '';
            	var displayCounter = 1;         
            	for (var i=0; i<feeds.length; i++) {
					var tweetscreenname = feeds[i].user.name;
             		var tweetusername = feeds[i].user.screen_name;
             		var profileimage = feeds[i].user.profile_image_url_https;
                	var status = feeds[i].text; 
					var isaretweet = false;
					var isdirect = false;
					var tweetid = feeds[i].id_str;
				
					//If the tweet has been retweeted, get the profile pic of the tweeter
					if(typeof feeds[i].retweeted_status != 'undefined'){
				   		profileimage = feeds[i].retweeted_status.user.profile_image_url_https;
				   		tweetscreenname = feeds[i].retweeted_status.user.name;
				   		tweetusername = feeds[i].retweeted_status.user.screen_name;
				   		tweetid = feeds[i].retweeted_status.id_str
				   		isaretweet = true;
				 	};
				 
				 
				 	//Check to see if the tweet is a direct message
				 	if (feeds[i].text.substr(0,1) == "@") {
					 	isdirect = true;
				 	}
				 
					//console.log(feeds[i]);
				 
				 	if (((showretweets == true) || ((isaretweet == false) && (showretweets == false))) && ((showdirecttweets == true) || ((showdirecttweets == false) && (isdirect == false)))) { 
						if ((feeds[i].text.length > 1) && (displayCounter <= displaylimit)) {             
							if (showtweetlinks == true) {
								status = addlinks(status);
							}
						 
							if (displayCounter == 1) {
								feedHTML += headerHTML;
							}
							feedHTML += '<p>'+status+'<a href="https://twitter.com/'+tweetusername+'/status/'+tweetid+'">'+relative_time(feeds[i].created_at)+'</a></p>';
							displayCounter++;

						}   
				 	}
            	}
            	$('#jstwitter').html(feedHTML);
    		}
    	);
         
    	function addlinks(data) {
        	//Add link to all http:// links within tweets
        	data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
            	return '<a href="'+url+'" >'+url+'</a>';
        	});
             
        	//Add link to @usernames used within tweets
        	data = data.replace(/\B@([_a-z0-9]+)/ig, function(reply) {
            	return '<a href="http://twitter.com/'+reply.substring(1)+'" style="font-weight:lighter;" >'+reply.charAt(0)+reply.substring(1)+'</a>';
        	});
        	return data;
    	}
     
    	function relative_time(time_value) {
      		var values = time_value.split(" ");
      		time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
      		var parsed_date = Date.parse(time_value);
      		var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      		var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	  		var shortdate = time_value.substr(4,2) + " " + time_value.substr(0,3);
      		delta = delta + (relative_to.getTimezoneOffset() * 60);
     
      		if (delta < 60) {
        		return '1m';
      		} else if(delta < 120) {
        		return '1m';
      		} else if(delta < (60*60)) {
        		return (parseInt(delta / 60)).toString() + 'm';
      		} else if(delta < (120*60)) {
        		return '1h';
      		} else if(delta < (24*60*60)) {
        		return (parseInt(delta / 3600)).toString() + 'h';
      		} else if(delta < (48*60*60)) {
        		//return '1 day';
				return shortdate;
      		} else {
        		return shortdate;
      		}
    	}
	} /* End Twitter Feed */

/* 7. Blog
======================================================================================= */
	
	/* Nothing here yet */

});



/* 8. Functions and global variables
======================================================================================= */
	
	/* 8A. Project Preloader
	----------------------------------------------------------------------------------- */

	var loopImg = $('#looper img');
	var numberOfImg = loopImg.length;
	var startLooper;
	var showProject;
	var currentItem = 0;

	// Function clear and load preloader for project
	function loading() {        	
		$('#project-wrapper').show();
		$('#looper').show();
		clearInterval(startLooper);
		clearTimeout(showProject);	 
   		startLooper = setInterval(function(){
        	looper();
    	}, 100);  
	}

	// Function looping preloader        	
	function looper() {
		loopImg.eq(currentItem).hide();
   		if (currentItem == numberOfImg - 1) {
    		currentItem = 0;
    	}
    	else {
    		currentItem++;
    	}
		loopImg.eq(currentItem).show();
	}

	/* 8B. Function Project Loader
	----------------------------------------------------------------------------------- */
	
	function loadProject(project, titleOfProject, hrefOfProject) {
		// clear previous project 
		$('#project').html(''); 
			
		if (project.is(':last-child')) {
			var prevLink = project.prev().find('a').attr('href');
			$('#project-nav').find('#controls').html('<li><a class="close" href="#"><span>Exit</span></a></li><li><a class="prev" href="'+prevLink+'"><span>Prev</span></a></li>');
		}
		
		if (project.is(':first-child')) {
			var nextLink = project.next().find('a').attr('href');
			$('#project-nav').find('#controls').html('<li><a class="close" href="#"><span>Exit</span></a></li><li><a class="next" href="'+nextLink+'"><span>Next</span></a></li>');
		}

		if (project.is(':not(:first-child)') && project.is(':not(:last-child)')) {
			var prevLink = project.prev().find('a').attr('href');
			var nextLink = project.next().find('a').attr('href');
			$('#project-nav').find('#controls').html('<li><a class="close" href="#"><span>Exit</span></a></li><li><a class="next" href="'+nextLink+'"><span>Next</span></a></li><li><a class="prev" href="'+prevLink+'"><span>Prev</span></a></li>');
		}	   
		
		$('#project-nav').find('#project-title').html(titleOfProject);
	
		// hide stuff
		$('#sections-wrapper').hide();
		$('#project').hide();
    			
		// activate preloader
		loading();

    	$.scrollTo(0, 200);

		// show project
		showProject = setTimeout(function() {
    		    		
    		// load project inside #project
    		$('#project').load(hrefOfProject, function() {
    			
    			// clear preloader
    			clearInterval(startLooper);
				$('#looper').hide();
    			
    			// initiate project slides
    			$('.pslides').responsiveSlides({
    				auto: false,
					pager: true,
 					nav: true,
    				speed: 100,
    				after: function(){
    					var slideNumber = $('.rslides_here').find('a').html() - 1;
    					if ($('.pslides li:eq('+slideNumber+') .video').length>0){
    						$('#media').find('.next').hide();
    					}
    					else {
    						$('#media').find('.next').show();
    					}
    				}  
    			});
				
    			// hide invisible next button if first slide is video
    			if ($('.pslides li:first').find('.video').length>0) {
    				$('#media').find('.next').hide();
    			}
    			
				// show project
    			$('#project').show().parent().css('height','auto');
 
  				// keyboard navigation
				$(document).keydown(function(e){
    				if (e.keyCode == 37) { 
						$('#media .prev').trigger('click');
    					return false;
    				}
    				if (e.keyCode == 39) { 
						$('#media .next').trigger('click');
    					return false;
    				}    
				});
    							
				// move slide slide image from mouse on mouseover
				$('.rslides_nav').mousemove(function(e){
		
					/* Work out mouse position */
					var offset = $(this).offset();
					var xPos = e.pageX - offset.left;
					var yPos = e.pageY - offset.top;

					/* Get percentage positions */
					var mouseXPercent = Math.round(xPos / $(this).width() * 100);
					var mouseYPercent = Math.round(yPos / $(this).height() * 100);
					var diffX = $(this).width();
					var diffY = $(this).height();

					var myX = diffX * (mouseXPercent / 1000);
					var myY = diffY * (mouseYPercent / 1000);

					$(this).parent().find('.pslides li:visible img').animate({marginLeft: '-' + myX + 'px', marginTop: '-' + myY + 'px'},{duration: 100, queue: false, easing: 'linear'});
				});					
			}); 		
    	},1000);
	}

	/* 8C. Function Timeline
	----------------------------------------------------------------------------------- */
	
	function timeline(pageNumber, remaining) { 
	
		var periods = $('#periods');	
		var period = periods.find('li');
		var prev = periods.find('.prev');
		var next = periods.find('.next');	
		var pageNumber = parseInt(pageNumber);
		var remaining = parseInt(remaining)
	
		// if remaining is more than 5
		if (remaining > 5) {
			lastOnPage = pageNumber * 5;
			firstOnPage = lastOnPage - 5;
			
			setTimeout(function(){
			if (pageNumber != 1) {
				prev.show().attr({'data-page':pageNumber - 1, 'data-remaining':remaining + 5});
			}
			else {
				prev.hide(); 
			}			

			next.show().attr({'data-page':pageNumber + 1, 'data-remaining':remaining - 5});
			}, 360);
			
		}
		else {
			lastOnPage = (pageNumber * 5) - (5 - remaining); 
			firstOnPage = lastOnPage - remaining; 
			
			setTimeout(function(){
			if (pageNumber != 1) {
				prev.show().attr({'data-page':pageNumber - 1, 'data-remaining':remaining + 5});
				next.hide();
			}
			else {
				prev.hide();
				next.hide();
			}
			}, 360);
		}	
    	var d = 1;	
   		for (var i = firstOnPage; i < lastOnPage; i++) {
    		(function(i){
    	    setTimeout(function(){
        	    period.eq(i).show().find('.period').animate({'marginRight':'12px'},300);
        	}, 60 * d);
   			}(i));
   			d++;
		}
	}

	/* 8D. Audio player function
	----------------------------------------------------------------------------------- */
function initAudio(wrapper) {
	
	var supportsAudio = !!document.createElement('audio').canPlayType,
			audio,
			loadingIndicator,
			positionIndicator,
			timeleft,
			loaded = false,
			manualSeek = false;

	if (supportsAudio) {
		var mp3src = wrapper.find('.mp3').attr('href');
		var oggsrc = wrapper.find('.ogg').attr('href');		
		
		var player =   '<span class="playtoggle" />\
						<p class="player">\
						<span class="gutter">\
						<span class="loading" />\
						<span class="handle ui-slider-handle" />\
						<span class="played" />\
						</span>\
						<span class="timeleft" />\
						<audio preload="metadata">\
							<source src="'+oggsrc+'" type="audio/ogg"></source>\
							<source src="'+mp3src+'" type="audio/mpeg"></source>\
						</audio>\
					  </p>';									
		
		wrapper.html(player);
		audio = $('.player audio').get(0);
		loadingIndicator = $('.player .loading');
		positionIndicator = $('.player .handle');
		gutterPlayed = $('.player .played');
		timeleft = $('.player .timeleft');
		
		if ((audio.buffered != undefined) && (audio.buffered.length != 0)) {
			$(audio).bind('progress', function() {
				var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100), 10);
				loadingIndicator.css({width: loaded + '%'});
			});
		}
		else {
			loadingIndicator.remove();
		}
		
		$(audio).bind('timeupdate', function() {
			
			var rem = parseInt(audio.duration - audio.currentTime, 10),
					pos = (audio.currentTime / audio.duration) * 100,
					mins = Math.floor(rem/60,10),
					secs = rem - mins*60;
			
			timeleft.text('-' + mins + ':' + (secs < 10 ? '0' + secs : secs));
			if (!manualSeek) { 
				positionIndicator.css({left: pos + '%'}); 
				gutterPlayed.css({width: pos + '%'}); 
			}
			if (!loaded) {
				loaded = true;
				
				$('.gutter').slider({
						value: 0,
						step: 0.01,
						orientation: "horizontal",
						range: "min",
						max: audio.duration,
						animate: true,					
						slide: function(){							
							manualSeek = true;
						},
						stop:function(e,ui){
							manualSeek = false;					
							audio.currentTime = ui.value;
						}
					});
			}
			
		}).bind('play',function(){
			$(".playtoggle").addClass('playing');		
		}).bind('pause ended', function() {
			$(".playtoggle").removeClass('playing');		
		});		
		
		$(".playtoggle").click(function() {			
			if (audio.paused) {	audio.play();	} 
			else { audio.pause(); }			
		});

	}
	
}




