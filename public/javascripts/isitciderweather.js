function getParameterByName(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if(results == null)
    return undefined;
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function success(position) {
  calculateCider(positions.coords.latitude, positions.coords.longitude);
}

function calculateCider(lat, lng) {
  var geonames = new GeoNames();

  geonames.findNearByWeather(lat, lng, function(data) {
    if (data) {
      if (parseInt(data.temperature) >= 30) {
        $('#outcome').html("fucking oath! you're an idiot otherwise");
        $('body').addClass('cider');
      } else if (parseInt(data.temperature) >= 19) {
        $('#outcome').html("sure, i've got mine in hand");
        $('body').addClass('cider');
      } else {
        $('#outcome').html("maybe go a glass of red");
        $('body').addClass('wine');
      }
      $('#status').html('currently <a href="/?lat=' + data.lat + '&lng=' + data.lng + '">' + data.temperature + '&deg;</a>');
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

var today = new Date();
var hour = today.getHours();
var lat = getParameterByName('lat');
var lng = getParameterByName('lng');

if ((typeof lat != "undefined" && lat !== null) && (typeof lng != "undefined" && lng !== null)) {
  $('#status').html("calculating based on lat and lng ...")
  calculateCider(lat, lng);
} else if (hour < 9) {
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
