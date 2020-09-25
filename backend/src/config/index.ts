/*
 * This file will contain all the configuration keys.
 * Throws error if in production and a key is not specified.
 */
import * as dotenv from "dotenv-flow";

dotenv.config();

const getEnvVariable = (key: string) => {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`ENVIREMENT VARIABLE '${key}' NOT SPECIFIED.`);
  }
  return value;
};

const config = {
  DB: {
    URL: getEnvVariable("DB_URL"),
  },
  PORT: getEnvVariable("PORT"),
};

export default config;
