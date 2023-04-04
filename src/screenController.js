import format from 'date-fns/format';
import WeatherApp from './weatherApp';

class ScreenController {
  constructor() {
    this.apiKey = '9de13639f3b0415eb13161241230204';
    this.weatherAppInst = new WeatherApp(this.apiKey);
    this.degreesIn = 'c';

    this.locationTitle = document.querySelector('.location-title');
    this.curDeg = document.querySelector('.cur-deg span');
    this.curCondition = document.querySelector('.cur-condition');
    this.curHiDeg = document.querySelector('.cur-hi-deg');
    this.curLoDeg = document.querySelector('.cur-lo-deg');
    this.curHours = document.querySelector('.cur-time .hour');
    this.curDate = document.querySelector('.cur-time .date');

    this.locationInput = document.querySelector('#location');
    this.submitBtn = document.querySelector('.location-submit');

    this.cDegBtn = document.querySelector('.deg-c-btn');
    this.fDegBtn = document.querySelector('.deg-f-btn');
    this.setEventListeners();
    this.weatherAppInst.getLocationWeather()
      .then((data) => this.populateScreen(data));
  }

  populateScreen(data) {
    // current
    this.locationTitle.textContent = data.name;
    this.curDeg.textContent = data.current[`temp_${this.degreesIn}`];
    this.curCondition.textContent = data.current.condition.text;
    this.curHiDeg.textContent = data.current[`maxtemp_${this.degreesIn}`];
    this.curLoDeg.textContent = data.current[`mintemp_${this.degreesIn}`];
    this.curHours.textContent = format(data.localtime, 'HH:mm');
    this.curDate.textContent = format(data.localtime, 'LLL do, yyyy');

    // hourly

    // weekly

    console.log(data);
  }

  changeDegrees(deg) {
    this.degreesIn = deg;
  }

  setEventListeners() {
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.weatherAppInst.getLocationWeather(this.locationInput.value)
        .then((data) => this.populateScreen(data));
    });
    // this.cDegBtn('click',)
  }
}

export default ScreenController;
