var GeoNames = {
  findNearByWeather: function(latitude, longitude, callback) {
    $.getJSON("http://ws.geonames.org/findNearByWeatherJSON?lat="+escape(latitude)+"&lng="+escape(longitude)+"&callback=?", function(response) {
      var weather = null;
      try {
        var details = response.weatherObservation;
        weather = {
            "temperature": details.temperature,
          };
      } catch(error) {
        if(console)
          console.log(error);
      }
      callback(weather);
    });
  }
}
