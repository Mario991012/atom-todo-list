import {Router} from "express";
import {TasksController} from "../controllers/tasks.controller";
import {verifyToken} from "../middlewares/auth.middleware";

const router = Router();
const tasksController = new TasksController();

router.get("/", verifyToken, tasksController.getAllTasks);
router.post("/", verifyToken, tasksController.createTask);
router.put("/:id", verifyToken, tasksController.updateTask);
router.delete("/:id", verifyToken, tasksController.deleteTask);

export default router;
