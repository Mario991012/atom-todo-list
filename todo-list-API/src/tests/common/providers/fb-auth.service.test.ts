import {AuthenticationService} from "../../../common/providers/fb-auth.service";
import {auth} from "../../../config/firebase.config";

jest.mock("../../../config/firebase.config", () => ({
  auth: {
    createUser: jest.fn(),
    getUserByEmail: jest.fn(),
    createCustomToken: jest.fn(),
  },
}));

describe("AuthenticationService", () => {
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    authenticationService = new AuthenticationService();
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a new user and return the model", async () => {
      const email = "test@example.com";
      const userRecordMock = {
        uid: "12345",
        email,
        emailVerified: true,
        displayName: "Test User",
        disabled: false,
      };
      const customTokenMock = "custom-token";

      (auth.createUser as jest.Mock).mockResolvedValue(userRecordMock);
      (auth.createCustomToken as jest.Mock).mockResolvedValue(customTokenMock);

      const result = await authenticationService.createUser(email);

      expect(auth.createUser).toHaveBeenCalledWith({email});
      expect(auth.createCustomToken).toHaveBeenCalledWith(userRecordMock.uid);
      expect(result).toEqual({user: userRecordMock, token: customTokenMock});
    });

    it("should throw an error if user creation fails", async () => {
      const email = "test@example.com";
      const errorMessage = "Error creating user";
      (auth.createUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(authenticationService.createUser(email)).rejects.toThrow(
        `Error creating user: ${errorMessage}`
      );

      expect(auth.createUser).toHaveBeenCalledWith({email});
      expect(auth.createCustomToken).not.toHaveBeenCalled();
    });
  });

  describe("signIn", () => {
    it("should login the user if exist and return the model", async () => {
      const email = "test@example.com";
      const userRecordMock = {
        uid: "67890",
        email,
        emailVerified: true,
        displayName: "Test User",
        disabled: false,
      };
      const customTokenMock = "another-custom-token";

      (auth.getUserByEmail as jest.Mock).mockResolvedValue(userRecordMock);
      (auth.createCustomToken as jest.Mock).mockResolvedValue(customTokenMock);

      const result = await authenticationService.signIn(email);

      expect(auth.getUserByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual({user: userRecordMock, token: customTokenMock});
    });

    it("should throw an error if the user does not exist", async () => {
      const email = "test@example.com";
      (auth.getUserByEmail as jest.Mock).mockRejectedValue(
        new Error("User not found")
      );

      await expect(authenticationService.signIn(email)).rejects.toThrow(
        "Error during login: User not found"
      );

      expect(auth.getUserByEmail).toHaveBeenCalledWith(email);
      expect(auth.createCustomToken).not.toHaveBeenCalled();
    });

    it("should throw an error if error during sign-in", async () => {
      const email = "test@example.com";
      const errorMessage = "Error during login";
      (auth.getUserByEmail as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(authenticationService.signIn(email)).rejects.toThrow(
        `Error during login: ${errorMessage}`
      );

      expect(auth.getUserByEmail).toHaveBeenCalledWith(email);
      expect(auth.createCustomToken).not.toHaveBeenCalled();
    });
  });
});
