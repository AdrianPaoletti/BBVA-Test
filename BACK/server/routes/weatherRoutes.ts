import express from "express";
import {
  getHourlyWeather,
  getDailyWeather,
} from "../controllers/weatherController";

const router = express.Router();

router.get("/hourly/:cityName", getHourlyWeather);
router.get("/daily/:cityName", getDailyWeather);
export default router;
