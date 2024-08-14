import { WeatherData } from 'src/models/weather_data.model';
import fahrenheitCountries from '../assets/fahrenheit_countries.list.json';
import imperialCountries from '../assets/imperial_countries.list.json';
import { WeatherDataFormatted } from 'src/models/weather_data_formatted.model';

export class Formatter {

  private static weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  static formatDate(dt: number): string {
    return new Date(dt).toLocaleDateString(navigator.language);
  }

  static formatTemperature(temperature: number): string {
    return this.simpleFormat(temperature, fahrenheitCountries.map((country) => country.locale), '°C', '°F');
  }

  static formatPressure(pressure: number): string {
    return this.simpleFormat(pressure, imperialCountries.map((country) => country.locale), 'mb', 'inHg');
  }

  static formatSpeed(speed: number): string {
    return this.simpleFormat(speed, imperialCountries.map((country) => country.locale), 'km/h', 'mph');
  }

  static formatHumidity(humidity: number): string {
    return humidity + ' %';
  }

  static dtToDayOfWeek(dt: number): string {
    return Formatter.weekdays[new Date(dt).getDay()];
  }

  static dtToTime(dt: number): string {
    const date = new Date(dt);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    let hours12 = hours % 12;

    hours12 = hours12 === 0 ? 12 : hours12;

    if(Formatter.getMeasurementSystem() === 'imperial') {
      return `${hours12}:${minutes} ${period}`;
    }

    return `${hours}:${minutes}`;
  }

  static getMeasurementSystem(): 'imperial' | 'metric' {
    if(imperialCountries.map((country) => country.locale).includes(navigator.language)) {
      return 'imperial';
    }

    return 'metric';
  }

  static formatWeatherData(data: WeatherData): WeatherDataFormatted {
    return {
      date: this.formatDate(data.dt),
      dayOfWeek: Formatter.dtToDayOfWeek(data.dt),
      max: Formatter.formatTemperature(data.max),
      min: Formatter.formatTemperature(data.min),
      day: Formatter.formatTemperature(data.day),
      night: Formatter.formatTemperature(data.night),
      pressure: Formatter.formatPressure(data.pressure),
      humidity: Formatter.formatHumidity(data.humidity),
      sunrise: Formatter.dtToTime(data.sunrise),
      sunset: Formatter.dtToTime(data.sunset),
      uvi: data.uvi.toString(),
      windSpeed: Formatter.formatSpeed(data.wind_speed)
    } as WeatherDataFormatted;
  }

  private static simpleFormat(value: number, exceptionLocales: string[], suffixNormal: string, suffixException: string): string {
    if(exceptionLocales.includes(navigator.language)) {
      return value + ' ' + suffixException;
    }

    return value + ' ' + suffixNormal;
  }

}