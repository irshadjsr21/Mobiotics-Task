import { Router } from "express";
import controller from "../../controller/v1/user";

const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.createUser);

export default router;
