import dotenv from "dotenv";

dotenv.config();
import supertest from "supertest";
import { initializeServer, app } from "../index";

const request = supertest(app);
let server: any;

beforeAll(async () => {
  server = await initializeServer(2000);
});

afterAll((done) => {
  server.close(() => {
    done();
  });
});

describe("Given a /hourly/:cityName endpoint", () => {
  describe("When it receive a GET request", () => {
    test("Then it should respond with the hourly weather array data and a 200 status", async () => {
      const { body } = await request
        .get("/weather/hourly/barcelona")
        .expect(200);

      expect(body.length).toBeGreaterThan(5);
      expect(body[0]).toHaveProperty("weekDay");
    });
  });
});

describe("Given a /daily/:cityName endpoint", () => {
  describe("When it receive a GET request", () => {
    test("Then it should respond with the daily weather array data and a 200 status", async () => {
      const { body } = await request
        .get("/weather/daily/barcelona")
        .expect(200);

      expect(body.length).toBeGreaterThanOrEqual(5);
      expect(body[0]).toHaveProperty("weekDay");
    });
  });
});
