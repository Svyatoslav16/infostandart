const filtrationTitle = document.getElementsByClassName('filtration__title')[0];
const filtrationSettings = document.getElementsByClassName('filtration__settings')[0];

const filterIcon = document.querySelector('.filtration__title svg');

const filteringSettingsElements = {
  datetime: {
    dateFrom: filtrationSettings.children[0].children[1].children[1],
    timeFrom: filtrationSettings.children[0].children[1].children[2],
    dateTo: filtrationSettings.children[0].children[2].children[1],
    timeTo: filtrationSettings.children[0].children[2].children[2]
  },
  temperature: {
    from: filtrationSettings.children[1].children[1].children[1],
    to: filtrationSettings.children[1].children[2].children[1]
  },
  moisture: {
    from: filtrationSettings.children[2].children[1].children[1],
    to: filtrationSettings.children[2].children[2].children[1]
  },
  cloudiness: filtrationSettings.children[3].children[1].children,
  windDirection: filtrationSettings.children[4].children[1].children,
  windSpeed: {
    from: filtrationSettings.children[5].children[1].children[1],
    to: filtrationSettings.children[5].children[2].children[1]
  },
  rainfall: {
    from: filtrationSettings.children[6].children[1].children[1],
    to: filtrationSettings.children[6].children[2].children[1]
  }
}

filtrationTitle.addEventListener('click', function() {
  this.classList.toggle('active');
  filtrationSettings.classList.toggle('active');
});

document.querySelector('.filtration__settings__control-button .apply-btn').addEventListener('click', function () {
  weatherData = weatherDataFiltering(originalWeatherData,getDataFromFilteringSettings());
  renderWeatherData( weatherData, true );
  
  filtrationTitle.classList.remove('active');
  filtrationSettings.classList.remove('active');
  filterIcon.classList.add('active');
});

document.querySelector('.filtration__settings__control-button .cancel-btn').addEventListener('click', function () {
  clearFilterOptions();
  renderWeatherData(originalWeatherData, true);
  filtrationTitle.classList.remove('active');
  filtrationSettings.classList.remove('active');
  filterIcon.classList.remove('active');
});

document.querySelector('.filtration__settings__control-button .clear-all-filter-btn').addEventListener('click', function () {
  clearFilterOptions();
  filterIcon.classList.remove('active');
});

function weatherDataFiltering(dataToFilter, filterOptions) {
  let filteredData = [];
  for (let i = 0; i < dataToFilter.length; i++) {
    let filteredRecord = dataToFilter[i];
    Object.keys(filterOptions).map((prop, index, array) => {
      if(filteredRecord) {
        filteredRecord = weatherDataFilteringSubfunction(filteredRecord, prop, filterOptions[prop]);
      }
      if(index === array.length - 1) {
        if(filteredRecord) {
          filteredData.push(filteredRecord);
        }
      }
    });
  }
  
  return filteredData;
}

function weatherDataFilteringSubfunction(data, propName, propValue) {
  if(propName === 'datetime') {
    regexForTime = /[0-9]{2}:[0-9]{2}/;
    let dateToCompare = new Date(data[propName]);
    let from = new Date(propValue.from);
    let to = new Date(propValue.to);
    if( !isNaN(from.getTime()) || !isNaN(to.getTime()) ) { // сравнение валидной даты
      if( !isNaN(from.getTime()) ) {
        if( !isNaN(to.getTime()) ) {
          if(from <= dateToCompare && dateToCompare <= to) {
            return data;
          }
        } else {
          if(from <= dateToCompare) {
            return data;
          }
        }
      } else if( !isNaN(to.getTime()) ) {
        if( !isNaN(from.getTime()) ) {
          if( from <= dateToCompare && dateToCompare <= to ) {
            return data;
          }
        } else {
          if(to >= dateToCompare) {
            return data;
          }
        }
      }
    } else if( regexForTime.test(propValue.from) || regexForTime.test(propValue.to) ) { // сравнение времени типа 00:00
      if( regexForTime.test(propValue.from) ) {
        let timeFrom = new Date();
        timeFrom.setHours(propValue.from.split(':')[0])
        timeFrom.setMinutes(propValue.from.split(':')[1]);

        if( regexForTime.test(propValue.to) ) {
          let timeTo = new Date();
          timeTo.setHours(propValue.to.split(':')[0])
          timeTo.setMinutes(propValue.to.split(':')[1]);
          if(timeFrom <= dateToCompare && dateToCompare <= timeTo) {
            return data;
          }
        } else {
          if(timeFrom <= dateToCompare) {
            return data;
          }
        }
      } else if( regexForTime.test(propValue.from) ) {
        let timeTo = new Date();
        timeTo.setHours(propValue.to.split(':')[0])
        timeTo.setMinutes(propValue.to.split(':')[1]);

        if( regexForTime.test(propValue.to) ) {
          let timeFrom = new Date();
          timeFrom.setHours(propValue.from.split(':')[0])
          timeFrom.setMinutes(propValue.from.split(':')[1]);
          if(timeFrom <= dateToCompare && dateToCompare <= timeTo) {
            return data;
          }
        } else {
          if(timeTo >= dateToCompare) {
            return data;
          }
        }
      }
    } else if(typeof propValue.from === 'string' && typeof propValue.to === 'string') {
      return data;
    }
    return '';
  } else if( propName === 'cloudiness' || propName === 'windDirection' ) {
    if(propValue.length > 0) {
      return ( propValue.includes(data[propName]) ) ? data : '';
    } else {
      return data;
    }
  } else {
    if(propValue.from || propValue.to) {
      if(propValue.from.length > 0) {
        if(propValue.to.length > 0) {
          if(parseInt(propValue.from) <= parseInt(data[propName]) && parseInt(data[propName]) <= parseInt(propValue.to)) { 
            return data;
          }
        } else {
          if(parseInt(propValue.from) <= parseInt(data[propName])) {
            return data;
          }
        }
      } else if(propValue.to.length > 0) {
        if(propValue.from.length > 0) {
          if(parseInt(propValue.from) <= parseInt(data[propName]) && parseInt(data[propName]) <= parseInt(propValue.to)) {
            return data;
          }
        } else {
          if(parseInt(propValue.to) >= parseInt(data[propName])) {
            return data;
          }
        }
      }
    }

    return '';
  }
}

