import {RETURN_CODES} from "../common/constants/common";
import {
  AuthenticationDTO,
  AuthenticationResponseModel,
} from "../common/interfaces/authentication.interface";

export const mapAuthResponse = (
  response: AuthenticationResponseModel,
  returnCode: RETURN_CODES
): AuthenticationDTO => {
  const {user, token} = response;
  return {
    returnCode,
    data: {
      id: user.uid,
      email: user.email,
      disabled: user.disabled,
      token: token,
    },
  };
};
