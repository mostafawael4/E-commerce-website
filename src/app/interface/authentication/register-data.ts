

export interface Login {
  email: string;
  password: string;
}


export interface RegisterData extends Login{
  name: string;
  rePassword: string;
  phone : string;
}
