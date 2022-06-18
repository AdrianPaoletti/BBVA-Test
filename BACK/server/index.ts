import chalk from "chalk";
import express from "express";
import cors from "cors";
import Debug from "debug";
import morgan from "morgan";

import {
  notFoundErrorHandler,
  generalErrorHandler,
} from "./middlewares/errors";
import weatherRoutes from "./routes/weatherRoutes";

const debug = Debug("bbvaTest:server");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const initializeServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Listening on port ${port}`));
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("An error with the server occurred"));
      console.log(error.name);
      if (error.name === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} is in use`));
      }
      reject();
    });
  });

app.use("/weather", weatherRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

export { app, initializeServer };
