/* eslint camelcase: 'off' */
import { Weather } from './weather.model';

export class WeatherData {

  dt: number;

  sunrise: number;

  sunset: number;

  min: number;

  max: number;

  day: number;

  night: number;

  pressure: number;

  humidity: number;

  uvi: number;

  wind_speed: number;

  weather: Weather[];

}