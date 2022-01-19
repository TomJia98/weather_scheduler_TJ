const searchButton = $("#search-button");
const cityName = $("#search");
const ulEl = document.querySelector("ul");

const currentTemp = $("#temp0");
const currentWind = $("#wind0");
const currentHumidity = $("#humidity0");
const currentUV = $("#uv");
const currentCity = $("#city0");

const date1 = $("#date1");
const image1 = $("#image1");
const temp1 = $("#temp1");
const wind1 = $("#wind1");
const humidity1 = $("#humidity1");

const date2 = $("#date2");
const image2 = $("#image2");
const temp2 = $("#temp2");
const wind2 = $("#wind2");
const humidity2 = $("#humidity2");

const date3 = $("#date3");
const image3 = $("#image3");
const temp3 = $("#temp3");
const wind3 = $("#wind3");
const humidity3 = $("#humidity3");

const date4 = $("#date4");
const image4 = $("#image4");
const temp4 = $("#temp4");
const wind4 = $("#wind4");
const humidity4 = $("#humidity4");

const date5 = $("#date5");
const image5 = $("#image5");
const temp5 = $("#temp5");
const wind5 = $("#wind5");
const humidity5 = $("#humidity5");

function setData(data){



  currentTemp.text(data.current.temp + " C");
  currentWind.text(data.current.wind_speed + " KPH");
  currentHumidity.text(data.current.humidity + " %");
  currentCity.text(cityName.val() + " " + moment().format("D/M/YYYY"));
  currentUV.text(data.current.uvi);
  // sets all the current data
  if (data.current.uvi < 2){
    currentUV.addClass("low")
  } else if (data.current.uvi < 7){
    currentUV.addClass("medium");
  } else if (data.current.uvi > 7){
    currentUV.addClass("high");
  }
  // sets the colour for the uv index
date1.text(moment().add(1, "d").format("D/M/YYYY"));
image1.attr("src", "http://openweathermap.org/img/wn/"+ data.daily[0].weather[0].icon+".png")
wind1.text(data.daily[0].wind_speed + " KPH");
temp1.text(data.daily[0].temp.max + " C");
humidity1.text(data.daily[0].humidity + " %");

date2.text(moment().add(2, "d").format("D/M/YYYY"));
image2.attr("src", "http://openweathermap.org/img/wn/"+ data.daily[1].weather[0].icon+".png")
wind2.text(data.daily[1].wind_speed + " KPH");
temp2.text(data.daily[1].temp.max + " C");
humidity2.text(data.daily[1].humidity + " %");

date3.text(moment().add(3, "d").format("D/M/YYYY"));
image3.attr("src", "http://openweathermap.org/img/wn/"+ data.daily[2].weather[0].icon+".png")
wind3.text(data.daily[2].wind_speed + " KPH");
temp3.text(data.daily[2].temp.max + " C");
humidity3.text(data.daily[2].humidity + " %");

date4.text(moment().add(4, "d").format("D/M/YYYY"));
image4.attr("src", "http://openweathermap.org/img/wn/"+ data.daily[3].weather[0].icon+".png")
wind4.text(data.daily[3].wind_speed + " KPH");
temp4.text(data.daily[3].temp.max + " C");
humidity4.text(data.daily[3].humidity + " %");

date5.text(moment().add(5, "d").format("D/M/YYYY"));
image5.attr("src", "http://openweathermap.org/img/wn/"+ data.daily[4].weather[0].icon+".png")
wind5.text(data.daily[4].wind_speed + " KPH");
temp5.text(data.daily[4].temp.max + " C");
humidity5.text(data.daily[4].humidity + " %");

}

function saveCity(){


}
 var clicks = 0;
searchButton.on("click", function() {

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+ cityName.val() +'&units=metric&appid=472223ee56646a3fe3c46a3e7f45c283')// 472223ee56646a3fe3c46a3e7f45c283
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    var latitude =  data.coord.lat;
      var longitude = data.coord.lon;
      //gets the lat and lon of a city, because the better api uses it instead of city names for some reason

      fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude + '&lon=' + longitude +'&units=metric&appid=472223ee56646a3fe3c46a3e7f45c283')
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);

// var liEl = document.createElement("li");
// liEl.textContent = cityName.val();
// liEl.appendChild(ulEl);
var node = document.createElement("LI");                 // Create a <li> node
var textnode = document.createTextNode(cityName.val());         // Create a text node
node.appendChild(textnode);                              // Append the text to <li>
ulEl.appendChild(node);

  


  setData(data);
})
    });
})


  

// add a searchbox with a autofill with cities from the weather API
// selecting a city pulls the needed data from the API
// only the city name is stored in LS, that is then used to refill the list
// upon searching for a city its button is added to the ol and saved to localstorage
// the current city has its information pushed to the DOM
// the uv goes through some if statements to determine its severity, and a class is added