import {Router} from "express";
import taskRoutes from "./tasks.routes";

const router = Router();

router.use("/tasks", taskRoutes);

export default router;
