import axios from "axios";
import React, { useEffect, useState } from "react";
import useForecast from "../../hooks/useForecast";
import { IDailyForecast, IHourlyForecast } from "../../models/forecastModel";
import "./MyList.scss";

interface MyListProps {
  showMyList: boolean;
  setShowMyList: React.Dispatch<React.SetStateAction<boolean>>;
  setForecastDetails: (arg0: IDailyForecast) => void;
  setIsBadRequest: (arg0: boolean) => void;
  setIsSavedCityWeather: React.Dispatch<React.SetStateAction<boolean>>;
  checkMyListCity: (city: string) => void;
}

const MyList = ({
  showMyList,
  setShowMyList,
  setForecastDetails,
  setIsSavedCityWeather,
  checkMyListCity,
  setIsBadRequest,
}: MyListProps) => {
  const [myListData, setMyListData] = useState<
    {
      cityName: string;
      id: number;
      daily: Array<IDailyForecast>;
      hourly: Array<IHourlyForecast>;
    }[]
  >([]);
  const { loadHourlyForecast, loadDailyForecast } = useForecast();

  useEffect(() => {
    getMyListData();
  }, [showMyList]);

  const getMyListData = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_URL_HEROKU as string
    );
    setMyListData(data);
  };

  const deleteCity = async (id: number) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_URL_HEROKU}/${id}`
    );
    if (response.status === 200) {
      setIsSavedCityWeather(false);
      setMyListData(myListData.filter((data) => data.id !== id));
    }
  };

  return (
    <div
      className={showMyList ? "my-list-modal" : ""}
      onClick={() => setShowMyList(false)}
      data-testid={"modal"}
    >
      <section
        className={!showMyList ? "my-list" : "my-list my-list--active"}
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="my-list__title">Mis ubicaciones</h3>
        <div className="my-list__container">
          {myListData?.map((data) => (
            <div
              className="my-list__item"
              key={data.id}
              onClick={() => {
                setShowMyList(false);
                loadHourlyForecast(data.cityName);
                loadDailyForecast(
                  data.cityName,
                  setForecastDetails,
                  setIsBadRequest
                );
                checkMyListCity(data.cityName);
              }}
              data-testid={"my-list__item"}
            >
              <div className="my-list__city-name-container">
                <i
                  className="fa fa-trash-o"
                  aria-hidden="true"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteCity(data.id);
                  }}
                  data-testid="icon"
                ></i>
                <p className="my-list__city-name">{data.cityName}</p>
              </div>
              <div className="my-list__image-container">
                <img
                  width={40}
                  height={40}
                  src={data.daily[0].icon}
                  alt="city weather"
                />
                <p className="my-list__city-weather">
                  {`${data.daily[0].maxTemperature}º C`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyList;
