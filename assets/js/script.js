//===DEPENDENCIES====
var lat = "40.7129";
var lon = "-74.0060";
var todayEl = document.querySelector("#today");
var todTempEl = document.querySelector("#todTemp");
var todWindEl = document.querySelector("#todWind");
var todHumEl = document.querySelector("#todHum");
var cityEl = document.querySelector("#city");
var todayDayEl = document.querySelector("#todayDay");
var tomEl = document.querySelector("#tom");
var fiveDayEl = document.querySelector("#fiveday");
var searchButEl = document.querySelector("#searchBut");
var searchInputEl = document.querySelector("#search");
var todIconEl = document.querySelector("#todIcon");
var tomIconEl = document.querySelector("#tomIcon");
var tomTwoIconEl = document.querySelector("#tomTwoIcon");
var tomThreeIconEl = document.querySelector("#tomThreeIcon");
var tomFourIconEl = document.querySelector("#tomFourIcon");
var tomFiveIconEl = document.querySelector("#tomFiveIcon");
var histOneEl = document.querySelector("#histOne");
var histTwoEl = document.querySelector("#histTwo");
var histThreeEl = document.querySelector("#histThree");
var histFourEl = document.querySelector("#histFour");
var histFiveEl = document.querySelector("#histFive");
var currentCity;
var weatherTod;
var todayWeather;
var tomWeather;
var tomTwoWeather;
var searchHist = [];

//===DATA====

searchButEl.addEventListener("click", function () {
  searchCity(searchInputEl.value);
  saveSearchData(searchInputEl.value);
  renderSavedItems();
});

function saveSearchData(data) {
  var searchHist = localStorage.getItem("searchHist");

  if (!searchHist) {
    searchHist = [];
  } else {
    searchHist = JSON.parse(searchHist);
  }

  searchHist.unshift(data);

  localStorage.setItem("searchHist", JSON.stringify(searchHist));
}

//   if (!searchHist)
//   searchHist[0] = data;
//   searchHist.push(JSON.parse(localStorage.getItem("searchHist")));
//   localStorage.setItem("searchHist", JSON.stringify(searchHist));
// }

var getSearchHist = JSON.parse(localStorage.getItem("searchHist"));
console.log(getSearchHist);

let currentDay = dayjs().format("M/D/YY");
todayDayEl.textContent = currentDay;

let tomorrowDayString = dayjs().format("D");
let tomorrowDayInt = parseInt(tomorrowDayString) + 1;
let tomorrow = dayjs().format("M/" + tomorrowDayInt + "/YY");
console.log(tomorrow);

tomEl.children[0].textContent = tomorrow;

let tomorrowTwoString = dayjs().format("D");
let tomorrowTwoInt = parseInt(tomorrowTwoString) + 2;
let tomorrowTwo = dayjs().format("M/" + tomorrowTwoInt + "/YY");
console.log(tomorrowTwo);

fiveDayEl.children[1].children[0].textContent = tomorrowTwo;

let tomorrowThreeString = dayjs().format("D");
let tomorrowThreeInt = parseInt(tomorrowTwoString) + 3;
let tomorrowThree = dayjs().format("M/" + tomorrowThreeInt + "/YY");
console.log(tomorrowThree);

fiveDayEl.children[2].children[0].textContent = tomorrowThree;

let tomorrowFourString = dayjs().format("D");
let tomorrowFourInt = parseInt(tomorrowFourString) + 4;
let tomorrowFour = dayjs().format("M/" + tomorrowFourInt + "/YY");
console.log(tomorrowFour);

fiveDayEl.children[3].children[0].textContent = tomorrowFour;

let tomorrowFiveString = dayjs().format("D");
let tomorrowFiveInt = parseInt(tomorrowTwoString) + 5;
let tomorrowFive = dayjs().format("M/" + tomorrowFiveInt + "/YY");
console.log(tomorrowFive);

fiveDayEl.children[4].children[0].textContent = tomorrowFive;

//===FUNCTIONS====

