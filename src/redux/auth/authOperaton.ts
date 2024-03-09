import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  User,
} from "firebase/auth";
import {
  IFormValues,
  ILoginResponse,
  // ILoginUserData,
  IUserCredentials,
} from "../../types/AuthTypes";
import { toast } from "react-toastify";

export const registrationUser = createAsyncThunk<
  IUserCredentials,
  IFormValues,
  { rejectValue: string }
>("auth/registrationUser", async (userData, { rejectWithValue }: any) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    // await updateProfile(auth.currentUser, {
    //   displayName: userData.name,
    // });
    const userDataTmp = {
      uid: auth.currentUser?.uid,
      displayName: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
      accessToken: "testToken",
    };
    // const { uid, displayName, email, accessToken } = auth.currentUser;
    return userDataTmp as IUserCredentials;
  } catch (error: any) {
    toast.error("Something went wrong, try again");
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk<
  ILoginResponse,
  IFormValues,
  { rejectValue: string }
>("auth/loginUser", async (userData, { rejectWithValue }: any) => {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const { uid, displayName, email } = response.user;
    return { uid, displayName, email };
  } catch (error: any) {
    toast.error(
      "Sorry, we couldn't find your account! Check your email or password"
    );
    return rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      toast.info("Bye! See you soon!");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ thunkAPI, ...userData }) => {
//     try {
//       const respons = await signInWithEmailAndPassword(
//         auth,
//         userData.email,
//         userData.password
//       );

//       const { uid, displayName, email } = respons.user;
//       return { uid, displayName, email };
//     } catch (error) {
//       toast.error(
//         "Sorry, we couldn't find your account! Check your email or password"
//       );
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   "auth/logoutUser",
//   async (thunkAPI) => {
//     try {
//       await signOut(auth);
//       toast.info("Bye! See you soon!");
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
