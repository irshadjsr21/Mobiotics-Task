import * as fs from "fs";
import * as morgan from "morgan";
import * as winston from "winston";

const logDir = "./logs/";
const logFile = "server.log.json";

// Create log dir
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create a logger
export let logger: winston.LoggerInstance = new winston.Logger({
  exitOnError: false,
  transports: [
    new winston.transports.File({
      colorize: false,
      filename: logDir + logFile,
      handleExceptions: true,
      json: true,
      level: "info",
      maxFiles: 5,
      maxsize: 5242880, // 5MB
    }),
    new winston.transports.Console({
      colorize: true,
      handleExceptions: true,
      json: false,
      level: "debug",
    }),
  ],
});

// Create a logger stream
export let loggerStream: morgan.StreamOptions = {
  write: logger.info,
};
