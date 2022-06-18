import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ForecastDisplay from "./ForecastDisplay";
import {
  dailyForecastDataMock,
  hourlyForecastDataMock,
  mockUseForecast,
} from "../../mocks/forecastData";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("../../hooks/useForecast", () => {
  const originalModule = jest.requireActual("../../hooks/useForecast");
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

describe("Given a ForecastDisplay", () => {
  beforeEach(async () => {
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
      await render(<ForecastDisplay />);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When is rendered and interactions are made", () => {
    test("Then it should render 'Mi lista' text", async () => {
      const myListTitle = screen.getByText("Mi lista");

      fireEvent.click(myListTitle);

      await expect(myListTitle).toBeInTheDocument();
    });
  });

  test("Then it should set the searchBar text to '' after calling checkMyListCity function", async () => {
    const searchBar = screen.getByRole("textbox");

    await act(async () => {
      await fireEvent.change(searchBar, {
        target: { value: "castelldefels" },
      });
      await fireEvent.keyDown(searchBar, { key: "Enter" });
    });

    await waitFor(() => expect(searchBar.textContent).toBe(""));
  });
});
