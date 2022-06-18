import Debug from "debug";
import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../../interfaces/error";

const debug = Debug("bbvaTest:error");

const notFoundErrorHandler = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

const generalErrorHandler = (
  error: ErrorCode,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.red(`Error message: ${error.message}`));
  const message = error.code ? error.message : "General Error";
  res.status(error.code || 500).json({ error: message });
};

export { notFoundErrorHandler, generalErrorHandler };
