$(function() {
  var previousSelected;
  $('#select-categories-dropdown').selectric(); // Initialize selectric for the select dropdown
  $('#select-categories-dropdown').on('selectric-open',function(){ // When selectric select dropdown is open function
    previousSelected = $(this).val();
  })
  .change(function() { // When there is a change in the select drop down function
    if ($(this).val()!==''){ // When the selected value is not empty
      $('.top-stories-list-item').remove();
      if(previousSelected === ''){ // If the the previous selected item was from the default
        $('.ina-header .header-logo-select-section').append('<img class="ina-loading-gif" src="img/ajax-loader.gif" alt="loading gif">');
      }else{
        $('.ina-top-stories-section').prepend('<img class="ina-loading-gif" src="img/ajax-loader.gif" alt="loading gif">');
      }
      previousSelected = $(this).val();
      $('.ina-top-stories-section').addClass('min-height-section');
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
        $('.ina-header').addClass('ina-header-small');
        $('.ina-footer').addClass('ina-footer-small');
        
        var topStories='';
        var numberOfStories = 1;
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
        $('#top-stories-list').append(topStories);
      }).fail(function(err) { // Fail AJAX function
        throw err;
      }).always(function(){
        $('.ina-loading-gif').remove();
      });
    }
    else{ // when the selected value is empty
      $('.ina-header').removeClass('ina-header-small');
      $('.ina-footer').removeClass('ina-footer-small');
      $('.top-stories-list-item').remove();
      $('.ina-loading-gif').remove();
      $('.ina-top-stories-section').removeClass('min-height-section');
      previousSelected = $(this).val();
    }
  });
});