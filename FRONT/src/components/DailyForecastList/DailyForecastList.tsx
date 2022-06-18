import React from "react";
import useForecast from "../../hooks/useForecast";
import { IDailyForecast } from "../../models/forecastModel";
import "./DailyForecastList.scss";

interface DailyForecastListProps {
  setForecastDetails: (arg0: IDailyForecast) => void;
}

const DailyForecastList = ({ setForecastDetails }: DailyForecastListProps) => {
  const { dailyForecast } = useForecast();
  return (
    <div className="forecast-list">
      {dailyForecast?.map((forecastItem) => {
        return (
          <div
            className="forecast-list__item"
            key={forecastItem.weekDay}
            onClick={() => setForecastDetails(forecastItem)}
            data-testid="forecast-list__item"
          >
            <p className="forecast-list__week-day">
              {forecastItem.weekDay.slice(0, 3)}
            </p>
            <img
              width={70}
              height={70}
              src={forecastItem.icon}
              alt="weather information"
            />
            <div className="forecast-list__temperatures">
              <p>{`${forecastItem.maxTemperature}º`}</p>
              <p>{`${forecastItem.minTemperature}º`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyForecastList;
