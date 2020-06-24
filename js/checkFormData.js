document.getElementsByClassName('add-weather-data-btn')[0].addEventListener('click', function() {
  let temperatureInput = document.getElementsByName('temperature')[0];
  let moistureInput = document.getElementsByName('moisture')[0];
  let windSpeedInput = document.getElementsByName('wind-speed')[0];
  let rainfallInput = document.getElementsByName('rainfall')[0];
  let datetimeWrap = document.getElementsByClassName('weather-form__datetime-wrap')[0];

  // Проверка данных в форме на корректность
  if( checkDatetime(datetimeWrap) &&
    checkSelect('cloudiness') &&
    checkSelect('wind-direction') &&
    checkTemperature(temperatureInput.value) &&
    checkMoisture(moistureInput.value) &&
    checkWindSpeed(windSpeedInput.value) &&
    checkRainfall(rainfallInput.value) ) {
    
    addTemperatureDataIcon.classList.remove('active');
    weatherForm.classList.remove('active');
    layer.classList.remove('active');

    let cloudinessOptionsContainer = document.querySelector(`.cloudiness .options-container`).children;
    let windDirectionOptionsContainer = document.querySelector(`.wind-direction .options-container`).children;
    let cloudiness, windDirection;


    for(let i = 0; i < cloudinessOptionsContainer.length; i++) {
      if(cloudinessOptionsContainer[i].children[0].checked === true) {
        cloudiness = cloudinessOptionsContainer[i].children[0].value;
        break;
      }
    }

    for(let i = 0; i < windDirectionOptionsContainer.length; i++) {
      if(windDirectionOptionsContainer[i].children[0].checked === true) {
        windDirection = windDirectionOptionsContainer[i].children[0].value;
        break;
      }
    }

    addWeatherData(
      `${datetimeWrap.children[0].value} ${datetimeWrap.children[1].value}`, 
      temperatureInput.value, 
      moistureInput.value,
      cloudiness,
      windDirection,
      windSpeedInput.value,
      rainfallInput.value
    );

    // Очищение формы
    clearingFormData(datetimeWrap, temperatureInput, moistureInput, windSpeedInput, rainfallInput);
  } else if( !checkTemperature(temperatureInput.value) ) {
    temperatureInput.nextElementSibling.classList.add('empty');
  } else if( !checkMoisture(moistureInput.value) ) {
    moistureInput.nextElementSibling.classList.add('empty');
  } else if( !checkWindSpeed(windSpeedInput.value) ) {
    windSpeedInput.nextElementSibling.classList.add('empty');
  } else if( !checkRainfall(rainfallInput.value) ) {
    rainfallInput.nextElementSibling.classList.add('empty');
  }
});

document.getElementsByName('temperature')[0].addEventListener('input', function() {
  if( checkTemperature(this.value, this.parentNode) ) {
    this.nextElementSibling.nextElementSibling.className = "cross-icon";
    this.nextElementSibling.nextElementSibling.nextElementSibling.className = "correct-icon active";
    this.nextElementSibling.className = "temperature-label material-design-label-for-input valid";
  } else if(this.value.length > 0) {
    this.nextElementSibling.nextElementSibling.nextElementSibling.className = "correct-icon";
    this.nextElementSibling.nextElementSibling.className = "cross-icon active";
    this.nextElementSibling.className = "temperature-label material-design-label-for-input invalid";
  } else if(this.value.length === 0) {
    this.nextElementSibling.nextElementSibling.className = "cross-icon";
    this.nextElementSibling.nextElementSibling.nextElementSibling.className = "cross-icon";
    this.nextElementSibling.className = "temperature-label material-design-label-for-input";
  }
});

document.getElementsByName('moisture')[0].addEventListener('input', function() {
  if( checkMoisture(this.value) ) {
    this.nextElementSibling.nextElementSibling.className = "cross-icon";
    this.nextElementSibling.nextElementSibling.nextElementSibling.className = "correct-icon active";
    this.nextElementSibling.className = "moisture-label material-design-label-for-input valid";
  } else if(this.value.length > 0) {
    this.nextElementSibling.nextElementSibling.nextElementSibling.className = "correct-icon";
    this.nextElementSibling.nextElementSibling.className = "cross-icon active";
    this.nextElementSibling.className = "moisture-label material-design-label-for-input invalid";
  } else if(this.value.length === 0) {
    this.nextElementSibling.nextElementSibling.className = "cross-icon";
    this.nextElementSibling.nextElementSibling.nextElementSibling.className = "cross-icon";
    this.nextElementSibling.className = "moisture-label material-design-label-for-input";
  }
});

