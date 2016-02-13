$(document).ready(function() {
  getLoc();
  var units = "metric";

  function getLoc() {
    var ipLocation = "http://ip-api.com/json";
    $.getJSON(ipLocation, function(response) {
      console.log(response.city);
      $('#location').html(response.city + ", " + response.country);
      showWeather(response.lat, response.lon);
    }, "jsonp");
  }

  function showWeather(lat, lon) {

      var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=1b2b696e50814da18b876c8c29f34eb9&units=" + units;

      $.getJSON(apiUrl, function(json) {
        console.log(json);
        temperature = Math.round(json.main.temp);
        sky = json.weather[0].description;
        humidity = json.main.humidity;
        icon = json.weather[0].icon;

        // imageBg = json.weather[0].icon;
        var imgUrl = "http://openweathermap.org/img/w/" + icon + ".png";

        $("#temp").html(temperature + "°C");
        $("#iconImg").html("<img src=\"" + imgUrl + "\"/>");
        $("#sky").html(sky);
        $("#humidity").html(humidity + "%");
        if (temperature <= 0) {
          $("#contentBg").addClass("winter-cold");
        }
        else if (0 < temperature < 5) {
          $("#contentBg").addClass("spring-early");
        }
      }, "jsonp");
      ///
    }
    ///
  document.getElementById("toggleUnit").onclick = function() {
    if (units === "metric") {
      units = "imperial";    
      var tempF = temperature * 9/5 + 32;
      tempF = Math.round(tempF);
      $("#temp").html(tempF + "F");
      this.value = "Celsius";
    } else {
      units = "metric";
      this.value = "Fahrenheit";
      $("#temp").html(temperature + "°C")
    };
  };
});