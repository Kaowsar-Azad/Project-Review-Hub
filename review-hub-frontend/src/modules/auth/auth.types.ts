export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "MENTOR";
  studentId?: string;
}

export interface IAuthResponse {
  user?: IUser;
  message?: string;
}
