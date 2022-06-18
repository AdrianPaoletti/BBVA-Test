import { Dispatch, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDailyForecast } from "../models/forecastModel";
import { AppState } from "../redux/reducer/rootReducer";
import {
  loadDailyForecastThunk,
  loadHourlyForecastThunk,
} from "../redux/thunk/forecastThunk";

const useForecast = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const hourlyForecast = useSelector((state: AppState) => state.hourlyForecast);
  const dailyForecast = useSelector((state: AppState) => state.dailyForecast);

  const loadHourlyForecast = (city: string) =>
    dispatch(loadHourlyForecastThunk(city));

  const loadDailyForecast = useCallback(
    (
      city: string,
      setForecastDetails: (arg0: IDailyForecast) => void,
      setIsBadRequest: (arg0: boolean) => void
    ) => {
      dispatch(
        loadDailyForecastThunk(city, setForecastDetails, setIsBadRequest)
      );
    },
    [dispatch]
  );

  return {
    loadHourlyForecast,
    hourlyForecast,
    loadDailyForecast,
    dailyForecast,
  };
};

export default useForecast;