function searchCity(search) {
  var city = search;
  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/geocoding?city=" + city,
    headers: { "X-Api-Key": "FY5H8mVkxpSV+RQ0ub8Cbg==HmezQ5tZdVLtj20h" },
    contentType: "application/json",
    success: function (result) {
      console.log(result);
      var lat = result[0].latitude;
      var lon = result[0].longitude;
      currentCity = result[0].name;
      console.log(lat);
      console.log(lon);
      console.log(currentCity);
      cityEl.textContent = currentCity;
      getWeather(lat, lon);
      getForecast(lat, lon);
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}

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

      var here = data.name;
      var todayTemp = Math.round((data.main.temp - 273) * 1.8 + 32);
      var todayWind = data.wind.speed;
      var todayHum = data.main.humidity;
      var todayWeather = data.weather[0].main;
      console.log(todayWeather);
      todIconEl.src = "assets/icons/" + todayWeather + ".png";
      todIconEl.width = "100";
      todIconEl.height = "100";

      todTempEl.textContent = todayTemp;
      todWindEl.textContent = todayWind;
      todHumEl.textContent = todayHum;
      cityEl.textContent = here;
    });
}

function renderSavedItems() {
  getSearchHist = JSON.parse(localStorage.getItem("searchHist"));

  if (getSearchHist[0]) {
    histOneEl.textContent = getSearchHist[0];
    document.getElementById("histOne").style.display = "block";
    histOneEl.addEventListener("click", function () {
      searchCity(getSearchHist[0]);
    });
  }

  if (getSearchHist[1]) {
    histTwoEl.textContent = getSearchHist[1];
    document.getElementById("histTwo").style.display = "block";
    histTwoEl.addEventListener("click", function () {
      searchCity(getSearchHist[1]);
    });
  }

  if (getSearchHist[2]) {
    histThreeEl.textContent = getSearchHist[2];
    document.getElementById("histThree").style.display = "block";
    histThreeEl.addEventListener("click", function () {
      searchCity(getSearchHist[2]);
    });
  }

  if (getSearchHist[3]) {
    histFourEl.textContent = getSearchHist[3];
    document.getElementById("histFour").style.display = "block";
    histFourEl.addEventListener("click", function () {
      searchCity(getSearchHist[3]);
    });
  }

  if (getSearchHist[4]) {
    histFiveEl.textContent = getSearchHist[4];
    document.getElementById("histFive").style.display = "block";
    histFiveEl.addEventListener("click", function () {
      searchCity(getSearchHist[4]);
    });
  }
}

