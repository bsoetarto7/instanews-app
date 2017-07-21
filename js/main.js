$(document).ready(function(){
  var previousSelected;
  $('#select-categories-dropdown').on('focus',function(){
    console.log($(this).val());
    previousSelected = $(this).val();
  }).change(function() {
    if ($(this).val()!=''){
      $('.top-stories-item').remove();
      if(previousSelected == ''){
        $('.ina-header div').append('<img class="ia-loading-gif" src="img/ajax-loader.gif" alt="loading gif">');
      }else{
        $('.ia-top-stories-section').prepend('<img class="ia-loading-gif" src="img/ajax-loader.gif" alt="loading gif">');
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
        $('.ia-loading-gif').remove();
        var topStories='';
        var numberOfStories = 1;
        $.each(data.results,function(index, items){
          if(numberOfStories<=12){
            if(items.multimedia.length>0){
              topStories += '<li class="top-stories-item" style="background-image:url(\''+items.multimedia[4].url+'\')">';
              topStories += '<p>'+items.abstract+'</p>';
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
      $('ia-loading-gif').remove();
      $('.ia-top-stories-section').removeClass('container-fluid');
      $('#select-categories-dropdown').blur();
    }
  });
});