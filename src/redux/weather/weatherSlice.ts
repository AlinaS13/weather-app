import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICity, IWeatherState } from "../../types/WeatherTypes";
import { logoutUser } from "../auth/authOperation";
import { toast } from "react-toastify";

const initialState: IWeatherState = {
  cities: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<ICity>) => {
      if (!state.cities.some((city) => city.id === action.payload.id)) {
        state.cities.push(action.payload);
      } else {
        toast.error("City already added");
      }
    },
    removeCity: (state, action: PayloadAction<number>) => {
      const cityIdToRemove = action.payload;
      state.cities = state.cities.filter((city) => city.id !== cityIdToRemove);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.cities = [];
    });
  },
});

export const { addCity, removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
