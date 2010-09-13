function success(position) {
  var geonames = new GeoNames();

  geonames.findNearByWeather(position.coords.latitude, position.coords.longitude, function(data) {
    if (data) {
      if (parseInt(data.temperature) >= 19) {
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
  msg = typeof message == 'string' ? message : "failed";
  $('#status').html(msg);
  $('body').addClass('error');
} 

var today = new Date(2010, 09, 14, 08, 10);
var hour = today.getHours();

if (hour < 9) {
  $('#outcome').html("it's before 9, ciroc?");
  $('#status').html("(or sleep)");
  $('body').addClass('ciroc');
} else if (hour >= 9 && hour < 11) {
  $('#outcome').html("check in at 11, liver break!");
  $('#status').html("drink responsibly&#8482;");
  $('body').addClass('liver');
} else if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  error('not supported');
}
