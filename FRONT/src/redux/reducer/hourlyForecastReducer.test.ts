import actionTypes from "../actions/actionsTypes";
import { hourlyForecastDataMock } from "../../mocks/forecastData";
import { IHourlyForecast } from "../../models/forecastModel";
import hourlyForecastReducer, {
  hourlyForecastDefault,
} from "./hourlyForecastReducer";

describe("Given a hourlyForecastReducer", () => {
  describe("When it receives an initial value and a loadHourlyForecast action type", () => {
    test("Then it should return newHourlyForecast data with the forecast data", () => {
      const hourlyForecast: Array<IHourlyForecast> = hourlyForecastDefault;
      const newHourlyForecast = hourlyForecastDataMock;
      const action = {
        type: actionTypes.loadHourlyForecast,
        hourlyForecast: [...newHourlyForecast],
      };

      const newState = hourlyForecastReducer(hourlyForecast, action);

      expect(newState).toEqual(newHourlyForecast);
    });
  });

  describe("When it receives a non existing action type", () => {
    test("Then it should return the hourlyForecast default value", () => {
      const hourlyForecast: Array<IHourlyForecast> = hourlyForecastDefault;
      const action = {
        type: "mockedString",
        hourlyForecast: [...hourlyForecastDataMock],
      };

      const newState = hourlyForecastReducer(hourlyForecast, action);

      expect(newState).toEqual(hourlyForecast);
    });
  });
});
