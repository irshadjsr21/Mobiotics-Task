import * as Mongoose from "mongoose";

import config from "../config";
import { logger } from "./logger";

export let database: Mongoose.Connection;

// Function to connect to MongoDB
export const connect = () => {
  if (database) {
    return;
  }

  Mongoose.connect(config.DB.URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = Mongoose.connection;

  database.once("open", async () => {
    if (process.env.NODE_ENV !== "test") {
      logger.info("Connected to database");
    }
  });

  database.on("error", (error) => {
    logger.error("Error connecting to database");
    if (error && error.stack) {
      logger.error(error.stack);
    }
  });
};

// Function to disconnect MongoDB
export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
