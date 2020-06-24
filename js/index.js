const originalWeatherData = getWeatherData() || [];
let weatherData = originalWeatherData;

const weatherForm = document.getElementsByClassName('weather-form')[0];
const addTemperatureDataIcon = document.getElementsByClassName('header__add-temperature-data-icon')[0];
const layer = document.getElementById('layer');

if(getCookie('wasOnTheSite') === null) {
  let pointerWrapper = document.createElement('div');
    pointerWrapper.className = 'pointer-wrapper';
    pointerWrapper.innerHTML = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.862 477.862" xml:space="preserve">
      <g>
        <path d="M187.722,102.856V17.062C187.719,7.636,180.076-0.003,170.65,0c-4.834,0.001-9.44,2.053-12.676,5.644L4.375,176.311
          c-5.617,6.256-5.842,15.67-0.529,22.187l153.6,187.733c5.968,7.295,16.72,8.371,24.016,2.403c3.952-3.233,6.249-8.066,6.26-13.172
          v-85.043c134.827,4.386,218.965,62.02,256.888,175.787c2.326,6.96,8.841,11.653,16.179,11.656c0.92,0.003,1.84-0.072,2.748-0.222
          c8.256-1.347,14.319-8.479,14.319-16.845C477.855,259.818,356.87,112.174,187.722,102.856z M170.655,255.995
          c-9.426,0-17.067,7.641-17.067,17.067v54.613L39.532,188.257l114.057-126.72v57.924c0,9.426,7.641,17.067,17.067,17.067
          c134.144,0,234.53,92.826,264.124,234.462C379.841,294.6,291.385,255.995,170.655,255.995z"/>
      </g>
    </svg>`;
  setCookie('wasOnTheSite', 'yes', 7);
  let pointerWrapperTitle = document.createElement('div');
    pointerWrapperTitle.innerText = 'Для добавления данных о погоде нажмите на плюс';
  pointerWrapper.append(pointerWrapperTitle);
  document.getElementsByTagName('body')[0].append(pointerWrapper);
  layer.classList.add('active');
  setTimeout(function () {
    let pointerWrapper = document.getElementsByClassName('pointer-wrapper');

    if(pointerWrapper.length > 0) {
      pointerWrapper[0].remove()
      layer.classList.remove('active');
    }
  }, 2000);
}

for (let i = 0; i < weatherData.length; i++) {
  let tr = document.createElement('tr');
  let datetimeTD = document.createElement('td');
    datetimeTD.innerText = weatherData[i].datetime;
  let cloudinessTD = document.createElement('td');
    cloudinessTD.innerText = weatherData[i].cloudiness;
  let windDirectionTD = document.createElement('td');
    windDirectionTD.innerText = weatherData[i].windDirection;
  let temperatureTD = document.createElement('td');
    temperatureTD.innerText = weatherData[i].temperature;
  let moistureTD = document.createElement('td');
    moistureTD.innerText = weatherData[i].moisture;
  let windSpeedTD = document.createElement('td');
    windSpeedTD.innerText = weatherData[i].windSpeed;
  let rainfallTD = document.createElement('td');
    rainfallTD.innerText = weatherData[i].rainfall;

  tr.append(datetimeTD)
  tr.append(temperatureTD);
  tr.append(moistureTD);
  tr.append(cloudinessTD);
  tr.append(windDirectionTD);
  tr.append(windSpeedTD);
  tr.append(rainfallTD);

  let emptyDataWrap = document.querySelector('.weather-table tbody .empty-data-wrap');

  if( emptyDataWrap ) {
    emptyDataWrap.remove();
  }

  document.querySelector('.weather-table tbody').append(tr);
}

addTemperatureDataIcon.addEventListener('click', function() {
  if(document.getElementsByClassName('pointer-wrapper').length === 0) {
    this.classList.toggle('active');
    weatherForm.classList.toggle('active');
    layer.classList.toggle('active');
  } else {
    this.classList.toggle('active');
    weatherForm.classList.toggle('active');
    document.getElementsByClassName('pointer-wrapper')[0].remove();
  }
});

function setCookie(name,value,days = 1) {
  var expires = "";

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "")  + expires + "; path=/;samesite=strict";
}

function getCookie(cookie_name) {
  var results = document.cookie.match ('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
 
  if (results) {
    return (unescape(results[2]));
  } else {
    return null;
  }
}

/** Добавление данных о погоде.Параметры:
 * datetime - Дата и время;
 * cloudiness - облачность;
 * windDirection - направление ветра;
 * temperature - температура;
 * windSpeed - скорость ветра;
 * rainfall - количество осадков */
function addWeatherData(datetime, temperature, moisture, cloudiness, windDirection, windSpeed, rainfall) {
  const newWeatherData = {datetime, temperature, moisture, cloudiness, windDirection, windSpeed, rainfall};
  weatherData.push(newWeatherData);

  // let tr = document.createElement('tr');
  // let datetimeTD = document.createElement('td');
  //   datetimeTD.innerText = datetime;
  // let cloudinessTD = document.createElement('td');
  //   cloudinessTD.innerText = cloudiness;
  // let windDirectionTD = document.createElement('td');
  //   windDirectionTD.innerText = windDirection;
  // let temperatureTD = document.createElement('td');
  //   temperatureTD.innerText = temperature;
  // let moistureTD = document.createElement('td');
  //   moistureTD.innerText = moisture;
  // let windSpeedTD = document.createElement('td');
  //   windSpeedTD.innerText = windSpeed;
  // let rainfallTD = document.createElement('td');
  //   rainfallTD.innerText = rainfall;

  // tr.append(datetimeTD);
  // tr.append(temperatureTD);
  // tr.append(moistureTD);
  // tr.append(cloudinessTD);
  // tr.append(windDirectionTD);
  // tr.append(windSpeedTD);
  // tr.append(rainfallTD);

  // let emptyDataWrap = document.querySelector('.weather-table tbody .empty-data-wrap');

  // if( emptyDataWrap ) {
  //   emptyDataWrap.remove();
  // }
  renderWeatherData([newWeatherData]);

  // document.querySelector('.weather-table tbody').append(tr);
  setCookie('weatherData', JSON.stringify(weatherData), 7);
}

/** Получение данных о погоде с cookie */
function getWeatherData() {
  let weatherData = getCookie('weatherData');
  if(weatherData !== null) {
    weatherDataInArray = JSON.parse(weatherData);
    return weatherDataInArray;
  }

  return null;
}

/** Перерисовка данных погоды в таблице
 * _weatherData -  массив объектов погоды,
 * needCleaning - нужна ли очистка таблицы, 
 * в которой отображаются данные, принимает true или false
 * */
function renderWeatherData(_weatherData, needCleaning) {
  if(needCleaning === true) {
    document.querySelector('.weather-table tbody').innerHTML = '';
  }

  for (let i = 0; i < _weatherData.length; i++) {
    let tr = document.createElement('tr');
    let datetimeTD = document.createElement('td');
      datetimeTD.innerText = _weatherData[i].datetime;
    let cloudinessTD = document.createElement('td');
      cloudinessTD.innerText = _weatherData[i].cloudiness;
    let windDirectionTD = document.createElement('td');
      windDirectionTD.innerText = _weatherData[i].windDirection;
    let temperatureTD = document.createElement('td');
      temperatureTD.innerText = _weatherData[i].temperature;
    let moistureTD = document.createElement('td');
      moistureTD.innerText = _weatherData[i].moisture;
    let windSpeedTD = document.createElement('td');
      windSpeedTD.innerText = _weatherData[i].windSpeed;
    let rainfallTD = document.createElement('td');
      rainfallTD.innerText = _weatherData[i].rainfall;
  
    tr.append(datetimeTD)
    tr.append(temperatureTD);
    tr.append(moistureTD);
    tr.append(cloudinessTD);
    tr.append(windDirectionTD);
    tr.append(windSpeedTD);
    tr.append(rainfallTD);
  
    let emptyDataWrap = document.querySelector('.weather-table tbody .empty-data-wrap');
  
    if( emptyDataWrap ) {
      emptyDataWrap.remove();
    }
  
    document.querySelector('.weather-table tbody').append(tr);
  }
}