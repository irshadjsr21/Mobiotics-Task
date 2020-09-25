// External Imports
import * as express from "express";
import * as createError from "http-errors";

// Internal Imports
import initMiddleware from "./middleware/init";
import router from "./route";
import { connect as connectDB } from "./utils/db";
import { logger } from "./utils/logger";

// Create express app instance
let app: express.Application = express();

// Set express middlewares
app.use(initMiddleware);

// Register app routes
app.use(router);

// Handle Page not found error
app.use(
  "*",
  (
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    next(createError(404, "Page not found."));
  }
);

// Handle errors
app.use(
  (
    error: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (error instanceof createError.HttpError) {
      const obj = {
        errors: undefined,
        message: error.message,
      };
      if (error.errors) {
        obj.errors = error.errors;
      }
      res.status(error.status).json(obj);
    } else {
      logger.error(error.stack);
      res.status(500).json({ message: "Server error." });
    }
  }
);

// Connect to Database
connectDB();

export default app;
