import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";

import { loggerStream } from "../utils/logger";

const middleware = [
  cors(),
  helmet(),
  express.json(),
  express.urlencoded({ extended: false }),
];

if (process.env.NODE_ENV !== "test") {
  middleware.push(morgan("dev", { stream: loggerStream }));
}

export default middleware;
