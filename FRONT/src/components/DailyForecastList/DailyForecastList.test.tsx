import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DailyForecastList from "./DailyForecastList";
import { mockUseForecast } from "../../mocks/forecastData";

jest.mock("../../hooks/useForecast", () => {
  const originalModule = jest.requireActual("../../hooks/useForecast");
  return {
    __esModule: true,
    ...originalModule,
    default: () => mockUseForecast,
  };
});
const setForecastDetailsMock = jest.fn();

describe("Given a DailyForecastList component", () => {
  describe("When is rendered and interactions are made", () => {
    test("Then it should call setForecastDetailsMock after firing the click event from the forecast-list__item", () => {
      render(<DailyForecastList setForecastDetails={setForecastDetailsMock} />);

      fireEvent.click(screen.getByTestId("forecast-list__item"));

      expect(setForecastDetailsMock).toHaveBeenCalled();
    });
  });
});
