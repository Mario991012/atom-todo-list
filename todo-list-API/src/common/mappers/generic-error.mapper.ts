import {RETURN_CODES} from "../constants/common";
import {GenericErrorDTO} from "../interfaces/generic-error.interface";

export const mapGenericError = (
  error: Error,
  returnCode?: RETURN_CODES
): GenericErrorDTO => {
  return {
    returnCode: returnCode || RETURN_CODES.GENERIC_ERROR,
    error: {
      message: error.message,
    },
  };
};
