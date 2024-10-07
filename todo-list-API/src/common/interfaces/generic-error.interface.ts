import {RETURN_CODES} from "../constants/common";

export interface GenericErrorDTO {
    returnCode: RETURN_CODES;
    error: {
        message: string;
    }
}
