export interface LogInFormType {
  success: boolean;
  message: string;
  email?: string;
  password?: string;
  fieldErrors?: {
    email?: string;
    password?: string;
  };
}

export interface RegisterFormType {
  email: string;
  password: string;
  name: string;
  mobile: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}
