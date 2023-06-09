import format from 'date-fns/format';
import {
  mdiMagnify,
  mdiClockTimeEightOutline,
  mdiCalendarMonthOutline,
  mdiChevronLeft,
  mdiChevronRight,
  mdiAutorenew,
  mdiGithub,
} from '@mdi/js';
import WeatherApp from './weatherApp';
import createIcon from './iconMatcher';
import getBackground from './bgMatcher';
import { createSvg } from './utils';

class ScreenController {
  constructor() {
    this.apiKey = '9de13639f3b0415eb13161241230204';
    this.weatherAppInst = new WeatherApp(this.apiKey);
    this.location = 'Tel Aviv';
    this.data = null;
    this.degreesIn = 'c';

    // current selectors
    this.main = document.querySelector('.main');
    this.currentContainer = document.querySelector('.current-container');
    this.loading = document.querySelector('.loading');
    this.locationTitle = document.querySelector('.location-title');
    this.curDeg = document.querySelector('.cur-deg');
    this.curCondition = document.querySelector('.cur-condition');
    this.curHiDeg = document.querySelector('.cur-hi-deg');
    this.curLoDeg = document.querySelector('.cur-lo-deg');
    this.curHours = document.querySelector('.cur-time .hour');
    this.curDate = document.querySelector('.cur-time .date');

    // loading selectors
    this.loadingIcon = document.querySelector('.loading-icon');

    // error selectors
    this.errorCode = document.querySelector('.error-code');
    this.errorMsg = document.querySelector('.error-msg');

    // hourly selectors
    this.hourlyObj = Array.from(document.querySelectorAll('.hour-weather'))
      .map((hourDiv) => ({
        container: hourDiv,
        time: hourDiv.querySelector('.hour-time'),
        icon: hourDiv.querySelector('.hour-icon'),
        deg: hourDiv.querySelector('.hour-deg'),
      }));
    this.hourlyIcon = document.querySelector('.hourly-icon');
    this.hourlyIcon.appendChild(createSvg(mdiClockTimeEightOutline));
    this.hourlySliderPosition = 0;

    // weekly selectors
    this.weeklyObj = Array.from(document.querySelectorAll('.day-weather'))
      .map((dayDiv) => ({
        time: dayDiv.querySelector('.day-name'),
        icon: dayDiv.querySelector('.day-icon'),
        hi: dayDiv.querySelector('.day-hi-deg'),
        lo: dayDiv.querySelector('.day-lo-deg'),
      }));
    this.weeklyIcon = document.querySelector('.weekly-icon');

    // form and button selectors
    this.locationInput = document.querySelector('#location');
    this.submitBtn = document.querySelector('.location-submit');

    this.cDegBtn = document.querySelector('.deg-c-btn');
    this.fDegBtn = document.querySelector('.deg-f-btn');

    this.leftButton = document.querySelector('.left-button');
    this.rightButton = document.querySelector('.right-button');

    // generate footer content
    this.footerText = document.querySelector('.footer-text');
    this.footerText.textContent = `Copyright © ${new Date().getFullYear()} Briksdaal`;
    this.footerLink = document.querySelector('.footer-link');

    // generate svgs
    this.loadingIcon.appendChild(createSvg(mdiAutorenew));
    this.weeklyIcon.appendChild(createSvg(mdiCalendarMonthOutline));
    this.submitBtn.appendChild(createSvg(mdiMagnify));
    this.leftButton.appendChild(createSvg(mdiChevronLeft));
    this.rightButton.appendChild(createSvg(mdiChevronRight));
    this.footerLink.appendChild(createSvg(mdiGithub));

    // set 'sunny' background as default
    this.main.style.backgroundImage = `url(${getBackground()})`;

    // listeners
    this.setEventListeners();

    // get Tel Aviv weather on load
    this.update();
  }

