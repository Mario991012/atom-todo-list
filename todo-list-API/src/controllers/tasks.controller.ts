import { Request, Response } from "express";
import TasksService from "../services/tasks.service";
import { RETURN_CODES } from "../common/constants/common";
import { logger } from "firebase-functions/v2";

export class TasksController {
  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await TasksService.getAllTasks();
      res.status(200).json({
        returnCode: RETURN_CODES.GENERIC_SUCCESS,
        message: "Tasks returned successfully",
        data: tasks,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message, returnCode: RETURN_CODES.GENERIC_ERROR });
    }
  }

  async createTask(req: Request, res: Response) {
    const { title, description } = req.body;
    const task = {
      title,
      description,
      completed: false,
      createdAt: new Date().getTime(),
      isDeleted: false,
    };

    logger.info("Task to be created", task);

    try {
      const newTask = await TasksService.createTask(task);
      res.status(201).json({
        returnCode: RETURN_CODES.GENERIC_SUCCESS,
        message: "Task created successfully",
        data: newTask,
      });
    } catch (error: any) {
      logger.error("Error occurred", error);
      res
        .status(500)
        .json({ error: error.message, returnCode: RETURN_CODES.GENERIC_ERROR });
    }
  }

  async updateTask(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
      await TasksService.updateTask(id, { title, description, completed });
      res.status(200).json({
        returnCode: RETURN_CODES.GENERIC_SUCCESS,
        message: "Task updated successfully",
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message, returnCode: RETURN_CODES.GENERIC_ERROR });
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await TasksService.deleteTask(id);
      res.status(200).json({
        returnCode: RETURN_CODES.GENERIC_SUCCESS,
        message: "Task deleted logically",
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message, returnCode: RETURN_CODES.GENERIC_ERROR });
    }
  }
}

export default new TasksController();
