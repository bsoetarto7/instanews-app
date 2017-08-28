import $ from 'jquery';
import 'jquery-selectric';
import '../sass/style.scss';
$(() =>{
  var previousSelected;
  $('#select-categories-dropdown').selectric(); // Initialize selectric for the select dropdown
  $('#select-categories-dropdown').on('selectric-open',function(e){ // When selectric select dropdown is open function
    previousSelected = $(e.currentTarget).val(); // Store what was selected before changing the options
  })
  .change((e) => { // When there is a change in the select drop down function
    if ($(e.currentTarget).val()!==''){ // When the selected value is not empty
      $('.top-stories-list-item').remove(); // Remove existing top stories item html dom
      if(previousSelected === ''){ // If the the previous selected item was from the default
        $('.ina-header .header-logo-select-section').append('<img class="ina-loading-gif" src="img/ajax-loader.gif" alt="loading gif">'); // add loading gif beside the select drop down (desktop) and under it (mobile)
      }else{
        $('.ina-top-stories-section').prepend('<img class="ina-loading-gif" src="img/ajax-loader.gif" alt="loading gif">'); // Add the loading gif on the content section
      }
      previousSelected = $(e.currentTarget).val(); // update previous select value
      $('.ina-top-stories-section').addClass('min-height-section'); // add min-height to the section
      // Assign url into variable and add select value also with query API
      let url = `https://api.nytimes.com/svc/topstories/v2/${$(e.currentTarget).val()}.json?${$.param({'api-key': 'd0b63b20baa747d584dedcc2cce0acb1'})}`;
      // Do a GET AJAX call
      $.ajax({
        url: url,
        method: 'GET',
      }).done((data) => {
        $('.ina-header').addClass('ina-header-small'); // Add a class to reduce the height of the header
        $('.ina-footer').addClass('ina-footer-small'); // Add a class to the footer to reduce the height as well
        $('.ina-loading-gif').remove(); // Remove loading GIF
        let topStories=''; // Declare a variable that will store the top stories content
        let numberOfStories = 1; // Declare a counter
        // Use a each function to run through the results
        $.each(data.results,(index, items ) => {
          if(numberOfStories<=12){ // If the counter is still below 12, meaning if the number of stories to append has not reach below 12
            if(items.multimedia.length>0){ // Check if there is a multimedia url 
              // Store the content to display in to the topStories variable for append
              topStories += `<li class="top-stories-list-item flex-item-mobile-100 flex-item-tablet-50 flex-item-desktop-25">
                              <a href="${items.url}" target="_blank">
                                <div class="top-stories-item" style="background-image:url('${items.multimedia[4].url}')">
                                  <p>${items.abstract}</p>
                                </div>
                              </a>
                            </li>`;
              numberOfStories++;
            }
          }
        });
        $('#top-stories-list').append(topStories); // Append the content into the sections
      }).fail((err) => { // Fail AJAX function
        throw err; // Throw an error
      });
    }
    else{ // when the selected value is empty
      $('.ina-header').removeClass('ina-header-small'); // change back to the header to default
      $('.ina-footer').removeClass('ina-footer-small'); // change back to the footer to default
      $('.top-stories-list-item').remove(); // remove items in the stories section
      $('.ina-loading-gif').remove(); // remove the loading gif
      $('.ina-top-stories-section').removeClass('min-height-section'); // remove the min-height-section class
      previousSelected = $(e.currentTarget).val(); // update previous selected value
    }
  });
});