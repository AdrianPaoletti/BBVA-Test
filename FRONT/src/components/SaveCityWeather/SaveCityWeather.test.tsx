import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SaveCityWeather from "./SaveCityWeather";
import {
  hourlyForecastDataMock,
  mockUseForecast,
} from "../../mocks/forecastData";

const mockedProps = {
  isSavedCityWeather: false,
  setIsSavedCityWeather: jest.fn(),
  dailyChartData: hourlyForecastDataMock,
};
jest.mock("../../hooks/useForecast", () => {
  const originalModule = jest.requireActual("../../hooks/useForecast");
  return {
    __esModule: true,
    ...originalModule,
    default: () => mockUseForecast,
  };
});

describe("Given a SaveCityWeather component", () => {
  describe("When is rendered and interactions are made", () => {
    test("Then it should call setIsSavedCityWeather after firing the click event from the icon", () => {
      render(<SaveCityWeather {...mockedProps} />);

      fireEvent.click(screen.getByTestId("icon"));

      expect(mockedProps.setIsSavedCityWeather).toHaveBeenCalled();
    });
  });
});
