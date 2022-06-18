import axios from "axios";
import { Dispatch } from "react";
import { IDailyForecast, IHourlyForecast } from "../../models/forecastModel";
import {
  loadDailyForecastAction,
  loadHourlyForecastAction,
} from "../actions/actionsCreator";
import { IActionTypes } from "../actions/actionsTypes";

const urlApi: string | undefined = process.env.REACT_APP_URL_SERVER;

interface ILoadHourlyForecast {
  type: IActionTypes["loadHourlyForecast"];
  hourlyForecast: Array<IHourlyForecast>;
}

interface ILoadDailyForecast {
  type: IActionTypes["loadDailyForecast"];
  dailyForecast: Array<IDailyForecast>;
}

export const loadHourlyForecastThunk = (city: string) => {
  return async (dispatch: Dispatch<ILoadHourlyForecast>) => {
    try {
      const hourlyForecast = await axios.get(`${urlApi}weather/hourly/${city}`);
      if (hourlyForecast.status === 200) {
        dispatch(loadHourlyForecastAction(hourlyForecast.data));
      }
    } catch (error) {
      return error;
    }
  };
};

export const loadDailyForecastThunk = (
  city: string,
  setForecastDetails: (arg0: IDailyForecast) => void,
  setIsBadRequest: (arg0: boolean) => void
) => {
  return async (dispatch: Dispatch<ILoadDailyForecast>) => {
    try {
      const dailyForecast = await axios.get(`${urlApi}weather/daily/${city}`);
      if (dailyForecast.status === 200) {
        setForecastDetails(dailyForecast.data[0]);
        dispatch(loadDailyForecastAction(dailyForecast.data));
        setIsBadRequest(false);
      }
    } catch (error) {
      setIsBadRequest(true);
      return error;
    }
  };
};
