import { City } from 'src/models/city.model';
import citiesJson from '../../assets/city.list.json';
import { Component } from '../component';
import { TableComponent } from '../table/table.component';
import { WhispererComponent } from '../whisperer/whisperer.component';
import { TableColumn } from 'src/models/table_column.model';
import { Forecast } from 'src/models/forecast.model';
import { WeatherData } from 'src/models/weather_data.model';
import { Formatter } from '../../utils/formatter';
import { WeatherDataFormatted } from 'src/models/weather_data_formatted.model';
import './forecast.component.css';

export class ForecastComponent extends Component {

  private static readonly apiKey: string = '3a30e28f6ef577795bbe04d052bcecba';

  protected override element: HTMLElement;

  private locationElement: HTMLElement;

  private cities: City[];

  private selectedCity: City;

  private data: WeatherDataFormatted[];

  private readonly dataSource: string = 'https://api.openweathermap.org/data/3.0/onecall';

  private readonly tableComponent: TableComponent<WeatherDataFormatted>;

  private readonly whispererComponent: WhispererComponent<City>;

  constructor(protected readonly id: string) {
    super(id);
    this.loadCities();
    this.tableComponent = new TableComponent(
      'forecast_table_component',
      [
        { id: 'date', localizedName: 'Date' },
        { id: 'dayOfWeek', localizedName: 'Day' },
        { id: 'day', localizedName: 'Day temperature' },
        { id: 'night', localizedName: 'Night temperature' },
        { id: 'min', localizedName: 'Min. temperature' },
        { id: 'max', localizedName: 'Max. temperature' },
        { id: 'pressure', localizedName: 'Pressure' },
        { id: 'humidity', localizedName: 'Humidity' },
        { id: 'windSpeed', localizedName: 'Wind speed' },
        { id: 'sunrise', localizedName: 'Sunrise' },
        { id: 'sunset', localizedName: 'Sunset' }
      ] as TableColumn[],
      this.data
    );
    this.locationElement = this.element.querySelector('#forecast_location');
    this.whispererComponent = new WhispererComponent('forecast_whisperer_component', this.cities);
    this.whispererComponent.getElement().addEventListener('entryChange', (event: CustomEvent) => this.onCityChange(event));
    this.loadCurrentCity();
    this.fetchForecastData();
  }

  private fetchForecastData(): void {
    const dataSource = new URL(this.dataSource);

    dataSource.searchParams.append('lat', this.selectedCity.coord.lat.toString());
    dataSource.searchParams.append('lon', this.selectedCity.coord.lon.toString());
    dataSource.searchParams.append('exclude', 'current,minutely,hourly');
    dataSource.searchParams.append('lang', navigator.language.split('-')[1] ?? navigator.language.split('-')[0].toLowerCase());
    dataSource.searchParams.append('units', Formatter.getMeasurementSystem());
    dataSource.searchParams.append('appid', ForecastComponent.apiKey);

    fetch(dataSource.toString()).then((res) => {
      if(res.ok) {
        res.json().then((data) => {
          const forecast = {
            ...data,
            daily: data.daily.map((day) => {
              const { temp, ...rest } = day;

              return {
                ...rest,
                ...temp
              } as WeatherData;
            })
          } as Forecast;

          forecast.daily = forecast.daily.slice(1, 6);
          forecast.daily.forEach((day) => day.dt *= 1000);
          forecast.daily.forEach((day) => day.sunrise *= 1000);
          forecast.daily.forEach((day) => day.sunset *= 1000);

          const formattedData = forecast.daily.map((day) => Formatter.formatWeatherData(day));

          this.data = formattedData;
          this.tableComponent.setData(formattedData);
        });
      }
    });
  }

  private loadCurrentCity(): void {
    this.selectedCity = this.selectedCity ?? this.cities[0];

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.selectedCity = this.getCityByLocation(position.coords.longitude, position.coords.latitude);
      });
    }

    this.locationElement.innerText = this.selectedCity.name;
  }

  private loadCities(): void {
    this.cities = citiesJson as City[];
  }

  private getCityByLocation(lon: number, lat: number): City {
    return this.cities.find((city) => city.coord.lon === lon && city.coord.lat === lat);
  }

  private onCityChange(event: CustomEvent): void {
    this.selectedCity = event.detail;
    this.locationElement.innerText = this.selectedCity.name;
    this.fetchForecastData();
  }

}