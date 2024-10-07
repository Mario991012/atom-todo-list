import {Router} from "express";
import taskRoutes from "./tasks.routes";
import usersRoutes from "./users.routes";

const router = Router();

router.use("/tasks", taskRoutes);
router.use("/users", usersRoutes);

export default router;