function getForecast(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
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

      var tomTemp = Math.round(
        ((data.list[0].main.feels_like +
          data.list[1].main.feels_like +
          data.list[2].main.feels_like +
          data.list[3].main.feels_like +
          data.list[4].main.feels_like +
          data.list[5].main.feels_like +
          data.list[6].main.feels_like) /
          7 -
          273) *
          1.8 +
          32
      );
      // console.log(tomTemp);
      fiveDayEl.children[0].children[1].textContent = "Temp: " + tomTemp + "º";

      var tomWeather = data.list[0].weather[0].main;
      console.log(tomWeather);
      tomIconEl.src = "assets/icons/" + tomWeather + ".png";
      tomIconEl.width = "100";
      tomIconEl.height = "100";

      var tomTwoTemp = Math.round(
        ((data.list[7].main.feels_like +
          data.list[8].main.feels_like +
          data.list[9].main.feels_like +
          data.list[10].main.feels_like +
          data.list[11].main.feels_like +
          data.list[12].main.feels_like +
          data.list[13].main.feels_like +
          data.list[14].main.feels_like) /
          8 -
          273) *
          1.8 +
          32
      );
      // console.log(tomTwoTemp);
      fiveDayEl.children[1].children[1].textContent =
        "Temp: " + tomTwoTemp + "º";

      var tomTwoWeather = data.list[7].weather[0].main;
      console.log(tomTwoWeather);
      tomTwoIconEl.src = "assets/icons/" + tomTwoWeather + ".png";
      tomTwoIconEl.width = "100";
      tomTwoIconEl.height = "100";

      var tomThreeTemp = Math.round(
        ((data.list[15].main.feels_like +
          data.list[16].main.feels_like +
          data.list[17].main.feels_like +
          data.list[18].main.feels_like +
          data.list[19].main.feels_like +
          data.list[20].main.feels_like +
          data.list[21].main.feels_like +
          data.list[22].main.feels_like) /
          8 -
          273) *
          1.8 +
          32
      );
      // console.log(tomThreeTemp);
      fiveDayEl.children[2].children[1].textContent =
        "Temp: " + tomThreeTemp + "º";

      var tomThreeWeather = data.list[15].weather[0].main;
      console.log(tomThreeWeather);
      tomThreeIconEl.src = "assets/icons/" + tomThreeWeather + ".png";
      tomThreeIconEl.width = "100";
      tomThreeIconEl.height = "100";

      var tomFourTemp = Math.round(
        ((data.list[23].main.feels_like +
          data.list[24].main.feels_like +
          data.list[25].main.feels_like +
          data.list[26].main.feels_like +
          data.list[27].main.feels_like +
          data.list[28].main.feels_like +
          data.list[29].main.feels_like +
          data.list[30].main.feels_like) /
          8 -
          273) *
          1.8 +
          32
      );
      fiveDayEl.children[2].children[1].textContent =
        "Temp: " + tomThreeTemp + "º";

      var tomFourWeather = data.list[23].weather[0].main;
      console.log(tomFourWeather);
      tomFourIconEl.src = "assets/icons/" + tomFourWeather + ".png";
      tomFourIconEl.width = "100";
      tomFourIconEl.height = "100";

      // console.log(tomFourTemp);
      fiveDayEl.children[3].children[1].textContent =
        "Temp: " + tomFourTemp + "º";

      var tomFiveTemp = Math.round(
        ((data.list[31].main.feels_like +
          data.list[32].main.feels_like +
          data.list[33].main.feels_like +
          data.list[34].main.feels_like +
          data.list[35].main.feels_like +
          data.list[36].main.feels_like +
          data.list[37].main.feels_like +
          data.list[38].main.feels_like) /
          8 -
          273) *
          1.8 +
          32
      );

      var tomFiveWeather = data.list[31].weather[0].main;
      console.log(tomFiveWeather);
      tomFiveIconEl.src = "assets/icons/" + tomFiveWeather + ".png";
      tomFiveIconEl.width = "100";
      tomFiveIconEl.height = "100";

      // console.log(tomFiveTemp);
      fiveDayEl.children[4].children[1].textContent =
        "Temp: " + tomFiveTemp + "º";

      var tomWind = Math.round(
        (data.list[0].wind.speed +
          data.list[1].wind.speed +
          data.list[2].wind.speed +
          data.list[3].wind.speed +
          data.list[4].wind.speed +
          data.list[5].wind.speed +
          data.list[6].wind.speed) /
          7
      );
      // console.log(tomWind);
      fiveDayEl.children[0].children[2].textContent =
        "Wind: " + tomWind + " MPH";

      var tomTwoWind = Math.round(
        (data.list[7].wind.speed +
          data.list[8].wind.speed +
          data.list[9].wind.speed +
          data.list[10].wind.speed +
          data.list[11].wind.speed +
          data.list[12].wind.speed +
          data.list[13].wind.speed +
          data.list[14].wind.speed) /
          8
      );
      // console.log(tomTwoWind);
      fiveDayEl.children[1].children[2].textContent =
        "Wind: " + tomTwoWind + " MPH";

      var tomThreeWind = Math.round(
        (data.list[15].wind.speed +
          data.list[16].wind.speed +
          data.list[17].wind.speed +
          data.list[18].wind.speed +
          data.list[19].wind.speed +
          data.list[20].wind.speed +
          data.list[21].wind.speed +
          data.list[22].wind.speed) /
          8
      );
      // console.log(tomThreeWind);
      fiveDayEl.children[2].children[2].textContent =
        "Wind: " + tomThreeWind + " MPH";

      var tomFourWind = Math.round(
        (data.list[23].wind.speed +
          data.list[24].wind.speed +
          data.list[25].wind.speed +
          data.list[26].wind.speed +
          data.list[27].wind.speed +
          data.list[28].wind.speed +
          data.list[29].wind.speed +
          data.list[30].wind.speed) /
          8
      );
      // console.log(tomFourWind);
      fiveDayEl.children[3].children[2].textContent =
        "Wind: " + tomFourWind + " MPH";

      var tomFiveWind = Math.round(
        (data.list[31].wind.speed +
          data.list[32].wind.speed +
          data.list[33].wind.speed +
          data.list[34].wind.speed +
          data.list[35].wind.speed +
          data.list[36].wind.speed +
          data.list[37].wind.speed +
          data.list[38].wind.speed) /
          8
      );
      // console.log(tomFiveWind);
      fiveDayEl.children[4].children[2].textContent =
        "Wind: " + tomFiveWind + " MPH";

      var tomHum = Math.round(
        (data.list[0].main.humidity +
          data.list[1].main.humidity +
          data.list[2].main.humidity +
          data.list[3].main.humidity +
          data.list[4].main.humidity +
          data.list[5].main.humidity +
          data.list[6].main.humidity) /
          7
      );
      // console.log(tomHum);
      fiveDayEl.children[0].children[3].textContent =
        "Humidity: " + tomHum + "%";

      var tomTwoHum = Math.round(
        (data.list[7].main.humidity +
          data.list[8].main.humidity +
          data.list[9].main.humidity +
          data.list[10].main.humidity +
          data.list[11].main.humidity +
          data.list[12].main.humidity +
          data.list[13].main.humidity +
          data.list[14].main.humidity) /
          8
      );
      // console.log(tomTwoHum);
      fiveDayEl.children[1].children[3].textContent =
        "Humidity: " + tomTwoHum + "%";

      var tomThreeHum = Math.round(
        (data.list[15].main.humidity +
          data.list[16].main.humidity +
          data.list[17].main.humidity +
          data.list[18].main.humidity +
          data.list[19].main.humidity +
          data.list[20].main.humidity +
          data.list[21].main.humidity +
          data.list[22].main.humidity) /
          8
      );
      // console.log(tomThreeHum);
      fiveDayEl.children[2].children[3].textContent =
        "Humidity: " + tomThreeHum + "%";

      var tomFourHum = Math.round(
        (data.list[23].main.humidity +
          data.list[24].main.humidity +
          data.list[25].main.humidity +
          data.list[26].main.humidity +
          data.list[27].main.humidity +
          data.list[28].main.humidity +
          data.list[29].main.humidity +
          data.list[30].main.humidity) /
          8
      );
      // console.log(tomFourHum);
      fiveDayEl.children[3].children[3].textContent =
        "Humidity: " + tomFourHum + "%";

      var tomFiveHum = Math.round(
        (data.list[31].main.humidity +
          data.list[32].main.humidity +
          data.list[33].main.humidity +
          data.list[34].main.humidity +
          data.list[35].main.humidity +
          data.list[36].main.humidity +
          data.list[37].main.humidity +
          data.list[38].main.humidity) /
          8
      );
      // console.log(tomFiveHum);
      fiveDayEl.children[4].children[3].textContent =
        "Humidity: " + tomFiveHum + "%";
    });
}

function makeAndReturnWeatherCard(someArray) {
  // run a for loop, looping over the length of your daily forecast array
  // in each iteration, you will create a div, a span, etc
  // then assign content or text to each one of those elements
  // then append those elements to an existing element in your document, i.e. document.getElementById('#someId').appendChild()
}

//===USER INTERACTIONS====

//===INITIALIZATIONS====

getWeather(lat, lon);
getForecast(lat, lon);
renderSavedItems();
