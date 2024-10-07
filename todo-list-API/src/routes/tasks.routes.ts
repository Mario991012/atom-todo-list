import {Router} from "express";
import TasksController from "../controllers/tasks.controller";

const router = Router();

router.get("/", TasksController.getAllTasks);
router.post("/", TasksController.createTask);
router.put("/:id", TasksController.updateTask);
router.delete("/:id", TasksController.deleteTask);

export default router;
