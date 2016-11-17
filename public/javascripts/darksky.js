var DarkSky;
DarkSky = function() {
  return this;
};
DarkSky.prototype.forecast = function(latitude, longitude, callback) {
  return $.getJSON("https://api.darksky.net/forecast/55cea4e3c8e14c9c1c8341059ddb6e57/" + latitude + "," + longitude + "?units=si&callback=?", function(response) {
    var weather;
    try {
      weather = {
        "temperature": response.currently.temperature,
        "lng": response.longitude,
        "lat": response.latitude
      };
    } catch (error) {
      console ? console.log(error) : null;
    }
    return callback(weather);
  });
};
