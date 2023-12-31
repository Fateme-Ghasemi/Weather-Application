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
  getForecast(searchInputElement);
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

function getForecast(city) {
  let apiKeyF = "2a4389463db3f2o08de3be18t5087eaa";
  let unitF = "metric";
  let apiUrlF = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKeyF}&units=${unitF}`;

  axios(apiUrlF).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = ``;

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      let toDay = new Date(day.time * 1000);
      let everyDay = formatDate(toDay);
      forecastHtml += `
    <div class="wfday">
        <div class="date">${everyDay[0].slice(0, 3)}</div>
        <img src="${day.condition.icon_url}" class="wficon" />
        <div class="fts">
          <span class="fts-max">${Math.round(day.temperature.maximum)}°</span>
          <span class="fts-min">${Math.round(day.temperature.minimum)}°</span>
        </div>
    </div>`;
    }
  });
  let forecast = document.querySelector("#wf");
  forecast.innerHTML = forecastHtml;
}

apiCitySearch("Tehran");
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

getForecast("Tehran");
