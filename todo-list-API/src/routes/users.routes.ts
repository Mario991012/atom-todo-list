import {Router} from "express";
import UsersController from "../controllers/users.controller";

const router = Router();

router.get("/:email", UsersController.getUser);
router.post("/", UsersController.createUser);

export default router;
