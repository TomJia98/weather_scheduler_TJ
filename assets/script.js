const searchButton = $("#search-button");
const cityName = $("#search");

const currentTemp = $("#temp0");
const currentWind = $("#wind0");
const currentHumidity = $("#humidity0");
const currentUV = $("#uv");
const currentCity = $("#city0");


searchButton.on("click", function() {

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+ cityName.val() +'&units=metric&appid=472223ee56646a3fe3c46a3e7f45c283')// 472223ee56646a3fe3c46a3e7f45c283
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    var latitude =  data.coord.lat;
      var longitude = data.coord.lon;

      fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude + '&lon=' + longitude +'&units=metric&appid=472223ee56646a3fe3c46a3e7f45c283')
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);

  currentTemp.text(data.current.temp + " C");
  currentWind.text(data.current.wind_speed + " KPH");
  currentHumidity.text(data.current.humidity + " %");
  currentCity.text(cityName.val());
})
    });
})


  

// add a searchbox with a autofill with cities from the weather API
// selecting a city pulls the needed data from the API
// only the city name is stored in LS, that is then used to refill the list
// upon searching for a city its button is added to the ol and saved to localstorage
// the current city has its information pushed to the DOM
// the uv goes through some if statements to determine its severity, and a class is added