document.getElementsByName('wind-speed')[0].addEventListener('input', function() {
  if( checkWindSpeed(this.value) ) {
    this.nextElementSibling.nextElementSibling.className = "cross-icon";
    this.nextElementSibling.nextElementSibling.nextElementSibling.className = "correct-icon active";
    this.nextElementSibling.className = "wind-speed-label material-design-label-for-input valid";
  } else if(this.value.length > 0) {
    this.nextElementSibling.nextElementSibling.nextElementSibling.className = "correct-icon";
    this.nextElementSibling.nextElementSibling.className = "cross-icon active";
    this.nextElementSibling.className = "wind-speed-label material-design-label-for-input invalid";
  } else if(this.value.length === 0) {
    this.nextElementSibling.nextElementSibling.className = "cross-icon";
    this.nextElementSibling.nextElementSibling.nextElementSibling.className = "cross-icon";
    this.nextElementSibling.className = "wind-speed-label material-design-label-for-input";
  }
});

document.getElementsByName('rainfall')[0].addEventListener('input', function() {
  if( checkRainfall(this.value) ) {
    this.nextElementSibling.nextElementSibling.className = "cross-icon";
    this.nextElementSibling.nextElementSibling.nextElementSibling.className = "correct-icon active";
    this.nextElementSibling.className = "rainfall-label material-design-label-for-input valid";
  } else if(this.value.length > 0) {
    this.nextElementSibling.nextElementSibling.nextElementSibling.className = "correct-icon";
    this.nextElementSibling.nextElementSibling.className = "cross-icon active";
    this.nextElementSibling.className = "rainfall-label material-design-label-for-input invalid";
  } else if(this.value.length === 0) {
    this.nextElementSibling.nextElementSibling.className = "cross-icon";
    this.nextElementSibling.nextElementSibling.nextElementSibling.className = "cross-icon";
    this.nextElementSibling.className = "rainfall-label material-design-label-for-input";
  }
});

function checkDatetime(datetimeWrap) {
  if( datetimeWrap.children[0].value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/i) ) {
    if( datetimeWrap.classList.contains('empty') ) {
      datetimeWrap.classList.remove('empty');
    }

    if( datetimeWrap.children[1].value.match(/^[0-9]{2}\:[0-9]{2}$/i) ) {
      if( datetimeWrap.classList.contains('empty') ) {
        datetimeWrap.classList.remove('empty');
      }

      return true;
    } else {
      datetimeWrap.classList.add('empty');
      return false;
    }
  } else {
    datetimeWrap.classList.add('empty');
    return false;
  }
}

function checkSelect(customSelectClass) {
  let optionsContainer = document.querySelector(`.${customSelectClass} .options-container`).children;
  let selected = document.querySelector(`.${customSelectClass} .select-box .selected`);

  for(let i = 0; i < optionsContainer.length; i++) {
    if(optionsContainer[i].children[0].checked === true) {
      if(selected.classList.contains('empty')) {
        selected.classList.remove('empty');
      }

      return true;
    }
  }

  selected.classList.add('empty');
  return false;
}

function checkTemperature(temperature) {
  return ( temperature.match(/^-{0,1}[0-9]{1,2}(\.[1-9]{1})?$/i) ) ? true : false;  
}

function checkMoisture(moisture) {
  return ( moisture.match(/^[0-9]{1,2}(\.[1-9]{1})?$/i) ) ? true : false;  
}

function checkWindSpeed(windSpeed) {
  return ( windSpeed.match(/^[0-9]{1,3}$/i) ) ? true : false;  
}

function checkRainfall(rainfall) {
  return ( rainfall.match(/^[0-9]{1,5}$/i) ) ? true : false;  
}

/** Очистка данных с формы добавления информации о погоде */
function clearingFormData(datetimeWrap, temperatureInput, moistureInput, windSpeedInput, rainfallInput) {
  // Очистка поля дата-время

  datetimeWrap.children[0].value = '';
  datetimeWrap.children[1].value = '';
  // Очистка select-ов
  const formSelectBox = document.querySelectorAll('.weather-form .select-box');
  for (let i = 0; i < formSelectBox.length; i++) {
    const optionsList = selectBox[i].getElementsByClassName("option");
    
    for (let j = 0; j < optionsList.length; j++) {
      if(optionsList[j].children[0].checked === true) {
        optionsList[j].children[0].checked = false;
      }     
    }

    // Вариант кривой, но пока нет идей
    if(selectBox[i].parentNode.classList.contains('cloudiness')) {
      selectBox[i].getElementsByClassName("selected")[0].innerText = 'Облачность';
    } else if(selectBox[i].parentNode.classList.contains('wind-direction')) {
      selectBox[i].getElementsByClassName("selected")[0].innerText = 'Направление ветра';
    }
  }

  // Очистка полей, скрытие галочки о корректности данных в поле, удаление класса valid с поля
  temperatureInput.value = '';
  temperatureInput.nextElementSibling.classList.remove('valid');
  temperatureInput.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('active');

  moistureInput.value = '';
  moistureInput.nextElementSibling.classList.remove('valid');
  moistureInput.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('active');

  windSpeedInput.value = '';
  windSpeedInput.nextElementSibling.classList.remove('valid');
  windSpeedInput.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('active');

  rainfallInput.value = '';
  rainfallInput.nextElementSibling.classList.remove('valid');
  rainfallInput.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove('active');
}