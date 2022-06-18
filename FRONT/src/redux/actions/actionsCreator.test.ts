import {
  dailyForecastDataMock,
  hourlyForecastDataMock,
} from "../../mocks/forecastData";
import {
  loadDailyForecastAction,
  loadHourlyForecastAction,
} from "./actionsCreator";
import actionTypes from "./actionsTypes";

describe("Given a loadHourlyForecastAction", () => {
  describe("When it is called", () => {
    test("Then it should return an object with a loadHourlyForecast action type and the hourlyForecast data", () => {
      const hourlyForecast = hourlyForecastDataMock;
      const expectedAction = {
        type: actionTypes.loadHourlyForecast,
        hourlyForecast: hourlyForecast,
      };

      const actionResult = loadHourlyForecastAction(hourlyForecast);

      expect(actionResult).toEqual(expectedAction);
    });
  });
});

describe("Given a loadDailyForecastAction", () => {
  describe("When it is called", () => {
    test("Then it should return an object with a loadDailyForecast action type and the dailyForecast data", () => {
      const dailyForecast = dailyForecastDataMock;
      const expectedAction = {
        type: actionTypes.loadDailyForecast,
        dailyForecast: dailyForecast,
      };

      const actionResult = loadDailyForecastAction(dailyForecast);

      expect(actionResult).toEqual(expectedAction);
    });
  });
});
