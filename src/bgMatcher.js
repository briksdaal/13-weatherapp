import sunny from './assets/backgrounds/sunny.webp';
import clearNight from './assets/backgrounds/clear_night.webp';
import cloudyDay from './assets/backgrounds/cloudy_day.webp';
import cloudyNight from './assets/backgrounds/cloudy_night.webp';
import rainy from './assets/backgrounds/rainy.webp';
import snowy from './assets/backgrounds/snowy.webp';
import thunderstorm from './assets/backgrounds/thunderstorm.webp';
import stormClouds from './assets/backgrounds/storm_clouds.webp';

function getBackground(conditionCode, isDay) {
  let bg;
  switch (conditionCode) {
    case 1000:
    // Clear
      if (isDay) {
        bg = sunny;
      } else {
        bg = clearNight;
      }
      break;

    case 1003:
    // partly cloudy
      if (isDay) {
        bg = cloudyDay;
      } else {
        bg = cloudyNight;
      }
      break;

    case 1006:
    // cloudy
      if (isDay) {
        bg = cloudyDay;
      } else {
        bg = cloudyNight;
      }
      break;

    case 1009:
    // overcast
      bg = stormClouds;
      break;

    case 1030:
    // Mist
      if (isDay) {
        bg = cloudyDay;
      } else {
        bg = cloudyNight;
      }
      break;

    case 1063:
    // Patchy rain possible
      bg = rainy;
      break;

    case 1066:
    // Patchy snow possible
      bg = snowy;
      break;

    case 1069:
    // Patchy sleet possible
      bg = snowy;
      break;

    case 1072:
    // Patchy freezing drizzle possible
      bg = rainy;
      break;

    case 1087:
    // Thundery outbreaks possible
      bg = thunderstorm;
      break;

    case 1114:
    // Blowing snow
      bg = snowy;
      break;

    case 1117:
    // Blizzard
      bg = snowy;
      break;

    case 1135:
    // Fog
      bg = stormClouds;
      break;

    case 1147:
    // Freezing fog
      bg = stormClouds;
      break;

    case 1150:
      // Patchy light drizzle
      bg = rainy;
      break;

    case 1153:
      // Light drizzle
      bg = rainy;
      break;

    case 1168:
      // Freezing drizzle
      bg = rainy;
      break;

    case 1171:
      // Heavy freezing drizzle
      bg = rainy;
      break;

    case 1180:
      // Patchy light rain
      bg = rainy;
      break;

    case 1183:
      // Light rain
      bg = rainy;
      break;

    case 1186:
      // Moderate rain at times
      bg = rainy;
      break;

    case 1189:
      // Moderate rain
      bg = rainy;
      break;

    case 1192:
      // Heavy rain at times
      bg = rainy;
      break;

    case 1195:
      // Heavy rain
      bg = rainy;
      break;

    case 1198:
      // Light freezing rain
      bg = rainy;
      break;

    case 1201:
      // Moderate or heavy freezing rain
      bg = rainy;
      break;

    case 1204:
      // Light sleet
      bg = rainy;
      break;

    case 1207:
      // Moderate or heavy sleet
      bg = snowy;
      break;

    case 1210:
      // Patchy light snow
      bg = snowy;
      break;

    case 1213:
      // Light snow
      bg = snowy;
      break;

    case 1216:
      // Patchy moderate snow
      bg = snowy;
      break;

    case 1219:
      // Moderate snow
      bg = snowy;
      break;

    case 1222:
      // Patchy heavy snow
      bg = snowy;
      break;

    case 1225:
      // Heavy snow
      bg = snowy;
      break;

    case 1237:
      // Ice pellets
      bg = rainy;
      break;

    case 1240:
      // Light rain shower
      bg = rainy;
      break;

    case 1243:
      // Moderate or heavy rain shower
      bg = rainy;
      break;

    case 1246:
      // Torrential rain shower
      bg = rainy;
      break;

    case 1249:
      // Light sleet showers
      bg = rainy;
      break;

    case 1252:
      // Moderate or heavy sleet showers
      bg = rainy;
      break;

    case 1255:
      // Light snow showers
      bg = snowy;
      break;

    case 1258:
      // Moderate or heavy snow showers
      bg = snowy;
      break;

    case 1261:
      // Light showers of ice pellets
      bg = rainy;
      break;

    case 1264:
      // Moderate or heavy showers of ice pellets
      bg = rainy;
      break;

    case 1273:
      // Patchy light rain with thunder
      bg = thunderstorm;
      break;

    case 1276:
      // Moderate or heavy rain with thunder
      bg = thunderstorm;
      break;

    case 1279:
      // Patchy light snow with thunder
      bg = thunderstorm;
      break;

    case 1282:
      // Moderate or heavy snow with thunder
      bg = thunderstorm;
      break;

    default:
    // Clear
      bg = sunny;
      break;
  }

  return bg;
}

export default getBackground;
