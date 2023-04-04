import WeatherApp from './weatherApp';

class ScreenController {
  constructor() {
    this.apiKey = '9de13639f3b0415eb13161241230204';
    this.weatherAppInst = new WeatherApp(this.apiKey);
    this.locationInput = document.querySelector('#location');
    this.submitBtn = document.querySelector('button');
    this.setEventListener();
  }

  setEventListener() {
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.weatherAppInst.getLocationWeather(this.locationInput.value)
        .then((data) => console.log(data));
    });
  }
}

export default ScreenController;
