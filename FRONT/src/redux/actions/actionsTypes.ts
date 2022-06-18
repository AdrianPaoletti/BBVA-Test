export interface IActionTypes {
  loadHourlyForecast: string;
  loadDailyForecast: string;
}

const actionTypes: IActionTypes = {
  loadHourlyForecast: "GET_HOURLY_FORECAST",
  loadDailyForecast: "GET_DAILY_FORECAST",
};

export default actionTypes;
