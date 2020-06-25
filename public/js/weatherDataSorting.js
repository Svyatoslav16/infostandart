const thList = document.querySelectorAll('.weather-table thead .sort th');

for (let i = 0; i < thList.length; i++) {
  thList[i].addEventListener('click', function() {
    let sortWeatherData;
    if(this.classList.contains('ascending-sort')) {
      this.classList.add('descending-sort');
      this.classList.remove('ascending-sort');
      sortWeatherData = weatherData.sort((a, b) => {return  (a[this.dataset.property] < b[this.dataset.property]) ? 1 : -1 });
    } else if(this.classList.contains('descending-sort')) {
      this.classList.add('ascending-sort');
      this.classList.remove('descending-sort');
      sortWeatherData = weatherData.sort((a, b) => {return  (a[this.dataset.property] > b[this.dataset.property]) ? 1 : -1 });
    } else {
      this.classList.add('ascending-sort');
      sortWeatherData = weatherData.sort((a, b) => {return  (a[this.dataset.property] > b[this.dataset.property]) ? 1 : -1 });
    }
    
    let tbody = document.querySelector('.weather-table tbody');
    if(sortWeatherData.length > 0) {
      tbody.innerHTML = '';
    }

    for (let j = 0; j < sortWeatherData.length; j++) {
      let tr = document.createElement('tr');
      let datetimeTD = document.createElement('td');
        datetimeTD.innerText = sortWeatherData[j].datetime;
      let cloudinessTD = document.createElement('td');
        cloudinessTD.innerText = sortWeatherData[j].cloudiness;
      let windDirectionTD = document.createElement('td');
        windDirectionTD.innerText = sortWeatherData[j].windDirection;
      let temperatureTD = document.createElement('td');
        temperatureTD.innerText = sortWeatherData[j].temperature;
      let moistureTD = document.createElement('td');
        moistureTD.innerText = sortWeatherData[j].moisture;
      let windSpeedTD = document.createElement('td');
        windSpeedTD.innerText = sortWeatherData[j].windSpeed;
      let rainfallTD = document.createElement('td');
        rainfallTD.innerText = sortWeatherData[j].rainfall;

      tr.append(datetimeTD);
      tr.append(temperatureTD);
      tr.append(moistureTD);
      tr.append(cloudinessTD);
      tr.append(windDirectionTD);
      tr.append(windSpeedTD);
      tr.append(rainfallTD);

      tbody.append(tr);
    }
  });
}