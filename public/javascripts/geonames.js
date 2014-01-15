var GeoNames;
GeoNames = function() {
  return this;
};
GeoNames.prototype.findNearByWeather = function(latitude, longitude, callback) {
  return $.getJSON("http://api.geonames.org/findNearByWeatherJSON?lat=" + escape(latitude) + "&lng=" + escape(longitude) + "&username=isitciderweather&style=full&callback=?", function(response) {
    var details, weather;
    try {
      details = response.weatherObservation;
      weather = {
        "temperature": details.temperature,
        "lng": details.lng,
        "lat": details.lat
      };
    } catch (error) {
      console ? console.log(error) : null;
    }
    return callback(weather);
  });
};
