export interface LoginUserResponse {
    returnCode: number;
    data: {
      id: string;
      email: string;
      disabled: boolean;
      token: string;
    };
    error?: any
  }
  