  update() {
    this.main.classList.remove('error');
    this.weatherAppInst.getLocationWeather(this.location)
      .then((data) => {
        this.data = data;
        this.main.classList.remove('loading');
        if (this.data.status === 'success') {
          this.populateScreen();
        } else if (this.data.status === 'error') {
          this.errorHandler();
        }
      });
    this.main.classList.add('loading');
  }

  populateScreen() {
    // current
    this.main.style.backgroundImage = `url(${getBackground(
      this.data.current.condition.code,
      this.data.current.is_day,
    )})`;
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
      if (hour.icon.firstElementChild) {
        hour.icon.firstElementChild.remove();
      }
      hour.icon.appendChild(
        createIcon(this.data.hourly[i].condition.code, this.data.hourly[i].is_day),
      );
    });

    // weekly
    this.weeklyObj.forEach((day, i) => {
      if (!i) {
        day.time.textContent = 'Today';
      } else {
        day.time.textContent = format(this.data.weekly[i].time, 'ccc');
      }

      if (day.icon.firstElementChild) {
        day.icon.firstElementChild.remove();
      }
      day.icon.appendChild(
        createIcon(this.data.weekly[i].condition.code, true),
      );
    });

    this.populateDegrees();
  }

  populateDegrees() {
    // current
    this.curDeg.textContent = `${this.data.current[`temp_${this.degreesIn}`]}`;
    this.curHiDeg.textContent = `H: ${this.data.current[`maxtemp_${this.degreesIn}`]}`;
    this.curLoDeg.textContent = `L: ${this.data.current[`mintemp_${this.degreesIn}`]}`;

    // hourly
    this.hourlyObj.forEach((hour, i) => {
      hour.deg.textContent = `${this.data.hourly[i][`temp_${this.degreesIn}`]}`;
    });

    // weekly
    this.weeklyObj.forEach((day, i) => {
      day.hi.textContent = `H: ${this.data.weekly[i][`maxtemp_${this.degreesIn}`]}`;
      day.lo.textContent = `L: ${this.data.weekly[i][`mintemp_${this.degreesIn}`]}`;
    });
  }

  showEightHours() {
    this.hourlyObj.forEach((hour, i) => {
      if (!(i >= this.hourlySliderPosition * 8 && i < (this.hourlySliderPosition + 1) * 8)) {
        hour.container.classList.add('hidden');
      } else {
        hour.container.classList.remove('hidden');
      }
    });
  }

  changeDegrees(deg) {
    this.degreesIn = deg;
  }

  errorHandler() {
    console.log(this.data);
    this.main.classList.add('error');
    this.errorCode.textContent = `Code: ${this.data.errorCode}`;
    this.errorMsg.textContent = this.data.error;
  }

  setEventListeners() {
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.location = this.locationInput.value;
      this.update();
    });

    this.cDegBtn.addEventListener('click', () => {
      if (this.degreesIn === 'c') {
        return;
      }
      this.degreesIn = 'c';
      this.cDegBtn.classList.remove('inactive');
      this.fDegBtn.classList.add('inactive');
      this.populateDegrees();
    });

    this.fDegBtn.addEventListener('click', () => {
      if (this.degreesIn === 'f') {
        return;
      }
      this.degreesIn = 'f';
      this.cDegBtn.classList.add('inactive');
      this.fDegBtn.classList.remove('inactive');
      this.populateDegrees();
    });

    this.leftButton.addEventListener('click', () => {
      this.rightButton.classList.remove('inactive');
      if (this.hourlySliderPosition !== 0) {
        this.hourlySliderPosition -= 1;
        this.showEightHours();
        if (this.hourlySliderPosition === 0) {
          this.leftButton.classList.add('inactive');
        }
      }
    });

    this.rightButton.addEventListener('click', () => {
      this.leftButton.classList.remove('inactive');
      if (this.hourlySliderPosition !== 2) {
        this.hourlySliderPosition += 1;
        this.showEightHours();
        if (this.hourlySliderPosition === 2) {
          this.rightButton.classList.add('inactive');
        }
      }
    });
  }
}

export default ScreenController;
