const searchButton = $("#search-button");
const cityName = $("#search");
const ulEl = $("ul");

const currentTemp = $("#temp0");
const currentWind = $("#wind0");
const currentHumidity = $("#humidity0");
const currentUV = $("#uv");
const currentCity = $("#city0");
const currentImage =$("#image0");

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
// getting all the elements from the HTML, could be done with some smarter naming and for loops, but this works


function setData(data){
  currentTemp.text(data.current.temp + " C");
  currentWind.text(data.current.wind_speed + " KPH");
  currentHumidity.text(data.current.humidity + " %");
  currentUV.text(data.current.uvi);
  currentImage.attr("src", "http://openweathermap.org/img/wn/"+ data.current.weather[0].icon+".png")

  // sets all the current data into the main section
  if (data.current.uvi < 2){
    currentUV.removeClass("medium");
    currentUV.removeClass("high");
    currentUV.addClass("low")
  } else if (data.current.uvi < 7){
    currentUV.removeClass("high");
    currentUV.removeClass("low");
    currentUV.addClass("medium");
  } else if (data.current.uvi > 7){
    currentUV.removeClass("medium")
    currentUV.removeClass("low");
    currentUV.addClass("high");
  }
  // sets the background colour for the uv index based on its value

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
// sets the information for the other days, could also be made more compact by smart use of some for loops
}

function saveCity(){
  for (var i = 0; i < localStorage.length - 1; i++){
    var node = document.createElement("button");                 
var textnode = document.createTextNode(localStorage.getItem(i));
node.setAttribute("class","list");        
node.appendChild(textnode);                              
ulEl.append(node);
  }}
  // sets the items in LocalStorage into buttons under the search-bar

 saveCity();

searchButton.on("click", function() {
  currentCity.text("loading");
  // upon clicking search, sets the city text to loading, this will be changed when the search is done
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+ cityName.val() +'&units=metric&appid=472223ee56646a3fe3c46a3e7f45c283')// 472223ee56646a3fe3c46a3e7f45c283
  .then(function (response) {
    if(response.status !== 200){
      currentCity.text("Error, city not found")
    }
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
  currentCity.text(cityName.val() + " " + moment().format("D/M/YYYY"));
  // sets city and current date to the html
if (localStorage.getItem("clicks")!=null){

var node = document.createElement("button");                 
var textnode = document.createTextNode(cityName.val());   
localStorage.setItem(localStorage.getItem("clicks"), cityName.val());   
node.appendChild(textnode);
node.setAttribute("class","list");                          
ulEl.append(node);
localStorage.setItem("clicks", parseInt(localStorage.getItem("clicks"))+1)
// if theres something in localstorage, run this

} else {
  localStorage.setItem("clicks", 0);
  var node = document.createElement("button");                 
var textnode = document.createTextNode(cityName.val());   
localStorage.setItem(localStorage.getItem("clicks"), cityName.val());   
node.appendChild(textnode);
node.setAttribute("class","list");                             
ulEl.append(node);
localStorage.setItem("clicks", parseInt(localStorage.getItem("clicks"))+1);
//run this if localstorage is empty (first viewing), runs initial localstorage setup first
}
  setData(data);
})})})

ulEl.on("click", ".list", function(event){
  currentCity.text("loading");
    // upon clicking a city button, sets the city text to loading, this will be changed when the search is done
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ event.target.innerText +'&units=metric&appid=472223ee56646a3fe3c46a3e7f45c283')// 472223ee56646a3fe3c46a3e7f45c283
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    var latitude =  data.coord.lat;
      var longitude = data.coord.lon;
//takes the text of the clicked button and searched the API for a city of the same name, then takes its lat&long and uses it to find other info
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude + '&lon=' + longitude +'&units=metric&appid=472223ee56646a3fe3c46a3e7f45c283')
.then(function (response) {
  currentCity.text(event.target.innerText + " " + moment().format("D/M/YYYY"));
  //upon successful load, sets cityname
  return response.json();
})
.then(function (data) {
setData(data);
})})})