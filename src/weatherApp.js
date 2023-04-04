import {
  parse, parseISO, getHours,
} from 'date-fns';
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

    return this.getJsonFromApi()
      .then((rawData) => {
        // valid data
        if (!(rawData.error)) {
          return WeatherApp.formatData(rawData);
        }
        // api response error
        return WeatherApp.apiErrorHandler(rawData);
      })
      // fetch error
      .catch(() => WeatherApp.createErrorObj(1));
  }

  getJsonFromApi() {
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${this.location}&days=8`)
      .then((response) => response.json());
  }

  static formatData(data) {
    const weatherObj = { status: 'success' };
    // general data
    weatherObj.name = data.location.name;
    weatherObj.localtime = parse(data.location.localtime, 'yyyy-MM-dd H:mm', new Date());
    // current weather
    weatherObj.current = {
      temp_c: data.current.temp_c,
      temp_f: data.current.temp_f,
      feelslike_c: data.current.feelslike_c,
      feelslike_f: data.current.feelslike_f,
      is_day: data.current.is_day === 1,
      humidity: data.current.humidity,
      condition: {
        text: data.current.condition.text,
        code: data.current.condition.code,
      },
      maxtemp_c: data.forecast.forecastday[0].day.maxtemp_c,
      maxtemp_f: data.forecast.forecastday[0].day.maxtemp_f,
      mintemp_c: data.forecast.forecastday[0].day.mintemp_c,
      mintemp_f: data.forecast.forecastday[0].day.mintemp_f,

    };
    // hourly weather
    const currentHours = getHours(weatherObj.localtime, 0);
    weatherObj.hourly = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]
      .map((hourData) => ({
        temp_c: hourData.temp_c,
        temp_f: hourData.temp_f,
        is_day: hourData.is_day === 1,
        condition: {
          text: hourData.condition.text,
          code: hourData.condition.code,
        },
        time: parseISO(hourData.time),
      }))
      .slice(currentHours, currentHours + 25);
    // weekly weather
    weatherObj.weekly = data.forecast.forecastday
      .slice(1)
      .map((forecastday) => ({
        maxtemp_c: forecastday.day.maxtemp_c,
        maxtemp_f: forecastday.day.maxtemp_f,
        mintemp_c: forecastday.day.mintemp_c,
        mintemp_f: forecastday.day.mintemp_f,
        condition: {
          text: forecastday.day.condition.text,
          code: forecastday.day.condition.code,
        },
        time: parseISO(forecastday.date),
      }));
    return weatherObj;
  }

  static apiErrorHandler(errorResponse) {
    // no matching location error
    if (errorResponse.error.code === 1006) {
      return WeatherApp.createErrorObj(2);
    }

    // other error
    return WeatherApp.createErrorObj(3, errorResponse.error.message);
  }

  static createErrorObj(errorCode, errorMsg) {
    const errorObj = {
      status: 'error',
      errorCode,
    };

    if (errorCode === 1) {
      errorObj.error = 'Failed to fetch';
    } else if (errorCode === 2) {
      errorObj.error = 'No matching location found';
    } else {
      errorObj.error = errorMsg;
    }

    return errorObj;
  }
}

export default WeatherApp;
