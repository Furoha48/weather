const api = 'https://api.open-meteo.com/v1/forecast?latitude=35.6715&longitude=140.0455&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FTokyo';

function getData() {
  fetch(api)
  .then(response => response.json())
  .then(data => makePage(data));
}
getData();
setInterval(getData,1000 * 60 * 60);

function makePage(data) {
  setData('day0', dateFormat(data.daily.time[0]));
  setData('day1', dateFormat(data.daily.time[1]));
  setData('day2', dateFormat(data.daily.time[2]));

  setData('weathercode0', getWMO(data.daily.weather_code[0]));
  setData('weathercode1', getWMO(data.daily.weather_code[1]));
  setData('weathercode2', getWMO(data.daily.weather_code[2]));

  setData('temperature_max0', data.daily.temperature_2m_max[0] + '°C');
  setData('temperature_max1', data.daily.temperature_2m_max[1] + '°C');
  setData('temperature_max2', data.daily.temperature_2m_max[2] + '°C');

  setData('temperature_min0', data.daily.temperature_2m_min[0] + '°C');
  setData('temperature_min1', data.daily.temperature_2m_min[1] + '°C');
  setData('temperature_min2', data.daily.temperature_2m_min[2] + '°C');

  setData('precipitation_sum0', data.daily.precipitation_sum[0] + 'mm');
  setData('precipitation_sum1', data.daily.precipitation_sum[1] + 'mm');
  setData('precipitation_sum2', data.daily.precipitation_sum[2] + 'mm');

  setCondition('condition0', data.daily.temperature_2m_max[0]);
  setCondition('condition1', data.daily.temperature_2m_max[1]);
  setCondition('condition2', data.daily.temperature_2m_max[2]);

  updateBackground(data.daily.weather_code[0]);

  if ( data.daily.precipitation_sum[0] > 0 ) {
    document.body.style.backgroundImage = 'linear-gradient(#ccf 5%, #fff 10%)';
  } else {
    document.body.style.backgroundImage = 'linear-gradient(#fec 5%, #fff 10%)';
  }
}

function setData(id,data) {
  document.getElementById(id).innerHTML = data;
}

function dateFormat(date, mode) {
  let dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  const hour = add0(dateObject.getHours());
  const minute = add0(dateObject.getMinutes());
  const second = add0(dateObject.getSeconds());

  if(mode == 1) {
    return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
  } else {
    return month + '月' + day + '日';
  }
}

function add0 (val) {
  if(val < 10) {
    val = '0' + val;
  }
  return val;
}

function getWMO(w) {
  if (w==0) {
    return '☀️';
  } else if (w==1) {
    return '🌤';
  } else if (w==2) {
    return '⛅️';
  } else if (w==3) {
    return '☁️';
  } else if (w==45) {
    return '霧';
  } else if (w==48) {
    return '霧氷';
  } else if (w==51) {
    return '霧雨';
  } else if (w==53) {
    return '霧雨';
  } else if (w==55) {
    return '霧雨';
  } else if (w==56) {
    return '霧雨';
  } else if (w==57) {
    return '霧雨';
  } else if (w==61) {
    return '☔️';
  } else if (w==63) {
    return '☔️';
  } else if (w==65) {
    return '☔️';
  } else if (w==66) {
    return '氷雨';
  } else if (w==67) {
    return '氷雨';
  } else if (w==71) {
    return '❄️';
  } else if (w==73) {
    return '❄️';
  } else if (w==75) {
    return '❄️';
  } else if (w==77) {
    return '❄️';
  } else if (w==80) {
    return '☔️';
  } else if (w==81) {
    return '☔️';
  } else if (w==82) {
    return '☔️';
  } else if (w==85) {
    return '❄️';
  } else if (w==86) {
    return '❄️';
  } else if (w==95) {
    return '⚡️☔️';
  } else if (w==96) {
    return '⚡️☔️';
  } else if (w==99) {
    return '⚡️☔️';
  } else {
    return w;
  }
}

function setCondition(id, temperature) {
  let condition;

  if (temperature >= 30) {
    condition = '↑';
  } else if (temperature >= 25) {
    condition = '↗️';
  } else if (temperature >= 20) {
    condition = '→';
  } else if (temperature >= 15) {
    condition = '↘️';
  } else {
    condition = '↓';
  }

  setData(id, condition);
}

function updateBackground(weatherCode) {
  document.body.className = ''; 

  if (weatherCode == 0) {
    document.body.classList.add('sunny');
  } else if (weatherCode == 1 || weatherCode == 2 || weatherCode == 3) {
    document.body.classList.add('cloudy');
  } else if (weatherCode >= 51 && weatherCode <= 67 || weatherCode >= 80 && weatherCode <= 82 || weatherCode == 95 || weatherCode == 96 || weatherCode == 99) {
    document.body.classList.add('rainy');
  } else if (weatherCode >= 71 && weatherCode <= 77 || weatherCode >= 85 && weatherCode <= 86) {
    document.body.classList.add('snowy');
  }
}

function updateScreen() {
  setData('time',dateFormat(new Date(),1));
}
window.onload=updateScreen;

setInterval(updateScreen,1000);