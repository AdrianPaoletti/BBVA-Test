export interface IHourlyForecast {
  forecastHourlyDate: string;
  weekDay: string;
  hour: string;
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  humidity: number;
  weatherDescription: string;
  icon: string;
  windSpeed: number;
  cityName: string;
  sunrise: string;
  sunset: string;
}

export interface IDailyForecast {
  forecastDailyDate: string;
  weekDay: string;
  hour: string;
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  humidity: number;
  weatherDescription: string;
  icon: string;
  windSpeed: number;
  cityName: string;
  sunrise: string;
  sunset: string;
}
