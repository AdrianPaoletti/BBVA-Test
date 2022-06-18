import dotenv from "dotenv";

dotenv.config();

import { initializeServer } from "./server/index";

const port: string | number = process.env.SERVER_PORT;

(async () => {
  try {
    initializeServer(+port);
  } catch (error) {
    process.exit(1);
  }
})();
