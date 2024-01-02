function nameFormat(name) {
  let nameArray = name.split(/[, ]+/);
  name = "";
  for (let x in nameArray) {
    name +=
      nameArray[x][0].toUpperCase() + nameArray[x].slice(1).toLowerCase() + " ";
  }
  return name;
}

function showTemperature(response) {
  let temperature = `${Math.round(response.data.temperature.current)}`;
  console.log(response.data.temperature.humidity);
  let currentTemperatureValue = document.querySelector("#temperature");
  currentTemperatureValue.innerHTML = `${temperature}`;

  let humidity = response.data.temperature.humidity;
  let currentHumidityValue = document.querySelector("#humidity");
  currentHumidityValue.innerHTML = `${humidity}%`;

  let speed = response.data.wind.speed;
  let currentWindSpeedValue = document.querySelector("#wind-speed");
  currentWindSpeedValue.innerHTML = `${speed} km/h`;

  let description = response.data.condition.description;
  let currentConditionValue = document.querySelector("#condition");
  currentConditionValue.innerHTML = `${nameFormat(description)}`;

  let icon_url = response.data.condition.icon_url;
  let currentIconValue = document.querySelector("#icon");
  currentIconValue.innerHTML = `<img src="${icon_url}" />`;

  let currentDayELement = document.querySelector("#day");
  let currentHourELement = document.querySelector("#hours");
  let currentMinuteELement = document.querySelector("#minutes");
  let currentDate = new Date(response.data.time * 1000);

  dateArray = formatDate(currentDate);

  currentDayELement.innerHTML = dateArray[0];
  currentHourELement.innerHTML = dateArray[1];
  currentMinuteELement.innerHTML = dateArray[2];
}

function apiCitySearch(searchInputElement) {
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = searchInputElement;

  let apiKey = "2a4389463db3f2o08de3be18t5087eaa";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#sf-input");
  searchInputElement = nameFormat(searchInputElement.value);

  apiCitySearch(searchInputElement);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return [formattedDay, hours, minutes];
}

apiCitySearch("Paris");

let searchFormElement = document.querySelector("#search-form");
console.log(searchFormElement);
searchFormElement.addEventListener("submit", search);
