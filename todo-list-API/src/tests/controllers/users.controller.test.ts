import {Request, Response} from "express";
import UsersService from "../../services/users.service";
import {logger} from "firebase-functions/v2";
import {UsersController} from "../../controllers/users.controller";

jest.mock("../../services/users.service");
jest.mock("firebase-functions/v2", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock("../../common/mappers/generic-error.mapper", () => ({
  mapGenericError: jest.fn().mockReturnValue({message: "Email is required"}),
}));

describe("UsersController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let usersController: UsersController;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({json: jsonMock})) as any;
    res = {
      status: statusMock,
    } as Partial<Response>;

    usersController = new UsersController();

    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should return 400 if email is not provided", async () => {
      req.body = {};

      await usersController.createUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({message: "Email is required"});
    });

    it("should create a user and return status 201", async () => {
      const newUser = {id: 1, email: "test@example.com"};
      req.body = {email: "test@example.com"};
      (UsersService.prototype.createUser as jest.Mock).mockResolvedValue(
        newUser
      );

      await usersController.createUser(req as Request, res as Response);

      expect(UsersService.prototype.createUser).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(logger.info).toHaveBeenCalledWith("findUser Response", newUser);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(newUser);
    });

    it("should handle error and return status 500", async () => {
      const errorMessage = "Failed to create user";
      req.body = {email: "test@example.com"};
      (UsersService.prototype.createUser as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await usersController.createUser(req as Request, res as Response);

      expect(UsersService.prototype.createUser).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith(
        "findUser Response",
        expect.any(Error)
      );
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({message: errorMessage});
    });
  });

  describe("findUser", () => {
    it("should return 400 if email is not provided", async () => {
      req.params = {};

      await usersController.findUser(req as Request, res as Response);

      expect(logger.info).toHaveBeenCalledWith("Email required to find user", {
        email: undefined,
      });
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({message: "Email is required"});
    });

    it("should find a user and return status 200", async () => {
      const user = {id: 1, email: "test@example.com"};
      req.params = {email: "test@example.com"};
      (UsersService.prototype.findUserByEmail as jest.Mock).mockResolvedValue(
        user
      );

      await usersController.findUser(req as Request, res as Response);

      expect(UsersService.prototype.findUserByEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(logger.info).toHaveBeenCalledWith("findUser Response", user);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(user);
    });

    it("should handle error and return status 404", async () => {
      const errorMessage = "User not found";
      req.params = {email: "test@example.com"};
      (UsersService.prototype.findUserByEmail as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await usersController.findUser(req as Request, res as Response);

      expect(UsersService.prototype.findUserByEmail).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(
        "findUser Response",
        expect.any(Error)
      );
      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({message: errorMessage});
    });
  });
});
