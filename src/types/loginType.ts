export interface LogInFormType {
  success: boolean;
  message: string;
  email?: string;
  password?: string;
}

export interface RegisterFormType {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
}
