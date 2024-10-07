import {Request, Response} from "express";
import TasksService from "../services/tasks.service";
import {RETURN_CODES} from "../common/constants/common";
import {logger} from "firebase-functions/v2";

export class TasksController {
  async getAllTasks(req: Request, res: Response) {
    try {
      const result = await TasksService.getAllTasks();
      logger.info("getAllTasks result", result);
      res.status(200).json(result);
    } catch (error: any) {
      logger.error("getAllTasks error", error.message);
      res
        .status(500)
        .json({error: error.message, returnCode: RETURN_CODES.GENERIC_ERROR});
    }
  }

  async createTask(req: Request, res: Response) {
    const {title, description} = req.body;
    const task = {
      title,
      description,
      completed: false,
      createdAt: new Date().getTime(),
      isDeleted: false,
    };

    try {
      logger.info("Task to be created", task);
      const newTask = await TasksService.createTask(task);
      logger.info("createTask result", newTask);
      res.status(201).json(newTask);
    } catch (error: any) {
      logger.error("getAllTasks error", error);
      res
        .status(500)
        .json({error: error.message, returnCode: RETURN_CODES.GENERIC_ERROR});
    }
  }

  async updateTask(req: Request, res: Response) {
    const {id} = req.params;
    const {title, description, completed} = req.body;

    try {
      const updatedTask = await TasksService.updateTask(id, {
        title,
        description,
        completed,
      });
      logger.info("updateTask result", updatedTask);
      res.status(200).json(updatedTask);
    } catch (error: any) {
      logger.error("updateTask error", error);
      res
        .status(500)
        .json({error: error.message, returnCode: RETURN_CODES.GENERIC_ERROR});
    }
  }

  async deleteTask(req: Request, res: Response) {
    const {id} = req.params;

    try {
      const result = await TasksService.deleteTask(id);
      logger.info("deleteTask result", result);
      res.status(200).json(result);
    } catch (error: any) {
      logger.error("deleteTask error", error);
      res
        .status(500)
        .json({error: error.message, returnCode: RETURN_CODES.GENERIC_ERROR});
    }
  }
}

export default new TasksController();
