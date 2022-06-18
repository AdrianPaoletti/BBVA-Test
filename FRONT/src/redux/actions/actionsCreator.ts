import { IDailyForecast, IHourlyForecast } from "../../models/forecastModel";
import actionTypes from "./actionsTypes";

export const loadHourlyForecastAction = (
  hourlyForecast: Array<IHourlyForecast>
) => ({
  type: actionTypes.loadHourlyForecast,
  hourlyForecast,
});

export const loadDailyForecastAction = (
  dailyForecast: Array<IDailyForecast>
) => ({
  type: actionTypes.loadDailyForecast,
  dailyForecast,
});
