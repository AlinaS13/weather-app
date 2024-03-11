// export interface IUser {
//   userId: string;
// }

export interface IFormValues {
  name?: string;
  email: string;
  password: string;
}
export interface IUserCredentials {
  uid: string | null;
  displayName: string | null;
  email: string;
  token: string | null;
}
// export interface ILoginUserData {
//   email: string;
//   password: string;
// }

export interface ILoginResponse {
  uid: string;
  displayName: string | null;
  email: string;
}

export interface IAuthState {
  userId: string | null | undefined;
  name?: string | null;
  email: string | null | undefined;
  token: string | null | undefined;
  isAuthLoading: boolean;
  error: string | null | unknown;
  isAuth: boolean;
}
// export interface UserData {
//   name: string | null;
//   email: string | null;
// }
// export interface RegisterParamsApi {
//   name: string;
//   email: string;
//   password: string;
// }
