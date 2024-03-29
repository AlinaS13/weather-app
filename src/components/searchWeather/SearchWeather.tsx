import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { ICity, ICityListResponse } from "../../types/WeatherTypes";
import {
  fetchCityList,
  fetchWeatherByCity,
} from "../../redux/weather/weatherOperation";

import { addCity } from "../../redux/weather/weatherSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux-hooks";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";

export const SearchWeather: React.FC = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state: RootState) => state.weather.cities);
  const [inputValue, setInputValue] = useState<string>("");
  const [cityList, setCityList] = useState<ICityListResponse[]>([]);

  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (searchString: string) => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    const newInputValue = searchString.trimStart();
    setInputValue(newInputValue);
  };

  const handleCitySelection = async (value: string) => {
    setInputValue(value);

    try {
      const response = await fetchWeatherByCity(value);
      const newCityData: ICity = {
        id: response.id,
        name: response.name,
        temperatureUnit: "metric",
      };
      if (!cities.some((city) => city.id === newCityData.id)) {
        dispatch(addCity(newCityData));
        setInputValue("");
      } else {
        toast.error("City already added");
      }
    } catch (error) {
      console.error("Error fetching temperature data:", error);
    }
  };

  useEffect(() => {
    if (inputValue.length >= 3) {
      typingTimerRef.current = setTimeout(async () => {
        try {
          const cityArr = await fetchCityList(inputValue);
          setCityList(cityArr);
        } catch (error) {
          console.error("Error fetching city list:", error);
        }
      }, 300);
    } else {
      setCityList([]);
    }
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, [inputValue]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginTop: "40px",
          marginBottom: "40px",
          marginLeft: "20px",
          marginRight: "20px",
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
                color: "#000000",
                backgroundColor: "rgba(133, 170, 159)",
              },
              "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
                {
                  backgroundColor: "rgba(81, 172, 145, 0.5)",
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
                if (reason === "selectOption") {
                  handleCitySelection(value);
                }
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
