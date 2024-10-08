import {Request, Response} from "express";
import {UsersService} from "../services/users.service";
import {mapGenericError} from "../common/mappers/generic-error.mapper";
import {logger} from "firebase-functions/v2";

export class UsersController {
  private usersService: UsersService = new UsersService();

  createUser = async (req: Request, res: Response) => {
    const {email} = req.body;

    if (!email) {
      res
        .status(400)
        .json(mapGenericError({message: "Email is required"} as Error));
      return;
    }

    try {
      const result = await this.usersService.createUser(email);
      logger.info("findUser Response", result);
      res.status(201).json(result);
    } catch (error: unknown) {
      logger.info("findUser Response", error);
      res.status(500).json({message: (error as Error).message});
    }
  };

  findUser = async (req: Request, res: Response) => {
    const {email} = req.params;

    if (!email) {
      logger.info("Email required to find user", {email});
      res
        .status(400)
        .json(mapGenericError({message: "Email is required"} as Error));
      return;
    }

    try {
      const user = await this.usersService.findUserByEmail(email);
      logger.info("findUser Response", user);
      res.status(200).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("findUser Response", error);
        res.status(404).json({message: error.message});
      } else {
        logger.error("An unknown error occurred");
        res.status(404).json({message: (error as Error).message});
      }
    }
  };
}

export default new UsersController();
