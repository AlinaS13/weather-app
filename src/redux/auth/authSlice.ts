import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IUserCredentials } from "../../types/AuthTypes";
import { loginUser, logoutUser, registrationUser } from "./authOperation";

const initialState: IAuthState = {
  userId: null,
  name: null,
  email: "",
  token: null,
  error: null,
  isAuthLoading: false,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUser: (state, action: PayloadAction<IUserCredentials>) => {
      const { uid, displayName, email, token } = action.payload;
      return {
        ...state,
        userId: uid,
        name: displayName,
        email,
        token,
        isAuth: true,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationUser.pending, (state: IAuthState) => {
        state.isAuthLoading = true;
      })
      .addCase(
        registrationUser.fulfilled,
        (
          state: IAuthState,
          action: PayloadAction<Partial<IUserCredentials>>
        ) => {
          state.userId = action.payload.uid;
          state.name = action.payload.displayName;
          state.email = action.payload.email;
          state.token = action.payload.token;
          state.isAuthLoading = false;
          state.isAuth = true;
          state.error = null;
        }
      )
      .addCase(registrationUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<Partial<IUserCredentials>>) => {
          state.userId = action.payload.uid;
          state.name = action.payload.displayName;
          state.email = action.payload.email;
          state.token = action.payload.token;
          state.isAuthLoading = false;
          state.isAuth = true;
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userId = "";
        state.name = "";
        state.email = "";
        state.token = "";
        state.isAuthLoading = false;
        state.isAuth = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthLoading = false;
      });
  },
});

export const { getCurrentUser } = authSlice.actions;
export default authSlice.reducer;
