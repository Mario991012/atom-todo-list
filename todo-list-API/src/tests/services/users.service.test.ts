import {UsersService} from "../../services/users.service";
import {RETURN_CODES} from "../../common/constants/common";
import {mapGenericError} from "../../common/mappers/generic-error.mapper";
import {AuthenticationService} from "../../common/providers/fb-auth.service";
import {mapAuthResponse} from "../../mappers/users.mapper";
import {
  AuthenticationResponseModel,
} from "../../common/interfaces/authentication.interface";
import {UserRecord} from "firebase-admin/auth";

jest.mock("firebase-functions/v2", () => ({
  logger: {
    error: jest.fn(),
  },
}));
jest.mock("../../common/mappers/generic-error.mapper");
jest.mock("../../common/providers/fb-auth.service");
jest.mock("../../mappers/users.mapper");

describe("UsersService", () => {
  let usersService: UsersService;
  let authServiceMock: jest.Mocked<AuthenticationService>;

  beforeEach(() => {
    authServiceMock =
      new AuthenticationService() as jest.Mocked<AuthenticationService>;
    usersService = new UsersService();
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user and return a mapped response", async () => {
      const email = "test@example.com";
      const authResultMock: AuthenticationResponseModel = {
        user: {
          uid: "12345",
          email: "test@example.com",
          emailVerified: true,
          displayName: "Test User",
          disabled: false,
          metadata: {
            lastSignInTime: "2024-01-01T00:00:00Z",
            creationTime: "2024-01-01T00:00:00Z",
          },
          providerData: [],
        } as unknown as UserRecord,
        token: "auth-token",
      };
      const mappedResponseMock = {
        uid: "12345",
        email: "test@example.com",
        token: "auth-token",
        returnCode: RETURN_CODES.GENERIC_SUCCESS,
      };

      authServiceMock.createUser.mockResolvedValue(authResultMock);
      (mapAuthResponse as jest.Mock).mockReturnValue(mappedResponseMock);

      const result = await usersService.createUser(email);

      expect(result).toEqual(mappedResponseMock);
    });

    it("should handle error and return a mapped generic error", async () => {
      const email = "test@example.com";
      const errorMessage = "Error creating user";
      const errorMock = new Error(errorMessage);
      const mappedErrorMock = {
        returnCode: RETURN_CODES.GENERIC_SUCCESS,
        email,
        token: "auth-token",
        uid: "12345",
      };

      authServiceMock.createUser.mockRejectedValue(errorMock);
      (mapGenericError as jest.Mock).mockReturnValue(mappedErrorMock);

      const result = await usersService.createUser(email);

      expect(result).toEqual(mappedErrorMock);
    });
  });

  describe("findUserByEmail", () => {
    it("should find a user and return a mapped response", async () => {
      const email = "test@example.com";
      const authResultMock: AuthenticationResponseModel = {
        user: {
          uid: "12345",
          email: "test@example.com",
          emailVerified: true,
          displayName: "Test User",
          disabled: false,
          metadata: {
            lastSignInTime: "2024-01-01T00:00:00Z",
            creationTime: "2024-01-01T00:00:00Z",
          },
          providerData: [],
          toJSON: () => ({}),
        } as unknown as UserRecord,
        token: "auth-token",
      };
      const mappedResponseMock = {
        uid: "12345",
        email: "test@example.com",
        token: "auth-token",
        returnCode: RETURN_CODES.GENERIC_SUCCESS,
      };

      authServiceMock.signIn.mockResolvedValue(authResultMock);
      (mapAuthResponse as jest.Mock).mockReturnValue(mappedResponseMock);

      const result = await usersService.findUserByEmail(email);

      expect(result).toEqual(mappedResponseMock);
    });

    it("should handle error and return a mapped generic error", async () => {
      const email = "test@example.com";
      const errorMessage = "User not found";
      const errorMock = new Error(errorMessage);
      const mappedErrorMock = {
        returnCode: RETURN_CODES.GENERIC_SUCCESS,
        email,
        token: "auth-token",
        uid: "12345",
      };

      authServiceMock.signIn.mockRejectedValue(errorMock);
      (mapGenericError as jest.Mock).mockReturnValue(mappedErrorMock);

      const result = await usersService.findUserByEmail(email);

      expect(result).toEqual(mappedErrorMock);
    });
  });
});
