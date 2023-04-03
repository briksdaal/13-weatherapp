import './style.css';

class WeatherApp {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.location = 'London';
  }

  getLocationWeather(location) {
    if (location) {
      this.location = location;
    }
    const data = this.getJsonFromApi();
    const formattedData = WeatherApp.formatData(data);
    return formattedData;
  }

  getJsonFromApi() {
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${this.location}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => err);
  }
}

const appInst = new WeatherApp('9de13639f3b0415eb13161241230204');

appInst.getJsonFromApi('London')
  .then((data) => {
    console.log('1: ');
    console.log(data);
  });
