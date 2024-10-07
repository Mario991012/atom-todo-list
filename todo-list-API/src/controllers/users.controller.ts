import {Request, Response} from "express";
import UsersService from "../services/users.service";

class UsersController {
  private usersService: UsersService = new UsersService();

  createUser = async (req: Request, res: Response) => {
    const {email} = req.body;

    if (!email) {
      res.status(400).json({message: "Email is required"});
      return;
    }

    try {
      const result = await this.usersService.createUser(email);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({message: error.message});
    }
  };

  findUser = async (req: Request, res: Response) => {
    const {email} = req.params;

    if (!email) {
      res.status(400).json({message: "Email is required"});
      return;
    }

    try {
      const user = await this.usersService.findUserByEmail(email);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({message: error.message});
    }
  };
}

export default new UsersController();
