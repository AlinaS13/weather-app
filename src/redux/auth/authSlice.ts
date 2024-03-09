import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IUserCredentials } from "../../types/AuthTypes";
import { loginUser, logoutUser, registrationUser } from "./authOperaton";

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
      .addCase(
        registrationUser.pending,
        (state: IAuthState, { payload }: PayloadAction<string>) => {
          state.isAuthLoading = true;
        }
      )
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
      .addCase(
        registrationUser.rejected,
        (state: IAuthState, action: PayloadAction<string>) => {
          state.error = action.payload;
          state.isAuthLoading = false;
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<IUserCredentials>) => {
          state.userId = action.payload.uid;
          state.name = action.payload.displayName;
          state.email = action.payload.email;
          state.token = action.payload.token;
          state.isAuthLoading = false;
          state.isAuth = true;
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<string>) => {
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
      .addCase(logoutUser.rejected, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isAuthLoading = false;
      });
  },
});

export const { getCurrentUser } = authSlice.actions;
export default authSlice.reducer;

// export const { registrationUser } = authSlice.actions;
// const initialState = {
//   userId: "",
//   name: "",
//   email: "",
//   token: null,
//   error: null,
//   isAuth: false,
//   isAuthLoading: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     getCurrentUser: (state, { payload }) => ({
//       ...state,
//       userId: payload.userId,
//       token: payload.token,
//       name: payload.name,
//       email: payload.email,
//       isAuth: true,
//     }),
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registrationUser.pending, (state, action) => {
//         state.isAuthLoading = true;
//       })
//       .addCase(registrationUser.fulfilled, (state, action) => {
//         state.userId = action.payload.uid;
//         state.name = action.payload.displayName;
//         state.email = action.payload.email;
//         state.token = action.payload.token;
//         state.isAuthLoading = false;
//         state.isAuth = true;
//         state.error = null;
//       })
//       .addCase(registrationUser.rejected, (state, action) => {
//         state.error = action.payload;
//         state.isAuthLoading = false;
//       })
//       .addCase(loginUser.pending, (state, action) => {
//         state.isAuthLoading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.userId = action.payload.uid;
//         state.name = action.payload.displayName;
//         state.email = action.payload.email;
//         state.token = action.payload.token;
//         state.isAuthLoading = false;
//         state.isAuth = true;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.error = action.payload;
//         state.isAuthLoading = false;
//       })
//       .addCase(logoutUser.pending, (state, action) => {
//         state.isAuthLoading = true;
//       })
//       .addCase(logoutUser.fulfilled, (state, action) => {
//         state.userId = null;
//         state.name = null;
//         state.email = null;
//         state.token = null;
//         state.isAuth = false;
//         state.isAuthLoading = false;
//         state.error = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.error = action.payload;
//         state.isAuthLoading = false;
//       });
//   },
// });

// export const { getCurrentUser } = authSlice.actions;

// export default authSlice.reducer;
