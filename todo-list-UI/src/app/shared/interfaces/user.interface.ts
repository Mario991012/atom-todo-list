export interface LoginUserResponse {
  returnCode: number;
  data: {
    id: string;
    email: string;
    disabled: boolean;
    token: string;
  };
  error?: any;
}

export interface CreateUserResponse {
	returnCode: number,
	data: {
		id: string,
		email: string,
		disabled: boolean | string,
		token: string,
	},
	error?: any;
}