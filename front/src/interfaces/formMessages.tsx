export interface FormAuthMessages {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  apiError: string;
  apiSuccess: string;
  [key: string]: string;
}

export interface FormApiMessages {
  apiSuccess: string;
  apiError: string;
  [key: string]: string;
}
