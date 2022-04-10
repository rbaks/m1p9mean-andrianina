import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  // apiUrl: "http://localhost:3001/api",
  apiUrl: "https://ekaly-backend.herokuapp.com/api",
};
