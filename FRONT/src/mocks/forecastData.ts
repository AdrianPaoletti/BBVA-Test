export const dailyForecastDataMock = [
  {
    forecastDailyDate: "",
    weekDay: "",
    hour: "",
    temperature: 0,
    maxTemperature: 0,
    minTemperature: 0,
    humidity: 0,
    weatherDescription: "",
    icon: "",
    windSpeed: 0,
    cityName: "",
    sunrise: "",
    sunset: "",
  },
];

export const hourlyForecastDataMock = [
  {
    forecastHourlyDate: "",
    weekDay: "",
    hour: "",
    temperature: 0,
    maxTemperature: 0,
    minTemperature: 0,
    humidity: 0,
    weatherDescription: "",
    icon: "",
    windSpeed: 0,
    cityName: "",
    sunrise: "",
    sunset: "",
  },
];

export const mockUseForecast = {
  dailyForecast: dailyForecastDataMock,
  hourlyForecast: hourlyForecastDataMock,
  loadDailyForecast: jest.fn(),
  loadHourlyForecast: jest.fn(),
};
