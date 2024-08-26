export interface email {
  email: string;
}
export interface newPassword extends email{
  newPassword: string;
}

export interface Login extends email{
  password: string;
}
export interface code {
  resetCode: string;
}
export interface RegisterData extends Login , email{
  name: string;
  rePassword: string;
  phone : string;
}
export interface forgetResponse {
  statusMsg: string;
  message: string;
}
