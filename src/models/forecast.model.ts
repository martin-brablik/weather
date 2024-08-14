/* eslint camelcase: 'off' */
import { WeatherData } from './weather_data.model';

export class Forecast {

  lat: number;

  lon: number;

  timezone: string;

  timezone_offset: number;

  daily: WeatherData[];

}