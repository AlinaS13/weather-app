import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import { useState } from "react";

import { ICity, ICityListResponse } from "../../types/WeatherTypes";
import {
  fetchCityList,
  fetchWeatherByCity,
} from "../../redux/weather/weatherOperation";

import { addCity } from "../../redux/weather/weatherSlice";
import { useAppDispatch } from "../../utils/hooks/redux-hooks";

export const SearchWeather: React.FC = () => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState("");
  const [cityList, setCityList] = useState<ICityListResponse[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  let typingTimer: ReturnType<typeof setTimeout>;

  const handleInputChange = (searchString: string) => {
    clearTimeout(typingTimer);
    const newInputValue = searchString.trimStart();
    setInputValue(newInputValue);

    if (newInputValue.length >= 3) {
      typingTimer = setTimeout(async () => {
        try {
          const cityArr = await fetchCityList(newInputValue);
          setCityList(cityArr);
        } catch (error) {
          console.error("Error fetching city list:", error);
        }
      }, 300);
    } else {
      setCityList([]);
    }
  };
  const handleCitySelection = async (value: string) => {
    setSelectedCity(value);
    console.log(selectedCity);
    setInputValue(value);
    try {
      const response = await fetchWeatherByCity(value);

      const newCityData: ICity = {
        id: response.id,
        name: response.name,
        temperatureUnit: "metric",
      };

      dispatch(addCity(newCityData));
    } catch (error) {
      console.error("Error fetching temperature data:", error);
    }
    setSelectedCity(null);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: 500,
          }}
        >
          <Autocomplete
            sx={{
              "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
                backgroundColor: "rgba(133, 170, 159, 0.5)",
                color: "#000000",
              },
              "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
                {
                  backgroundColor: "rgba(133, 170, 159)",
                  color: "#000000",
                },
            }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            disablePortal
            inputValue={inputValue}
            onInputChange={(event, value) => {
              event.preventDefault();
              handleInputChange(value);
            }}
            onChange={(event, value, reason) => {
              event.preventDefault();
              if (value && typeof value === "string") {
                if (reason == "selectOption") {
                  handleCitySelection(value);
                }
                setSelectedCity(value);
              }
            }}
            options={cityList.map((city) => `${city.name}, ${city.country}`)}
            renderInput={(params) => (
              <TextField
                sx={{
                  backgroundColor: "rgba(133, 170, 159, 0.5)",
                  color: "#000",
                }}
                {...params}
                label="Search city"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Stack>
      </Box>
    </>
  );
};
