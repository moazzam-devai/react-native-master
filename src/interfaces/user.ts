export interface User {
  username: string;
  email: string;
  firstName?: string;

  lastName: string;
}

export interface Login {
  username: string;
  password: string;
}
