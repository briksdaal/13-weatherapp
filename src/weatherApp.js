import {
  parse, parseISO, getHours,
} from 'date-fns';
import './style.css';

class WeatherApp {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.location = 'Tel Aviv';
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
        return WeatherApp.errorHandler(rawData);
      })
      // fetch error
      .catch((err) => WeatherApp.errorHandler(err));
  }

  getJsonFromApi() {
    return fetch(`https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${this.location}&days=8`, { mode: 'cors' })
      .then((response) => response.json());
  }

  static formatData(data) {
    const weatherObj = { status: 'success' };
    // general data
    weatherObj.name = data.location.name;
    weatherObj.localtime = parse(data.location.localtime, 'yyyy-MM-dd H:mm', new Date());
    // current weather
    weatherObj.current = {
      temp_c: Math.round(data.current.temp_c),
      temp_f: Math.round(data.current.temp_f),
      is_day: data.current.is_day === 1,
      condition: {
        text: data.current.condition.text,
        code: data.current.condition.code,
      },
      maxtemp_c: Math.round(data.forecast.forecastday[0].day.maxtemp_c),
      maxtemp_f: Math.round(data.forecast.forecastday[0].day.maxtemp_f),
      mintemp_c: Math.round(data.forecast.forecastday[0].day.mintemp_c),
      mintemp_f: Math.round(data.forecast.forecastday[0].day.mintemp_f),

    };
    // hourly weather
    const currentHours = getHours(weatherObj.localtime, 0);
    weatherObj.hourly = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]
      .slice(currentHours, currentHours + 24)
      .map((hourData) => ({
        temp_c: Math.round(hourData.temp_c),
        temp_f: Math.round(hourData.temp_f),
        is_day: hourData.is_day === 1,
        condition: {
          text: hourData.condition.text,
          code: hourData.condition.code,
        },
        time: parseISO(hourData.time),
      }));
    // weekly weather
    weatherObj.weekly = data.forecast.forecastday
      // .slice(1)
      .map((forecastday) => ({
        maxtemp_c: Math.round(forecastday.day.maxtemp_c),
        maxtemp_f: Math.round(forecastday.day.maxtemp_f),
        mintemp_c: Math.round(forecastday.day.mintemp_c),
        mintemp_f: Math.round(forecastday.day.mintemp_f),
        condition: {
          text: forecastday.day.condition.text,
          code: forecastday.day.condition.code,
        },
        time: parseISO(forecastday.date),
      }));
    return weatherObj;
  }

  static errorHandler(errorResponse) {
    const errorObj = {
      status: 'error',
    };

    if (errorResponse.error) {
      errorObj.error = errorResponse.error.message;

      if (errorResponse.error.code === 1006) {
        // no matching location error
        errorObj.errorCode = 2;
      } else {
        // other error
        errorObj.errorCode = 3;
      }

      // fetch error
    } else {
      errorObj.error = 'Failed to fetch';
      errorObj.errorCode = 1;
    }

    return errorObj;
  }
}

export default WeatherApp;
