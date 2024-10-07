import {Router} from "express";
import TasksController from "../controllers/tasks.controller";
import verifyToken from "../middlewares/auth.middleware";

const router = Router();

router.get("/", verifyToken, TasksController.getAllTasks);
router.post("/", verifyToken, TasksController.createTask);
router.put("/:id", verifyToken, TasksController.updateTask);
router.delete("/:id", verifyToken, TasksController.deleteTask);

export default router;
