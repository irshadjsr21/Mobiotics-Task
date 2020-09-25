import * as express from "express";

import createController from "../create";

export default {
  getUser: createController(
    async (_req: express.Request, _res: express.Response) => {
      throw new Error("Not Implemented Yet!");
    }
  ),
};
