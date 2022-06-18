import axios from "axios";
import dotenv from "dotenv";
import { ErrorCode } from "../../interfaces/error";
import { mockResponse, mockRequest } from "../utils/mocks/mockFunction";
import { getHourlyWeather, getDailyWeather } from "./weatherController";

dotenv.config();

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const geoCodingDataMock = [
  {
    lat: 50,
    lon: 1,
    name: "Castelldefels",
  },
];

const hourlyForecastMock = {
  list: [
    {
      dt: 1655466087,
      main: {
        temp: 5,
        temp_max: 5,
        temp_min: 5,
        humidity: 5,
      },
      weather: [
        {
          description: "string",
          icon: "string",
        },
      ],
      wind: {
        speed: 5,
      },
    },
  ],
  city: {
    sunrise: 1655466087,
    sunset: 1655466087,
  },
};

const dailyForecastMock = {
  daily: [
    {
      dt: 1655466087,
      sunrise: 1655466087,
      sunset: 1655466087,
      temp: {
        max: 5,
        min: 5,
      },
      weather: [
        {
          description: "string",
          icon: "string",
        },
      ],
      wind_speed: 5,
      humidity: 5,
    },
  ],
};

describe("Given a getHourlyWeather function", () => {
  describe("When it receives a correct request params, a response and a next function", () => {
    test("Then it should call res method", async () => {
      mockedAxios.get.mockImplementation((url) => {
        switch (url) {
          case `http://api.openweathermap.org/geo/1.0/direct?q=Castelldefels&appid=${process.env.APP_ID}`:
            return Promise.resolve({ data: geoCodingDataMock });
          case `https://api.openweathermap.org/data/2.5/forecast?lat=${geoCodingDataMock[0].lat}&lon=${geoCodingDataMock[0].lon}&lang=es&units=metric&appid=${process.env.APP_ID}`:
            return Promise.resolve({ data: hourlyForecastMock });
          default:
            return Promise.reject(new Error("not found"));
        }
      });
      const res = mockResponse();
      const req = mockRequest();
      req.params = {
        cityName: "Castelldefels",
      };

      await getHourlyWeather(req, res, null);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives an incorrect cityName param", () => {
    test("Then it should call next function with a 400 error code", async () => {
      mockedAxios.get.mockRejectedValue({});
      const next = jest.fn();
      const req = mockRequest();
      req.params = {
        cityName: "ap0",
      };
      const expectedError = new ErrorCode(
        "Could not get the city's hourly geoLocalization"
      );
      expectedError.code = 400;

      await getHourlyWeather(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When the geoCoding fetch resolves to a falsy value", () => {
    test("Then it should call next function with a 404 error code", async () => {
      mockedAxios.get.mockResolvedValue(false);
      const next = jest.fn();
      const req = mockRequest();
      req.params = {
        cityName: "ap0",
      };
      const expectedError = new ErrorCode(
        "Could not find city's hourly geoLocalization"
      );
      expectedError.code = 404;

      await getHourlyWeather(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When the forecast fetch is rejected", () => {
    test("Then it should call next function with a 400 error code", async () => {
      mockedAxios.get.mockImplementation((url) => {
        switch (url) {
          case `http://api.openweathermap.org/geo/1.0/direct?q=Castelldefels&appid=${process.env.APP_ID}`:
            return Promise.resolve({ data: geoCodingDataMock });
          case `https://api.openweathermap.org/data/2.5/forecast?lat=${geoCodingDataMock[0].lat}&lon=${geoCodingDataMock[0].lon}&lang=es&units=metric&appid=${process.env.APP_ID}`:
            return Promise.reject({});
          default:
            return Promise.reject(new Error("not found"));
        }
      });
      const next = jest.fn();
      const req = mockRequest();
      req.params = {
        cityName: "Castelldefels",
      };
      const expectedError = new ErrorCode(
        "Could not get the city's hourly weather"
      );
      expectedError.code = 400;

      await getHourlyWeather(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When the forecast fetch resolves to a falsy value", () => {
    test("Then it should call next function with a 404 error code", async () => {
      mockedAxios.get.mockImplementation((url) => {
        switch (url) {
          case `http://api.openweathermap.org/geo/1.0/direct?q=Castelldefels&appid=${process.env.APP_ID}`:
            return Promise.resolve({ data: geoCodingDataMock });
          case `https://api.openweathermap.org/data/2.5/forecast?lat=${geoCodingDataMock[0].lat}&lon=${geoCodingDataMock[0].lon}&lang=es&units=metric&appid=${process.env.APP_ID}`:
            return Promise.resolve(false);
          default:
            return Promise.reject(new Error("not found"));
        }
      });
      const next = jest.fn();
      const req = mockRequest();
      req.params = {
        cityName: "Castelldefels",
      };
      const expectedError = new ErrorCode(
        "Could not find city's hourly weather"
      );
      expectedError.code = 404;

      await getHourlyWeather(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });
});

describe("Given a getHourlyWeather function", () => {
  describe("When it receives a correct request params, a response and a next function", () => {
    test("Then it should call res method", async () => {
      mockedAxios.get.mockImplementation((url) => {
        switch (url) {
          case `http://api.openweathermap.org/geo/1.0/direct?q=Castelldefels&appid=${process.env.APP_ID}`:
            return Promise.resolve({ data: geoCodingDataMock });
          case `https://api.openweathermap.org/data/2.5/onecall?lat=${geoCodingDataMock[0].lat}&lon=${geoCodingDataMock[0].lon}&exclude=hourly,minutely&lang=es&units=metric&appid=${process.env.APP_ID}`:
            return Promise.resolve({ data: dailyForecastMock });
          default:
            return Promise.reject(new Error("not found"));
        }
      });
      const res = mockResponse();
      const req = mockRequest();
      req.params = {
        cityName: "Castelldefels",
      };

      await getDailyWeather(req, res, null);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives an incorrect cityName param", () => {
    test("Then it should call next function with a 400 error code", async () => {
      mockedAxios.get.mockRejectedValue({});
      const next = jest.fn();
      const req = mockRequest();
      req.params = {
        cityName: "ap0",
      };
      const expectedError = new ErrorCode(
        "Could not get the city's daily geoLocalization"
      );
      expectedError.code = 400;

      await getDailyWeather(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When the geoCoding fetch resolves to a falsy value", () => {
    test("Then it should call next function with a 404 error code", async () => {
      mockedAxios.get.mockResolvedValue(false);
      const next = jest.fn();
      const req = mockRequest();
      req.params = {
        cityName: "ap0",
      };
      const expectedError = new ErrorCode(
        "Could not find city's daily geoLocalization"
      );
      expectedError.code = 404;

      await getDailyWeather(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When the forecast fetch is rejected", () => {
    test("Then it should call next function with a 400 error code", async () => {
      mockedAxios.get.mockImplementation((url) => {
        switch (url) {
          case `http://api.openweathermap.org/geo/1.0/direct?q=Castelldefels&appid=${process.env.APP_ID}`:
            return Promise.resolve({ data: geoCodingDataMock });
          case `https://api.openweathermap.org/data/2.5/onecall?lat=${geoCodingDataMock[0].lat}&lon=${geoCodingDataMock[0].lon}&exclude=hourly,minutely&lang=es&units=metric&appid=${process.env.APP_ID}`:
            return Promise.reject({});
          default:
            return Promise.reject(new Error("not found"));
        }
      });
      const next = jest.fn();
      const req = mockRequest();
      req.params = {
        cityName: "Castelldefels",
      };
      const expectedError = new ErrorCode(
        "Could not get the city's daily weather"
      );
      expectedError.code = 400;

      await getDailyWeather(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When the forecast fetch resolves to a falsy value", () => {
    test("Then it should call next function with a 404 error code", async () => {
      mockedAxios.get.mockImplementation((url) => {
        switch (url) {
          case `http://api.openweathermap.org/geo/1.0/direct?q=Castelldefels&appid=${process.env.APP_ID}`:
            return Promise.resolve({ data: geoCodingDataMock });
          case `https://api.openweathermap.org/data/2.5/onecall?lat=${geoCodingDataMock[0].lat}&lon=${geoCodingDataMock[0].lon}&exclude=hourly,minutely&lang=es&units=metric&appid=${process.env.APP_ID}`:
            return Promise.resolve(false);
          default:
            return Promise.reject(new Error("not found"));
        }
      });
      const next = jest.fn();
      const req = mockRequest();
      req.params = {
        cityName: "Castelldefels",
      };
      const expectedError = new ErrorCode(
        "Could not find city's daily weather"
      );
      expectedError.code = 404;

      await getDailyWeather(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });
});
