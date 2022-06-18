import axios from "axios";
import React from "react";
import useForecast from "../../hooks/useForecast";
import { IDailyForecast, IHourlyForecast } from "../../models/forecastModel";

interface SaveCityWeatherProps {
  isSavedCityWeather: boolean;
  setIsSavedCityWeather: React.Dispatch<React.SetStateAction<boolean>>;
  dailyChartData: Array<IHourlyForecast>;
}

const SaveCityWeather = ({
  isSavedCityWeather,
  setIsSavedCityWeather,
  dailyChartData,
}: SaveCityWeatherProps) => {
  const { dailyForecast } = useForecast();

  const addCityWeather = (
    daily: IDailyForecast[],
    chart: IHourlyForecast[],
    cityName: string
  ) => {
    axios.post(process.env.REACT_APP_URL_HEROKU as string, {
      cityName,
      daily,
      chart,
    });
  };

  return isSavedCityWeather ? (
    <i className="fa fa-bookmark" aria-hidden="true"></i>
  ) : (
    <i
      className="fa fa-bookmark-o"
      aria-hidden="true"
      onClick={() => {
        setIsSavedCityWeather(true);
        addCityWeather(
          dailyForecast,
          dailyChartData,
          dailyForecast[0].cityName.toLowerCase()
        );
      }}
      data-testid="icon"
    ></i>
  );
};

export default SaveCityWeather;
