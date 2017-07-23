$(document).ready(function(){
  var previousSelected;
  $('#select-categories-dropdown').selectric(); // Initialize selectric for the select dropdown

  
  $('#select-categories-dropdown').on('selectric-open',function(){ // When selectric select dropdown is open function
    previousSelected = $(this).val(); // Store what was selected before changing the options 
  })
  .change(function() { // When there is a change in the select drop down function
    if ($(this).val()!=''){ // When the selected value is not empty
      $('.top-stories-list-item').remove(); // Remove existing top stories item html dom
      if(previousSelected == ''){ // If the the previous selected item was from the default
        $('.ina-header .header-logo-select-section').append('<img class="ina-loading-gif" src="img/ajax-loader.gif" alt="loading gif">'); // add loading gif beside the select drop down (desktop) and under it (mobile)
      }else{
        $('.ina-top-stories-section').prepend('<img class="ina-loading-gif" src="img/ajax-loader.gif" alt="loading gif">'); // Add the loading gif on the content section
      }
      previousSelected = $(this).val(); // update previous select value
      $('.ina-top-stories-section').addClass('min-height-section'); // add the container class to content
      // Assign url into variable and add select value also with query API
      var url = 'https://api.nytimes.com/svc/topstories/v2/';
      url += $(this).val()+'.json';
      url += '?' + $.param({
        'api-key': 'd0b63b20baa747d584dedcc2cce0acb1'
      });
      // Do a GET AJAX call
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(data) {
        $('.ina-header').addClass('ina-header-small'); // Add a class to reduce the height of the header
        $('.ina-footer').addClass('ina-footer-small'); // Add a class to the footer to reduce the height as well
        $('.ina-loading-gif').remove(); // Remove loading GIF
        var topStories=''; // Declare a variable that will store the top stories content
        var numberOfStories = 1; // Declare a counter
        // Use a each function to run through the results
        $.each(data.results,function(index, items){
          if(numberOfStories<=12){ // If the counter is still below 12, meaning if the number of stories to append has not reach below 12
            if(items.multimedia.length>0){ // Check if there is a multimedia url 
              // Store the content to display in to the topStories variable for append
              topStories += '<li class="top-stories-list-item flex-item-mobile-100 flex-item-tablet-50 flex-item-desktop-25">';
              topStories += '<a href="'+items.url+'" target="_blank">';
              topStories += '<div class="top-stories-item" style="background-image:url(\''+items.multimedia[4].url+'\')">';
              topStories += '<p>'+items.abstract+'</p>';
              topStories += '</div>';
              topStories += '</li>';
              numberOfStories++;
            }
          }
        });
        $('#top-stories-list').append(topStories); // Append the content into the sections
      }).fail(function(err) { // Fail AJAX function
        throw err; // Throw and error
      });
    }
    else{ // when the selected value is empty
      $('.ina-header').removeClass('ina-header-small'); // change back to the header to default
      $('.ina-footer').removeClass('ina-footer-small'); // change back to the footer to default
      $('.top-stories-list-item').remove(); // remove items in the stories section
      $('.ina-loading-gif').remove(); // remove the loading gif
      $('.ina-top-stories-section').removeClass('min-height-section'); // remove the content class
      previousSelected = $(this).val(); // update previous selected value
    }
  });
});