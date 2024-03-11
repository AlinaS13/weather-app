import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  updateProfile,
} from "firebase/auth";
import {
  IFormValues,
  ILoginResponse,
  IUserCredentials,
} from "../../types/AuthTypes";
import { toast } from "react-toastify";

export const registrationUser = createAsyncThunk<
  IUserCredentials,
  IFormValues,
  { rejectValue: string }
>("auth/registrationUser", async (userData, { rejectWithValue }) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    await updateProfile(auth.currentUser as User, {
      displayName: userData.name,
    });
    const { uid, displayName, email } = auth.currentUser as User;
    return { uid, displayName, email } as IUserCredentials;
  } catch (error: any) {
    toast.error("Something went wrong, try again");
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk<
  ILoginResponse,
  IFormValues,
  { rejectValue: string }
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const { uid, displayName, email } = response.user;
    return { uid, displayName, email } as ILoginResponse;
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
