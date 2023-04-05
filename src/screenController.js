import format from 'date-fns/format';
import WeatherApp from './weatherApp';

class ScreenController {
  constructor() {
    this.apiKey = '9de13639f3b0415eb13161241230204';
    this.weatherAppInst = new WeatherApp(this.apiKey);
    this.data = null;
    this.degreesIn = 'c';

    // current selectors
    this.locationTitle = document.querySelector('.location-title');
    this.curDeg = document.querySelector('.cur-deg');
    this.curCondition = document.querySelector('.cur-condition');
    this.curHiDeg = document.querySelector('.cur-hi-deg');
    this.curLoDeg = document.querySelector('.cur-lo-deg');
    this.curHours = document.querySelector('.cur-time .hour');
    this.curDate = document.querySelector('.cur-time .date');

    // hourly selectors
    this.hourlyObj = Array.from(document.querySelectorAll('.hour-weather'))
      .map((hourDiv) => ({
        time: hourDiv.querySelector('.hour-time'),
        icon: hourDiv.querySelector('.hour-icon'),
        deg: hourDiv.querySelector('.hour-deg'),
      }));

    // weekly selectors
    this.weeklyObj = Array.from(document.querySelectorAll('.day-weather'))
      .map((dayDiv) => ({
        time: dayDiv.querySelector('.day-name'),
        icon: dayDiv.querySelector('.day-icon'),
        hi: dayDiv.querySelector('.day-hi-deg'),
        lo: dayDiv.querySelector('.day-lo-deg'),
      }));

    // form and button selectors
    this.locationInput = document.querySelector('#location');
    this.submitBtn = document.querySelector('.location-submit');

    this.cDegBtn = document.querySelector('.deg-c-btn');
    this.fDegBtn = document.querySelector('.deg-f-btn');

    // listeners
    this.setEventListeners();

    // get London weather on load
    this.weatherAppInst.getLocationWeather()
      .then((data) => this.update(data));
  }

  update(data) {
    this.data = data;
    this.populateScreen();
  }

  populateScreen() {
    console.log(this.data);
    if (this.data.status === 'error') {
      this.errorHandler();
      return;
    }
    // current
    this.locationTitle.textContent = this.data.name;
    this.curCondition.textContent = this.data.current.condition.text;
    this.curHours.textContent = format(this.data.localtime, 'HH:mm');
    this.curDate.textContent = format(this.data.localtime, 'LLL do, yyyy');

    // hourly
    this.hourlyObj.forEach((hour, i) => {
      if (!i) {
        hour.time.textContent = 'Now';
      } else {
        hour.time.textContent = format(this.data.hourly[i].time, 'H');
      }
      hour.icon.textContent = this.data.hourly[i].condition.text;
    });

    // weekly
    this.weeklyObj.forEach((day, i) => {
      if (!i) {
        day.time.textContent = 'Today';
      } else {
        day.time.textContent = format(this.data.weekly[i].time, 'ccc');
      }
      day.icon.textContent = this.data.weekly[i].condition.text;
    });

    this.populateDegrees();
  }

  populateDegrees() {
    // current
    this.curDeg.textContent = `${this.data.current[`temp_${this.degreesIn}`]}°`;
    this.curHiDeg.textContent = `${this.data.current[`maxtemp_${this.degreesIn}`]}°`;
    this.curLoDeg.textContent = `${this.data.current[`mintemp_${this.degreesIn}`]}°`;

    // hourly
    this.hourlyObj.forEach((hour, i) => {
      hour.deg.textContent = `${this.data.hourly[i][`temp_${this.degreesIn}`]}°`;
    });

    // weekly
    this.weeklyObj.forEach((day, i) => {
      day.hi.textContent = `${this.data.weekly[i][`maxtemp_${this.degreesIn}`]}°`;
      day.lo.textContent = `${this.data.weekly[i][`mintemp_${this.degreesIn}`]}°`;
    });
  }

  changeDegrees(deg) {
    this.degreesIn = deg;
  }

  errorHandler() {
    console.log(this.data);
  }

  setEventListeners() {
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.weatherAppInst.getLocationWeather(this.locationInput.value)
        .then((data) => this.update(data));
    });
    this.cDegBtn.addEventListener('click', () => {
      if (this.degreesIn === 'c') {
        return;
      }
      this.degreesIn = 'c';
      this.populateDegrees();
    });
    this.fDegBtn.addEventListener('click', () => {
      if (this.degreesIn === 'f') {
        return;
      }
      this.degreesIn = 'f';
      this.populateDegrees();
    });
  }
}

export default ScreenController;
