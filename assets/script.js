
fetch('https://api.openweathermap.org/data/2.5/onecall?appid=472223ee56646a3fe3c46a3e7f45c283')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  
$(function () {
    var cityNames = [
      'Bootstrap',
      'C',
      'C++',
      'CSS',
      'Express.js',
      'Git',
      'HTML',
      'Java',
      'JavaScript',
      'jQuery',
      'JSON',
      'MySQL',
      'Node.js',
      'NoSQL',
      'PHP',
      'Python',
      'React',
      'Ruby',
    ];
    $('#search').autocomplete({
      source: cityNames,
    });
  });

// add a searchbox with a autofill with cities from the weather API
// selecting a city pulls the needed data from the API
// only the city name is stored in LS, that is then used to refill the list
// upon searching for a city its button is added to the ol and saved to localstorage
// the current city has its information pushed to the DOM
// the uv goes through some if statements to determine its severity, and a class is added