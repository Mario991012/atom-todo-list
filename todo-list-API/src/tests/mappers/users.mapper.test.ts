import { mapAuthResponse } from "../../mappers/users.mapper";
import { RETURN_CODES } from "../../common/constants/common";
import {
  AuthenticationResponseModel,
  AuthenticationDTO,
} from "../../common/interfaces/authentication.interface";

describe("mapAuthResponse", () => {
  it("should map AuthenticationResponseModel to AuthenticationDTO with the provided return code", () => {
    const authResponseMock: AuthenticationResponseModel = {
      user: {
        uid: "12345",
        email: "test@example.com",
        emailVerified: true,
        displayName: "Test User",
        disabled: false,
        metadata: {
            lastSignInTime: "2024-01-01T00:00:00Z", creationTime: "2024-01-01T00:00:00Z",
            toJSON: function (): object {
                throw new Error("Function not implemented.");
            }
        },
        providerData: [],
        toJSON: () => ({}),
      },
      token: "auth-token",
    };

    const expectedResponse: AuthenticationDTO = {
      returnCode: RETURN_CODES.GENERIC_SUCCESS,
      data: {
        id: authResponseMock.user.uid,
        email: authResponseMock.user.email,
        disabled: authResponseMock.user.disabled,
        token: authResponseMock.token,
      },
    };

    const result = mapAuthResponse(authResponseMock, RETURN_CODES.GENERIC_SUCCESS);

    expect(result).toEqual(expectedResponse);
  });

  it("should map AuthenticationResponseModel with null email and return correct DTO", () => {
    const authResponseMock: AuthenticationResponseModel = {
      user: {
          uid: "12345",
          email: undefined,
          emailVerified: false,
          displayName: "Test User",
          disabled: false,
          metadata: {
              lastSignInTime: "2024-01-01T00:00:00Z", creationTime: "2024-01-01T00:00:00Z",
              toJSON: function (): object {
                  throw new Error("Function not implemented.");
              }
          },
          providerData: [],
          toJSON: function (): object {
              throw new Error("Function not implemented.");
          }
      },
      token: "auth-token",
    };

    const expectedResponse: AuthenticationDTO = {
      returnCode: RETURN_CODES.GENERIC_SUCCESS,
      data: {
        id: authResponseMock.user.uid,
        email: undefined,
        disabled: authResponseMock.user.disabled,
        token: authResponseMock.token,
      },
    };

    const result = mapAuthResponse(authResponseMock, RETURN_CODES.GENERIC_SUCCESS);

    expect(result).toEqual(expectedResponse);
  });

  it("should map AuthenticationResponseModel with a different return code", () => {
    const authResponseMock: AuthenticationResponseModel = {
      user: {
        uid: "67890",
        email: "another@example.com",
        emailVerified: true,
        displayName: "Another User",
        disabled: true,
        metadata: {
            lastSignInTime: "2024-02-02T00:00:00Z", creationTime: "2024-02-02T00:00:00Z",
            toJSON: function (): object {
                throw new Error("Function not implemented.");
            }
        },
        providerData: [],
        toJSON: () => ({}),
      },
      token: "another-auth-token",
    };

    const expectedResponse: AuthenticationDTO = {
      returnCode: RETURN_CODES.GENERIC_ERROR,
      data: {
        id: authResponseMock.user.uid,
        email: authResponseMock.user.email,
        disabled: authResponseMock.user.disabled,
        token: authResponseMock.token,
      },
    };

    const result = mapAuthResponse(authResponseMock, RETURN_CODES.GENERIC_ERROR);

    expect(result).toEqual(expectedResponse);
  });
});
