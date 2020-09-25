import { Router } from "express";
import controller from "../../controller/v1/index";
import userRouter from "./user";

const router = Router();

router.use("/users", userRouter);
router.get("/status", controller.getStatus);

export default router;
