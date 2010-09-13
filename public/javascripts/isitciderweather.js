function success(position) {
  var today = new Date();
  var hour = today.getHours();

  GeoNames.findNearByWeather(position.coords.latitude, position.coords.longitude, function(data) {
    if (data) {
      if (hour < 9) {
        $('#outcome').html("it's before 9, ciroc?");
        $('body').addClass('ciroc');
      } else if (hour >= 9 && hour < 11) {
        $('#outcome').html("check in at 11, liver break!");
        $('body').addClass('liver');
      } else if (parseInt(data.temperature) >= 19) {
        $('#outcome').html("sure, i've got mine in hand");
        $('body').addClass('cider');
      } else {
        $('#outcome').html("maybe go a glass of red");
        $('body').addClass('wine');
      }
      $('#status').html('currently ' + data.temperature + '&deg;');
    } else {
      $('#status').html('failed to get weather details');
      $('body').addClass('error');
    }
  });
}

function error(message) {
  msg = typeof msg == 'string' ? msg : "failed";
  $('#status').html(msg);
  $('body').addClass('error');
} 

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  error('not supported');
}
