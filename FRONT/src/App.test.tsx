import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

import {
  dailyForecastDataMock,
  hourlyForecastDataMock,
  mockUseForecast,
} from "./mocks/forecastData";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("./hooks/useForecast", () => {
  const originalModule = jest.requireActual("./hooks/useForecast");
  return {
    __esModule: true,
    ...originalModule,
    default: () => mockUseForecast,
  };
});
const mockResolvedGet = [
  {
    cityName: "castelldefels",
    id: 2,
    daily: dailyForecastDataMock,
    hourly: hourlyForecastDataMock,
  },
];
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Given an App", () => {
  describe("When is rendered", () => {
    test("Then it should render 'Mi lista' text", async () => {
      await act(async () => {
        await mockedAxios.get.mockImplementation((url) => {
          switch (url) {
            case process.env.REACT_APP_URL_HEROKU:
              return Promise.resolve({
                data: mockResolvedGet,
              });
            case `${process.env.REACT_APP_URL_HEROKU}?cityName=castelldefels`:
              return Promise.resolve({ data: mockResolvedGet });
            default:
              return Promise.reject(new Error("not found"));
          }
        });
        await render(<App />);
      });

      const myListTitle = screen.getByText("Mi lista");

      await expect(myListTitle).toBeInTheDocument();
    });
  });
});
