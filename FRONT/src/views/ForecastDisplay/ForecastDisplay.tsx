import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import DailyForecastList from "../../components/DailyForecastList/DailyForecastList";
import MyList from "../../components/MyList/MyList";
import SaveCityWeather from "../../components/SaveCityWeather/SaveCityWeather";
import SearchBar from "../../components/SearchBar/SearchBar";
import useForecast from "../../hooks/useForecast";
import { IDailyForecast, IHourlyForecast } from "../../models/forecastModel";
import "./ForecastDisplay.scss";

const ForecastDisplay = () => {
  const {
    loadDailyForecast,
    dailyForecast,
    loadHourlyForecast,
    hourlyForecast,
  } = useForecast();
  const [forecastDetails, setForecastDetails] = useState<IDailyForecast>();
  const [forecastChartData, setForecastChartData] = useState<Array<number[]>>(
    []
  );
  const [isBadRequest, setIsBadRequest] = useState<boolean>(false);
  const [cityValue, setCityValue] = useState<string>("");
  const [isSavedCityWeather, setIsSavedCityWeather] = useState<boolean>(false);
  const [showMyList, setShowMyList] = useState<boolean>(false);
  const [dailyChartData, setDailyChartData] = useState<Array<IHourlyForecast>>(
    []
  );

  useEffect(() => {
    setForecastChartData(getChartData());
  }, [hourlyForecast, forecastDetails]);

  const options = {
    isStacked: true,
    backgroundColor: "transparent",
    legend: { position: "none" },
    hAxis: {
      ticks: forecastChartData?.map((hourlyData) => hourlyData[0]),
      gridlines: {
        color: "transparent",
      },
      textStyle: { color: "#FFF", fontSize: 12 },
      baselineColor: "#FFF",
    },
    vAxis: {
      minValue: 30,
      ticks: [10, 20, 30, 40],
      gridlines: {
        color: "transparent",
      },
      textStyle: { color: "#FFF", fontSize: 12 },
    },
    chartArea: {
      height: "80%",
      width: "95%",
    },
    tooltip: {
      trigger: "none",
    },
  };

  const getChartData = () => {
    const dailyChartData = hourlyForecast?.filter(
      (hourlyData) =>
        hourlyData.forecastHourlyDate === forecastDetails?.forecastDailyDate
    );
    setDailyChartData(dailyChartData);
    if (!dailyChartData.length) {
      setForecastDetails(dailyForecast[1]);
    }
    return dailyChartData.map((forecastHourlyValue) => [
      +forecastHourlyValue.hour.split(":")[0],
      forecastHourlyValue.maxTemperature,
    ]);
  };

  const checkMyListCity = async (city: string) => {
    const { data: cityData } = await axios.get(
      `${process.env.REACT_APP_URL_HEROKU}?cityName=${city.toLowerCase()}`
    );
    setCityValue("");
    if (cityData.length) {
      return setIsSavedCityWeather(true);
    }
  };

  const getCityWeather = () => {
    loadDailyForecast(cityValue, setForecastDetails, setIsBadRequest);
    loadHourlyForecast(cityValue);
    setIsSavedCityWeather(false);
    checkMyListCity(cityValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      getCityWeather();
    }
  };

  return (
    <div className="forecast">
      <h2 className="forecast__my-list" onClick={() => setShowMyList(true)}>
        Mi lista
      </h2>
      <SearchBar
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        getCityWeather={getCityWeather}
        cityValue={cityValue}
        isBadRequest={isBadRequest}
      />
      <MyList
        showMyList={showMyList}
        setShowMyList={setShowMyList}
        setForecastDetails={setForecastDetails}
        setIsSavedCityWeather={setIsSavedCityWeather}
        checkMyListCity={checkMyListCity}
        setIsBadRequest={setIsBadRequest}
      />
      {forecastDetails && forecastChartData && (
        <>
          <div className="forecast-information">
            <SaveCityWeather
              isSavedCityWeather={isSavedCityWeather}
              setIsSavedCityWeather={setIsSavedCityWeather}
              dailyChartData={dailyChartData}
            />

            <div className="forecast-information__weather">
              <img src={forecastDetails.icon} alt="weather information" />
              <p className="forecast-information__temperature">
                {forecastDetails.maxTemperature}
              </p>
              <span>º C</span>
              <div className="forecast-information__details">
                <p>{`Mínima: ${forecastDetails.minTemperature} ºC`}</p>
                <p>{`Humedad: ${forecastDetails.humidity}%`}</p>
                <p>{`Viento: ${forecastDetails.windSpeed} m/s`}</p>
              </div>
            </div>
            <div className="forecast-information__geolocalization">
              <h3>{forecastDetails.cityName}</h3>
              <p>{`${forecastDetails.weekDay}`}</p>
              <p>{forecastDetails.weatherDescription}</p>
            </div>
          </div>
          <div className="forecast__chart">
            <Chart
              chartType="AreaChart"
              width="100%"
              height="100%"
              data={[["Time", "Temperature"], ...forecastChartData]}
              options={options}
            />
          </div>
          <DailyForecastList setForecastDetails={setForecastDetails} />
        </>
      )}
    </div>
  );
};

export default ForecastDisplay;
