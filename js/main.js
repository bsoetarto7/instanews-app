$(document).ready(function(){
  $('#select-categories-dropdown').change(function() {
    if ($(this).val()!=''){
      var url = 'https://api.nytimes.com/svc/topstories/v2/';
      url += $(this).val()+'.json';
      url += '?' + $.param({
        'api-key': "d0b63b20baa747d584dedcc2cce0acb1"
      });
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(data) {
        $('.top-stories-item').remove();
        var topStories;
        var numberOfStories = 1;
        $.each(data.results,function(index, items){
          if(numberOfStories<=12){
            if(items.multimedia.length>0){
              topStories += '<li class="top-stories-item" style="background-image:url(\''+items.multimedia[4].url+'\')">';
              // topStories += '<img src="'+items.multimedia[2].url+'">';
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
  });
});