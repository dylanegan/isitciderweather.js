var GeoNames;
GeoNames = function() {
  return this;
};
GeoNames.prototype.findNearByWeather = function(latitude, longitude, callback) {
  return $.getJSON("http://ws.geonames.org/findNearByWeatherJSON?lat=" + escape(latitude) + "&lng=" + escape(longitude) + "&callback=?", function(response) {
    var details, weather;
    try {
      details = response.weatherObservation;
      weather = {
        "temperature": details.temperature
      };
    } catch (error) {
      console ? console.log(error) : null;
    }
    return callback(weather);
  });
};
