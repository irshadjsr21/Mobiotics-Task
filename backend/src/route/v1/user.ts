import { Router } from "express";
import controller from "../../controller/v1/user";

const router = Router();

router.get("/", controller.getUser);

export default router;
