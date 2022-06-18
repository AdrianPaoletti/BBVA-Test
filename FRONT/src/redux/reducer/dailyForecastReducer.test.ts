import actionTypes from "../actions/actionsTypes";
import { dailyForecastDataMock } from "../../mocks/forecastData";
import { dailyForecastDefault } from "./dailyForecastReducer";
import { IDailyForecast } from "../../models/forecastModel";
import dailyForecastReducer from "./dailyForecastReducer";

describe("Given a dailyForecastReducer", () => {
  describe("When it receives an initial value and a loadDailyForecast action type", () => {
    test("Then it should return newDailyForecast data with the forecast data", () => {
      const dailyForecast: Array<IDailyForecast> = dailyForecastDefault;
      const newDailyForecast = dailyForecastDataMock;
      const action = {
        type: actionTypes.loadDailyForecast,
        dailyForecast: [...newDailyForecast],
      };

      const newState = dailyForecastReducer(dailyForecast, action);

      expect(newState).toEqual(newDailyForecast);
    });
  });

  describe("When it receives a non existing action type", () => {
    test("Then it should return the dailyForecast default value", () => {
      const dailyForecast: Array<IDailyForecast> = dailyForecastDefault;
      const action = {
        type: "mockedString",
        dailyForecast: [...dailyForecastDataMock],
      };

      const newState = dailyForecastReducer(dailyForecast, action);

      expect(newState).toEqual(dailyForecast);
    });
  });
});
