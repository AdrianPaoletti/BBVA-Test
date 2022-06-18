import axios from "axios";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { ErrorCode } from "../../interfaces/error";

dotenv.config();

interface IHourlyForecast {
  dt: number;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

interface IDailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    max: number;
    min: number;
  };
  humidity: number;
  wind_speed: number;
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

const getHourlyWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cityName } = req.params;
    const { data: geoCodingData } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${process.env.APP_ID}`
    );

    if (geoCodingData) {
      try {
        const { data: forecastHourlyData } = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${geoCodingData[0].lat}&lon=${geoCodingData[0].lon}&lang=es&units=metric&appid=${process.env.APP_ID}`
        );
        if (forecastHourlyData) {
          return res.json(
            forecastHourlyData.list.map((hourlyForecast: IHourlyForecast) => ({
              forecastHourlyDate: new Date(
                hourlyForecast.dt * 1000
              ).toLocaleDateString(),
              weekDay: new Date(hourlyForecast.dt * 1000).toLocaleString(
                "default",
                {
                  weekday: "long",
                }
              ),
              hour: new Date(hourlyForecast.dt * 1000).toLocaleTimeString(
                "es-ES",
                { hour: "2-digit", minute: "2-digit" }
              ),
              temperature: Math.round(hourlyForecast.main.temp),
              maxTemperature: Math.round(hourlyForecast.main.temp_max),
              minTemperature: Math.round(hourlyForecast.main.temp_min),
              humidity: hourlyForecast.main.humidity,
              weatherDescription: hourlyForecast.weather[0].description,
              icon: `https://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png`,
              windSpeed: hourlyForecast.wind.speed,
              cityName: geoCodingData[0].name,
              sunrise: new Date(
                forecastHourlyData.city.sunrise * 1000
              ).toLocaleTimeString(),
              sunset: new Date(
                forecastHourlyData.city.sunset * 1000
              ).toLocaleTimeString(),
            }))
          );
        }
        const error = new ErrorCode("Could not find city's hourly weather");
        error.code = 404;
        next(error);
        return;
      } catch (error) {
        error.code = 400;
        error.message = "Could not get the city's hourly weather";
        next(error);
      }
    }
    const error = new ErrorCode("Could not find city's hourly geoLocalization");
    error.code = 404;
    next(error);
  } catch (error) {
    error.code = 400;
    error.message = "Could not get the city's hourly geoLocalization";
    next(error);
  }
};

const getDailyWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cityName } = req.params;
    const { data: geoCodingData } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${process.env.APP_ID}`
    );
    if (geoCodingData) {
      try {
        const { data: forecastDailyData } = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${geoCodingData[0].lat}&lon=${geoCodingData[0].lon}&exclude=hourly,minutely&lang=es&units=metric&appid=${process.env.APP_ID}`
        );
        if (forecastDailyData) {
          return res.json(
            forecastDailyData.daily
              .slice(0, 5)
              .map((dailyForecast: IDailyForecast) => ({
                forecastDailyDate: new Date(
                  dailyForecast.dt * 1000
                ).toLocaleDateString(),
                weekDay: new Date(dailyForecast.dt * 1000).toLocaleString(
                  "default",
                  {
                    weekday: "long",
                  }
                ),
                sunrise: new Date(
                  dailyForecast.sunrise * 1000
                ).toLocaleTimeString(),
                sunset: new Date(
                  dailyForecast.sunset * 1000
                ).toLocaleTimeString(),
                maxTemperature: Math.round(dailyForecast.temp.max),
                minTemperature: Math.round(dailyForecast.temp.min),
                humidity: dailyForecast.humidity,
                windSpeed: dailyForecast.wind_speed,
                icon: `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`,
                weatherDescription: dailyForecast.weather[0].description,
                cityName: geoCodingData[0].name,
              }))
          );
        }
        const error = new ErrorCode("Could not find city's daily weather");
        error.code = 404;
        next(error);
      } catch (error) {
        error.code = 400;
        error.message = "Could not get the city's daily weather";
        next(error);
      }
    }
    const error = new ErrorCode("Could not find city's daily geoLocalization");
    error.code = 404;
    next(error);
  } catch (error) {
    error.code = 400;
    error.message = "Could not get the city's daily geoLocalization";
    next(error);
  }
};

export { getHourlyWeather, getDailyWeather };
