import {
  mdiWeatherSunny,
  mdiWeatherNight,
  mdiWeatherPartlyCloudy,
  mdiWeatherNightPartlyCloudy,
  mdiWeatherCloudy,
  mdiWeatherRainy,
  mdiWeatherPouring,
  mdiWeatherFog,
  mdiWeatherHail,
  mdiWeatherLightning,
  mdiWeatherLightningRainy,
  mdiWeatherSnowy,
  mdiWeatherSnowyHeavy,
  mdiWeatherSnowyRainy,
  mdiWeatherPartlyRainy,
  mdiWeatherPartlySnowy,
  mdiWeatherPartlyLightning,
  mdiWeatherPartlySnowyRainy,
} from '@mdi/js';

import { createSvg } from './utils';

function createIcon(conditionCode, isDay) {
  let iconMdi;
  switch (conditionCode) {
    case 1000:
    // Clear
      if (isDay) {
        iconMdi = mdiWeatherSunny;
      } else {
        iconMdi = mdiWeatherNight;
      }
      break;

    case 1003:
    // partly cloudy
      if (isDay) {
        iconMdi = mdiWeatherPartlyCloudy;
      } else {
        iconMdi = mdiWeatherNightPartlyCloudy;
      }
      break;

    case 1006:
    // cloudy
      iconMdi = mdiWeatherCloudy;
      break;

    case 1009:
    // overcast
      iconMdi = mdiWeatherCloudy;
      break;

    case 1030:
    // Mist
      iconMdi = mdiWeatherFog;
      break;

    case 1063:
    // Patchy rain possible
      if (isDay) {
        iconMdi = mdiWeatherPartlyRainy;
      } else {
        iconMdi = mdiWeatherRainy;
      }
      break;

    case 1066:
    // Patchy snow possible
      if (isDay) {
        iconMdi = mdiWeatherPartlySnowy;
      } else {
        iconMdi = mdiWeatherSnowy;
      }
      break;

    case 1069:
    // Patchy sleet possible
      if (isDay) {
        iconMdi = mdiWeatherPartlySnowy;
      } else {
        iconMdi = mdiWeatherSnowy;
      }
      break;

    case 1072:
    // Patchy freezing drizzle possible
      if (isDay) {
        iconMdi = mdiWeatherPartlySnowyRainy;
      } else {
        iconMdi = mdiWeatherSnowyRainy;
      }
      break;

    case 1087:
    // Thundery outbreaks possible
      if (isDay) {
        iconMdi = mdiWeatherPartlyLightning;
      } else {
        iconMdi = mdiWeatherLightning;
      }
      break;

    case 1114:
    // Blowing snow
      iconMdi = mdiWeatherSnowyHeavy;
      break;

    case 1117:
    // Blizzard
      iconMdi = mdiWeatherSnowyHeavy;
      break;

    case 1135:
    // Fog
      iconMdi = mdiWeatherFog;
      break;

    case 1147:
    // Freezing fog
      iconMdi = mdiWeatherFog;
      break;

    case 1150:
      // Patchy light drizzle
      if (isDay) {
        iconMdi = mdiWeatherPartlyRainy;
      } else {
        iconMdi = mdiWeatherRainy;
      }
      break;

    case 1153:
      // Light drizzle
      if (isDay) {
        iconMdi = mdiWeatherPartlyRainy;
      } else {
        iconMdi = mdiWeatherRainy;
      }
      break;

    case 1168:
      // Freezing drizzle
      if (isDay) {
        iconMdi = mdiWeatherPartlySnowyRainy;
      } else {
        iconMdi = mdiWeatherSnowyRainy;
      }
      break;

    case 1171:
      // Heavy freezing drizzle
      iconMdi = mdiWeatherSnowyRainy;
      break;

    case 1180:
      // Patchy light rain
      if (isDay) {
        iconMdi = mdiWeatherPartlyRainy;
      } else {
        iconMdi = mdiWeatherRainy;
      }
      break;

    case 1183:
      // Light rain
      iconMdi = mdiWeatherRainy;
      break;

    case 1186:
      // Moderate rain at times
      iconMdi = mdiWeatherRainy;
      break;

    case 1189:
      // Moderate rain
      iconMdi = mdiWeatherRainy;
      break;

    case 1192:
      // Heavy rain at times
      iconMdi = mdiWeatherPouring;
      break;

    case 1195:
      // Heavy rain
      iconMdi = mdiWeatherPouring;
      break;

    case 1198:
      // Light freezing rain
      iconMdi = mdiWeatherRainy;
      break;

    case 1201:
      // Moderate or heavy freezing rain
      iconMdi = mdiWeatherPouring;
      break;

    case 1204:
      // Light sleet
      iconMdi = mdiWeatherSnowy;
      break;

    case 1207:
      // Moderate or heavy sleet
      iconMdi = mdiWeatherSnowy;
      break;

    case 1210:
      // Patchy light snow
      iconMdi = mdiWeatherSnowy;
      break;

    case 1213:
      // Light snow
      iconMdi = mdiWeatherSnowy;
      break;

    case 1216:
      // Patchy moderate snow
      iconMdi = mdiWeatherSnowy;
      break;

    case 1219:
      // Moderate snow
      iconMdi = mdiWeatherSnowy;
      break;

    case 1222:
      // Patchy heavy snow
      iconMdi = mdiWeatherSnowyHeavy;
      break;

    case 1225:
      // Heavy snow
      iconMdi = mdiWeatherSnowyHeavy;
      break;

    case 1237:
      // Ice pellets
      iconMdi = mdiWeatherHail;
      break;

    case 1240:
      // Light rain shower
      iconMdi = mdiWeatherRainy;
      break;

    case 1243:
      // Moderate or heavy rain shower
      iconMdi = mdiWeatherPouring;
      break;

    case 1246:
      // Torrential rain shower
      iconMdi = mdiWeatherPouring;
      break;

    case 1249:
      // Light sleet showers
      iconMdi = mdiWeatherSnowyRainy;
      break;

    case 1252:
      // Moderate or heavy sleet showers
      iconMdi = mdiWeatherSnowyRainy;
      break;

    case 1255:
      // Light snow showers
      iconMdi = mdiWeatherSnowy;
      break;

    case 1258:
      // Moderate or heavy snow showers
      iconMdi = mdiWeatherSnowyHeavy;
      break;

    case 1261:
      // Light showers of ice pellets
      iconMdi = mdiWeatherHail;
      break;

    case 1264:
      // Moderate or heavy showers of ice pellets
      iconMdi = mdiWeatherHail;
      break;

    case 1273:
      // Patchy light rain with thunder
      iconMdi = mdiWeatherLightningRainy;
      break;

    case 1276:
      // Moderate or heavy rain with thunder
      iconMdi = mdiWeatherLightningRainy;
      break;

    case 1279:
      // Patchy light snow with thunder
      iconMdi = mdiWeatherLightning;
      break;

    case 1282:
      // Moderate or heavy snow with thunder
      iconMdi = mdiWeatherLightning;
      break;

    default:
    // Clear
      iconMdi = mdiWeatherSunny;
      break;
  }

  return createSvg(iconMdi);
}

export default createIcon;
