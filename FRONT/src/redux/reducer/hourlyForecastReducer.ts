import { IHourlyForecast } from "../../models/forecastModel";
import actionTypes from "../actions/actionsTypes";

interface IAction {
  type: string;
  hourlyForecast: Array<IHourlyForecast>;
}

export const hourlyForecastDefault = [
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

const hourlyForecastReducer = (
  hourlyForecast: Array<IHourlyForecast> = hourlyForecastDefault,
  action: IAction
) => {
  let newHourlyForecast;
  switch (action.type) {
    case actionTypes.loadHourlyForecast:
      newHourlyForecast = [...action.hourlyForecast];
      break;
    default:
      newHourlyForecast = hourlyForecast;
  }
  return newHourlyForecast;
};

export default hourlyForecastReducer;
