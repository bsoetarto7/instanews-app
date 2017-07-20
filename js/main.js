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
        console.log(data);
        var numberOfStories = 1;
        $.each(data.results,function(index, items){
          if(numberOfStories<=12){
            if(items.multimedia.length>0){
              console.log(items);
              numberOfStories++;
            }
          }
        });
      }).fail(function(err) {
        throw err;
      });
    }
  });
});