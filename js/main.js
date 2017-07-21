$(document).ready(function(){
  var previousSelected;
  $('#select-categories-dropdown').on('focus',function(){
    previousSelected = $(this).val();
  })
  .change(function() {
    if ($(this).val()!=''){
      $('.top-stories-item').remove();
      if(previousSelected == ''){
        $('.ina-header .header-logo-select-section').append('<img class="ina-loading-gif" src="img/ajax-loader.gif" alt="loading gif">');
      }else{
        $('.ina-top-stories-section').prepend('<img class="ina-loading-gif" src="img/ajax-loader.gif" alt="loading gif">');
      }
      previousSelected = $(this).val();
      $('#select-categories-dropdown').blur();
      $('.ia-top-stories-section').addClass('container-fluid');
      var url = 'https://api.nytimes.com/svc/topstories/v2/';
      url += $(this).val()+'.json';
      url += '?' + $.param({
        'api-key': "d0b63b20baa747d584dedcc2cce0acb1"
      });
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(data) {
        $('.ina-header').addClass('ina-header-small');
        $('.ina-footer').addClass('ina-footer-small');
        $('.ina-loading-gif').remove();
        var topStories='';
        var numberOfStories = 1;
        $.each(data.results,function(index, items){
          if(numberOfStories<=12){
            if(items.multimedia.length>0){
              topStories += '<li class="flex-item-mobile-100 flex-item-tablet-33 flex-item-desktop-25">';
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
      }).fail(function(err) {
        throw err;
      });
    }
    else{
      $('.ina-header').removeClass('ina-header-small');
      $('.ina-footer').removeClass('ina-footer-small');
      $('.top-stories-item').remove();
      $('.ina-loading-gif').remove();
      $('.ina-top-stories-section').removeClass('container-fluid');
      $('#select-categories-dropdown').blur();
      previousSelected = $(this).val();
    }
  });
});