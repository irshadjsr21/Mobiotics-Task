import * as express from "express";
import { database } from "../../utils/db";

import createController from "../create";

export default {
  getStatus: createController(
    async (_req: express.Request, res: express.Response) => {
      if (database.readyState !== 1) {
        res.status(500).json({ status: "Stopped" });
        return;
      }
      res.json({ status: "Running" });
    }
  ),
};
