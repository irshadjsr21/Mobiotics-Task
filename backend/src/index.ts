import app from "./app";
import config from "./config";
import { logger } from "./utils/logger";

app.listen(config.PORT, () => {
  if (process.env.NODE_ENV !== "test") {
    logger.info(`Starter server listening on port ${config.PORT}`);
  }
});
