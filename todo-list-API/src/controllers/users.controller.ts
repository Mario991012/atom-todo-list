import { Request, Response } from "express";
import UsersService from "../services/users.service";

class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  /**
   * Controller method to create a user.
   * @param req HTTP request object.
   * @param res HTTP response object.
   */
  async createUser(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const result = await this.usersService.createUser(email);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * Controller method to find a user by email.
   * @param req HTTP request object.
   * @param res HTTP response object.
   */
  async findUser(req: Request, res: Response) {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const user = await this.usersService.findUserByEmail(email);
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export default new UsersController();