function getDataFromFilteringSettings() {
  let cloudinessOptions = [];
  for(let i = 0; i < filteringSettingsElements.cloudiness.length; i++) {
    if(filteringSettingsElements.cloudiness[i].children[0].checked) {
      cloudinessOptions.push(filteringSettingsElements.cloudiness[i].children[0].value);
    }
  }

  let windDirectionOptions = [];
  for(let i = 0; i < filteringSettingsElements.windDirection.length; i++) {
    if(filteringSettingsElements.windDirection[i].children[0].checked) {
      windDirectionOptions.push(filteringSettingsElements.windDirection[i].children[0].value);
    }
  }

  const dataFromFilteringSettings = {
    datetime: {
      from : `${filteringSettingsElements.datetime.dateFrom.value}${(filteringSettingsElements.datetime.timeFrom.value.length > 0) ? 
                                                                      ' ' + filteringSettingsElements.datetime.timeFrom.value : 
                                                                      ''}`,
      to : `${filteringSettingsElements.datetime.dateTo.value}${(filteringSettingsElements.datetime.timeTo.value.length > 0) ?
                                                                  ' ' + filteringSettingsElements.datetime.timeTo.value 
                                                                  : ''}`
    },
    temperature: {
      from: filteringSettingsElements.temperature.from.value,
      to: filteringSettingsElements.temperature.to.value
    },
    moisture: {
      from: filteringSettingsElements.moisture.from.value,
      to: filteringSettingsElements.moisture.to.value
    },
    cloudiness: cloudinessOptions.join(' '),
    windDirection: windDirectionOptions.join(' '),
    windSpeed: {
      from: filteringSettingsElements.windSpeed.from.value,
      to: filteringSettingsElements.windSpeed.to.value
    },
    rainfall: {
      from: filteringSettingsElements.rainfall.from.value,
      to: filteringSettingsElements.rainfall.to.value
    }
  }

  return dataFromFilteringSettings;
}

function clearFilterOptions() {
  filteringSettingsElements.datetime.dateFrom.value = '';
  filteringSettingsElements.datetime.dateTo.value = '';
  filteringSettingsElements.datetime.timeFrom.value = '';
  filteringSettingsElements.datetime.timeTo.value = '';

  filteringSettingsElements.temperature.from.value = filteringSettingsElements.temperature.from.dataset.originalValue;
  filteringSettingsElements.temperature.to.value = filteringSettingsElements.temperature.to.dataset.originalValue;

  filteringSettingsElements.moisture.from.value = filteringSettingsElements.moisture.from.dataset.originalValue;
  filteringSettingsElements.moisture.to.value = filteringSettingsElements.moisture.to.dataset.originalValue;

  filteringSettingsElements.windSpeed.from.value = filteringSettingsElements.windSpeed.from.dataset.originalValue;
  filteringSettingsElements.windSpeed.to.value = filteringSettingsElements.windSpeed.to.dataset.originalValue;

  filteringSettingsElements.rainfall.from.value = filteringSettingsElements.rainfall.from.dataset.originalValue;
  filteringSettingsElements.rainfall.to.value = filteringSettingsElements.rainfall.to.dataset.originalValue;

  for(let i = 0; i < filteringSettingsElements.cloudiness.length; i++) {
    if(filteringSettingsElements.cloudiness[i].children[0].checked === true) {
      filteringSettingsElements.cloudiness[i].children[0].checked = false;
    }
  }

  for(let i = 0; i < filteringSettingsElements.windDirection.length; i++) {
    if(filteringSettingsElements.windDirection[i].children[0].checked === true) {
      filteringSettingsElements.windDirection[i].children[0].checked = false;
    }
  }
}