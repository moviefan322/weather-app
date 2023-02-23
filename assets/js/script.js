//===DEPENDENCIES====
var lat = "40.7129";
var lon = "-74.0060";
var todayEl = document.querySelector("#today")

//===DATA====

//===FUNCTIONS====

function getWeather(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=f53b5109b06704799e5260e2dda10bda"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

//===USER INTERACTIONS====



//===INITIALIZATIONS====

getWeather(lat, lon);
