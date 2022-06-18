import { IDailyForecast } from "../../models/forecastModel";
import actionTypes from "../actions/actionsTypes";

interface IAction {
  type: string;
  dailyForecast: Array<IDailyForecast>;
}

export const dailyForecastDefault = [
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

const dailyForecastReducer = (
  dailyForecast: Array<IDailyForecast> = dailyForecastDefault,
  action: IAction
) => {
  let newDailyForecast;
  switch (action.type) {
    case actionTypes.loadDailyForecast:
      newDailyForecast = [...action.dailyForecast];
      break;
    default:
      newDailyForecast = dailyForecast;
  }
  return newDailyForecast;
};

export default dailyForecastReducer;
