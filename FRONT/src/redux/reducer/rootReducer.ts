import { combineReducers } from "redux";
import dailyForecastReducer from "./dailyForecastReducer";
import hourlyForecastReducer from "./hourlyForecastReducer";

const rootReducer = combineReducers({
  hourlyForecast: hourlyForecastReducer,
  dailyForecast: dailyForecastReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
