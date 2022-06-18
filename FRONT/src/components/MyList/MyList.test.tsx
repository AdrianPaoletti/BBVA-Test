import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MyList from "./MyList";
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

const mockedProps = {
  showMyList: true,
  setShowMyList: jest.fn(),
  setForecastDetails: jest.fn(),
  setIsSavedCityWeather: jest.fn(),
  checkMyListCity: jest.fn(),
  setIsBadRequest: jest.fn(),
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Given a MyList", () => {
  beforeEach(async () => {
    await act(async () => {
      await mockedAxios.get.mockResolvedValue({
        data: [
          {
            cityName: "castelldefels",
            id: 2,
            daily: dailyForecastDataMock,
            hourly: hourlyForecastDataMock,
          },
        ],
      });
      await mockedAxios.delete.mockResolvedValue({
        status: 200,
      });
      render(<MyList {...mockedProps} />);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When is rendered and interactions are made", () => {
    test("Then it should call setShowMyList function after firing the click event from the modal", async () => {
      await fireEvent.click(screen.getByTestId("modal"));

      expect(mockedProps.setShowMyList).toHaveBeenCalled();
    });

    test("Then it should call setShowMyList and checkMyListCity after firing the click event from my-list__item", async () => {
      await fireEvent.click(screen.getByTestId("my-list__item"));

      expect(mockedProps.setShowMyList).toHaveBeenCalled();
      expect(mockedProps.checkMyListCity).toHaveBeenCalled();
    });

    test("Then it should call ", async () => {
      await fireEvent.click(screen.getByTestId("icon"));

      await waitFor(() =>
        expect(mockedProps.setIsSavedCityWeather).toHaveBeenCalled()
      );
    });
  });
});
