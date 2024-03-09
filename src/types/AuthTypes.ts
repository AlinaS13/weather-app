import { ReactNode } from "react";
export interface IUser {
  userId: string;
}

export interface IFormValues {
  name?: string;
  email: string;
  password: string;
}
export interface IUserCredentials {
  uid: string | null;
  displayName: string | null;
  email: string;
  accessToken: string;
  token: string | null;
}
export interface ILoginUserData {
  email: string;
  password: string;
}

export interface ILoginResponse {
  uid: string;
  displayName: string | null;
  email: string;
}

export interface IAuthState {
  userId: string | null;
  name?: string | null;
  email: string | null | undefined;
  token: string | null;
  isAuthLoading: boolean;
  error: string | null | unknown;
  isAuth: boolean;
}

// export interface IUserResponsData {
//   _id: "string";
//   name: "string";
//   email: "string";
//   avatarURL: "string";
// }

// export interface IAuthRespons {
//   accessToken: string;
//   refreshToken: string;
//   user: IUserResponsData;
// }

// export interface IAppState {
//   auth: IAuthState;
// }

// export interface IRouteProps {
//   children: ReactNode | any;
// }

// export interface IAsyncThunkCurrentUserReturn {
//   user: {
//     _id: string;
//     name: string;
//     avatarURL: string;
//     email: string;
//   };
// }
