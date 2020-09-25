import { Router } from "express";
import controller from "../../controller/v1/user";

const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.createUser);
router.patch("/:id", controller.updateUser);

export default router;
